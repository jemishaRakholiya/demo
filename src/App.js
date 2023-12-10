import logo from './logo.svg';
import './App.css';
import { Router, Route, Routes } from 'react-router-dom';
import { Listdemo } from './components/Page/Demo';


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Listdemo />} />
      </Routes>
    </>
  )
}

export default App;
