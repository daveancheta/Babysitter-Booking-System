import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { SharedData, type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, Baby, UserPlus, Megaphone, Calendar } from 'lucide-react';
import AppLogo from './app-logo';

export function AppSidebar() {
    const { auth } = usePage<SharedData>().props;
    const mainNavItems: NavItem[] = [

        ...(auth?.user.is_admin ? [
            {
                title: 'Dashboard',
                href: '/dashboard',
                icon: LayoutGrid,
            },
        ] : []),

        ...(auth?.user.is_admin ? [] : [
            {
                title: 'Find a Babysitter',
                href: '/babysitter',
                icon: Baby,
            },
        ]),

        ...(auth?.user.is_babysitter || auth?.user.is_admin ? [] : [
            {
                title: 'Book Now',
                href: '/parent',
                icon: UserPlus,
            },
        ]),
        ...(auth?.user.is_admin ? [] : [
            {
                title: 'Bookings History',
                href: '/notification',
                icon: Calendar,
            },
        ])
    ];

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={auth?.user.is_admin ? '/dashboard' : 'babysitter'} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}