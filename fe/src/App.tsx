import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './components/MainPage';
import Share from './components/Share';
import PrivateContext from './components/Common/PrivateContext';
import Register from './components/UserPage/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={MainPage} />
        <Route path="/share" element={<PrivateContext />}>
          <Route path="/share" element={<Share />} />
        </Route>
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
