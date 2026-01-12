import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head } from '@inertiajs/react';

import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { useState } from 'react';
import { Wallet } from 'lucide-react';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Add Balance',
        href: '/addBalance',
    },
];

export default function Profile() {
    const [balance, setBalance] = useState<Number>();
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Add Balance" />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Add Balance" description="Update your name and email address" />

                    <div className="grid gap-2">
                        <Label>Enter Amount</Label>
                        <Input
                            type="number"
                            step="0.01"
                            placeholder="Enter Amount (min: ₱100 max: ₱20,000)"
                            onChange={(e) => setBalance(Number(e.target.value))}
                        />

                    </div>

                    <Button disabled={!balance}>
                        <a href={`/paymongo-test/${balance}`} target='_blank' className='flex items-center gap-2'>
                            <Wallet />Cash In
                        </a>
                    </Button>

                </div>


            </SettingsLayout>
        </AppLayout>
    );
}
