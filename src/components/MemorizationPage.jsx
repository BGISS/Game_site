import { Image } from "react-bootstrap"
import cloud from "../assets/uppercloud.png"
import { useLocation } from 'react-router';
import  Objects  from "../assets"
import { Nature } from "../assets";
import "./MemorizationPage.css"
import Countdown from "./Countdown"
import { useState,useEffect } from "react"
import GameOverlay from "./GameOverlay"

function MemorizationPage(){
    const location = useLocation();
    const { difficulty, category } = location.state || {};

    const [noShow,setNoShow]= useState(false)
    const [hasWon,setHasWon]=useState(false);
    const [hasLost,setHasLost]=useState(false);
    const [numberWrong,setNumberWrong]= useState(0);

    //Sets images and text based on user choice
    const objects = category === "Objects" ? [
    { image: Objects.coat, text: "palto" },
    { image: Objects.marble, text: "kanet" },
    { image: Objects.swimming, text: "natasion" },
    { image: Objects.house, text: "lacaz" },
    { image: cloud, text: "nyaze" },
    { image: Objects.gum, text: "chingham" }
    ] : [
    { image: Nature.parrot, text: "kakatwa" },
    { image: Nature.hibiscus, text: "ibiskis" },
    { image: Nature.tree, text: "pied" },
    { image: Nature.cabbage, text: "li sou" },
    { image: Nature.cauliflower, text: "soufleur" },
    { image: Nature.trochetia, text: "trochetia" }];

    const [wrongAttempt, setWrongAttempt] = useState(false);
    const [shuffledText,setShuffledText]= useState([]);
    const [shuffledImages,setShuffledImages]= useState(objects);
    const [selectedImageId, setSelectedImageId] = useState(null);
    const [selectedTextId, setSelectedTextId] = useState(null);
    const [matchedPairs, setMatchedPairs] = useState([]); 

    let time=5
    switch(difficulty){
        case "Normal":
            time=8;
            break;
        case "Hard":
            time=6;
            break;
        case "Zilwa":
            time=5;
            break;
    }
    function handleSelectImage(id) {
        if (matchedPairs.some(pair => pair.imageId === id)) return; 
        setSelectedImageId(id);
    }

    function handleSelectText(id) {
        if (matchedPairs.some(pair => pair.textId === id)) return; 
        setSelectedTextId(id);
    }
    //Main game state checks
    useEffect(() => {
        if (selectedImageId !== null && selectedTextId !== null) {
            if (selectedImageId === selectedTextId) {
            setMatchedPairs((prev) => [
                 ...prev,
            { imageId: selectedImageId, textId: selectedTextId },
                ]);
        }else{
            setWrongAttempt(true);
            setNumberWrong((prev)=>prev+1)
        }
            
   
            const timer = setTimeout(() => {
                setSelectedImageId(null);
                setSelectedTextId(null);
                setWrongAttempt(false);
            }, 500);
         return () => clearTimeout(timer);
    }
    }, [selectedImageId, selectedTextId]);

    //Check win condition
    useEffect(() => {
        if (matchedPairs.length === objects.length) {
            setHasWon(true); 
        }
    }, [matchedPairs]);
    //Check lose condition
    useEffect(()=>{
        if(numberWrong==3){
            setHasLost(true);
        }
    },[numberWrong])

    function onTimeDone(){
        setNoShow(true);
        const withIds = objects.map((obj, index) => ({ ...obj, id: index }));
        const shuffledImgs = [...withIds].sort(() => Math.random() - 0.5);
        const shuffledTexts = [...withIds].sort(() => Math.random() - 0.5);
        setShuffledImages(shuffledImgs);
        setShuffledText(shuffledTexts);
    }
    return(
        <div className="memo-cont">
        <div className="cloud-cont"><Image  src={cloud} className="img"/>
         <div className="game-info"><p>Category: {category}</p> 
         <p>Difficulty: {difficulty}</p>
         </div>
        {!noShow && <div className="count">
            <Countdown time={time} onTimeDone={onTimeDone}/>
         </div>}
         {noShow && <div className="wrong-attempts">
            <p>You have <span className="num-attempts">{3-numberWrong}</span> attempts left</p>
            </div>}
        </div>
        <div className="memo-images">
           {shuffledImages.map((object,id)=>{
                  if (matchedPairs.find((pair) => pair.textId === object.id)) return null;
                return(
              <div
                className={`img-container 
                    ${selectedImageId === object.id ? 'selected' : ''} 
                    ${wrongAttempt && selectedImageId === object.id ? 'wrong' : ''}`}
                 onClick={() => {noShow?handleSelectImage(object.id):""}}>

                <img src={object.image}/>
                {!noShow && (
    <div className="img-body">
      <p className="img-text">{object.text}</p>
    </div>)}
                </div>)})}
          </div>      
        {noShow && 
            <div className="names">
                {objects && shuffledText.map((object,idx)=>(
                    <div className={`name-text 
                        ${selectedTextId === object.id ? 'selected' : ''} 
                        ${matchedPairs.some(p => p.textId === object.id) ? 'matched' : ''}
                         ${wrongAttempt && selectedTextId === object.id ? 'wrong' : ''}
                        `} onClick={()=>handleSelectText(object.id)} key={object.id}>{object.text}</div>
                ))}
            </div>
        }
        {hasWon && (
         <GameOverlay
            message="Congratulations! You won!"
            />
            )}
        {hasLost &&(
            <GameOverlay 
            message="Better luck next time!"
            />
        )
            
        }
            
        </div>
    )
}

export default MemorizationPage