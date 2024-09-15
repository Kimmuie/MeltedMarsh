import { useState } from 'react'

export function Cutscene() {
    return(
        <div id="cutscene" class="outscene absolute w-full h-full bg-skyB z-50 flex justify-center items-center flex-col">
        <div class="bg-[url('./img/cutscene.gif')] z-50 bg-center bg-cover h-56 w-56"></div>
        <div class="loading text-woodO text-xl mt-7 ml-15">
          <div class="loading__letter">L</div>
          <div class="loading__letter">o</div>
          <div class="loading__letter">a</div>
          <div class="loading__letter">d</div>
          <div class="loading__letter">i</div>
          <div class="loading__letter">n</div>
          <div class="loading__letter">g</div>
          <div class="loading__letter">.</div>
          <div class="loading__letter">.</div>
          <div class="loading__letter">.</div>
        </div>
      </div>
    )
}