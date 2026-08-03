import {
  Globe,
  Layout,
  Megaphone,
  Monitor,
  Palette,
  Search,
  Target,
  type LucideIcon,
} from "lucide-react";
import type { ServiceIconName } from "@/data/services";

const iconMap: Record<ServiceIconName, LucideIcon> = {
  Megaphone,
  Target,
  Search,
  Palette,
  Layout,
  Monitor,
  Globe,
};

interface ServiceIconProps {
  name: ServiceIconName;
  className?: string;
}

export default function ServiceIcon({ name, className = "icon" }: ServiceIconProps) {
  const Icon = iconMap[name];
  return <Icon className={className} strokeWidth={1.6} aria-hidden="true" />;
}
