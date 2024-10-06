import React, { createContext, useState , useEffect, useRef } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './custom.css';
import { HomePage } from './pages/homePage';
import { GamePage } from './pages/gamePage';


export const dataContext = React.createContext();

function App() {
    const [gameState, setGameState] = useState({
        isPaused: false,
        isGameOver: false,
        audio: {
            Music: 0.5,
            SFX: 0.5
        }
    });
    const bgMusicRef = useRef(new Audio('./audio/bgMusic.mp3'));
    useEffect(() => {
        const bgMusic = bgMusicRef.current;
        bgMusic.loop = true; 
        bgMusic.play().catch(error => console.log("Audio play failed:", error));
        return () => {
            if (bgMusic) {
                bgMusic.pause();
                bgMusic.currentTime = 0;
            }
        };
    }, []);

    useEffect(() => {
        const bgMusic = bgMusicRef.current;
        bgMusic.volume = gameState.audio.Music;
    }, [gameState.audio.Music]);
    return (
        <dataContext.Provider value={{ gameState, setGameState }}>
        <Router>
            <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/gamePage" element={<GamePage />} />
            </Routes>
        </Router>
        </dataContext.Provider>
    );
}

export default App