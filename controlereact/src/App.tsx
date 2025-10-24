import './Style/App.css'
import {Routes, Route} from 'react-router-dom'
import UserList from './component/UserList'
import UserDetails from './component/UserDetails'
import { ThemeProvider } from './context/ThemeContext'

function App() {

  return (
    <>
      <ThemeProvider>
        <Routes>
          <Route path='/' element={<UserList />} />
          <Route path='/details/:id' element={<UserDetails />} />
        </Routes>
      </ThemeProvider>
    </>
  )
}

export default App
