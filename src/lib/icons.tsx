import {
  Bot,
  Cloud,
  Code2,
  Globe,
  GraduationCap,
  Layers,
  LayoutDashboard,
  MessagesSquare,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export const ICONS: Record<string, LucideIcon> = {
  Bot,
  Cloud,
  Code2,
  Globe,
  GraduationCap,
  Layers,
  LayoutDashboard,
  MessagesSquare,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  Sparkles,
};
export const ICON_NAMES = Object.keys(ICONS);

export function getIcon(name: string | null | undefined): LucideIcon {
  return (name && ICONS[name]) || Code2;
}
