import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import { Form, Head, Link } from '@inertiajs/react';
import { Expand, LoaderCircle, Lock, Minimize } from 'lucide-react';
import Stepper, { Step } from '@/components/Stepper';

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Welcome() {
    return (
        <div className='justify-center flex xl:min-h-[60vh] min-h-[70vh]'>
            <Head title='welcome' />

            <div className='mt-auto flex flex-row gap-5 grid gap-4 md:grid-cols-1 lg:grid-cols-2'>
                <Link href={route('login')}>
                    <div className='bg-background rounded-lg border p-6 min-w-[300px] hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:border-red-500 border'>
                        <h1 className='text-center font-bold text-2xl'>Welcome Back</h1>
                        <p className='text-muted-foreground mt-4 text-xs text-center'>Already have an account?</p><br />
                        <Button className='w-full cursor-pointer'>Login</Button>
                    </div>
                </Link>
                <Link href={route('register')}>
                    <div className='bg-background rounded-lg border p-6 min-w-[300px] hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:border-blue-500 border'>
                        <h1 className='text-center font-bold text-2xl'>Are you new Here?</h1>
                        <p className='text-muted-foreground mt-4 text-xs text-center'>Create an account today.</p><br />
                        <Button variant='outline' className='w-full cursor-pointer'>Register</Button>
                    </div>
                </Link>
            </div>
        </div>
    );
}
