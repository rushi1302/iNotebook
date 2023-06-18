import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = (props) => {
    const [credentials, setcredentials] = useState({ name: "", email: "", password: "" })
    let navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/auth/createuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            localStorage.setItem('token', json.authtoken);
            navigate('/')
            props.showAlert("success", "User Added Successfully Successful");
        }
        else {
            props.showAlert("danger", "Please Use Correct Credential.");

        }

    }
    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div className='my-3'>
            <h2>Create a new account for iNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Name</label>
                    <input type="text" className="form-control" value={credentials.name} name='name' onChange={onChange} id="name" placeholder="name@gamil.com" minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Email</label>
                    <input type="email" className="form-control" value={credentials.email} name='email' onChange={onChange} id="email" placeholder="" minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} name='password' onChange={onChange} id="password" autoComplete='true' minLength={5} required />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form >
        </div>

    )
}

export default SignUp
