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
                <Questions />
            </div>
        </Layout>
    )
}

function Questions() {
    const { isVisible, next, currentQuestion } = useContext(QuizContext);

    return <div className={`transition-opacity ${isVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-4/5 md:w-[65%]mx-6 px-2 flex flex-col gap-8 items-center">
            {/* 題目 */}
            <div className='flex gap-2 text-white text-xl font-bold'>
                <div>Q{currentQuestion.id}</div>
                <p className="">{currentQuestion.question}</p>
            </div>

            {/* 選項 */}
            <div className="space-y-2 md:text-base md:space-y-3 font-bold">
                {currentQuestion.answers.map(answer =>
                    <button
                        className="rounded-full py-4 w-full
                    bg-white/60
                    border-2 border-transparent
                    focus:outline-none 
                    active:bg-purple-800 
                    active:text-white 
                    active:border-white/60
                    "
                        disabled={!isVisible}
                        key={answer.weight} onClick={() => next(currentQuestion.id, answer.weight)}>{answer.content}</button>
                )}
            </div>

            <img
                src={getImageUrl('quiz', currentQuestion.progress)}
                alt="label" className="w-full" />
        </div>
    </div>
}
