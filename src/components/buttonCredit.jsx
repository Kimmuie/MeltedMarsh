import { useContext , useState } from 'react'
import { dataContext } from '../App';

export function Credit() {
  const {gameState , setGameState}  = useContext(dataContext)
  let soundPOP = new Audio('./audio/popSound.mp3');
  soundPOP.volume = gameState.audio.SFX;

    const notiCredit = () => {
      const credit = document.getElementById("creditUI");
      soundPOP.play();
      credit.classList.remove("invisible" , "pop-out");
      credit.classList.add("pop-in");
    };

    return(
        <button onClick={notiCredit} class="border-0 w-24 h-auto m-5 box-border relative hover:scale-110">
          <img src="img/icCredit.png" alt="Credit" class="w-full h-full object-cover" id="creditButton"/>
        </button>
    )
}