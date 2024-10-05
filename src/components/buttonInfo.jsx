import { useContext , useState } from 'react'
import { dataContext } from '../App';

export function Information() {
  const {gameState , setGameState}  = useContext(dataContext)
  let soundPOP = new Audio('./audio/popSound.mp3');
  soundPOP.volume = gameState.audio.SFX;

    const notiInfo = () => {
      const information = document.getElementById("informationUI");
      soundPOP.play();
      information.classList.remove("invisible" , "pop-out");
      information.classList.add("pop-in");
    };

    return(
      <button onClick={notiInfo} class="border-0 w-24 h-auto m-5 box-border relative hover:scale-110">
      <img src="img/icAbout.png" alt="About" class="w-full h-full object-cover" id="informationButton"/>
    </button>
    )
}