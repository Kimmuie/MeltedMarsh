import { useState } from 'react'

export function NotiCredit() {

    const notiCreditClose = () => {
        const credit = document.getElementById("creditUI");
        credit.classList.remove("pop-in");
        credit.classList.add("pop-out");
        credit.addEventListener("animationend", function animationEndHandler() {
            credit.classList.add("invisible");
            credit.classList.remove("pop-out");
            this.removeEventListener("animationend", animationEndHandler);
        });
      };

      const notiCreditExcept = (event) => {
        event.stopPropagation();
      };

    return(
        <div onClick={notiCreditClose} id="creditUI" class="homeMenu absolute w-full h-full flex justify-center items-center invisible z-20">
        <div onClick={notiCreditExcept} id="creditBOX" class="flex flex-col items-center h-132 w-96 box-border bg-woodI border-4 border-woodO rounded-3xl absolute z-20">
          <div class="relative flex justify-center font-bold z-30 h-8 w-28 box-border rounded-b-lg bg-woodO text-whiteC mb-1">Credit</div>
          <div class="flex flex-col" >
            <a class="flex justify-center items-center flex-row h-22 bg-woodO rounded-xl hover:opacity-80 mt-5" href="https://instagram.com/kimmuie_" target="_blank">
              <img src="./img/ig.svg" width="64" height="64" class="ml-5 mr-5"></img>
              <div class="w-full font-bold z-30 text-woodI text-xl mr-5">kimmuie_</div>
            </a>
            <a class="flex justify-center items-center flex-row h-22 bg-woodO rounded-xl hover:opacity-80 mt-5" href="https://instagram.com/kimmuie.workingspace" target="_blank">
              <img src="./img/ig.svg" width="64" height="64" class="ml-5 mr-5"></img>
              <div class="w-full font-bold z-30 text-woodI text-xl mr-5">kimmuie.workingspace</div>
            </a>
            <a class="flex justify-center items-center flex-row h-22 bg-woodO rounded-xl hover:opacity-80 mt-5" href="https://github.com/Kimmuie" target="_blank">
              <img src="./img/github.svg" width="64" height="64" class="ml-5 mr-5"></img>
              <div class="w-full font-bold z-30 text-woodI text-xl mr-5">Kimmuie</div>
            </a>
            <a class="flex justify-center items-center flex-row h-22 bg-woodO rounded-xl hover:opacity-80 mt-5" href="https://discord.com/invite/PgKVSbmnyT" target="_blank">
              <img src="./img/discord.svg" width="64" height="64" class="ml-5 mr-5"></img>
              <div class="w-full font-bold z-30 text-woodI text-xl mr-5">Kimmuie Bunker</div>
            </a>
          </div>
        </div>
      </div>
    )
}