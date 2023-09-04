import { Link } from 'react-router-dom'

export default function Home() {
    function getImageUrl(dir, name) {
        return new URL(`/src/assets/${dir}/${name}.png`, import.meta.url).href
    }

    return (
        <div>test home: {process.env.NODE_ENV}</div>
        // <div className="relative h-screen">
        //     <img src={getImageUrl('background', '375-bg')} className="w-full h-full object-cover block md:hidden" />
        //     <img src={getImageUrl('background', '810-bg')} alt="campaign-bg" className="w-full h-full object-cover hidden md:block lg:hidden" />
        //     <img src={getImageUrl('background', '1200-bg')} alt="campaign-bg" className="w-full h-full object-cover hidden lg:block " />

        //     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-5 max-w-[400px]">
        //         <img src={getImageUrl('home', 'dialog')} alt="dialog" width="180" className='animate-bounce' />
        //         <img src={getImageUrl('home', 'title-sm')} alt="title" className='block md:hidden' />
        //         <img src={getImageUrl('home', 'title-md')} alt="title" className='hidden md:block' />

        //         <img src={getImageUrl('home', 'content')} alt="" className='mt-8 mb-16' />
        //         <Link to="/quiz">
        //             <img src={getImageUrl('home', 'start-btn')} alt="start-btn" className='w-1/2 mx-auto transition ease-in-out delay-150 duration-300 hover:-translate-y-1 hover:scale-110 ' />
        //         </Link>
        //     </div>
        // </div>
    )
}
