import React from 'react';
export default function Error(props) {
return(
  <div className="notifError">
     <h5 style={{ color: 'red'}}>{props.error}</h5>
  </div>
  )
}