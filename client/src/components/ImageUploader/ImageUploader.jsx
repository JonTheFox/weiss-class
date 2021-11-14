import React, { useEffect, useState, useCallback } from "react";
import ReactImageUploader from "react-images-upload";
import { uploadImage, uploadImageData } from "../../services/uploadImage.js";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { getUniqueString } from "../../lib/issy/index.js";

const ImageUploader = ({ onChange, onUploaded, children, ...otherProps }) => {
  const [uploadedImages, setUploadedImages] = useState([]);

  const handleChange = useCallback(
    async (files) => {
      const newImage = files.slice(-1)[0];
      if (onChange) onChange(newImage, files);
      const uploadedImage = await uploadImage({
        path: `/images/${newImage.name}`,
        image: newImage,
      });

      setUploadedImages((_images) => [..._images, uploadedImage]);

      // insert image URL and other data to DB
      uploadImageData({
        //urls: newImage.urls || [],
        title: "TITLE" || newImage.title,
        id: getUniqueString(),
        ...uploadedImage,
      });

      if (onUploaded)
        onUploaded({ image: uploadedImage, files, file: newImage });
    },
    [setUploadedImages]
  );

  return (
    <React.Fragment>
      <ReactImageUploader
        withIcon={true}
        buttonText="Choose images"
        onChange={handleChange}
        imgExtension={[".jpg", ".gif", ".png", ".gif"]}
        maxFileSize={10242880}
        {...otherProps}
      />
      {uploadedImages &&
        uploadedImages.map((image) => (
          <Card key={image.id || image.name}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                title={image.name}
                image={image?.url}
                alt={image.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {image.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Description
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                Share
              </Button>
              <Button size="small" color="primary">
                Learn More
              </Button>
            </CardActions>
          </Card>
        ))}
    </React.Fragment>
  );
};

ImageUploader.propTypes = {
  onChange: PropTypes.func,
};

export default ImageUploader;
