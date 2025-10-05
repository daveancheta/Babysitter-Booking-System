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
import { CircleAlert, Megaphone, History, Heart, MessageCircleMore, EllipsisVertical, Send, Star, ChevronDownIcon, Trash2 } from 'lucide-react';
import { UserDisplay } from '@/components/user-display';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useInitials } from '@/hooks/use-initials';
import moment from 'moment';
import { useState, useEffect, use } from "react";
import { parse } from 'path';
import { StringToBoolean } from 'class-variance-authority/types';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import * as React from "react"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Notification',
        href: '/notification',
    },
];

interface Bookings {
    id: number;
    name: string;
    babysitter_id: number;
    contact_number: string;
    profile: string;
    rate: number;
    status: string;
    payment_method: string;
    user_id: number;
    start_date: string;
    end_date: string;
    date: number;
}

interface Books {
    id: number;
    name: string;
    babysitter_id: number;
    contact_number: string;
    profile: string;
    rate: number;
    status: string;
    payment_method: string;
    user_id: number;
    start_date: string;
    end_date: string;
    date: number;
}

interface PageProps extends InertiaPageProps {
    bookings: Bookings[];
    books: Books[];
}

export default function Notification() {
    const { auth } = usePage<SharedData>().props;
    const { bookings, books } = usePage<PageProps>().props;

    const { data, setData, post, processing, errors } = useForm({
        booking_id: 0,
        action: '',
        user_id: 0,
        babysitter_id: 0,
        payment_method: '',
        status: '',
        start_date: '',
        end_date: '',
    });

    const handleCancelStatus = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('booking.update'));
    }

     const handleStatusUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('bookings_status.update'));
    }

    const isMobile = useIsMobile();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Notification" />
            {auth.user.is_babysitter ? (
                <div id='ajax' className="flex h-full flex-1 flex-col gap-6 rounded-xl p-4 overflow-x-auto">
                    {bookings.length > 0 && (
                        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
                            {bookings.map((b) => (
                                <div className='dark:bg-neutral-900 bg-background rounded-lg border shadow-lg duration-200 min-h-[200px] flex flex-col' key={b.id}>
                                    <div className='relative'>
                                        <img className='object-cover w-full h-100 rounded-t-lg' src={`${window.location.origin}/storage/${b.profile}`} alt="" />
                                        <Badge variant={b.status === 'pending' ? 'booked' : (b.status === 'approved' ? 'available' : (b.status === 'done' ? 'available' : 'booked'))}><span className='uppercase'>{b.status}</span></Badge>
                                    </div>
                                    <div className='flex flex-col p-6'>
                                        <div className='flex justify-between items-center'>
                                            <h1 className='font-bold'>Parent Name: <span className='font-normal'>{b.name}</span></h1>
                                            <div className='flex flex-row gap-1 item-center'>
                                                <Star className='dark:fill-yellow-500 dark:text-yellow-500 fill-yellow-400 text-yellow-400' />
                                                <span>5/10</span>
                                            </div>
                                        </div>
                                        <div className=''>
                                            <span className='font-bold'>Hourly Rate:</span>
                                            <span className='text-green-700 font-bold dark:text-green-500'> ${auth.user.rate}</span>
                                        </div>
                                        <div>
                                            <h1 className='font-bold'>Payment Method: <span className='font-normal'>{b.payment_method === 'hour' ? 'Per Hour' : (b.payment_method === 'week' ? 'Per Week' : 'Per Month')}</span></h1>
                                        </div>
                                        <div>
                                            <h1 className='font-bold'>Babysitting Duration: <span className='font-normal'>{b.date} {b.date > 1 ? 'days' : 'day'}</span></h1>
                                        </div>
                                    </div>
                                    <div className={cn('m-6 flex flex-row gap-2', isMobile ? 'justify-center' : '')}>
                                        <form onSubmit={handleStatusUpdate}>
                                            <Button disabled={b.status === 'approved' || b.status === 'declined' || b.status === 'cancelled' || b.status === "done" || processing} variant='secondary' onClick={() => {
                                                setData('status', 'approved');
                                                setData('booking_id', b.id)
                                                setData('babysitter_id', b.babysitter_id)
                                            }}>Approved</Button>
                                        </form>
                                        <form onSubmit={handleStatusUpdate}>
                                        <Button variant='secondary' onClick={() => {
                                                setData('status', 'declined');
                                                setData('booking_id', b.id)
                                                setData('babysitter_id', b.babysitter_id)
                                            }} disabled={b.status === 'approved' || b.status === 'declined' || b.status === 'cancelled' || b.status === "done" || processing}>Decline</Button>
                                        </form>
                                        <form onSubmit={handleStatusUpdate}>
                                        <Button variant='secondary' onClick={() => {
                                                setData('status', 'done');
                                                setData('booking_id', b.id)
                                                setData('babysitter_id', b.babysitter_id)
                                            }} disabled={b.status === 'declined' || b.status === 'cancelled' || b.status === "done" || processing}>Done</Button>
                                    </form>
                                    </div>

                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ) : (
                <div id='ajax' className="flex h-full flex-1 flex-col gap-6 rounded-xl p-4 overflow-x-auto">
                    {books.length > 0 && (
                        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
                            {books.map((b) => (
                                <div className='bg-background rounded-lg border shadow-lg duration-200 min-h-[200px] flex flex-col' key={b.id}>
                                    <div className='relative'>
                                        <img className='object-cover w-full h-100 rounded-t-lg' src={`${window.location.origin}/storage/${b.profile}`} alt="" />
                                        <Badge variant={b.status === 'pending' ? 'booked' : (b.status === 'approved' ? 'available' : (b.status === 'done' ? 'available' : 'booked'))}><span className='uppercase'>{b.status}</span></Badge>
                                    </div>

                                    <div className='flex flex-col p-6'>
                                        <div className='flex justify-between items-center'>
                                            <h1 className='font-bold'>Babysitter Name: <span className='font-normal'>{b.name}</span></h1>
                                            <div className='flex flex-row gap-1 item-center'>
                                                <Star className='dark:fill-yellow-500 dark:text-yellow-500 fill-yellow-400 text-yellow-400' />
                                                <span>5/10</span>
                                            </div>
                                        </div>
                                        <div className=''>
                                            <span className='font-bold'>Hourly Rate:</span>
                                            <span className='text-green-700 font-bold dark:text-green-500'> ${b.rate}</span>
                                        </div>
                                        <div>
                                            <h1 className='font-bold'>Payment Method: <span className='font-normal'>Per Hour</span></h1>
                                        </div>
                                        <div>
                                            <h1 className='font-bold'>Babysitting Duration: <span className='font-normal'>{b.date} {b.date > 1 ? 'days' : 'day'}</span></h1>
                                        </div>
                                    </div>
                                    <div className='m-6 flex flex-row gap-2'>
                                        <form onSubmit={handleCancelStatus}>
                                            <Button type='submit' onClick={() => {
                                                setData('status', 'cancelled');
                                                setData('booking_id', b.id)
                                                setData('babysitter_id', b.babysitter_id)
                                            }
                                            } className="mt-auto w-20 bg-gray-600 hover:bg-gray-700 text-white dark:bg-gray-700 dark:hover:bg-gray-800 cursor-pointer" disabled={b.status === 'approved' || b.status === 'declined' || b.status === 'cancelled' || b.status === "done" || processing}>
                                                Cancel
                                            </Button>
                                        </form>
                                    </div>

                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </AppLayout >
    );
}