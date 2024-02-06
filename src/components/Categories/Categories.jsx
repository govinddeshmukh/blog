import React, { useState } from 'react'
import img from "../../assets/4400.jpg"
import { Link } from 'react-router-dom'

export default function Categories({posts, auth}) {
  // console.log(posts)
  const types = [...new Set(posts.map((Categories)=> Categories.type))]
  console.log(types)
  return (
    <div style={{flex:"4"}}>
      <div style={{padding:"2rem",display:"flex",flexDirection:"column",alignItems:"center"}}>
        <div style={{display:"flex"}}>
          {types.map((btn)=>{
            return (
              <div style={{display:"flex"}}>
                <Link to={`/type/${btn}`}>
            <button style={{margin:".5rem"}}>{btn}</button>
                </Link>
              </div>
            )
          })}
        </div>
        <div>
          <img src={img} style={{width:"10rem",height:"10rem",objectFit:"cover",}} alt="" />
        </div>
      </div>
      
    </div>
  )
}
