
import { useNavigate } from "react-router-dom";


export default function Confirmation({ onNext, seatSelection }) {
 const navigate = useNavigate();
 const handleClick=()=>{
   navigate("/sets");
 }
  return (
    <div className="App">
      <h1>Your set is confirm </h1>
      <h2>Start editing to see some magic happen!</h2>
      <button onClick={handleClick}> available Seats</button>
    </div>
  );
}
