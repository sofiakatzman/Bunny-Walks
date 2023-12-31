import React, { useEffect, useState } from "react"


function Walks(){
    const [walks, setWalks] = useState(null)
    
    useEffect(()=>{
        fetch("/api/walks")
        .then(r => r.json())
        .then(data =>setWalks(data))
    }, [])


    const handleDelete = (deleteID) => {
        fetch(`/api/walks/${deleteID}`, {
          method: "DELETE",
        })
          .then((response) => {
            if (response.status === 204) {
              console.log("Path deleted successfully!")
              setWalks((prevWalks) => prevWalks.filter((walk) => walk.id !== deleteID))
            } else {
              console.error("Failed to delete walk.")
            }
          })
          .catch((error) => {
            console.error("Error while deleting walk:", error)
          })
      }

    return(
      <>
      <h5 className="flush-left">Walks </h5>
        <div className="container-walks">
          
        {walks && walks.map((walk)=> {
            return(
                <div key={walk.id} className="card-walks">
                    <h5 className="count-walks">{walk.bunny_count} bunnies seen!</h5>
                    <p className="name-walks" >{walk.date} <br/>{walk.start_time} - {walk.end_time}</p>
                    <p className="description-walks">Walk Path: {walk.walk_path}</p>
                    <button onClick={() => handleDelete(walk.id)}>delete</button><br/>
                </div>
            )
        })}
        </div></>
    )
}

export default Walks