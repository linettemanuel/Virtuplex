var menu = document.querySelector(".nav");
var menuSections =  document.querySelectorAll(".menu-section");
var circles = document.querySelectorAll(".number");

function initComparisons() {
  var x, i;
  /* Find all elements with an "overlay" class: */
  x = document.getElementsByClassName("img-comp-overlay");
  for (i = 0; i < x.length; i++) {
    /* Once for each "overlay" element:
    pass the "overlay" element as a parameter when executing the compareImages function: */
    compareImages(x[i]);
  }
  function compareImages(img) {
    var slider, tagName, img, clicked = 0, w, h;
    /* Get the width and height of the img element */
    w = img.offsetWidth;
    h = img.offsetHeight;
    /* Set the width of the img element to 50%: */
    img.style.width = (w / 2) + "px";
    /* Create slider: */
    slider = document.createElement("DIV");
    slider.setAttribute("class", "img-comp-slider");
    tagName = document.createElement("h3");
    tagName.innerHTML = "Přetáhněte";
    tagName.setAttribute("class", "img-comp-tagname");
    /* Insert slider */
    img.parentElement.insertBefore(slider, img);
    img.parentElement.insertBefore(tagName, img);
    /* Position the slider in the middle: */
    slider.style.top = (h / 2) - (slider.offsetHeight / 2) + "px";
    slider.style.left = (w / 2) - (slider.offsetWidth / 2) + "px";
    /* Execute a function when the mouse button is pressed: */
    slider.addEventListener("mousedown", slideReady);
    /* And another function when the mouse button is released: */
    window.addEventListener("mouseup", slideFinish);
    /* Or touched (for touch screens: */
    slider.addEventListener("touchstart", slideReady);
     /* And released (for touch screens: */
    window.addEventListener("touchstop", slideFinish);
    function slideReady(e) {
      /* Prevent any other actions that may occur when moving over the image: */
      e.preventDefault();
      /* The slider is now clicked and ready to move: */
      clicked = 1;
      /* Execute a function when the slider is moved: */
      window.addEventListener("mousemove", slideMove);
      window.addEventListener("touchmove", slideMove);
    }
    function slideFinish() {
      /* The slider is no longer clicked: */
      clicked = 0;
    }
    function slideMove(e) {
      var pos;
      /* If the slider is no longer clicked, exit this function: */
      if (clicked == 0) return false;
      /* Get the cursor's x position: */
      pos = getCursorPos(e)
      /* Prevent the slider from being positioned outside the image: */
      if (pos < 0) pos = 0;
      if (pos > w) pos = w;
      /* Execute a function that will resize the overlay image according to the cursor: */
      slide(pos);
    }
    function getCursorPos(e) {
      var a, x = 0;
      e = e || window.event;
      /* Get the x positions of the image: */
      a = img.getBoundingClientRect();
      /* Calculate the cursor's x coordinate, relative to the image: */
      x = e.pageX - a.left;
      /* Consider any page scrolling: */
      x = x - window.pageXOffset;
      return x;
    }
    function slide(x) {
      /* Resize the image: */
      img.style.width = x + "px";
      /* Position the slider: */
      slider.style.left = img.offsetWidth - (slider.offsetWidth / 2) + "px";
    }
  }
}

function myFunction() {
    let boxes = document.querySelectorAll(".box");
    if(navigator.userAgent.indexOf("Firefox") != -1 ) {
         boxes.forEach(box => {
           box.style.opacity = 1;
         });
    }
    else {
      boxes.forEach(box => {
        box.style.opacity = 0.95;
      });
    }
}

function changeActiveFieldsOnBoth(a) {
  a.className = a.className.replace("active", "");
}

function countNumber(a, n) {
  if(a.innerHTML == "<span>%</span>") {
    for (let i=1; i < n + 1 ; i++) {
      setTimeout( function timer(){
          a.innerHTML = i + "%";
      }, i*20 );
    }
  }
}

function changeActiveFields() {
  for (var i = 0; i < menu.children.length; i++) {
    activatingField(menu.children[i]);
  }
}

function activatingField(a) {
    a.addEventListener("click", (e) => {
    var current = document.querySelector(".active");
    changeActiveFieldsOnBoth(current);
    e.target.classList.add("active");
  });
}

function countNumber(a, n) {
  if(a.textContent == 0) {
    for (let i=1; i < n + 1 ; i++) {
      setTimeout( function timer(){
          a.textContent = i;
      }, i*10 );
    }
  }
}

window.onscroll = () => {
  menuSections.forEach( (section, index) => {
    if ((section.getBoundingClientRect().top < 0 ) && (section.getBoundingClientRect().bottom > 0)) {
      var current = document.querySelector(".active");
      if (current != null) {
        changeActiveFieldsOnBoth(current);
      }
      menu.children[index].children[0].classList.add("active");
    }
  })
  if(circles[0].getBoundingClientRect().top < 450) {
    let firstNum = circles[0].childNodes[0];
    let secondNum = circles[1].childNodes[0];
    let thirdNum = circles[2].childNodes[0];
    countNumber(firstNum, 600 );
    countNumber(secondNum, 300);
    countNumber(thirdNum, 5);
  }
}

window.onload = () => {
  initComparisons();
  myFunction();
  changeActiveFields();
}
