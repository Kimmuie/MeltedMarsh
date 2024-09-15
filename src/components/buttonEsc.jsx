import { useState } from 'react'

export function Esc() {
  let soundPOP = new Audio('./audio/popSound.mp3');

    const notiEsc = () => {
      const esc = document.getElementById("escUI");
      soundPOP.play();
      esc.classList.remove("invisible" , "pop-out");
      esc.classList.add("pop-in");
    };

    return(
      <button onClick={notiEsc} id="esc" class="buttonUI cursor-pointer h-20 w-20 m-2 hover:scale-110 z-30">
      <img src="./img/esc.svg" width="128" class="p-4"></img>
    </button>

    )
}