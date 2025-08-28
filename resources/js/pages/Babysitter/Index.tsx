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
import { CircleAlert, Megaphone, History, Heart, MessageCircleMore, EllipsisVertical, Send } from 'lucide-react';
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
    name: string;
    post: string;
    reactCount: number;
    commentCount: number;
    created_at: string;
}

interface PageProps extends InertiaPageProps {
    flash: {
        message?: string;
    }
    posts: Posts[];
}

export default function Index() {
    const { posts, flash } = usePage<PageProps>().props;
    const { auth } = usePage<SharedData>().props;
    const [commentText, setCommentText] = useState('');

    const { data, setData, post, processing, errors } = useForm({
        babysitter_id: auth.user?.id,
        user_id: auth.user?.id,
        post: '',
        post_id: 0,
        react: 1,
        comment: '',
    });

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


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Find a Babysitter" />
            <div id='ajax' className="flex h-full flex-1 flex-col gap-6 rounded-xl p-4 overflow-x-auto">
                <div className='flex justify-start'>
                    <Dialog>
                        <div className='bg-background rounded-lg border p-6 shadow-lg duration-20 flex justify-between space-x-6'>
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
                            <div className='bg-background rounded-lg border p-6 shadow-lg duration-200 min-h-[200px] flex flex-col' key={p.id}>
                                <div className='flex justify-between'>

                                    <div className='flex flex-row gap-2 items-center'>
                                        <>
                                            <Avatar className="h-8 w-8 overflow-hidden rounded-full">
                                                <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                                                    {getInitials(p.name)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="grid flex-1 text-left text-sm leading-tight">
                                                <div className='flex flex-col'>
                                                    <span className="truncate font-medium">{p.name}</span>
                                                    <div className='flex flex-row mt-2 gap-1 items-center text-muted-foreground'>
                                                        <History className='w-3 h-3 ' />
                                                        <span className='text-xs'>{p.created_at}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    </div>

                                    <ContextMenu>
                                        <ContextMenuTrigger>
                                            <EllipsisVertical />
                                        </ContextMenuTrigger>
                                        <ContextMenuContent className="w-52">
                                            <ContextMenuItem inset>
                                                Back
                                                <ContextMenuShortcut>⌘[</ContextMenuShortcut>
                                            </ContextMenuItem>
                                            <ContextMenuItem inset disabled>
                                                Forward
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
                                </div>
                                <div className='text-start flex items-start justify-start mt-3'>
                                    <span>{p.post}</span>
                                </div>
                                <div className='mt-auto flex flex-row items-center gap-4 justify-end'>
                                    <form onSubmit={submitReact}>
                                        <input type="hidden" onChange={(e) => setData('user_id', parseInt(e.target.value))} value={data.user_id} />
                                        <input type="hidden" value={data.post_id} />
                                        <input type="hidden" onChange={(e) => setData('react', parseInt(e.target.value))} value={data.react} />
                                        <div className='flex flex-row items-center gap-1'>
                                            <button onClick={() => setData('post_id', p.id)} type='submit'>
                                                <Heart className='w-5 h-5 hover:text-red-700 dark:hover:text-red-400  transition delay-50 duration-300 cursor-pointer' />
                                            </button>
                                            <span className='text-sm'>{p.reactCount}</span></div>
                                    </form>


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
                                            </form>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

        </AppLayout >
    );
}
