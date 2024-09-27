/* eslint-disable react/jsx-key */
import { useEffect, useState, useContext } from "react";
import Heart from "../../Assets/Hearts";
import { collection, getDocs } from "firebase/firestore";
import { FirebaseContext } from "../../store/firebaseContext";
import "./Posts.css";
import { PostContext } from "../../store/postContext";
import { useNavigate } from "react-router-dom";
function Posts() {
  const {setPostDetails}=useContext(PostContext)
  const { db } = useContext(FirebaseContext);
  const [products, setProducts] = useState([]);
  const navigate=useNavigate()
  useEffect(() => {
    async function fetchData() {
      const docRef = collection(db, "products");
      const docSnap = await getDocs(docRef);
      const productList = docSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productList)
    }
    fetchData();
  }, [db]);


  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {products.map((product,index)=>{

                return(
                <div key={index} className="card" onClick={()=>{
                  setPostDetails(product);
                    navigate('/view');
                    }} >
                  <div className="favorite">
                    <Heart></Heart>
                  </div>
                  <div className="image">
                    <img src={product.url} alt="" />
                  </div>
                  <div className="content">
                    <p className="rate">&#x20B9; {product.price}</p>
                    <span className="kilometer">{product.category}</span>
                    <p className="name"> {product.name}</p>
                  </div>
                  <div className="date">
                    <span>{product.createdAt}</span>
                  </div>
                </div>
                )
            })}
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
