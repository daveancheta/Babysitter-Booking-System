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
import { CircleAlert, Megaphone, History, Heart, MessageCircleMore, EllipsisVertical, Send, Star, ChevronDownIcon, Trash2, ListIcon, BanIcon, BadgeCheckIcon } from 'lucide-react';
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
    const [bookingsNavigation, setBookingNavigation] = useState(
        localStorage.getItem("bookingsNavigation") || ""
    )

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

    const handleAllNavigation = () => {
        localStorage.setItem("bookingsNavigation", "all");
        setBookingNavigation("all")
    }

    const handleCancelledNavigation = () => {
        localStorage.setItem("bookingsNavigation", "cancelled");
        setBookingNavigation("cancelled")
    }

    const handleDoneNavigation = () => {
        localStorage.setItem("bookingsNavigation", "done");
        setBookingNavigation("done")
    }

    const isMobile = useIsMobile();

    const starOne = () => {
        document.getElementById('star-one')?.classList.add("fill-yellow-500");
        document.getElementById('star-one')?.classList.add("text-yellow-500");
        document.getElementById('star-two')?.classList.remove("fill-yellow-500");
        document.getElementById('star-two')?.classList.remove("text-yellow-500");
        document.getElementById('star-three')?.classList.remove("fill-yellow-500");
        document.getElementById('star-three')?.classList.remove("text-yellow-500");
        document.getElementById('star-four')?.classList.remove("fill-yellow-500");
        document.getElementById('star-four')?.classList.remove("text-yellow-500");
        document.getElementById('star-five')?.classList.remove("fill-yellow-500");
        document.getElementById('star-five')?.classList.remove("text-yellow-500");  
    }

    const starTwo = () => {
        document.getElementById('star-one')?.classList.add("fill-yellow-500");
        document.getElementById('star-one')?.classList.add("text-yellow-500");
        document.getElementById('star-two')?.classList.add("fill-yellow-500");
        document.getElementById('star-two')?.classList.add("text-yellow-500");
        document.getElementById('star-three')?.classList.remove("fill-yellow-500");
        document.getElementById('star-three')?.classList.remove("text-yellow-500");
        document.getElementById('star-four')?.classList.remove("fill-yellow-500");
        document.getElementById('star-four')?.classList.remove("text-yellow-500");
        document.getElementById('star-five')?.classList.remove("fill-yellow-500");
        document.getElementById('star-five')?.classList.remove("text-yellow-500");
    }

    const starThree = () => {
        document.getElementById('star-one')?.classList.add("fill-yellow-500");
        document.getElementById('star-one')?.classList.add("text-yellow-500");
        document.getElementById('star-two')?.classList.add("fill-yellow-500");
        document.getElementById('star-two')?.classList.add("text-yellow-500");
        document.getElementById('star-three')?.classList.add("fill-yellow-500");
        document.getElementById('star-three')?.classList.add("text-yellow-500");
        document.getElementById('star-four')?.classList.remove("fill-yellow-500");
        document.getElementById('star-four')?.classList.remove("text-yellow-500");
        document.getElementById('star-five')?.classList.remove("fill-yellow-500");
        document.getElementById('star-five')?.classList.remove("text-yellow-500");
    }

     const starFour = () => {
        document.getElementById('star-one')?.classList.add("fill-yellow-500");
        document.getElementById('star-one')?.classList.add("text-yellow-500");
        document.getElementById('star-two')?.classList.add("fill-yellow-500");
        document.getElementById('star-two')?.classList.add("text-yellow-500");
        document.getElementById('star-three')?.classList.add("fill-yellow-500");
        document.getElementById('star-three')?.classList.add("text-yellow-500");
        document.getElementById('star-four')?.classList.add("fill-yellow-500");
        document.getElementById('star-four')?.classList.add("text-yellow-500");
        document.getElementById('star-five')?.classList.remove("fill-yellow-500");
        document.getElementById('star-five')?.classList.remove("text-yellow-500");
    }

     const starFive = () => {
        document.getElementById('star-one')?.classList.add("fill-yellow-500");
        document.getElementById('star-one')?.classList.add("text-yellow-500");
        document.getElementById('star-two')?.classList.add("fill-yellow-500");
        document.getElementById('star-two')?.classList.add("text-yellow-500");
        document.getElementById('star-three')?.classList.add("fill-yellow-500");
        document.getElementById('star-three')?.classList.add("text-yellow-500");
        document.getElementById('star-four')?.classList.add("fill-yellow-500");
        document.getElementById('star-four')?.classList.add("text-yellow-500");
        document.getElementById('star-five')?.classList.add("fill-yellow-500");
        document.getElementById('star-five')?.classList.add("text-yellow-500");
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Notification" />
            <div className={isMobile ? "flex justify-center mt-4" : "flex justify-start mt-4 ml-4"}>
                <div className='inline-flex gap-1 rounded-lg bg-neutral-100 p-1 dark:bg-neutral-800'>
                    <button onClick={handleAllNavigation} className={cn('flex items-center rounded-md px-3.5 py-1.5 transition-colors', bookingsNavigation === "all" ? 'bg-white shadow-xs dark:bg-neutral-700 dark:text-neutral-100' : 'text-neutral-500 hover:bg-neutral-200/60 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-700/60')}><ListIcon className="-ml-1 h-4 w-4" /><span className="ml-1.5 text-sm">All</span></button>
                    <button onClick={handleCancelledNavigation} className={cn('flex items-center rounded-md px-3.5 py-1.5 transition-colors', bookingsNavigation === "cancelled" ? 'bg-white shadow-xs dark:bg-neutral-700 dark:text-neutral-100' : 'text-neutral-500 hover:bg-neutral-200/60 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-700/60')}><BanIcon className="-ml-1 h-4 w-4" /><span className="ml-1.5 text-sm">Cancelled</span></button>
                    <button onClick={handleDoneNavigation} className={cn('flex items-center rounded-md px-3.5 py-1.5 transition-colors', bookingsNavigation === "done" ? 'bg-white shadow-xs dark:bg-neutral-700 dark:text-neutral-100' : 'text-neutral-500 hover:bg-neutral-200/60 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-700/60')}><BadgeCheckIcon className="-ml-1 h-4 w-4" /><span className="ml-1.5 text-sm">Done</span></button>
                </div>
            </div>

            {/* All */}
            <div id='allContainer' className={bookingsNavigation === 'all' ? '' : 'hidden'}>
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
                                                <div className={cn('flex flex-row gap-1 item-center', b.status === 'done' ? '' : 'hidden')}>
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
                                    <div className='dark:bg-neutral-900 bg-background rounded-lg border shadow-lg duration-200 min-h-[200px] flex flex-col' key={b.id}>
                                        <div className='relative'>
                                            <img className='object-cover w-full h-100 rounded-t-lg' src={`${window.location.origin}/storage/${b.profile}`} alt="" />
                                            <Badge variant={b.status === 'pending' ? 'booked' : (b.status === 'approved' ? 'available' : (b.status === 'done' ? 'available' : 'booked'))}><span className='uppercase'>{b.status}</span></Badge>
                                        </div>

                                        <div className='flex flex-col p-6'>
                                            <div className='flex justify-between items-center'>
                                                <h1 className='font-bold'>Babysitter Name: <span className='font-normal'>{b.name}</span></h1>
                                                <div className={cn('flex flex-row gap-1 item-center', b.status === 'done' ? '' : 'hidden')}>
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
            </div>

            {/* Cancelled */}
            <div id='doneContainer' className={bookingsNavigation === 'cancelled' ? '' : 'hidden'}>
                {auth.user.is_babysitter ? (
                    <div id='ajax' className="flex h-full flex-1 flex-col gap-6 rounded-xl p-4 overflow-x-auto">
                        {bookings.length > 0 && (
                            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
                                {bookings.map((b) => (
                                    <div className={cn('dark:bg-neutral-900 bg-background rounded-lg border shadow-lg duration-200 min-h-[200px] flex flex-col', b.status === 'cancelled' ? '' : 'hidden')} key={b.id}>
                                        <div className='relative'>
                                            <img className='object-cover w-full h-100 rounded-t-lg' src={`${window.location.origin}/storage/${b.profile}`} alt="" />
                                            <Badge variant='booked'><span className='uppercase'>Cancelled</span></Badge>
                                        </div>
                                        <div className='flex flex-col p-6'>
                                            <div className='flex justify-between items-center'>
                                                <h1 className='font-bold'>Parent Name: <span className='font-normal'>{b.name}</span></h1>
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
                                    <div className={cn('dark:bg-neutral-900 bg-background rounded-lg border shadow-lg duration-200 min-h-[200px] flex flex-col', b.status === 'cancelled' ? '' : 'hidden')} key={b.id}>
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
            </div>

            {/* done */}
            <div id='doneContainer' className={bookingsNavigation === 'done' ? '' : 'hidden'}>
                {auth.user.is_babysitter ? (
                    <div id='ajax' className="flex h-full flex-1 flex-col gap-6 rounded-xl p-4 overflow-x-auto">
                        {bookings.length > 0 && (
                            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
                                {bookings.map((b) => (
                                    <div className={cn(b.status === 'done' ? '' : 'hidden')} key={b.id}>
                                        <div className='relative'>
                                            <img className='object-cover w-full h-100 rounded-t-lg' src={`${window.location.origin}/storage/${b.profile}`} alt="" />
                                            <Badge variant='available'><span className='uppercase'>Done</span></Badge>
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
                                    <div className={cn('dark:bg-neutral-900 bg-background rounded-lg border shadow-lg duration-200 min-h-[200px] flex flex-col', b.status === 'done' ? '' : 'hidden')} key={b.id}>
                                        <div className='relative'>
                                            <img className='object-cover w-full h-100 rounded-t-lg' src={`${window.location.origin}/storage/${b.profile}`} alt="" />
                                            <Badge variant='available'><span className='uppercase'>Done</span></Badge>
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
                                            <Dialog>
                                                <form>
                                                    <DialogTrigger asChild>
                                                        <Button variant='secondary' className='cursor-pointer'>Rate</Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="sm:max-w-[425px]">
                                                        <DialogHeader>
                                                            <DialogTitle>Rate</DialogTitle>
                                                            <DialogDescription>
                                                                Give a rating for {b.name}, his/her wonderful work nicely done.
                                                            </DialogDescription>
                                                        </DialogHeader>
                                                        <div className="grid gap-4">
                                                            <div className="flex flex-row justify-center gap-2">
                                                                <button onClick={() => { starOne() }} className='cursor-pointer'><Star className='h-8 w-8 fill-gray-600 text-gray-600' id='star-one' /></button>
                                                                <button onClick={() => { starTwo() }} className='cursor-pointer'><Star className='h-8 w-8 fill-gray-600 text-gray-600' id='star-two' /></button>
                                                                <button onClick={() => { starThree() }} className='cursor-pointer'><Star className='h-8 w-8 fill-gray-600 text-gray-600' id='star-three' /></button>
                                                                <button onClick={() => { starFour() }} className='cursor-pointer'><Star className='h-8 w-8 fill-gray-600 text-gray-600' id='star-four' /></button>
                                                                <button onClick={() => { starFive() }} className='cursor-pointer'><Star className='h-8 w-8 fill-gray-600 text-gray-600' id='star-five' /></button>
                                                            </div>
                                                        </div>
                                                        <DialogFooter>
                                                            <DialogClose asChild>
                                                                <Button variant="outline">Cancel</Button>
                                                            </DialogClose>
                                                            <Button type="submit">Submit Rating </Button>
                                                        </DialogFooter>
                                                    </DialogContent>
                                                </form>
                                            </Dialog>
                                        </div>

                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </AppLayout >
    );
}