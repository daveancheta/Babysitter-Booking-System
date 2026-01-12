import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar';
import { UserMenuContent } from '@/components/user-menu-content';
import { useIsMobile } from '@/hooks/use-mobile';
import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { UserProfileInfo } from './user-profile-info';

export function UserProfileDisplay() {
    const { auth } = usePage<SharedData>().props;

    return (

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                            <UserProfileInfo user={auth.user} />
                    </DropdownMenuTrigger>
                </DropdownMenu>
            
    );
}
