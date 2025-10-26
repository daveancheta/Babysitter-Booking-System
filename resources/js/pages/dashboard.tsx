import { Badge } from '@/components/ui/badge';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Minus, TrendingDown, TrendingUp } from 'lucide-react';
import { PageProps as InertiaPageProps } from '@inertiajs/core'

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },

];

interface PageProps extends InertiaPageProps {
    currentRevenue: number;
    revenuePercentage: number;
    pastRevenue: number
    newParents: number
    parentPercentage: number;
    previousParents: number
}

export default function Dashboard() {
    const { currentRevenue, pastRevenue, revenuePercentage, newParents, parentPercentage, previousParents } = usePage<PageProps>().props;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-4">
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
                                <span className='text-sm font-medium flex flex-row gap-1 items-center text-green-600 dark:text-green-400 tracking-wide truncate'>
                                    Revenue up this month <TrendingUp className="size-4" />
                                </span>
                                :
                                currentRevenue === pastRevenue
                                    ? <span className='text-sm font-medium flex flex-row gap-1 items-center text-blue-600 dark:text-blue-400 tracking-wide truncate'>
                                        Revenue equal this month <Minus className="size-4" />
                                    </span>
                                    : <span className='text-sm font-medium flex flex-row gap-1 items-center text-red-600 dark:text-red-400 tracking-wide truncate'>
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
                                    : <Badge variant='secondary' className='rounded-lg tracking-wide border dark:border-neutral-700 border-neutral-400 text-red-600 dark:text-red-400 truncate'>
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
                                <span className='text-sm font-medium flex flex-row gap-1 items-center text-green-600 dark:text-green-400 tracking-wide truncate'>
                                    Parents increased from last month. <TrendingUp className="size-4" />
                                </span>
                                : newParents === previousParents 
                                ?
                                <span className='text-sm font-medium flex flex-row gap-1 items-center text-blue-600 dark:text-blue-400 tracking-wide truncate'>
                                    Same as last month. <Minus className="size-4" />
                                </span> 
                                :
                                <span className='text-sm font-medium flex flex-row gap-1 items-center text-red-600 dark:text-red-400 tracking-wide truncate'>
                                    Parents decreased from last month. <TrendingDown className="size-4" />
                                </span>
                                
                            }
                            <span className='text-sm text-muted-foreground font-medium flex flex-row gap-1 items-center tracking-wide'>
                                Total new parents this month
                            </span>
                        </div>
                    </div>
                    <div className='dark:bg-neutral-900 bg-background min-h-[200px] rounded-md p-7 shadow-lg flex flex-col gap-2 border'>

                    </div>
                    <div className='dark:bg-neutral-900 bg-background min-h-[200px] rounded-md p-7 shadow-lg flex flex-col gap-2 border'>

                    </div>
                </div>
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
            </div>
        </AppLayout>
    );
}
