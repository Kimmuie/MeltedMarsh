import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function NotiSelect({ onLevelSelect }) {
  const navigate = useNavigate();
  const [levelData, setLevelData] = useState([]);
  const [lastClickedButton, setLastClickedButton] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    fetch('level.json')
      .then(response => response.json())
      .then(data => setLevelData(data))
      .catch(error => console.error('Error fetching the JSON data:', error));
  }, []);

  const handleButtonClick = (event, index) => {
    if (lastClickedButton !== null) {
      lastClickedButton.classList.remove('border-whiteC');
      lastClickedButton.classList.add('border-woodO');
    }
    event.currentTarget.classList.remove('border-woodO');
    event.currentTarget.classList.add('border-whiteC');
    setSelectedIndex(index);
    onLevelSelect(index);
    setLastClickedButton(event.currentTarget);
  };

  const notiSelectClose = () => {
    const select = document.getElementById('selectUI');
    select.classList.remove('pop-in');
    select.classList.add('pop-out');
    select.addEventListener('animationend', function animationEndHandler() {
      select.classList.add('invisible');
      select.classList.remove('pop-out');
      this.removeEventListener('animationend', animationEndHandler);
    });
  };

  const notiSelectExcept = event => {
    event.stopPropagation();
  };

  const runCutscene = () => {
    if (selectedIndex === null) {
      console.error("No level selected");
      return;
    }
    const cutscene = document.getElementById("cutscene");
    cutscene.classList.remove("popdown2");
    cutscene.classList.add("popdown1");
    cutscene.addEventListener("animationend", function animationEndHandler() {
      cutscene.classList.remove("popdown1");
      cutscene.classList.remove("outscene");
      cutscene.classList.add("inscene");
      setTimeout(() => {
        cutscene.classList.remove("inscene");
        cutscene.classList.add("outscene");
        cutscene.classList.add("popdown2");
        navigate(`/gamePage`);
      }, 2500);
        this.removeEventListener("animationend", animationEndHandler);
    });
  };
  return (
    <div onClick={notiSelectClose} id="selectUI" className="homeMenu absolute w-full h-full flex justify-center items-center invisible z-20">
      <div onClick={notiSelectExcept} id="selectBOX" className="flex flex-col items-center h-112 w-144 box-border bg-woodI border-4 border-woodO rounded-3xl absolute z-20">
        <div className="relative flex justify-center font-bold z-30 h-8 w-28 box-border rounded-b-lg bg-woodO text-whiteC mb-5">
          Select Level
        </div>
        <div id="levelContainer" className="w-full flex flex-wrap justify-center gap-4">
          {levelData.map((level, index) => (
            <div key={index} className="level-item flex justify-center hover:scale-95">
                  {[...Array(3)].map((_, i) => (
              <button
                className="flex justify-center items-center flex-col h-28 w-28 rounded-lg bg-center bg-cover border-woodO box-border border-4 levelHover hover:scale-110"
                onClick={event => handleButtonClick(event, index)}
                style={{ backgroundImage: `url('./img/level/level01.png')` }}
              >

                <div className="text-woodO font-bold text-xl h-8 w-9 rounded-full bg-whiteC mt-4 mb-2 levelB z-10">{level.level}</div>
                <div className="flex flex-row justify-center levelB z-10">
                  {[...Array(3)].map((_, i) => (
                    <img
                      key={i}
                      src={`./img/${i < level.score ? 'fire2' : 'fire1'}.svg`}
                      width="32"
                      height="32"
                      alt="fire icon"
                    />
                  ))}
                </div>
              </button>
                  ))}
            </div>
          ))}
        </div>
        <button onClick={runCutscene} id="selectStart" className="buttonUI font-bold h-20 w-44 mt-5 hover:scale-110">
          Start Game
        </button>
      </div>
    </div>
  );
}
