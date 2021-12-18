let ads = ``;

fetch("/loveupdfreactapp/public/ads.txt")
  .then((response) => response.text())
  .then((data) => {
    ads = data;
  })
  .catch((err) => {
    console.log(err);
  });

export default ads;
