
const express = require('express');
const multer = require('multer');
const path = require('path');
const { createClient } = require('../services/supabase');
const auth = require('../middleware/auth');
const rbac = require('../middleware/rbac');
const auditLogMiddleware = require('../middleware/auditLog');

const router = express.Router();

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'), false);
    }
  },
});

// Get all documents for organization
router.get('/', auth, async (req, res) => {
  try {
    const supabase = createClient();
    
    const { data: documents, error } = await supabase
      .from('documents')
      .select('*')
      .eq('organization_id', req.user.organizationId)
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    res.json(documents || []);
  } catch (error) {
    console.error('Error fetching documents:', error);
    res.status(500).json({ error: 'Failed to fetch documents' });
  }
});

// Upload a new document
router.post('/', 
  auth,
  rbac(['org_admin', 'compliance_manager']),
  upload.single('file'),
  auditLogMiddleware.logRequest({
    action: 'UPLOAD_DOCUMENT',
    resource: 'documents',
    includeBody: true,
  }),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      const { name, type, description } = req.body;
      
      if (!name || !type) {
        return res.status(400).json({ error: 'Document name and type are required' });
      }

      const supabase = createClient();
      
      // Generate unique filename
      const filename = `${Date.now()}-${req.file.originalname}`;
      const filePath = `documents/${req.user.organizationId}/${filename}`;

      // Upload file to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('documents')
        .upload(filePath, req.file.buffer, {
          contentType: 'application/pdf',
          upsert: false,
        });

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('documents')
        .getPublicUrl(filePath);

      // Save document metadata to database
      const { data: document, error: dbError } = await supabase
        .from('documents')
        .insert({
          name,
          type,
          description: description || '',
          file_path: filePath,
          storage_url: urlData.publicUrl,
          file_size: req.file.size,
          organization_id: req.user.organizationId,
          uploaded_by: req.user.id,
          status: 'active',
          version: '1.0',
        })
        .select()
        .single();

      if (dbError) {
        // If database insert fails, clean up the uploaded file
        await supabase.storage.from('documents').remove([filePath]);
        throw dbError;
      }

      res.status(201).json(document);
    } catch (error) {
      console.error('Error uploading document:', error);
      res.status(500).json({ error: 'Failed to upload document' });
    }
  }
);

// Delete a document
router.delete('/:id',
  auth,
  rbac(['org_admin', 'compliance_manager']),
  auditLogMiddleware.logRequest({
    action: 'DELETE_DOCUMENT',
    resource: 'documents',
  }),
  async (req, res) => {
    try {
      const { id } = req.params;
      const supabase = createClient();

      // Get document details first
      const { data: document, error: fetchError } = await supabase
        .from('documents')
        .select('*')
        .eq('id', id)
        .eq('organization_id', req.user.organizationId)
        .single();

      if (fetchError || !document) {
        return res.status(404).json({ error: 'Document not found' });
      }

      // Delete file from storage
      const { error: storageError } = await supabase.storage
        .from('documents')
        .remove([document.file_path]);

      if (storageError) {
        console.error('Error deleting file from storage:', storageError);
        // Continue with database deletion even if storage deletion fails
      }

      // Delete document record from database
      const { error: deleteError } = await supabase
        .from('documents')
        .delete()
        .eq('id', id)
        .eq('organization_id', req.user.organizationId);

      if (deleteError) {
        throw deleteError;
      }

      res.json({ message: 'Document deleted successfully' });
    } catch (error) {
      console.error('Error deleting document:', error);
      res.status(500).json({ error: 'Failed to delete document' });
    }
  }
);

// Get document by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const supabase = createClient();

    const { data: document, error } = await supabase
      .from('documents')
      .select('*')
      .eq('id', id)
      .eq('organization_id', req.user.organizationId)
      .single();

    if (error || !document) {
      return res.status(404).json({ error: 'Document not found' });
    }

    res.json(document);
  } catch (error) {
    console.error('Error fetching document:', error);
    res.status(500).json({ error: 'Failed to fetch document' });
  }
});

module.exports = router;
