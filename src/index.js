import React from "react";
import { render } from "react-dom";
import Carousel from "./Carousel";

const App = () => (
  <div>
    <Carousel />
  </div>
);

render(<App />, document.getElementById("root"));
