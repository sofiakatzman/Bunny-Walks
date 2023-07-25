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
        <>
        {walks && walks.map((walk)=> {
            return(
                <div key={walk.id}>
                    <h2>{walk.date} : {walk.bunny_count}</h2>
                    <h3>Walk Time: {walk.start_time} - {walk.end_time}</h3>
                    <h3>Walk Path: {walk.walk_path}</h3>
                    <button onClick={() => handleDelete(walk.id)}>delete</button>
                </div>
            )
        })}
        </>
    )
}

export default Walks