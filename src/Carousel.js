import React, { useEffect, useState } from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  carousel: {
    display: "grid",
    gridAutoFlow: "column",
    gridTemplateColumns: "10% 80% 10%",
    gridTemplateRows: "100vh",
    justifyItems: "center",
    transformStyle: "preserve-3d"
  },
  navButton: {
    alignSelf: "center"
  },
  arrowLeft: {
    borderBottom: "20px solid transparent",
    borderTop: "20px solid transparent",
    borderRight: "20px solid #2f2f2f",
    fontSize: "0",
    lineHeight: 0
  },
  arrowRight: {
    borderBottom: "20px solid transparent",
    borderTop: "20px solid transparent",
    borderLeft: "20px solid #2f2f2f",
    fontSize: "0",
    lineHeight: 0
  },
  slide: {
    opacity: "0",
    position: "absolute",
    top: "0",
    width: "100%",
    margin: "auto",
    padding: "1rem 4rem",
    zIndex: 100,
    transition: "transform .5s, opacity .5s, z-index .5s"
  },
  active: {
    opacity: 1,
    position: "relative",
    zIndex: 900
  }
});

export default () => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(true);
  const [films, setFilms] = useState([]);
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    fetch(`https://swapi.dev/api/films/`, {
      method: "GET"
    })
      .then((res) => res.json())
      .then((response) => {
        setIsLoading(false);
        setFilms(response.results);
      })
      .catch((error) => console.log(error));
  }, []);

  function carouselItems() {
    return films.map((film, index) => {
      return (
        <CarouselItem
          title={film.title}
          subtitle="Charcters"
          classes={
            index == slideIndex
              ? `${classes.slide} ${classes.active}`
              : classes.slide
          }
        />
      );
    });
  }

  return (
    <div className={classes.carousel}>
      <div
        className={classes.navButton}
        onClick={() => setSlideIndex(slideIndex - 1)}
      >
        <i className={classes.arrowLeft}></i>
      </div>
      {carouselItems()}
      <div
        className={classes.navButton}
        onClick={() => setSlideIndex((slideIndex + 1) % films.length)}
      >
        <i className={classes.arrowRight}></i>
      </div>
    </div>
  );
};

function CarouselItem(props) {
  const { title, subtitle } = props || { title: "testTitle", subtitle: "test" };

  return (
    <div className={props.classes}>
      <h1>{title}</h1>
      <h2> {subtitle}</h2>
    </div>
  );
}
