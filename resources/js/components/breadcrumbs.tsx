import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { SharedData, type BreadcrumbItem as BreadcrumbItemType } from '@/types';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Fragment, useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Bell, Divide, History, Search, X } from 'lucide-react';
import { Input } from './ui/input';
import { useIsMobile } from '@/hooks/use-mobile';
import axios from "axios";
import { PageProps as InertiaPageProps } from '@inertiajs/core'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useInitials } from '@/hooks/use-initials';
import { cn } from '@/lib/utils';
import { Skeleton } from "@/components/ui/skeleton"

interface Notification {
    id: number;
    notification: string;
    created_date: string;
    created_at: string;
}

export function Breadcrumbs({ breadcrumbs }: { breadcrumbs: BreadcrumbItemType[] }) {
    const { auth } = usePage<SharedData>().props;
    const [newCount, setNewCount] = useState<number>(0);
    const [notification, setNotification] = useState<Notification[]>([]);
    const getInitials = useInitials();
    const systemName = 'SitterLy';
    const [search, setSearch] = useState(String);
    const [savedSearch, setSavedSearch] = useState<String[]>([]);

    useEffect(() => {
        const fetchCountData = () => {
            axios.get(route('notification.count'), {})
                .then(response => {
                    setNewCount(response.data);
                })
        }

        fetchCountData()
        const countInterval = setInterval(fetchCountData, 5000);
        return () => clearInterval(countInterval);
    }, [])

    useEffect(() => {
        const fetchNotificationData = () => {
            axios.get(route('notification'), {})
                .then((response: any) => {
                    setNotification(response.data);
                })
        }

        fetchNotificationData()
        const notificationInterval = setInterval(fetchNotificationData, 5000);
        return () => clearInterval(notificationInterval);
    }, [])

    const isMobile = useIsMobile();

    const handleSearch = () => {
        document.getElementById("search-input")?.classList.remove("hidden");
        document.getElementById("linkMessage")?.classList.add("hidden");
        document.getElementById("searchIcon")?.classList.add("hidden");
        document.getElementById("BreadcrumbList")?.classList.add("hidden");
        document.getElementById("hideNotification")?.classList.add("hidden");
        setTimeout(() => {
            document.getElementById("search-input")?.classList.remove("scale-0", 'opacity-0');
            document.getElementById("search-input")?.classList.add("scale-100", 'opacity-190');

        }, 10)
    }

    const handleSearchInput = () => {

        document.getElementById("search-input")?.classList.add("scale-0", 'opacity-0');
        document.getElementById("search-input")?.classList.remove("scale-100", 'opacity-190');
        setTimeout(() => {
            document.getElementById("search-input")?.classList.add("hidden");
            document.getElementById("searchIcon")?.classList.remove("hidden");
            document.getElementById("BreadcrumbList")?.classList.remove("hidden");
            document.getElementById("linkMessage")?.classList.remove("hidden");
            document.getElementById("hideNotification")?.classList.remove("hidden");
        }, 300)
    }

    const { data, setData, get, processing, errors } = useForm({
        search: '',
    })

    const handleSearchResult = (e: React.FormEvent) => {
        e.preventDefault();
        get(route('result.search'));

        let savedSearch = JSON.parse(localStorage.getItem("search") || "[]");

        savedSearch.push(search);

        localStorage.setItem("search", JSON.stringify(savedSearch));
    }

    const handleShowNotification = () => {
        let notificationContainer = document.getElementById('notificationContainer');
        document.getElementById('notificationCount')?.classList.add('hidden')
        let skeleton = document.getElementById("skeletonNotification")
        let notification = document.getElementById("notification");
        let emptyStateNotification = document.getElementById("emptyStateNotification");
        skeleton?.classList.remove("hidden");
        emptyStateNotification?.classList.add("hidden")
        notification?.classList.add("hidden")

        setTimeout(() => {
            skeleton?.classList.add("hidden");

            if (skeleton?.classList.contains("hidden")) {
                notification?.classList.remove("hidden")
                emptyStateNotification?.classList.remove("hidden")
            } else {
                notification?.classList.add("hidden")
                emptyStateNotification?.classList.add("hidden")
            }
        }, 5000);

        if (notificationContainer?.classList.contains('hidden')) {
            notificationContainer?.classList.remove("hidden")
            setTimeout(() => {
                notificationContainer?.classList.remove("scale-0", "opacity-0")
                notificationContainer?.classList.add("scale-100", "opacity-100")
            }, 10)
        } else {
            notificationContainer?.classList.remove("scale-100", "opacity-100")
            notificationContainer?.classList.add("scale-0", "opacity-0")
            setTimeout(() => {
                notificationContainer?.classList.add("hidden")
                skeleton?.classList.add("hidden");
                emptyStateNotification?.classList.remove("hidden")
                notification?.classList.remove("hidden")
            }, 300)
        }
    }

    const handleNotificationCount = () => {
        axios.post(route('notification.emptyCount'), {});
    }

    useEffect(() => {
        let stored = localStorage.getItem("search");
        let displaySavedSearch: string[] = stored ? JSON.parse(stored) : [];

        setSavedSearch(displaySavedSearch);

    }, [])

    const handledDeleteSearch = (deleteSearch: string) => {
        let savedSearch = JSON.parse(localStorage.getItem("search") || "[]");

        let updatedSearch = savedSearch.filter((item: string) => item !== deleteSearch);

        localStorage.setItem("search", JSON.stringify(updatedSearch));

        document.getElementById(`search${deleteSearch}`)?.classList.add("hidden")
    }

    return (
        <>
            {isMobile ?
                <div id='BreadcrumbList' className=''>
                    {breadcrumbs.length > 0 && (
                        <Breadcrumb>
                            <BreadcrumbList >
                                {breadcrumbs.map((item, index) => {
                                    const isLast = index === breadcrumbs.length - 1;
                                    return (
                                        <Fragment key={index}>
                                            <BreadcrumbItem>
                                                {isLast ? (
                                                    <BreadcrumbPage>{item.title}</BreadcrumbPage>
                                                ) : (
                                                    <BreadcrumbLink asChild>
                                                        <Link href={item.href}>{item.title}</Link>
                                                    </BreadcrumbLink>
                                                )}
                                            </BreadcrumbItem>
                                            {!isLast && <BreadcrumbSeparator />}
                                        </Fragment>
                                    );
                                })}

                            </BreadcrumbList>

                        </Breadcrumb>
                    )}
                </div>
                :
                <div>
                    {breadcrumbs.length > 0 && (
                        <Breadcrumb>
                            <BreadcrumbList >
                                {breadcrumbs.map((item, index) => {
                                    const isLast = index === breadcrumbs.length - 1;
                                    return (
                                        <Fragment key={index}>
                                            <BreadcrumbItem>
                                                {isLast ? (
                                                    <BreadcrumbPage>{item.title}</BreadcrumbPage>
                                                ) : (
                                                    <BreadcrumbLink asChild>
                                                        <Link href={item.href}>{item.title}</Link>
                                                    </BreadcrumbLink>
                                                )}
                                            </BreadcrumbItem>
                                            {!isLast && <BreadcrumbSeparator />}
                                        </Fragment>
                                    );
                                })}

                            </BreadcrumbList>

                        </Breadcrumb>
                    )}
                </div>
            }
            <div className="absolute right-5 cursor-pointer inline-flex items-center justify-center gap-2 ">
                {isMobile ?
                    <div id='hideNotification' className='relative'>
                        <span id='notificationCount' className={cn('absolute z-50 bg-red-500 rounded-full -top-1 -right-1 w-4 text-white  text-center text-xs', newCount === 0 ? 'hidden' : '')}>{newCount}</span>
                        <div className='relative'>
                            <Button onClick={() => { handleShowNotification(); handleNotificationCount(); }} variant='outline' className='cursor-pointer'><Bell /></Button>
                            <div id='notificationContainer' className='hidden absolute z-50 -left-60 top-10 rounded-md border bg-background dark:bg-neutral-900 min-w-[345px] max-h-[500px] p-5 overflow-y-auto scrollbar-hide m-1 transition-all ease-in-out origin-top duration-300 transform scale-0 opacity-0'>
                                <span className='text-lg font-medium'>Notification</span>
                                <hr className='mt-4 mb-4' />
                                <div className="flex items-center space-x-4" id='skeletonNotification'>
                                    <Skeleton className="h-15 w-15 rounded-full" />
                                    <div className="space-y-2">
                                        <Skeleton className="h-4 w-[230px]" />
                                        <Skeleton className="h-4 w-[75px]" />
                                    </div>
                                </div>
                                {notification.length > 0 ?
                                    <div className='hidden' id='notification'>
                                        {notification.map(n => (
                                            <div key={n.id}>
                                                <div className='flex flex-row gap-1 items-center'>
                                                    <Avatar className="h-15 w-15 overflow-hidden rounded-full">
                                                        <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                                                            {getInitials(systemName)}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div className='flex flex-col'>
                                                        <span className='text-sm'>{n.notification}</span>
                                                        <div className='flex flex-row items-center gap-0.5 text-muted-foreground'>
                                                            <History className='w-3 h-3' />
                                                            <span className='text-xs truncate'>{n.created_date}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <hr className='mt-4 mb-4' />
                                            </div>
                                        ))}
                                    </div>
                                    : <div className='flex justify-center text-muted-foreground hidden' id='emptyStateNotification'>No notifications yet
                                    </div>}
                            </div>
                        </div>
                    </div>
                    :
                    <div className='relative'>
                        <span id='notificationCount' className={cn('absolute z-50 bg-red-500 rounded-full -top-2 -right-2 w-5 text-white  text-center text-sm', newCount === 0 ? 'hidden' : '')}>{newCount}</span>
                        <div className='relative'>
                            <Button variant='outline' className='cursor-pointer' onClick={() => { handleShowNotification(); handleNotificationCount(); }}><Bell /></Button>
                            <div id='notificationContainer' className='hidden absolute z-50 -right-0 top-10 rounded-md border bg-background dark:bg-neutral-900 min-w-[400px] max-h-[500px] p-5 overflow-y-auto scrollbar-hide transition-all duration-300 origin-top-right ease-in-out transform scale-0 opacity-0'>
                                <span className='text-lg font-medium'>Notification</span>
                                <hr className='mt-4 mb-4' />
                                <div className="flex items-center space-x-4" id='skeletonNotification'>
                                    <Skeleton className="h-15 w-15 rounded-full" />
                                    <div className="space-y-2">
                                        <Skeleton className="h-4 w-[240px]" />
                                        <Skeleton className="h-4 w-[80px]" />
                                    </div>
                                </div>
                                {notification.length > 0 ?
                                    <div className='hidden' id='notification'>
                                        {notification.map(n => (
                                            <div key={n.id}>
                                                <div className='flex flex-row gap-1 items-center'>
                                                    <Avatar className="h-15 w-15 overflow-hidden rounded-full">
                                                        <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                                                            {getInitials(systemName)}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div className='flex flex-col gap-1'>
                                                        <span className='text-sm truncate'>{n.notification}</span>
                                                        <div className='flex flex-row items-center gap-1 text-muted-foreground'>
                                                            <History className='w-3 h-3' />
                                                            <span className='text-xs truncate'>{n.created_date}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <hr className='mt-4 mb-4' />
                                            </div>
                                        ))}
                                    </div>
                                    : <div className='flex justify-center text-muted-foreground hidden' id='emptyStateNotification'>No notifications yet
                                    </div>}
                            </div>
                        </div>
                    </div>
                }
                <div id='searchIcon'>
                    <Button onClick={handleSearch} variant='outline' className="cursor-pointer">
                        <Search />
                    </Button>
                </div>
                <div className='flex flex-row hidden gap-2 items-center transition-all transform ease-in-out duration-300 origin-right scale-0 opacity-0 z-50' id='search-input'>
                    <div className='relative'>
                        <form onSubmit={handleSearchResult}>
                            <Search className='absolute left-3 top-1/2 p-1 -translate-y-1/2 text-gray-400 w-5 h-5' />
                            <div className='relative'>
                                <input type="text" className="pl-10 border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm -mr-2"
                                    placeholder='Search...'
                                    onChange={(e) => { setData('search', e.target.value); setSearch(e.target.value) }} value={data.search} />
                                <div className={savedSearch.length === 0 ? 'hidden' : 'bg-neutral-900 rounded-lg min-w-[300px] min-h-[300px] absolute top-10 right-0 p-5 pr-3'} id='displaySavedSearch'>
                                    <div className='flex flex-col gap-2'>
                                        <span className='text-lg font-medium'>Search History</span>
                                        <hr/>
                                        <div className='flex flex-wrap gap-2'>
                                            {savedSearch.map((item: any, index) => (
                                                <span key={index} className='bg-neutral-800 px-3 py-1 text-sm rounded-md text-sm relative' id={`search${item}`}>
                                                    <div>{item}</div>
                                                    <button type='button' className='absolute -top-2 -right-2 bg-neutral-500 rounded-full cursor-pointer' onClick={() => { handledDeleteSearch(item); }}>
                                                        <X size={18} />
                                                    </button>
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <button onClick={handleSearchInput} className='cursor-pointer'><X size={18} className='cursor-pointer' /></button>
                </div>
            </div>
        </>
    );
}