import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

export function NotiSelect({ onLevelSelect }) {
  const navigate = useNavigate();
  const [levelData, setLevelData] = useState([]);
  const [lastClickedButton, setLastClickedButton] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    fetch('level.json')
      .then(response => response.json())
      .then(data => {
        setLevelData(data);
      })
      .catch(error => console.error('Error fetching the JSON data:', error));
  }, []);

  const medal = useMemo(() => ({
    OOO: {
      Reached: false,
      Rapided: false,
      Explored: false,  
    },
    AOO: {
      Reached: true,
      Rapided: false,
      Explored: false,  
    },
    ABO: {
      Reached: true,
      Rapided: true,
      Explored: false,  
    },
    AOC: {
      Reached: true,
      Rapided: false,
      Explored: true,  
    },
    ABC: {
      Reached: true,
      Rapided: true,
      Explored: true,  
    },
  }), []);

  const handleButtonClick = (event, index) => {
    if (lastClickedButton !== null) {
      lastClickedButton.classList.remove('border-sap');
      lastClickedButton.classList.add('border-woodO');
    }
    event.currentTarget.classList.remove('border-woodO');
    event.currentTarget.classList.add('border-sap');
    setLastClickedButton(event.currentTarget);
  
    const allLevelNumbers = document.querySelectorAll('.levelCount');
    allLevelNumbers.forEach(elem => {
      elem.classList.remove('bg-sap', 'text-woodO');
      elem.classList.add('bg-woodO', 'text-whiteC');
    });
  
    const levelNumberElement = event.currentTarget.querySelector('.levelCount');
    levelNumberElement.classList.remove('bg-woodO', 'text-whiteC');
    levelNumberElement.classList.add('bg-sap', 'text-woodO');
  
    setSelectedIndex(index);
    onLevelSelect(index);
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

  const MedalIcon = ({ type, earned }) => (
    <div className={`border-woodO border-3 rounded-full h-7 w-7 m-1 ${earned ? 'bg-sap border-2' : 'bg-woodI '}`}>
      {earned && <img src={`./img/medal${type}.svg`} width="128" className="p-1" alt={`${type} medal`} />}
    </div>
  );

  return (
    <div onClick={notiSelectClose} id="selectUI" className="homeMenu absolute w-full h-full flex justify-center items-center invisible z-20">
      <div onClick={notiSelectExcept} id="selectBOX" className="flex flex-col items-center h-112 w-144 box-border bg-woodI border-4 border-woodO rounded-3xl absolute z-20">
        <div className="relative flex justify-center font-bold z-30 h-8 w-28 box-border rounded-b-lg bg-woodO text-whiteC mb-5">
          Select Level
        </div>
        <div id="levelContainer" className="w-full flex justify-center flex-wrap gap-4">
          {levelData.map((level, index) => (
            <div key={index} className="level-item flex justify-center hover:scale-95">
              <button
                className="flex justify-center items-center flex-col h-28 w-28 rounded-xl bg-center bg-cover border-woodO box-border border-4 levelHover hover:scale-110"
                onClick={event => handleButtonClick(event, index)}
                style={{ backgroundImage: `url('./img/level/test.level.jpg')` }}
              >
                <div className=" text-whiteC font-bold text-xl h-8 w-9 rounded-full bg-woodO border-woodO border-3 mt-4 mb-2 levelB levelCount z-10">{level.level}</div>
                <div className="flex flex-row justify-center levelB z-10">
                  <div className="group flex justify-center">
                    <MedalIcon type="Reached" earned={medal[level.medalEarned]?.Reached} />
                    <MedalIcon type="Rapided" earned={medal[level.medalEarned]?.Rapided} />
                    <MedalIcon type="Explored" earned={medal[level.medalEarned]?.Explored} />
                  </div>
                </div>
              </button>
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