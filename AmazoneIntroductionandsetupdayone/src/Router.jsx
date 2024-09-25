 import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing/Landing";
import Auth from "./Pages/Auth/Auth";
import Payment from "./Pages/Payment/Payment";
import Orders from "./Pages/Orders/Orders";
import Cart from "./Pages/Cart/Cart";
import Results from "./Pages/Results/Results";
import ProductDetail from "./Pages/ProductDetail/ProductDetail";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe("pk_test_51Q2glIK3wgFMMLU4mJVp7ftn5ctPA3AoGcQsPo14fahRV2VuDa9cpJGFkkwvp83JRbak3bLkADRiJiBsMQLCtsxh00Gma6UWcD");

const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/payments" element={
          <Elements stripe={stripePromise}>
            <Payment />
          </Elements>
        } />
        <Route path="/orders" element={<Orders />} />
        <Route path="/category/:categoryName" element={<Results />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        {/* Fallback route for 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

const NotFound = () => {
  return <h1>404 - Page Not Found</h1>;
};

export default Routing;








//  import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Landing from "./Pages/Landing/Landing";
// import Auth from "./Pages/Auth/Auth";
// import Payment from "./Pages/Payment/Payment";
// import Orders from "./Pages/Orders/Orders";
// import Cart from "./Pages/Cart/Cart";
// import Results from "./Pages/Results/Results";
// import ProductDetail from "./Pages/ProductDetail/ProductDetail";
// import { Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';

// const stripePromise = loadStripe("pk_test_51Q2glIK3wgFMMLU4mJVp7ftn5ctPA3AoGcQsPo14fahRV2VuDa9cpJGFkkwvp83JRbak3bLkADRiJiBsMQLCtsxh00Gma6UWcD");

// const Routing = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Landing />} />
//         <Route path="/auth" element={<Auth />} />
//         <Route path="/payments" element={
//           <Elements stripe={stripePromise}>
//             <Payment />
//           </Elements>
//         } />
//         <Route path="/orders" element={<Orders />} />
//         <Route path="/category/:categoryName" element={<Results />} />
//         <Route path="/product/:productId" element={<ProductDetail />} />
//         <Route path="/cart" element={<Cart />} />
//         {/* Fallback route for 404 */}
//         <Route path="*" element={<NotFound />} />
//       </Routes>
//     </Router>
//   );
// };

// const NotFound = () => {
//   return <h1>404 - Page Not Found</h1>;
// };

// export default Routing;