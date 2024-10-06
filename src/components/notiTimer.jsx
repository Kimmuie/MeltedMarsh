import React, { useContext, useState, useEffect } from 'react';
import { dataContext } from '../App';

export function NotiTimer() {
  const {gameState , setGameState}  = useContext(dataContext)
  const [levelData, setLevelData] = useState([]);
  const [selectedLevelIndex, setSelectedLevelIndex] = useState(null);
  const [timer, setTimer] = useState([]);

  useEffect(() => {
    const storedLevelIndex = localStorage.getItem('selectedLevelIndex');
    
    if (storedLevelIndex !== null) {
      setSelectedLevelIndex(parseInt(storedLevelIndex, 10) + 1);
    }
  }, []);

  useEffect(() => {
    if (selectedLevelIndex !== null) {
      fetch('level.json')
        .then(response => response.json())
        .then(data => {
          setLevelData(data);
          const selectedLevel = data.find(level => level.level === selectedLevelIndex);
          if (selectedLevel) {
            setTimer(selectedLevel.timerLimit);
          }
        })
        .catch(error => console.error('Error fetching the JSON data:', error));
    }
  }, [selectedLevelIndex]);

  useEffect(() => {
    if(!gameState.isGameOver){
    const interval = setInterval(() => {
    setTimer(prevTimer => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }
  }, [gameState.isGameOver]);

  return (
    <div className="frame absolute flex justify-center items-center font-bold z-10 h-12 w-44 box-border rounded-b-lg bg-woodA text-whiteC text-2xl mb-1 border-4 border-woodO">
      {timer}
    </div>
  );
}