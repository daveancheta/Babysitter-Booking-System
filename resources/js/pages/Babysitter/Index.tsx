import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
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
import { PageProps as InertiaPageProps } from '@inertiajs/core'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CircleAlert, Megaphone, History, Heart, MessageCircleMore, Send, UserPlus, BriefcaseBusiness, X, UserCheck, BookmarkCheck, NotebookPen, Pen, Trash, EyeOff, InboxIcon } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useInitials } from '@/hooks/use-initials';
import { useState, useEffect } from "react";
import { Textarea } from '@/components/ui/textarea';
import {
    ContextMenu,
    ContextMenuCheckboxItem,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuSeparator,
    ContextMenuShortcut,
    ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { useIsMobile } from '@/hooks/use-mobile';
import axios from "axios"

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Finding a Babysitter',
        href: '/babysitter',
    },
];


interface Posts {
    id: number;
    user_id: number;
    babysitter_id: number;
    name: string;
    post: string;
    reactCount: number;
    userCountSession: number;
    comment: string;
    commentCount: number;
    react_id: number;
    profile: string;
    created_at: string;
    followingCount: number;
    followerCountBS: number;
}

interface PageProps extends InertiaPageProps {
    flash: {
        message?: string;
    }
    useCountSession: [];
    posts: Posts[];
}

export default function Index() {
    const { posts, useCountSession, flash } = usePage<PageProps>().props;
    const { auth } = usePage<SharedData>().props;

    const { data, setData, post, put, processing, errors } = useForm({
        babysitter_id: auth.user?.id,
        user_id: auth.user?.id,
        post: '',
        post_id: 0,
        react: 1,
        comment: '',
        following_user_id: 0,
        follower_user_id: 0,
    });

    const editPost = (id: number) => {
        put(route('edit.post', { id }));
    }

    const { delete: destroy, processing: processingDelete } = useForm({});


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
        destroy(route('babysitter.delete', { id }));
    }
    const handleFollowValidation = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('follow.store'));
    }

    const handleUnfollowUser = (followingId: number, AuthId: number) => {
        destroy(route('follow.destroyByAuth', { followingId, AuthId }));
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
        setTimeout(() => {
            document.getElementById(`profileContainer${id}`)?.classList.remove("scale-0", "opacity-0")
            document.getElementById(`profileContainer${id}`)?.classList.add("scale-100", "opacity-100")
        }, 10)
    }

     const handleOnMouseOverProfile2 = (id: number) => {
        document.getElementById(`profileContainer${id}`)?.classList.remove("hidden")
        document.getElementById(`profileContainer${id}`)?.classList.remove("scale-0", "opacity-0")
    }

    const handleOnMouseOutProfile = (id: number) => {
         document.getElementById(`profileContainer${id}`)?.classList.add("scale-0", "opacity-0")
            document.getElementById(`profileContainer${id}`)?.classList.remove("scale-100", "opacity-100")
    }

    const closeOnMouseOverProfile = (id: number) => {
        document.getElementById(`profileContainer${id}`)?.classList.add("scale-0", "opacity-0")
            document.getElementById(`profileContainer${id}`)?.classList.remove("scale-100", "opacity-100")
         setTimeout(() => {
        document.getElementById(`profileContainer${id}`)?.classList.add("hidden");
        }, 300)
    }

    const isMobile = useIsMobile();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Find a Babysitter" />
            <div id='ajax' className="flex h-full flex-1 flex-col gap-6 rounded-xl p-4 overflow-x-auto">


                <div className='flex justify-start'>
                    <Dialog>
                        {isMobile ? <div className={auth.user.is_babysitter ? "w-full flex justify-center" : "hidden"}>
                            <DialogTrigger asChild>
                                <Button className='rounded-sm cursor-pointer p-5' variant="outline"><NotebookPen /> Tell parents about yourself…</Button>
                            </DialogTrigger>
                        </div> : <div className={auth.user.is_babysitter ? "w-full flex justify-start" : "hidden"}>
                            <DialogTrigger asChild>
                                <Button className='rounded-sm cursor-pointer p-5' variant="outline"><NotebookPen /> Tell parents about yourself…</Button>
                            </DialogTrigger>
                        </div>}

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

                {posts.length > 0 ?
                    <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-4">
                        {posts.map((p) => (
                            <ContextMenu key={p.id}>
                                <ContextMenuTrigger>
                                    <div className='dark:bg-neutral-900 bg-background rounded-lg border p-6 shadow-lg duration-200 min-h-[200px] flex flex-col' key={p.id}>
                                        <div className='flex justify-between'>

                                            <div className='flex flex-row gap-2 items-center'>
                                                <>
                                                    <Avatar className="h-12 w-12 overflow-hidden rounded-full">
                                                        {p.profile === null ? <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                                                            {getInitials(p.name)} </AvatarFallback> : <img className='rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white object-cover' src={`${window.location.origin}/storage/${p.profile}`} alt="" />}
                                                    </Avatar>
                                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                                        <div className='flex flex-col'>
                                                            {p.user_id === auth?.user.id ? <span className="truncate font-medium cursor-pointer hover:underline">{p.name}</span>
                                                                : <div className='relative w-full'>
                                                                    <span className="truncate font-medium cursor-pointer hover:underline" onMouseOver={() => handleOnMouseOverProfile(p.id)}>{p.name}</span>

                                                                    <div onMouseOver={() => handleOnMouseOverProfile2(p.id)} onMouseOut={() => handleOnMouseOutProfile(p.id)} id={`profileContainer${p.id}`} className='hidden min-w-[300px] absolute top-5 xl:-left-20.5 -left-18 flex items-center z-50 rounded-lg border shadow-lg dark:bg-neutral-900 bg-background transition-all transform ease-in-out duration-300 origin-top scale-0 opacity-0'>
                                                                        <button className='dark:bg-gray-800 bg-gray-200 absolute top-5 right-2 rounded-full p-1 cursor-pointer' onClick={() => closeOnMouseOverProfile(p.id)}>
                                                                            <X className='w-5 h-5' />
                                                                        </button>
                                                                        <div className='flex flex-col'>
                                                                            <div className='m-10 ml-5 mt-5 flex flex-row items-center gap-2 w-full'>
                                                                                <div className='mt-auto'>  <Avatar className="h-15 w-15 overflow-hidden rounded-full">
                                                                                    <Avatar className="h-15 w-15 overflow-hidden rounded-full">
                                                                                        {p.profile === null ? <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                                                                                            {getInitials(p.name)} </AvatarFallback> : <img className='rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white object-cover' src={`${window.location.origin}/storage/${p.profile}`} alt="" />}
                                                                                    </Avatar>
                                                                                </Avatar>
                                                                                </div>
                                                                                <div className='flex flex-col gap-2 items-start'>
                                                                                    <div className='whitespace-nowrap dark:text-white text-black font-bold text-sm truncate'>{p.name}</div>
                                                                                    <div className='whitespace-nowrap flex flex-row items-center text-muted-foreground'>
                                                                                        <BookmarkCheck className='h-3 w-3' />
                                                                                        &nbsp;
                                                                                        <span className='text-xs'>{p.followerCountBS}&nbsp;{p.followerCountBS > 1 ? 'Followers' : 'Follower'}</span>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className={auth?.user.is_babysitter ? 'hidden' : 'm-2 mr-auto space-x-2 flex flex-row'}>
                                                                                {p.followingCount > 0 ? <Button variant='outline' className='items-center cursor-pointer' onClick={() => handleUnfollowUser(p.babysitter_id, auth?.user.id)} disabled={processingDelete}><UserCheck />Following</Button> :
                                                                                    <form onSubmit={handleFollowValidation}>
                                                                                        <Button type='submit' onClick={() => {
                                                                                            setData('following_user_id', p.babysitter_id);
                                                                                            setData('follower_user_id', auth?.user.id);
                                                                                        }} variant='outline' className='items-center cursor-pointer' disabled={processing}><UserPlus />Follow</Button>
                                                                                    </form>
                                                                                }
                                                                                <Link href={route('parent.index')} className="items-center cursor-pointer h-9 px-4 py-2 has-[>svg]:px-3 border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"><BriefcaseBusiness />Hire</Link>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>}


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
                                                    <button disabled={processingDelete} onClick={() => handleDeleteReact(p.react_id, p.id)}>
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
                                                                                autoComplete='off'
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
                                        <button onClick={() => deletePost(p.id)} className='flex flex-row items-center gap-2'>
                                            <Trash size={15}/>Delete
                                        </button>
                                        <ContextMenuShortcut>⌘</ContextMenuShortcut>
                                    </ContextMenuItem>
                                    <Dialog>
                                        <form>
                                            <DialogTrigger asChild>
                                                <button className="relative items-center flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 pl-8 hover:bg-neutral-800 w-full gap-2"><Pen size={15}/>Edit</button>
                                            </DialogTrigger>
                                            <DialogContent className="sm:max-w-[425px]">
                                                <form onSubmit={() => editPost(p.id)}>
                                                    <DialogHeader>
                                                        <DialogTitle>Edit post</DialogTitle>
                                                        <DialogDescription>
                                                            Make changes to your post here. Click save when you&apos;re
                                                            done.
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <div className="grid gap-4">
                                                        <div className="grid gap-3 mt-4 mb-4">
                                                            <Textarea name="name" onChange={(e) => setData('post', e.target.value)} value={data.post} placeholder={p.post} />
                                                        </div>
                                                    </div>
                                                    <DialogFooter>
                                                        <DialogClose asChild>
                                                            <Button variant="outline" disabled={processing}>Cancel</Button>
                                                        </DialogClose>
                                                        <Button type="submit" disabled={!data.post.trim() || processing}>Save</Button>
                                                    </DialogFooter>
                                                </form>
                                            </DialogContent>
                                        </form>
                                    </Dialog>
                                    <ContextMenuSeparator/>
                                    <ContextMenuItem inset>
                                        <div className='flex flex-row gap-2 items-center'>
                                        <EyeOff size={15}/> Hide post</div>
                                        <ContextMenuShortcut>⌘R</ContextMenuShortcut>
                                    </ContextMenuItem>
                                </ContextMenuContent>
                            </ContextMenu>
                        ))}

                    </div>
                    : <div className='mt-5 text-center text-muted-foreground flex flex-col items-center'>
                        <div className='mb-5 animate-bounce'>
                        <InboxIcon size={80}/>
                        </div>
                        <span>No babysitter posts available right now — check back later</span>
                        </div>}
            </div>
        </AppLayout >
    );
}
