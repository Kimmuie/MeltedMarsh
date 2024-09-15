import { useState } from 'react'

export function Setting() {
  let soundPOP = new Audio('./audio/popSound.mp3');

    const notiSetting = () => {
      const setting = document.getElementById("settingUI");
      soundPOP.play();
      setting.classList.remove("invisible" , "pop-out");
      setting.classList.add("pop-in");
    };

    return(
      <button onClick={notiSetting} id="settingButton" class="border-0 w-72 h-auto box-border relative hover:scale-110">
      <img src="img/btSettings.png" alt="Setting" class="w-full h-full object-cover" />
    </button>
    )
}