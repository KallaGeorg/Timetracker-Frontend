
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Frontpage from './Frontpage'

import './App.css'

function App() {
  console.log('App render');
  
return(
  <Router>
    <Routes>
      <Route  path="/" element={<Frontpage/>} />
      </Routes>
  </Router>
 
   
  

)
}

export default App
