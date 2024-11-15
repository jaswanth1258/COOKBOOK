import React from "react";
import { Fade, Slide } from "react-reveal";
function Special() {
  return (
    <div>
      <Fade bottom big>
        <div className="flex items-center justify-center pt-5">
          <div className="bg-blue-100 h-[500px]  w-[90%]  rounded-3xl flex items-center shadow-xl ">
            <img
              src="photos/Landing_photo.jpeg"
              className="h-[100%] w-[50%] rounded-l-3xl"
            />
            <div className="p-10">
              <h1 className="font-serif font-bold text-2xl">
                Our Special Dish of the day.
              </h1>
              <p className="font-serif  text-l">
                Red velvet cake is a delightful dessert known for its rich,
                velvety texture and striking red color. Made with cocoa,
                buttermilk, and a touch of vinegar, it offers a unique flavor
                profile. Typically adorned with cream cheese frosting, its a
                beloved treat that combines indulgence and visual appeal, making
                it a favorite for special occasions.
              </p>
            </div>
          </div>
        </div>
      </Fade>
    </div>
  );
}

export default Special;
