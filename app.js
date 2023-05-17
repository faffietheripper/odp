let totalClicks = 0;
let maxClicks = 6;

// write a constructor funsction that accepts 2 parameters:
//name
//src
//this function should represented a product, and also have 2 other properties:
//click
//views
//that start at 0
//lastly the constructor has a property which is an array
//each time a new instance of the product is created, it should push itself into the array

function Product(name, src, clicks, views) {
  this.name = name;
  this.src = src;
  this.clicks = clicks;
  this.views = clicks;
  Product.allProducts.push(this);
}

Product.allProducts = [];

const productNames = [
  "bag",
  "banana",
  "bathroom",
  "boots",
  "breakfast",
  "bubblegum",
  "chair",
  "cthulhu",
  "dog-duck",
  "dragon",
  "pen",
  "pet-sweep",
  "scissors",
  "shark",
  "tauntaun",
  "unicorn",
  "water-can",
  "wine-glass",
];

if (localStorage.getItem("productData") === null) {
  // can use exclamation mark at start of local storage
  for (let i = 0; i < productNames.length; i++) {
    new Product(productNames[i], `images/${productNames[i]}.jpeg`, 0, 0);
  }
} else {
  const productData = JSON.parse(localStorage.getItem("productData"));

  for (let i = 0; i < productData.length; i++) {
    new Product(productData[i].name, productData[i].src, productData[i].clicks, productData[i].views);
  }
}

//template literals - allow you to access JS variables using backticks using dollar sign and curly brackets

function randomProductIndex() {
  return Math.floor(Math.random() * Product.allProducts.length);
}

//write a function to render our images
// have the images be chosen randomly from our Product.allProducts.array
//hint, use randomProductIndex() and bracket notation to access the items in the array
function renderImages() {
  // get three random indexes for my product array
  let index1 = randomProductIndex();
  let index2 = randomProductIndex();
  let index3 = randomProductIndex();

  while (index1 === index2 || index1 === index3 || index2 === index3) {
    index2 = randomProductIndex();
    index3 = randomProductIndex();
  }
  //retrieve our image elements
  let img1 = document.getElementById("img1");
  let img2 = document.getElementById("img2");
  let img3 = document.getElementById("img3");

  console.log(Product.allProducts[index1]);

  // change src attribute of img 1,img 2 an dimg 3 to be the source of our random products
  img1.src = Product.allProducts[index1].src;
  img2.src = Product.allProducts[index2].src;
  img3.src = Product.allProducts[index3].src;

  img1.alt = Product.allProducts[index1].name;
  img2.alt = Product.allProducts[index2].name;
  img3.alt = Product.allProducts[index3].name;

  //increase the views for 3 products we are looking at
  Product.allProducts[index1].views++;
  Product.allProducts[index2].views++;
  Product.allProducts[index3].views++;
}

function handleClick(event) {
  console.log("sdfgh");
  //make sure the user is clicking on one of the images (check the event.target.alt)
  if (event.target === imgContainer) {
    alert("Please click one of the images, not in between the images");
    return;
  }
  // check evry single prodcts name against alt tag of the target then increase the clicks on the clicked product object (for loops and clicks +++)
  for (let i = 0; i < Product.allProducts.length; i++) {
    if (event.target.alt === Product.allProducts[i].name) {
      Product.allProducts[i].clicks++;
      break; //stop the loop bcoz we found the product
    }
  }

  //each time we click we need to increase clicks
  //we need to check if we have reached the max number of clicks allowed
  //if we have, dont render more images and remove the eventlistener on the image container
  //when we havent, render more images

  totalClicks++;
  if (totalClicks === maxClicks) {
    alert("Thank you for voting");
    imgContainer.removeEventListener("click", handleClick);
    const productStr = JSON.stringify(Product.allProducts);
    localStorage.setItem("productData", productStr); //takes key and value
    renderChart();
    return;
  }

  //get three new images
  renderImages();
}

const imgContainer = document.getElementById("img-container");
imgContainer.addEventListener("click", handleClick);

//render chart
//using chartJS
//have a chart display in the section underneath the img-container
//use a canvas tag with an id
//use demo chart from chartjs docs
function renderChart() {
  const myChart = document.getElementById("chart");
  let labels = [];
  let viewsData = [];
  let clicksData = [];

  for (let i = 0; i < Product.allProducts.length; i++) {
    labels.push(Product.allProducts[i].name);
    viewsData.push(Product.allProducts[i].views);
    clicksData.push(Product.allProducts[i].clicks);
  }

  const data = {
    labels: labels,
    datasets: [
      {
        label: "# of Views",
        data: viewsData,
        borderWidth: 1,
      },
      {
        label: "# of Votes",
        data: clicksData,
        borderWidth: 1,
      },
    ],
  };
  const config = {
    type: "bar",
    data: data,
  };
  new Chart(myChart, config);
}

//render initial images
renderImages();
