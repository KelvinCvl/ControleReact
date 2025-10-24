import './Style/App.css'
import {Routes, Route} from 'react-router-dom'
import UserList from './component/UserList'
import UserDetails from './component/UserDetails'

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<UserList />} />
      <Route path='/details/:id' element={<UserDetails />} />
    </Routes>
    </>
  )
}

export default App
