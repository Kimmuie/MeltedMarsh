import { useState } from 'react'

export function NotiGuide() {

    const notiGuideClose = () => {
        const guide = document.getElementById("guideUI");
        guide.classList.remove("pop-in");
        guide.classList.add("pop-out");
        guide.addEventListener("animationend", function animationEndHandler() {
          guide.classList.add("invisible");
          guide.classList.remove("pop-out");
            this.removeEventListener("animationend", animationEndHandler);
        });
      };

      const notiGuideExcept = (event) => {
        event.stopPropagation();
      };

    return(
    <div onClick={notiGuideClose} id="guideUI" class="gameMenu absolute w-full h-full flex justify-center items-center invisible z-20">
      <div onClick={notiGuideExcept} id="guideBOX" class="flex flex-col items-center h-132 w-96 box-border bg-woodI border-4 border-woodO rounded-3xl absolute z-20">
        <div class="relative flex justify-center font-bold z-30 h-8 w-28 box-border rounded-b-lg bg-woodO text-whiteC mb-1">How To Play</div>
        <div class="w-full relative flex p-5 h-120">
          <p class="break-words overflow-y-auto">
            <span class="font-semibold">Objective</span><br />
            is to reach the campfire before the torch burn out (timer ran out) for lit the torch up and burning some marshmallows.
            <br /><br />
            <span class="font-semibold">เป้าหมาย</span><br />
            คือการไปถึงแคมป์ไฟก่อนที่คบเพลิงจะมอดดับ<br />(หมดเวลา) เพื่อจุดคบเพลิงและปิ้งมาร์ชแมลโลว์
            <br /><br />
            <span class="font-semibold">Keybind</span><br />
            Walk Character : Click <kbd>W</kbd> <kbd>A</kbd> <kbd>S</kbd> <kbd>D</kbd><br />
            Run Character : Hold <kbd>Left Shift</kbd><br />
            Zoom Camera : Scroll <kbd>Middle Button</kbd><br />   
            Rotate Camera : Hold <kbd>Left Button</kbd><br />   
          </p>
        </div>
      </div>
    </div>
    )
}