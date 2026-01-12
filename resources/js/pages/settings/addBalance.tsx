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
import { Megaphone, Wallet } from "lucide-react";
import { use, useEffect } from 'react';
import { PageProps as InertiaPageProps } from '@inertiajs/core'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Add Balance',
        href: '/addBalance',
    },
];


interface PageProps extends InertiaPageProps {
    flash: {
        message?: string;
    }
}
export default function Profile() {
    const { flash } = usePage<PageProps>().props;

    const { data, setData, post, processing, errors } = useForm({
        account_id: '',
        balance: ''
    });

    const updateBalance = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('balance.update'));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Add Balance" />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Add Balance" description="Update your name and email address" />
                    <form onSubmit={updateBalance} className='space-y-6'>
                        {flash.message && <Alert>
                            <Megaphone />
                            <AlertTitle>Notification!</AlertTitle>
                            <AlertDescription>
                                {flash.message}
                            </AlertDescription>
                        </Alert>}
                        {Object.keys(errors).length > 0 && (
                            <div className='mt-2'>

                                <ul>
                                    {Object.entries(errors).map(([key, message]) => (
                                        <li key={key}>{message as string}</li>
                                    ))}
                                </ul>

                            </div>
                        )}
                        <div className="grid gap-2">
                            <Label>Enter Account ID</Label>
                            <Input type="text" placeholder='G7kP2xQ9wR' onChange={(e) => setData('account_id', e.target.value)} value={data.account_id} />
                        </div>

                        <div className="grid gap-2">
                            <Label>Enter Amount</Label>
                            <Input
                                type="number"
                                step="0.01"
                                placeholder="100.00"
                                onChange={(e) => setData('balance', e.target.value)}
                                value={data.balance}
                            />

                        </div>

                        <Button type='submit' className='cursor-pointer' disabled={processing || !data.balance.trim() || !data.account_id}><Wallet />Cash In</Button>
                    </form>
                </div>


            </SettingsLayout>
        </AppLayout>
    );
}
