import { Esc } from "./buttonEsc"
import { Guide } from "./buttonGuide"
import { NotiTimer } from "./notiTimer"

export function Game() {
    return(
        <>
        <div class="flex justify-start">
            <img src="./img/MMlogo.png" class="absolute h-auto w-24 m-3 z-20" />
        </div>
        <div class=" flex justify-center">
            <NotiTimer/>
        </div>
        <div class=" flex justify-end">
            <div class="absolute">
                <Guide/>
                <Esc/>
            </div>
        </div>
        </>
    )
}