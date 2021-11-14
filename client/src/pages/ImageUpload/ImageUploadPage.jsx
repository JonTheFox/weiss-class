import React, { useState, useContext, useCallback } from "react";
import { AppContext } from "../../contexts/AppContext.jsx";
import clsx from "clsx";
// import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import View from "../../components/layout/View.jsx";
import Card from "../../components/Card/Card.js";
// import "./ImageUploader.scss";
import { useSetRecoilState } from "recoil";
import ImageUploader from "../../components/ImageUploader/ImageUploader.jsx";
import useLogg from "../../hooks/useLogg.jsx";
const { logg, loggError } = useLogg({ label: "ImageUpload" });

const BASE_ROUTE = "/";

const label = "ImageUploadPage";

// const musicPath = "/music/bensound-goinghigher.mp3";

const ImageUploadPage = (props) => {
  const [appUtils, appState] = useContext(AppContext);

  return (
    <View animate={false} className={clsx("image-upload")}>
      <ImageUploader></ImageUploader>
    </View>
  );
};

export default ImageUploadPage;
