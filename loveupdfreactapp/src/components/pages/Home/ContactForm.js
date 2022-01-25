import React, { Component, useState } from "react";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import ModalLoadingAlert from "../../organism/ModalLoadingAlert";
import AdComponent from "../../AdComponent";

// import SendIcon from "@material-ui/icons-material/SendIcon";

class ContactForm extends Component {
  state = {
    files: [],
    hasFiles: false,
    modalOpen: false,
    modalLoading: false,
    modalMsg: {
      err: null,
      success: null,
    },
    status: "Send",
  };
  // const [status, setStatus] = useState("Send");

  handleSubmit = (e) => {
    // console.log(e);
    e.preventDefault();
    this.setState({ status: "Sending..." });
    const { name, email, message } = e.target.elements;
    let details = {
      name: name.value,
      email: email.value,
      message: message.value,
    };
    axios({
      url: "/v1/contact",
      method: "POST",
      headers: { "Content-Type": "multipart/form-data" },
      data: details,
    })
      .then(function (response) {
        this.setState({
          status: "Send",
          modalOpen: true,
          modalLoading: false,
          modalMsg: {
            success: "Thanks for writing to US.We'll reach out to you.",
            err: null,
          },
        });
      })
      .catch(function (response) {
        // console.log("doc err", response);
        this.setState(
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
    // let response = await fetch("/v1/contact", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json;charset=utf-8",
    //   },
    //   body: JSON.stringify(details),
    // });
    // setStatus("Submit");
    // let result = await response.json();
    // console.log(result);
    // alert(result.status);
  };
  render() {
    return (
      <div>
        <AdComponent />
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1 },
          }}
          autoComplete="off"
        >
          <Typography
            variant="h4"
            style={{ fontWeight: 800, paddingBottom: 30 }}
          >
            Contact Us
          </Typography>
          <form method="POST" onSubmit={this.handleSubmit}>
            <div>
              <FormControl variant="standard">
                <TextField
                  id="name"
                  required
                  label="Name"
                  variant="outlined"
                  margin="normal"
                  name="name"
                />
              </FormControl>
            </div>
            <div>
              <FormControl variant="standard">
                <TextField
                  id="email"
                  label="Email"
                  required
                  type="email"
                  variant="outlined"
                  margin="normal"
                  name="email"
                />
              </FormControl>
            </div>
            <div>
              <FormControl variant="standard">
                <TextField
                  margin="normal"
                  id="message"
                  label="Message"
                  multiline
                  variant="outlined"
                  required
                  rows={4}
                  defaultValue="Write To Us"
                />
              </FormControl>
            </div>
            <div>
              <Button type="submit" variant="contained">
                {this.state.status}
              </Button>
            </div>
          </form>
          <ModalLoadingAlert
            isOpen={this.state.modalOpen}
            isLoading={this.state.modalLoading}
            msg={this.state.modalMsg}
          />
        </Box>
        <AdComponent />
      </div>
    );
  }
}

export default ContactForm;

{
  /* // <form onSubmit={handleSubmit}>
//   <div>
//     <TextField id="outlined-basic" label="Name" variant="outlined" />
//     {/* <label htmlFor="name">Name:</label>
//     <input type="text" id="name" required /> */
}
//   </div>
//   <div>
//     <TextField id="outlined-basic" label="Email" variant="outlined" />
//     {/* <label htmlFor="email">Email:</label>
//     <input type="email" id="email" required /> */}
//   </div>
//   <div>
//     <TextareaAutosize
//       aria-label="empty textarea"
//       placeholder="Write to Us"
//       style={{ width: 200 }}
//     />
//     {/* <label htmlFor="message">Message:</label>
//     <textarea id="message" required />*/}
//   </div>
//   <button type="submit">{status}</button>
// </form> */}
