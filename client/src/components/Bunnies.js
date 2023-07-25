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
    <>
      {bunnies &&
        bunnies.map((bunny) => (
          <div key={bunny.id}>
            <h1>{bunny.name}</h1>
            <h2>{bunny.description}</h2>
            <img src={bunny.headshot} alt={`Headshot of ${bunny.name}`} />
            <button onClick={() => handleDelete(bunny.id)}>delete</button>
          </div>
        ))}
    </>
  )
}

export default Bunnies