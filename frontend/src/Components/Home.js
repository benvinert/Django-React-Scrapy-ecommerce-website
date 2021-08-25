import React, { useState } from "react";
import HomePageCarusel from "../Carusel/HomePageCarusel";
import Grid from "@material-ui/core/Grid";
import { CaruselItems } from "../Carusel/CaruselItems";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Image from "material-ui-image";

function Home() {
  const matches = useMediaQuery("(max-width:600px)");

  return (
    <div align="center">
      <Grid container>
        <Grid item xs={1} lg={1} />

        <Grid item xs={10} lg={10}>
          <HomePageCarusel />
          {matches && (
            <div>
              <h1>Get your new clotches now! </h1>
              <Image
                imageStyle={{ width: "100%", height: "100%" }}
                src="https://st-adidas-isr.mncdn.com/mnresize/400/400/content/images/thumbs/0019818_continental-80-shoes.jpeg"
              />
            </div>
          )}
          <CaruselItems />
        </Grid>

        <Grid item xs={1} lg={1} />
      </Grid>
    </div>
  );
}

export default Home;
