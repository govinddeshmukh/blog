import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase/Firebase_config";
import { collection, getDocs, query, where } from "firebase/firestore";

export default function CategoriesPost() {
    const [categoryBlogs, setCategoryBlogs] = useState([]);
    const { type } = useParams();
  
    const getCategoryBlogs = async () => {
      const blogRef = collection(db, "posts");
      const categoryBlogQuery = query(blogRef, where("type", "==", type));
      const docSnapshot = await getDocs(categoryBlogQuery);
      let categoryBlogs = [];
      docSnapshot.forEach((doc) => {
        categoryBlogs.push({ id: doc.id, ...doc.data() });
      });
      setCategoryBlogs(categoryBlogs);
    };
    console.log(categoryBlogs)
    useEffect(() => {
      getCategoryBlogs();
    }, []);
  return (
    <div style={{width:"100%",height:"100vh"}}>
        <div style={{padding:"5rem"}}>

        {categoryBlogs.map((posts)=>{
            return (
                <div style={{display:"flex",flexDirection:"column"}}>
                        <div style={{display:"flex",margin:"1rem",gap:"1rem"}}>
                                <div>
                                    <img style={{width:"30rem",height:"20rem",objectFit:"cover",borderRadius:".5rem"}} src={posts.imageurl} alt={type} />
                                </div>
                                <div style={{display:"flex",flexDirection:"column",width:"50%",height:"100%",padding:"2rem",gap:"1rem"}}>
                                    <h1>
                                    {posts.title}
                                    </h1>
                                    <p>{posts?.postedAt?.toDate().toDateString()}</p>
                                    <div style={{display:"flex",flexDirection:"column",gap:"1rem"}}>
                                    <p>{posts.type}</p>
                                    <p>{posts.description}</p>
                                    <p>{posts?.author?.name}</p>
                                    </div>
                                </div>
                        </div>
                </div>
            )
        })}
        </div>
    </div>
  );
}
