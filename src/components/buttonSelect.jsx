import { useState } from 'react'

export function SelectLevel() {
  let soundPOP = new Audio('./audio/popSound.mp3');

  const notiSelect = () => {
    const select = document.getElementById("selectUI");
    soundPOP.play();
    select.classList.remove("invisible" , "pop-out");
    select.classList.add("pop-in");
  };

    return(
        <button onClick={notiSelect} id="startButton" class="border-0 w-72 h-auto box-border relative hover:scale-110">
          <img src="img/btSelect.png" alt="Select Level" class="w-full h-full object-cover" />
        </button>
    )
}