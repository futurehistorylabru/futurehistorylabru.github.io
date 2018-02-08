'use strict';

require('jquery');
require('slick-carousel/slick/slick');
import 'normalize.css';
import 'slick-carousel/slick/slick.css';
import '../css/main.scss';

$(document).ready(function(){
  var $root = $('html, body');
  $('a.anchor-link[href*="#"]').click(function() {
    var target = $(this.hash);
    if (target.length == 0){ return true; }
    $root.animate({scrollTop: target.offset().top - 16 }, 400);
    return false;
  });

  $('.footer-item.back a[href*="#"]').click(function() {
    var target = $(this.hash);
    if (target.length == 0){ return true; }
    $root.animate({scrollTop: target.offset().top }, 500);
    return false;
  });

  $('.project-slider-mobile').slick();

  $('.events-slider').slick();

  showProjectAbout();
});

function showProjectAbout() {
  var aboutProjectLink = $('.project-about-link');
  var closeProjectLink = $('.project-about-close-link');

  aboutProjectLink.click(function(event) {
    var el = $(this);
    var container = el.closest('.project-item');
    var about = container.find('.project-about');
    var footer = $('.footer');
    about.removeClass('hidden');
    container.css('margin-bottom', 0);
    container.nextAll().addClass('hidden');
    footer.addClass('hidden');
    event.preventDefault();
  });

  closeProjectLink.click(function(event) {
    var el = $(this);
    var container = el.closest('.project-item');
    var about = container.find('.project-about');
    var footer = $('.footer');
    about.addClass('hidden');
    container.css('margin-bottom', '');
    container.nextAll().removeClass('hidden');
    footer.removeClass('hidden');
    event.preventDefault();
  });
}

$(document).ready(function(){
  var el = $('#main');
  var menuTrigger = $('#menu-trigger');
  var mobileMenu = $('.mobile-menu');
  var $root = $('html, body');

  menuTrigger.click(function(event) {
    el.toggleClass("menu-opened");
    setTimeout( function() {
      mobileMenu.toggleClass("opened");
    } , 50);
  });

  var trigger = $('.trigger');
  var url = window.location.pathname.replace(/^\/+/g, '');
  trigger.click(function(event) {
    url = $(this).attr('href');
    $('.section').removeClass('active');
    if (url=="#projects") {
      url = "#startpage";
      $(url).addClass('active');
      setTimeout( function() {
        $root.animate({scrollTop: $('#projects').offset().top - 42 }, 0);
      } , 1);
    } else {
      $(url).addClass('active');
    }
    el.removeClass("menu-opened");
    mobileMenu.removeClass("opened");
    event.preventDefault();
  });
});

// document.addEventListener("DOMContentLoaded", function() {
//   var url = window.location.pathname.replace(/^\/+/g, ''),
//       windowWidth = window.innerWidth,
//       menuTrigger = document.getElementById("menu-trigger"),
//       main = document.getElementById("main");

//   if (menuTrigger) {
//     menuTrigger.addEventListener("click", function() {
//       if (!main.classList.contains("menu-opened")) {
//         main.classList.add("menu-opened");
//       } else {
//         main.classList.remove("menu-opened");
//       }
//     });
//   }

//   initTabs(url);
// });

// function initTabs(url) {
//   var tabActive = document.getElementById(url),
//       tabTrigger = document.querySelectorAll('.trigger');

//   if (tabActive) {
//     tabActive.classList.add('active');
//   } else {
//     document.getElementById('intro').classList.add('active');
//   }

//   for(var i = 0; i < tabTrigger.length ; i++) {
//     tabTrigger[i].addEventListener("click", function(e) {
//       openTab(this, url);
//       e.preventDefault();
//     });
//   }
// }

// function openTab(elem, url) {
//   var id = elem.getAttribute('data-tab'),
//       main = document.getElementById("main");
//   main.classList.remove("menu-opened");
//   closeTab();
//   document.getElementById(id).classList.add('active');
//   window.history.pushState({url: "" + id + ""}, id, id);
// }

// function closeTab() {
//   var menuElements = document.querySelectorAll('.trigger');
//   for(var i = 0; i < menuElements.length ; i++) {
//     var id = menuElements[i].getAttribute('data-tab');
//     document.getElementById(id).classList.remove('active');
//   }
// }