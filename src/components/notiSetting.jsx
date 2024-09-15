import { useState } from 'react'

export function NotiSetting() {

    const notiSettingClose = () => {
      const setting = document.getElementById("settingUI");
        setting.classList.remove("pop-in");
        setting.classList.add("pop-out");
        setting.addEventListener("animationend", function animationEndHandler() {
          setting.classList.add("invisible");
          setting.classList.remove("pop-out");
          this.removeEventListener("animationend", animationEndHandler);
        });
      };

      const notiSettingExcept = (event) => {
        event.stopPropagation();
      };

    return(
      <div onClick={notiSettingClose} id="settingUI" class="homeMenu absolute w-full h-full flex justify-center items-center invisible z-20">
      <div onClick={notiSettingExcept} id="settingBOX" class="flex flex-col items-center h-132 w-96 box-border bg-woodI border-4 border-woodO rounded-3xl absolute z-20">
        <div class="relative flex justify-center font-bold z-30 h-8 w-24 box-border rounded-b-lg bg-woodO text-whiteC mb-5">Setting</div>
        <div class="w-full relative flex justify-center">
          <img src="./img/music.svg" width="64" height="64" class="m-5"></img>
          <div class="flex flex-col w-full m-5">
            <div class="relative flex justify-center font-bold z-30 text-woodO text-xl">Music</div>
            <input type="range" id="music-slider" class="w-full slider mt-2" min="0" max="1" step="0.01" defaultValue="0.5" />
          </div>
        </div>
        <div class="w-full relative flex justify-center">
          <img src="./img/sound.svg" width="64" height="64" class="m-5"></img>
          <div class="flex flex-col w-full m-5">
            <div class="relative flex justify-center font-bold z-30 text-woodO text-xl">SoundFX</div>
            <input type="range" id="sound-slider" class="w-full slider mt-2" min="0" max="1" step="0.01" defaultValue="0.5" />
          </div>
        </div>
        <div class="w-full relative flex justify-center">
          <img src="./img/graphic.svg" width="64" height="64" class="m-5"></img>
          <div class="flex flex-col w-full m-5">
            <div class="relative flex justify-center font-bold z-30 text-woodO text-xl">Graphic Quality</div>
            <div class="flex flex-row justify-center w-full">
              <button class="cursor-default text-whiteC rounded-l-lg border-woodO bg-woodO  font-bold border-4 h-8 w-24  ">Low</button>
              <button class="cursor-not-allowed text-woodO  rounded-r-lg  border-woodO bg-woodI font-bold border-4 h-8 w-24 flex justify-center items-center">
                <img src="./img/lock.svg" width="24" height="24"></img>
              </button>
            </div>
          </div>
        </div>
        <button onClick={notiSettingClose} id="settingApply" class="buttonUI font-bold h-20 w-44 mt-5 hover:scale-110">Apply</button>
      </div>
    </div>
    )
}

//<!-- <button class="cursor-pointer text-woodO  rounded-r-lg  border-woodO bg-woodI font-bold border-4 h-8 w-24 ">High</button> -->