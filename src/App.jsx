import { Route,Routes } from 'react-router'
import MemorizationPage from './components/MemorizationPage'
import StartPage from './components/StartPage'
import { BrowserRouter } from 'react-router'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes> 
      <Route path='/' element={<StartPage/>}/>
      <Route path='/game' element={<MemorizationPage/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
