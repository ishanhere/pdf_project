import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Files from "react-files";
import ModalLoadingAlert from "../ModalLoadingAlert";
import PDFProvider from "../../../lib/provider/pdfProvider";
import { saveSync } from "save-file";
import { docxpdf } from "docx-pdf";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import axios from "axios";

class DoctoPDF extends Component {
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

  doctoPDF = () => {
    let this1 = this;
    this.setState(
      {
        files: this.state.files,
        hasFiles: false,
        modalOpen: true,
        modalLoading: true,
      },
      () => {}
    );
    const formData = new FormData();
    formData.append("docFile", this.state.files[0]);
    axios({
      url: "/v1/doctopdf",
      method: "POST",
      headers: { "Content-Type": "multipart/form-data" },
      data: formData,
    })
      .then(function (response) {
        const downloadLink = document.createElement("a");
        downloadLink.href =
          "data:application/pdf;base64," + response.data.base64Response;
        downloadLink.download =
          "loveupdf_word_to_pdf_" +
          new Date()
            .toISOString()
            .replace(":", "_")
            .replace("T", "_")
            .replace("Z", "") +
          ".pdf";
        downloadLink.click();
        console.log("this", this);
        this1.setState({
          modalOpen: true,
          modalLoading: false,
          modalMsg: {
            success:
              "Doc To Pdf Convertion Completed successfully and downloaded!\n",
            err: null,
          },
        });
      })
      .catch(function (response) {
        console.log("doc err", response);
        console.log("this1", this1);

        this1.setState(
          {
            modalOpen: true,
            modalLoading: false,
            modalMsg: {
              success: null,
              err: "Oopps ! something went wrong!!\n Please TRY AGAIN \n",
            },
          },
          () => {
            console.log("[LOG] Closed modal");
          }
        );
      });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className="files">
        <Grid container spacing={32} justify="center">
          <Grid item className={classes.dropFilesGridZone}>
            <Files
              ref="files"
              className={classes.dropFilesZone}
              onChange={this.onFilesChange}
              onError={this.onFilesError}
              accepts={[".doc", ".docx"]}
              multiple
              maxFiles={1}
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

        <Grid container spacing={16} justify="center">
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              disabled={!this.state.hasFiles}
              onClick={(e) => this.doctoPDF(e)}
            >
              Convert DOC file to PDF
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
  pdfInfoSpan: {
    marginLeft: "10px",
    padding: "10px",
  },
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
});

export default withStyles(styles, { name: "MuiFilesDragDrop" })(DoctoPDF);
