import { createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import data from "../data.json"

let sum = 0
const totalQuestions = data.length
const weightMap = {}

export const QuizContext = createContext()

export default function QuizProvider({ children }) {
    const [questionIndex, setQuestionIndex] = useState(0)
    const [isVisible, setIsVisible] = useState(true);
    const [isLoading, setIsLoading] = useState(false)

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
        weightMap[id.toString()] = weight

        if (id <= totalQuestions - 1) {
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

    async function prev() {
        if (questionIndex < 1) return navigate("/init")

        const prevQuestion = data[questionIndex - 1]
        const weight = weightMap[prevQuestion.id]
        sum -= weight

        setIsVisible(!isVisible);
        setTimeout(() => {
            setIsVisible(isVisible);
            setQuestionIndex(q => q - 1)
        }, 100);
    }

    return (
        <QuizContext.Provider
            value={{
                questionIndex,
                isVisible,
                isLoading,
                currentQuestion,
                totalQuestions,
                next,
                prev,
            }}
        >
            {children}
        </QuizContext.Provider>
    )
}