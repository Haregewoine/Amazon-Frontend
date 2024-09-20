import React from 'react'
import { FadeLoader } from 'react-spinners'
function Loading() {
  return (
    <div 
    style={{display:"flex",justifyContent:"center",alignItems:"center",height:"50vh"}}
    
    >
      <FadeLoader />
    </div>
  );
}

export default Loading