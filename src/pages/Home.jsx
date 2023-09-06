import { Link } from 'react-router-dom'
import getImageUrl from "../helpers/getImageUrl";
import Layout from './Layout';
import { useState, useEffect } from "react";

const md = window.matchMedia("(min-width: 768px)")
const sm = window.matchMedia("(max-width: 767px)")

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

    // document.body.addEventListener('touchmove', function (e) {
    //     e.preventDefault(); //阻止默认的处理方式(阻止下拉滑动的效果)
    // }, { passive: false });

    return (
        <Layout>
            <img src={getImageUrl('home', 'dialog')} alt="dialog" width="180" className='animate-bounce' />
            {smSize && <img src={getImageUrl('home', 'title-sm')} alt="title" />}
            {mdSize && <img src={getImageUrl('home', 'title-md')} alt="title" />}

            <img src={getImageUrl('home', 'content')} alt="" className='mt-8 mb-16' />
            <Link to="/quiz">
                <img src={getImageUrl('home', 'start-btn')} alt="start-btn" className='w-1/2 mx-auto transition ease-in-out delay-150 duration-300 hover:-translate-y-1 hover:scale-110 ' />
            </Link>
        </Layout>
    )
}
