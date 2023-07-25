import React, { useState, useEffect } from "react"

function Paths(){
    const [paths, setPaths] = useState(null)
    
    useEffect(()=>{
        fetch("/paths")
        .then(r => r.json())
        .then(data =>setPaths(data))
        console.log(paths)
    }, [])

    const handleDelete = (deleteID) => {
        fetch(`/paths/${deleteID}`, {
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
        <>
        {paths && paths.map(path=> {
            return(
                <div key={path.id}>
                    <h2>{path.name}</h2>
                    <h3>{path.directions}</h3>
                    <button onClick={() => handleDelete(path.id)}>delete</button>
                </div>
            )
        })}
        </>
    )
}

export default Paths