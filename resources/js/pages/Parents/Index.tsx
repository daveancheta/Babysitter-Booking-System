import { Input } from '@/components/ui/input';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
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
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { PageProps as InertiaPageProps } from '@inertiajs/core'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CircleAlert, Megaphone, History, Heart, MessageCircleMore, EllipsisVertical, Send, Star } from 'lucide-react';
import { UserDisplay } from '@/components/user-display';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useInitials } from '@/hooks/use-initials';
import moment from 'moment';
import { useState, useEffect, use } from "react";
import { parse } from 'path';
import { StringToBoolean } from 'class-variance-authority/types';
import { Badge } from '@/components/ui/badge';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Book Now',
        href: '/parent',
    },
];

interface Users {
    id: number;
    name: string;
    email: string;
    address: string;
    contact_number: string;
    profile: string;
    rate: number;
}

interface PageProps extends InertiaPageProps {
    users: Users[];
}

export default function Index() {
    const { users } = usePage<PageProps>().props;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Book Now" />
            <div id='ajax' className="flex h-full flex-1 flex-col gap-6 rounded-xl p-4 overflow-x-auto">

                {users.length > 0 && (
                    <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
                        {users.map((u) => (
                            <div className='bg-background rounded-lg border shadow-lg duration-200 min-h-[200px] flex flex-col' key={u.id}>
                                <img className='object-cover w-full h-100 rounded-t-lg' src={`${window.location.origin}/storage/${u.profile}`} alt="" />
                                <div className='flex flex-col p-6'>
                                    <Badge className='mb-5'>Babysitter</Badge>
                                    <div className='flex justify-between items-center'>
                                        <h1 className='font-bold'>Name: <span className='font-normal'>{u.name}</span></h1>
                                        <div className='flex flex-row gap-1 item-center'>
                                            <Star className='dark:fill-yellow-500 dark:text-yellow-500 fill-yellow-400 text-yellow-400' />
                                            <span>5/10</span>
                                        </div>
                                    </div>
                                    <div className=''>
                                        <span className='font-bold'>Hourly Rate:</span>
                                        <span className='text-green-700 font-bold dark:text-green-500'> ${u.rate}</span>
                                    </div>
                                </div>
                                <Button className='m-6' variant="outline">Book Now</Button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout >
    );
}
