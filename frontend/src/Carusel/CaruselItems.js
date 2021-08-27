import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import React from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

export const CaruselItems = () => {
  const { push } = useHistory();
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  let CaruselItemsObj = [
    {
      img: "https://st-adidas-isr.mncdn.com/mnresize/400/200/content/images/thumbs/0069579_karlie-kloss-cover-up-shirt_gh8222_standard-view.jpeg",
      product_code: "gh8222",
    },
    {
      img: "https://st-adidas-isr.mncdn.com/mnresize/400/200/content/images/thumbs/0056337_track-top.jpeg",
      product_code: "gs2630",
    },
    {
      img: "https://st-adidas-isr.mncdn.com/mnresize/400/200/content/images/thumbs/0019244_satin-track-jacket.jpeg",
      product_code: "ed4772",
    },
    {
      img: "https://st-adidas-isr.mncdn.com/mnresize/400/200/content/images/thumbs/0068622_transparent-vrct-jacket_ge5462_standard-view.jpeg",
      product_code: "ge5462",
    },
    {
      img: "https://st-adidas-isr.mncdn.com/mnresize/400/200/content/images/thumbs/0050360_cropped-sweatshirt_ed7426_standard-view.jpeg",
      product_code: "ed7426",
    },
  ];

  return (
    <div style={{ background: "grey" }}>
      <h1>Trending now</h1>
      <Carousel responsive={responsive}>
        {CaruselItemsObj.map((each) => {
          return (
            <div>
              <Link>
                <img
                  style={{ borderRadius: "5%" }}
                  src={each.img}
                  onClick={() => push(`/item=${each.product_code}`)}
                />
              </Link>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};
