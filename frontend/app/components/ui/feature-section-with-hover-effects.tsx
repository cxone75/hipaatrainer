
import { cn } from "@/lib/utils";
import {
  IconStethoscope,
  IconBuildingHospital,
  IconCode,
  IconBrain,
  IconHome,
  IconMicroscope,
  IconBuildings,
  IconMedicalCross,
} from "@tabler/icons-react";

export function FeaturesSectionWithHoverEffects() {
  const features = [
    {
      title: "Dental Practices",
      description:
        "Automate staff training and patient privacy compliance for your dental practice.",
      icon: <IconMedicalCross className="text-purple-600" />,
    },
    {
      title: "Medical Clinics",
      description:
        "Track physician and nurse certifications effortlessly across your clinic.",
      icon: <IconStethoscope className="text-purple-600" />,
    },
    {
      title: "Healthtech Startups",
      description:
        "Integrate compliance into your development workflow from day one.",
      icon: <IconCode className="text-purple-600" />,
    },
    {
      title: "Mental Health",
      description: "Navigate telehealth PHI rules with complete confidence.",
      icon: <IconBrain className="text-purple-600" />,
    },
    {
      title: "Home Healthcare",
      description: "Coordinate compliance across distributed caregivers seamlessly.",
      icon: <IconHome className="text-purple-600" />,
    },
    {
      title: "Specialty Practices",
      description:
        "Custom compliance solutions for specialized healthcare providers.",
      icon: <IconMicroscope className="text-purple-600" />,
    },
    {
      title: "Multi-Location Groups",
      description:
        "Centralized compliance management across multiple healthcare facilities.",
      icon: <IconBuildings className="text-purple-600" />,
    },
    {
      title: "All Healthcare",
      description: "Comprehensive compliance for any healthcare organization.",
      icon: <IconBuildingHospital className="text-purple-600" />,
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  relative z-10 py-10 max-w-7xl mx-auto">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r  py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};
