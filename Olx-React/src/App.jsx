import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import { useEffect,useContext } from 'react'
import { AuthContext, FirebaseContext } from './store/firebaseContext'
import {onAuthStateChanged} from 'firebase/auth'
import Post from './store/postContext'
import './App.css'
import Home from './Pages/Home'
import SignupPage from './Pages/Signup'
import LoginPage from './Pages/Login'
import CreatePage from './Pages/Create'
import ViewPost from './Pages/ViewPost'

function App() {
const {setUser}=useContext(AuthContext);
const {auth}=useContext(FirebaseContext)
useEffect(()=>{
  onAuthStateChanged(auth,(user)=>{
    setUser(user)
    
  })
})
  return(
    <div>
      <Post>
        <Router>
          <Routes>
              <Route path='/' element={<Home/>} />           
          </Routes>
          <Routes>
              <Route path='/signup' element={<SignupPage/>} />           
          </Routes>
          <Routes>
              <Route path='/login' element={<LoginPage/>} />           
          </Routes>
          <Routes>
              <Route path='/create' element={<CreatePage/>} />           
          </Routes>
          <Routes>
              <Route path='/view' element={<ViewPost/>} />           
          </Routes>
        </Router>
      </Post>
    </div>
  )

  
}

export default App
