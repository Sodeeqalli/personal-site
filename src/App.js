import Layout from './components/Layout'
import './App.scss'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='*' element={<Home />} />
      </Route>
    </Routes>
  )
}

export default App
