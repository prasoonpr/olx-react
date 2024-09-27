
import './Header.css';
import OlxLogo from '../../Assets/OlxLogo';
import Search from '../../Assets/Search'
import Arrow from "../../Assets/Arrow"
import SellButton from '../../Assets/SellButton';
import SellButtonPlus from '../../Assets/SellButtonPlus';
import { AuthContext, FirebaseContext } from '../../store/firebaseContext';
import { useContext } from 'react';
import { signOut } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
function Header() {
  const {user}=useContext(AuthContext)
  const {auth}=useContext(FirebaseContext)
  const navigate=useNavigate()
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          <span>{user? user.displayName:<Link to='/login'>Login</Link>}</span>
          <hr />
        </div>
        {user&&<span onClick={()=>{signOut(auth).then(navigate('/login'))}}>Logout</span>}

        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span onClick={()=>{navigate('/create')}}>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
