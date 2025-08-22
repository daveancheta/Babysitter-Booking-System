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
import { UserProfileDisplay } from '@/components/user-profile-display';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Personal Information',
        href: '/settings/personalInformation',
    },
];

export default function Profile({ mustVerifyEmail, status }: { mustVerifyEmail: boolean; status?: string }) {
    const { auth } = usePage<SharedData>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Personal Information" />

            <SettingsLayout>
                <div className="space-y-6">
                    <div className='flex justify-between'>
                    <HeadingSmall title="Personal information" description="Update your Personal Information" />

                    <UserProfileDisplay/>
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
                                        autoComplete="email"
                                        placeholder="Email address"
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="email">Residential Address</Label>

                                    <Input
                                        id="email"
                                        type="email"
                                        className="mt-1 block w-full"
                                        defaultValue={auth.user.address}
                                        name="email"
                                        required
                                        autoComplete="address"
                                        placeholder="Residential Address"
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="email">Contact Number</Label>

                                    <Input
                                        id="email"
                                        type="email"
                                        className="mt-1 block w-full"
                                        defaultValue={auth.user.address}
                                        name="email"
                                        required
                                        autoComplete="contact_number"
                                        placeholder="Contact Number"
                                    />
                                </div>

                                <div className="flex items-center gap-4">
                                    <Button>Save</Button>
                                </div>
                </div>

            </SettingsLayout>
        </AppLayout>
    );
}
