import React from "react"
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate()

    return (
      
        <span className="home">
          Welcome to Bunny Walks! <br /><br />
          <p className="home">Keep track of your walking adventures, discover familiar bunnies, and tally up how many you encounter on your walks! 
          <br /><br />
          When you click "Start Walk," the date and time will be recorded. <br />
          By clicking on any bunny, you add them to your total bunny count. <br /><br />
  
          Spotted a bunny that's not familiar? <br />
          Add them as a "Random Bunny" and give them a profile later on! <br /><br />
  
          After completing your walk, choose the path you took. <br /> 
          If it was a new path, or maybe not a path at all, simply choose "Random"! <br /><br />
  
          When you're ready, click "Save Walk" to log your walk details and bunny tally! <br /><br />
  
          Want to revisit your previous walks? <br />
          Click 'Walks' in the navigation bar to view your walk history. <br /><br /><br />

          Happy Tallying! <br /><br />


            <button onClick={()=> navigate('/create/walk')}>new walk!</button></p>
        </span>
      
    );
  }
export default Home