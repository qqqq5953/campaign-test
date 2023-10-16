import { createContext, useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import data from "../data.json"
import audio from '../assets/bg-music.mp3'

let sum = 0
let weightMap = {}
const totalQuestions = data.length

export const QuizContext = createContext()

export default function QuizProvider({ children }) {
    const navigate = useNavigate();
    const location = useLocation();

    // quiz
    const [isVisible, setIsVisible] = useState(true);
    const [isLoading, setIsLoading] = useState(false)
    const [questionIndex, setQuestionIndex] = useState(0)
    const currentQuestion = data[questionIndex]

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
        if (location.pathname === '/init') return navigate("/")
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

    // audio
    const audioRef = useRef(null)
    const [isPlaying, setIsPlaying] = useState(false)

    async function pauseAudio(ref) {
        try {
            await ref.current?.pause();
            console.log("Pause audio" + ref.current);
        } catch (err) {
            console.log("Failed to pause, error: " + err);
        }
    }

    async function playAudio(ref) {
        try {
            await ref.current?.play();
            console.log("Playing audio" + ref.current);
        } catch (err) {
            console.log("Failed to play, error: " + err);
        }
    }

    useEffect(() => {
        // avoid console error: "Failed to play, error: NotAllowedError: play() failed because the user didn't interact with the document first."
        if (location.pathname !== "/") {
            playAudio(audioRef).then(() => setIsPlaying(true))
        } else {
            pauseAudio(audioRef).then(() => setIsPlaying(false))
            sum = 0
            weightMap = {}
            setQuestionIndex(0)
        }
    }, [location])

    return (
        <QuizContext.Provider
            value={{
                questionIndex,
                isVisible,
                isLoading,
                currentQuestion,
                totalQuestions,
                audioRef,
                isPlaying,
                setIsPlaying,
                playAudio,
                pauseAudio,
                next,
                prev,
            }}
        >
            {children}
            <audio controls loop ref={audioRef} className="fixed bottom-0 bg-gray-100 w-full rounded-none hidden">
                <source src={audio} type="audio/mp3" />
                Your browser does not support the audio tag.
            </audio>
        </QuizContext.Provider>
    )
}