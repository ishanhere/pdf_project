const express = require("express");
var docxConverter = require("docx-pdf");
const app = express();
var multer = require("multer");
var cors = require("cors");
const pdf2base64 = require("pdf-to-base64");
const bodyParser = require("body-parser");
const pino = require("express-pino-logger")();
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const gs = require("ghostscript-node");
var CloudmersiveConvertApiClient = require("cloudmersive-convert-api-client");
var defaultClient = CloudmersiveConvertApiClient.ApiClient.instance;
var Apikey = defaultClient.authentications["Apikey"];
const nodemailer = require("nodemailer");

Apikey.apiKey = "d389725c-3192-4421-8457-190e099b1799";
// app.use(express.static(path.join(__dirname, "public")));

var apiInstance = new CloudmersiveConvertApiClient.ConvertDocumentApi();

app.use(cors());

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// if (process.env.NODE_ENV === "production") {
// Exprees will serve up production assets
app.use(express.static("../../loveupdfreactapp/build"));
// app.get("/", "./loveupdfreactapp/public/index.html");

process.once("SIGUSR2", function () {
  process.kill(process.pid, "SIGUSR2");
});

process.on("SIGINT", function () {
  // this is only called on ctrl+c, not restart
  process.kill(process.pid, "SIGINT");
});

// app.get("/go", (req, res) => {
//   console.log("there");
//   res.send("This is from express.js");
//   res.sendFile("./loveupdfreactapp/public/index_1.html");
// });

// app.get("*", (req, res) => {
//   res.sendFile(
//     path.resolve(
//       __dirname,
//       "./loveupdfreactapp/build",
//       "./loveupdfreactapp/public/index.html"
//     )
//   );
// });
// }

const checkFileType = function (req, file, callback) {
  const filetypes = /doc|docx/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return callback(null, true);
  } else {
    return callback("This Extension is not supported");
  }
  // var ext = path.extname(file.originalname);
  // if (ext !== ".docx" && ext !== ".doc") {
  //   return callback("This Extension is not supported");
  // }
  // callback(null, true);
};

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "server/uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const docxtopdfdemoupload = multer({ storage: storage }); //fileFilter:checkFileType

app.post("/v1/doctopdf", docxtopdfdemoupload.single("docFile"), (req, res) => {
  if (req.file) {
    let outputFilePath = Date.now() + "_output.pdf";

    docxConverter(req.file.path, outputFilePath, function (err, result) {
      if (err) {
        fs.unlinkSync(req.file.path);
        err.status(400).send({ message: "File Not found !" });
      }
      pdf2base64(outputFilePath)
        .then((response) => {
          let base64Response = {
            base64Response: response,
          };
          res.send(base64Response);
          fs.unlinkSync(req.file.path);
          fs.unlinkSync(outputFilePath);
        })
        .catch((error) => {
          res.status(400).send({ message: error });
        });
    });
  } else {
    res.status(400).send({ message: "This is an error!" });
  }
});

const pdfUploadToCompress = multer({ storage: storage });

// app.post('/v1/compresspdf',pdfUploadToCompress.single('pdfFile'),(req,res) => {
//     var inputFile = req.file;
//     outputFilePath = Date.now() + "_output.pdf";
//     console.log(outputFilePath);

//     exec(gs `\ -q -dNOPAUSE -dBATCH -dSAFER \ -sDEVICE=pdfwrite \ -dCompatibilityLevel=1.3 \ -dPDFSETTINGS=/ebook \ -dEmbedAllFonts=true \ -dSubsetFonts=true \ -dAutoRotatePages=/None \ -dColorImageDownsampleType=/Bicubic \ -dColorImageResolution=72 \ -dGrayImageDownsampleType=/Bicubic \ -dGrayImageResolution=72 \ -dMonoImageDownsampleType=/Subsample \ -dMonoImageResolution=72 \ -sOutputFile=${outputFilePath} \ ${inputFile}`,
//       (err, stdout, stderr) => {
//         if (err) {
//             res.json({
//                 error: "some error takes place: "+stderr,
//             });
//             res.status(400);
//             fs.unlinkSync(req.file.path)
//         }
//         // res.json({
//         //     path: outputFilePath,
//         // });
//         pdf2base64(outputFilePath)
//         .then(
//             (response) => {
//                 let base64Response ={
//                     base64Response:response
//                 }
//                 res.send(base64Response);
//                 fs.unlinkSync(req.file.path)
//                 fs.unlinkSync(outputFilePath)
//             }
//         )
//         .catch(
//             (error) => {
//                 console.log('ishan_error_response',error); //Exepection error....
//             }
//         )
//       }
//     );
// });

const pptUpload = multer({ storage: storage });

app.post("/v1/pptToPDF", pptUpload.single("pptFile"), (req, res) => {
  var inputFilePPT = Buffer.from(fs.readFileSync(req.file.path).buffer);
  outputPptToPdfFilePath = Date.now() + "_output.pdf";
  apiInstance.convertDocumentPptxToPdf(
    inputFilePPT,
    function (error, data, response) {
      if (error) {
        console.error(error);
        res.status(400).send({ message: "This is an error from server!" });
      } else {
        fs.writeFile(outputPptToPdfFilePath, data, "binary", function (err) {
          if (err) {
            console.log(err);
            res.status(400).send({ message: "This is an error from server!" });
          } else {
            console.log("The file was saved!");
            pdf2base64(outputPptToPdfFilePath)
              .then((response) => {
                let base64Response = {
                  base64Response: response,
                };
                res.send(base64Response);
                fs.unlinkSync(req.file.path);
                fs.unlinkSync(outputPptToPdfFilePath);
              })
              .catch((error) => {
                res
                  .status(400)
                  .send({ message: "This is an error from server!" });
                console.log("v1/pptToPDF", error); //Exepection error....
              });
            // apiInstance = new CloudmersiveConvertApiClient.EditPdfApi();
            // inputFile2 = Buffer.from(fs.readFileSync(outputPptToPdfFilePath).buffer);
            // var callback2 = function(error, data, response) {
            //     if (error) {
            //     console.error(error);
            //     } else {

            //     fs.writeFile(outputPptToPdfFilePath, data,  "binary",function(err) {
            //         if(err) {
            //             console.log(err);
            //         } else {
            //             console.log("The second file was saved!");
            //         }
            //     });

            //     console.log('Successful - done.');
            //     }
            // };

            // apiInstance.editPdfRasterize(inputFile2, callback2);
          }
        });
      }
    }
  );
});

const contactEmail = nodemailer.createTransport({
  host: "smtp.zoho.in",
  secure: true,
  port: 465,
  auth: {
    user: "support@loveupdf.com",
    pass: "sLb0G4zvFK9E",
  },
});

contactEmail.verify((error) => {
  if (error) {
    console.log("erroe456", error);
  } else {
    console.log("Ready to Send");
  }
});

app.post("/v1/contact", (req, res) => {
  console.log("threr");
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;
  const mail = {
    from: "support@loveupdf.com",
    to: "support@loveupdf.com",
    subject: "Contact Form Submission",
    html: `<p>Name: ${name}</p>
           <p>Email: ${email}</p>
           <p>Message: ${message}</p>`,
  };
  contactEmail.sendMail(mail, (error) => {
    console.log("error123", error);
    if (error) {
      res.json({ status: "ERROR" });
    } else {
      res.json({ status: "Message Sent" });
    }
  });
});

const PORT = 8080;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
