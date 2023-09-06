import { useLocation, useNavigate, useNavigationType, useBeforeUnload } from 'react-router-dom';
import { useState, useRef, useMemo, useEffect } from 'react'
import getImageUrl from "../helpers/getImageUrl";

export default function Result() {
    const location = useLocation();
    const navigate = useNavigate();



    const navigationType = useNavigationType()
    useEffect(() => {
        if (navigationType === "POP") {
            navigate("/", { replace: true })
        }
    }, [navigationType])

    // useBeforeUnload(() => {
    //     navigate("/", { replace: true })
    // });

    // useEffect(() => {
    //     if (location.state == null) {
    //         navigate("/", { replace: true })
    //     }
    // }, [])

    // if (location.state == null) return null
    const score = location.state.result

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })

    let role = 'knight'
    let extension = "svg"

    if (score >= 0 && score <= 5) {
        role = "knight"
    } else if (score >= 6 && score <= 10) {
        role = "wizard"
    } else if (score >= 11 && score <= 15) {
        role = "archer"
    } else if (score >= 16 && score <= 20) {
        role = "assassin"
    } else if (score >= 21 && score <= 30) {
        role = "trainer"
    }

    const imagePath = useMemo(() => {
        return getImageUrl('result-element', role, extension)
    }, [])

    const downloadImagePath = useMemo(() => {
        return getImageUrl('result-element', role + "_download", "png")
    }, [])

    // function shareToInsta() {
    //     window.open("https://www.instagram.com/create/story", "_self", "noreferrer")
    // }

    // facebook
    // const isLocal = window.location.protocol.includes('http')
    // const uri = isLocal ? "https://www.gaia.net/tc" : window.location.href
    // const resultPageUri = encodeURI(uri)

    // share api
    const imageToShare = useRef(null)
    async function shareFromAPI() {
        const imageUrl = imageToShare.current.src;
        const imageBlob = await fetch(imageUrl).then((response) => response.blob());
        const imageFile = new File([imageBlob], `${role}.png`, { type: "image/png" });

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

    const [isBgImgLoaded, setIsBgImgLoaded] = useState(false)
    const [backgroundImageSrc, setBackgroundImageSrc] = useState('');

    useEffect(() => {
        // Load the background image when the component mounts
        const backgroundImage = new Image();
        const imageUrl = getImageUrl('result-element', '375-bg');
        backgroundImage.onload = function () {
            setIsBgImgLoaded(true);
        };
        backgroundImage.src = imageUrl;
        setBackgroundImageSrc(imageUrl);
    }, []);

    const [imageLoaded, setImageLoaded] = useState(false);
    const [isDownload, setIsDownload] = useState(false)

    return (
        <div className='px-4 pt-8 pb-36' style={{
            backgroundImage: `url(${backgroundImageSrc})`,
            backgroundSize: "cover",
            backgroundPosition: "top center",
            backgroundRepeat: "repeat"
        }}>
            {isBgImgLoaded && <div className='mx-auto max-w-[400px]'>
                <img src={downloadImagePath} alt="result-img" className={`mx-auto ${isDownload ? 'block' : 'hidden'}`} ref={imageToShare} />
                <img src={imagePath} alt="result-img" className={`mx-auto ${isDownload ? 'hidden' : 'block'}`} onLoad={() => setImageLoaded(true)} />

                {imageLoaded && <>
                    {isDownload ?
                        <div className=' text-white'>
                            <p className='py-3 text-center'>長按圖片進行下載</p>
                            <p>分享到社群邀請朋友測驗，尋找你的冒險夥伴！</p>

                            <div className='flex space-x-2 py-4'>
                                {/* instagram */}
                                <button className='flex items-center justify-center border rounded-lg py-1.5 w-1/2' onClick={shareFromAPI}>
                                    <img src={getImageUrl('result-element', 'ig')} alt="instagram" className='w-8 h-8' />
                                    <span className='mx-2'>Instagram</span>
                                </button>

                                {/* facebook */}
                                <button className='flex items-center justify-center border rounded-lg py-1.5 w-1/2' onClick={shareFromAPI}>
                                    <img src={getImageUrl('result-element', 'fb')} alt="facebook" className='w-8 h-8' />
                                    <span className='mx-2'>Facebook</span>
                                </button>
                            </div>
                            {/* <div className='flex space-x-2 py-4'>
                                                    <a href='https://www.instagram.com/create/story' className='flex items-center justify-center border rounded-lg py-1.5 w-1/2' target='blank'>
                                                        <img src={getImageUrl('result-element', 'ig')} alt="instagram" className='w-8 h-8' />
                                                        <span className='mx-2'>Instagram</span>
                                                    </a>
                    
                                                    <div className="fb-share-button border rounded-lg w-1/2 py-1.5" data-href={resultPageUri} data-layout="" data-size="">
                                                        <a target="_blank" href={`https://www.facebook.com/sharer/sharer.php?u=${resultPageUri}`} className="fb-xfbml-parse-ignore flex items-center justify-center">
                                                            <img src={getImageUrl('result-element', 'fb')} alt="facebook" className='w-8 h-8' />
                                                            <span className='mx-2'>Facebook</span>
                                                        </a>
                                                    </div>
                                                </div> */}
                        </div> :
                        <button className='rounded-full bg-white w-full py-4 mt-6' onClick={() => setIsDownload(true)}>取得結果圖</button>
                    }
                    <img src={getImageUrl('result-element', 'divide')} alt="divide" className='my-16' />
                    <div className='text-center text-white'>
                        <p className='py-1.5'>蓋亞資訊</p>
                        <p>雲端服務整合專家</p>
                        <p className='py-4 text-xl'>GAIA INFORMATION TECHNOLOGY</p>
                        <img src={getImageUrl('result-element', 'gaia_logo_white', 'svg')} alt="gaia-logo" className='w-48 text-center inline-block pb-4' />
                        <div className='text-xl'>
                            <p>提供企業一站式雲端整合顧問服務</p>
                            <p>24hr 中英雙語線上維運服務，</p>
                            <p>快速解決客戶問題及需求。</p>
                        </div>
                    </div>
                    <a href="https://www.gaia.net/tc" target='blank' className='block text-center rounded-full bg-white w-full py-4 mt-6'>立即登入GAIA 新世界</a>
                    <img src={getImageUrl('result-element', 'divide')} alt="divide" className='my-16' />
                    <div className='text-center text-white text-xl'>
                        <p className=''>攜手 GAIA</p>
                        <p>打造未來雲端趨勢</p>
                    </div>
                    <img src={getImageUrl('result-element', 'clouds')} alt="clouds" className='my-16' />
                    <a href="https://www.gaia.net/tc/services/2/cloudcomputing" target='blank' className='block text-center rounded-full bg-white w-full py-4 mt-6'>了解更多上雲資訊</a>
                </>
                }
            </div>}
        </div >
    )
}
