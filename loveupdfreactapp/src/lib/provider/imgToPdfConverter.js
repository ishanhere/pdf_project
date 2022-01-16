import jsPDF from "jspdf";

// import { CustomImage } from "./custom-image";

const A4_PAPER_DIMENSIONS = {
  width: 210,
  height: 297,
};

const A4_PAPER_RATIO = A4_PAPER_DIMENSIONS.width / A4_PAPER_DIMENSIONS.height;

function imageDimensionsOnA4(dimensions) {
    // cconsole.log()
    if(!dimensions.height || !dimensions.width){
        return {
            width: 210,
        height: 297,
        }
    }
    const isLandscapeImage = dimensions.width >= dimensions.height;
    if (isLandscapeImage) {
        return {
            width: A4_PAPER_DIMENSIONS.width,
            height:A4_PAPER_DIMENSIONS.width / (dimensions.width / dimensions.height),
        };
    }

    const imageRatio = dimensions.width / dimensions.height;
    if (imageRatio > A4_PAPER_RATIO) {
        const imageScaleFactor = (A4_PAPER_RATIO * dimensions.height) / dimensions.width;
        const scaledImageHeight = A4_PAPER_DIMENSIONS.height * imageScaleFactor;
        return {
            height: scaledImageHeight,
            width: scaledImageHeight * imageRatio,
        };
    }

    return {
        width: A4_PAPER_DIMENSIONS.height / (dimensions.height / dimensions.width),
        height: A4_PAPER_DIMENSIONS.height,
    };
};

function fileToImageURL(file) {
    // cconsole.log()
    return new Promise((resolve, reject) => {
    // const image = new CustomImage(file.type);

    // image.onload = () => {
    //   resolve(image);
    // };

    // image.onerror = () => {
    //   reject(new Error("Failed to convert File to Image"));
    // };

    // image.src = URL.createObjectURL(file);
  });
};

function generatePdfFromImages(images){
    // return Promise.then(){

        try {
            const doc = new jsPDF();
            doc.deletePage(1);

            images.forEach((image) => {
            const imageDimensions = imageDimensionsOnA4({
                width: image.width,
                height: image.height,
            });
            // cconsole.log()
            // cconsole.log()

            doc.addPage();

            doc.addImage(
                    image.preview.url,
                    image.imageType,
                    (A4_PAPER_DIMENSIONS.width - imageDimensions.width) / 2,
                    (A4_PAPER_DIMENSIONS.height - imageDimensions.height) / 2,
                    imageDimensions.width,
                    imageDimensions.height
                );
            });

            const pdfURL = doc.output("bloburl");
            var a = document.createElement("a");
            document.body.appendChild(a);
            a.style = "display: none";
            a.href = pdfURL;
            a.download = "loveupdf_img_to_pdf_" + new Date().toISOString().replace(":","_").replace("T","_").replace("Z","") + ".pdf";
            a.click();
            document.body.removeChild(a);
            return{
                flag:true,
            }
        }   
    // }
    catch(err){
        return {
            flag:false,
            err
        }
    }
};


export default {
	generatePdfFromImages
}