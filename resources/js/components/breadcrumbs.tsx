import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { type BreadcrumbItem as BreadcrumbItemType } from '@/types';
import { Link, useForm } from '@inertiajs/react';
import { Fragment, useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Images, MessageCircle, MessageCircleMore, Search, Send, X } from 'lucide-react';
import { Input } from './ui/input';
import { useIsMobile } from '@/hooks/use-mobile';
import axios from 'axios';

interface User {
    id: number;
    name: string;
    profile: string;
    following_user_id: number;
}

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
        let chatContainer = document.getElementById('chatContainer');

        if (chatContainer?.classList.contains("hidden")) {
            document.getElementById('messageIcon')?.classList.add("text-blue-400")
            chatContainer?.classList.remove("hidden")
        } else {
            document.getElementById('messageIcon')?.classList.remove("text-blue-400")
            chatContainer?.classList.add("hidden")
        }
    }

    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchMessage = () => {
            axios.get('/getMessageUsers')
                .then(response => {
                    setUsers(response.data);
                })
        }

        fetchMessage()
        const interval = setInterval(fetchMessage, 1000);
        return () => clearInterval(interval)

    }, []);

    const handleOpenChatUser = (id: number) => {
        document.getElementById(`chatContainer${id}`)?.classList.remove("hidden")
        document.getElementById('buttonOpenChatUser')?.classList.add("pointer-events-none")
    }

    const handleCloseChatUser = (id: number) => {
        document.getElementById(`chatContainer${id}`)?.classList.add("hidden")
         document.getElementById('buttonOpenChatUser')?.classList.remove("pointer-events-none")
    }

    const inputFileTrigger = () => {
        document.getElementById("inputFile")?.click();
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
                            <MessageCircleMore id='messageIcon' />
                        </Button>
                        <div id='chatContainer' className='absolute top-10 right-0 z-50 dark:bg-neutral-900 bg-background rounded-lg border p-6 shadow-lg duration-200 min-h-[400px] min-w-[400px] flex flex-col hidden'>
                            <p className='text-xl font-medium'>Chats</p>
                            <div id='buttonOpenChatUser'>
                            {users.map(u => (
                                <button className='flex flex-row w-full mt-4 gap-2 items-center hover:dark:bg-neutral-800 hover:bg-neutral-200 rounded-lg p-2 cursor-pointer' onClick={() => handleOpenChatUser(u.following_user_id)}>
                                    <img className='w-18 h-18 rounded-full' src={`${window.location.origin}/storage/${u.profile}`} alt="" />
                                    <div className='flex flex-col'>
                                        <p className='truncate text-start'>{u.name}</p>
                                        <p className='truncate text-sm text-muted-foreground text-start'>Start chatting with {u.name}</p>
                                    </div>
                                </button>
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

            <div className='fixed bottom-1 left-3.8 z-40 flex flex-row-reverse gap-2'>
                {users.map(u => (
                    <div className='hidden  dark:bg-neutral-900 bg-background rounded-lg border p-6 shadow-lg duration-200 min-h-[400px] min-w-[400px] flex flex-col' id={`chatContainer${u.following_user_id}`}>
                        <div className='flex justify-between items-center'>
                             <div className='flex flex-row gap-2 items-center'>
                                <img className='w-15 h-15 rounded-full' src={`${window.location.origin}/storage/${u.profile}`} alt="" />
                                <p>{u.name}</p>
                            </div>
                            <button className='cursor-pointer' onClick={() => handleCloseChatUser(u.following_user_id)}>
                                <X />
                            </button>
                        </div>
                        <hr className='mt-3' />

                        <div className='mt-auto flex flex-row gap-2 items-center'>
                            <div className='flex items-center'>
                                <button className='cursor-pointer' onClick={inputFileTrigger}><Images size={20} /></button>
                                <input id='inputFile' type="file" className='hidden' />
                            </div>
                            <Input className='dark:bg-neutral-800 bg-background' type="text" placeholder='Aa' />
                            <Button variant='outline' className='cursor-pointer'><Send /></Button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
