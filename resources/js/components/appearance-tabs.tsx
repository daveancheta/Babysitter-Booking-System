import { Appearance, useAppearance } from '@/hooks/use-appearance';
import { cn } from '@/lib/utils';
import { Expand, LucideIcon, Minimize, Monitor, Moon, Sun } from 'lucide-react';
import { HTMLAttributes, useState } from 'react';

export default function AppearanceToggleTab({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
    const { appearance, updateAppearance } = useAppearance();

    const tabs: { value: Appearance; icon: LucideIcon; label: string }[] = [
        { value: 'light', icon: Sun, label: 'Light' },
        { value: 'dark', icon: Moon, label: 'Dark' },
        { value: 'system', icon: Monitor, label: 'System' },
    ];

    const [fullscreenDisplay, setFullscreenDisplay] = useState(
            localStorage.getItem("isFullscreen") || ""
        )
        const handleFullScreen = () => {
            var elem = document.documentElement as any;
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            } else if (elem.webkitRequestFullscreen) {
                elem.webkitRequestFullscreen();
            } else if (elem.msRequestFullscreen) {
                elem.msRequestFullscreen();
            }
    
            localStorage.setItem("isFullscreen", "yes");
            setFullscreenDisplay("yes");
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
    
            localStorage.setItem("isFullscreen", "no");
            setFullscreenDisplay("no");
        }

    return (
        <div className='block-flex space-y-2 space-x-2'>
        <div className={cn('inline-flex gap-1 rounded-lg bg-neutral-100 p-1 dark:bg-neutral-800', className)} {...props}>
            {tabs.map(({ value, icon: Icon, label }) => (
                <button
                    key={value}
                    onClick={() => updateAppearance(value)}
                    className={cn(
                        'flex items-center rounded-md px-3.5 py-1.5 transition-colors',
                        appearance === value
                            ? 'bg-white shadow-xs dark:bg-neutral-700 dark:text-neutral-100'
                            : 'text-neutral-500 hover:bg-neutral-200/60 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-700/60',
                    )}
                >
                    <Icon className="-ml-1 h-4 w-4" />
                    <span className="ml-1.5 text-sm">{label}</span>
                </button>
            ))}
        </div>
         <div className='inline-flex gap-1 rounded-lg bg-neutral-100 p-1 dark:bg-neutral-800'>
                        <button onClick={handleFullScreen} className={cn('flex items-center rounded-md px-3.5 py-1.5 transition-colors', fullscreenDisplay === "yes" ? 'bg-white shadow-xs dark:bg-neutral-700 dark:text-neutral-100' : 'text-neutral-500 hover:bg-neutral-200/60 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-700/60')}><Expand className="-ml-1 h-4 w-4"/><span className="ml-1.5 text-sm">Expand</span></button>
                        <button onClick={handleCloseFullscreen} className={cn('flex items-center rounded-md px-3.5 py-1.5 transition-colors', fullscreenDisplay === "no" ? 'bg-white shadow-xs dark:bg-neutral-700 dark:text-neutral-100' : 'text-neutral-500 hover:bg-neutral-200/60 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-700/60')}><Minimize className="-ml-1 h-4 w-4"/><span className="ml-1.5 text-sm">Minimize</span></button>
                    </div>
        </div>
    );
}
