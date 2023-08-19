import React from "react"
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate()

    return (
      
        <span className="home">
          <h5 className="flush-left">Welcome, Max & Nicole!</h5>
          <p className="home">
          This app was made just for you and your bunny walks! 
          <br/><br/>
          Keep tally of all your cute furry friends (and even the not so cute ones) and how many of them you see on your walks! <br /><br />
          Some fun updates coming sooon!<br/> If you have any requests, you know where to find us! 
          <br/><br/>
          With lots of Love, <br/>
          Harri and Sof 
         <br /><br />

            <button onClick={()=> navigate('/create/walk')}>new walk!</button></p>
        </span>
      
    );
  }
export default Home