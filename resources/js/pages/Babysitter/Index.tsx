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
import { CircleAlert, Megaphone, History, Heart, MessageCircleMore, EllipsisVertical, Send, Plus, UserPlus, BriefcaseBusiness, X } from 'lucide-react';
import { UserDisplay } from '@/components/user-display';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useInitials } from '@/hooks/use-initials';
import moment from 'moment';
import { useState, useEffect, use } from "react";
import { parse } from 'path';
import { Textarea } from '@/components/ui/textarea';
import {
    ContextMenu,
    ContextMenuCheckboxItem,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuLabel,
    ContextMenuRadioGroup,
    ContextMenuRadioItem,
    ContextMenuSeparator,
    ContextMenuShortcut,
    ContextMenuSub,
    ContextMenuSubContent,
    ContextMenuSubTrigger,
    ContextMenuTrigger,
} from "@/components/ui/context-menu"

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Finding a Babysitter',
        href: '/babysitter',
    },
];


interface Posts {
    id: number;
    user_id: number;
    name: string;
    post: string;
    reactCount: number;
    userCountSession: number;
    comment: string;
    commentCount: number;
    react_id: number;
    profile: string;
    created_at: string;
}

interface PageProps extends InertiaPageProps {
    flash: {
        message?: string;
    }
    posts: Posts[];
    useCountSession: [];
}

export default function Index() {
    const { posts, useCountSession, flash } = usePage<PageProps>().props;
    const { auth } = usePage<SharedData>().props;
    const [commentText, setCommentText] = useState('');
    const userId = auth.user.id;

    const { data, setData, post, processing, errors } = useForm({
        babysitter_id: auth.user?.id,
        user_id: auth.user?.id,
        post: '',
        post_id: 0,
        react: 1,
        comment: '',
    });

    const { delete: destroy, processing: processingDeleteReact } = useForm({});

    const { delete: destroyPost, processing: processingDeletePost } = useForm({})

    const submitPost = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('babysitter.store'));

        data.post = '';
    }

    const submitReact = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('react.store'));
    }

    const submitComment = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('comment.store'))
        data.comment = '';
    }

    const handleDeleteReact = (id: number, postId: number) => {
        destroy(route('react.delete', { id, postId }));
    }
    const deletePost = (id: number) => {
        destroyPost(route('babysitter.delete', { id }));
    }


    const getInitials = useInitials();

    useEffect(() => {
        let postInput = document.getElementById('postInput') as HTMLInputElement;

        if (postInput) {
            postInput.addEventListener('input', () => {
                let lengthContainer = document.getElementById("lengthContainer") as HTMLDivElement;
                let postValue = postInput.value;
                let postLength = postValue.length;
                lengthContainer.textContent = `${postLength}`;
            });
        }
    });

    const handleOnMouseOverProfile = (id: number) => {
        document.getElementById(`profileContainer${id}`)?.classList.remove("hidden")
        setInterval(handleOnMouseOutProfile, 2000)

    }

    const handleOnMouseOutProfile = (id: number) => {
        document.getElementById(`profileContainer${id}`)?.classList.add("hidden")
    }


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Find a Babysitter" />
            <div id='ajax' className="flex h-full flex-1 flex-col gap-6 rounded-xl p-4 overflow-x-auto">


                <div className='flex justify-start'>
                    <Dialog>
                        <div className={auth.user.is_babysitter ? "bg-background rounded-lg border p-6 shadow-lg duration-20 flex justify-between space-x-6" : "hidden"}>
                            <UserDisplay />
                            <DialogTrigger asChild>
                                <Button className='rounded-full flex justify-start p-5' variant="outline">Tell parents about yourself…</Button>
                            </DialogTrigger>
                        </div>
                        <DialogContent className="sm:max-w-[425px]">
                            <form onSubmit={submitPost} action="">
                                <DialogHeader>
                                    <DialogTitle>Create a Post </DialogTitle>
                                    <DialogDescription>
                                        {auth.user?.name}, tell parents about yourself so they can hire you.
                                    </DialogDescription>
                                    {flash.message && <Alert>
                                        <Megaphone />
                                        <AlertTitle>Notification!</AlertTitle>
                                        <AlertDescription>
                                            {flash.message}
                                        </AlertDescription>
                                    </Alert>}
                                    <div className='mb-4'>
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
                                    </div>
                                </DialogHeader>
                                <div className="grid gap-4">
                                    <div className="grid gap-3 mb-4">
                                        <Input type='hidden' name="babysitter_id" placeholder='Tell parents about yourself…' onChange={(e) => setData('babysitter_id', parseInt(e.target.value))} value={data.babysitter_id} />

                                        <Textarea id='postInput' name="post" placeholder='Tell parents about yourself…' onChange={(e) => setData('post', e.target.value)} value={data.post} autoComplete='post' maxLength={500} />

                                        <div><span id='lengthContainer'>0</span>/500</div>

                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button disabled={!data.post.trim()} type='submit' className='cursor-pointer' id='postButton' >Post</Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                {posts.length > 0 && (
                    <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
                        {posts.map((p) => (
                            <ContextMenu key={p.id}>
                                <ContextMenuTrigger>
                                    <div className='bg-background rounded-lg border p-6 shadow-lg duration-200 min-h-[200px] flex flex-col' key={p.id}>
                                        <div className='flex justify-between'>

                                            <div className='flex flex-row gap-2 items-center'>
                                                <>
                                                    <Avatar className="h-12 w-12 overflow-hidden rounded-full">
                                                        {p.profile === null ? <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                                                            {getInitials(p.name)} </AvatarFallback> : <img className='rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white object-cover' src={`${window.location.origin}/storage/${p.profile}`} alt="" />}

                                                    </Avatar>
                                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                                        <div className='flex flex-col'>
                                                            <div className='relative w-full'>
                                                                <span className="truncate font-medium cursor-pointer hover:underline" onMouseOver={() => handleOnMouseOverProfile(p.id)}>{p.name}</span>

                                                                <div onMouseOver={() => handleOnMouseOverProfile(p.id)} onMouseOut={() => handleOnMouseOutProfile(p.id)} id={`profileContainer${p.id}`} className='hidden min-w-[300px] absolute top-5 left-0 flex items-center z-50 rounded-lg border shadow-lg dark:bg-black bg-white'>
                                                                        <div className='bg-gray-800 absolute top-5 right-2 rounded-full p-1'>
                                                                             <X className='w-5 h-5'/>
                                                                        </div>
                                                                    <div className='flex flex-col'>
                                                                        <div className='m-10 ml-5 mt-5 flex flex-row items-center gap-2 w-full'>
                                                                            <div className='mt-auto'>  <Avatar className="h-15 w-15 overflow-hidden rounded-full">
                                                                                <Avatar className="h-15 w-15 overflow-hidden rounded-full">
                                                                                    {p.profile === null ? <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                                                                                        {getInitials(p.name)} </AvatarFallback> : <img className='rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white object-cover' src={`${window.location.origin}/storage/${p.profile}`} alt="" />}
                                                                                </Avatar>
                                                                            </Avatar>
                                                                            
                                                                           
                                                                            </div>
                                                                         
                                                                            <div className='whitespace-nowrap dark:text-white text-black'>{p.name}</div>
                                                                        </div>
                                                                        <div className='m-2 mr-auto space-x-2'>
                                                                            <Button variant='outline' className='items-center cursor-pointer'><UserPlus />Follow</Button>
                                                                            <Button variant='outline' className='items-center cursor-pointer'><BriefcaseBusiness />Hire</Button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className='flex flex-row mt-2 gap-1 items-center text-muted-foreground'>
                                                                <History className='w-3 h-3 ' />
                                                                <span className='text-xs'>{p.created_at}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            </div>
                                        </div>
                                        <div className='text-start flex items-start justify-start mt-3'>
                                            <span>{p.post}</span>

                                        </div>
                                        <div className='mt-auto flex flex-row items-center gap-4 justify-end'>
                                            {p.userCountSession ?
                                                <div className='flex flex-row items-center gap-1'>
                                                    <span>{useCountSession}</span>
                                                    <button disabled={processingDeleteReact} onClick={() => handleDeleteReact(p.react_id, p.id)}>
                                                        <Heart className='w-5 h-5 text-red-400 fill-red-400  transition delay-50 duration-300 cursor-pointer' />
                                                    </button>
                                                    <span className='text-sm'>{p.reactCount}</span>
                                                </div>
                                                :
                                                <form onSubmit={submitReact}>
                                                    <input type="hidden" onChange={(e) => setData('user_id', parseInt(e.target.value))} value={data.user_id} />
                                                    <input type="hidden" value={data.post_id} />
                                                    <input type="hidden" onChange={(e) => setData('react', parseInt(e.target.value))} value={data.react} />
                                                    <div className='flex flex-row items-center gap-1'>
                                                        <span>{useCountSession}</span>
                                                        <button disabled={processing} onClick={() => setData('post_id', p.id)}>
                                                            <Heart className='w-5 h-5 hover:text-red-400  transition delay-50 duration-300 cursor-pointer' />
                                                        </button>
                                                        <span className='text-sm'>{p.reactCount}</span>
                                                    </div>
                                                </form>
                                            }

                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <div className='flex flex-row items-center gap-2'>
                                                        <button onClick={() => setData('post_id', p.id)}>
                                                            <MessageCircleMore className='w-5 h-5 hover:text-blue-700 dark:hover:text-blue-400 transition delay-50 duration-300 cursor-pointer' /></button>
                                                        <span className='text-sm'>{p.commentCount}</span>
                                                    </div>
                                                </DialogTrigger>
                                                <DialogContent className="sm:max-w-[600px]">
                                                    <form onSubmit={submitComment}>
                                                        <DialogHeader>
                                                            <DialogTitle className='mb-2'>Comment something...</DialogTitle>
                                                        </DialogHeader>

                                                        <div className="grid gap-4">
                                                            <div className="grid gap-3 ">
                                                                <div className='flex justify-between space-x-2'>
                                                                    <div className='flex flex-col w-full gap-4'>
                                                                        <div className="comments-section mt-10">
                                                                            {p.comment && p.comment.split(" || ").map((c) => (
                                                                                <div className='mb-10'>
                                                                                    <span className='border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90 p-3 rounded-md'>{c}</span>
                                                                                </div>
                                                                            ))
                                                                            }
                                                                        </div>
                                                                        <div className='flex flex-row gap-2'>
                                                                            <input type="hidden" onChange={(e) => setData('post_id', parseInt(e.target.value))} value={data.post_id} />
                                                                            <input type="hidden" onChange={(e) => setData('user_id', parseInt(e.target.value))} value={data.user_id} />
                                                                            <Input
                                                                                id='inputComment'
                                                                                placeholder='Comment something…'
                                                                                onChange={(e) => setData('comment', e.target.value)}
                                                                                value={data.comment}
                                                                            />
                                                                            <Button
                                                                                className=''
                                                                                id='commentButton'
                                                                                type="submit"
                                                                                hidden={!data.comment.trim()}
                                                                                disabled={processing}>
                                                                                <Send />
                                                                            </Button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </DialogContent>
                                            </Dialog>
                                        </div>
                                    </div>
                                </ContextMenuTrigger>
                                <ContextMenuContent className={p.user_id === auth.user.id ? 'w-52' : 'hidden'}>
                                    <ContextMenuItem inset>
                                        <button onClick={() => deletePost(p.id)}>
                                            Delete
                                        </button>
                                        <ContextMenuShortcut>⌘[</ContextMenuShortcut>
                                    </ContextMenuItem>
                                    <ContextMenuItem inset disabled>
                                        Edit
                                        <ContextMenuShortcut>⌘]</ContextMenuShortcut>
                                    </ContextMenuItem>
                                    <ContextMenuItem inset>
                                        Reload
                                        <ContextMenuShortcut>⌘R</ContextMenuShortcut>
                                    </ContextMenuItem>
                                    <ContextMenuSub>
                                        <ContextMenuSubTrigger inset>More Tools</ContextMenuSubTrigger>
                                        <ContextMenuSubContent className="w-44">
                                            <ContextMenuItem>Save Page...</ContextMenuItem>
                                            <ContextMenuItem>Create Shortcut...</ContextMenuItem>
                                            <ContextMenuItem>Name Window...</ContextMenuItem>
                                            <ContextMenuSeparator />
                                            <ContextMenuItem>Developer Tools</ContextMenuItem>
                                            <ContextMenuSeparator />
                                            <ContextMenuItem>Delete</ContextMenuItem>
                                        </ContextMenuSubContent>
                                    </ContextMenuSub>
                                    <ContextMenuSeparator />
                                    <ContextMenuCheckboxItem checked>
                                        Show Bookmarks
                                    </ContextMenuCheckboxItem>
                                    <ContextMenuCheckboxItem>Show Full URLs</ContextMenuCheckboxItem>
                                    <ContextMenuSeparator />
                                    <ContextMenuRadioGroup value="pedro">
                                        <ContextMenuLabel inset>People</ContextMenuLabel>
                                        <ContextMenuRadioItem value="pedro">
                                            Pedro Duarte
                                        </ContextMenuRadioItem>
                                        <ContextMenuRadioItem value="colm">Colm Tuite</ContextMenuRadioItem>
                                    </ContextMenuRadioGroup>
                                </ContextMenuContent>
                            </ContextMenu>
                        ))}
                    </div>
                )}
            </div>

        </AppLayout >
    );
}
