import React from 'react';
import { withFormik, Form, Field }from 'formik';
import * as Yup from 'yup';
import Axios from 'axios';

function InputForm({ values, errors, touched}){
    return(
        <Form>
            <div>
                {/* {touched.name && errors.name && <p>{errors.name}</p>} */}
                <label>
                     Name:
                    <Field
                        type=''
                        name='name'
                        placeholder='Name'
                    />
                </label>
            </div>
            
            
                
            <div>
                {/* {touched.email && errors.email && <p>{errors.email}</p>} */}
                <label>
                    Email:
                    <Field
                        type='email'
                        name='email'
                        placeholder='Email'
                    />
                </label>
            </div>

           <div>
               {/* {touched.errors && errors.password && <p>{errors.password}</p>} */}
                <label>
                    Password:
                    <Field
                        type='password'
                        name='password'
                        placeholder='Password'
                    />
                </label>
           </div>

            <label>
                Do you accept Terms and Conditions?
                <Field
                type='checkbox'
                name='terms'
                checked={values.terms}
                />
            </label>
            
            <button type='submit'>Submit</button>
        </Form>
    )
}

const InputFormApp = withFormik({
    mapPropsToValues({
        name,
        email,
        password,
        terms,
    }){
        return{
            name: name||'',
            email: email||'',
            password:password||'',
            terms:terms||false, 
        }
    },
    validationSchema:Yup.object().shape({
        name:Yup.string().required(),
        email:Yup.string().email().required(),
        password: Yup.string().min(8).required(),


    }),

    handleSubmit(values, {}){
        console.log(values);
        Axios
        .post('https://reqres.in/api/users', values)
        .then(res=>{
            console.log(res) 
        })
    }

})(InputForm)

export default InputFormApp;