import { clsx, type ClassValue } from "clsx"
import { Activity, Bell, CheckCircle2, FileSpreadsheet, Home, MessageSquare, Trash2, User, UserCheck, XCircle } from "lucide-react";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getActivityConfig(type: string) {
  switch (type) {
    case "profile_photo_updated":
      return {
        icon: UserCheck,
        bgClass: "bg-info/10 text-info border-info/20",
        badgeClass: "bg-info/10 text-info",
      };
    case "profile_info_updated":
      return {
        icon: User,
        bgClass: "bg-info/10 text-info border-info/20",
        badgeClass: "bg-info/10 text-info",
      };
    case "listing_created":
      return {
        icon: Home,
        bgClass: "bg-info/10 text-info border-info/20",
        badgeClass: "bg-info/10 text-info",
      };
    case "listing_updated":
      return {
        icon: Home,
        bgClass: "bg-warning/10 text-warning border-warning/20",
        badgeClass: "bg-warning/10 text-warning",
      };
    case "listing_deleted":
      return {
        icon: Trash2,
        bgClass: "bg-error/10 text-error border-error/20",
        badgeClass: "bg-error/10 text-error",
      };
    case "you_sent_proposal":
      return {
        icon: FileSpreadsheet,
        bgClass: "bg-secondary/15 text-secondary border-secondary/25",
        badgeClass: "bg-secondary/15 text-secondary",
      };
    case "you_accepted_proposal":
      return {
        icon: CheckCircle2,
        bgClass: "bg-success/10 text-success border-success/20",
        badgeClass: "bg-success/10 text-success",
      };
    case "you_rejected_proposal":
      return {
        icon: XCircle,
        bgClass: "bg-error/10 text-error border-error/20",
        badgeClass: "bg-error/10 text-error",
      };
    default:
      return {
        icon: Activity,
        bgClass: "bg-primary/10 text-primary border-primary/20",
        badgeClass: "bg-primary/10 text-primary",
      };
  }
}

export function getNotificationConfig(type: string) {
  switch (type) {
    case "listing_approved":
      return {
        icon: CheckCircle2,
        bgClass: "bg-success/10 text-success border-success/20",
        badgeClass: "bg-success/10 text-success",
      };
    case "listing_rejected":
      return {
        icon: XCircle,
        bgClass: "bg-error/10 text-error border-error/20",
        badgeClass: "bg-error/10 text-error",
      };
    case "new_message":
      return {
        icon: MessageSquare,
        bgClass: "bg-info/10 text-info border-info/20",
        badgeClass: "bg-info/10 text-info",
      };
    case "proposal_received":
      return {
        icon: FileSpreadsheet,
        bgClass: "bg-secondary/15 text-secondary border-secondary/25",
        badgeClass: "bg-secondary/15 text-secondary",
      };
    case "your_proposal_accepted":
      return {
        icon: CheckCircle2,
        bgClass: "bg-success/10 text-success border-success/20",
        badgeClass: "bg-success/10 text-success",
      };
    case "your_proposal_rejected":
      return {
        icon: XCircle,
        bgClass: "bg-error/10 text-error border-error/20",
        badgeClass: "bg-error/10 text-error",
      };
    default:
      return {
        icon: Bell,
        bgClass: "bg-primary/10 text-primary border-primary/20",
        badgeClass: "bg-primary/10 text-primary",
      };
  }
}

export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "Just now";

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays}d ago`;
  
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function getOptimizedImageUrl(
  url?: string | null,
  { width = 350, height = 260, quality = "auto", format = "auto"} = {}
): string {
  if (!url || !url.includes("res.cloudinary.com")) return url || "";

  const transformation = `f_${format},q_${quality},c_fill,w_${width},h_${height},dpr_auto`;

  return url.replace("/upload/", `/upload/${transformation}/`);
}