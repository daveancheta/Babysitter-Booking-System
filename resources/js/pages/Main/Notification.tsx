import AppLayout from '@/layouts/app-layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
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
import { PageProps as InertiaPageProps } from '@inertiajs/core'
import { Star, ListIcon, BanIcon, BadgeCheckIcon, ListFilterIcon, Loader2Icon, CheckCircle2Icon, XCircleIcon, Ban, ClipboardListIcon, CalendarDays } from 'lucide-react';
import { useState } from "react";
import { Badge } from '@/components/ui/badge';
import * as React from "react"
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';


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
    ratings: number;
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
    ratings: number;

}

interface PageProps extends InertiaPageProps {
    bookings: Bookings[];
    books: Books[];
}
export default function Notification() {
    const { books, bookings } = usePage<PageProps>().props;
    const { auth } = usePage<SharedData>().props;
    const [category, setCategory] = useState(String);

    const { data, setData, post, processing, errors } = useForm({
        booking_id: 0,
        action: '',
        user_id: 0,
        babysitter_id: 0,
        parent_id: 0,
        payment_method: '',
        status: '',
        start_date: '',
        end_date: '',
        ratings: 0,
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

    const handleSubmitRating = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('rating.store'));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Notification" />
            <div className='flex justify-start mt-4 ml-4'>
                <Select onValueChange={(value) => setCategory(value)}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder={
                            <>
                                <ListFilterIcon className="-ml-1 h-4 w-4" />
                                <span>All</span>
                            </>
                        }
                        />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Category</SelectLabel>
                            <SelectItem value="all"><ListFilterIcon className="h-4 w-4" /> All</SelectItem>
                            <SelectItem value="pending"><Loader2Icon className="h-4 w-4" /> Pending</SelectItem>
                            <SelectItem value="approved"><CheckCircle2Icon className="h-4 w-4" /> Approved</SelectItem>
                            <SelectItem value="done"><BadgeCheckIcon className="h-4 w-4" /> Done</SelectItem>
                            <SelectItem value="declined"><XCircleIcon className="h-4 w-4" /> Declined</SelectItem>
                            <SelectItem value="cancelled"><Ban className="h-4 w-4" /> Cancelled</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            {/* All */}
            <div id='allContainer' className={category === 'all' || category === "" ? '' : 'hidden'}>
                {auth.user.is_babysitter ? (
                    <div id='ajax' className="flex h-full flex-1 flex-col gap-6 rounded-xl p-4 overflow-x-auto">
                        {bookings.length > 0 ? (
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
                                                    <span>{b.ratings}/5</span>
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
                                                }}>Approve</Button>
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
                        ) : (<div className='text-muted-foreground flex justify-center mt-5'>No bookings yet.</div>)}
                    </div>
                ) : (
                    <div id='ajax' className="flex h-full flex-1 flex-col gap-6 rounded-xl p-4 overflow-x-auto">
                        {books.length > 0 ? (
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
                                                    <span>{b.ratings || '0'}/5</span>
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
                        ) : (<div className='text-muted-foreground flex justify-center mt-5'>No bookings yet.&nbsp;<Link href={route('parent.index')} className='underline'>Book Now</Link></div>)}
                    </div>
                )}
            </div>

            {/* Cancelled */}
            <div id='doneContainer' className={category === 'cancelled' ? '' : 'hidden'}>
                {auth.user.is_babysitter ? (
                    <div id='ajax' className="flex h-full flex-1 flex-col gap-6 rounded-xl p-4 overflow-x-auto">
                        {bookings.length > 0 && (
                            (() => {
                                const cancelledBookings = bookings.filter((b) => b.status === "cancelled");

                                return cancelledBookings.length > 0 ? (
                                    <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
                                        {cancelledBookings.map((b) => (
                                            <div className='dark:bg-neutral-900 bg-background rounded-lg border shadow-lg duration-200 min-h-[200px] flex flex-col' key={b.id}>
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
                                                <div className={cn('m-6 flex flex-row gap-2', isMobile ? 'justify-center' : '')}>
                                                    <Button variant='secondary' disabled>Approve</Button>
                                                    <Button variant='secondary' disabled>Decline</Button>
                                                    <Button variant='secondary' disabled>Done</Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className='text-muted-foreground flex justify-center mt-5'>
                                        <div className='flex flex-col items-center gap-4'>
                                            <CalendarDays size={50} />
                                            <div className='truncate'>
                                                No bookings yet.&nbsp;
                                                <Link href={route('parent.index')} className='underline'>Book Now</Link>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })()
                        )}
                    </div>
                ) : (
                    <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-4 overflow-x-auto">
                        {books.length > 0 && (
                            (() => {
                                const cancelledBookings = books.filter((b) => b.status === "cancelled");

                                return cancelledBookings.length > 0 ? (
                                    <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
                                        {cancelledBookings.map((b) => (
                                            <div className='dark:bg-neutral-900 bg-background rounded-lg border shadow-lg duration-200 min-h-[200px] flex flex-col' key={b.id}>
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
                                                <div>
                                                    <Button className='m-6 flex flex-row gap-2' variant='secondary' disabled>Cancel</Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className='text-muted-foreground flex justify-center mt-5'>
                                        <div className='flex flex-col items-center gap-4'>
                                            <CalendarDays size={50} />
                                            <div className='truncate'>
                                                No bookings yet.&nbsp;
                                                <Link href={route('parent.index')} className='underline'>Book Now</Link>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })()
                        )}
                    </div>
                )}
            </div>

            {/* done */}
            <div id='doneContainer' className={category === 'done' ? '' : 'hidden'}>
                {auth.user.is_babysitter ? (
                    <div id='ajax' className="flex h-full flex-1 flex-col gap-6 rounded-xl p-4 overflow-x-auto">
                        {bookings.length > 0 && (
                            (() => {
                                const doneBookings = bookings.filter((b) => b.status == "done");

                                return doneBookings.length > 0 ? (
                                    <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
                                        {doneBookings.map((b) => (
                                            <div className={cn('dark:bg-neutral-900 bg-background rounded-lg border shadow-lg duration-200 min-h-[200px] flex flex-col', b.status === 'done' ? '' : 'hidden')} key={b.id}>
                                                <div className='relative'>
                                                    <img className='object-cover w-full h-100 rounded-t-lg' src={`${window.location.origin}/storage/${b.profile}`} alt="" />
                                                    <Badge variant='available'><span className='uppercase'>Done</span></Badge>
                                                </div>
                                                <div className='flex flex-col p-6'>
                                                    <div className='flex justify-between items-center'>
                                                        <h1 className='font-bold'>Parent Name: <span className='font-normal'>{b.name}</span></h1>
                                                        <div className='flex flex-row gap-1 item-center'>
                                                            <Star className='dark:fill-yellow-500 dark:text-yellow-500 fill-yellow-400 text-yellow-400' />
                                                            <span>{b.ratings || '0'}/5</span>
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
                                                    <Button variant='secondary' disabled>Approve</Button>
                                                    <Button variant='secondary' disabled>Decline</Button>
                                                    <Button variant='secondary' disabled>Done</Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className='text-muted-foreground flex justify-center mt-5'>
                                        <div className='flex flex-col items-center gap-4'>
                                            <CalendarDays size={50} />
                                            <div className='truncate'>
                                                No bookings yet.&nbsp;
                                                <Link href={route('parent.index')} className='underline'>Book Now</Link>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })()
                        )}
                    </div>
                ) : (
                    <div id='ajax' className="flex h-full flex-1 flex-col gap-6 rounded-xl p-4 overflow-x-auto">
                        {books.length > 0 && (
                            (() => {
                                const doneBookings = books.filter((b) => b.status === "done");

                                return doneBookings.length > 0 ? (
                                    <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
                                        {doneBookings.map((b) => (
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
                                                            <span>{b.ratings || '0'}/5</span>
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
                                                                <Button variant='secondary' className='cursor-pointer' onClick={() => {
                                                                    setData('parent_id', auth?.user.id);
                                                                    setData('babysitter_id', b.babysitter_id);
                                                                    setData('booking_id', b.id);
                                                                }}
                                                                    disabled={processing || b.ratings > 0}>Rate</Button>
                                                            </DialogTrigger>
                                                            <DialogContent className="sm:max-w-[425px]">
                                                                <form onSubmit={handleSubmitRating}>
                                                                    <DialogHeader>
                                                                        <DialogTitle>Rate</DialogTitle>
                                                                        <DialogDescription>
                                                                            Give a rating for {b.name}, his/her wonderful work nicely done.
                                                                        </DialogDescription>
                                                                    </DialogHeader>
                                                                    <div className="grid gap-4">
                                                                        <div className="flex flex-row justify-center gap-2 mb-4 mt-4">
                                                                            <button disabled={processing || b.ratings > 0} type='button' onClick={() => { starOne(), setData('ratings', 1) }} className='cursor-pointer'><Star className='h-8 w-8 fill-gray-600 text-gray-600' id='star-one' /></button>
                                                                            <button disabled={processing || b.ratings > 0} type='button' onClick={() => { starTwo(), setData('ratings', 2) }} className='cursor-pointer'><Star className='h-8 w-8 fill-gray-600 text-gray-600' id='star-two' /></button>
                                                                            <button disabled={processing || b.ratings > 0} type='button' onClick={() => { starThree(), setData('ratings', 3) }} className='cursor-pointer'><Star className='h-8 w-8 fill-gray-600 text-gray-600' id='star-three' /></button>
                                                                            <button disabled={processing || b.ratings > 0} type='button' onClick={() => { starFour(), setData('ratings', 4) }} className='cursor-pointer'><Star className='h-8 w-8 fill-gray-600 text-gray-600' id='star-four' /></button>
                                                                            <button disabled={processing || b.ratings > 0} type='button' onClick={() => { starFive(), setData('ratings', 5) }} className='cursor-pointer'><Star className='h-8 w-8 fill-gray-600 text-gray-600' id='star-five' /></button>
                                                                        </div>
                                                                    </div>
                                                                    <DialogFooter>
                                                                        <DialogClose asChild>
                                                                            <Button variant="outline" disabled={processing}>Cancel</Button>
                                                                        </DialogClose>
                                                                        <Button type="submit" disabled={processing || b.ratings > 0}>Submit Rating</Button>
                                                                    </DialogFooter>
                                                                </form>
                                                            </DialogContent>
                                                        </form>
                                                    </Dialog>
                                                </div>

                                            </div>
                                        ))}
                                    </div>
                                ) :
                                    (
                                        <div className='text-muted-foreground flex justify-center mt-5'>
                                            <div className='flex flex-col items-center gap-4'>
                                                <CalendarDays size={50} />
                                                <div className='truncate'>
                                                    No bookings yet.&nbsp;
                                                    <Link href={route('parent.index')} className='underline'>Book Now</Link>
                                                </div>
                                            </div>
                                        </div>
                                    )
                            })()
                        )}
                    </div>
                )}
            </div>
            
            {/* declined */}
            <div className={category === 'declined' ? '' : 'hidden'}>
                {auth.user.is_babysitter ? (
                    <div id='ajax' className="flex h-full flex-1 flex-col gap-6 rounded-xl p-4 overflow-x-auto">
                        {bookings.length > 0 ? (
                            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
                                {bookings.map((b) => (
                                    <div className={cn('dark:bg-neutral-900 bg-background rounded-lg border shadow-lg duration-200 min-h-[200px] flex flex-col', b.status === 'declined' ? '' : 'hidden')} key={b.id}>
                                        <div className='relative'>
                                            <img className='object-cover w-full h-100 rounded-t-lg' src={`${window.location.origin}/storage/${b.profile}`} alt="" />
                                            <Badge variant='booked'><span className='uppercase'>Declined</span></Badge>
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
                                        <div className={cn('m-6 flex flex-row gap-2', isMobile ? 'justify-center' : '')}>
                                            <Button variant='secondary' disabled>Approve</Button>
                                            <Button variant='secondary' disabled>Decline</Button>
                                            <Button variant='secondary' disabled>Done</Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (<div className='text-muted-foreground flex justify-center mt-5'>No declined bookings yet.</div>)}
                    </div>
                ) : (
                    <div id='ajax' className="flex h-full flex-1 flex-col gap-6 rounded-xl p-4 overflow-x-auto">
                        {books.length > 0 ? (
                            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
                                {books.map((b) => (
                                    <div className={cn('dark:bg-neutral-900 bg-background rounded-lg border shadow-lg duration-200 min-h-[200px] flex flex-col', b.status === 'declined' ? '' : 'hidden')} key={b.id}>
                                        <div className='relative'>
                                            <img className='object-cover w-full h-100 rounded-t-lg' src={`${window.location.origin}/storage/${b.profile}`} alt="" />
                                            <Badge variant='booked'><span className='uppercase'>Declined</span></Badge>
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
                        ) : (<div className='text-muted-foreground flex justify-center mt-5'>No declined bookings yet.&nbsp;<Link href={route('parent.index')} className='underline'>Book Now</Link></div>)}
                    </div>
                )}
            </div>
            {/* pending */}
            <div className={category === 'pending' ? '' : 'hidden'}>
                {auth.user.is_babysitter ? (
                    <div id='ajax' className="flex h-full flex-1 flex-col gap-6 rounded-xl p-4 overflow-x-auto">
                        {bookings.length > 0 ? (
                            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
                                {bookings.map((b) => (
                                    <div className={cn('dark:bg-neutral-900 bg-background rounded-lg border shadow-lg duration-200 min-h-[200px] flex flex-col', b.status === 'pending' ? '' : 'hidden')} key={b.id}>
                                        <div className='relative'>
                                            <img className='object-cover w-full h-100 rounded-t-lg' src={`${window.location.origin}/storage/${b.profile}`} alt="" />
                                            <Badge variant='booked'><span className='uppercase'>Pending</span></Badge>
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
                                        <div className={cn('m-6 flex flex-row gap-2', isMobile ? 'justify-center' : '')}>
                                            <form onSubmit={handleStatusUpdate}>
                                                <Button disabled={b.status === 'approved' || b.status === 'declined' || b.status === 'cancelled' || b.status === "done" || processing} variant='secondary' onClick={() => {
                                                    setData('status', 'approved');
                                                    setData('booking_id', b.id)
                                                    setData('babysitter_id', b.babysitter_id)
                                                }}>Approve</Button>
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
                        ) : (<div className='text-muted-foreground flex justify-center mt-5'>No pending bookings yet.</div>)}
                    </div>
                ) : (
                    <div id='ajax' className="flex h-full flex-1 flex-col gap-6 rounded-xl p-4 overflow-x-auto">
                        {books.length > 0 ? (
                            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
                                {books.map((b) => (
                                    <div className={cn('dark:bg-neutral-900 bg-background rounded-lg border shadow-lg duration-200 min-h-[200px] flex flex-col', b.status === 'pending' ? '' : 'hidden')} key={b.id}>
                                        <div className='relative'>
                                            <img className='object-cover w-full h-100 rounded-t-lg' src={`${window.location.origin}/storage/${b.profile}`} alt="" />
                                            <Badge variant='booked'><span className='uppercase'>Pending</span></Badge>
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
                        ) : (<div className='text-muted-foreground flex justify-center mt-5'>No pending bookings yet.&nbsp;<Link href={route('parent.index')} className='underline'>Book Now</Link></div>)}
                    </div>
                )}
            </div>
            {/* approved */}
            <div className={category === 'approved' ? '' : 'hidden'}>
                {auth.user.is_babysitter ? (
                    <div id='ajax' className="flex h-full flex-1 flex-col gap-6 rounded-xl p-4 overflow-x-auto">
                        {bookings.length > 0 ? (
                            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
                                {bookings.map((b) => (
                                    <div className={cn('dark:bg-neutral-900 bg-background rounded-lg border shadow-lg duration-200 min-h-[200px] flex flex-col', b.status === 'approved' ? '' : 'hidden')} key={b.id}>
                                        <div className='relative'>
                                            <img className='object-cover w-full h-100 rounded-t-lg' src={`${window.location.origin}/storage/${b.profile}`} alt="" />
                                            <Badge variant='available'><span className='uppercase'>Approved</span></Badge>
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
                                        <div className={cn('m-6 flex flex-row gap-2', isMobile ? 'justify-center' : '')}>
                                            <Button variant='secondary' disabled>Approve</Button>
                                            <Button variant='secondary' disabled>Decline</Button>
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
                        ) : (<div className='text-muted-foreground flex justify-center mt-5'>No approved bookings yet.</div>)}
                    </div>
                ) : (
                    <div id='ajax' className="flex h-full flex-1 flex-col gap-6 rounded-xl p-4 overflow-x-auto">
                        {books.length > 0 ? (
                            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
                                {books.map((b) => (
                                    <div className={cn('dark:bg-neutral-900 bg-background rounded-lg border shadow-lg duration-200 min-h-[200px] flex flex-col', b.status === 'approved' ? '' : 'hidden')} key={b.id}>
                                        <div className='relative'>
                                            <img className='object-cover w-full h-100 rounded-t-lg' src={`${window.location.origin}/storage/${b.profile}`} alt="" />
                                            <Badge variant='available'><span className='uppercase'>Approved</span></Badge>
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
                        ) : (<div className='text-muted-foreground flex justify-center mt-5'>No approved bookings yet.&nbsp;<Link href={route('parent.index')} className='underline'>Book Now</Link></div>)}
                    </div>
                )}
            </div>
        </AppLayout >
    );
}