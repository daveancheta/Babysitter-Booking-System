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
import { CircleAlert, Megaphone, History } from 'lucide-react';
import { UserDisplay } from '@/components/user-display';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useInitials } from '@/hooks/use-initials';
import  moment from 'moment';

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

    const { data, setData, post, processing, errors } = useForm({
        babysitter_id: auth.user?.id,
        post: '',
    });

    const submitPost = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('babysitter.store'));
    }
    const getInitials = useInitials();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className='flex justify-start'>
                    <Dialog>
                        <div className='bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 z-50 grid w-full max-w-[calc(100%-2rem)]  gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg'>
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
                                        <Input type='hidden' name="babysitter_id" placeholder='Tell parents about yourself…' onChange={(e) => setData('babysitter_id', parseInt(e.target.value))} value={data.post} />

                                        <Input type='text' name="post" placeholder='Tell parents about yourself…' onChange={(e) => setData('post', e.target.value)} value={data.post} autoComplete='post' />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button disabled={processing} type='submit' className='cursor-pointer'>Post</Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
                {posts.length > 0 && (
                    <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3  md:grid-cols-1 gap-4">
                        {posts.map((p) => (
                            <div className='bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 z-50 grid w-full max-w-[calc(100%-2rem)]  gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg'>
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
                                                <div className='flex flex-row mt-2 gap-1 items-center'> 
                                                    <History className='w-3 h-3'/>
                                                    <span className='text-xs'>{moment(p.created_at).fromNow()}</span>
                                                  
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

        </AppLayout>
    );
}
