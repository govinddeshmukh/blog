import Header from '../../components/Header/Header'
import styles from "./Home.module.css"
import { collection, deleteDoc, onSnapshot, orderBy, query, doc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import {auth, db} from "../../firebase/Firebase_config"
export default function Home({isauth}) {
  const [posts, setposts] = useState([])
  useEffect(()=>{
    const postRef = collection(db, "posts")
    const q = query(postRef, orderBy("postedAt","desc"));
    onSnapshot(q, (snapsots)=>{
      const data = snapsots.docs.map((doc)=>({ 
        ...doc.data(),id: doc.id,
      }))
      setposts(data)
      console.log("data",data)
    })
  },[])
  const deletePost = async (id) =>{
    const postdoc = doc(db, "posts", id)
    await deleteDoc(postdoc)
  }

  
  return (
    <div >
      <div style={{width:"100%",height:"20rem",border:"1px solid black"}}>
          hi
      </div>
      <div className={styles.container}>
        
    <div style={{flex:"8"}}>
      <Header deletePost={deletePost} auth={auth} posts={posts} isauth={isauth}  />
    </div>
   
    </div>
  
    </div>
  )
}
