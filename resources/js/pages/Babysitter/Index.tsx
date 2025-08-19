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
import { CircleAlert, Megaphone } from 'lucide-react';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Finding a Babysitter',
        href: '/babysitter',
    },
];

interface PageProps extends InertiaPageProps {
    flash: {
        message?: string;
    }
}

export default function Index() {
    const { flash } = usePage<PageProps>().props;
    const { auth } = usePage<SharedData>().props;

    const { data, setData, post, processing, errors } = useForm({
        babysitter_id: '1',
        post: '',
    });

    const submitPost = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('babysitter.store'));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className='flex justify-center'>
                    <Dialog>
                        <form onSubmit={submitPost} action="">

                            <div className='bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 z-50 grid w-full max-w-[calc(100%-2rem)]  gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg'>


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
                                </DialogHeader>
                                <div className="grid gap-4">
                                    <div className="grid gap-3">
                                        <Input type='hidden' name="babysitter_id" placeholder='Tell parents about yourself…' onChange={(e) => setData('babysitter_id', e.target.value)} value={data.babysitter_id} />
                                        <Input type='text' name="post" placeholder='Tell parents about yourself…' onChange={(e) => setData('post', e.target.value)} value={data.post} />

                                    </div>

                                </div>
                                <DialogFooter>
                                    <Button disabled={processing} type='submit' className='cursor-pointer' >Save changes</Button>
                                </DialogFooter>
                            </div>
                        </form>
                    </Dialog>
                </div>
            </div>
        </AppLayout>
    );
}
