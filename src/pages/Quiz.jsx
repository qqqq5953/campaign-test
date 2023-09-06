import { useNavigate, useNavigationType } from 'react-router-dom'
import { useState, useEffect } from "react"
import data from "../data.json"
import getImageUrl from "../helpers/getImageUrl";
import Layout from './Layout';

export default function Quiz() {
    const [isLoading, setIsLoading] = useState(false)
    const navigationType = useNavigationType()
    const navigate = useNavigate();

    // navigate to home page on refresh 
    useEffect(() => {
        if (navigationType === "POP") navigate("/", { replace: true })
    }, [navigationType])

    return (
        <Layout>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[500px] md px-5">
                {/* {isLoading ? <Loading isLoading={isLoading} /> : <Questions isLoading={isLoading} setIsLoading={setIsLoading} />} */}

                <Loading isLoading={isLoading} />
                <Questions isLoading={isLoading} setIsLoading={setIsLoading} />
            </div>
        </Layout>
    )
}

let sum = 0

function Questions({ isLoading, setIsLoading }) {
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

    return <div className={isLoading ? 'hidden' : 'block'}>
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
    </div>
}

function Loading({ isLoading }) {
    const [loaderLoaded, setLoaderLoaded] = useState(false);
    const [woodLoaded, setWoodLoaded] = useState(false);

    return <div className={isLoading ? 'block' : 'hidden'}>
        {loaderLoaded && woodLoaded && <div className='absolute -top-1/3 -bottom-1/3 inset-x-0 -z-10 bg-white/40  rounded-xl mx-10'></div>}
        <div className='space-y-4 -mb-4 mt-8'>
            <img src={getImageUrl('result-element', 'loader')} alt="loader" className='w-20 h-20 block mx-auto animate-bounce' onLoad={() => setLoaderLoaded(true)} />
            <img src={getImageUrl('result-element', 'wood')} alt="loader" className='w-20 block mx-auto' onLoad={() => setWoodLoaded(true)} />
            {loaderLoaded && woodLoaded && <p className='text-center text-slate-800 pt-3'>正在收集結果...</p>}
        </div>
    </div>
}
