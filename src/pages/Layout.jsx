import getImageUrl from "../helpers/getImageUrl";
import { useEffect, useState } from "react"

const lg = window.matchMedia("(min-width: 1200px)")
const md = window.matchMedia("(min-width: 768px) and (max-width: 1199px)")
const sm = window.matchMedia("(max-width: 767px)")

export default function Layout({ children }) {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [lgSize, setLgSize] = useState(lg.matches)
    const [mdSize, setMdSize] = useState(md.matches)
    const [smSize, setSmSize] = useState(sm.matches)

    function handleLg(e) {
        if (e.matches) return
        if (sm.matches) setSmSize(true)
        if (md.matches) setMdSize(true)
    }

    function handleMd(e) {
        if (e.matches) return
        if (sm.matches) setSmSize(true)
        if (lg.matches) setLgSize(true)
    }

    function handleSm(e) {
        if (e.matches) return
        if (md.matches) setMdSize(true)
        if (lg.matches) setLgSize(true)
    }

    useEffect(() => {
        lg.addEventListener("change", handleLg)
        md.addEventListener("change", handleMd)
        sm.addEventListener("change", handleSm)

        return () => {
            lg.removeEventListener("change", handleLg)
            md.removeEventListener("change", handleMd)
            sm.removeEventListener("change", handleSm)
        }
    }, [])

    return (
        <div className="relative h-screen">
            {lgSize && <img src={getImageUrl('background', '1200-bg')} alt="Image description" className="w-full h-full object-cover hidden lg:block" onLoad={() => setImageLoaded(true)} />}
            {mdSize && <img src={getImageUrl('background', '810-bg')} alt="Image description" className="w-full h-full object-cover hidden md:block lg:hidden" onLoad={() => setImageLoaded(true)} />}
            {smSize && <img src={getImageUrl('background', '375-bg')} alt="Image description" className="w-full h-full object-cover md:hidden" onLoad={() => setImageLoaded(true)} />}

            {/* {lgSize && (!smSize || !mdSize) && <img src={getImageUrl('background', '1200-bg')} alt="Image description" className="w-full h-full object-cover hidden lg:block" onLoad={() => setImageLoaded(true)} />}
            {mdSize && (!lgSize || !smSize) && <img src={getImageUrl('background', '810-bg')} alt="Image description" className="w-full h-full object-cover hidden md:block lg:hidden" onLoad={() => setImageLoaded(true)} />}
            {smSize && (!lgSize || !mdSize) && <img src={getImageUrl('background', '375-bg')} alt="Image description" className="w-full h-full object-cover md:hidden" onLoad={() => setImageLoaded(true)} />} */}

            {imageLoaded && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-5 max-w-[400px]">
                {children}
            </div>}
        </div>
    )
}
