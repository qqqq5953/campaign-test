import { useNavigate, useNavigationType } from 'react-router-dom'
import { useState, useEffect, useContext } from "react"
import { QuizContext } from '../context/QuizContext'

import getImageUrl from "../helpers/getImageUrl";
import Layout from './Layout';

export default function Quiz() {
    const navigationType = useNavigationType()
    const navigate = useNavigate();

    // navigate to home page on refresh 
    useEffect(() => {
        if (navigationType === "POP") navigate("/", { replace: true })
    }, [navigationType])

    return (
        <Layout>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[500px] md px-5">
                <Loading />
                <Questions />
            </div>
        </Layout>
    )
}

function Questions() {
    const [imageLoaded, setImageLoaded] = useState(false);
    const { questionIndex, isLoading, isVisible, next, currentQuestion, totalQuestions } = useContext(QuizContext);

    return <div className={`${isLoading ? 'hidden' : 'block'} transition-opacity ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <img src={getImageUrl('quiz', 'poster')} alt="poster" onLoad={() => setImageLoaded(true)} className={imageLoaded ? 'block' : 'hidden'} />

        {imageLoaded && <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 h-full w-3/5 md:w-[65%]">
            <div className="relative h-full mx-6 text-sm md:text-base">
                {/* 題目 */}
                <div className="absolute top-[17%] sm:top-[19%] md:top-[12%] w-full">
                    <img
                        src={getImageUrl('quiz', currentQuestion.label)}
                        alt="label" className="block h-8" />
                    <p className="mt-2">{currentQuestion.question}</p>
                </div>

                {/* 選項 */}
                <div className="absolute top-1/2 -translate-y-1/4 w-full space-y-2 md:space-y-3">
                    {currentQuestion.answers.map(answer =>
                        <button className="rounded-full py-2.5 w-full bg-white" key={answer.weight} onClick={() => next(currentQuestion.id, answer.weight)}>{answer.content}</button>
                    )}
                </div>

                <div className='absolute -bottom-12 inset-x-0 text-center'>
                    <div className='bg-white/30 text-white px-3 py-0.5 inline-block rounded-full'>{questionIndex + 1} / {totalQuestions}</div>
                </div>
            </div>
        </div>}
    </div>
}

function Loading() {
    const { isLoading } = useContext(QuizContext);

    return <div className={`bg-white/40 rounded-xl mx-5 pt-16 pb-16 space-y-4 ${isLoading ? 'block' : 'hidden'} `}>
        <img src={getImageUrl('result-element', 'loader')} alt="loader" className='w-20 h-20 block mx-auto animate-bounce' />
        <img src={getImageUrl('result-element', 'wood')} alt="loader" className='w-20 block mx-auto' />
        <p className='text-center text-white pt-3'>正在收集結果...</p>
    </div>
}
