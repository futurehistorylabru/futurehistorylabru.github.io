'use strict';

import 'normalize.css';
import '../css/main.scss';

document.addEventListener("DOMContentLoaded", function() {
  var projectSlider = document.getElementById("project-slider");
  var linkDetails = document.getElementById("link-details");
  var showMenu = document.getElementById("trigger");
  var secondNav = document.getElementById("secondary-nav");
  var body = document.documentElement;

  if (showMenu) {
    showMenu.addEventListener("click", function() {
      if (!showMenu.classList.contains("current")) showMenu.classList.add("current");
      if (secondNav.classList.contains("hidden")) secondNav.classList.remove("hidden");
    });
  }


  if (linkDetails) {
    linkDetails.addEventListener("click", function() {
      var wrapper = document.querySelector(".details .wrapper");
      if (!wrapper.classList.contains("active")) wrapper.classList.add("active");
      scrollTo(body, projectSlider.offsetHeight + 53, 300);
    });
  }
});