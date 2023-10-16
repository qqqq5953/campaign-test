import getImageUrl from "../helpers/getImageUrl";
import { useLocation } from 'react-router-dom';
import { useContext } from "react"
import { QuizContext } from '../context/QuizContext'

export default function Layout({ children }) {
    const { prev, isPlaying, setIsPlaying, audioRef, playAudio, pauseAudio } = useContext(QuizContext);
    const location = useLocation()
    const isShowWatermark = ['/init', '/quiz'].includes(location.pathname)

    function toggle() {
        if (isPlaying) {
            pauseAudio(audioRef).then(() => setIsPlaying(false))
        } else {
            playAudio(audioRef).then(() => setIsPlaying(true))
        }
    }

    return (
        <div className="fixed inset-x-0 top-0" style={{
            height: '100dvh',
        }}>
            <picture>
                <source media="(min-width: 1200px)" srcSet={getImageUrl('background', '1200-bg')} />
                <source media="(min-width: 768px)" srcSet={getImageUrl('background', '810-bg')} />
                <img src={getImageUrl('background', '375-bg')} alt="Image description" className="w-full h-full object-cover" />
            </picture>

            {isShowWatermark && <img src={getImageUrl('background', 'watermark', 'svg')} alt="watermark" className='absolute top-4 left-1/2 -translate-x-1/2 z-20' />}

            {<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-5 max-w-[400px] pb-10">
                {children}
            </div>}

            {isShowWatermark && <div className="absolute bottom-0 left-0 w-full flex justify-between p-4">
                <div className="rounded bg-white/80 px-2 py-1" onClick={prev}>上一頁</div>
                <div onClick={toggle} className={`rounded bg-white/80 px-2 py-1 ${isPlaying ? 'text-purple-800' : 'text-purple-800/50'}`}>音樂</div>
            </div>}
        </div>
    )
}
