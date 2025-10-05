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
import { CircleAlert, Megaphone, History, Heart, MessageCircleMore, EllipsisVertical, Send, Star, ChevronDownIcon, Trash2, Expand, Minimize, Hourglass, BadgeCheck, CheckCircle, XCircle, Divide, StarIcon } from 'lucide-react';
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
import { cn } from '@/lib/utils';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Notification',
        href: '/notification',
    },
];

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

interface BooksCancelled {
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

interface BooksDone {
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

interface BookingsCancelled {
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

interface BookingsDone {
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
    flash: {
        message?: string;
    }
    booksCancelled: BooksCancelled[];
    booksDone: BooksDone[];
    books: Books[];
    bookingsCancelled: BookingsCancelled[];
    bookingsDone: BookingsDone[];
    bookings: Bookings[];
}

export default function Notification() {
    const { auth } = usePage<SharedData>().props;
    const { booksCancelled, books, booksDone, bookingsCancelled, bookings, bookingsDone, flash } = usePage<PageProps>().props;

    const { data, setData, post, processing, errors } = useForm({
        booking_id: 0,
        action: '',
        user_id: 0,
        babysitter_id: 0,
        status: 'pending',
        payment_method: '',
        start_date: '',
        end_date: '',
        ratings: 0,
    });

    const { delete: destroy, processing: processingDeleteBooking } = useForm({});

    const acceptAction = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('action.store'));
    }

    const declineAction = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('action.store'));
    }

    const cancelAction = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('action.store'));
    }

    const submitDoneBookings = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('done.store'));
    }

    const submitCancelledBookings = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('cancelled.store'));
    }

    const [bookingsNavigation, setBookingsNavigation] = useState(
        localStorage.getItem("bookingsNavigation") || ""
    )

    const pendingBookingsButton = () => {
        localStorage.setItem("bookingsNavigation", "pending");
        setBookingsNavigation("pending")
    }

    const doneBookingsButton = () => {
        localStorage.setItem("bookingsNavigation", "done");
        setBookingsNavigation("done")
    }

    const cancelledBooksButton = () => {
        localStorage.setItem("bookingsNavigation", "cancelled");
        setBookingsNavigation("cancelled")
    }

    const starOne = () => {
        document.getElementById("star-1")?.classList.add("fill-yellow-500");
        document.getElementById("star-2")?.classList.remove("fill-yellow-500");
        document.getElementById("star-3")?.classList.remove("fill-yellow-500");
        document.getElementById("star-4")?.classList.remove("fill-yellow-500");
        document.getElementById("star-5")?.classList.remove("fill-yellow-500");
        document.getElementById("star-1")?.classList.add("text-yellow-500");
        document.getElementById("star-2")?.classList.remove("text-yellow-500");
        document.getElementById("star-3")?.classList.remove("text-yellow-500");
        document.getElementById("star-4")?.classList.remove("text-yellow-500");
        document.getElementById("star-5")?.classList.remove("text-yellow-500");
    }

    const starTwo = () => {
        document.getElementById("star-1")?.classList.add("fill-yellow-500");
        document.getElementById("star-2")?.classList.add("fill-yellow-500");
        document.getElementById("star-3")?.classList.remove("fill-yellow-500");
        document.getElementById("star-4")?.classList.remove("fill-yellow-500");
        document.getElementById("star-5")?.classList.remove("fill-yellow-500");
        document.getElementById("star-1")?.classList.add("text-yellow-500");
        document.getElementById("star-2")?.classList.add("text-yellow-500");
        document.getElementById("star-3")?.classList.remove("text-yellow-500");
        document.getElementById("star-4")?.classList.remove("text-yellow-500");
        document.getElementById("star-5")?.classList.remove("text-yellow-500");
    }

    const starThree = () => {
        document.getElementById("star-1")?.classList.add("fill-yellow-500");
        document.getElementById("star-2")?.classList.add("fill-yellow-500");
        document.getElementById("star-3")?.classList.add("fill-yellow-500");
        document.getElementById("star-4")?.classList.remove("fill-yellow-500");
        document.getElementById("star-5")?.classList.remove("fill-yellow-500");
        document.getElementById("star-1")?.classList.add("text-yellow-500");
        document.getElementById("star-2")?.classList.add("text-yellow-500");
        document.getElementById("star-3")?.classList.add("text-yellow-500");
        document.getElementById("star-4")?.classList.remove("text-yellow-500");
        document.getElementById("star-5")?.classList.remove("text-yellow-500");

    }

    const starFour = () => {
        document.getElementById("star-1")?.classList.add("fill-yellow-500");
        document.getElementById("star-2")?.classList.add("fill-yellow-500");
        document.getElementById("star-3")?.classList.add("fill-yellow-500");
        document.getElementById("star-4")?.classList.add("fill-yellow-500");
        document.getElementById("star-5")?.classList.remove("fill-yellow-500");
        document.getElementById("star-1")?.classList.add("text-yellow-500");
        document.getElementById("star-2")?.classList.add("text-yellow-500");
        document.getElementById("star-3")?.classList.add("text-yellow-500");
        document.getElementById("star-4")?.classList.add("text-yellow-500");
        document.getElementById("star-5")?.classList.remove("text-yellow-500");
    }

    const starFive = () => {
        document.getElementById("star-1")?.classList.add("fill-yellow-500");
        document.getElementById("star-2")?.classList.add("fill-yellow-500");
        document.getElementById("star-3")?.classList.add("fill-yellow-500");
        document.getElementById("star-4")?.classList.add("fill-yellow-500");
        document.getElementById("star-5")?.classList.add("fill-yellow-500");
        document.getElementById("star-1")?.classList.add("text-yellow-500");
        document.getElementById("star-2")?.classList.add("text-yellow-500");
        document.getElementById("star-3")?.classList.add("text-yellow-500");
        document.getElementById("star-4")?.classList.add("text-yellow-500");
        document.getElementById("star-5")?.classList.add("text-yellow-500");
    }

    const handleRating = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('rating.store'));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Notification" />
            {auth?.user.is_babysitter ? <div className='overflow-hidden'>
                <div className='flex justify-center mt-4'>
                    <div className='inline-flex gap-1 rounded-lg bg-neutral-100 p-1 dark:bg-neutral-800'>
                        <button onClick={pendingBookingsButton} className={cn('flex items-center rounded-md px-3.5 py-1.5 transition-colors', bookingsNavigation === "pending" ? "bg-white shadow-xs dark:bg-neutral-700 dark:text-neutral-100" : 'text-neutral-500 hover:bg-neutral-200/60 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-700/60')}><Hourglass className="-ml-1 h-4 w-4" /><span className="ml-1.5 text-sm">Pending</span></button>
                        <button onClick={cancelledBooksButton} className={cn('flex items-center rounded-md px-3.5 py-1.5 transition-colors', bookingsNavigation === "cancelled" ? "bg-white shadow-xs dark:bg-neutral-700 dark:text-neutral-100" : 'text-neutral-500 hover:bg-neutral-200/60 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-700/60')}><XCircle className="-ml-1 h-4 w-4" /><span className="ml-1.5 text-sm">Cancelled</span></button>
                        <button onClick={doneBookingsButton} className={cn('flex items-center rounded-md px-3.5 py-1.5 transition-colors', bookingsNavigation === "done" ? "bg-white shadow-xs dark:bg-neutral-700 dark:text-neutral-100" : 'text-neutral-500 hover:bg-neutral-200/60 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-700/60')}><CheckCircle className="-ml-1 h-4 w-4" /><span className="ml-1.5 text-sm">Done</span></button>
                    </div>
                </div>
                <div id='booksPending' className={bookingsNavigation === "pending" ? "flex h-full flex-1 flex-col gap-6 rounded-xl p-4 overflow-x-auto" : "hidden"}>
                    {bookings.length > 0 ? (
                        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
                            {bookings.map((b) => (
                                <div className='bg-background dark:bg-neutral-900 rounded-lg border shadow-lg duration-200 min-h-[200px] flex flex-col' key={b.id}>
                                    <div className='relative'>
                                        <img className='object-cover w-full h-100 rounded-t-lg' src={`${window.location.origin}/storage/${b.profile}`} alt="" />
                                        <Badge variant={b.status === 'pending' ? 'booked' : (b.status === 'approved' ? 'available' : (b.status === 'done' ? 'available' : 'booked'))}><span className='uppercase'>{b.status}</span></Badge>
                                    </div>

                                    <div className='flex flex-col p-6'>
                                        <div className='flex justify-between items-center'>
                                            <h1 className='font-bold'>Parent Name: <span className='font-normal'>{b.name}</span></h1>
                                        </div>
                                        <div>
                                            <h1 className='font-bold'>Payment Method: <span className='font-normal'>Per Hour</span></h1>
                                        </div>
                                        <div>
                                            <h1 className='font-bold'>Babysitting Duration: <span className='font-normal'>{b.date} {b.date > 1 ? 'days' : 'day'}</span></h1>
                                        </div>
                                    </div>
                                    <div className='m-6 flex flex-row gap-2'>
                                        <form onSubmit={acceptAction} className='w-full'>
                                            <Button type='submit' onClick={() => {
                                                setData('action', 'approved');
                                                setData('booking_id', b.id)
                                            }} className="mt-auto w-full bg-green-600 hover:bg-green-700 text-white dark:bg-green-700 dark:hover:bg-green-800 cursor-pointer" disabled={processing}    >
                                                Accept
                                            </Button>
                                        </form>

                                        <form onSubmit={declineAction} className='w-full'>
                                            <Button type='submit' onClick={() => {
                                                setData('booking_id', b.id);
                                                setData('action', 'declined');
                                            }} className="mt-auto w-full bg-amber-500 hover:bg-amber-600 text-white dark:bg-amber-600 dark:hover:bg-amber-700 cursor-pointer" disabled={processing}>
                                                Decline
                                            </Button>
                                        </form>

                                        <form onSubmit={submitDoneBookings} className='w-full'>
                                            <Button type='submit' onClick={() => {
                                                setData('booking_id', b.id);
                                                setData('user_id', b.user_id);
                                                setData('babysitter_id', b.babysitter_id);
                                                setData('status', b.status);
                                                setData('payment_method', b.payment_method);
                                                setData('start_date', b.start_date);
                                                setData("end_date", b.end_date)
                                                setData("booking_id", b.id)
                                            }} className="mt-auto w-full bg-amber-500 hover:bg-amber-600 text-white dark:bg-amber-600 dark:hover:bg-amber-700 cursor-pointer"
                                                disabled={processing}>
                                                Done
                                            </Button>
                                        </form>
                                    </div>

                                </div>
                            ))}
                        </div>
                    ) : (<div className='mt-5 text-center text-muted-foreground'>No pending bookings found.</div>)}
                </div>

                <div id='booksCancelled' className={bookingsNavigation === "cancelled" ? "flex h-full flex-1 flex-col gap-6 rounded-xl p-4 overflow-x-auto" : "hidden"}>
                    {bookingsCancelled.length > 0 ? (
                        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
                            {bookingsCancelled.map((b) => (
                                <div className='bg-background dark:bg-neutral-900 rounded-lg border shadow-lg duration-200 min-h-[200px] flex flex-col' key={b.id}>
                                    <div className='relative'>
                                        <img className='object-cover w-full h-100 rounded-t-lg' src={`${window.location.origin}/storage/${b.profile}`} alt="" />
                                        <Badge variant='booked'><span className='uppercase'>Cancelled</span></Badge>
                                    </div>

                                    <div className='flex flex-col p-6'>
                                        <div className='flex justify-between items-center'>
                                            <h1 className='font-bold'>Babysitter Name: <span className='font-normal'>{b.name}</span></h1>
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
                                    </div>

                                </div>
                            ))}
                        </div>
                    ) : (<div className='mt-5 text-center text-muted-foreground'>No cancelled bookings found.</div>)}
                </div>

                <div id='booksDone' className={bookingsNavigation === "done" ? "flex h-full flex-1 flex-col gap-6 rounded-xl p-4 overflow-x-auto" : "hidden"}>
                    {bookingsDone.length > 0 ? (
                        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
                            {bookingsDone.map((b) => (
                                <div className='bg-background dark:bg-neutral-900 rounded-lg border shadow-lg duration-200 min-h-[200px] flex flex-col' key={b.id}>
                                    <div className='relative'>
                                        <img className='object-cover w-full h-100 rounded-t-lg' src={`${window.location.origin}/storage/${b.profile}`} alt="" />
                                        <Badge variant='available'><span className='uppercase'>Done</span></Badge>
                                    </div>

                                    <div className='flex flex-col p-6'>
                                        <div className='flex justify-between items-center'>
                                            <h1 className='font-bold'>Babysitter Name: <span className='font-normal'>{b.name}</span></h1>
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
                                    </div>

                                </div>
                            ))}
                        </div>
                    ) : (<div className='mt-5 text-center text-muted-foreground'>No done bookings found.</div>)}
                </div>
            </div>
                :
                <div className='overflow-hidden'>
                    <div className='flex justify-center mt-4'>
                        <div className='inline-flex gap-1 rounded-lg bg-neutral-100 p-1 dark:bg-neutral-800'>
                            <button onClick={pendingBookingsButton} className={cn('flex items-center rounded-md px-3.5 py-1.5 transition-colors', bookingsNavigation === "pending" ? "bg-white shadow-xs dark:bg-neutral-700 dark:text-neutral-100" : 'text-neutral-500 hover:bg-neutral-200/60 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-700/60')}><Hourglass className="-ml-1 h-4 w-4" /><span className="ml-1.5 text-sm">Pending</span></button>
                            <button onClick={cancelledBooksButton} className={cn('flex items-center rounded-md px-3.5 py-1.5 transition-colors', bookingsNavigation === "cancelled" ? "bg-white shadow-xs dark:bg-neutral-700 dark:text-neutral-100" : 'text-neutral-500 hover:bg-neutral-200/60 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-700/60')}><XCircle className="-ml-1 h-4 w-4" /><span className="ml-1.5 text-sm">Cancelled</span></button>
                            <button onClick={doneBookingsButton} className={cn('flex items-center rounded-md px-3.5 py-1.5 transition-colors', bookingsNavigation === "done" ? "bg-white shadow-xs dark:bg-neutral-700 dark:text-neutral-100" : 'text-neutral-500 hover:bg-neutral-200/60 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-700/60')}><CheckCircle className="-ml-1 h-4 w-4" /><span className="ml-1.5 text-sm">Done</span></button>
                        </div>
                    </div>
                    <div id='booksPending' className={bookingsNavigation === "pending" ? "flex h-full flex-1 flex-col gap-6 rounded-xl p-4 overflow-x-auto" : "hidden"}>
                        {books.length > 0 ? (
                            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
                                {books.map((b) => (
                                    <div className='bg-background dark:bg-neutral-900 rounded-lg border shadow-lg duration-200 min-h-[200px] flex flex-col' key={b.id}>
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

                                            <form onSubmit={submitCancelledBookings} className='w-full'>
                                                <Button type='submit' onClick={() => {
                                                    setData('booking_id', b.id);
                                                    setData('user_id', b.user_id);
                                                    setData('babysitter_id', b.babysitter_id);
                                                    setData('status', b.status);
                                                    setData('payment_method', b.payment_method);
                                                    setData('start_date', b.start_date);
                                                    setData("end_date", b.end_date)
                                                    setData("booking_id", b.id)
                                                }} className="mt-auto w-20 bg-gray-600 hover:bg-gray-700 text-white dark:bg-gray-700 dark:hover:bg-gray-800 cursor-pointer" disabled={b.status === 'cancel' || b.status === 'approved' || b.status === 'declined' || b.status === 'cancelled' || b.status === "done" || processing}>
                                                    Cancel
                                                </Button>
                                            </form>

                                        </div>

                                    </div>
                                ))}
                            </div>
                        ) : (<div className='mt-5 text-center text-muted-foreground'>No pending bookings found.</div>)}
                    </div>

                    <div id='booksCancelled' className={bookingsNavigation === "cancelled" ? "flex h-full flex-1 flex-col gap-6 rounded-xl p-4 overflow-x-auto" : "hidden"}>
                        {booksCancelled.length > 0 ? (
                            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
                                {booksCancelled.map((b) => (
                                    <div className='bg-background dark:bg-neutral-900 rounded-lg border shadow-lg duration-200 min-h-[200px] flex flex-col' key={b.id}>
                                        <div className='relative'>
                                            <img className='object-cover w-full h-100 rounded-t-lg' src={`${window.location.origin}/storage/${b.profile}`} alt="" />
                                            <Badge variant='booked'><span className='uppercase'>Cancelled</span></Badge>
                                        </div>

                                        <div className='flex flex-col p-6'>
                                            <div className='flex justify-between items-center'>
                                                <h1 className='font-bold'>Babysitter Name: <span className='font-normal'>{b.name}</span></h1>
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



                                        </div>

                                    </div>
                                ))}
                            </div>
                        ) : (<div className='mt-5 text-center text-muted-foreground'>No cancelled bookings found.</div>)}
                    </div>

                    <div id='booksDone' className={bookingsNavigation === "done" ? "flex h-full flex-1 flex-col gap-6 rounded-xl p-4 overflow-x-auto" : "hidden"}>
                        {booksDone.length > 0 ? (
                            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
                                {booksDone.map((b) => (
                                    <div className='bg-background dark:bg-neutral-900 rounded-lg border shadow-lg duration-200 min-h-[200px] flex flex-col' key={b.id}>
                                        <div className='relative'>
                                            <img className='object-cover w-full h-100 rounded-t-lg' src={`${window.location.origin}/storage/${b.profile}`} alt="" />
                                            <Badge variant='available'><span className='uppercase'>Done</span></Badge>
                                        </div>

                                        <div className='flex flex-col p-6'>
                                            <div className='flex justify-between items-center'>
                                                <h1 className='font-bold'>Babysitter Name: <span className='font-normal'>{b.name}</span></h1>
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
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <div className='m-6 flex flex-row gap-2'>
                                                    <Button variant='secondary' className='cursor-pointer' onClick={() => setData('babysitter_id', b.babysitter_id)}>Rate</Button>
                                                </div>
                                            </DialogTrigger>
                                            <DialogContent className="sm:max-w-[425px]">
                                                <DialogHeader>
                                                    <DialogTitle>Rate</DialogTitle>
                                                    <DialogDescription>
                                                        Rate now — how was your experience with our babysitter caring for your baby?
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <form onSubmit={handleRating}>
                                                    {flash.message && <Alert>
                                                        <Megaphone />
                                                        <AlertTitle>Notification!</AlertTitle>
                                                        <AlertDescription>
                                                            {flash.message}
                                                        </AlertDescription>
                                                    </Alert>}
                                                    <div className="grid gap-4">
                                                        <div className="grid gap-3">
                                                            <div className='flex flex-row justify-center items-center gap-2 mt-5 mb-5'>
                                                                <button disabled={processing} type='submit' onClick={() => { starOne(); setData('user_id', auth?.user.id); setData('ratings', 1) }} className='cursor-pointer'><StarIcon id='star-1' size={30} /></button>
                                                                <button disabled={processing} type='submit' onClick={() => { starTwo(); setData('user_id', auth?.user.id); setData('ratings', 2) }} className='cursor-pointer'><StarIcon id='star-2' size={30} /></button>
                                                                <button disabled={processing} type='submit' onClick={() => { starThree(); setData('user_id', auth?.user.id); setData('ratings', 3) }} className='cursor-pointer'><StarIcon id='star-3' size={30} /></button>
                                                                <button disabled={processing} type='submit' onClick={() => { starFour(); setData('user_id', auth?.user.id); setData('ratings', 4) }} className='cursor-pointer'><StarIcon id='star-4' size={30} /></button>
                                                                <button disabled={processing} type='submit' onClick={() => { starFive(); setData('user_id', auth?.user.id); setData('ratings', 5) }} className='cursor-pointer'><StarIcon id='star-5' size={30} /></button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                                <DialogFooter>
                                                    <DialogClose asChild>
                                                        <Button variant="outline">Cancel</Button>
                                                    </DialogClose>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                ))}
                            </div>
                        ) : (<div className='mt-5 text-center text-muted-foreground'>No done bookings found.</div>)}
                    </div></div>}


        </AppLayout >
    );
}
