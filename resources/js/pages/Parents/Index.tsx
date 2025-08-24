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
    const [open, setOpen] = React.useState(false)
    const [date, setDate] = React.useState<Date | undefined>(undefined)
    const { users } = usePage<PageProps>().props;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Book Now" />
            <div id='ajax' className="flex h-full flex-1 flex-col gap-6 rounded-xl p-4 overflow-x-auto">

                {users.length > 0 && (
                    <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
                        {users.map((u) => (
                            <div className='bg-background rounded-lg border shadow-lg duration-200 min-h-[200px] flex flex-col' key={u.id}>
                                <div className='relative'>
                                    <img className='object-cover w-full h-100 rounded-t-lg' src={`${window.location.origin}/storage/${u.profile}`} alt="" />
                                    <Badge variant='available'>Available</Badge>
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
                                        <form>
                                            <DialogTrigger asChild>
                                                <Button className='mt-auto w-full' variant="outline">Book Now</Button>

                                            </DialogTrigger>
                                            <DialogContent className="sm:max-w-[425px]">
                                                <DialogHeader>
                                                    <DialogTitle>Book {u.name}</DialogTitle>
                                                    <DialogDescription>
                                                        {u.name} is available for babysitting right now.
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <div className="grid gap-4">
                                                    <div className="grid gap-3">
                                                        <Label>How would you like to pay the babysitter? <br></br><br></br>(Select one option below)</Label>
                                                        <Select>
                                                            <SelectTrigger className="w-full">
                                                                <SelectValue placeholder="Select Method" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectGroup>
                                                                    <SelectLabel>Option</SelectLabel>
                                                                    <SelectItem value="hour">Per Hour</SelectItem>
                                                                    <SelectItem value="week">Per Week</SelectItem>
                                                                    <SelectItem value="month">Per Month</SelectItem>
                                                                    <SelectItem value="year">Per Year</SelectItem>
                                                                </SelectGroup>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    <div className="grid gap-3">
                                                        <Label htmlFor="username-1">Date</Label>
                                                        <Popover open={open} onOpenChange={setOpen}>
                                                            <PopoverTrigger asChild>
                                                                <Button
                                                                    variant="outline"
                                                                    id="date"
                                                                    className="w-full justify-between font-normal"
                                                                >
                                                                    {date ? date.toLocaleDateString() : "Select date"}
                                                                    <ChevronDownIcon />
                                                                </Button>
                                                            </PopoverTrigger>
                                                            <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                                                <Calendar
                                                                    mode="single"
                                                                    selected={date}
                                                                    captionLayout="dropdown"
                                                                    onSelect={(date) => {
                                                                        setDate(date)
                                                                        setOpen(false)
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
                                                    <Button type="submit">
                                                        Book Now
                                                    </Button>
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
        </AppLayout >
    );
}
