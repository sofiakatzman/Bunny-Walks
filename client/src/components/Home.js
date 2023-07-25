import React from "react"
import CreateWalk from "./CreateWalk"
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate()

    return (
      <div>
        <br />
        <span>
          Welcome to Bunny Walks! <br /><br />
          Keep track of your walking adventures, discover familiar bunnies, and tally up how many you encounter on your walks! 
          <br /><br />
          When you click "Start Walk," the date and time will be recorded. <br />
          By clicking the "Spotted" button next to any bunny, you add them to your total bunny count. <br /><br />
  
          Spotted a bunny that's not familiar? <br />
          Add them as a "Random Bunny" or even create a new bunny profile right then and there! <br /><br />
  
          After completing your walk, choose the path you took. If it was a new path, simply choose "Random"! <br /><br />
  
          When you're ready, click "Save Walk" to log your walk details and bunny tally! <br /><br />
  
          Want to revisit your previous walks? <br />
          Click 'Walks' in the navigation bar to view your walk history. <br />

            <button onClick={()=> navigate('/create/walk')}>new walk!</button>
        </span>
      </div>
    );
  }
export default Home