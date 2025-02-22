import { useContext , useState } from 'react'
import { dataContext } from '../App';

export function Share() {
  const {gameState , setGameState}  = useContext(dataContext)
    let soundPOP = new Audio('./audio/popSound.mp3');
    soundPOP.volume = gameState.audio.SFX;

    const notiShare = () => {
      const share = document.getElementById("shareUI");
      soundPOP.play();
      share.classList.remove("invisible" , "pop-out");
      share.classList.add("pop-in");
    };
    return(
        <button onClick={notiShare} class="border-0 w-24 h-auto m-5 box-border relative hover:scale-110 bg-transparent">
          <img src="img/icShare.png" alt="Share" class="w-full h-full object-cover" id="shareButton"/>
        </button>
    )
}