import React from 'react'

export const NoteItem = (props) => {
    const {Note}=props;
  return (
    <div className='col-md-3'>
<div class="card my-3">
  <div class="card-body">
    <h5 class="card-title">{Note.title}</h5>
    <p class="card-text">{Note.description}</p>
  </div>
</div>
    
        </div>
  )
}
