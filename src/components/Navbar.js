import React from "react";
import { AppBar, Toolbar, makeStyles, Typography } from "@material-ui/core";
import Logo from "../assets/logo.png"

const useStyles = makeStyles(theme => ({
  root: {
    alignItems: "center",
  },
  title: {
    flexGrow: 1
  },
  logo: {
    height: 30,
    width: 30,
    marginRight: theme.spacing(1)
  }
}));

const Navbar = () => {
  const classes = useStyles();
  return (
    <AppBar position="static" elevation={0}>
      <Toolbar>
        <img className={classes.logo} alt="logo" src={Logo} />
        <Typography variant="h6" className={classes.title}>
          Spot<strong>Angels</strong> - meter analytics
        </Typography>
      </Toolbar>
    </AppBar>
  )
};

export default Navbar;