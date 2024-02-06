import React, { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify';
import { auth,db, storage } from '../../firebase/Firebase_config';
import { useNavigate } from 'react-router-dom';
import { Timestamp, addDoc, collection } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
export default function CreateBlog({isauth}) {
     
  const [post, setPost] = useState({
    title:"",
    description:"",
    image:"",
    postedAt: Timestamp.now().toDate(),
    type:""


  })
  const navigate = useNavigate()
  const [progress ,setProgress]= useState(0)
  const handelChange = (e) =>{
    setPost({...post, [e.target.name]:e.target.value})
  }

  const handelImgChange = (e) =>{
    setPost({...post, image:e.target.files[0]})
  }
  const handelPublish = () =>{
    if(!post.title || !post.description || !post.image || !post.type){
      alert("Please fill all the data")
      return;
    }
    const storageRef = ref(storage, `/image/${Date.now()}${post.image.name}.png`);
    const uploadimg = uploadBytesResumable(storageRef, post.image)

    uploadimg.on("state_changed",(snapshot)=>{
      const progressPercent = Math.round((snapshot.bytesTransferred /snapshot.totalBytes)*100);
      setProgress(progressPercent)
    },
      (err)=>{
          console.log(err)
      },
      ()=>{
        setPost({
          title:"",
          description:"",
          image:"",

        })
        getDownloadURL(uploadimg.snapshot.ref)
        .then((url)=>{
          const postRef = collection(db, "posts")
          addDoc(postRef,{
            title:post.title,
            description:post.description,
            imageurl:url,
            postedAt:Timestamp.now().toDate(),
            author:{name: auth.currentUser.displayName, id: auth.currentUser.uid},
            type:post.type,
            
            
          })
          .then(()=>{
           alert("post added successfully")
            setProgress(0)
          })
          .catch(error =>{
            alert("Error Adding Error", {type:`${error}`})
          })
        })
      }
    )
    navigate('/')
  }

  useEffect(()=>{
        if(!isauth) {
          navigate("/login")
        }
  },[isauth])
  return (
    <div  style={{width:"100",display:"flex",justifyContent:"center"}}>
    <div style={{marginTop:"4rem",width:"30rem",height:"30rem",display:"flex",alignItems:"center",flexDirection:"column",boxShadow:"1px 5px 5px 1px black",background:"#555",borderRadius:"0.6rem"}}>
      <h1>Create Post</h1>
      <div style={{width:"90%",height:"90%",display:"flex",alignItems:"center",flexDirection:"column"}}>
          <div style={{marginTop:"1rem",width:"100%"}}>
            <input value={post.title} onChange={(e)=>handelChange(e)} name='title'  style={{width:"100%",height:"2rem",fontSize:"1.4rem",paddingLeft:"0.5rem",border:"0",borderRadius:"0.4rem",background:"wheat"}} placeholder='title...' type="text" />
          </div>
          <div>
            <select name='type' value={post.type} onChange={(e)=>handelChange(e)} >
              <option> select</option>
              <option value="Food">Food</option>
              <option value="Travel">Travel</option>
              <option value="Sport">Sport</option>
            </select>
          </div>
          <div style={{marginTop:"1rem",width:"100%"}}>
            <textarea value={post.description} onChange={(e)=>handelChange(e)} name='description'  style={{width:"100%",height:"16rem",fontSize:"1.2rem",paddingLeft:"0.5rem",paddingTop:"0.5rem",border:"0",outline:"0",borderRadius:"0.4rem"}} placeholder='post ...' cols="30" rows="10"></textarea>
          </div>
          <div style={{width:"100%",height:"2rem",marginTop:"2rem"}}>
            <label style={{fontSize:"1.5rem"}}>Image :</label>
            <input onChange={(e)=>handelImgChange(e)} style={{width:"12rem",height:"2rem",marginLeft:"5px"}} type="file" name='image' accept='image/*' />
          </div>
          {progress === 0 ? null : <div>
          <ToastContainer style={{width:`${progress}%`}} />
          {`uploading image${progress}%`}
          </div> }
          <div style={{width:"100%"}}>
            <button onClick={handelPublish} style={{width:"100%",height:"2rem",fontSize:"1.4rem",border:"0",outline:"0",marginTop:"1rem",borderRadius:"0.4rem",background:"grey",color:"wheat"}}>Submit Post</button>
          </div>
          
      </div>
      </div>
  
  </div>
  )
}
