import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase/Firebase_config";
// import styles from "./SinglePost.module.css"
export default function SinglePost({isauth}) {
  const { id } = useParams();
  const [singlepost, setsinglepost] = useState({});
  useEffect(() => {
    const docref = doc(db, "posts", id);
    getDoc(docref).then((doc) => {
        const data = { ...doc.data(), id: doc.id };
        setsinglepost(data);
        localStorage.setItem("setsinglepost",setsinglepost)
      
    });
  }, []);
  console.log(singlepost)

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <div>
        <div style={{ padding: "5rem" }}>
        <div style={{border:"1px solid red",display:"flex"}}>  
          <div>

        <img
          src={singlepost.imageurl}
          style={{
            width: "20rem",
            height: "25rem",
            objectFit: "cover",
            borderRadius: "0.4rem",
          }}
          alt="img"
          />
          </div>
          <div style={{padding:"2rem",border:"1px solid blue"}}>

            <div style={{display:"flex",flexDirection:"column",justifyContent:"center",gap:"10px"}}>

            <h1>
              {singlepost.title}
            </h1>
            <p>{singlepost?.postedAt?.toDate().toDateString()}</p>
        <h2>{singlepost.type}</h2>
        <p>{singlepost.description}</p>
        <p>{singlepost?.author?.name}</p>
        
            </div>
          </div>
      </div>
      </div>
      </div> 
      
    </div>
  );
}
