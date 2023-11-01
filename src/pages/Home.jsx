import { Link } from 'react-router-dom'
import getImageUrl from "../helpers/getImageUrl";
import Layout from './Layout';
import { useEffect } from 'react'

export default function Home() {
    useEffect(() => {
        localStorage.removeItem('userName')
    }, [])

    return (
        <Layout>
            <div className='absolute top-1/2 -translate-y-1/2 inset-x-0'>
                <div className='absolute top-20 right-10'>
                    <img src={getImageUrl('home', 'dialog', "webp")} alt="dialog" width="135" className='animate-bounce' />
                </div>
                <img src={getImageUrl('home', 'title', "webp")} alt="title" width="290" className='mx-auto pr-4' />
                <Link to="/init" state={{ prevPath: "/" }} className='block w-1/2 mx-auto my-4 lg:mb-24'>
                    <img src={getImageUrl('home', 'start-btn', "webp")} alt="start-btn" className='w-full transition ease-in-out delay-150 duration-300 hover:-translate-y-1 hover:scale-110' />
                </Link>
                <div className='w-3/5 mx-auto'>
                    <img src={getImageUrl('background', 'watermark')} alt="watermark" />
                </div>
            </div>
        </Layout>
    )
}
