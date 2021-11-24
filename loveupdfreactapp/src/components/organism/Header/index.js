import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "../../organism/Routeing/Link";

const Header = (props) => {
  return (
    <AppBar position="static" className={props.appBar}>
      <Toolbar>
        <Typography variant="h4" style={{ width: '20%'}}>
          {/* <img src='./logo.png' style={{height:'50px',width:'50px'}}></img> */}
          <Link href="/" style={{ "text-decoration": "unset"}}>
            Love U PDF
          </Link>
        </Typography>
        <Typography
          variant="h6"
          padding="10"
          style={{ float: 'right', paddingLeft: 50, width: '100%' }}
        >
          <Link href="/mergepdfs">Merge PDFs</Link>
          <Link href="imgstopdf">Images to PDF</Link>
          <Link href="/doctopdf">Convert Doc To PDF</Link>
          <Link href="/ppttopdf">Convert PPT To PDF</Link>
          <Link href="/imgcompress">Compress Image</Link>
          <Link href="/contactus">Contact US</Link>
          <Link href="/aboutus">About US</Link>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
export default Header;
