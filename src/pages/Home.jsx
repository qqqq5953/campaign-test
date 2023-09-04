import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <div className="relative h-screen">
            <img src="../src/assets/background/375-bg.png" alt="campaign-bg" className="w-full h-full object-cover block md:hidden" />
            <img src="../src/assets/background/810-bg.png" alt="campaign-bg" className="w-full h-full object-cover hidden md:block lg:hidden" />
            <img src="../src/assets/background/1200-bg.png" alt="campaign-bg" className="w-full h-full object-cover hidden lg:block " />



            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-5 max-w-[400px]">
                <img src="../src/assets/home/dialog.png" alt="dialog" width="180" className='animate-bounce' />

                <img src="../src/assets/home/title-sm.png" alt="title" className='block md:hidden' />
                <img src="../src/assets/home/title-md.png" alt="title" className='hidden md:block' />

                <img src="../src/assets/home/content.png" alt="" className='mt-8 mb-16' />
                <Link to="/quiz">
                    <img src="../src/assets/home/start-btn.png" alt="start-btn" className='w-1/2 mx-auto transition ease-in-out delay-150 duration-300 hover:-translate-y-1 hover:scale-110 ' />
                </Link>
            </div>
        </div>
    )
}
