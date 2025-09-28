import { Button } from './ui/button';
import { Expand, MessageCircle, MessageCircleMore, Minimize } from 'lucide-react';

export function FullscreenButton() {
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
     <div>
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
     </div>
    );
}
