import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Picture from './components/Picture';

function App() {
  return (
    <div className="App">
    
    <Routes>
    <Route path="/" element={<Register/>}/>
    <Route path="/home" element={<Home/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/picture" element={<Picture/>}/>
    </Routes>

    </div>
  );
}

export default App;