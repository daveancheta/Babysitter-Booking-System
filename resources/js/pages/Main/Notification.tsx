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

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Notification',
        href: '/notification',
    },
];

interface Bookings {
    id: number;
    name: string;
    contact_number: string;
    profile: string;
    rate: number;
    status: string;
    user_id: number;
}

interface PageProps extends InertiaPageProps {
    bookings: Bookings[];
}

export default function Notification() {
    const { bookings } = usePage<PageProps>().props;


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Notification" />
            <div id='ajax' className="flex h-full flex-1 flex-col gap-6 rounded-xl p-4 overflow-x-auto">
                {bookings.length > 0 && (
                    <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
                        {bookings.map((b) => (
                            <div className='bg-background rounded-lg border shadow-lg duration-200 min-h-[200px] flex flex-col' key={b.id}>
                                <div className='relative'>
                                    <img className='object-cover w-full h-100 rounded-t-lg' src={`${window.location.origin}/storage/${b.profile}`} alt="" />
                                    <Badge variant={b.status === 'pending' ? 'booked' : (b.status === 'approved' ? 'booked' : 'available')}>{b.status === 'pending' ? 'BOOKED' : (b.status === 'approved' ? 'BOOKED' : 'AVAILABLE')}</Badge>
                                    <div className='absolute top-2 left-2'>
                                        <Tooltip>
                                            <TooltipTrigger><CircleAlert className='w-5 h-5 text-white' /></TooltipTrigger>
                                            <TooltipContent>
                                                <p>You can book a babysitter for up to one month.</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </div>
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
                                        <span className='text-green-700 font-bold dark:text-green-500'> ${b.rate}</span>
                                    </div>
                                </div>
                                <div className='m-6 flex flex-row gap-2'>
                                    <Button className="mt-auto w-full bg-green-600 hover:bg-green-700 text-white dark:bg-green-700 dark:hover:bg-green-800">
                                        Accept
                                    </Button>

                                    <Button className="mt-auto w-full bg-amber-500 hover:bg-amber-600 text-white dark:bg-amber-600 dark:hover:bg-amber-700">
                                        Decline
                                    </Button>

                                    <Button className="mt-auto bg-red-500 hover:bg-red-600 text-white dark:bg-red-600 dark:hover:bg-red-700">
                                        <Trash2 />
                                    </Button>

                                </div>

                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout >
    );
}
