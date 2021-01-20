import React from "react";
// JSX
import HeroSlider, { Slide, Nav, OverlayContainer } from "hero-slider";

// Images
const parkUrl =
  "https://images.unsplash.com/photo-1508060698845-34709bc12e1c?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjMxMjYzfQ";
const studiesUrl =
  "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjMxMjYzfQ";

const Slider = ({ children, slides }) => {
  return (
    <HeroSlider
      slidingAnimation="left_to_right"
      orientation="horizontal"
      initialSlide={1}
      onBeforeChange={(previousSlide, nextSlide) =>
        console.log("onBeforeChange", previousSlide, nextSlide)
      }
      onChange={(nextSlide) => console.log("onChange", nextSlide)}
      onAfterChange={(nextSlide) => console.log("onAfterChange", nextSlide)}
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.33)",
      }}
      settings={{
        slidingDuration: 250,
        slidingDelay: 100,
        shouldAutoplay: true,
        shouldDisplayButtons: true,
        autoplayDuration: 5000,
        height: "100vh",
      }}
    >
      <OverlayContainer></OverlayContainer>

      {slides &&
        slides.map((slide, i) => {
          const { bgImage, heading, subheading, p } = slide;
          return (
            <Slide
              background={{
                backgroundImage: bgImage,
                backgroundAttachment: "fixed",
              }}
              slide={slide}
            ></Slide>
          );
        })}

      <Nav />
    </HeroSlider>
  );
};

export default Slider;
