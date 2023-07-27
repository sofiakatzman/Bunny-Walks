import React, { useState, useEffect } from "react"
import moment from "moment"
import { useFormik } from 'formik'
import * as yup from 'yup'

function CreateWalk({bunnies, setBunnies}) {
  // State variables
  const [walk, setWalk] = useState(false)
  const [date, setDate] = useState("")
  const [startTime, setStartTime] = useState("")
  const [paths, setPaths] = useState(null)
  const [count, setCount] = useState(0)
  const [spottedBunnies, setSpottedBunnies] = useState([])

  const [savedWalk, setSavedWalk] = useState(null)
  
  useEffect(() => {
    fetch("/api/paths")
        .then(r => r.json())
        .then(data => setPaths(data))
  }, [])

  // Form validation schema
  const formSchema = yup.object().shape({
    walk_path: yup.number().required('You must select a path.'),
  })

  const formik = useFormik({
    initialValues: {
      date: "",
      start_time: "",
      end_time: "",
      bunny_count: "",
      walk_path: "",
      spotted_bunnies: ""
    },
    validationSchema: formSchema,
    validate: (values) => {
      const errors = {};

      // Calculate bunny_count based on the spottedBunnies array length
      const bunny_count = spottedBunnies.length;
      if (bunny_count === 0) {
        errors.bunny_count = "You must save at least one bunny to your walk.";
      }

      return errors;
    },
    onSubmit: (values) => {
      values.end_time = moment().format('LT')
      values.start_time = startTime
      values.bunny_count = count
      values.date = date
      values.spotted_bunnies = spottedBunnies
          
      fetch('/api/walks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
      .then((res) => {
        if (res.ok) {
          res.json().then((response) => {
            setSavedWalk(response) 
          })
        } else {
          console.error("Failed to save the walk.")
        }
      })
      .catch((error) => {
        console.error("Error occurred while saving the walk:", error)
      })
      setCount(0)
      setSpottedBunnies([])
      setWalk(!walk)
    },
  })

  const handleStartWalk = () => {
    setWalk(!walk)
    setStartTime(moment().format('LT'))
    setDate(moment().format('l'))
  }

  const handleAddBunny = (bunny_id) => {
    console.log(bunny_id)
    let new_count = count + 1
    setCount(new_count)
    setSpottedBunnies([...spottedBunnies, bunny_id])
  }

  // Display when a walk has not been started
  if(!walk && savedWalk){
    console.log(savedWalk)
    return(
      <div className="walk-card"> 
      <h1>Walk added!</h1>
      <p>Bunnies Spotted: {savedWalk.bunny_count}</p>
      <p>Time Started: {savedWalk.start_time}</p>
      <p>Time Ended: {savedWalk.end_time}</p>


      <button onClick={()=>setSavedWalk(null)}>exit</button>
      </div>
    )
  }



  if (!walk) {
    return (
      <div className="new-walk"> <br/><br/>
              <button onClick={handleStartWalk}>Start Walk</button> <br/>
      </div>
    )
  }

  // Display when a walk has been started
  return (
    <div className="new-walk"> <br/>
      <h2 >{count} bunnies seen!</h2>
    
    {bunnies && <div className="container-seen-bunnies">
        
        
        <p>click on any of these bunnies when you see them to add them to the tally! <br/>

        spot a new bunny? use the "random bunny" button!       
        </p>
        {bunnies.map(bunny => {
            return(
                //will need to add css to this so they show very small 
                <div className="card-bunnies-seen" key={`bunny${bunny.id}`} onClick={() => handleAddBunny(bunny.id)}>
                  <img className="card-bunnies-image-seen" src={bunny.headshot} alt={`Headshot of ${bunny.name}`} />
                  <h5 className="name-bunnies-seen">{bunny.name}</h5>
  
                </div>
            )
        })}
          
        </div>}
          
   
      <p>walk date: {date} <br/>
      walk start time: {startTime}</p>
      <form onSubmit={formik.handleSubmit}>
        <select
          name="walk_path"
          value={formik.values.walk_path}
          onChange={formik.handleChange}
        >
          <option value="">Select a path</option>
          {paths && paths.map((path) => (
            <option key={`path${path.id}`} value={path.id}>
              {path.name.toLowerCase()}
            </option>
          ))}
        </select>

        {/* formik error handling in case there were issues storing values -- shouldnt be triggered */}
        {formik.errors && (
          <div className="errors">
            <ul>
              {Object.values(formik.errors).map((error, index) => (
                <h6 key={`error${index}`} style={{ color: 'red' }}>{error}</h6>
              ))}
            </ul>
          </div>
        )}
        <br/>
        <button type="submit">save walk</button>
      </form>
    </div>
  )
}

export default CreateWalk
