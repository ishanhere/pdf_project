import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Files from "react-files";
import Typography from "@material-ui/core/Typography";
import ModalLoadingAlert from "../ModalLoadingAlert";
import PDFProvider from "../../../lib/provider/pdfProvider";
import { saveSync } from "save-file";
import AdComponent from "../../AdComponent";
class MergePDFS extends Component {
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

    // this.setState({value: event.target.value}, function () {
    //     console.log(this.state.value);
    // });
  };

  onFilesError = (error, file) => {
    console.log("[LOG] Error code " + error.code + ": " + error.message);
  };

  filesRemoveOne = (file) => {
    this.refs.files.removeFile(file);
  };

  filesClearAndRemoveAll = () => {
    this.setState(
      {
        modalOpen: false,
        modalLoading: false,
        modalMsg: {
          err: null,
          success: null,
        },
      },
      () => {
        this.filesRemoveAll();
      }
    );
  };

  filesRemoveAll = () => {
    this.setState(
      {
        files: [],
        hasFiles: false,
      },
      () => {
        this.refs.files.removeFiles();
      }
    );
  };

  startMerge = () => {
    let tempMsg;
    this.setState(
      {
        files: this.state.files,
        hasFiles: false,
        modalOpen: true,
        modalLoading: true,
      },
      () => {
        // this.refs.modal.handleOpen()
        console.log("[LOG] Starting merge...");
      }
    );

    PDFProvider.mergeBetweenPDF(this.state.files)
      .then((res) => {
        // console.log(res)
        if (res && res.hasOwnProperty("pdfFile")) {
          if (res.pdfFile) {
            if (res.pdfNotMergedList.length !== this.state.files.length) {
              const fileName =
                "loveupdf_merge_" +
                new Date()
                  .toISOString()
                  .replace(":", "_")
                  .replace("T", "_")
                  .replace("Z", "") +
                ".pdf";
              saveSync(res.pdfFile, fileName);
            }

            if (res.pdfNotMergedList.length > 0) {
              if (
                res.pdfNotMergedList.length > 0 &&
                res.pdfNotMergedList.length === this.state.files.length
              ) {
                tempMsg =
                  "No merge PDF output could be done. Following files have problem and need to be merged manually: " +
                  res.pdfNotMergedList.join(", ");
              } else {
                tempMsg =
                  "Following files have problem and need to be merged manually: " +
                  res.pdfNotMergedList.join(", ");
              }

              // console.log("[LOG] " + tempMsg);
              this.setState(
                {
                  modalOpen: true,
                  modalLoading: false,
                  modalMsg: {
                    err: tempMsg,
                    success: null,
                  },
                },
                () => {
                  console.log("[LOG] Modal closed.");
                }
              );
            } else {
              tempMsg = "Merge totally successfull and downloaded!";
              // console.log("[LOG] " + tempMsg);
              this.setState(
                {
                  modalOpen: true,
                  modalLoading: false,
                  modalMsg: {
                    err: null,
                    success: tempMsg,
                  },
                },
                () => {
                  // console.log("[LOG] Closed modal");
                }
              );
            }
          }
        } else {
          tempMsg =
            "Internal error at merging! Send this error to the developer in charge.";
          // console.log(tempMsg);
          this.setState(
            {
              modalOpen: true,
              modalLoading: false,
              modalMsg: {
                err: tempMsg,
                success: null,
              },
            },
            () => {
              // console.log("[LOG] Closed modal");
            }
          );
        }
      })
      .catch((err) => {
        // console.log("[LOG] " + err);
      })
      .finally(() => this.filesRemoveAll());
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.containerDiv}>
        <AdComponent />
        <Typography variant="h3">
          Drop Multiple PDFs and Combine them into Single PDF in No Time.
        </Typography>
        <AdComponent />

        <Grid container spacing={32} justify="center">
          <Grid item className={classes.dropFilesGridZone}>
            <Files
              ref="files"
              className={classes.dropFilesZone}
              onChange={this.onFilesChange}
              onError={this.onFilesError}
              accepts={[".pdf"]}
              multiple
              maxFiles={1000}
              maxFileSize={10000000}
              minFileSize={0}
              clickable
            >
              <div className={classes.dropFilesZoneDiv}>
                Drop files here or click to upload
              </div>
            </Files>
          </Grid>
        </Grid>

        {/* <AdComponent /> */}

        <Grid container spacing={32} justify="center">
          {this.state.files.length > 0 ? (
            <Grid item className={classes.dropFilesGridZone}>
              <div className="files-list">
                <ul>
                  {this.state.files.map((file) => (
                    <li className="files-list-item" key={file.id}>
                      <div className="files-list-item-content">
                        <span className="files-list-item-content-item files-list-item-content-item-1 pdfInfoSpan">
                          {file.name}
                        </span>
                        <span className="files-list-item-content-item files-list-item-content-item-2 pdfInfoSpan">
                          {" "}
                          - {file.sizeReadable}
                        </span>
                        {/* <DeleteForeverOutlinedIcon/>s */}
                      </div>
                      <div
                        id={file.id}
                        className="files-list-item-remove"
                        onClick={this.filesRemoveOne.bind(this, file)} // eslint-disable-line
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </Grid>
          ) : (
            <Grid
              item
              className={classes.dropFilesWarningGridZone}
              style={{ margin: 20 }}
            >
              <div className="files-list">No files selected!</div>
            </Grid>
          )}
        </Grid>

        <AdComponent />

        <Grid
          container
          spacing={16}
          justify="center"
          className={classes.gridContainer}
        >
          <Grid item className={classes.btnGrid}>
            <Button
              variant="contained"
              color="primary"
              className={classes.btn}
              disabled={!this.state.hasFiles}
              onClick={this.startMerge}
            >
              Start merge
            </Button>
          </Grid>
          <Grid item className={classes.btnGrid}>
            <Button
              variant="outlined"
              color="secondary"
              className={classes.btn}
              onClick={this.filesClearAndRemoveAll}
            >
              Clear selection
            </Button>
          </Grid>
        </Grid>
        <ModalLoadingAlert
          isOpen={this.state.modalOpen}
          isLoading={this.state.modalLoading}
          msg={this.state.modalMsg}
          clearModalStatus={this.filesClearAndRemoveAll}
        />
      </div>
    );
  }
}

const styles = (theme) => ({
  containerDiv: {
    marginTop: "20px",
    width: "30%",
    marginLeft: "calc((100% - 30% + 200px) / 2)",
    marginRight: "calc((100% - 30% + 200px) / 2)",
    ["@media (max-width:900px)"]: {
      width: "90%",
      marginLeft: "5%",
      marginRight: "5%",
    },
  },
  pdfInfoSpan: {
    marginLeft: "10px",
    padding: "10px",
  },
  dropFilesGridZone: {
    width: "100%",
    height: "250px",
    marginTop: "10px",
    ["@media (max-width:900px)"]: {
      width: "100%",
    },
  },
  dropFilesZone: {
    padding: "2em",
    border: "2px dashed rgba(0, 0, 0, .1)",
    color: "rgba(0, 0, 0, .4)",
    width: "100%",
    display: "flex",
    height: "250px",
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
  gridContainer: {
    marginTop: "20px",
  },
  btnGrid: {
    paddingRight: "10px",
    ["@media (max-width:900px)"]: {
      paddingRight: "0",
      width: "100%",
      marginTop: "10px",
    },
  },
  btn: {
    ["@media (max-width:900px)"]: {
      display: "block",
      width: "100%",
    },
  },
});

export default withStyles(styles, { name: "MuiFilesDragDrop" })(MergePDFS);
