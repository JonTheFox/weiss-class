import React, { useState, useContext, useRef, useEffect } from "react";
// JSX
import HeroSlider, {
  Slide as PresentationSlide,
  Nav,
  MenuNav,
  SideNav,
  OverlayContainer,
} from "hero-slider";
import Slide from "../SlidePageTemplates/Slide.js";
import CenteredHeadings from "../SlidePageTemplates/CenteredHeadings.js";
import Text1 from "../SlidePageTemplates/Text1.js";
import { DeviceContext } from "../../contexts/DeviceContext.jsx";

import videoState from "../../store/video.atom.js";
import slideSelector from "../../store/slide.selector.js";
// import clsx from "clsx";

import currentSlideIndexState from "../../store/currentSlideIndex.atom.js";
import isVideoPlayingState from "../../store/isVideoPlaying.atom.js";

import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import "./Slider.styles.scss";

const SLIDE_TEMPLATES = { CenteredHeadings, Text1 };

const Slider = ({ children, slides }) => {
  const deviceState = useContext(DeviceContext);

  const navBtnsRef = useRef();
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
    navBtns[slideIndex].click();
  };

  const getVideoSet = (slide) => {
    return slide?.pages?.[0]?.videoSet;
  };

  useEffect(() => {
    goToSlide(currentSlideIndex);
    const videoSet = getVideoSet(slides?.[currentSlideIndex]);
    setVideo(videoSet);
  }, [currentSlideIndex]);

  useEffect(() => {
    const firstVideoSet = getVideoSet(slides?.[0]);
    setVideo(firstVideoSet);
    setIsVideoPlaying(true);
  }, []);

  // const [appUtils] = useContext(AppContext);

  const getSnapshotSize = ({
    device,
    // phone,
    // tablet,
    // largeScreen,
    // xlScreen,
    images,
    // videoSet,
  }) => {
    if (!device || !images) return "";
    let videoSize;

    switch (device) {
      case "fourK":
        if (images.fourK) {
          videoSize = "fourK";
          break;
        }

      case "xlScreen":
        if (images.xlScreen) {
          videoSize = "fullHd";
          break;
        }
      case "largeScreen":
        if (images.largeScreen) {
          videoSize = "hdReady";
          break;
        }

      case "tablet":
        if (images.tablet) {
          videoSize = "tablet";
          break;
        }

      default:
        videoSize = "phone";
        break;
    }
    return videoSize;
  };

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
        const newIndex = nextSlideIndex - 1;
        setCurrentSlideIndex(newIndex);
        //const nextVideoSet = slides[newIndex]?.pages?.[0]?.videoSet;
        setIsVideoPlaying(true);
        //setVideo(nextVideoSet);
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
        slides.map((slide, slideIndex) => {
          const { pages, id } = slide;

          let bgImage;

          const vidSet = pages?.[0]?.videoSet;
          if (vidSet) {
            const size = getSnapshotSize({
              device: deviceState.device,
              images: vidSet.images,
            });
            bgImage = vidSet?.links?.[size];
          } else {
            bgImage = slide.bgImage || pages?.[0]?.bgImage || "";
          }

          console.log("bgImage: ", slideIndex, bgImage);

          //const isCurrentlyViewed = slideIndex === currentSlideIndex;

          return (
            <PresentationSlide
              background={{
                backgroundImage: bgImage,

                backgroundAttachment: "fixed",
              }}
              //className={clsx(!bgImage && "gradient")}
            >
              <Slide
                {...slide}
                //isCurrentlyViewed={isCurrentlyViewed}
                slideIndex={slideIndex}
              />
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

      <SideNav
        color="rgba (200 , 215 , 235 , 0.6 )"
        activeColor="var(--canvas)"
        className={"side-nav"}
      />
    </HeroSlider>
  );
};

export default Slider;
