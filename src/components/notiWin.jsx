import { useState } from 'react'

export function NotiWin() {
      let soundPOP = new Audio('./audio/popSound.mp3');

      const nextLevel = () => {
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

      const notiShare = () => {
        const share = document.getElementById("shareUI");
        soundPOP.play();
        share.classList.remove("invisible" , "pop-out");
        share.classList.add("pop-in");
      };
    return(
    <div id="winUI" class="gameMenu absolute w-full h-full flex justify-center items-center invisible z-20">
      <div id="winBOX" class="flex flex-col items-center h-112 w-88 box-border bg-woodI border-4 border-woodO rounded-3xl absolute z-20">
        <div class="relative flex justify-center font-bold z-30 h-8 w-28 box-border rounded-b-lg bg-woodO text-whiteC mb-1">Game Result</div>
        <div class="relative flex justify-center items-center">
        <img src="./img/MMwinLogo.png" class="h-40 w-auto m-4" />
        </div>
      <div class="relative flex justify-center items-center">
        {/* Reached Medal */}
        <div class="group flex  justify-center">
          <div class="bg-sap border-woodO border-2 rounded-full h-12 w-12 m-3">
            <img src="./img/medalBurn.svg" width="128" class="p-2" />
          </div>
          <div class="absolute justify-center items-center bottom-full hidden group-hover:flex bg-woodO text-white text-xs rounded w-28 px-2 py-1">
            Reached Medal
            <div class="absolute w-2 h-2 bg-woodO rotate-45 -bottom-1 left-1/2 transform -translate-x-1/2"></div>
          </div>  
        </div>
        {/* Rapided Medal */}
        <div class="group flex  justify-center">
          <div class="bg-woodO border-woodO border-2  rounded-full h-12 w-12 m-3"></div>
          <div class="absolute justify-center items-center bottom-full hidden group-hover:flex bg-woodO text-white text-xs rounded w-28 px-2 py-1">
            Rapided Medal
            <div class="absolute w-2 h-2 bg-woodO rotate-45 -bottom-1 left-1/2 transform -translate-x-1/2"></div>
          </div>  
        </div>
        {/* Explored Medal */}
        <div class="group flex  justify-center">
          <div class="bg-woodO border-woodO border-2  rounded-full h-12 w-12 m-3"></div>
          <div class="absolute justify-center items-center bottom-full hidden group-hover:flex bg-woodO text-white text-xs rounded w-28 px-2 py-1">
            Explored Medal
            <div class="absolute w-2 h-2 bg-woodO rotate-45 -bottom-1 left-1/2 transform -translate-x-1/2"></div>
          </div>  
        </div>
      </div>
        <div onClick={notiShare}  class="relative flex justify-center items-center">
        <button id="share" class="buttonUI cursor-pointer h-20 w-20 m-2 hover:scale-110 z-30">
          <img src="./img/share2.svg" width="128" class="p-4"></img>
        </button>
        <button onClick={nextLevel} id="restart" class="buttonUI cursor-pointer h-20 w-20 m-2 hover:scale-110 z-30">
          <img src="./img/next.svg" width="128" class="p-4"></img>
        </button>
        <button onClick={backtoMenu} id="home" class="buttonUI cursor-pointer h-20 w-20 m-2 hover:scale-110 z-30">
          <img src="./img/esc.svg" width="128" class="p-4"></img>
        </button>
        </div>
      </div>
    </div>
    )
}