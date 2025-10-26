import { Badge } from '@/components/ui/badge';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Bookmark, EllipsisVertical, Layers2, Minus, Pen, Trash2, TrendingDown, TrendingUp } from 'lucide-react';
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

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },

];

interface Users {
    id: number;
    account_id: number;
    name: string;
    is_babysitter: boolean;
    formattedBalance: number;
}

interface PageProps extends InertiaPageProps {
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
    const { users, currentRevenue, pastRevenue, revenuePercentage,
        newParents, parentPercentage, previousParents, babysitterPercentage,
        newBabysitters, previousBabysitters } = usePage<PageProps>().props;
    const [actionId, setActionId] = useState(Number);

    const handleOpenAction = (id: number) => {
        document.getElementById(`action${id}`)?.classList.remove("hidden")
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
                                    <tr className="bg-background dark:bg-background border ">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {u.account_id}
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
                                                <DropdownMenuContent className="w-56 m-2 bg-neutral-900 border" align="end">
                                                    <DropdownMenuGroup>
                                                        <DropdownMenuItem>
                                                            <button className='cursor-pointer w-full text-start flex justify-between'>
                                                            Edit
                                                            <DropdownMenuShortcut><Pen/></DropdownMenuShortcut>
                                                            </button>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem>
                                                            <button className='cursor-pointer w-full text-start flex justify-between'>
                                                            Make a copy
                                                            <DropdownMenuShortcut><Layers2/></DropdownMenuShortcut>
                                                            </button>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem>
                                                            <button className='cursor-pointer w-full text-start flex justify-between'>
                                                            Favorite
                                                            <DropdownMenuShortcut><Bookmark/></DropdownMenuShortcut>
                                                            </button>
                                                        </DropdownMenuItem>
                                                    </DropdownMenuGroup>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuGroup>
                                                         <DropdownMenuItem>
                                                            <button className='text-red-600 dark:text-red-400 cursor-pointer w-full text-start flex justify-between'>Delete
                                                            <DropdownMenuShortcut><Trash2/></DropdownMenuShortcut>
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
