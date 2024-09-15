import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './custom.css';
import { HomePage } from './pages/homePage';
import { GamePage } from './pages/gamePage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/gamePage" element={<GamePage />} />
            </Routes>
        </Router>
    );
}

export default App;
