import React from "react"
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useNavigate } from "react-router-dom"

function CreateBunny(){
  const navigate = useNavigate()
  
    const formSchema = yup.object().shape({
        name: yup.string().required('You must enter a name.'),
        description: yup.string().required('You must enter a description.'),
       
      })
    
      const formik = useFormik({
        initialValues: {
          name: '',
          description: '',
          headshot: 'https://i.ibb.co/yPtwkYk/bunni.png'
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
          fetch('/api/bunnies', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
          }).then((res) => {
            if (res.ok) {
              res.json().then((response) => {
                console.log(response)
                navigate('/')
              })
            }
          })
        },
      })

    return(
        <div className="container">
        <h5 className="flush-left">New Bunny!</h5>
        <form onSubmit={formik.handleSubmit}>
            <input
                type = "text"
                name = "name"
                placeholder = "bunny name"
                value = {formik.values.name}
                onChange = {formik.handleChange}
            /> <br/>
            <input
                type = "text"
                name = "description"
                placeholder = "bunny description"
                value = {formik.values.description}
                onChange = {formik.handleChange}
            /> <br/>
            <br/>
            <button type="submit">save</button>
        </form>
        {formik.errors && (
        <div className="errors">
          <ul>
            {Object.values(formik.errors).map((error, index) => (
              <h6 key={index} style={{ color: 'red' }}>{error}</h6>
            ))}
          </ul>
        </div> 
        )}
        </div>
    )
}

export default CreateBunny