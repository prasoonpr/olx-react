// import React from 'react';

import { useContext, useEffect, useState } from "react";
import "./View.css";
import { PostContext } from "../../store/postContext";
import { FirebaseContext } from "../../store/firebaseContext";
import { collection, where, query, getDocs } from "firebase/firestore";
function View() {
  const [userDetails, setUserDetails] = useState(null);
  const { postDetails } = useContext(PostContext);
  const { db } = useContext(FirebaseContext);
  useEffect(() => {
    async function fetchDetails() {
      if (postDetails && postDetails.userId) {
        try {
          const userQuery = query(
            collection(db, "users"),
            where("uid", "==", postDetails.userId)
          );
          const querySnap = await getDocs(userQuery);
          if (!querySnap.empty) {
            querySnap.forEach((doc) => {
              setUserDetails(doc.data());
            });
          } else {
            console.log("no matching user found");
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    fetchDetails();
  }, [db, postDetails]);
  if (!postDetails || !userDetails) {
    return <div>Loading...</div>;
  }
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img src={postDetails.url} alt="" />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>{postDetails.createdAt}</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails.username}</p>
          <p>{userDetails.phone}</p>
        </div>
      </div>
    </div>
  );
}
export default View;
