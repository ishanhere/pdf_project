let ads = ``;

fetch("/loveupdfreactapp/public/ads.txt")
  .then((response) => response.text())
  .then((data) => {
    ads = data;
    // console.log(data);
  });

export default ads;
