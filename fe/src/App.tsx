import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './components/MainPage';
// import PrivateRoute from "./common/private-route";
// import RestrictedRoute from "./common/restricted-route";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/share" element={<Share />} />
        </Route> */}
        <Route path='/' Component={MainPage} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
