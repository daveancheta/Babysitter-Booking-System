import { json } from 'stream/consumers';
import { Button } from './ui/button';
import { Expand, MessageCircle, MessageCircleMore, Minimize } from 'lucide-react';
import { useState } from 'react';
import { Label } from "@/components/ui/label"
import { cn } from '@/lib/utils';

export function FullscreenButton() {
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
        <div className='inline-flex gap-1 rounded-lg bg-neutral-100 p-1 dark:bg-neutral-800'>
            <button onClick={handleFullScreen} className={cn('flex items-center rounded-md px-3.5 py-1.5 transition-colors', fullscreenDisplay === "yes" ? 'bg-white shadow-xs dark:bg-neutral-700 dark:text-neutral-100' : '')}><Expand className="-ml-1 h-4 w-4"/><span className="ml-1.5 text-sm">Expand</span></button>
            <button onClick={handleCloseFullscreen} className={cn('flex items-center rounded-md px-3.5 py-1.5 transition-colors', fullscreenDisplay === "no" ? 'bg-white shadow-xs dark:bg-neutral-700 dark:text-neutral-100' : '')}><Minimize className="-ml-1 h-4 w-4"/><span className="ml-1.5 text-sm">Minimize</span></button>
        </div>
    );
}

