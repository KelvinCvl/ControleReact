import './Style/App.css'
import {Routes, Route} from 'react-router-dom'
import UserList from './component/UserList'
import UserDetails from './component/UserDetails'
import { ThemeProvider } from './context/ThemeContext'
import { ErrorBoundary } from "./error/ErrorBoundary";
import NotFound from "./component/notFound";

function App() {

  return (
    <>
      <ThemeProvider>
        <ErrorBoundary>
          <Routes>
            <Route path='/' element={<UserList />} />
            <Route path='/details/:id' element={<UserDetails />} />
            <Route path='/404' element={<NotFound />} />
          </Routes>
        </ErrorBoundary>
      </ThemeProvider>
    </>
  )
}

export default App
