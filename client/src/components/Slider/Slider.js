import React, {
  useState,
  useContext,
  useRef,
  useEffect,
  useCallback,
} from "react";
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
import usePromiseKeeper from "../../hooks/usePromiseKeeper.jsx";

import videoState from "../../store/video.atom.js";
import slideSelector from "../../store/slide.selector.js";
// import showBgState from "../../store/showBg.atom.js";
// import clsx from "clsx";

import currentSlideIndexState from "../../store/currentSlideIndex.atom.js";
import isVideoPlayingState from "../../store/isVideoPlaying.atom.js";

import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import "./Slider.styles.scss";

const SLIDING_DURATION = 200;

const label = "Slider";

const Slider = ({ children, slides }) => {
  const deviceState = useContext(DeviceContext);
  // const [appUtils] = useContext(AppContext);
  const promiseKeeper = usePromiseKeeper({ label });

  const navBtnsRef = useRef();
  const [currentSlideIndex, setCurrentSlideIndex] = useRecoilState(
    currentSlideIndexState
  );
  const [isVideoPlaying, setIsVideoPlaying] = useRecoilState(
    isVideoPlayingState
  );
  const setVideo = useSetRecoilState(videoState);
  const slide = useRecoilValue(slideSelector);
  //const [showBg, setShowBg] = useRecoilState(showBgState);

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
    const currentNavBtn = navBtns?.[slideIndex];
    if (currentNavBtn) currentNavBtn.click();
  };

  const getVideoSet = (slide) => {
    return slide?.pages?.[0]?.videoSet;
  };

  useEffect(() => {
    goToSlide(currentSlideIndex);
    // const videoSet = getVideoSet(slides?.[currentSlideIndex]);
    // setVideo(videoSet);
  }, [currentSlideIndex]);

  const setFirstVideoSet = useCallback(() => {
    const firstVideoSet = getVideoSet(slides?.[0]);

    setVideo(firstVideoSet);
  }, [slides, setVideo, getVideoSet]);

  if (currentSlideIndex === 0) {
    setFirstVideoSet();
  }

  useEffect(() => {
    //setFirstVideoSet();
    setIsVideoPlaying(true);
    //setShowBg(true);
  }, []);

  // useEffect(() => {
  //   setShowBg(!isVideoPlaying);
  // }, [isVideoPlaying]);

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
        // promiseKeeper.stall(SLIDING_DURATION, "show bg").then(() => {
        //   setShowBg(true);
        // });
        // setCurrentSlideIndex(nextSlide);
      }}
      onChange={(nextSlide) => {
        console.log("onChange", nextSlide);
      }}
      onAfterChange={(nextSlideIndex, b, c) => {
        const newIndex = nextSlideIndex - 1;
        setCurrentSlideIndex(newIndex);

        // debugger;
        //const nextVideoSet = slides[newIndex]?.pages?.[0]?.videoSet;
        setIsVideoPlaying(true);
        // setShowBg(false);

        //setVideo(nextVideoSet);
      }}
      //style={{
      // backgroundColor: "rgba(0, 0, 0, 0.33)",
      // }}
      settings={{
        slidingDuration: SLIDING_DURATION,
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
            // const size = getSnapshotSize({
            //   device: deviceState.device,
            //   images: vidSet.images,
            // });
            // bgImage = vidSet?.image;
            bgImage = "";
          } else {
            bgImage = slide.bgImage || pages?.[0]?.bgImage || "";
          }

          const isCurrentlyViewed = slideIndex === currentSlideIndex;

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
                isCurrentlyViewed={isCurrentlyViewed}
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
          width: "50%",
          paddingRight: "calc(2 * var(--spacing)",
          // display: "none",
        }}
        activeColor={"var(--secondary-lighter-3)"}
      />
    </HeroSlider>
  );
};

export default Slider;

/*

<SideNav
        color="rgba (200 , 215 , 235 , 0.6 )"
        activeColor="var(--canvas)"
        className={"side-nav"}
      />
*/
