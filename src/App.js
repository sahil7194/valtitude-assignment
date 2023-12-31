import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HrsSystem } from './component/Table';
import { Excel } from './component/Excel';
import Header from './component/Header';

function App() {
  return (
    <>
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<HrsSystem />} />
        <Route path="/excel" element={<Excel />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
