import { createMuiTheme } from "@material-ui/core/styles/";

const paletteTheme = {
  primary: { main: "rgba(148, 116, 204, 1)" }, // washed up purple
  secondary: { main: "rgba(68, 221, 238, 1)" }, //light blue
  canvasColor: "#e0e0e0", // silver
  //canvasColor: "rgba(255, 255, 255, 0.87)" //white
};

const theme = createMuiTheme({
  palette: paletteTheme,
  spacing: 8,
  typography: {
    fontFamily: ["Nunito"].join(","),
    htmlFontSize: 14,
  },
  layout: {
    appbarHeightXs: 40,
    appbarHeightSm: 48,
    appbarHeightMd: 56,
    appbarHeightLg: 64,
    drawerWidth: 210,
    promptHeight: 50,
  },
});

export default theme;
