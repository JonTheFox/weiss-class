import React, { useContext, useEffect, useRef } from "react";
//import clsx from "clsx";
//import { POSES } from "../../constants/poses.js";
import { AppContext } from "../../contexts/AppContext.jsx";
import { DeviceContext } from "../../contexts/DeviceContext.jsx";
import View from "../layout/View.jsx";
import Swiper from "./Swiper.jsx";
import "./_ImageStepper.scss";

let logg;
//let animationFrame;

const SwipeableTextMobileStepper = React.memo((props) => {
  const [appUtils] = useContext(AppContext);
  const { Logger, animals, synthVoice } = appUtils;
  logg = logg || new Logger({ label: "imagesStepper" }).logg;

  const { device, orientation, screenSize } = useContext(DeviceContext);
  const items = animals.items;

  const refs = useRef({ viewedItem: {}, activeStep: 0 });

  useEffect(() => {
    synthVoice.turnOn();
    synthVoice.wakeUp();

    return () => {
      //on unmount (do cleanup)
      synthVoice.shutUp();
      // synthVoice.turnOff();
    };
  }, [synthVoice]);

  const srcProp =
    device === "phone" && orientation === "portrait"
      ? "imgURL"
      : "imgURL" || "regular";

  return (
    <View animate={false} className={"review"}>
      <div
        className={
          "background has-before show-before gradient--primary-and-secondary"
        }
      ></div>
      <Swiper
        sharedRefs={refs}
        items={items}
        renderHeader={({ activeStep, items, sharedRefs }) => {
          // debugger;
          return (
            <div
              className="image-stepper--header gradient--primary-and-secondary"
              onClick={(e) => synthVoice.say(items[activeStep].label)}
            >
              <h3 className="animal-name readable">
                {items[activeStep].label}
              </h3>
            </div>
          );
        }}
        showHeader={true}
        size={screenSize}
        steps={5}
        imageSlider={true}
        mapItem={(item) => (
          <img
            key={item.label}
            className={"img image-stepper--img"}
            src={item[srcProp] || item.imgURL}
            alt={item.label}
            onClick={(e) => synthVoice.say(item.label)}
          />
        )}
      ></Swiper>
    </View>
  );
});

export default React.memo(SwipeableTextMobileStepper);

/*
this should be used in a renderHeader

const renderHeader = ()=> {
  return <PosedTitle
          pose={"init"}
          initialPose={"init"}
          className={"header-text"}
          onPressEnd={ev => {
            ev.preventDefault(); //prevents duplicate calls
            if (sharedRefs.current.viewedItem) {
              synthVoice.say(
                (sharedRefs.current &&
                  sharedRefs.current.swiper_viewedItem &&
                  sharedRefs.current.swiper_viewedItem
                    .label) ||
                  ""
              );
            }
          }}
         
        >
         {items[activeStep] &&
              items[activeStep].label}
        </PosedTitle>
}

*/
