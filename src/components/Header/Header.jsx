import Categories from "../Categories/Categories";
import "./Header.scss"
import { Link } from 'react-router-dom';
export default function Header({isauth, posts, auth, deletePost}) {
   
  return (
    <div className="container">
        <div className="mainPost">

        </div>
        <div style={{width:"100%",height:"100%",display:"flex",flexWrap:"wrap",flex:"8"}}>
            {posts.map(({id, title, description, postedAt, imageurl,author,type})=>{
                return (
                    <div style={{width:"25rem",height:"35rem",border:"1px solid blue",margin:"1rem",position:"relative"}}>
                                                                   

                        <div style={{display:"flex",flexDirection:"column"}}>
                            <div style={{width:"100%"}}>
                              <Link to={`/user/${id}`}>
                                <img style={{width:"100%",height:"15rem",objectFit:"cover"}} src={imageurl} alt="" />
                              </Link>
                            </div>
                            <div style={{padding:"10px",display:"flex",flexDirection:"column",width:"100%",height:"12rem",border:"1px solid red",marginTop:"1rem",justifyContent:"space-between"}}>
                                <div style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                                    <div style={{fontWeight:"900",fontSize:"1.5rem"}}>
                                {title}
                                    </div>
                                    <div style={{marginLeft:"1rem"}}>
                             {isauth && author.id === auth.currentUser.uid && <button onClick={()=>deletePost(id)}>
                                <span style={{background:"red"}}>&#128465;</span></button>}
                                    </div>
                                </div>
                                <div>
                                <p>{postedAt.toDate().toDateString()}</p>
                                <p style={{width:"100%",height:"5rem",overflow:"hidden"}}>{description}</p>
                                </div>
                                <div style={{display:"flex",alignItems:"center",width:"100%",justifyContent:"space-around"}}>
                                <div>
                                <p style={{color:"blue"}}>{type}</p>
                                    </div>
                                <div style={{display:"flex"}}>
                                 <p style={{color:"red",fontWeight:"900"}}>Posted By: @</p>
                                 <Link to={`/${author.id}`}>
                                    <span style={{cursor:"pointer"}}  >{author.name}</span>
                                 </Link>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    <div style={{flex:"3.5",width:"100%",height:"50rem"}}>
    <div style={{width:"25rem",border:"1px solid green",height:"100%"}}>

    <Categories posts={posts} auth={auth} />
    </div>
        </div>
    </div>
  )
}
