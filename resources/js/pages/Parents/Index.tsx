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
import { CircleAlert, Megaphone, History, Heart, MessageCircleMore, EllipsisVertical, Send, Star, ChevronDownIcon } from 'lucide-react';
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

interface Users {
    id: number;
    name: string;
    email: string;
    address: string;
    contact_number: string;
    profile: string;
    rate: number;
    status: string;
    user_id: number;
}


interface PageProps extends InertiaPageProps {
    flash: {
        message?: string;
    }
    users: Users[];
    usersBook: number;
}

export default function Index() {
    const [openStart, setOpenStart] = React.useState(false)
    const [dateStart, setDateStart] = React.useState<Date | undefined>(undefined)

    const [openEnd, setOpenEnd] = React.useState(false)
    const [dateEnd, setDateEnd] = React.useState<Date | undefined>(undefined)
    const { users, flash, usersBook } = usePage<PageProps>().props;
    const { auth } = usePage<SharedData>().props;

    const { data, setData, post, processing, errors } = useForm({
        user_id: auth.user.id,
        babysitter_id: 0,
        status: 'pending',
        payment_method: '',
        start_date: '',
        end_date: '',
    });

    const submitBooking = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('booking.store'));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Book Now" />
            <div id='ajax' className="flex h-full flex-1 flex-col gap-6 rounded-xl p-4 overflow-x-auto">
                {users.length > 0 ? 
                    <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
                        {users.map((u) => (
                            <div className='bg-background rounded-lg border shadow-lg duration-200 min-h-[200px] flex flex-col' key={u.id}>
                                <div className='relative'>
                                    <img className='object-cover w-full h-100 rounded-t-lg' src={`${window.location.origin}/storage/${u.profile}`} alt="" />
                                    <Badge variant={u.status === 'pending' ? 'booked' : (u.status === 'approved' ? 'booked' : 'available')}>{u.status === 'pending' ? 'BOOKED' : (u.status === 'approved' ? 'BOOKED' : 'AVAILABLE')}</Badge>
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
                                <div className='m-6'>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            {u.status === "pending" || u.status === "approved" ? (
                                                <Button className={auth.user.is_babysitter ? 'hidden' : 'mt-auto w-full pointer-events-none select-none' } variant="outline">Already Booked</Button>
                                            ) : (usersBook > 0 ? (
                                                <Button className={auth.user.is_babysitter ? 'hidden' : 'mt-auto w-full pointer-events-none select-none' } variant="outline">You have a pending booking
                                                </Button>
                                            ) : (auth.user.balance < u.rate ? (
                                                 <Tooltip>
                                            <TooltipTrigger className='w-full'><Button className={auth.user.is_babysitter ? 'hidden' : 'mt-auto w-full pointer-events-none' } variant="outline">Insufficient balance</Button></TooltipTrigger>
                                            <TooltipContent>
                                                <p>You need to top up at least <span className='text-green-700 font-bold dark:text-green-600'>${u.rate}</span></p>
                                            </TooltipContent>
                                        </Tooltip>
                                            ) : (
                                                <Button className={auth.user.is_babysitter ? 'hidden' : 'mt-auto w-full' } variant="outline">Book Now</Button>
                                            ))
                                            )}

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
                                                                    <SelectItem value="hour">Per Hour</SelectItem>
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
                                                                    mode="single"
                                                                    selected={dateStart}
                                                                    captionLayout="dropdown"
                                                                    onSelect={(date) => {
                                                                        if (date) {
                                                                            setDateStart(date)
                                                                            setData("start_date", date.toISOString().split("T")[0]);
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
                                                    <div className="grid gap-3 mb-6">
                                                        <Label htmlFor="username-1">End Date</Label>
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
                                                                            setData("end_date", date.toISOString().split("T")[0]);
                                                                            setOpenEnd(false)
                                                                        }
                                                                    }}

                                                                    disabled={{
                                                                        before: new Date(moment().add(1, "days").toDate()),
                                                                        after: new Date(moment().add(1, 'month').toDate()),
                                                                    }}
                                                                />
                                                            </PopoverContent>
                                                        </Popover>
                                                    </div>
                                                </div>
                                                <DialogFooter>
                                                    <DialogClose asChild>
                                                        <Button variant="outline">Cancel</Button>
                                                    </DialogClose>
                                                    {u.status === "pending" ? (
                                                        <Button className='pointer-events-none select-none' disabled>Already Booked</Button>
                                                    ) : (
                                                        <Button type='submit' onClick={(e) => setData('babysitter_id', u.id)} disabled={processing}>Confirm Booking</Button>
                                                    )}

                                                </DialogFooter>
                                            </form>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </div>
                        ))}
                    </div>
                 : <div className='mt-5 text-center text-muted-foreground'>No babysitters available right now</div>}
            </div>
        </AppLayout >
    );
}
