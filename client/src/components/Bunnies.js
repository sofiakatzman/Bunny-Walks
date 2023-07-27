import React, { useState } from "react"

function Bunnies({ bunnies, setBunnies }) {
  const [editMode, setEditMode] = useState(null)
  const [editedBunny, setEditedBunny] = useState({
    id: null,
    name: "",
    description: "",
  })

  const handleEdit = (bunny) => {
    setEditedBunny(bunny)
    setEditMode(bunny.id)
  }

  const handleSave = () => {
    fetch(`/api/bunnies/${editedBunny.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedBunny),
    })
      .then((response) => {
        if (response.status === 200) {
          console.log("Bunny updated successfully!")
          setBunnies((prevBunnies) =>
            prevBunnies.map((b) => (b.id === editedBunny.id ? editedBunny : b))
          )
          setEditedBunny({
            id: null,
            name: "",
            description: "",
          })
          setEditMode(null)
        } else {
          console.error("Failed to update bunny.")
        }
      })
      .catch((error) => {
        console.error("Error while updating bunny:", error)
      })
  }

  const handleDelete = (deleteID) => {
    fetch(`/api/bunnies/${deleteID}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status === 204) {
          console.log("Bunny deleted successfully!")
          setBunnies((prevBunnies) =>
            prevBunnies.filter((bunny) => bunny.id !== deleteID)
          )
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
            <img
              className="card-bunnies-image"
              src={bunny.headshot}
              alt={`Headshot of ${bunny.name}`}
            />
            {editMode === bunny.id ? (
              <>
                <input
                  value={editedBunny.name}
                  onChange={(e) =>
                    setEditedBunny((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
                <textarea
                  value={editedBunny.description}
                  onChange={(e) =>
                    setEditedBunny((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                />
                <button onClick={handleSave}>save</button>
              </>
            ) : (
              <>
                <h1 className="name-bunnies">{bunny.name}</h1>
                <h5 className="description-bunnies">{bunny.description}</h5>
                <button  onClick={() => handleEdit(bunny)}>
                  edit 
                </button>
                <button  onClick={() => handleDelete(bunny.id)}>
                  delete 
                </button>
              </>
            )}
          </div>
        ))}
    </div>
  )
}

export default Bunnies
