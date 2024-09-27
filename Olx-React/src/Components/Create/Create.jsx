import { Fragment } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { useState,useContext } from 'react';
import {FirebaseContext,AuthContext} from '../../store/firebaseContext'
import {ref,getDownloadURL,uploadBytes} from 'firebase/storage'
import {collection,addDoc} from 'firebase/firestore'
import { useNavigate } from 'react-router-dom';
const Create = () => {
  const {storage,db}=useContext(FirebaseContext)
  const {user}=useContext(AuthContext)
  const [name,setName]=useState('')
  const [category,setCategory]=useState('')
  const [price,setPrice]=useState('')
  const [image,setImage]=useState('')
  const date=new Date()
  const navigate=useNavigate()
  const handleSubmit=async()=>{
    if(image){
      try {
        const imageRef = await ref(storage,`/image/${image.name}`)
          await uploadBytes(imageRef,image)
          const url= await getDownloadURL(imageRef)
          await addDoc(collection(db,'products'),{
            name,
            category,
            price,
            url,
            userId:user.uid,
            createdAt:date.toDateString()
          })
          await navigate('/')
      } catch (error) {
        console.log(error);    
      }
    }else{
      alert("please select a image")
    }
  }
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
        
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              onChange={(e)=>{setName(e.target.value)}}
              name="Name"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              onChange={(e)=>{setCategory(e.target.value)}}
              name="category"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" type="number" onChange={(e)=>{setPrice(e.target.value)}} id="fname" name="Price" />
            <br />
        
          <br />
          <img alt="Posts" width="200px"  height="200px" src={image? URL.createObjectURL(image):""}></img>
         
            <br />
            <input onChange={(e)=>{setImage(e.target.files[0])}} type="file" />
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
         
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
