import React, { useState, useContext, useRef, useEffect, useCallback } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { AppContext } from "../../contexts/AppContext.jsx";
import PropTypes from "prop-types";
import clsx from "clsx";
import View from "../layout/View.jsx";

let animationFrame;
let logg;
let loggError;
let promiseKeeper;
const label = 'Card';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});


const SimpleCard = React.forwardRef((props, ref) => {
	const { rounds, onCorrect } = props;
	const [appUtils] = useContext(AppContext);
	const { Logger, PromiseKeeper } = appUtils;

	 const classes = useStyles();

	useEffect(() => {
		promiseKeeper = new PromiseKeeper({ label });
		const logger = new Logger({ label });
		logg = logger.logg;
		loggError = logger.loggError;
		return () => {
			window.cancelAnimationFrame(animationFrame);
		};
	}, []);

	return (
		<Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image="assets/characters/OldSageToTheRight"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Lizard
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
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
	);
});

SimpleCard.propTypes = {
	rounds: PropTypes.object,
	onCorrect: PropTypes.func,
};

export default SimpleCard;
