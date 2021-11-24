import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Files from "react-files";
import ModalLoadingAlert from "../ModalLoadingAlert";
import IMGToPdfConverter from "../../../lib/provider/imgToPdfConverter";
import { saveSync } from "save-file";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";

class ImageCompress extends Component {
    state = {
        files: [],
        hasFiles: false,
        modalOpen: false,
        modalLoading: false,
        modalMsg: {
            err: null,
            success: null,
        },
    };

    onFilesChange = (files) => {
        this.setState(
          {
            files,
            hasFiles: files.length > 0 ? true : false,
          },
          () => {
            // console.log(this.state)
          }
        );
    };

    startImgCompression = () => {
        for(var i=0; i < this.state.files.length; i++) {
            let fileReader = new FileReader();
          fileReader.onload = (e) => {
            var img = new Image()
            img.onload = (e) => {
              let canvas = document.createElement('canvas')
              const MAX_WIDTH = 800
              const MAX_HEIGHT = 800
              let width = img.width
              let height = img.height
              if (width > height) {
                if (width > MAX_WIDTH) {
                  height = Math.round((height *= MAX_WIDTH / width))
                  width = MAX_WIDTH
                }
              } else {
                if (height > MAX_HEIGHT) {
                  width = Math.round((width *= MAX_HEIGHT / height))
                  height = MAX_HEIGHT
                }
              }
              canvas.height = 800
              canvas.width = 800
              let ctx = canvas.getContext('2d')
              ctx.fillStyle = '#FFF'
              ctx.fillRect(0, 0, 800, 800);
              let heightPadding = 0, widthPadding = 0;
              if (height != 800) {
                heightPadding = ( 800 - height ) / 2
              }
              if(width != 800) {
                widthPadding = ( 800 - width ) / 2
              }
              ctx.drawImage(img, widthPadding, heightPadding, width, height)
              const newImage = canvas.toDataURL('image/jpeg')
              console.log(newImage)
              var a = document.createElement("a");
              a.href = newImage
                a.download = "Image.png"; //File name Here
                a.click();
              window.location.href = newImage;
            }
            img.src = e.target.result
          }
          fileReader.readAsDataURL(this.state.files[i])
        }
    }

    render() {
        const { classes } = this.props;
    
        return (
            <div className="files">
                <Typography variant="h4">
                Drop Image(s) to compress
                </Typography>
                <Grid container spacing={32} justify="center">
                    <Grid item className={classes.dropFilesGridZone}>
                        <Files
                        ref="files"
                        className={classes.dropFilesZone}
                        onChange={this.onFilesChange}
                        onError={this.onFilesError}
                        accepts={["image/*"]}
                        multiple
                        maxFiles={1000}
                        minFileSize={0}
                        clickable
                        >
                        <div className={classes.dropFilesZoneDiv}>
                            Drop image(s) here or click to upload
                        </div>
                        </Files>
                    </Grid>
                </Grid>
                <Grid container spacing={16} justify="center" className={classes.btnGrid}>
                    <Grid item className={classes.btn}>
                        <Button
                        variant="contained"
                        color="primary"
                        disabled={!this.state.hasFiles}
                        onClick={this.startImgCompression}
                        >
                        Start Compressing Image
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                        variant="outlined"
                        color="secondary"
                        onClick={this.filesClearAndRemoveAll}
                        >
                        Clear selection
                        </Button>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

const styles = (theme) => ({
    dropFilesGridZone: {
      width: "20%",
    },
    dropFilesZone: {
      padding: "2em",
      border: "2px dashed rgba(0, 0, 0, .1)",
      color: "rgba(0, 0, 0, .4)",
      width: "100%",
      display: "flex",
      flexWrap: "wrap",
      boxSizing: "border-box",
      textAlign: "center",
    },
    dropFilesZoneDiv: {
      width: "100%",
    },
    dropFilesWarningGridZone: {
      width: "70%",
      textAlign: "center",
      color: "red",
      fontWeight: "bold",
    },
    btnGrid: {
        marginTop: '20px'
    },
    btn: {
        paddingRight: '10px'
    }
});

export default withStyles(styles, { name: "MuiFilesDragDrop" })(ImageCompress);