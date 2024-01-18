
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import PrivateLayout from './layout/PrivateLayout/PrivateLayout';
import PublicLayout from './layout/PublicLayout/PublicLayout';

const App = () => {

  return (
    <Router>
      <Routes>
        {/* <Route path="/*" element={<PrivateLayout />} /> */}
        <Route path="/*" element={<PublicLayout />} />
      </Routes>
    </Router>
  );
};



export default App;
