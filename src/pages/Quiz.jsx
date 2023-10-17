import { useNavigate, useNavigationType } from 'react-router-dom'
import { useEffect, useContext } from "react"
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
    const { questionIndex, isLoading, isVisible, next, currentQuestion, totalQuestions } = useContext(QuizContext);

    return <div className={`${isLoading ? 'hidden' : 'block'} transition-opacity ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-4/5 md:w-[65%]mx-6 px-2 flex flex-col gap-8 items-center">
            {/* 題目 */}
            <div className='flex gap-2 text-white text-xl font-bold'>
                <div>{currentQuestion.label}</div>
                <p className="">{currentQuestion.question}</p>
            </div>

            {/* 選項 */}
            <div className="space-y-2 md:text-base md:space-y-3 font-bold">
                {currentQuestion.answers.map(answer =>
                    <button className="rounded-full py-4 w-full bg-white/60 active:bg-stone-700/20" key={answer.weight} onClick={() => next(currentQuestion.id, answer.weight)}>{answer.content}</button>
                )}
            </div>

            <div className='text-center'>
                <div className='bg-white/30 text-white px-3 py-0.5 inline-block rounded-full'>{questionIndex + 1} / {totalQuestions}</div>
            </div>
        </div>
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
