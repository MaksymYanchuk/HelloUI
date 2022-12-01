const sliderContainer = document.querySelector (".main-block__partners__slider__content");
const sliderLine = document.querySelector(".main-block__partners__slider-line");
const sliderItem = document.querySelector(".slider__item-container");
const sliderIndicator = document.querySelector(".main-block__partners__slider__indicator");
const buttonPrev = document.querySelector(".main-block__partners__slider-button-prev");
const buttonNext = document.querySelector(".main-block__partners__slider-button-next");
let offset = 0;
let itemToShow;
let rectanglesToShow;
let sliderLineWidth;
let currentElement = 0;
let rightElement = currentElement+1;;
let leftElement = currentElement-1;;
itemWidth = parseInt(getComputedStyle(sliderItem).width)+parseInt(getComputedStyle(sliderLine).gap);

function sliderLoad() {
  if (window.innerWidth > 1349.98) {
    itemToShow = 6;
  } else if (window.innerWidth <= 1349.98 && window.innerWidth > 990.98) {
    itemToShow = 5;
  } else if (window.innerWidth <= 990.98 && window.innerWidth > 767.98) {
    itemToShow = 4;
  } else if (window.innerWidth <= 767.98 && window.innerWidth > 599.98) {
    itemToShow = 3;
  } else if (window.innerWidth < 599.98) {
    sliderContainer.style.width = "auto";
    sliderLine.style.position = "static";
    sliderContainer.style.margin ="auto";
    return;
  }
  rectanglesToShow = ((sliderLine.scrollWidth+parseInt(getComputedStyle(sliderLine).gap))+1)/itemWidth-itemToShow;
  itemWidth =parseInt(getComputedStyle(sliderItem).width)+parseInt(getComputedStyle(sliderLine).gap);
  sliderLine.style.position = "relative";
  sliderContainer.style.width = itemWidth * itemToShow + "px";
  sliderContainer.style.margin ="0px";
  resizeCheck();
  removeElements();
  addElements();
  itemsCheck();
  uncolor();
  colorElements();
}

function resizeCheck(){
  if (offset+(itemWidth * itemToShow)-parseInt(getComputedStyle(sliderLine).gap)>sliderLine.scrollWidth){
   offset-=itemWidth;
   sliderLine.style.left = -offset + "px";
   currentElement-=1;
   rightElement = currentElement+1;;
   leftElement = currentElement-1;;
  }
}

function removeElements() {
  document.querySelectorAll('.indicator').forEach((item)=> item.remove());
}

function addElements(){
  for (let index = 0; index < rectanglesToShow; index++) {
    let newElement = document.createElement('div')
    sliderIndicator.prepend(newElement);
    newElement.classList.add('indicator');
  }
}

function uncolor(){
  document.querySelectorAll('.indicator').forEach((item)=> {
    item.classList.remove("purple")
    item.classList.remove("light-purple")
  }
)}

function colorElements(){
  itemsCheck();
  sliderIndicator.children[currentElement].classList.add('purple');
  rightElement!==sliderIndicator.children.length&&rightElement!==sliderIndicator.children.length+1&&sliderIndicator.children[rightElement].classList.add('light-purple');
  leftElement!==-1&&sliderIndicator.children[leftElement].classList.add('light-purple');
}

function itemsCheck(){
  if (currentElement>=(document.querySelectorAll('.indicator').length)){
    currentElement = 0;  
    leftElement = currentElement-1;  
    rightElement = currentElement+1;
  } else if(currentElement<0) {
    currentElement = sliderIndicator.children.length-1;  
    leftElement = currentElement-1;  
    rightElement = currentElement+1;
  }
}

buttonNext.addEventListener("click", function () {
    let sliderLineWidth = parseFloat(sliderLine.scrollWidth);
    let itemWidth =
      parseInt(getComputedStyle(sliderItem).width) +
      parseInt(getComputedStyle(sliderLine).gap);
    offset += itemWidth;
    if (
      offset >
      sliderLineWidth -
        itemWidth * itemToShow +
        parseInt(getComputedStyle(sliderLine).gap)
    ) {
      offset = 0;
    }
    sliderLine.style.left = -offset + "px";
    currentElement+=1
    rightElement+=1
    leftElement+=1
    itemsCheck();
    uncolor();
    colorElements();
  }
);

buttonPrev.addEventListener("click", function () {
    let sliderLineWidth = parseFloat(sliderLine.scrollWidth);
    let itemWidth =
      parseInt(getComputedStyle(sliderItem).width) +
      parseInt(getComputedStyle(sliderLine).gap);
    offset -= itemWidth;
    if (offset < 0) {
      offset =
        sliderLineWidth -
        itemWidth * itemToShow +
        parseInt(getComputedStyle(sliderLine).gap);
    }
    sliderLine.style.left = -offset + "px";
    currentElement-=1
    rightElement-=1
    leftElement-=1
    itemsCheck();
    uncolor();
    colorElements();
  }
);

window.addEventListener("resize", sliderLoad)
window.onload = sliderLoad();