import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { SharedData, type BreadcrumbItem as BreadcrumbItemType } from '@/types';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Fragment, useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Bell, History, Search, X } from 'lucide-react';
import { Input } from './ui/input';
import { useIsMobile } from '@/hooks/use-mobile';
import axios from "axios";
import { PageProps as InertiaPageProps } from '@inertiajs/core'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useInitials } from '@/hooks/use-initials';

interface Notification {
    id: number;
    notification: string;
    created_date: string;
}

export function Breadcrumbs({ breadcrumbs }: { breadcrumbs: BreadcrumbItemType[] }) {
    const { auth } = usePage<SharedData>().props;
    const [newCount, setNewCount] = useState<number>(0);
    const [notification, setNotification] = useState<Notification[]>([]);
    const getInitials = useInitials();
    const systemName = 'SitterLy';

    useEffect(() => {
        const fetchCountData = () => {
            axios.get(route('notification.count'), {})
                .then(response => {
                    setNewCount(response.data);
                })
        }

        fetchCountData()
        const countInterval = setInterval(fetchCountData, 1000);
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
        const notificationInterval = setInterval(fetchNotificationData, 1000);
        return () => clearInterval(notificationInterval);
    })

    const isMobile = useIsMobile();

    const handleSearch = () => {
        document.getElementById("search-input")?.classList.remove("hidden");
        document.getElementById("linkMessage")?.classList.add("hidden");
        document.getElementById("searchIcon")?.classList.add("hidden");
        document.getElementById("BreadcrumbList")?.classList.add("hidden");
        document.getElementById("hideNotification")?.classList.add("hidden");
    }

    const handleSearchInput = () => {
        document.getElementById("search-input")?.classList.add("hidden");
        document.getElementById("searchIcon")?.classList.remove("hidden");
        document.getElementById("BreadcrumbList")?.classList.remove("hidden");
        document.getElementById("linkMessage")?.classList.remove("hidden");
        document.getElementById("hideNotification")?.classList.remove("hidden");
    }

    const { data, setData, get, processing, errors } = useForm({
        search: '',
    })

    const handleSearchResult = (e: React.FormEvent) => {
        e.preventDefault();
        get(route('result.search'));
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
                        <span className='absolute bg-red-500 rounded-full -top-1 -right-1 w-4 text-white  text-center text-xs'>{newCount}</span>
                        <Button variant='outline' className='cursor-pointer'><Bell /></Button>
                    </div>
                    :
                    <div className='relative'>
                        <span className='absolute z-50 bg-red-500 rounded-full -top-2 -right-2 w-5 text-white  text-center text-sm'>{newCount}</span>
                        <div className='relative'>
                            <Button variant='outline' className='cursor-pointer'><Bell /></Button>
                            <div className='absolute z-50 -left-90 top-10 rounded-md border bg-neutral-900 min-w-[400px] min-h-[500px] p-5'>
                                <span className='text-lg font-medium'>Notification</span>
                                <hr className='mt-4 mb-4' />
                                {notification.map(n => (
                                    <div>
                                        <div className='flex flex-row gap-1 items-center'>
                                        <Avatar className="h-15 w-15 overflow-hidden rounded-full">
                                            <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                                                {getInitials(systemName)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className='flex flex-col'>
                                        <span className='text-sm'>{n.notification}</span>
                                        <div className='flex flex-row items-center gap-0.5 text-muted-foreground'>
                                            <History className='w-3 h-3'/>
                                            <span className='text-xs'>{n.created_date}</span>
                                            </div>
                                        </div>
                                        </div>
                                        <hr className='mt-4 mb-4'/>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                }
                <div id='searchIcon'>
                    <Button onClick={handleSearch} variant='outline' className="">
                        <Search />
                    </Button>
                </div>
                <div className='flex flex-row hidden gap-2 items-center' id='search-input'>
                    <div className='relative'>
                        <form onSubmit={handleSearchResult}>
                            <Search className='absolute left-3 top-1/2 p-1 -translate-y-1/2 text-gray-400 w-5 h-5' />
                            <input type="text" className="pl-10 border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm -mr-2" placeholder='Search...' onChange={(e) => setData('search', e.target.value)} value={data.search} />
                        </form>
                    </div>
                    <button onClick={handleSearchInput} className='cursor-pointer'><X size={18} className='cursor-pointer' /></button>
                </div>
            </div>
        </>
    );
}
