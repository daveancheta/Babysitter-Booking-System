import { type BreadcrumbItem, type SharedData } from '@/types';
import { Transition } from '@headlessui/react';
import { Form, Head, Link, usePage } from '@inertiajs/react';

import DeleteUser from '@/components/delete-user';
import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { Copy, Star } from "lucide-react";
import { use, useEffect } from 'react';
import { PageProps as InertiaPageProps } from '@inertiajs/core'

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Profile settings',
        href: '/settings/profile',
    },
];

interface PageProps extends InertiaPageProps {
    followingCount: number;
}

export default function Profile({ mustVerifyEmail, status }: { mustVerifyEmail: boolean; status?: string }) {
    const { auth } = usePage<SharedData>().props;
    let balance = auth.user.balance;
    let balanceFormatted = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }).format(balance);
    const balanceValue = '$' + balanceFormatted;
    let rate = auth.user.rate;
    let rateFormatted = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }).format(rate);
    const rateValue = "$" + rateFormatted;
    const { followingCount } = usePage<PageProps>().props;

    useEffect(() => {
        let copyButton = document.getElementById("copyButton");
        let copyText = document.getElementById("copyText");


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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Profile settings" />

            <SettingsLayout>
                <div className="space-y-6">
                    <div className='flex justify-between items-center'>
                        <HeadingSmall title="Profile information" description="Update your name and email address" />
                        <div className='flex flex-row gap-4'>
                            <div className='flex flex-col items-center'>
                                <p className="text-sm text-muted-foreground">
                                    {followingCount > 0 ? followingCount : 0}
                               
                                    </p>
                                <h3 className="mb-0.5 text-sm font-medium">Following</h3>
                            </div>
                            <div className="border-l h-10"></div>
                            <div className='flex flex-col items-center'>
                                <p className="text-sm text-muted-foreground">36</p>
                                <h3 className="mb-0.5 text-sm font-medium">Followers</h3>
                            </div>
                            <div className="border-l h-10"></div>
                            <div className='flex flex-col items-center'>
                                <p className="text-sm text-muted-foreground">5/5</p>
                                <h3 className="mb-0.5 text-sm font-medium">Rate</h3>
                            </div>
                            <div className="border-l h-10"></div>
                            <div className='flex flex-col items-center'>
                                <p className="text-sm text-muted-foreground">12</p>
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

                                <div className="grid gap-2">
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
