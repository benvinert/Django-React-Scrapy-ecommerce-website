import React, { useState, useContext, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { LikeItemsContext } from "../Context/LikeItemsContext";
import Item from "../Items/Item";
import Snackbar from "@material-ui/core/Snackbar";
import Button from "@material-ui/core/Button";
import AlertMessage from "./AlertMessage";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const LikeItems = () => {
  const { likeItems, setLikeItems } = useContext(LikeItemsContext);
  const [Loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState({ flag: false, message: "" });

  useEffect(() => {
    setLoading(false);
  }, [Loading]);

  const clearLikeItems = () => {
    setLikeItems([]);
    setShowAlert({ flag: true, message: "All Items Cleared" });
    setTimeout(() => setShowAlert({ flag: false, message: "" }), 3000);
  };

  const mobileScreen = useMediaQuery("(max-width:600px)");
  let columnsOfGrid = 8;
  if (mobileScreen) {
    columnsOfGrid = 12;
  }

  return (
    <>
      <Grid container>
        <Grid item xl={2} md={2} sm={4} xs={4}>
          <div style={{ paddingLeft: 10 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={clearLikeItems}
            >
              Clear youre like list
            </Button>
          </div>
        </Grid>
        <Grid
          container
          item
          xl={columnsOfGrid}
          md={columnsOfGrid}
          sm={columnsOfGrid}
          xs={columnsOfGrid}
        >
          <Grid container style={{ marginTop: 25 }}>
            <h1>Your Like List({likeItems.length})</h1>
          </Grid>
          <AlertMessage showAlert={showAlert} />
          {likeItems.length == 0 ? <h1>You'r LikeList is Empty</h1> : null}
          {Loading ? (
            <h1>Loading....</h1>
          ) : (
            <Item
              fromWhere={"likelist"}
              items={likeItems}
              loading={Loading}
              setshowalert={setShowAlert}
            />
          )}
        </Grid>

        <Grid item xl={2} md={2} sm={2} xs={2}></Grid>
      </Grid>
    </>
  );
};

export default LikeItems;
