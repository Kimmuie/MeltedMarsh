import { useState } from 'react'

export function NotiLose() {

    // const notiLoseClose = () => {
    //     const lose = document.getElementById("loseUI");
    //     lose.classList.remove("pop-in");
    //     lose.classList.add("pop-out");
    //     lose.addEventListener("animationend", function animationEndHandler() {
    //       lose.classList.add("invisible");
    //       lose.classList.remove("pop-out");
    //         this.removeEventListener("animationend", animationEndHandler);
    //     });
    //   };

    //   const notiLoseExcept = (event) => {
    //     event.stopPropagation();
    //   };
      let soundPOP = new Audio('./audio/popSound.mp3');

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

      const notiShare = () => {
        const share = document.getElementById("shareUI");
        soundPOP.play();
        share.classList.remove("invisible" , "pop-out");
        share.classList.add("pop-in");
      };
    return(
    <div id="loseUI" class="gameMenu absolute w-full h-full flex justify-center items-center invisible z-20">
      <div id="loseBOX" class="flex flex-col items-center h-88 w-88 box-border bg-woodI border-4 border-woodO rounded-3xl absolute z-20">
        <div class="relative flex justify-center font-bold z-30 h-8 w-28 box-border rounded-b-lg bg-woodO text-whiteC mb-1">Game Result</div>
        <div class="relative flex justify-center items-center mx-4">
        <img src="./img/MMloseLogo.png" class="h-40 w-auto m-4" />
        </div>
        <div onClick={notiShare}  class="relative flex justify-center items-center">
        <button id="share" class="buttonUI cursor-pointer h-20 w-20 m-2 hover:scale-110 z-30">
          <img src="./img/share2.svg" width="128" class="p-4"></img>
        </button>
        <button onClick={levelRestart} id="restart" class="buttonUI cursor-pointer h-20 w-20 m-2 hover:scale-110 z-30">
          <img src="./img/restart.svg" width="128" class="p-4"></img>
        </button>
        <button onClick={backtoMenu} id="home" class="buttonUI cursor-pointer h-20 w-20 m-2 hover:scale-110 z-30">
          <img src="./img/esc.svg" width="128" class="p-4"></img>
        </button>
        </div>
      </div>
    </div>
    )
}