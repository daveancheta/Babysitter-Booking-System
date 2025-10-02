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
import { CircleAlert, Megaphone, History, Heart, MessageCircleMore, EllipsisVertical, Send, Star, ChevronDownIcon, Trash2, UserRound, Baby } from 'lucide-react';
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

interface Results {
    id: number;
    name: string;
    profile: string;
    is_babysitter: string;
    createdAtFormatted: string;
}


interface PageProps extends InertiaPageProps {
    results: Results[];
}

export default function Result() {
    const { auth } = usePage<SharedData>().props;
    const { results } = usePage<PageProps>().props;

    const getInitials = useInitials();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Notification" />
            <div id='ajax' className="flex h-full flex-1 flex-col gap-6 rounded-xl p-4 overflow-x-auto">
                {results.length > 0 && (
                    <div className='grid gap-4 md:grid-cols-1 lg:grid-cols-2'>
                        {results.map((r) => (
                            <div className="dark:bg-neutral-900 rounded-lg border p-6 shadow-lg duration-200 flex flex-col" key={r.id}>
                                <div className='flex flex-row gap-3'>
                                    <Avatar className="h-20 w-20 overflow-hidden rounded-full">
                                        {r.profile === null ? <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                                            {getInitials(r.name)} </AvatarFallback> : <img className='rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white object-cover' src={`${window.location.origin}/storage/${r.profile}`} alt="" />}
                                    </Avatar>
                                    <div className='flex flex-col'>
                                    <span className='whitespace-nowrap truncate'>{r.name}</span>
                                    <span className='text-muted-foreground whitespace-nowrap truncate'>{r.createdAtFormatted}</span>
                                    </div>
                                </div>
                                <span className='mt-auto ms-auto'>{r.is_babysitter ? <Badge variant='outline'><Baby/> Babysitter</Badge> : <Badge variant='outline'><UserRound/> Parent</Badge>}</span>
                                <Button variant='outline' className='mt-2 cursor-pointer'>Follow</Button>
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </AppLayout >
    );
}
