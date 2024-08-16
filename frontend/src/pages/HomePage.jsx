import React, { useEffect, useState } from "react";
import Header from "../components/layout/Header";
import Hero from "../components/hero/Hero";
import Features from "../components/sectons/Features";
import Categories from "../components/sectons/Categories";
import BestDeals from "../components/sectons/BestDeals";
import FeaturedProducts from "../components/sectons/FeaturedProducts";
import Events from "../components/events/Evants";
import Sponcerd from "../components/layout/Sponcerd";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../store/actions/userActions";
import {
  getAllEvents,
  getAllProducts,
  loadShop,
} from "../store/actions/shopAction";
import Fashion from "../components/sectons/Fashion";
import Gadgets from "../components/sectons/Gadgets";

function HomePage() {
  const dispatch = useDispatch();
  let inc = 0;
  const { AllProducts, AllEvents } = useSelector((state) => state.shop);
  const [event, setEvent] = useState(null);
  useEffect(() => {
    window.scrollTo(0, 0);
    if (!AllEvents || AllEvents.length === 0) {
      dispatch(getAllEvents());
    }
    dispatch(getAllProducts());

    setEvent(AllEvents && AllEvents[inc]);

    // setInterval(() => {
    //   console.log(inc);
    //   setEvent(AllEvents && AllEvents[inc]);
    //   if (inc < AllEvents && AllEvents.length) {
    //     inc++;
    //   } else {
    //     inc = 0;
    //   }
    // }, 8000);
  }, [dispatch, inc]);
  return (
    <>
      <Hero />
      <div className=" flex flex-col gap-8 ">
        // //
        <Features />
        <Categories />
        <BestDeals />
        <Events event={event} />
        <FeaturedProducts />
        <Fashion />
        <Gadgets />
        <Sponcerd />
      </div>
    </>
  );
}

export default HomePage;
