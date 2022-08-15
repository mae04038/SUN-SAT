import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SubPage from './SubPage/SubPage';
import Footer from './Components/Footer';
import MainPage from './MainPage/MainPage';
import './App.css';

function App() {
  return (
    <div className='SUN-SAT'>
      <Router>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/search' element={<SubPage />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
