import getImageUrl from "../helpers/getImageUrl";
import { useEffect, useState, useRef } from "react"

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

    const layout = useRef(null)

    useEffect(() => {
        lg.addEventListener("change", handleLg)
        md.addEventListener("change", handleMd)
        sm.addEventListener("change", handleSm)

        // layout.current.addEventListener('touchmove', function (e) {
        //     e.preventDefault(); //阻止默认的处理方式(阻止下拉滑动的效果)
        // }, { passive: false });

        return () => {
            lg.removeEventListener("change", handleLg)
            md.removeEventListener("change", handleMd)
            sm.removeEventListener("change", handleSm)
        }
    }, [])

    return (
        // fixed inset-x-0 top-0
        <div className="relative h-screen overscroll-none" ref={layout}>
            {lgSize && <img src={getImageUrl('background', '1200-bg')} alt="Image description" className="w-full h-full object-cover hidden lg:block" onLoad={() => setImageLoaded(true)} />}
            {mdSize && <img src={getImageUrl('background', '810-bg')} alt="Image description" className="w-full h-full object-cover hidden md:block lg:hidden" onLoad={() => setImageLoaded(true)} />}
            {smSize && <img src={getImageUrl('background', '375-bg')} alt="Image description" className="w-full h-full object-cover md:hidden" onLoad={() => setImageLoaded(true)} />}

            {imageLoaded && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-5 max-w-[400px] pb-10">
                {children}
            </div>}
        </div>
    )
}
