import React, { useEffect, useRef } from 'react'
import "./header.css"
import "../../App.css"
const Header = (props) => {

const resultRef=useRef();
const expressionRef= useRef();

useEffect(() => {
  resultRef.current.scrollIntoView({behavior:"smooth"})
},[props.history])

useEffect(()=>{
  expressionRef.current.scrollLeft = expressionRef.current.scrollWidth;
})
  return (
    <div className='header custom_scroll'>
      <div className="h_history">
        {
          props.history &&
          props.history.map((item)=> (
            <p key={item+""+Math.random()*100}>{item}</p>
          ))
        }
      
      </div>
    <br />
      <div ref={expressionRef} className="h_expression custom_scroll">
        <p>{props.expression}</p>
      </div>

      <p className="h_result" ref={resultRef}>
      {props.result}</p>
    </div>
  )
}

export default Header