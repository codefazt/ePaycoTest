//import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './components/home'
import About from './components/about'
import Recibo from './components/recibo'


function App() {
  return (
    <div className="App">
      <h1>EPayco.</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="recibo" element={<Recibo />} />
      </Routes>
    </div>
  );
}

export default App;
