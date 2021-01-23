import React from "react";
// JSX
import HeroSlider, {
  Slide as PresentationSlide,
  Nav,
  OverlayContainer,
} from "hero-slider";
import CenteredHeadings from "../../sections/realtime/SlideTemplates/CenteredHeadings.js";
import Text1 from "../../sections/realtime/SlideTemplates/Text1.js";
import Slide from "../../sections/realtime/SlideTemplates/Slide.js";

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

          debugger;

          return <Slide {...slide}></Slide>;
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
