import { useState } from 'react'

export function NotiShare() {

    const notiShareClose = () => {
        const share = document.getElementById("shareUI");
        share.classList.remove("pop-in");
        share.classList.add("pop-out");
        share.addEventListener("animationend", function animationEndHandler() {
            share.classList.add("invisible");
            share.classList.remove("pop-out");
            this.removeEventListener("animationend", animationEndHandler);
        });
      };

      const notiShareExcept = (event) => {
        event.stopPropagation();
      };

      const share = () => {
        const url = 'https://www.youtube.com/';
        if (navigator.share) {
            navigator.share({
                title: 'Lit It Up',
                text: 'Checkout this game with Melted Marsh!',
                url: url
            })
            .then(() => console.log('Successful share'))
            .catch(error => console.log('Error sharing:', error));
        } else {
            navigator.clipboard.writeText(url)
            .then(() => alert('URL copied to clipboard'))
            .catch(error => console.log('Error copying to clipboard:', error));
        }
    };

    const copyToClipboard = () => {
        const url = "https://www.youtube.com/";
        navigator.clipboard.writeText(url).then(() => {
            const floatCopy = document.getElementById("floatCopy");
        floatCopy.classList.remove("invisible");
        floatCopy.classList.add("floatout");
        floatCopy.addEventListener("animationend", function animationEndHandler() {
            floatCopy.classList.add("invisible");
            floatCopy.classList.remove("floatout");
            this.removeEventListener("animationend", animationEndHandler);
        });
        }).catch(err => {
            console.error('Could not copy text: ', err);
        });
    };

    return(
        <div onClick={notiShareClose} id="shareUI" class="homeMenu absolute w-full h-full flex justify-center items-center z-20 invisible">
            <div onClick={notiShareExcept} id="shareBOX" class="flex flex-col items-center h-72 w-96 box-border bg-woodI border-4 border-woodO rounded-3xl absolute z-20">
                <div class="relative flex justify-center font-bold z-30 h-8 w-28 box-border rounded-b-lg bg-woodO text-whiteC mb-1">Share</div>
                <div class="flex flex-col" >
                    <button onClick={share} id="nativeShare" class="flex justify-center items-center flex-row h-22 bg-woodO rounded-xl hover:opacity-80 mt-5">
                    <img src="./img/share.svg" width="64" height="64" class="ml-5 mr-5"></img>
                    <div class="w-full font-bold z-30 text-woodI text-xl mr-5">Share to Other App</div>
                    </button>
                    <button onClick={copyToClipboard} id="linkShare" class="flex justify-center items-center flex-row h-22 bg-woodO rounded-xl hover:opacity-80 mt-5">
                    <img src="./img/link.svg" width="64" height="64" class="ml-5 mr-5"></img>
                    <div class="w-full font-bold z-30 text-woodI text-xl mr-5">Copy Link URL</div>
                    <span id="floatCopy" class="invisible absolute w-28 bg-woodI text-woodO text-xs rounded-xl z-30">❐ URL Copied</span>
                    </button>
                </div>
            </div>
        </div>
    )
}