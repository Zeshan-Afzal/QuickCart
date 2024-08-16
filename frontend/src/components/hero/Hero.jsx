import React, { useState } from "react";
import { bgUrls } from "../../static/data";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";

import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { Link } from "react-router-dom";
SwiperCore.use([Navigation]);
function Hero() {
  return (
    <Swiper navigation>
      {bgUrls.map((item) => {
        const cssEscapedUrl = item.url.replace(/(["\\])/g, "\\$1");
        return (
          <SwiperSlide key={item.url}>
            <div
              className="h-[550px] flex flex-col justify-center  items-center"
              style={{
                backgroundImage: `url('${cssEscapedUrl}')`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            >
              <div className=" w-11/12 md:w-4/ flex flex-col gap-4 justify-center  ">
                <div className="">
                  <h1 className=" font-bold md:text-4xl text-2xl font-serif text-white">
                    Discover the Best Deals on Top-Quality Products
                  </h1>
                  <p className=" ml-9 font-bold md:text-2xl text-xl font-serif text-white">
                    Features, Benefits, and Customer Reviews
                  </p>
                  <p className=" self-center font-serif text-lg text-white">
                    Welcome to{" "}
                    <span className=" font-bold text-blue-700 text-3xl font-serif ">
                      Quick
                    </span>
                    <span className=" font-bold text-orange-600 text-3xl font-serif  ">
                      Cart
                    </span>{" "}
                    your one-stop online shop for the latest in electronics,
                    fashion, home goods, and more. Enjoy unbeatable prices,
                    top-notch customer service, and a seamless shopping
                    experience. Join our community today and start saving on the
                    products you love!
                  </p>
                </div>

                <Link
                  to={"/products"}
                  className=" p-3 rounded-lg hover:opacity-95 bg-blue-900 transition-none duration-200 w-40 text-white md:font-bold font-semibold font-serif self-center"
                >
                  Discover more
                </Link>
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default Hero;
