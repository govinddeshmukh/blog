import React from 'react'
import "./InputControl.scss"

export default function InputControl(props) {
  return (
    <div className="container">
    {props.label && <label>{props.label}</label>} 
    <input type="text" {...props} />
</div>
  )
}
