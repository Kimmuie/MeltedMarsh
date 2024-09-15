
import { SelectLevel } from './buttonSelect';
import { Setting } from './buttonSetting';
import { Share } from './buttonShare';
import { Credit } from './buttonCredit';
import { Information } from './buttonInfo';

export function Menu() {
    return(
        <div class="flex justify-center items-start">
            <div id="homeButton" class="absolute z-10">
                <img src="./img/MMfontLogo.png" class="relative h-auto w-160 m-5 -left-12" />
                <div class="w-full flex justify-center">
                    <SelectLevel/>
                </div>
                <div class="w-full flex justify-center">
                    <Setting/>
                </div>
                <div class="w-full flex justify-center">
                    <Share/>
                    <Credit/>
                    <Information/>
                </div>
            </div>
        </div>
    )
}