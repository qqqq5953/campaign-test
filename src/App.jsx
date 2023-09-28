import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Quiz from './pages/Quiz'
import Result from './pages/Result'
import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom';
import audio from '../src/assets/bg-music.mp3'

function App() {
  const audioRef = useRef(null)
  const location = useLocation()
  console.log(location);
  async function playAudio() {
    try {
      await audioRef.current?.play();
      console.log("Playing audio" + audioRef.current);

    } catch (err) {
      console.log("Failed to play, error: " + err);
    }
  }

  useEffect(() => {
    // avoid console error: "Failed to play, error: NotAllowedError: play() failed because the user didn't interact with the document first."
    if (location.pathname !== "/") {
      playAudio()
    }
  }, [location])
  return (
    <>
      <Routes>
        <Route index element={<Home />}></Route>
        <Route path="/quiz" element={<Quiz />}></Route>
        <Route path="/result" element={<Result />}></Route>
      </Routes>
      <audio controls loop ref={audioRef} className="fixed bottom-0 bg-gray-100 w-full rounded-none hidden">
        <source src={audio} type="audio/mp3" />
        Your browser does not support the audio tag.
      </audio>
    </>
  )
}

export default App
