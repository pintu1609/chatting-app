

import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Router>

      <Routes>

    < Route exact path="/"
    element={<Login/>}
    />

  < Route exact path="/register"
    element={<Register/>}
    />
    < Route exact path="/home"
    element={<Home/>}
    />
  


    </Routes>
      </Router>

    


    </div>
  );
}

export default App;
