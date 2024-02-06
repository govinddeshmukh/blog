import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { db } from '../../firebase/Firebase_config';
export default function UserPost() {
  const [UserPosts, setuserPosts] = useState([]);
    const { id } = useParams();
    const getCategoryBlogs = async () => {
      const blogRef = collection(db, "posts");
      const categoryBlogQuery = query(blogRef, where("author.id", "==", id));
      const docSnapshot = await getDocs(categoryBlogQuery);
      let UserPosts = [];
      docSnapshot.forEach((doc) => {
        UserPosts.push({ id: doc.id, ...doc.data() });
      });
      setuserPosts(UserPosts);
    };
    console.log(UserPosts)
    useEffect(() => {
      getCategoryBlogs();
    }, []);
    return (
      <div style={{width:"100%",height:"100vh"}}>
      <div style={{padding:"5rem"}}>

      {UserPosts.map((posts)=>{
          return (
              <div style={{display:"flex",flexDirection:"column"}}>
                      <div style={{display:"flex",margin:".5rem",gap:"1rem"}}>
                              <div>
                                  <img style={{width:"30rem",height:"20rem",objectFit:"cover",borderRadius:".5rem"}} src={posts.imageurl} alt={posts.type} />
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
    )
}
