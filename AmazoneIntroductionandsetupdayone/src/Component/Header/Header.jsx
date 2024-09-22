import React ,{useContext} from "react";
import { Link } from "react-router-dom";
import classes from "./Header.module.css";
import { SlLocationPin } from "react-icons/sl";
import { BsSearch } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
import LowerHeader from "./LowerHeader";
import { DataContext } from "../DataProvider/DataProvider";
const Header=()=> {
  
  const [{basket},dispatch]=
  useContext(DataContext)
  const total = basket.reduce((amount,item)=>{ return item.amount + amount},0)
  console.log(basket.length);
  return (
    <>
      <section className={classes.fixed}>
        <section>
          <div className={classes.header_container}>
            {/* logo section */}
            <div className={classes.logo_container}>
              <Link to="/">
                <img
                  src="https://pngimg.com/uploads/amazon/small/amazon_PNG25.png"
                  alt="amazon log"
                />
              </Link>
              <div className={classes.delivery}>
                <span>
                  <SlLocationPin />
                </span>
                <div>
                  <p>Deliver to</p>
                  <span>Ethiopia</span>
                </div>
              </div>
            </div>
            {/* search  section*/}

            <div className={classes.search}>
              <select name="" id="">
                <option value="">All</option>
              </select>
              <input type="text" />
              <BsSearch size={38} />
            </div>
            {/* other section */}
            <div className={classes.order_container}>
              <Link to="/" className={classes.language}>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Hopkinson_Flag_of_the_United_States_Navy.svg/330px-Hopkinson_Flag_of_the_United_States_Navy.svg.png"
                  alt="language"
                />
                <select name="" id="">
                  <option value="">EN</option>
                </select>
              </Link>

              <Link to="/orders">
                <p>returns</p>
                <span>& Orders</span>
              </Link>
              <Link to="/cart" className={classes.cart}>
                <BiCart size={35} />
                <span>{total}</span>
              </Link>
            </div>
          </div>
        </section>
      </section>
      <LowerHeader />
    </>
  );
}

export default Header;




