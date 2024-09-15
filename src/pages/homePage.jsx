import { useState } from 'react';
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

export function HomePage() {
    const [selectedLevelIndex, setSelectedLevelIndex] = useState(null);

    const handleLevelSelect = (index) => {
        setSelectedLevelIndex(index);
        console.log("Level", index + 1, "Selected");
        localStorage.setItem('selectedLevelIndex', index);

      };
    return (
        <>
            <Cutscene/>
            <NotiShare/>
            <NotiCredit/>
            <NotiInfo/>
            <NotiSetting/>
            <NotiSelect onLevelSelect={handleLevelSelect}/>
            <Menu/>
            {/* <Link to="/gamePage">gamePage</Link> */}
            <Canvas>
            <color attach="background" args={["#a8def0"]} />
                <Preview />
            </Canvas>
        </>
    );
}
