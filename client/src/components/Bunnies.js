import React from "react"

function Bunnies({bunnies, setBunnies}) {
  const handleDelete = (deleteID) => {
    fetch(`/bunnies/${deleteID}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status === 204) {
          console.log("Bunny deleted successfully!")
          setBunnies((prevBunnies) => prevBunnies.filter((bunny) => bunny.id !== deleteID))
        } else {
          console.error("Failed to delete bunny.")
        }
      })
      .catch((error) => {
        console.error("Error while deleting bunny:", error)
      })
  }

  return (
    <div className="container-bunnies">
      Saved Bunnies
      {bunnies &&
        bunnies.map((bunny) => (
          <div key={bunny.id} className="card-bunnies">
            <img className="card-bunnies-image" src={bunny.headshot} alt={`Headshot of ${bunny.name}`} />
            <h1 className="name-bunnies">{bunny.name}</h1>
            <h5 className="description-bunnies">{bunny.description}</h5>
            <button className="delete" onClick={() => handleDelete(bunny.id)}>delete</button>
          </div>
        ))}
    </div>
  )
}

export default Bunnies