import "./Countdown.css"
import { useState,useEffect } from "react";
function Countdown({time,onTimeDone}){

   const [timeLeft, setTimeLeft] = useState(time);
   useEffect(() => {
    if (timeLeft <= 0){
        onTimeDone();
        return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(intervalId); 
  }, [timeLeft]);
    return(
        <div className="count-cont">
            <p>You have <span className="time">{timeLeft}</span> seconds to memorize</p>
        </div>
    )
}
export default Countdown;