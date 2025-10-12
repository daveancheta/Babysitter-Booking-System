import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { type BreadcrumbItem as BreadcrumbItemType } from '@/types';
import { Link, useForm } from '@inertiajs/react';
import { Fragment, useState } from 'react';
import { Button } from './ui/button';
import { MessageCircle, MessageCircleMore, Search, X } from 'lucide-react';
import { Input } from './ui/input';
import { useIsMobile } from '@/hooks/use-mobile';

export function Breadcrumbs({ breadcrumbs }: { breadcrumbs: BreadcrumbItemType[] }) {

    const isMobile = useIsMobile();

    const handleSearch = () => {
        document.getElementById("search-input")?.classList.remove("hidden");
        document.getElementById("linkMessage")?.classList.add("hidden");
        document.getElementById("searchIcon")?.classList.add("hidden");
        document.getElementById("BreadcrumbList")?.classList.add("hidden");
    }

    const handleSearchInput = () => {
        document.getElementById("search-input")?.classList.add("hidden");
        document.getElementById("searchIcon")?.classList.remove("hidden");
        document.getElementById("BreadcrumbList")?.classList.remove("hidden");
        document.getElementById("linkMessage")?.classList.remove("hidden");
    }

    const { data, setData, get, processing, errors } = useForm({
        search: '',
    })

    const handleSearchResult = (e: React.FormEvent) => {
        e.preventDefault();
        get(route('result.search'));
    }

    const handleOpenChat = () => {
       let chatContainer =  document.getElementById('chatContainer');

       if (chatContainer?.classList.contains("hidden")) {
        chatContainer?.classList.remove("hidden")
       } else {
        chatContainer?.classList.add("hidden")
       }
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
                    <Button variant='outline'>
                        <MessageCircleMore />
                    </Button> :
                    <div className='relative'>
                        <Button onClick={handleOpenChat} className='cursor-pointer' variant='outline'>
                            <MessageCircleMore />
                        </Button>
                        <div id='chatContainer' className='absolute top-10 right-0 z-50 dark:bg-neutral-900 bg-background rounded-lg border p-6 shadow-lg duration-200 min-h-[400px] min-w-[400px] flex flex-col hidden'>
                        <p className='text-xl font-medium'>Chats</p>
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
