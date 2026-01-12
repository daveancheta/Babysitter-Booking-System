import { type BreadcrumbItem, type SharedData } from '@/types';
import { Transition } from '@headlessui/react';
import { Form, Head, Link, useForm, usePage } from '@inertiajs/react';

import DeleteUser from '@/components/delete-user';
import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { Copy, Star, UserCheck, UserMinus, UserPlus } from "lucide-react";
import { use, useEffect } from 'react';
import { PageProps as InertiaPageProps } from '@inertiajs/core'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { StringToBoolean } from 'class-variance-authority/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useInitials } from '@/hooks/use-initials';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Profile settings',
        href: '/settings/profile',
    },
];

interface followingUser {
    id: number;
    name: string;
    profile: string;
    following_user_id: number;
}
interface followerUser {
    id: number;
    name: string;
    profile: string;
    following_user_id: number;
    follower_user_id: number;
    ifFollows: number;
}

interface PageProps extends InertiaPageProps {
    followingCount: number;
    followerCount: number;
    followingUser: followingUser[];
    followerUser: followerUser[];
    rateAverage: [];
    hireCount: [];
}

export default function Profile({ mustVerifyEmail, status }: { mustVerifyEmail: boolean; status?: string }) {
    const { auth } = usePage<SharedData>().props;
    const balance = auth.user.balance;
    const balanceFormatted = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }).format(balance);
    const balanceValue = '₱' + balanceFormatted;
    const rate = auth.user.rate;
    const rateFormatted = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }).format(rate);
    const rateValue = "₱" + rateFormatted;
    const { followingCount, followerCount, followingUser, followerUser, rateAverage, hireCount } = usePage<PageProps>().props;

    const { delete: destroy, processing: processingDelete } = useForm({});

    const { setData, post, processing } = useForm({
        following_user_id: 0,
        follower_user_id: 0,
    });

    const handleUnfollowUser = (followId: number) => {
        destroy(route('follow.destroy', { followId }));
    }

    const handleFollowValidation = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('follow_profile.store'));
    }

    useEffect(() => {
        const copyButton = document.getElementById("copyButton");
        const copyText = document.getElementById("copyText");


        copyButton?.addEventListener("click", () => {
            if (copyButton) {
                copyText?.classList.remove("hidden");
                setTimeout(() => {

                    if (copyText) {
                        copyText?.classList.add("hidden");
                    }
                }, 1000);
            }


        })
    })

    const getInitials = useInitials();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Profile settings" />

            <SettingsLayout>
                <div className="space-y-6">
                    <div className='block-flex xl:flex xl:justify-between'>
                        <HeadingSmall title="Profile information" description="Update your name and email address" />
                        <div className='flex flex-row gap-4 xl:mt-0 mt-4 justify-center'>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <button className='flex flex-col items-center cursor-pointer'>
                                        <p className="text-sm text-muted-foreground">
                                            {followingCount > 0 ? followingCount : 0}
                                        </p>
                                        <h3 className="mb-0.5 text-sm font-medium">Following</h3>
                                    </button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle>Following</DialogTitle>
                                    </DialogHeader>
                                    <div className="grid gap-4">
                                        {followingUser.length > 0 ? (
                                            <div className="grid gap-3 mt-5">
                                                {followingUser.map(f => (
                                                    <div key={f.id}>
                                                        <div className='flex justify-between items-center'>
                                                            <div className='flex flex-row gap-2 items-center'>
                                                                <Avatar className="h-15 w-15 overflow-hidden rounded-full">
                                                                    {f.profile === null ? <AvatarFallback className="rounded-full bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                                                                        {getInitials(f.name)} </AvatarFallback> : <img className='rounded-full bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white object-cover' src={`${window.location.origin}/storage/${f.profile}`} alt="" />}
                                                                </Avatar>
                                                                <span className='truncate text-xs'>{f.name}{f.id}</span>
                                                            </div>
                                                            <Button variant='outline' className='cursor-pointer text-xs' onClick={() => handleUnfollowUser(f.id)} disabled={processingDelete}><UserMinus />Unfollow</Button>
                                                        </div>
                                                        <hr className='mt-2' />
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="mt-5 text-center text-muted-foreground">
                                                You&apos;re not following anyone yet
                                            </div>
                                        )}

                                    </div>
                                </DialogContent>
                            </Dialog>
                            <div className="border-l h-10"></div>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <button className='flex flex-col items-center cursor-pointer'>
                                        <p className="text-sm text-muted-foreground">{followerCount > 0 ? followerCount : 0}</p>
                                        <h3 className="mb-0.5 text-sm font-medium">Followers</h3>
                                    </button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle>Followers</DialogTitle>
                                    </DialogHeader>
                                    <div className="grid gap-4">
                                        {followerUser.length > 0 ? (
                                            <div className="grid gap-3 mt-5">
                                                {followerUser.map(f => (
                                                    <div key={f.id}>
                                                        <div className='flex justify-between items-center'>
                                                            <div className='flex flex-row gap-2 items-center'>
                                                                <Avatar className="h-15 w-15 overflow-hidden rounded-full">
                                                                    {f.profile === null ? <AvatarFallback className="rounded-full bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                                                                        {getInitials(f.name)} </AvatarFallback> : <img className='rounded-full bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white object-cover' src={`${window.location.origin}/storage/${f.profile}`} alt="" />}
                                                                </Avatar>
                                                                <span className='truncate text-xs'>{f.name}</span>
                                                            </div>
                                                            {f.ifFollows > 0 ? <Button variant='outline' className='text-xs'><UserCheck />Following</Button> :
                                                                <form onSubmit={handleFollowValidation}>
                                                                    <Button type='submit' onClick={() => {
                                                                        setData('following_user_id', f.follower_user_id);
                                                                        setData('follower_user_id', auth?.user.id);
                                                                    }} variant='outline' className='items-center cursor-pointer text-xs' disabled={processing}><UserPlus />Follow</Button>
                                                                </form>}
                                                        </div>
                                                        <hr className='mt-2' />
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="mt-5 text-center text-muted-foreground">
                                                You don&apos;t have any followers yet
                                            </div>
                                        )}

                                    </div>
                                </DialogContent>
                            </Dialog>
                            <div className={auth?.user.is_babysitter ? 'border-l h-10' : 'hidden'}></div>
                            <div className={auth?.user.is_babysitter ? 'flex flex-col items-center' : 'hidden'}>
                                <p className="text-sm text-muted-foreground">{rateAverage}</p>
                                <h3 className="mb-0.5 text-sm font-medium">Rate</h3>
                            </div>
                            <div className={auth?.user.is_babysitter ? 'border-l h-10' : 'hidden'}></div>
                            <div className={auth?.user.is_babysitter ? 'flex flex-col items-center' : 'hidden'}>
                                <p className="text-sm text-muted-foreground">{hireCount}</p>
                                <h3 className="mb-0.5 text-sm font-medium">Hires</h3>
                            </div>
                        </div>
                    </div>
                    <Form
                        method="patch"
                        action={route('profile.update')}
                        options={{
                            preserveScroll: true,
                        }}
                        className="space-y-6"
                    >
                        {({ processing, recentlySuccessful, errors }) => (
                            <>
                                <div className="grid gap-2">
                                    <Label htmlFor="balance">Account ID</Label>

                                    <div className='border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                                    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                                    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive'>
                                        <div className='flex flex-row w-full items-center'>
                                            <div className='select-none'>
                                                <input
                                                    id="account_id"
                                                    className="select-none pointer-events-none"
                                                    value={auth.user.account_id}
                                                    readOnly
                                                />
                                            </div>
                                            <Copy className='ms-auto w-4 h-4 cursor-pointer' id='copyButton' onClick={() => { navigator.clipboard.writeText(auth.user.account_id) }} />
                                        </div>

                                    </div>
                                    <p className='text-sm ml-1 text-green-600 hidden select-none' id='copyText'>Copied</p>
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="name">Name</Label>

                                    <Input
                                        id="name"
                                        className="mt-1 block w-full"
                                        defaultValue={auth.user.name}
                                        name="name"
                                        required
                                        autoComplete="name"
                                        placeholder="Full name"
                                    />

                                    <InputError className="mt-2" message={errors.name} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email address</Label>

                                    <Input
                                        id="email"
                                        type="email"
                                        className="mt-1 block w-full"
                                        defaultValue={auth.user.email}
                                        name="email"
                                        required
                                        autoComplete="username"
                                        placeholder="Email address"
                                    />

                                    <InputError className="mt-2" message={errors.email} />
                                </div>



                                {mustVerifyEmail && auth.user.email_verified_at === null && (
                                    <div>
                                        <p className="-mt-4 text-sm text-muted-foreground">
                                            Your email address is unverified.{' '}
                                            <Link
                                                href={route('verification.send')}
                                                method="post"
                                                as="button"
                                                className="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
                                            >
                                                Click here to resend the verification email.
                                            </Link>
                                        </p>

                                        {status === 'verification-link-sent' && (
                                            <div className="mt-2 text-sm font-medium text-green-600">
                                                A new verification link has been sent to your email address.
                                            </div>
                                        )}
                                    </div>
                                )}

                                <div className={auth?.user.is_babysitter ? 'grid gap-2' : 'hidden'}>
                                    <Label htmlFor="balance">Hourly rate</Label>

                                    <span className='border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                                    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                                    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive'>
                                        {rateValue}
                                    </span>
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="balance">Balance</Label>

                                    <span className='border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                                    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                                    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive'>
                                        {balanceValue}
                                    </span>
                                </div>

                                <div className="flex items-center gap-4">
                                    <Button disabled={processing}>Save</Button>

                                    <Transition
                                        show={recentlySuccessful}
                                        enter="transition ease-in-out"
                                        enterFrom="opacity-0"
                                        leave="transition ease-in-out"
                                        leaveTo="opacity-0"
                                    >
                                        <p className="text-sm text-neutral-600">Saved</p>
                                    </Transition>
                                </div>
                            </>
                        )}
                    </Form>
                </div>

                <DeleteUser />
            </SettingsLayout>
        </AppLayout>
    );
}
