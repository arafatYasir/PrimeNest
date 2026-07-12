import { useState } from 'react';
import { Link, NavLink } from 'react-router';
import {
    LayoutDashboard,
    Building2,
    Heart,
    User,
    MessageSquare,
    ArrowLeft,
    Menu,
    ChevronsRight,
    ChevronsLeft,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';

const navLinks = [
    { name: 'Overview', path: '/dashboard', icon: LayoutDashboard, end: true },
    { name: 'My Properties', path: '/dashboard/properties', icon: Building2 },
    { name: 'Saved Properties', path: '/dashboard/saved', icon: Heart },
    { name: 'Agent Profile', path: '/dashboard/profile', icon: User },
    { name: 'Inbox', path: '/dashboard/inbox', icon: MessageSquare },
];

interface SidebarLinkProps {
    link: typeof navLinks[number];
    isCollapsed?: boolean;
    mobile?: boolean;
    onClick?: () => void;
}

const SidebarLink = ({ link, isCollapsed = false, mobile = false, onClick }: SidebarLinkProps) => {
    const Icon = link.icon;

    return (
        <NavLink
            to={link.path}
            end={link.end}
            onClick={onClick}
            className={({ isActive }) =>
                cn(
                    'group flex items-center rounded-lg text-sm/relaxed font-medium transition-all duration-200',
                    mobile
                        ? 'gap-3 px-3 py-3 text-base/relaxed'
                        : isCollapsed
                            ? 'justify-center py-2.5'
                            : 'justify-start gap-3 px-3 py-2.5',
                    isActive
                        ? 'bg-secondary text-white shadow-lg'
                        : 'text-text-secondary hover:bg-primary/5 hover:text-text'
                )
            }
        >
            {({ isActive }) => (
                <>
                    <Icon
                        className={cn(
                            'shrink-0 transition-colors duration-200',
                            mobile ? 'size-5' : 'size-5',
                            isActive ? 'text-white' : 'text-text-secondary group-hover:text-text'
                        )}
                    />
                    {(!isCollapsed || mobile) && <span>{link.name}</span>}
                </>
            )}
        </NavLink>
    );
};

export const Sidebar = () => {
    // States
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <>
            {/* ---- Mobile hamburger ---- */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger>
                    <Button
                        variant="ghost"
                        size="icon-lg"
                        className="fixed top-4 left-4 z-40 lg:hidden h-10 w-10 rounded-lg border border-border bg-card text-text-secondary shadow-sm hover:bg-sidebar-accent hover:text-sidebar-foreground"
                    >
                        <Menu className="size-5" />
                        <span className="sr-only">Open navigation</span>
                    </Button>
                </SheetTrigger>
                <SheetContent
                    side="left"
                    className="w-[280px] border-r border-sidebar-border bg-sidebar p-0"
                >
                    <SheetHeader className="border-b border-sidebar-border p-4">
                        <SheetTitle className="font-heading text-lg font-bold tracking-tight text-primary">
                            PrimeNest
                        </SheetTitle>
                    </SheetHeader>
                    <nav className="flex-1 space-y-1 overflow-y-auto p-3">
                        {navLinks.map((link) => (
                            <SidebarLink
                                key={link.name}
                                link={link}
                                mobile
                                onClick={() => setMobileOpen(false)}
                            />
                        ))}
                    </nav>

                    <div className="border-t border-border p-3">
                        <Link
                            to="/"
                            title='Back to site'
                        >
                            <Button size="lg">
                                <ArrowLeft className="size-4 shrink-0" />

                                {!isCollapsed && <span>Back to site</span>}
                            </Button>
                        </Link>
                    </div>
                </SheetContent>
            </Sheet>

            {/* ---- Desktop Sidebar ---- */}
            <aside
                className={cn(
                    'hidden lg:flex h-screen flex-col border-r border-border bg-card text-text transition-all duration-300 ease-in-out',
                    isCollapsed ? 'w-22' : 'w-full min-w-[240px] max-w-[18%]'
                )}
            >
                <div
                    className={cn(
                        'flex items-center border-b border-border',
                        isCollapsed ? 'justify-center p-2' : 'justify-between py-4 px-6'
                    )}
                >
                    {!isCollapsed && (
                        <span className="font-heading text-xl font-bold tracking-tight text-text">
                            Dashboard
                        </span>
                    )}
                    <Button
                        variant="ghost"
                        size="icon-lg"
                        onClick={() => setIsCollapsed(prev => !prev)}
                        className="text-text-secondary"
                        title={isCollapsed ? "Expand" : "Collapse"}
                    >
                        {isCollapsed ? (
                            <ChevronsRight className="size-5" />
                        ) : (
                            <ChevronsLeft className="size-5" />
                        )}
                    </Button>
                </div>

                <nav className="flex-1 space-y-1 overflow-y-auto py-4 px-6">
                    {navLinks.map((link) => (
                        <SidebarLink
                            key={link.name}
                            link={link}
                            isCollapsed={isCollapsed}
                        />
                    ))}
                </nav>

                <div className="border-t border-border py-4 px-6">
                    <Link
                        to="/"
                        title='Back to site'
                    >
                        <Button size="lg">
                            <ArrowLeft className="size-4 shrink-0" />

                            {!isCollapsed && <span>Back to site</span>}
                        </Button>
                    </Link>
                </div>
            </aside>
        </>
    );
};
