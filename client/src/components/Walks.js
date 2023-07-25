import React, { useEffect, useState } from "react"


function Walks(){
    const [walks, setWalks] = useState(null)
    
    useEffect(()=>{
        fetch("/walks")
        .then(r => r.json())
        .then(data =>setWalks(data))
    }, [])


    const handleDelete = (deleteID) => {
        fetch(`/walks/${deleteID}`, {
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
        <div className="container-walks">
          Walk Archive
        {walks && walks.map((walk)=> {
            return(
                <div key={walk.id} className="card-walks">
                    <h1 className="count-walks">{walk.bunny_count} bunnies seen!</h1>
                    <h2 className="name-walks" >{walk.date} : {walk.start_time} - {walk.end_time}</h2>
                    <h5 className="description-walks">Walk Path: {walk.walk_path}</h5>
                    <button onClick={() => handleDelete(walk.id)}>delete</button>
                </div>
            )
        })}
        </div>
    )
}

export default Walks