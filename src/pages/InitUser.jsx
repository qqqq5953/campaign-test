import Layout from './Layout';
import { useNavigate } from 'react-router-dom'
import useLocalStorage from '../hooks/useLocalStorage'


export default function InitUser() {
    const [userName, setUserName] = useLocalStorage('userName', '')

    const navigate = useNavigate();

    function next() {
        if (!userName) return
        setUserName(userName);

        navigate('/quiz')
    }

    // const handleDownload = (imageName) => {
    //     const canvas = document.createElement('canvas');
    //     const context = canvas.getContext('2d');
    //     const img = new Image();

    //     img.onload = () => {
    //         canvas.width = img.width;
    //         canvas.height = img.height;
    //         context.drawImage(img, 0, 0); // 將圖片繪製到畫布上
    //         context.font = '60px Arial';
    //         context.fillStyle = 'white';
    //         context.fillText(`姓名: ${userName}`, 100, 100); // 插入使用者姓名
    //         const dataURL = canvas.toDataURL('image/png'); // 取得圖片的DataURL

    //         const a = document.createElement('a');
    //         a.href = dataURL; // 使用圖片的DataURL
    //         a.download = 'result.png'; // 下載的文件名
    //         a.click(); // 模擬點擊連結
    //     };

    //     img.src = imageName;
    // };

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
                    />
                </div>
                {userName && <button className="absolute top-full w-60 px-4 py-2 bg-white/60 rounded-full text-zinc-700 text-center font-bold leading-tight focus:outline-none focus:bg-purple-800 focus:text-white transition ease-in-out duration-300 hover:bg-purple-800 hover:text-white" onClick={next}>
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
