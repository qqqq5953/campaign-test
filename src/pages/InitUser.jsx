import Layout from './Layout';
import { useContext, useEffect } from "react"
import { QuizContext } from '../context/QuizContext'
import { useNavigate, useLocation } from 'react-router-dom'
import useLocalStorage from '../hooks/useLocalStorage'


export default function InitUser() {
    const [userName, setUserName] = useLocalStorage('userName', '')
    const { setIsPlaying, audioRef, playAudio } = useContext(QuizContext);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state?.prevPath !== '/') return
        playAudio(audioRef).then(() => setIsPlaying(true))
    }, [])

    function next() {
        if (!userName) return
        setUserName(userName);
        navigate('/quiz')
    }

    return (
        <Layout>
            <div className='relative flex flex-col items-center text-white leading-5 font-bold'>
                <div className='text-center space-y-0.5'>
                    <div>解專案就像破RPG，需要好隊友一起闖關，</div>
                    <div>對於自己在團隊的定位感到疑惑？</div>
                    <div>如何找到合適的夥伴來幫助團隊呢？</div>
                    <div>一起尋找自己屬於哪種類型的工程師吧！</div>
                </div>
                <div className='pt-12 pb-5'>
                    <label htmlFor="name" className='block text-center pb-2'>請問你叫什麼名字呢</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="輸入你的名字"
                        onChange={(e) => setUserName(e.target.value)}
                        value={userName}
                        autoComplete="false"
                        autoFocus={true}
                        className='block bg-transparent border-b-2 pb-2 text-lg text-white/70 text-center placeholder:text-white/70 focus:outline-none 
                        focus:border-b-2
                        focus:border-white/50'
                        maxLength="12"
                    />
                </div>
                {userName && <button className="absolute top-full w-60 px-4 py-2  rounded-full text-zinc-700 text-center font-bold leading-tight 
                bg-white/60
                border-2 border-transparent
                focus:outline-none 
                focus:bg-purple-800 
                focus:text-white 
                hover:bg-purple-800 hover:text-white    hover:border-white/60
                transition-all ease-in-out duration-300 
                " onClick={next}>
                    準備好了！
                </button>}
            </div>

            {/* <div>
                <input type="text" placeholder="輸入你的姓名" onChange={handleNameChange} value={userName} />
                <button className='border text-white' onClick={() => handleDownload('/src/assets/result-element/archer_download.png')}>下載圖片</button>
            </div> */}
        </Layout >
    )
}
