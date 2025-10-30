import { Input } from '@/components/ui/input';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { Form, Head, useForm, usePage } from '@inertiajs/react';
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
import { CircleAlert, Megaphone, History, Heart, MessageCircleMore, EllipsisVertical, Send, Star, ChevronDownIcon, Briefcase, HourglassIcon } from 'lucide-react';
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
        title: 'Book Now',
        href: '/parent',
    },
];
import { Link } from '@inertiajs/react';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

type Pagination<T> = {
    data: T[];
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
    meta: {
        current_page: number;
        last_page: number;
        total: number;
    };
};


interface Users {
    id: number;
    name: string;
    email: string;
    address: string;
    contact_number: string;
    profile: string;
    rate: number;
    book_status: string;
    user_id: number;
    rateAverage: number;
    hireCount: number
}


interface PageProps extends InertiaPageProps {
    flash: {
        message?: string;
    }
    users: Pagination<Users>;
}

export default function Index() {
    const [openStart, setOpenStart] = React.useState(false)
    const [dateStart, setDateStart] = React.useState<Date | undefined>(undefined)

    const [openEnd, setOpenEnd] = React.useState(false)
    const [dateEnd, setDateEnd] = React.useState<Date | undefined>(undefined)
    const { users, flash } = usePage<PageProps>().props;
    const { auth } = usePage<SharedData>().props;

    const { data, setData, post, processing, errors } = useForm({
        user_id: auth.user.id,
        babysitter_id: 0,
        status: 'pending',
        payment_method: '',
        book_status: '',
        start_date: '',
        end_date: '',
    });

    const submitBooking = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('booking.store'));

        setData('start_date', '')
        setData('end_date', '')
    }

    const isMobile = useIsMobile();

    const authBalance = auth?.user.balance;
    const formattedAuthBalance = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }).format(authBalance);

    const handleEndDate = (id: number) => {
        document.getElementById(`endDate${id}`)?.classList.remove("pointer-events-none")
        document.getElementById(`startDateIdentifier${id}`)?.classList.add("hidden")
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Book Now" />
            <div id='ajax' className="flex h-full flex-1 flex-col gap-6 rounded-xl p-4 overflow-x-auto">
                {users.data.length > 0 ?
                    <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
                        {users.data.map((u) => (
                            <div className='dark:bg-neutral-900 bg-background rounded-lg border shadow-lg duration-200 min-h-[200px] flex flex-col' key={u.id}>
                                <div className='relative'>
                                    <img className='object-cover w-full h-100 rounded-t-lg' src={`${window.location.origin}/storage/${u.profile}`} alt="" />
                                    <Badge variant={u.book_status === "booked" ? "booked" : "available"}>{u.book_status === "booked" ? "BOOKED" : "AVAILABLE"}</Badge>
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
                                    <Badge className='mb-5'>Babysitter</Badge>
                                    <div className='flex justify-between'>
                                        <div>
                                            <h1 className='font-bold'>Name: <span className='font-normal'>{u.name}</span></h1>
                                            <span className='font-bold'>Hourly Rate:</span>
                                            <span className='text-green-700 font-bold dark:text-green-500'> ₱{u.rate}</span>
                                        </div>
                                        <div>
                                            <div className='flex flex-col items-start'>
                                                <div className='flex flex-row gap-1 items-center'>
                                                    <Briefcase size={20} className='dark:text-stone-500 text-stone-500' />
                                                    <span className='font-medium'>{u.hireCount || '0'}</span>
                                                </div>
                                                <div className='flex flex-row gap-1 items-center'>
                                                    <Star size={20} className='dark:fill-yellow-500 dark:text-yellow-500 fill-yellow-400 text-yellow-400' />
                                                    <span className='font-medium'>{u.rateAverage || '0'}/5</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='m-6'>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            {u.book_status === "booked" ? (
                                                <Button className={auth.user.is_babysitter ? 'hidden' : 'mt-auto w-full pointer-events-none select-none'} variant="outline">Already Booked</Button>
                                            ) : (Number(formattedAuthBalance) < Number(u.rate) ? (
                                                <Tooltip>
                                                    <TooltipTrigger className='w-full'><Button className={auth.user.is_babysitter ? 'hidden' : 'mt-auto w-full pointer-events-none'} variant="outline">Insufficient balance</Button></TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>You need to top up at least <span className='text-green-700 font-bold dark:text-green-600'>${u.rate}</span></p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            ) : (
                                                <Button className={auth.user.is_babysitter ? 'hidden' : 'mt-auto w-full cursor-pointer'} variant="outline" onClick={() => setData('babysitter_id', u.id)}>Book Now</Button>
                                            ))}

                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-[425px]">
                                            <DialogHeader>
                                                <DialogTitle>Book {u.name}</DialogTitle>
                                                <DialogDescription>
                                                    {u.name} is available for babysitting right now.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <form onSubmit={submitBooking}>
                                                <div className='mb-4'>
                                                    {Object.keys(errors).length > 0 && (
                                                        <Alert>
                                                            <CircleAlert />
                                                            <AlertTitle>Errors!</AlertTitle>
                                                            <AlertDescription>
                                                                <ul>
                                                                    {Object.entries(errors).map(([key, message]) => (
                                                                        <li key={key}>{message as string}</li>
                                                                    ))}
                                                                </ul>
                                                            </AlertDescription>
                                                        </Alert>
                                                    )}

                                                    {flash.message && <Alert>
                                                        <Megaphone />
                                                        <AlertTitle>Notification</AlertTitle>
                                                        <AlertDescription>
                                                            {flash.message}
                                                        </AlertDescription>
                                                    </Alert>}
                                                </div>
                                                <div className="grid gap-4">
                                                    <div className="grid gap-3">
                                                        <Label>How would you like to pay the babysitter? <br></br><br></br>(Select one option below)</Label>
                                                        <Select onValueChange={(value) => setData('payment_method', value)} value={data.payment_method}>
                                                            <SelectTrigger className="w-full">
                                                                <SelectValue placeholder="Select Method" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectGroup>
                                                                    <SelectLabel>Option</SelectLabel>
                                                                    <SelectItem value="week">Per Week</SelectItem>
                                                                    <SelectItem value="month">Per Month</SelectItem>
                                                                </SelectGroup>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    <div className="grid gap-3">
                                                        <Label htmlFor="username-1">Start Date</Label>
                                                        <Popover open={openStart} onOpenChange={setOpenStart}>
                                                            <PopoverTrigger asChild>
                                                                <Button
                                                                    variant="outline"
                                                                    id="date"
                                                                    className="w-full justify-between font-normal"
                                                                >
                                                                    {dateStart ? dateStart.toLocaleDateString() : "Select date"}
                                                                    <ChevronDownIcon />
                                                                </Button>
                                                            </PopoverTrigger>
                                                            <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                                                <Calendar
                                                                    onDayClick={() => handleEndDate(u.id)}
                                                                    mode="single"
                                                                    selected={dateStart}
                                                                    captionLayout="dropdown"
                                                                    onSelect={(date) => {
                                                                        if (date) {
                                                                            setDateStart(date)
                                                                            setData("start_date", date.toLocaleDateString('en-CA'));
                                                                            setOpenStart(false)
                                                                        }
                                                                    }}

                                                                    disabled={{
                                                                        before: new Date(moment().format('lll')),
                                                                        after: new Date(moment().add(1, 'month').calendar()),
                                                                    }}
                                                                />
                                                            </PopoverContent>
                                                        </Popover>
                                                    </div>
                                                    <div id={`endDate${u.id}`} className="grid gap-3 mb-6 pointer-events-none">
                                                        <Label htmlFor="username-1">End Date <span id={`startDateIdentifier${u.id}`} className='text-muted-foreground'>(Please select a start date first)</span></Label>
                                                        <Popover open={openEnd} onOpenChange={setOpenEnd}>
                                                            <PopoverTrigger asChild>
                                                                <Button
                                                                    variant="outline"
                                                                    id="date"
                                                                    className="w-full justify-between font-normal"
                                                                >
                                                                    {dateEnd ? dateEnd.toLocaleDateString() : "Select date"}
                                                                    <ChevronDownIcon />
                                                                </Button>
                                                            </PopoverTrigger>
                                                            <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                                                <Calendar
                                                                    mode="single"
                                                                    selected={dateEnd}
                                                                    captionLayout="dropdown"
                                                                    onSelect={(date) => {
                                                                        if (date) {
                                                                            setDateEnd(date)
                                                                            setData("end_date", date.toLocaleDateString('en-CA'));
                                                                            setOpenEnd(false)
                                                                        }
                                                                    }}
                                                                    disabled={{
                                                                        before: new Date(
                                                                            new Date(data.start_date).setDate(
                                                                                new Date(data.start_date).getDate() + 1
                                                                            )
                                                                        ),
                                                                        after: new Date(moment().add(1, 'month').toDate()),
                                                                    }}
                                                                />
                                                            </PopoverContent>
                                                        </Popover>
                                                    </div>
                                                </div>
                                                <DialogFooter>
                                                    <DialogClose asChild>
                                                        <Button variant="outline" disabled={processing}>Cancel</Button>
                                                    </DialogClose>
                                                    {u.book_status === "booked" ? (
                                                        <Button className='pointer-events-none select-none' disabled>Already Booked</Button>
                                                    ) : (
                                                        <Button type='submit' disabled={processing} onClick={() => setData('book_status', 'booked')}>Confirm Booking</Button>
                                                    )}

                                                </DialogFooter>
                                            </form>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </div>
                        ))}
                        <div className="flex justify-center mt-4 space-x-2">
                        </div> </div>
                    : <div className='mt-5 text-center text-muted-foreground flex flex-col items-center'>
                        <div className='mb-4 animate-bounce'>
                            <HourglassIcon size={80}/>
                        </div>
                        <span>No babysitters available right now — check back later</span>
                        </div>}
            </div>
            <div className={cn('-mt-10 mb-10', isMobile ? "" : "ml-5", users.data.length === 0 ? 'hidden' : '')}>
                {users.links && users.links.length > 0 && (
                    <Pagination className="mt-6">
                        <PaginationContent>
                            {users.links.map((link, index) => {
                                // Handle previous and next buttons
                                if (link.label.includes('Previous')) {
                                    return (
                                        <PaginationItem key={index}>
                                            <PaginationPrevious
                                                href={link.url || '#'}
                                                className={!link.url ? 'pointer-events-none opacity-50' : ''}
                                            />
                                        </PaginationItem>
                                    );
                                }

                                if (link.label.includes('Next')) {
                                    return (
                                        <PaginationItem key={index}>
                                            <PaginationNext
                                                href={link.url || '#'}
                                                className={!link.url ? 'pointer-events-none opacity-50' : ''}
                                            />
                                        </PaginationItem>
                                    );
                                }

                                // Handle numbered pages
                                return (
                                    <PaginationItem key={index}>
                                        <PaginationLink
                                            href={link.url || '#'}
                                            isActive={link.active}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    </PaginationItem>
                                );
                            })}
                        </PaginationContent>
                    </Pagination>
                )}
            </div>
        </AppLayout >
    );
}
