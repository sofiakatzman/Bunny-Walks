import React from "react"
import { useFormik } from 'formik'
import * as yup from 'yup'

function CreateBunny(){

    const formSchema = yup.object().shape({
        name: yup.string().required('You must enter a name.'),
        description: yup.string().required('You must enter a description.'),
        headshot: yup.string().required('You must enter a headshot url.')
      })
    
      const formik = useFormik({
        initialValues: {
          name: '',
          description: '',
          headshot: ''
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
          fetch('/bunnies', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
          }).then((res) => {
            if (res.ok) {
              res.json().then((response) => {
                console.log(response)
              })
            }
          })
        },
      })

    return(
        <div><br/>
        new bunny!
        <br/>
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
            <input
                type = "text"
                name = "headshot"
                placeholder = "bunny photo url"
                value = {formik.values.headshot}
                onChange = {formik.handleChange}
            /> <br/>
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