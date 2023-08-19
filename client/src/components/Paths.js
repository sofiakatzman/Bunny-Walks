import React, { useState, useEffect } from "react"

function Paths(){
    const [paths, setPaths] = useState(null)
    
    useEffect(()=>{
        fetch("/api/paths")
        .then(r => r.json())
        .then(data =>{setPaths(data)})

    }, [])

    const handleDelete = (deleteID) => {
        fetch(`/api/paths/${deleteID}`, {
          method: "DELETE",
        })
          .then((response) => {
            if (response.status === 204) {
              console.log("Path deleted successfully!")
              setPaths((prevPaths) => prevPaths.filter((path) => path.id !== deleteID))
            } else {
              console.error("Failed to delete bunny.")
            }
          })
          .catch((error) => {
            console.error("Error while deleting bunny:", error)
          })
      }

    return(
        <><h5 className="flush-left">Saved Paths</h5>
        <div className="container-paths">
        {paths && paths.map(path=> {
            return(
                <div key={path.id} className="card-path">
                    <h5 className="name-paths">{path.name}</h5>
                    <p className=""> {path.directions} </p><br/>
                    <button onClick={() => handleDelete(path.id)}>delete</button><br/>
                </div>
            )
        })}
        </div></>
    )
}

export default Paths