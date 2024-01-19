
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
// import PrivateLayout from './layout/PrivateLayout/PrivateLayout';
import PublicLayout from './layout/PublicLayout/PublicLayout';
import { Toaster } from 'react-hot-toast';

const App = () => {

  return (
    <Router>
      <Toaster position='top-center' />
      <Routes>
        {/* <Route path="/*" element={<PrivateLayout />} /> */}
        <Route path="/*" element={<PublicLayout />} />
      </Routes>
    </Router>
  );
};



export default App;
