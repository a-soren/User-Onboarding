import React, {useState, useEffect} from 'react';
import { withFormik, Form, Field }from 'formik';
import * as Yup from 'yup';
import Axios from 'axios';

function InputForm({ values, errors, touched, status}){
    const [users, setUsers]=useState([]);
    useEffect(()=>{
        if (status){
            setUsers([...users, status])
        }

    }, [status])
    return(
        <div>
            <Form>
            <div>
                {touched.name && errors.name && <p>{errors.name}</p>}
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
                {touched.email && errors.email && <p>{errors.email}</p>}
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
               {touched.errors && errors.password && <p>{errors.password}</p>}
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
        {users.map(user=>(
            <ul key={user.id}>
                <li key={user.name}>Name:{user.name}</li>
                <li key={user.email}>Email:{user.email}</li>
                <li key={user.password}>Password:{user.password}</li>
            </ul>
        ))}
        </div>
        
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

    handleSubmit(values, {setStatus}){
        console.log(values);
        Axios
        .post('https://reqres.in/api/users', values)
        .then(res=>{
            setStatus(res.data); 
        })
        .catch(err=>{
            console.log(err.res);
        })
    }

})(InputForm)

export default InputFormApp;