import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useState, useRef, useMemo, useEffect, useContext } from 'react'
import { QuizContext } from '../context/QuizContext'
import getImageUrl from "../helpers/getImageUrl";

export default function Result() {
    const location = useLocation();
    const navigate = useNavigate();
    const imageToShare = useRef(null)

    const [imageLoaded, setImageLoaded] = useState(false);
    const [turnOnLoader, setTurnOnLoader] = useState(false);
    const [isBgImgLoaded, setIsBgImgLoaded] = useState(false)
    const [backgroundImageSrc, setBackgroundImageSrc] = useState('');
    const [imageDataUrl, setImageDataUrl] = useState('');

    const userName = localStorage.getItem('userName')

    const isMobile = useMemo(() => {
        const userAgent = navigator.userAgent || navigator.platform;
        const isiOS13 = navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1
        if (/Android|iPad|iPhone/i.test(userAgent) || isiOS13) return true;
        return false;
    }, []);

    useEffect(() => {
        if (location.state != null) {
            const sm = window.matchMedia("(max-width: 767px)")
            const bgImageName = sm.matches ? '375-bg' : '1200-bg1'
            const imageUrl = getImageUrl('result-element', bgImageName, "webp");
            setBackgroundImageSrc(imageUrl);
        } else {
            navigate("/", { replace: true })
        }
    }, []);

    useEffect(() => {
        console.log('isBgImgLoaded', isBgImgLoaded);
        simulateCalculation()
    }, [isBgImgLoaded])

    if (location.state == null) return navigate("/", { replace: true })

    async function simulateCalculation() {
        setTurnOnLoader(true)
        return new Promise(resolve => {
            setTimeout(() => {
                setTurnOnLoader(false)
                resolve()
            }, 2000);
        })
    }

    useEffect(() => {
        const score = location.state.result
        const imageName = getRoleImage(score)
        generateImage(imageName)

        function generateImage(imageName) {
            const imageUrl = getImageUrl('result-element', imageName, "webp")
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            const img = new Image();

            img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                context.drawImage(img, 0, 0); // 將圖片繪製到畫布上
                context.font = 'bold 32px Taipei Sans TC Beta';
                context.fillStyle = 'white';
                const xAxisDistance = imageName !== "stone_download" ? 50 : 310
                const yAxisDistance = imageName !== "stone_download" ? 120 : 160
                context.fillText(userName.replace(/\"/g, ""), xAxisDistance, yAxisDistance); // 插入使用者姓名
                const dataURL = canvas.toDataURL(imageUrl); // 取得圖片的DataURL
                setImageDataUrl(dataURL); // 將DataURL存儲在狀態中
            };

            img.src = imageUrl;
        };
    }, [])

    return (
        <div className={`relative text-white min-h-screen ${turnOnLoader ? 'h-auto' : 'h-[2150px] lg:h-[2300px]'} `}>
            <img src={backgroundImageSrc} loading="eager" alt="Background-image" className="absolute w-full h-full object-cover" onLoad={() => setIsBgImgLoaded(true)} />

            <div className={`absolute top-0 left-1/2 -translate-x-1/2 sm:max-w-[400px] mx-auto max-w-[375px] w-full h-full lg:pt-20 ${isBgImgLoaded ? 'block' : 'hidden'}`} >
                {/* loader */}
                {(turnOnLoader || !imageLoaded) && <Loading imageLoaded={imageLoaded} />
                }

                {/* 結果圖 */}
                <img loading="eager" src={imageDataUrl} alt="result-img" className={turnOnLoader || !imageLoaded ? 'hidden' : 'block'} ref={imageToShare} onLoad={() => setImageLoaded(true)} />

                <div className={`mx-auto px-4 ${(turnOnLoader) ? 'hidden' : 'block'}`}>
                    <div>
                        <p className='py-3 text-center'>長按圖片進行下載</p>
                        <p className='text-center'>分享到社群邀請朋友測驗，尋找你的冒險夥伴！</p>
                        {isMobile ? <MobileBtn imageToShare={imageToShare} /> : <WebBtn />}
                        <Link to='/' replace={true} className='flex items-center justify-center border rounded-lg py-4 w-full'>
                            <img loading="lazy" src={getImageUrl('result-element', 'resume-icon', "webp")} alt="resume-icon" />
                            <span className='mx-2'>再測一次</span>
                        </Link>
                    </div>

                    <img loading="lazy" src={getImageUrl('result-element', 'divide', "webp")} alt="divide" className='my-16' />
                    <div className='text-center'>
                        <p className='py-1.5'>蓋亞資訊</p>
                        <p>雲端服務整合專家</p>
                        <p className='py-4 text-xl'>GAIA INFORMATION TECHNOLOGY</p>
                        <img loading="lazy" src={getImageUrl('result-element', 'gaia_logo_white', 'svg')} alt="gaia-logo" className='w-48 text-center inline-block pb-4' />
                        <div className='text-xl'>
                            <p>提供企業一站式雲端整合顧問服務</p>
                            <p>24hr 中英雙語線上維運服務，</p>
                            <p>快速解決客戶問題及需求。</p>
                        </div>
                    </div>
                    <a href="https://www.gaia.net/tc" target='blank' className='block text-center rounded-full bg-white/60
                    border-2 border-transparent
                    focus:outline-none  bg-white/60 w-full py-4 mt-6 text-black active:bg-purple-800 
                    active:text-white 
                    active:border-white/60'>立即登入GAIA 新世界</a>
                    <img loading="lazy" src={getImageUrl('result-element', 'divide', "webp")} alt="divide" className='my-16' />
                    <div className='text-center text-xl'>
                        <p className=''>攜手 GAIA</p>
                        <p>打造未來雲端趨勢</p>
                    </div>
                    <img loading="lazy" src={getImageUrl('result-element', 'clouds', "webp")} alt="clouds" className='my-16' />
                    <a href="https://www.gaia.net/tc/services/2/cloudcomputing" target='blank' className='block text-center rounded-full
                    border-2 border-transparent
                    focus:outline-none  bg-white/60 w-full py-4 mt-6 text-black active:bg-purple-800 
                    active:text-white 
                    active:border-white/60'>了解更多上雲資訊</a>
                </div>
            </div>
        </div >
    )
}

function Loading({ imageLoaded }) {
    return <div className={`rounded-xl h-full grid place-items-center ${imageLoaded ? 'block' : 'block'} `}>
        <div className='space-y-4'>
            <img src={getImageUrl('result-element', 'loader', 'webp')} alt="loader" className='w-20 h-20 block mx-auto animate-bounce' />
            <img src={getImageUrl('result-element', 'wood', 'webp')} alt="loader" className='w-20 block mx-auto' />
            <p className='text-center text-white pt-3'>正在收集結果...</p>
        </div>
    </div>
}


function MobileBtn({ imageToShare, role }) {
    async function shareFromAPI() {
        const imageUrl = imageToShare.current.src;
        const imageBlob = await fetch(imageUrl).then((response) => response.blob());
        const imageFile = new File([imageBlob], `${role}.webp`, { type: "image/webp" });

        // Check if the browser supports the Web Share API
        if (!navigator.canShare) return alert("您的瀏覽器不支援分享功能")

        // Check if sharing files is supported
        if (navigator.canShare({ files: [imageFile] })) {
            try {
                await navigator.share({ files: [imageFile] })
            } catch (error) {
                if (error.name === "AbortError") return
                alert(`Error: ${error.message}`)
            }
        } else {
            alert("您的瀏覽器不支援分享功能")
        }
    }

    return <div className='flex space-x-2 py-4'>
        <button className='flex items-center justify-center border rounded-lg py-4 w-full' onClick={shareFromAPI}>
            <img loading="lazy" src={getImageUrl('result-element', 'share-icon', "webp")} alt="share-icon" />
            <span className='mx-2'>分享至社群</span>
        </button>
    </div>
}

function WebBtn() {
    const fbShareLink = useMemo(() => encodeURI(window.location.origin + '/campaign-test'), [])

    return <div className='flex space-x-2 py-4'>
        <a href='https://www.instagram.com/create/story' className='flex items-center justify-center border rounded-lg py-1.5 w-1/2' target='blank'>
            <img loading="lazy" src={getImageUrl('result-element', 'ig', "webp")} alt="instagram" className='w-8 h-8' />
            <span className='mx-2'>Instagram</span>
        </a>

        <div className="fb-share-button border rounded-lg w-1/2 py-1.5" data-href={fbShareLink} data-layout="" data-size="">
            <a target="_blank" href={`https://www.facebook.com/sharer/sharer.php?u=${fbShareLink}`} className="fb-xfbml-parse-ignore flex items-center justify-center">
                <img loading="lazy" src={getImageUrl('result-element', 'fb', "webp")} alt="facebook" className='w-8 h-8' />
                <span className='mx-2'>Facebook</span>
            </a>
        </div>
    </div>
}

function getRoleImage(score) {
    let imageName = "knight"

    if (score >= 0 && score <= 5) {
        imageName = "stone"
    } else if (score >= 6 && score <= 10) {
        imageName = "knight"
    } else if (score >= 11 && score <= 15) {
        imageName = "wizard"
    } else if (score >= 16 && score <= 20) {
        imageName = "archer"
    } else if (score >= 21 && score <= 25) {
        imageName = "assassin"
    } else if (score >= 26 && score <= 30) {
        imageName = "trainer"
    }

    return imageName + "_download"
}
