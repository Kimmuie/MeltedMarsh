import { useState } from 'react'

export function NotiInfo() {

    const notiInfoClose = () => {
        const information = document.getElementById("informationUI");
        information.classList.remove("pop-in");
        information.classList.add("pop-out");
        information.addEventListener("animationend", function animationEndHandler() {
            information.classList.add("invisible");
            information.classList.remove("pop-out");
            this.removeEventListener("animationend", animationEndHandler);
        });
      };

      const notiInfoExcept = (event) => {
        event.stopPropagation();
      };

    return(
  <div onClick={notiInfoClose} id="informationUI" class="homeMenu absolute w-full h-full flex justify-center items-center invisible z-20">
    <div onClick={notiInfoExcept} id="informationBOX" class="flex flex-col items-center h-132 w-96 box-border bg-woodI border-4 border-woodO rounded-3xl absolute z-20">
      <div class="relative flex justify-center font-bold z-30 h-8 w-28 box-border rounded-b-lg bg-woodO text-whiteC mb-1">Information</div>
      <div class="w-full relative flex p-5 h-120">
        <p class="break-words overflow-y-auto text-woodD">
          Melted Marsh, this game was created to introduce my coding skills, especially three.js which is a library that is able to render a 3D model, including Three-Nebula and Rapier-Physics. Also, this project was created by Pranchayut Netsawang from Bangkok Christian College, or you can call me Kimmuie, please do not copy by any means unless I give you permission because this project will be included in my portfolio. However, this project supports only desktop because of render and movement issues. And if you guys wonder how to play, there is a guide on top right while you are playing.
          <br /><br />
          Melted Marsh เกมนี้ถูกสร้างขึ้นเพื่อนำเสนอทักษะการเขียนโค้ดของผม โดยเฉพาะ three.js ซึ่งเป็น Library ที่สามารถแสดงผล 3D Model รวมถึงความสามารถในการใช้ Three-Nebula และ Rapier-Physics นอกจากนี้โปรเจ็กต์นี้จัดทำโดย นายปรานต์ชยุต เนตรสว่าง จากโรงเรียนกรุงเทพคริสเตียนวิทยาลัย และได้โปรดกรุณาอย่าคัดลอกไม่ว่าด้วยวิธีใดๆ เว้นแต่ได้รับอนุญาต เพราะโปรเจ็กต์นี้จะรวมอยู่ในพอร์ตโฟลิโอของผมด้วย อย่างไรก็ตามโปรเจ็กต์นี้รองรับเฉพาะ Desktop เท่านั้นเนื่องจากปัญหาการแสดงผลและการเคลื่อนไหว และถ้าเพื่อนๆ สงสัยว่าจะเล่นยังไง ก็จะมีคำแนะนำอยู่ด้านบนขวาขณะที่คุณกำลังเล่น
        </p>
      </div>
    </div>
  </div>
    )
}