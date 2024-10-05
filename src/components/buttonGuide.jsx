import { useContext , useState } from 'react'
import { dataContext } from '../App';

export function Guide() {
  const {gameState , setGameState}  = useContext(dataContext)
  let soundPOP = new Audio('./audio/popSound.mp3');
  soundPOP.volume = gameState.audio.SFX;

    const notiGuide = () => {
      const guide = document.getElementById("guideUI");
      soundPOP.play();
      guide.classList.remove("invisible" , "pop-out");
      guide.classList.add("pop-in");
    };

    return(
    <button onClick={notiGuide} id="guide" class="buttonUI cursor-pointer h-20 w-20 m-2 hover:scale-110 z-30">
          <img src="./img/guide.svg" width="128" class="p-4"></img>
        </button>
    )
}