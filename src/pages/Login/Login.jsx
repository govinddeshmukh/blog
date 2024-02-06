import React, { useState } from 'react'
import styles from  "./Login.module.scss"
import {signInWithEmailAndPassword} from "firebase/auth"
import InputControl from "../../components/InputControl/InputControl"
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../../firebase/Firebase_config';
export default function Login({setauth}) {
    const [values, setvalues] = useState({
        email: "",
        pass: "",
      });
      const navigate = useNavigate()
      const [error, seterror] = useState("");
      const [submitbtndisable, setsubmitbtndisable] = useState(false)
      const handelSubmition = () => {
        if (!values.email || !values.pass) {
          seterror("Fill all fields");
          return;
        }
        seterror("");
        setsubmitbtndisable(true)
        signInWithEmailAndPassword(auth, values.email, values.pass)
          .then(async(res) => {
            
            console.log(res);
            setsubmitbtndisable(false)
            localStorage.setItem("isauth", true);
            setauth(true)
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
      <h1 className={styles.heading}>Login</h1>
      <InputControl label="Email" type="email"  placeholder="Enter email address" 
      onChange={(e)=> setvalues((prev)=> ({...prev, email:e.target.value}))}
      />
      <InputControl label="Email" type="password" placeholder="Enter password" 
      onChange={(e)=> setvalues((prev)=> ({...prev, pass:e.target.value}))}
      />

      <div className={styles.footer}>
      <p className={styles.error}>{error}</p>
        <button disabled={submitbtndisable} onClick={handelSubmition}>Login</button>
        <p>
          Allready have an account?
          <span>
            <Link to="/signup">SignUp</Link>
          </span>
        </p>
      </div>
    </div>
  </div>
  )
}
