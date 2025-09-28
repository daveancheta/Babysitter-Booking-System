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
    const handleFullScreen = () => {
        var elem = document.documentElement as any;
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) { 
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { 
            elem.msRequestFullscreen();
        }
        
        document.getElementById('exitFullscreenButton')?.classList.remove("hidden")
        document.getElementById('fullscreenButton')?.classList.add("hidden")
    }

    const handleCloseFullscreen = () => {
        var elem = document as any;
        if (elem.exitFullscreen) {
            elem.exitFullscreen();
        } else if (elem.webkitExitFullscreen) { 
            elem.webkitExitFullscreen();
        } else if (elem.msExitFullscreen) { 
            elem.msExitFullscreen();
        }

        document.getElementById('exitFullscreenButton')?.classList.add("hidden")
        document.getElementById('fullscreenButton')?.classList.remove("hidden")
    }
    return (
        <div className='justify-center flex min-h-[50vh]'>
            <Head title='welcome' />
            <div className='absolute right-5 top-5' id='fullscreenButton'>
                <Button  onClick={handleFullScreen} variant='outline' className='cursor-pointer'>
                    <Expand />
                </Button>

                
            </div>

            <div className='hidden absolute right-5 top-5' id='exitFullscreenButton'>
                <Button onClick={handleCloseFullscreen} variant='outline' className='cursor-pointer'>
                    <Minimize />
                </Button>
            </div>

            <div className='mt-auto flex flex-row gap-5'>
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
