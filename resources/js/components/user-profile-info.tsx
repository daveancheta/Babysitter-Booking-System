import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useInitials } from '@/hooks/use-initials';
import { SharedData, type User } from '@/types';
import { usePage } from '@inertiajs/react';

export function UserProfileInfo({ user, showEmail = false }: { user: User; showEmail?: boolean }) {
    const { auth } = usePage<SharedData>().props;
    const getInitials = useInitials();

    return (
        <>
            <Avatar className="h-25 w-25 overflow-hidden rounded-full text-xl">
                <AvatarImage src={user.avatar} alt={user.name} />
                {auth?.user.profile === null ? <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                    {getInitials(user.name)}
                </AvatarFallback> : <img
                    className="rounded-full bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white object-cover border-4 border border-gray-900 dark:border-white"
                    src={`${window.location.origin}/storage/${auth?.user.profile}`}
                    alt=""
                />
                }
            </Avatar>
        </>
    );
}
