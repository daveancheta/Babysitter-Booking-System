import { Badge } from '@/components/ui/badge';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Bookmark, CheckCircle2Icon, CircleAlert, EllipsisVertical, Layers2, Minus, Pen, Trash2, TrendingDown, TrendingUp } from 'lucide-react';
import { PageProps as InertiaPageProps } from '@inertiajs/core'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },

];

interface Users {
    id: number;
    account_id: string;
    email: string;
    ip_address: string;
    name: string;
    is_babysitter: boolean;
    formattedBalance: number;
    address: string;
    contact_number: number;
    profile: string;
    rate: number;
    balance: number;
    book_status: string;
    email_verified_at: string;
    created_at: string;
    updated_at: string;
}

interface PageProps extends InertiaPageProps {
    flash: {
        message: string;
    }
    currentRevenue: number;
    revenuePercentage: number;
    pastRevenue: number
    newParents: number
    parentPercentage: number;
    previousParents: number
    babysitterPercentage: number;
    newBabysitters: number;
    previousBabysitters: number;
    users: Users[];
}

export default function Dashboard() {
    const { flash, users, currentRevenue, pastRevenue, revenuePercentage,
        newParents, parentPercentage, previousParents, babysitterPercentage,
        newBabysitters, previousBabysitters } = usePage<PageProps>().props;

    const { delete: destroy, processing: deleteProcessing } = useForm({});
    const { data, setData, put, processing, errors } = useForm({
        id: 0,
        account_id: '',
        ip_address: '',
        name: '',
        email: '',
        address: '',
        contact_number: '',
        profile: '',
        balance: 0,
        rate: 0,
        book_status: '',
    });

    const handleDeleteUser = (id: number) => {
        destroy(route('delete.user', { id }))
    }

    const handleUpdateData = (e: React.FormEvent, id: number) => {
        e.preventDefault();
        put(route('update.user', { id }));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="grid gap-4 grid-cols-1 md:grid-cols-1 lg:grid-cols-3">
                    <div className='dark:bg-neutral-900 bg-background min-h-[200px] rounded-md p-7 shadow-lg flex flex-col gap-2 border'>
                        <div className='flex justify-between items-center'>
                            <span className='text-muted-foreground font-medium tracking-wide'>Total Revenue</span>
                            {currentRevenue >= pastRevenue ?
                                <Badge variant='secondary' className='rounded-lg tracking-wide border dark:border-neutral-700 border-neutral-400 text-green-600 dark:text-green-400'>
                                    <TrendingUp className="mr-1 size-4" /> +{new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(revenuePercentage)}%
                                </Badge>
                                : currentRevenue === pastRevenue ?
                                    <Badge variant='secondary' className='rounded-lg tracking-wide border dark:border-neutral-700 border-neutral-400 text-blue-600 dark:text-blue-400'>
                                        <Minus className="mr-1 size-4" /> {new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(revenuePercentage)}%
                                    </Badge>
                                    :
                                    <Badge variant='secondary' className='rounded-lg tracking-wide border dark:border-neutral-700 border-neutral-400 text-red-600 dark:text-red-400'>
                                        <TrendingDown className="mr-1 size-4" /> {new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(revenuePercentage)}%
                                    </Badge>
                            }
                        </div>
                        <div>
                            <h3 className='text-3xl font-medium mt-1 tracking-wide'>
                                ₱{new Intl.NumberFormat('en-us', { minimumFractionDigits: 2 }).format(currentRevenue)}
                            </h3>
                        </div>
                        <div className='mt-5 space-y-1'>
                            {currentRevenue > pastRevenue ?
                                <span className='text-sm font-medium flex flex-row gap-1 items-center text-green-600 dark:text-green-400 tracking-wide '>
                                    Revenue up this month <TrendingUp className="size-4" />
                                </span>
                                :
                                currentRevenue === pastRevenue
                                    ? <span className='text-sm font-medium flex flex-row gap-1 items-center text-blue-600 dark:text-blue-400 tracking-wide '>
                                        Revenue equal this month <Minus className="size-4" />
                                    </span>
                                    : <span className='text-sm font-medium flex flex-row gap-1 items-center text-red-600 dark:text-red-400 tracking-wide '>
                                        Revenue down this month <TrendingDown className="size-4" />
                                    </span>
                            }
                            <span className='text-sm text-muted-foreground font-medium flex flex-row gap-1 items-center tracking-wide'>
                                Total Revenue for this month
                            </span>
                        </div>
                    </div>
                    <div className='dark:bg-neutral-900 bg-background min-h-[200px] rounded-md p-7 shadow-lg flex flex-col gap-2 border'>
                        <div className='flex justify-between items-center'>
                            <span className='text-muted-foreground font-medium tracking-wide'>New Parents</span>
                            {newParents > previousParents ?
                                <Badge variant='secondary' className='rounded-lg tracking-wide border dark:border-neutral-700 border-neutral-400 text-green-600 dark:text-green-400'>
                                    <TrendingUp className="mr-1 size-4" /> +{new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(parentPercentage)}%
                                </Badge>
                                : newParents === previousParents ?
                                    <Badge variant='secondary' className='rounded-lg tracking-wide border dark:border-neutral-700 border-neutral-400 text-blue-600 dark:text-blue-400'>
                                        <Minus className="mr-1 size-4" /> {new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(parentPercentage)}%
                                    </Badge>
                                    : <Badge variant='secondary' className='rounded-lg tracking-wide border dark:border-neutral-700 border-neutral-400 text-red-600 dark:text-red-400 '>
                                        <TrendingDown className="mr-1 size-4" /> {new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(parentPercentage)}%
                                    </Badge>
                            }
                        </div>
                        <div>
                            <h3 className='text-3xl font-medium mt-1 tracking-wide'>
                                {newParents}
                            </h3>
                        </div>
                        <div className='mt-5 space-y-1'>
                            {newParents > previousParents ?
                                <span className='text-sm font-medium flex flex-row gap-1 items-center text-green-600 dark:text-green-400 tracking-wide '>
                                    Parents increased from last month <TrendingUp className="size-4" />
                                </span>
                                : newParents === previousParents
                                    ?
                                    <span className='text-sm font-medium flex flex-row gap-1 items-center text-blue-600 dark:text-blue-400 tracking-wide '>
                                        Same as the last month <Minus className="size-4" />
                                    </span>
                                    :
                                    <span className='text-sm font-medium flex flex-row gap-1 items-center text-red-600 dark:text-red-400 tracking-wide '>
                                        Parents decreased from last month <TrendingDown className="size-4" />
                                    </span>

                            }
                            <span className='text-sm text-muted-foreground font-medium flex flex-row gap-1 items-center tracking-wide'>
                                Total new parents this month
                            </span>
                        </div>
                    </div>
                    <div className='dark:bg-neutral-900 bg-background min-h-[200px] rounded-md p-7 shadow-lg flex flex-col gap-2 border'>
                        <div className='flex justify-between items-center'>
                            <span className='text-muted-foreground font-medium tracking-wide'>New Babysitter</span>
                            {newBabysitters > previousBabysitters ?
                                <Badge variant='secondary' className='rounded-lg tracking-wide border dark:border-neutral-700 border-neutral-400 text-green-600 dark:text-green-400'>
                                    <TrendingUp className="mr-1 size-4" /> +{new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(babysitterPercentage)}%
                                </Badge>
                                : newBabysitters === previousBabysitters ?
                                    <Badge variant='secondary' className='rounded-lg tracking-wide border dark:border-neutral-700 border-neutral-400 text-blue-600 dark:text-blue-400'>
                                        <Minus className="mr-1 size-4" /> {new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(babysitterPercentage)}%
                                    </Badge>
                                    : <Badge variant='secondary' className='rounded-lg tracking-wide border dark:border-neutral-700 border-neutral-400 text-red-600 dark:text-red-400 '>
                                        <TrendingDown className="mr-1 size-4" /> {new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(babysitterPercentage)}%
                                    </Badge>
                            }
                        </div>
                        <div>
                            <h3 className='text-3xl font-medium mt-1 tracking-wide'>
                                {newBabysitters}
                            </h3>
                        </div>
                        <div className='mt-5 space-y-1'>
                            {newBabysitters > previousBabysitters ?
                                <span className='text-sm font-medium flex flex-row gap-1 items-center text-green-600 dark:text-green-400 tracking-wide '>
                                    Babysitter increased from last month <TrendingUp className="size-4" />
                                </span>
                                : newBabysitters === previousBabysitters
                                    ?
                                    <span className='text-sm font-medium flex flex-row gap-1 items-center text-blue-600 dark:text-blue-400 tracking-wide '>
                                        Same as the last month <Minus className="size-4" />
                                    </span>
                                    :
                                    <span className='text-sm font-medium flex flex-row gap-1 items-center text-red-600 dark:text-red-400 tracking-wide '>
                                        Babysitter decreased from last month <TrendingDown className="size-4" />
                                    </span>

                            }
                            <span className='text-sm text-muted-foreground font-medium flex flex-row gap-1 items-center tracking-wide'>
                                Total new parents this month
                            </span>
                        </div>
                    </div>

                </div>
                <div className="relative overflow-x-auto rounded-md scrollbar-hide">

                    <table className="w-full text-sm text-left rtl:text-right text-black dark:text-white">
                        <thead className="text-xs text-black background-bg uppercase bg-v-50 dark:bg-neutral-900 dark:text-white border">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Account Id
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    IP Address
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Balance
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Role
                                </th>
                                <th scope="col" className="px-6 py-3 flex justify-center">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        {users.length > 0 ?
                            <tbody>
                                {users.map((u) => (
                                    <tr className="bg-background dark:bg-background border" key={u.id}>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {u.account_id}
                                        </th>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {u.ip_address}
                                        </th>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {u.name}
                                        </th>
                                        <td className="px-6 py-4">
                                            Active
                                        </td>
                                        <td className="px-6 py-4">
                                            ₱{u.formattedBalance}
                                        </td>
                                        <td className="px-6 py-4">
                                            {u.is_babysitter ? "Babysitter" : "Parent"}
                                        </td>
                                        <td className="px-6 py-4 flex justify-center relative">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <button className='cursor-pointer'>
                                                        <EllipsisVertical />
                                                    </button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent className="w-56 m-2 bg-background shadow-lg dark:bg-neutral-900 border" align="end" key={u.id}>
                                                    <DropdownMenuGroup>
                                                        <Dialog>
                                                            <DialogTrigger asChild>
                                                                <div className='rounded-sm px-2 py-1.5 text-sm  hover:bg-neutral-800 w-full gap-2"'>
                                                                    <button className="cursor-pointer w-full text-start flex justify-between" onClick={() => {
                                                                        setData('account_id', u.account_id);
                                                                        setData('name', u.name);
                                                                        setData('ip_address', u.ip_address);
                                                                        setData('email', u.email);
                                                                        setData('address', u.address);
                                                                        setData('profile', u.profile);
                                                                        setData('balance', u.balance);
                                                                        setData('rate', u.rate)
                                                                        setData('book_status', u.book_status)
                                                                    }}>
                                                                        Edit
                                                                        <DropdownMenuShortcut><Pen size={15} /></DropdownMenuShortcut>
                                                                    </button>
                                                                </div>
                                                            </DialogTrigger>
                                                            <DialogContent className="sm:max-w-[600px]" >
                                                                <form onSubmit={(e) => handleUpdateData(e, u.id)} className="grid gap-4">
                                                                    <DialogHeader>
                                                                        <DialogTitle>Edit Data - {u.name}</DialogTitle>
                                                                        <DialogDescription>
                                                                            Make changes to {u.name}&apos;s data here. Click <b>Save</b> when you&apos;re done.
                                                                        </DialogDescription>
                                                                    </DialogHeader>
                                                                    <div>
                                                                        {flash.message &&
                                                                            <Alert>
                                                                                <CheckCircle2Icon />
                                                                                <AlertTitle>Success! Your changes have been saved</AlertTitle>
                                                                                <AlertDescription>
                                                                                    {flash.message}
                                                                                </AlertDescription>
                                                                            </Alert>
                                                                        }
                                                                        {Object.keys(errors).length > 0 && (
                                                                            <div className='mt-2'>
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
                                                                            </div>
                                                                        )}
                                                                        <div className='flex justify-between space-x-2'>
                                                                            <Input className='hidden' id='id' onChange={(e) => setData('id', u.id)} />
                                                                            <div className='grid gap-3'>
                                                                                <Label htmlFor='account_id'>Account Id</Label>
                                                                                <Input id='account_id' onChange={(e) => setData('account_id', e.target.value)} value={data.account_id} placeholder={u.account_id} />
                                                                            </div>
                                                                            <div className='grid gap-3'>
                                                                                <Label htmlFor='name'>Name</Label>
                                                                                <Input id='name' onChange={(e) => setData('name', e.target.value)} value={data.name} placeholder={u.name} />
                                                                            </div>
                                                                            <div className='grid gap-3'>
                                                                                <Label htmlFor='ip_address'>IP Address</Label>
                                                                                <Input id='ip_address' onChange={(e) => setData('ip_address', e.target.value)} value={data.ip_address} placeholder={u.ip_address} />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="grid gap-4">
                                                                        <div className='flex justify-between space-x-2'>
                                                                            <div className='grid gap-3'>
                                                                                <Label htmlFor='email_address'>Email Address</Label>
                                                                                <Input id='email_address' onChange={(e) => setData('email', e.target.value)} value={data.email} placeholder={u.email || "NULL"} />
                                                                            </div>
                                                                            <div className='grid gap-3'>
                                                                                <Label htmlFor='address'>Address</Label>
                                                                                <Input id='address' onChange={(e) => setData('address', e.target.value)} value={data.address} placeholder={u.address || "NULL"} />
                                                                            </div>
                                                                            <div className='grid gap-3'>
                                                                                <Label htmlFor='contact_number'>Contact Number</Label>
                                                                                <Input id='contact_number' onChange={(e) => setData('contact_number', e.target.value)} value={data.contact_number} placeholder={u.contact_number || "NULL"} />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="grid gap-4">
                                                                        <div className='flex justify-between space-x-2'>
                                                                            <div className='grid gap-3'>
                                                                                <Label htmlFor='profile'>Profile</Label>
                                                                                <Input type='file' id='profile' onChange={(e) => setData('profile', e.target.value)} />
                                                                            </div>
                                                                            <div className='grid gap-3'>
                                                                                <Label htmlFor='balance'>Balance</Label>
                                                                                <Input id='balance' onChange={(e) => setData('balance', parseInt(e.target.value))} value={data.balance} placeholder={u.balance || "NULL"} />
                                                                            </div>
                                                                            <div className={u.is_babysitter ? 'grid gap-3' : 'hidden'}>
                                                                                <Label htmlFor='rate'>Rate</Label>
                                                                                <Input id='rate' onChange={(e) => setData('rate', parseInt(e.target.value))} value={data.rate} placeholder={u.rate || 'NULL'} />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="grid gap-4">
                                                                        <div className='flex justify-between space-x-2'>
                                                                            <div className={u.is_babysitter ? 'grid gap-3' : 'hidden'}>
                                                                                <Label htmlFor='book_status'>Book Status</Label>
                                                                                <p className='text-sm'>Current status: {u.book_status === 'booked' ? 'Booked' : 'Available'}</p>
                                                                                <Select onValueChange={(value) => setData('book_status', value)}>
                                                                                    <SelectTrigger className="w-[180px]">
                                                                                        <SelectValue placeholder="Select a Book Status" />
                                                                                    </SelectTrigger>
                                                                                    <SelectContent>
                                                                                        <SelectGroup>
                                                                                            <SelectLabel>Book Status</SelectLabel>
                                                                                            <SelectItem value="Booked">Booked</SelectItem>
                                                                                            <SelectItem value="Available">Available</SelectItem>
                                                                                        </SelectGroup>
                                                                                    </SelectContent>
                                                                                </Select>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <DialogFooter>
                                                                        <DialogClose asChild>
                                                                            <Button variant="outline">Cancel</Button>
                                                                        </DialogClose>
                                                                        <Button type="submit">Save changes</Button>
                                                                    </DialogFooter>
                                                                </form>
                                                            </DialogContent>
                                                        </Dialog>

                                                        <DropdownMenuItem>
                                                            <button className='cursor-pointer w-full text-start flex justify-between'>
                                                                Make a copy
                                                                <DropdownMenuShortcut><Layers2 size={15} /></DropdownMenuShortcut>
                                                            </button>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem>
                                                            <button className='cursor-pointer w-full text-start flex justify-between'>
                                                                Favorite
                                                                <DropdownMenuShortcut><Bookmark size={15} /></DropdownMenuShortcut>
                                                            </button>
                                                        </DropdownMenuItem>
                                                    </DropdownMenuGroup>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuGroup>
                                                        <DropdownMenuItem>
                                                            <button className='text-red-600 dark:text-red-400 cursor-pointer w-full text-start flex justify-between' onClick={() => handleDeleteUser(u.id)}>Delete
                                                                <DropdownMenuShortcut><Trash2 size={15} /></DropdownMenuShortcut>
                                                            </button>
                                                        </DropdownMenuItem>
                                                    </DropdownMenuGroup>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            : <div></div>}
                    </table>
                </div>

            </div>
        </AppLayout>
    );
}
