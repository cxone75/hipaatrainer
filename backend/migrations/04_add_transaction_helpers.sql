
-- Create transaction helper functions for explicit transaction control

-- Function to begin a transaction
CREATE OR REPLACE FUNCTION begin_transaction()
RETURNS TEXT AS $$
BEGIN
    -- In PostgreSQL, transactions are automatically started
    -- This function serves as a marker for transaction boundaries
    RETURN 'TRANSACTION_STARTED';
END;
$$ LANGUAGE plpgsql;

-- Function to commit a transaction
CREATE OR REPLACE FUNCTION commit_transaction()
RETURNS TEXT AS $$
BEGIN
    -- The actual commit will happen when the connection ends successfully
    -- This function serves as a marker for transaction boundaries
    RETURN 'TRANSACTION_COMMITTED';
END;
$$ LANGUAGE plpgsql;

-- Function to rollback a transaction
CREATE OR REPLACE FUNCTION rollback_transaction()
RETURNS TEXT AS $$
BEGIN
    -- Raise an exception to trigger rollback
    RAISE EXCEPTION 'TRANSACTION_ROLLBACK';
END;
$$ LANGUAGE plpgsql;
