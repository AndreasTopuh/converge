import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BookOpenText,
  BrainCircuit,
  Building2,
  CalendarDays,
  ChartColumnBig,
  ChevronDown,
  ChevronRight,
  CircleCheckBig,
  ClipboardCheck,
  Clock3,
  CornerDownRight,
  Database,
  FileClock,
  FilePenLine,
  FileText,
  Group,
  History,
  LayoutDashboard,
  LibraryBig,
  Lightbulb,
  ListTodo,
  Mail,
  MessageSquare,
  MessagesSquare,
  Network,
  Orbit,
  Paperclip,
  RefreshCw,
  Scale,
  ScanSearch,
  Search,
  Send,
  Shield,
  ShieldCheck,
  SlidersHorizontal,
  type LucideIcon,
  Users,
  UsersRound,
} from 'lucide-react';

interface MaterialIconProps {
  icon: string;
  className?: string;
  filled?: boolean;
}

const iconMap: Record<string, LucideIcon> = {
  apartment: Building2,
  arrow_forward: ArrowRight,
  arrow_outward: ArrowUpRight,
  attachment: Paperclip,
  article: FileText,
  auto_stories: BookOpenText,
  calendar_month: CalendarDays,
  chat: MessageSquare,
  check_circle: CircleCheckBig,
  checklist: ListTodo,
  chevron_right: ChevronRight,
  database: Database,
  description: FileText,
  draft: FileClock,
  edit_note: FilePenLine,
  expand_more: ChevronDown,
  fact_check: ClipboardCheck,
  forum: MessagesSquare,
  group: Group,
  groups: UsersRound,
  history: History,
  hub: Orbit,
  lan: Network,
  library_books: LibraryBig,
  lightbulb: Lightbulb,
  mail: Mail,
  monitoring: ChartColumnBig,
  psychology_alt: BrainCircuit,
  rule: Scale,
  schedule: Clock3,
  search: Search,
  send: Send,
  shield: Shield,
  space_dashboard: LayoutDashboard,
  subdirectory_arrow_right: CornerDownRight,
  sync: RefreshCw,
  timeline: ChartColumnBig,
  travel_explore: ScanSearch,
  tune: SlidersHorizontal,
  verified: BadgeCheck,
  verified_user: ShieldCheck,
  check_circle_filled: CircleCheckBig,
  group_users: Users,
};

export default function MaterialIcon({
  icon,
  className = '',
  filled = false,
}: MaterialIconProps) {
  const Icon = iconMap[icon] ?? Search;
  const classes = ['material-symbol', filled ? 'filled' : '', className]
    .filter(Boolean)
    .join(' ');

  return (
    <Icon
      aria-hidden="true"
      className={classes}
      strokeWidth={filled ? 2.2 : 1.9}
      absoluteStrokeWidth
    />
  );
}
