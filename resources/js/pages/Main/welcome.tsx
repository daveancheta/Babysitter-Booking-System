import { Button } from '@/components/ui/button';
import { Head, Link } from '@inertiajs/react';

export default function Welcome() {
    return (
        <div className='justify-center flex xl:min-h-[60vh] min-h-[70vh]'>
            <Head title='welcome' />

            <div className='mt-auto flex-row gap-5 grid md:grid-cols-1 lg:grid-cols-2'>
                <Link href={route('login')}>
                    <div className='bg-background rounded-lg border p-6 min-w-[300px] hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:border-red-500'>
                        <h1 className='text-center font-bold text-2xl'>Welcome Back</h1>
                        <p className='text-muted-foreground mt-4 text-xs text-center'>Already have an account?</p><br />
                        <Button className='w-full cursor-pointer'>Login</Button>
                    </div>
                </Link>
                <Link href={route('register')}>
                    <div className='bg-background rounded-lg p-6 min-w-[300px] hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:border-blue-500 border'>
                        <h1 className='text-center font-bold text-2xl'>Are you new Here?</h1>
                        <p className='text-muted-foreground mt-4 text-xs text-center'>Create an account today.</p><br />
                        <Button variant='outline' className='w-full cursor-pointer'>Register</Button>
                    </div>
                </Link>
            </div>
        </div>
    );
}
