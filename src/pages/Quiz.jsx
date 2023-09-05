import { useNavigate } from 'react-router-dom'
import { useState } from "react"
import data from "../data.json"
import getImageUrl from "../helpers/getImageUrl";
// import Layout from './Layout';

export default function Quiz() {
    const [isLoading, setIsLoading] = useState(false)

    return (
        <div className="relative h-screen">
            {lgSize && <img src={getImageUrl('background', '1200-bg')} alt="Image description" className="w-full h-full object-cover hidden lg:block" onLoad={() => setImageLoaded(true)} />}
            {mdSize && <img src={getImageUrl('background', '810-bg')} alt="Image description" className="w-full h-full object-cover hidden md:block lg:hidden" onLoad={() => setImageLoaded(true)} />}
            {smSize && <img src={getImageUrl('background', '375-bg')} alt="Image description" className="w-full h-full object-cover md:hidden" onLoad={() => setImageLoaded(true)} />}

            {imageLoaded && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-5 max-w-[400px]">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[500px] md px-5">
                    {isLoading ? <Loading /> : <Questions setIsLoading={setIsLoading} />}
                </div>
            </div>}
        </div>
        // <Layout>
        //     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[500px] md px-5">
        //         {isLoading ? <Loading /> : <Questions setIsLoading={setIsLoading} />}
        //     </div>
        // </Layout>
    )
}

let sum = 0

function Questions({ setIsLoading }) {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [questionIndex, setQuestionIndex] = useState(0)
    const currentQuestion = data[questionIndex]
    const navigate = useNavigate();

    async function simulateCalculation() {
        setIsLoading(true)
        return new Promise(resolve => {
            setTimeout(() => {
                setIsLoading(false)
                resolve()
            }, 1000);
        })
    }

    async function next(id, weight) {
        sum += weight

        if (id <= 9) {
            setQuestionIndex(q => q + 1)
        } else {
            await simulateCalculation()
            navigate("/result", { state: { result: sum } })
            return
        }
    }

    return <>
        <img src={getImageUrl('quiz', 'poster')} alt="poster" onLoad={() => setImageLoaded(true)} className={imageLoaded ? 'block' : 'hidden'} />
        {imageLoaded && <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 h-full w-2/3">
            <div className="relative h-full mx-6 text-sm md:text-base">
                {/* 題目 */}
                <div className="absolute top-12 md:top-[16%] w-full py-1">
                    <img
                        src={getImageUrl('quiz', currentQuestion.label)}
                        alt="label" className="block h-8" />
                    <p className="mt-0.5">{currentQuestion.question}</p>
                </div>

                {/* 選項 */}
                <div className="absolute bottom-16 md:top-1/2 md:-translate-y-1/3 md: w-full space-y-2 md:space-y-3">
                    {currentQuestion.answers.map(answer =>
                        <button className="rounded-full py-2.5 w-full bg-white" key={answer.weight} onClick={() => next(currentQuestion.id, answer.weight)}>{answer.content}</button>
                    )}
                </div>
            </div>
        </div>}
    </>
}

function Loading() {
    const [loaderLoaded, setLoaderLoaded] = useState(false);
    const [woodLoaded, setWoodLoaded] = useState(false);

    return <div className='bg-white/40 rounded-xl pt-16 pb-12 mx-5 space-y-5'>
        <img src={getImageUrl('result-element', 'loader')} alt="loader" className='w-20 h-20 block mx-auto animate-bounce' onLoad={() => setLoaderLoaded(true)} />
        <img src={getImageUrl('result-element', 'wood')} alt="loader" className='w-20 block mx-auto' onLoad={() => setWoodLoaded(true)} />
        {loaderLoaded && woodLoaded && <p className='text-center text-slate-800 pt-3'>正在收集結果...</p>}
    </div>
}
