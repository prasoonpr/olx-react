import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {FirebaseProvider,UserDetails} from './store/firebaseContext.jsx'
createRoot(document.getElementById('root')).render(
  
  <FirebaseProvider>
    <UserDetails>
    <App />
    </UserDetails>
  </FirebaseProvider>
   
)
