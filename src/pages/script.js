//selectLevel
document.getElementById("startButton").addEventListener("click", function () {
    var select = document.getElementById("selectUI");
    var audiopop = document.getElementById("soundPOP");
    audiopop.play();
    select.classList.remove("invisible");
    select.classList.remove("pop-out");
    select.classList.add("pop-in");
});

document.getElementById("selectUI").addEventListener("click", function () {
    var select = document.getElementById("selectUI");
    select.classList.remove("pop-in");
    select.classList.add("pop-out");
    select.addEventListener("animationend", function animationEndHandler() {
        console.log("hi")
        select.classList.add("invisible");
        select.classList.remove("pop-out");
        this.removeEventListener("animationend", animationEndHandler);
    });
});

document.getElementById("selectBOX").addEventListener("click", function (event) {
    event.stopPropagation();
});

//Level Mapping
var lastClickedButton = null;
fetch('level.json')
    .then(response => response.json())
    .then(levelData => {
    const levelContainer = document.getElementById('levelContainer');

    levelData.forEach(level => {
        const levelElement = document.createElement('div');
        levelElement.className = 'level-item flex justify-center hover:scale-95';

        let fireIcons = '';
        for (let i = 0; i < 3; i++) {
        fireIcons += `<img src="./img/${i < level.score ? 'fire2' : 'fire1'}.svg" width="32" height="32">`;
        }

        levelElement.innerHTML = `
        <button class="flex justify-center items-center flex-col h-28 w-28 rounded-lg bg-[url('${level.preview}')] bg-center bg-cover border-woodO box-border border-4 levelHover hover:scale-110">
            <div class="text-woodO font-bold text-xl h-8 w-9 rounded-full bg-whiteC mt-4 mb-2 levelB">${level.level}</div>
            <div class="flex flex-row justify-center levelB">
            ${fireIcons}
            </div>
        </button>
        `;
        const button = levelElement.querySelector('button');

        button.addEventListener('click', () => {
        if (lastClickedButton) {
            lastClickedButton.classList.remove('border-whiteC');
            lastClickedButton.classList.add('border-woodO');
        }
        button.classList.remove('border-woodO');
        button.classList.add('border-whiteC');
        lastClickedButton = button;
        });
        levelContainer.appendChild(levelElement);
    });
    })
    .catch(error => console.error('Error fetching the JSON data:', error));

//Start Game
const startGame = document.getElementById('selectStart');
startGame.addEventListener('click', () => {
    if (lastClickedButton != null) {
        var cutscene = document.getElementById("cutscene");
        cutscene.classList.remove("outscene");
        cutscene.classList.add("popdown");
        cutscene.addEventListener("animationend", function animationEndHandler() {
            cutscene.classList.add("inscene");
            cutscene.classList.remove("popdown");
            var homeMenu = document.getElementsByClassName("homeMenu");
            var homeButton = document.getElementById("homeButton");
            homeButton.classList.add("invisible");
            if (homeMenu.length > 0) {
                for (let i = 0; i < homeMenu.length; i++) {
                    homeMenu[i].classList.add("invisible");
                }
            }
            setTimeout(() => {
                cutscene.classList.remove("popdown");
                cutscene.classList.remove("inscene");
                cutscene.classList.add("popdown2");
                cutscene.addEventListener("animationend", function animationEndHandler() {
                    cutscene.classList.add("outscene");
                    cutscene.classList.remove("popdown2");
                    this.removeEventListener("animationend", animationEndHandler);
                });
            }, 3000);
            this.removeEventListener("animationend", animationEndHandler);
        });
    }
});

//Setting
document.getElementById("settingButton").addEventListener("click", function () {
    var setting = document.getElementById("settingUI");
    var audiopop = document.getElementById("soundPOP");
    audiopop.play();
    setting.classList.remove("invisible");
    setting.classList.remove("pop-out");
    setting.classList.add("pop-in");
});

document.getElementById("settingApply").addEventListener("click", function () {
    var setting = document.getElementById("settingUI");
    setting.classList.remove("pop-in");
    setting.classList.add("pop-out");
    setting.addEventListener("animationend", function animationEndHandler() {
        setting.classList.add("invisible");
        setting.classList.remove("pop-out");
        this.removeEventListener("animationend", animationEndHandler);
    });
});

document.getElementById("settingUI").addEventListener("click", function () {
    var setting = document.getElementById("settingUI");
    setting.classList.remove("pop-in");
    setting.classList.add("pop-out");
    setting.addEventListener("animationend", function animationEndHandler() {
        setting.classList.add("invisible");
        setting.classList.remove("pop-out");
        this.removeEventListener("animationend", animationEndHandler);
    });
});

document.getElementById("settingBOX").addEventListener("click", function (event) {
    event.stopPropagation();
});

//Setting Music/Sound
document.addEventListener('DOMContentLoaded', function () {
    var body = document.getElementById("body");
    var audiopop = document.getElementById("soundPOP");
    var audiobg = document.getElementById("soundBG");
    var musicslider = document.getElementById("music-slider");
    var soundslider = document.getElementById("sound-slider");

    function playBackgroundMusic() {
        audiobg.volume = musicslider.value; // Set initial volume
        audiobg.play().catch(function (error) {
            console.log('Playback prevented by browser: ', error);
        });
    }

    musicslider.addEventListener("input", function () {
        audiobg.volume = this.value;
    });

    soundslider.addEventListener("input", function () {
        audiopop.volume = this.value;
    });

    document.addEventListener('visibilitychange', function () {
        if (document.hidden) {
            audiobg.pause();
        } else {
            playBackgroundMusic();
        }
    });
    audiobg.addEventListener('ended', function () {
        playBackgroundMusic();
    });
    playBackgroundMusic();
    body.addEventListener("mouseenter", playBackgroundMusic);
});

//Share
document.getElementById("shareButton").addEventListener("click", function () {
    var share = document.getElementById("shareUI");
    var audiopop = document.getElementById("soundPOP");
    audiopop.play();
    share.classList.remove("invisible");
    share.classList.remove("pop-out");
    share.classList.add("pop-in");
});

document.getElementById("shareUI").addEventListener("click", function () {
    var share = document.getElementById("shareUI");
    share.classList.remove("pop-in");
    share.classList.add("pop-out");
    share.addEventListener("animationend", function animationEndHandler() {
        share.classList.add("invisible");
        share.classList.remove("pop-out");
        this.removeEventListener("animationend", animationEndHandler);
    });
});

document.getElementById("shareBOX").addEventListener("click", function (event) {
    event.stopPropagation();
});

const share = () => {
    const url = 'https://www.youtube.com/';
    if (navigator.share) {
        navigator.share({
            title: 'Lit It Up',
            text: 'Checkout this game called Lit It Up!',
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
    var url = "https://www.youtube.com/";
    navigator.clipboard.writeText(url).then(() => {
    var floatCopy = document.getElementById("floatCopy");
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
document.getElementById('nativeShare').addEventListener('click', share);
document.getElementById('linkShare').addEventListener('click', copyToClipboard);

//Credit
document.getElementById("creditButton").addEventListener("click", function () {
    var credit = document.getElementById("creditUI");
    var audiopop = document.getElementById("soundPOP");
    audiopop.play();
    credit.classList.remove("invisible");
    credit.classList.remove("pop-out");
    credit.classList.add("pop-in");
});

document.getElementById("creditUI").addEventListener("click", function () {
    var credit = document.getElementById("creditUI");
    credit.classList.remove("pop-in");
    credit.classList.add("pop-out");
    credit.addEventListener("animationend", function animationEndHandler() {
        credit.classList.add("invisible");
        credit.classList.remove("pop-out");
        this.removeEventListener("animationend", animationEndHandler);
    });
});

document.getElementById("creditBOX").addEventListener("click", function (event) {
    event.stopPropagation();
});

//Information
document.getElementById("informationButton").addEventListener("click", function () {
    var information = document.getElementById("informationUI");
    var audiopop = document.getElementById("soundPOP");
    audiopop.play();
    information.classList.remove("invisible");
    information.classList.remove("pop-out");
    information.classList.add("pop-in");
});

document.getElementById("informationUI").addEventListener("click", function () {
    var information = document.getElementById("informationUI");
    information.classList.remove("pop-in");
    information.classList.add("pop-out");
    information.addEventListener("animationend", function animationEndHandler() {
        information.classList.add("invisible");
        information.classList.remove("pop-out");
        this.removeEventListener("animationend", animationEndHandler);
    });
});

document.getElementById("informationBOX").addEventListener("click", function (event) {
    event.stopPropagation();
});

//guide
document.getElementById("guide").addEventListener("click", function () {
    var guide = document.getElementById("guideUI");
    var esc = document.getElementById("escUI");
    var audiopop = document.getElementById("soundPOP");
    if(guide.classList.contains("invisible")){    
        if(esc.classList.entries("invisible")){
            esc.classList.remove("pop-in");
            esc.classList.add("pop-out");
            esc.addEventListener("animationend", function animationEndHandler() {
                esc.classList.add("invisible");
                esc.classList.remove("pop-out");
                this.removeEventListener("animationend", animationEndHandler);
            });
        }
        audiopop.play();
        guide.classList.remove("invisible");
        guide.classList.remove("pop-out");
        guide.classList.add("pop-in");
    }else{
        guide.classList.remove("pop-in");
        guide.classList.add("pop-out");
        guide.addEventListener("animationend", function animationEndHandler() {
            guide.classList.add("invisible");
            guide.classList.remove("pop-out");
            this.removeEventListener("animationend", animationEndHandler);
        });
    }
});

document.getElementById("guideUI").addEventListener("click", function () {
    var guide = document.getElementById("guideUI");
    guide.classList.remove("pop-in");
    guide.classList.add("pop-out");
    guide.addEventListener("animationend", function animationEndHandler() {
        guide.classList.add("invisible");
        guide.classList.remove("pop-out");
        this.removeEventListener("animationend", animationEndHandler);
    });
});

document.getElementById("guideBOX").addEventListener("click", function (event) {
    event.stopPropagation();
});

//esc
document.getElementById("esc").addEventListener("click", function () {
    var guide = document.getElementById("guideUI");
    var esc = document.getElementById("escUI");
    var audiopop = document.getElementById("soundPOP");
    if(esc.classList.contains("invisible")){  
        if(guide.classList.entries("invisible")){
            guide.classList.remove("pop-in");
            guide.classList.add("pop-out");
            guide.addEventListener("animationend", function animationEndHandler() {
                guide.classList.add("invisible");
                guide.classList.remove("pop-out");
                this.removeEventListener("animationend", animationEndHandler);
            });
        }  
        audiopop.play();
        esc.classList.remove("invisible");
        esc.classList.remove("pop-out");
        esc.classList.add("pop-in");
    }else{
        esc.classList.remove("pop-in");
        esc.classList.add("pop-out");
        esc.addEventListener("animationend", function animationEndHandler() {
            esc.classList.add("invisible");
            esc.classList.remove("pop-out");
            this.removeEventListener("animationend", animationEndHandler);
        });
    }
});

document.getElementById("escUI").addEventListener("click", function () {
    var esc = document.getElementById("escUI");
    esc.classList.remove("pop-in");
    esc.classList.add("pop-out");
    esc.addEventListener("animationend", function animationEndHandler() {
        esc.classList.add("invisible");
        esc.classList.remove("pop-out");
        this.removeEventListener("animationend", animationEndHandler);
    });
});

document.getElementById("escBOX").addEventListener("click", function (event) {
    event.stopPropagation();
});