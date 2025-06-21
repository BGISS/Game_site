import { Image } from "react-bootstrap";
import "./StartPage.css"
import Toggle from "./Toggle"
import { useState } from "react";
import boat from "../assets/boat.png"
import { useNavigate } from 'react-router';


function StartPage(){
    const [category, setCategory] = useState('Objects');
    const [difficulty,setDifficulty]= useState('normal');
    const navigate = useNavigate();
    const categoryOptions=["Objects","Nature"];
    const difficultyOptions=["Normal","Hard","Zilwa"]

    function handleBoatClick(){
          const dataToSend = { difficulty:difficulty, category:category };
          navigate('/game',{state:dataToSend})
    }

    return(
        <>
        <div className="start-container">
            <div className="title"><p>Mauritianisme</p></div>
            <div className="categories"><p className="category-text">Categories</p></div>
            <div className="all-categories">
                <div className="category-cont">
                    <Toggle 
                    options={categoryOptions}
                    initialValue={categoryOptions[0]}
                    onChange={setCategory}
                    />
                </div>
            
            </div>
            <div className="difficulty"><p className="difficulty-text">Difficulty</p></div>
            <div className="difficulty-cont">
                <Toggle
                options={difficultyOptions}
                initialValue={difficultyOptions[0]}
                onChange={setDifficulty}
                />
            </div>
            <div className="start-boat-wrapper">
            <div className="start">
                <p className="start-text">Press boat to start</p>
            </div>
            <div className="boat-cont">
                <Image className="boat-img" src={boat} onClick={handleBoatClick}/>
            </div>
            </div>
        </div>
        </>
    )
}

export default StartPage