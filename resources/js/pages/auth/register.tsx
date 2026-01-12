import { Form, Head, useForm } from '@inertiajs/react';
import { CircleAlert, LoaderCircle } from 'lucide-react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import Stepper, { Step } from '@/components/Stepper';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function Register() {
    const { data, setData, post, errors } = useForm({
        name: "",
        email: "",
        password: "",
        is_babysitter: "",
    })

    const handleRegisterUser = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('register'));
    }
    return (
        <div>
            <form onSubmit={handleRegisterUser} className='justify-center flex xl:min-h-[55vh] min-h-[90vh]'>
                <Stepper
                    initialStep={1}
                    onStepChange={(step) => {
                        console.log(step);
                    }}
                    onFinalStepCompleted={() => console.log("All steps completed!")}
                    backButtonText="Previous"
                    nextButtonText="Next"
                    renderStepIndicator={''}
                >
                    <Step>
                        <h2 className='font-bold text-2xl'>Welcome to SitterLy!</h2>
                        <p className='text-md text-muted-foreground'>Click Next to proceed to the next step.</p>
                    </Step>
                    <Step>
                        <h2 className='font-bold mb-4'>Step 1</h2>
                        <div className='mb-1 flex flex-col gap-2 w-full'>
                            <Label>Select your role:</Label>
                            <Select onValueChange={(value) => setData('is_babysitter', value)} value={data.is_babysitter}>
                                <SelectTrigger className="w-auto">
                                    <SelectValue className='text-black' placeholder="Select Role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="babysitter">Babysitter</SelectItem>
                                    <SelectItem value="parent">Parent</SelectItem>  
                                </SelectContent>
                            </Select>
                        </div>
                    </Step>
                    <Step>
                        <h2 className='font-bold mb-4'>Step 2</h2>
                        <div className='mb-1 flex flex-col gap-2'>
                            <Label>Enter your Name</Label>
                            <Input id="name"
                                type="text"
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="name"
                                onChange={(e) => setData('name', e.target.value)}
                                value={data.name}
                                placeholder="John Doe"
                            />
                        </div>
                    </Step>
                    <Step>
                        <h2 className='font-bol mb-4'>Step 3</h2>
                        <div className='mb-1 flex flex-col gap-2'>
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
                            <Label>Email</Label>
                            <Input id="email"
                                type="email"
                                required
                                tabIndex={2}
                                autoComplete="email"
                                onChange={(e) => setData('email', e.target.value)}
                                value={data.email}
                                placeholder="johndoe@gmail.com"
                                pattern='.+@gmail.com'
                            />
                        </div>
                        <div className='mb-1 flex flex-col gap-2 mt-4'>
                            <Label>Password</Label>
                            <Input id="password"
                                type="password"
                                required
                                tabIndex={3}
                                onChange={(e) => setData('password', e.target.value)}
                                name='password'
                                value={data.password}
                                placeholder="Password"
                            />
                        </div>

                        
                    </Step>
                </Stepper>
            </form>
        </div>
    );
}
