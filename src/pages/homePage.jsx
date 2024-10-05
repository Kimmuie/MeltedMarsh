// import React, { createContext, useState } from 'react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from '../components/sectionMenu';
import { NotiShare } from '../components/notiShare';
import { NotiCredit } from '../components/notiCredit';
import { NotiInfo } from '../components/notiInfo';
import { NotiSetting } from '../components/notiSetting';
import { NotiSelect } from '../components/notiSelect';
import { Cutscene } from '../components/cutscene';
import { Canvas } from "@react-three/fiber";
import { Preview } from '../components/Preview';


// export const audioContext = React.createContext();

export function HomePage() {
    const [selectedLevelIndex, setSelectedLevelIndex] = useState(null);
    // const [audio, setAudio] = useState({
    //     Music: 0.5,
    //     SFX: 0.5
    // })

    // const [gameState, setGameState] = useState({
    //     isPlaying: false,
    //     isPaused: false,
    //     isGameOver: false,
    //     isLevelComplete: false,
    //     isCutscenePlaying: false,
    //     audio: {
    //         Music: 0.5,
    //         SFX: 0.5
    //     }
    // });

    const handleLevelSelect = (index) => {
        setSelectedLevelIndex(index);
        console.log("Level", index + 1, "Selected");
        localStorage.setItem('selectedLevelIndex', index);

      };
    return (
        <>
            {/* <audioContext.Provider value={{ audio, setAudio }}> */}
                <Cutscene/>
                <NotiShare/>
                <NotiCredit/>
                <NotiInfo/>
                <NotiSetting/>
                <NotiSelect onLevelSelect={handleLevelSelect}/>
                <Menu/>
                <Canvas>
                <color attach="background" args={["#a8def0"]} />
                    <Preview />
                </Canvas>
            {/* </audioContext.Provider> */}

        </>
    );
}
