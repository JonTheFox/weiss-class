import React from "react";
// JSX
import HeroSlider, {
  Slide as PresentationSlide,
  Nav,
  OverlayContainer,
} from "hero-slider";
import Slide from "../SlidePageTemplates/Slide.js";
import CenteredHeadings from "../SlidePageTemplates/CenteredHeadings.js";
import Text1 from "../SlidePageTemplates/Text1.js";

const SLIDE_TEMPLATES = { CenteredHeadings, Text1 };

const Slider = ({ children, slides }) => {
  return (
    <HeroSlider
      slidingAnimation="left_to_right"
      orientation="horizontal"
      initialSlide={1}
      onBeforeChange={(previousSlide, nextSlide) => {
        //console.log("onBeforeChange", previousSlide, nextSlide)
      }}
      onChange={(nextSlide) => {
        console.log("onChange", nextSlide);
      }}
      onAfterChange={(nextSlide) => console.log("onAfterChange", nextSlide)}
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.33)",
      }}
      settings={{
        slidingDuration: 250,
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
            >
              <Slide {...slide}></Slide>
            </PresentationSlide>
          );
        })}

      <Nav />
    </HeroSlider>
  );
};

export default Slider;

/*background={{
                backgroundImage: bgImage,
                backgroundAttachment: "fixed",
              }}*/
