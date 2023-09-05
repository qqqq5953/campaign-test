import { Link } from 'react-router-dom'
import getImageUrl from "../helpers/getImageUrl";
import { useState, useEffect } from "react";
// import Layout from './Layout';

const md = window.matchMedia("(min-width: 768px)")
const sm = window.matchMedia("(min-width: 375px) and (max-width: 767px)")

export default function Home() {
    const [mdSize, setMdSize] = useState(md.matches)
    const [smSize, setSmSize] = useState(sm.matches)

    function handleMd(e) {
        if (e.matches) return
        if (sm.matches) setSmSize(true)
    }

    function handleSm(e) {
        if (e.matches) return
        if (md.matches) setMdSize(true)
    }

    useEffect(() => {
        md.addEventListener("change", handleMd)
        sm.addEventListener("change", handleSm)

        return () => {
            md.removeEventListener("change", handleMd)
            sm.removeEventListener("change", handleSm)
        }
    }, [])

    return (
        // <Layout>
        // <img src={getImageUrl('home', 'dialog')} alt="dialog" width="180" className='animate-bounce' />
        // {smSize && <img src={getImageUrl('home', 'title-sm')} alt="title" className='block md:hidden' />}
        // {mdSize && <img src={getImageUrl('home', 'title-md')} alt="title" className='hidden md:block' />}

        // <img src={getImageUrl('home', 'content')} alt="" className='mt-8 mb-16' />
        // <Link to="/quiz">
        //     <img src={getImageUrl('home', 'start-btn')} alt="start-btn" className='w-1/2 mx-auto transition ease-in-out delay-150 duration-300 hover:-translate-y-1 hover:scale-110 ' />
        // </Link>
        // </Layout>

        <div className="relative h-screen">
            {lgSize && <img src={getImageUrl('background', '1200-bg')} alt="Image description" className="w-full h-full object-cover hidden lg:block" onLoad={() => setImageLoaded(true)} />}
            {mdSize && <img src={getImageUrl('background', '810-bg')} alt="Image description" className="w-full h-full object-cover hidden md:block lg:hidden" onLoad={() => setImageLoaded(true)} />}
            {smSize && <img src={getImageUrl('background', '375-bg')} alt="Image description" className="w-full h-full object-cover md:hidden" onLoad={() => setImageLoaded(true)} />}

            {imageLoaded && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-5 max-w-[400px]">
                <img src={getImageUrl('home', 'dialog')} alt="dialog" width="180" className='animate-bounce' />
                {smSize && <img src={getImageUrl('home', 'title-sm')} alt="title" className='block md:hidden' />}
                {mdSize && <img src={getImageUrl('home', 'title-md')} alt="title" className='hidden md:block' />}

                <img src={getImageUrl('home', 'content')} alt="" className='mt-8 mb-16' />
                <Link to="/quiz">
                    <img src={getImageUrl('home', 'start-btn')} alt="start-btn" className='w-1/2 mx-auto transition ease-in-out delay-150 duration-300 hover:-translate-y-1 hover:scale-110 ' />
                </Link>
            </div>}
        </div>
    )
}
