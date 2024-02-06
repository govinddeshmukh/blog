import React, { useEffect, useState } from 'react'
import styles from "./Profile.module.css"
import { auth, storage } from '../../firebase/Firebase_config'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { updateProfile } from 'firebase/auth'

export default function Profile() {
  const [loading, setLoading] = useState(false)
  const [photo, setPhoto] = useState(null)
  const [photoURL, setphotoURL] = useState("https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper.png")
  const handelchange = (e) =>{
    if(e.target.files[0]){
      setPhoto(e.target.files[0])
    }
  }
  const handelupload = async () =>{
      const profilepictureRef = ref(storage, `profilePics/${auth.currentUser.uid}.png`)
      setLoading(true)
     const snapshot= await uploadBytes(profilepictureRef,photo)
      const photoURL = await getDownloadURL(profilepictureRef)
     updateProfile(auth.currentUser, {photoURL})
     setLoading(false)
     alert('updated profile')
  }

  useEffect(()=>{
    if(auth.currentUser?.photoURL){

      setphotoURL(auth.currentUser.photoURL)
    }
  },[(auth.currentUser)])

  return (
    <div className={styles.container}>
      <div style={{width:"100%",height:"100vh",textAlign:"center"}}>
      <div style={{marginTop:"10rem",display:"flex",alignItems:"center",flexDirection:"column",border:"1px solid red"}}>
        <div>
      <input onChange={handelchange} type="file" name="image" accept="image/*" />
      <button disabled={loading || !photo}  onClick={handelupload}>upload</button>
        </div>
          <div style={{marginTop:"5rem"}}>
      <img style={{width:"5rem",height:"5rem",borderRadius:"50%",objectFit:"cover"}} src={photoURL} alt="avtar" />
          </div>
      </div>
    </div>
    </div>
  )
}
