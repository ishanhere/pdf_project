import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import LandingPage from "./LandingPage";
import MergePDFS from "../../organism/MergePDFS";
import ImagetoPDF from "../../organism/ImagetoPDF";
import DoctoPDF from "../../organism/DoctoPDF";
import PptToPDF from "../../organism/PptToPDF";
import ImageCompress from "../../organism/ImageCompress"
import Route from "../../organism/Routeing/Routes";
import Header from "../../organism/Header";
import HeaderV2 from "../../organism/HeaderV2";
import { spacing } from "@material-ui/system";
import ContactForm from "./ContactForm";
import AboutUs from "./AboutUs";
import Ads from "./Ads";

const Home = (props) => {
  const { classes } = props;

  return (
    <>
      <HeaderV2 />
      <main className={classes.heroUnit} style={{ textAlign: "center" }}>
        <div className={classes.heroContent}>
          <Route path="/" classes={classes}>
            <LandingPage />
          </Route>
          <Route path="/mergepdfs">
            <MergePDFS />
          </Route>
          <Route path="/imgstopdf">
            <ImagetoPDF />
          </Route>
          <Route path="/doctopdf">
            <DoctoPDF />
          </Route>
          <Route path="/ppttopdf">
            <PptToPDF />
          </Route>
          <Route path="/imgcompress">
            <ImageCompress />
          </Route>
          <Route path="/contactus">
            <ContactForm />
          </Route>
          <Route path="/aboutus">
            <AboutUs />
          </Route>
          <Route path="/ads.txt">
            <Ads />
          </Route>
        </div>
      </main>
    </>
  );
};

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = (theme) => ({
  icon: {
    marginRight: theme.spacing.unit * 2,
  },
  heroUnit: {
    backgroundColor: "#ffffff",
  },
  heroContent: {
    // maxWidth: 600,
    margin: "0 auto",
    // textAlign:'center',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4,
  },
  landingPage: {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    boxSizing: "border-box",
    textAlign: "center",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`,
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: "#ffffff",
    padding: theme.spacing.unit * 6,
  },
  links: {
    color: "white",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
  },
});

export default withStyles(styles)(Home);
