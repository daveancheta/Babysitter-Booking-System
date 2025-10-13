import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { SharedData, type BreadcrumbItem as BreadcrumbItemType } from '@/types';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Fragment, useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Divide, Images, MessageCircle, MessageCircleMore, Search, Send, X } from 'lucide-react';
import { Input } from './ui/input';
import { useIsMobile } from '@/hooks/use-mobile';
import axios from 'axios';
import { cn } from '@/lib/utils';

interface User {
    id: number;
    name: string;
    profile: string;
    following_user_id: number;
}

interface Chat {
    id: number;
    chat_id: number;
    receiver_id: number;
    sender_id: number;
    message: string;
}

export function Breadcrumbs({ breadcrumbs }: { breadcrumbs: BreadcrumbItemType[] }) {
    const { auth } = usePage<SharedData>().props;

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
            axios.get(route("get.message"), {})
                .then(response => {
                    setUsers(response.data);
                })
        }

        fetchMessage()
        const interval = setInterval(fetchMessage, 1000);
        return () => clearInterval(interval)

    }, []);

    const [chats, setChats] = useState<Chat[]>([])

    useEffect(() => {
        const fetchChat = () => {
            axios.get(route("get.chat"), {})
            .then(response => {
                setChats(response.data);
            })
        }

        fetchChat()
        const interval = setInterval(fetchChat, 1000);
        return () => clearInterval(interval);
    });

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

    const [message, setMessage] = useState("");
    const [sender_id, setSenderId] = useState(0);
    const [receiver_id, setReceiverId] = useState(0);
    const [chat_id, setChatId] = useState(0);


    const handleSendChat = () => {
        axios.post(route('send.message'), {
            chat_id: chat_id,
            message: message,
            sender_id: sender_id,
            receiver_id: receiver_id
        })

        setMessage("")
    }

    const handleSendEmoji = () => {
        axios.post(route('send.message'), {
            chat_id: chat_id,
            message: '😀',
            sender_id: sender_id,
            receiver_id: receiver_id
        })
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
