import getImageUrl from "../helpers/getImageUrl";
import { useLocation } from 'react-router-dom';
import { useContext } from "react"
import { QuizContext } from '../context/QuizContext'

export default function Layout({ children }) {
    const { prev, isPlaying, setIsPlaying, audioRef, playAudio, pauseAudio, isVisible } = useContext(QuizContext);
    const location = useLocation()
    const showWaterMarkAndButtons = ['/init', '/quiz'].includes(location.pathname)

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
            <img src={getImageUrl('background', '1200-bg', 'webp')} alt="Image description" className="w-full h-full object-cover" />

            {<div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-full max-w-[400px] flex flex-col items-center justify-between">
                {showWaterMarkAndButtons &&
                    <div className="py-5 w-3/5">
                        <img src={getImageUrl('background', 'watermark')} alt="watermark" />
                    </div>
                }
                {children}
                {showWaterMarkAndButtons && <div className="flex justify-between w-full px-4">
                    <button className="flex items-center group cursor-pointer" onClick={prev} disabled={!isVisible}>
                        <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" className="fill-white/60 group-active:fill-white">
                            <path d="M19.9486 3.83946C21.7632 4.7221 23.3502 5.92164 24.9475 7.29684C16.4856 10.0274 9.53744 14.7799 2.89105 20.1395C6.67811 23.1595 10.2878 26.2509 15.1586 27.5193C15.2069 27.4676 15.2552 27.4168 15.3035 27.3651C13.149 24.9799 10.9936 22.5937 8.77501 20.1369C11.6139 17.3461 14.8159 15.065 18.5584 13.2876C20.6664 15.0116 22.299 17.0791 24.0412 19.1914C23.4385 19.6495 22.8998 20.0586 22.507 20.3574C21.2097 19.2293 19.9867 18.1788 18.7803 17.111C18.0606 16.4738 18.0681 16.4522 17.1979 16.8458C15.5003 17.6147 14.1426 18.7626 12.8917 20.1852C13.2391 20.7199 13.5483 21.2762 13.9365 21.7799C15.6991 24.074 17.6994 26.1785 19.9022 28.1169C20.0563 28.253 20.2207 28.3787 20.4166 28.5388C20.2643 28.6611 20.1882 28.7464 20.0916 28.7972C18.0671 29.8658 15.9368 30.6813 13.6644 31.1799C13.1295 31.297 12.7292 31.2049 12.2983 30.9069C9.55787 29.0099 7.19165 26.7512 4.95638 24.3693C3.8615 23.2034 2.82884 21.9866 1.77295 20.7888C1.58072 20.5709 1.41542 20.3324 1.25012 20.1189C4.35554 15.2036 15.1586 5.79677 19.9486 3.83946Z" />
                            <path d="M38.7497 20.1662C36.9295 22.1416 35.2078 24.0938 33.3877 25.9641C30.545 28.8859 27.4796 31.595 24.0454 33.9191C22.9486 34.6614 21.7748 35.3047 20.6502 36.0116C20.1878 36.3027 19.7754 36.3526 19.3102 36.0185C17.9673 35.0558 16.6097 34.1112 15.2622 33.1545C15.1702 33.089 15.1108 32.9839 14.9882 32.8401C23.36 30.1466 30.2897 25.4044 36.8543 20.1258C35.1521 17.706 27.5696 13.0948 24.5292 12.6943C26.68 15.2243 28.905 17.5347 31.0911 20.0233C28.2791 22.8013 25.0753 25.0729 21.3114 26.8761C19.2201 25.1659 17.5912 23.088 15.8361 20.98C16.4072 20.5374 16.9421 20.1232 17.4399 19.7374C18.0649 20.273 18.6406 20.7415 19.1857 21.2392C19.9119 21.9031 20.627 22.5791 21.3226 23.2706C21.6216 23.5676 21.9188 23.6262 22.3107 23.4678C24.0797 22.7504 25.4857 21.6086 26.7227 20.2618C26.9446 20.0198 26.8815 19.7805 26.7246 19.5505C26.3457 18.9934 25.9863 18.4216 25.5637 17.8946C23.8244 15.7289 21.9113 13.7036 19.768 11.8711C19.6789 11.7953 19.6018 11.7075 19.5256 11.6317C19.5572 11.5637 19.5646 11.4965 19.6018 11.4759C21.7089 10.2987 23.9646 9.46601 26.3596 8.94417C26.8388 8.83998 27.1805 8.98378 27.5492 9.23523C29.6749 10.6862 31.5842 12.3611 33.3431 14.1746C34.9339 15.815 36.4374 17.5278 37.9743 19.2121C38.2102 19.4748 38.4172 19.7572 38.7497 20.1662Z" />
                        </svg>
                        <span className="shrink-0 text-white/70 group-active:text-white">上一頁</span>
                    </button>
                    <div onClick={toggle} className="w-20 h-20 -mr-4 cursor-pointer">
                        {isPlaying ?
                            <img src={getImageUrl('background', 'music-on')} alt="music-btn-on" className="object-cover" /> :
                            <img src={getImageUrl('background', 'music-off')} alt="music-btn-off" className="object-cover" />
                        }
                    </div>
                </div>}
            </div>}
        </div>
    )
}
