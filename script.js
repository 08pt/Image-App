//access key for access the images from unsplash through api
const accessKey = "Q_op945TQ5CfbHjImECLgsWp-LejN1zOCIwCd2l7hxI";

//now import all the html element
const formEle = document.querySelector("form");
const inputEle = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-button");

// initially input data is empty in this all the keyword will store which user will typed and then function will called
let inputData = "";
// initilaly default page no is 1
let page = 1;

// functions

async function searchImages() {
  inputData = inputEle.value;
  //our api will take that keyword and based on keyword search that image from  unsplash.com  for doing this will create dynamic  url using "$"
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}
    &client_id=${accessKey}`;

  // our this above  'url' api will fecth the data from the unsplash api  and show the images inside our this website for
  // doing that  we use fecth and response mwthod for this we convert above function into the async

  const response = await fetch(url);
  const data = await response.json();
  const results = data.results;

  if (page === 1) {
    searchResults.innerHTML = " ";
  }
  // we want result will show one by one we use map()
  results.map((result) => {
    // here we push all the inside the search-results html template
    // so we are just creating the same template using js
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("search-result");

    const image = document.createElement("img");
    image.src = result.urls.small;
    // small is used for thumbnail
    image.alt = result.alt_description;

    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.textContent = result.alt_description;

    // append all those elements inside our  the html page

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    searchResults.appendChild(imageWrapper);
  });
  page++;
  // if imagequery is more than one page than show more button visible
  if (page > 1) {
    showMore.style.display = "block";
  }
}
// the above function will not work until it is called pr trigerred
// so we create an event listener which takes that keyword from the input
// box and called the functiom

// target the form element
formEle.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchImages();
});
// for show more button again call searchImages()

showMore.addEventListener("click", () => {
  searchImages();
});
