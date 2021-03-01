import React, { useState, useContext, useRef, useEffect } from "react";
// JSX
import HeroSlider, {
  Slide as PresentationSlide,
  Nav,
  OverlayContainer,
} from "hero-slider";
import Slide from "../SlidePageTemplates/Slide.js";
import CenteredHeadings from "../SlidePageTemplates/CenteredHeadings.js";
import Text1 from "../SlidePageTemplates/Text1.js";
import { AppContext } from "../../store/AppContext.js";
import videoState from "../../store/video.atom.js";
import slideSelector from "../../store/slide.selector.js";
// import clsx from "clsx";

import currentSlideIndexState from "../../store/currentSlideIndex.atom.js";
import isVideoPlayingState from "../../store/isVideoPlaying.atom.js";

import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";

const SLIDE_TEMPLATES = { CenteredHeadings, Text1 };

const Slider = ({ children, slides }) => {
  const AppState = useContext(AppContext);

  const navBtnsRef = useRef();

  // const { getRandomUpTo, asyncForEach } = appUtils;
  const [currentSlideIndex, setCurrentSlideIndex] = useRecoilState(
    currentSlideIndexState
  );
  const setIsVideoPlaying = useSetRecoilState(isVideoPlayingState);
  const setVideo = useSetRecoilState(videoState);
  const slide = useRecoilValue(slideSelector);

  //these will be populated by HeroSlider
  const nextSlideHandler = useRef();
  const previousSlideHandler = useRef();

  const goToSlide = (slideIndex) => {
    const navBtnsNodeList = document.querySelectorAll(".slide-nav-button");
    if (!navBtnsNodeList || !navBtnsNodeList.length) {
      // loggError('Nav buttons were not found in the DOM')
      return null;
    }
    const navBtns = Array.from(navBtnsNodeList);
    navBtns[slideIndex - 1].click();
  };

  useEffect(() => {
    goToSlide(currentSlideIndex);
  }, [currentSlideIndex]);

  useEffect(() => {
    const firstVideoSet = slide?.pages?.[0]?.videoSet;
    setVideo(firstVideoSet);
    setIsVideoPlaying(true);
  }, []);

  // const [appUtils] = useContext(AppContext);

  return (
    <HeroSlider
      slidingAnimation="left_to_right"
      orientation="horizontal"
      nextSlide={nextSlideHandler}
      previousSlide={previousSlideHandler}
      initialSlide={0}
      onBeforeChange={(previousSlide, nextSlide) => {
        //console.log("onBeforeChange", previousSlide, nextSlide)
        setIsVideoPlaying(false);
      }}
      onChange={(nextSlide) => {
        console.log("onChange", nextSlide);
      }}
      onAfterChange={(nextSlideIndex, b, c) => {
        // setCurrentSlideIndex(nextSlideIndex);
        const nextVideoSet = slides[nextSlideIndex - 1]?.pages?.[0]?.videoSet;
        setVideo(nextVideoSet);
        setIsVideoPlaying(true);
      }}
      //style={{
      // backgroundColor: "rgba(0, 0, 0, 0.33)",
      // }}
      settings={{
        slidingDuration: 200,
        slidingDelay: 0,
        shouldAutoplay: false,
        shouldSlideOnArrowKeypress: true,
        shouldDisplayButtons: true,
        //autoplayDuration: 5000,
        height: "calc(100 * var(--vh) - var(--appbar-height))",
      }}
    >
      <OverlayContainer></OverlayContainer>

      {slides &&
        slides.map((slide, i) => {
          const { pages, id } = slide;

          const bgImage = slide.bgImage || pages?.[0]?.bgImage || "";

          return (
            <PresentationSlide
              background={{
                backgroundImage: bgImage,

                backgroundAttachment: "fixed",
              }}
              //className={clsx(!bgImage && "gradient")}
            >
              <Slide {...slide} />
            </PresentationSlide>
          );
        })}

      <Nav
        position={{
          bottom: "calc(4 * var(--spacing))", //default: 1,5rem
          left: "50%",
          transform: "translateX(-50%)",
          overflow: "auto",
          width: "100%",
        }}
      />
    </HeroSlider>
  );
};

export default Slider;

/*background={{
                backgroundImage: bgImage,
                backgroundAttachment: "fixed",
              }}*/
