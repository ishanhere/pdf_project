import React, {Component} from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "../../organism/Routeing/Link";
import MenuIcon from '@material-ui/icons/Menu';

class Header extends Component {
  state = {
    showMenu: false
  };

  toggleMenu = () => {
    // cconsole.log()
    this.state.showMenu = !this.state.showMenu
  };



  render() {
    const { classes } = this.props;

    return(
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h4" className={classes.titleName}>
          {/* <img src='./logo.png' style={{height:'50px',width:'50px'}}></img> */}
          <Link href="/" className={classes.titleName}>
            Love U PDF
          </Link>
        </Typography>
        <Typography
          variant="h6"
          padding="10"
          style={{ float: 'right', paddingLeft: 50, width: '100%' }}
        >
          <Link href="/mergepdfs" className={classes.menuItemResponsive}>Merge PDFs</Link>
          <Link href="imgstopdf" className={classes.menuItemResponsive}>Images to PDF</Link>
          <Link href="/doctopdf" className={!this.state.showMenu ? classes.menuItem : classes.menuItemResponsive }>Convert Doc To PDF</Link>
          <Link href="/ppttopdf" className={!this.state.showMenu ? classes.menuItem : classes.menuItemResponsive }>Convert PPT To PDF</Link>
          <Link href="/imgcompress" className={!this.state.showMenu ? classes.menuItem : classes.menuItemResponsive }>Compress Image</Link>
          <Link href="/contactus" className={!this.state.showMenu ? classes.menuItem : classes.menuItemResponsive }>Contact US</Link>
          <Link href="/aboutus" className={!this.state.showMenu ? classes.menuItem : classes.menuItemResponsive }>About US</Link>
          <MenuIcon className={classes.menuIcon} onClick={this.toggleMenu}/>
        </Typography>
      </Toolbar>
    </AppBar>
    );
};
}


const styles = (theme) => ({
  titleName: {
    width: '20%',
    ['@media (max-width:768px)']: {
      width: '50%',
      textDecoration: 'overline',
      background: 'red'
    }
  },
  menuIcon: {
    display: 'none',
    ['@media (max-width:768px)']: {
      display: 'initial',
      float: 'right'
    }
  },
  menuItem: {
    
    ['@media (max-width:768px)']: {
      display: 'none'
    }
  },
  menuItemResponsive: {
    ['@media (max-width:768px)']: {
      // float: 'none',
      display: 'block',
      textAlign: 'left'
    }
  },
  appBar: {
    position: "relative",
  }
});
export default withStyles(styles, { name: "MuiFilesDragDrop" })(Header);
