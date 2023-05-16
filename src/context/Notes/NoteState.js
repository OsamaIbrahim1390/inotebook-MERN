import React from "react";
import NoteContext from "./noteContext";
import { useState } from "react";
const NoteState=(props)=>{
  const notesInitial=[
    {
      "_id": "646353177867270b711663a0",
      "user": "645a158f95561c56f1306f6d",
      "title": "Programming fundamentals",
      "description": "Secured good marks",
      "tag": "Academic",
      "date": "2023-05-16T09:55:35.809Z",
      "__v": 0
    },
    {
      "_id": "6463532a7867270b711663a2",
      "user": "645a158f95561c56f1306f6d",
      "title": "oop fundamentals",
      "description": "Secured good marks",
      "tag": "Academic",
      "date": "2023-05-16T09:55:54.814Z",
      "__v": 0
      
    },
    {
      "_id": "646353177867270b711663a0",
      "user": "645a158f95561c56f1306f6d",
      "title": "Programming fundamentals",
      "description": "Secured good marks",
      "tag": "Academic",
      "date": "2023-05-16T09:55:35.809Z",
      "__v": 0
    },
    {
      "_id": "6463532a7867270b711663a2",
      "user": "645a158f95561c56f1306f6d",
      "title": "oop fundamentals",
      "description": "Secured good marks",
      "tag": "Academic",
      "date": "2023-05-16T09:55:54.814Z",
      "__v": 0
    },
    {
      "_id": "646353177867270b711663a0",
      "user": "645a158f95561c56f1306f6d",
      "title": "Programming fundamentals",
      "description": "Secured good marks",
      "tag": "Academic",
      "date": "2023-05-16T09:55:35.809Z",
      "__v": 0
    },
    {
      "_id": "6463532a7867270b711663a2",
      "user": "645a158f95561c56f1306f6d",
      "title": "oop fundamentals",
      "description": "Secured good marks",
      "tag": "Academic",
      "date": "2023-05-16T09:55:54.814Z",
      "__v": 0
    }
  ]
const [notes,setNotes]=useState(notesInitial)

return (
<NoteContext.Provider value={{notes,setNotes}}>
{props.children}
</NoteContext.Provider>
)}
export default NoteState;