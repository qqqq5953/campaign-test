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

    const [isVisible, setIsVisible] = useState(true);

    async function next(id, weight) {
        sum += weight

        if (id <= 9) {
            setIsVisible(!isVisible);
            setTimeout(() => {
                setIsVisible(isVisible);
                setQuestionIndex(q => q + 1)
            }, 100);
        } else {
            await simulateCalculation()
            navigate("/result", { state: { result: sum } })
        }
    }

    return <div className={`${isLoading ? 'hidden' : 'block'} transition-opacity ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <img src={getImageUrl('quiz', 'poster')} alt="poster" onLoad={() => setImageLoaded(true)} className={imageLoaded ? 'block' : 'hidden'} />
        {imageLoaded && <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 h-full w-2/3">
            <div className="relative h-full mx-6 text-sm md:text-base">
                {/* 題目 */}
                <div className="absolute top-[17%] sm:top-[19%] md:top-[12%] w-full">
                    <img
                        src={getImageUrl('quiz', currentQuestion.label)}
                        alt="label" className="block h-8" />
                    <p className="mt-0.5">{currentQuestion.question}</p>
                </div>

                {/* 選項 */}
                <div className="absolute bottom-12 sm:bottom-16 md:bottom-0 md:top-1/2 md:-translate-y-1/4 w-full space-y-2 md:space-y-3">
                    {currentQuestion.answers.map(answer =>
                        <button className="rounded-full py-2.5 w-full bg-white" key={answer.weight} onClick={() => next(currentQuestion.id, answer.weight)}>{answer.content}</button>
                    )}
                </div>
            </div>
        </div>}
    </div>
}

function Loading({ isLoading }) {
    return <div className={`bg-white/40 rounded-xl mx-5 pt-16 pb-16 space-y-4 ${isLoading ? 'block' : 'hidden'} `}>
        <img src={getImageUrl('result-element', 'loader')} alt="loader" className='w-20 h-20 block mx-auto animate-bounce' />
        <img src={getImageUrl('result-element', 'wood')} alt="loader" className='w-20 block mx-auto' />
        <p className='text-center text-slate-800 pt-3'>正在收集結果...</p>
    </div>
}
