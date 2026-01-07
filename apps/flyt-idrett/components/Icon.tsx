import {
  ArrowRight,
  ArrowDown,
  BookOpen,
  ChevronDown,
  ChevronRight,
  Clock,
  ExternalLink,
  File,
  FileText,
  Download,
  Heart,
  HelpCircle,
  Lightbulb,
  Menu,
  Phone,
  Play,
  Plus,
  Search,
  Star,
  Target,
  Users,
  X,
  Mail,
  Package,
  type LucideProps,
} from "lucide-react";

// Map of icon names to Lucide components
const iconMap: Record<string, React.ComponentType<LucideProps>> = {
  add: Plus,
  arrowDown: ArrowDown,
  arrowRight: ArrowRight,
  book: BookOpen,
  chevronDown: ChevronDown,
  chevronRight: ChevronRight,
  clock: Clock,
  close: X,
  download: Download,
  email: Mail,
  external: ExternalLink,
  file: File,
  fileText: FileText,
  hamburger: Menu,
  heart: Heart,
  helpCircle: HelpCircle,
  lightbulb: Lightbulb,
  package: Package,
  phone: Phone,
  play: Play,
  search: Search,
  star: Star,
  target: Target,
  users: Users,
};

type IconProps = {
  icon: string;
  size?: number;
  color?: string;
  strokeWidth?: number;
  className?: string;
};

export function Icon({
  icon,
  size = 24,
  color = "currentColor",
  strokeWidth = 1.5,
  className,
}: IconProps) {
  const LucideIcon = iconMap[icon];
  
  if (!LucideIcon) {
    console.warn(`Icon "${icon}" not found in icon map`);
    return null;
  }

  return (
    <LucideIcon
      size={size}
      color={color}
      strokeWidth={strokeWidth}
      className={className}
    />
  );
}
