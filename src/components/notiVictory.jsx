import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export function NotiVictory() {
  let soundPOP = new Audio('./audio/popSound.mp3');
  const navigate = useNavigate();

    const notiEscClose = () => {
        const esc = document.getElementById("escUI");
        esc.classList.remove("pop-in");
        esc.classList.add("pop-out");
        esc.addEventListener("animationend", function animationEndHandler() {
          esc.classList.add("invisible");
          esc.classList.remove("pop-out");
            this.removeEventListener("animationend", animationEndHandler);
      });
    };

    const notiEscExcept = (event) => {
      event.stopPropagation();
    };

    const notiSetting = () => {
      const setting = document.getElementById("settingUI");
      soundPOP.play();
      setting.classList.remove("invisible" , "pop-out");
      setting.classList.add("pop-in");
      notiEscClose();
    };

    const levelRestart = () => {
      window.location.reload();    
    };

    const backtoMenu = () => {
      const cutscene = document.getElementById("cutscene");
      cutscene.classList.remove("popdown2");
      cutscene.classList.add("popdown1");
      cutscene.addEventListener("animationend", function animationEndHandler() {
        cutscene.classList.remove("popdown1");
        cutscene.classList.remove("outscene");
        cutscene.classList.add("inscene");
        setTimeout(() => {
          navigate('/');
        }, 2000);
          this.removeEventListener("animationend", animationEndHandler);
      });
    };

    return(
    <div onClick={notiEscClose} id="escUI" class="homeMenu absolute w-full h-full flex justify-center items-center invisible z-20">
      <div onClick={notiEscExcept} id="escBOX" class="flex flex-col items-center h-132 w-96 box-border bg-woodI border-4 border-woodO rounded-3xl absolute z-20">
        <div class="relative flex justify-center font-bold z-30 h-8 w-28 box-border rounded-b-lg bg-woodO text-whiteC mb-5">Game Pause</div>
        <button onClick={notiEscClose} id="escResume" class="buttonUI font-bold h-20 w-44 mt-5 hover:scale-110">Resume</button>
        <button onClick={notiSetting} id="escSetting" class="buttonUI font-bold h-20 w-44 mt-5 hover:scale-110">Setting</button>
        <button onClick={levelRestart} id="escRestart" class="buttonUI font-bold h-20 w-44 mt-5 hover:scale-110">Restart</button>
        <button onClick={backtoMenu} id="escMenu" class="buttonUI font-bold h-20 w-44 mt-5 hover:scale-110">Back to Menu</button>
      </div>
    </div>
    )
}