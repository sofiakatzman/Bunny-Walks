import React from "react"
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useNavigate } from "react-router-dom"

function CreatePath(){
    const navigate = useNavigate()
    const formSchema = yup.object().shape({
        name: yup.string().required('You must enter a name.'),
      })
    
      const formik = useFormik({
        initialValues: {
          name: '',
          directions: ''
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
          fetch('/api/paths', {
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
        <h5 className="flush-left">Create a Path</h5>
    
        <form onSubmit={formik.handleSubmit}>
            <input
                type = "text"
                name = "name"
                placeholder = "path name"
                value = {formik.values.name}
                onChange = {formik.handleChange}
            /> <br/>
            <input
                type = "text"
                name = "directions"
                placeholder = "path directions"
                value = {formik.values.description}
                onChange = {formik.handleChange}
            /> <br/><br/>
            
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

export default CreatePath