import React, { useState } from 'react'
import styles from "./SignUp.module.css"
import InputControl from '../../components/InputControl/InputControl'
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase/Firebase_config';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';


export default function SignUp({setauth}) {
    const [values, setvalues] = useState({
        name: "",
        email: "",
        pass: "",
      });
      const navigate = useNavigate()
      const [error, seterror] = useState("");
      const [submitbtndisable, setsubmitbtndisable] = useState(false)
      const handelSubmition = () => {
        if (!values.name || !values.email || !values.pass) {
          seterror("Fill all fields");
          return;
        }
        seterror("");
        setsubmitbtndisable(true)
        createUserWithEmailAndPassword(auth, values.email, values.pass)
          .then(async(res) => {
            console.log(res);
            setsubmitbtndisable(false)
            const user = res.user;
            await updateProfile(user,{
              displayName:values.name,
              
            })
            localStorage.setItem("isauth", true);
            setauth(true); 
            navigate("/")
          })
          
          .catch((error) => {
            setsubmitbtndisable(false)
            seterror(error.message)
            });
      };
  return (
    <div className={styles.container}>
    <div className={styles.innerBox}>
      <h1 className={styles.heading}>SignUp</h1>
      <InputControl
        label="Name"
        placeholder="Enter Name"
        onChange={(e) =>
          setvalues((prev) => ({ ...prev, name: e.target.value }))
        }
      />
      <InputControl
        label="Email"
        type="email"
        placeholder="Enter email address"
        onChange={(e) =>
          setvalues((prev) => ({ ...prev, email: e.target.value }))
        }
      />
      <InputControl
        label="Password"
        type="password"
        placeholder="Enter password"
        onChange={(e) =>
          setvalues((prev) => ({ ...prev, pass: e.target.value }))
        }
      />
      
      <div className={styles.footer}>
        <p className={styles.error}>{error}</p>
        <button disabled={submitbtndisable} onClick={handelSubmition}>SignUp</button>
        <p>
          Allready have an account?
          <span>
            <Link to="/login">Login</Link>
          </span>
        </p>
      </div>
    </div>
  </div>
  )
}
