import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import InitUser from './pages/InitUser'
import Quiz from './pages/Quiz'
import Result from './pages/Result'
import QuizProvider from './context/QuizContext'

function App() {
  return (
    <QuizProvider>
      <Routes>
        <Route index element={<Home />}></Route>
        <Route path="/init" element={<InitUser />}></Route>
        <Route path="/quiz" element={<Quiz />}></Route>
        <Route path="/result" element={<Result />}></Route>
      </Routes>
    </QuizProvider>
  )
}

export default App
