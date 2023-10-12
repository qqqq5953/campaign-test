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
            <img src={getImageUrl('home', 'dialog')} alt="dialog" width="180" className='animate-bounce' />
            <img src={getImageUrl('home', 'title')} alt="title" />
            <img src={getImageUrl('home', 'content')} alt="" className='mt-8 mb-16' />
            <Link to="/init">
                <img src={getImageUrl('home', 'start-btn')} alt="start-btn" className='w-1/2 mx-auto transition ease-in-out delay-150 duration-300 hover:-translate-y-1 hover:scale-110 ' />
            </Link>
        </Layout>
    )
}
