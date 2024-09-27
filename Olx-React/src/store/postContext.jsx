/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const PostContext=createContext(null);

const Post=({children})=>{
    const [postDetails,setPostDetails]=useState(null)
  return(
    <PostContext.Provider value={{postDetails,setPostDetails}}>
    {children}
    </PostContext.Provider>
  )
}

export default Post;
