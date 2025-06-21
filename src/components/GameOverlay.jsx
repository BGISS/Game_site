import "./GameOverlay.css"
import { useNavigate } from "react-router"
import dodo from "../assets/dodo 3.png"

function GameOverlay({message}){
    const naviagte = useNavigate()
    function onClick(){
        naviagte('/')
    }
    return(
        <div className="game-overlay">
            <img src={dodo}/>
            <div className="overlay-message">
                  <p>{message}</p>
                  <button className="pixel-button" onClick={onClick}>Main Page</button>
            </div>         
        </div>
    )
}
export default GameOverlay