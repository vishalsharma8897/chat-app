import React, { useState,useEffect  } from 'react'
import { Link ,useNavigate} from 'react-router-dom';
import styled from "styled-components"
import Logo from "../assets/logo.svg"
import {toast, ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import axios from 'axios'
import { registerRoute } from '../utils/APIRoutes';

const Register = () => {
  const navigate= useNavigate();
  const [values, setValues] = useState({
    username:"",
     email:'',
     password:'',
     confirmPassword:'',
  })

 const options = {
   position:"bottom-right",
   autoClose:4000,
   pauseOnHover : true,
   draggable: true,
   theme:"dark"
 }

 useEffect(()=>{
  if(localStorage.getItem('chat-app-user'))
  {
    navigate('/');
  }
  },[]);

  
  const handleOnChange= (e)=>{
   setValues({...values, [e.target.name]:e.target.value});
  }
  
   const handleValidation = ()=>{
      const { password, confirmPassword, username ,email} = values;

      if(password!==confirmPassword)
      {
       toast.error("Password and Confirm Password should match each other",options);
       return false;
      }
      else if (username.length<4){
        toast.error("Name must be atleast 4 characters",options);
        return false;
      }
      else if (password.length<8){
        toast.error("Password must be atleast 8 characters",options);
        return false;
      }
      else if(email.length === 0)
      {
        toast.error("Please Enter Email",options);
        return false;
      }
      else {
        return true;
      }
   }



   const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { password, username, email } = values;
  
      try {
        const { data } = await axios.post(registerRoute, { username, email, password });
  
        if (data.success === false) {
          toast.error(data.message, options);
        } else {
          localStorage.setItem("chat-app-user", JSON.stringify(data.userWithoutPassword));
          navigate("/");
        }
      } catch (error) {
        console.error("Error during registration:", error);
        toast.error("An error occurred during registration. Please try again later.", options);
      }
    }
  };
  
  

  return (
    <>
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <div className="brand">
            <img src={Logo} alt="Mylogo" />
            <h1>Talkie</h1>
          </div>
          <input type="text" placeholder='Username' name='username' onChange={handleOnChange}    required/>
          <input type="email" placeholder='Email' name='email' onChange={handleOnChange}    required/>
          <input type="password" placeholder='Password' name='password' onChange={handleOnChange}    required/>
          <input type="password" placeholder='Confirm Password' name='confirmPassword' onChange={handleOnChange}    required/>
         
        <button type="submit">Create User</button>
        <span>
            Already have an account <Link to="/login">Login</Link>
        </span>
        </form>
      </FormContainer>
      <ToastContainer/>
    </>
  )
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;



export default Register
