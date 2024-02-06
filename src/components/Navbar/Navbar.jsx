import { signOut } from 'firebase/auth'
import React from 'react'
import { auth } from '../../firebase/Firebase_config'
import styles from "./Navbar.module.css"
import { Link } from 'react-router-dom'

export default function Navbar({setauth, name}) {
  const signuserOut = () =>{
    signOut(auth).then(()=>{
      localStorage.clear()
      setauth(false)
      window.location.pathname = "/"
    })
  }
  return (
    <div className={styles.container}>
    <div>
        <h3>Logo</h3>
    </div>
    <div >
        <ul style={{display:"flex",fontSize:"1.2rem"}}>
        <li style={{listStyle:"none"}}><Link to='/' style={{textDecoration:"none",color:"wheat",cursor:"pointer"}}>Home</Link></li>
        <li style={{listStyle:"none"}}><Link to='/user' style={{textDecoration:"none",color:"wheat",cursor:"pointer",marginLeft:"1rem"}}>user</Link></li>
        <li style={{listStyle:"none"}}><Link to='/createblog' style={{textDecoration:"none",color:"wheat",marginLeft:"2rem",cursor:"pointer"}}>CreateBlog</Link></li>

        </ul>
    </div>
    
    <div>
    {name ?
    <div style={{display:"flex"}}>
      <div style={{width:"3rem",height:"3rem",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center"}}>
      <Link to='/profile' style={{textDecoration:"none"}}>
        <img src={!auth.currentUser.photoURL ? "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper.png":auth.currentUser.photoURL} style={{width:"3rem",height:"3rem",borderRadius:"50%",objectFit:"cover"}} alt="avtar" />
      </Link>
      </div>
      
    <button style={{marginLeft:"1rem",padding:"2px 10px",fontSize:"1.2rem"}} onClick={signuserOut}>Logout</button>
    </div>
    : <Link to='/login'>
        <button>Login</button>
        </Link>}
        
    </div>
</div>
  )
}
