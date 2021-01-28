import React, {
  useState,
  useContext,
  useRef,
  useEffect,
  //useCallback
} from "react";
import PieChart from "react-minimal-pie-chart";
//import FlightTakeoff from "@material-ui/icons/FlightTakeoff";
import { AppContext } from "../../contexts/AppContext.jsx";
import PropTypes from "prop-types";
import clsx from "clsx";
import DURATIONS from "../../constants/durations.js";
import "./_PieChart.scss";

const defaultData = [
  {
    color: "var(--primary)",
    title: "Student",
    value: 100,
  },
];

let animationFrame;
let logg;
// let loggError;
// let promiseKeeper;
const componentlabel = "PieChart";

const CustomPieChart = React.forwardRef((props, ref) => {
  const {
    data,
    className = "",
    animate = true,
    animationDuration = DURATIONS.enter,
    animationEasing = "ease-out", //or "all"
    //animationEasing = "all",
    //transition="all"
    cx = 50,
    cy = 50,
    labelStyle = {
      fontFamily: "inherit",
    },
    //segmentsStyle = {},
    //label={"donut"}
    //label = "",
    labelPosition = 55,
    lengthAngle = 360,
    lineWidth = 75,
    onClick,
    onMouseOut,
    onMouseOver,
    paddingAngle = 2,
    radius = 45,
    rounded = false,
    startAngle = 180,
    startReveal = 100,
    viewBoxSize = [100, 100],
    background = "var(--white)",

    active = true,
    showHoverAnimation = true,
    animateSelected = true,
    pauseAnimation = false,
  } = props;

  const [appUtils] = useContext(AppContext);
  const { Logger } = appUtils;

  // const [reveal] = useState(startReveal);
  // const [selected, setSelected] = useState("");
  const [selectedSegment, setSelectedSegment] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(-3);
  const [hoveredIndex, setHoveredIndex] = useState(-3);
  const [lastHoveredIndex, setLastHoveredIndex] = useState(-3);

  const refs = useRef({ active: false });

  const handleMouseOver = (ev, _data, sectionIndex) => {
    setHoveredIndex(sectionIndex);
    if (onMouseOver) onMouseOver(ev, _data, sectionIndex);
  };

  const handleMouseOut = (ev, _data, sectionIndex) => {
    setLastHoveredIndex(sectionIndex);
    if (onMouseOut) onMouseOut(ev, _data, sectionIndex);
  };

  const handleClick = (ev, chartData, sectionIndex) => {
    if (!refs.current.active) return null;
    const _selectedSeg = chartData[sectionIndex];
    setSelectedSegment(_selectedSeg);
    setSelectedIndex(sectionIndex);
    if (onClick) {
      onClick({
        ev,
        chartData,
        sectionIndex,
        title: _selectedSeg.title,
      });
    }
  };

  useEffect(() => {
    const logger = new Logger({ label: componentlabel });
    logg = logger.logg;
    // loggError = logger.loggError;
    //promiseKeeper = new PromiseKeeper({ label: componentlabel });
    return () => {
      window.cancelAnimationFrame(animationFrame);
    };
  }, [Logger]);

  useEffect(() => {
    refs.current.active = active;
  }, [active]);

  useEffect(() => {
    refs.current.lastHoveredIndex = lastHoveredIndex;
  }, [lastHoveredIndex]);

  useEffect(() => {
    refs.current.hoveredIndex = hoveredIndex;
  }, [hoveredIndex]);

  useEffect(() => {
    refs.current.selectedIndex = selectedIndex;
  }, [selectedIndex]);

  useEffect(() => {
    refs.current.selectedSegment = selectedSegment;
  }, [selectedSegment]);

  useEffect(() => {}, [pauseAnimation]);

  useEffect(() => {}, [animateSelected]);

  useEffect(() => {
    logg("data: ", data);
  }, [data]);

  return (
    <PieChart
      data={data || defaultData}
      className={clsx(
        "PieChart fullsize",
        className && className,
        active ? "active" : "inactive",
        showHoverAnimation && "showHoverAnimation",
        animateSelected && `animate-segment--${selectedIndex + 1}`,
        pauseAnimation && "pause-animation",
        `hovered-index--${hoveredIndex}`,
        `last-hovered-index--${lastHoveredIndex}`,
        `selected-index--${selectedIndex}`,
        `selected-child-index--${selectedIndex + 1}`
      )}
      animate={animate}
      animationDuration={animationDuration || DURATIONS.enter}
      animationEasing={animationEasing}
      //transition="all"
      cx={cx}
      cy={cy}
      labelStyle={labelStyle}
      //label={"donut"}
      label={(labelProps) => {
        const { dataIndex } = labelProps;
        return data?.[dataIndex]?.title?.toLowerCase?.() ?? {};
      }}
      labelPosition={labelPosition}
      lengthAngle={lengthAngle}
      lineWidth={lineWidth}
      onClick={handleClick}
      onMouseOut={handleMouseOut}
      onMouseOver={handleMouseOver}
      paddingAngle={paddingAngle}
      radius={radius}
      rounded={rounded}
      startAngle={startAngle}
      reveal={startReveal}
      viewBoxSize={viewBoxSize}
      background={background}
      active={active}
    />
  );
});

CustomPieChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  onClick: PropTypes.func,
  onMouseOver: PropTypes.func,
  onMouseOut: PropTypes.func,
  active: PropTypes.bool,
  showHoverAnimation: PropTypes.bool,
  animateSelected: PropTypes.bool,
  pauseAnimation: PropTypes.bool,
  className: PropTypes.string,
  paddingAngle: PropTypes.number,
};

export default CustomPieChart;
