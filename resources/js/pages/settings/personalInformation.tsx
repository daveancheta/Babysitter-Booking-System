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
import { UserProfileDisplay } from '@/components/user-profile-display';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CircleAlert, Megaphone } from 'lucide-react';
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
import { PageProps as InertiaPageProps } from '@inertiajs/core'

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Personal Information',
        href: '/settings/personalInformation',
    },
];

interface PageProps extends InertiaPageProps {
    flash: {
        message: string;
    }
}

export default function Profile({ mustVerifyEmail, status }: { mustVerifyEmail: boolean; status?: string }) {
    const { flash } = usePage<PageProps>().props;
    const { auth } = usePage<SharedData>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Personal Information" />


            <SettingsLayout>
                <div className="space-y-6">
                    <div className='flex justify-between'>
                        <HeadingSmall title="Personal information" description="Update your Personal Information" />

                        <div className='flex flex-col items-center gap-2'>
                            <UserProfileDisplay />
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="outline" className='h-8 w-20 text-xs'>Edit Profile</Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <Form
                                        method="post"
                                        action={route('profilePicture.update')}
                                        options={{
                                            preserveScroll: true,
                                        }}
                                        className="space-y-6" encType='multipart/form-data'>
                                        {({ processing, recentlySuccessful, errors }) => (
                                            <>
                                                <DialogHeader>
                                                    <DialogTitle>Edit Profile Picture</DialogTitle>
                                                    <DialogDescription>
                                                        Make changes to your profile picture here. Click save when you&apos;re
                                                        done.
                                                    </DialogDescription>
                                                </DialogHeader>
                                                {flash.message && <Alert>
                                                    <Megaphone />
                                                    <AlertTitle>Notification!</AlertTitle>
                                                    <AlertDescription>
                                                        {flash.message}
                                                    </AlertDescription>
                                                </Alert>}
                                                <div className="grid gap-4">
                                                    <div className="grid gap-3">
                                                        <Label htmlFor="picture">Profile Picture</Label>
                                                        <Input type='file' id="picture" name="profile" accept='image/*'
                                                            required />
                                                        <InputError className="mt-2" message={errors.profile} />
                                                    </div>
                                                </div>
                                                <DialogFooter>
                                                    <DialogClose asChild>
                                                        <Button variant="outline">Cancel</Button>
                                                    </DialogClose>
                                                    <Button type="submit">Save changes</Button>
                                                </DialogFooter>
                                            </>
                                        )}
                                    </Form>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>

                    <Form
                        method="patch"
                        action={route('personalInformation.update')}
                        options={{
                            preserveScroll: true,
                        }}
                        className="space-y-6"
                    >
                        {({ processing, recentlySuccessful, errors }) => (
                            <>
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Name</Label>

                                    <Input
                                        id="name"
                                        className="mt-1 block w-full"
                                        defaultValue={auth.user.name}
                                        name="name"
                                        required
                                        autoComplete="name"
                                        placeholder="Full name" readOnly
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
                                        placeholder="Email address" readOnly
                                    />

                                    <InputError className="mt-2" message={errors.email} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="address">Residential address</Label>

                                    <Input
                                        id="address"
                                        type="text"
                                        className="mt-1 block w-full"
                                        defaultValue={auth.user.address}
                                        name="address"
                                        autoComplete="address"
                                        placeholder="Residential address"
                                    />

                                    <InputError className="mt-2" message={errors.address} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="contact_number">Contact number</Label>

                                    <Input
                                        id="contact_number"
                                        type="text"
                                        inputMode='numeric'
                                        pattern='[0-9]*'
                                        className="mt-1 block w-full"
                                        defaultValue={auth.user.contact_number}
                                        name="contact_number"
                                        autoComplete="contact_number"
                                        placeholder="Contact number"
                                    />

                                    <InputError className="mt-2" message={errors.contact_number} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="rate">Hourly rate</Label>

                                    <Input
                                        id="rate"
                                        type="number"
                                        step='0.01'
                                        className="mt-1 block w-full"
                                        defaultValue={auth.user.rate}
                                        name="rate"
                                        autoComplete="rate"
                                        placeholder="Hourly rate number"
                                    />

                                    <InputError className="mt-2" message={errors.rate} />
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

            </SettingsLayout>
        </AppLayout>
    );
}
