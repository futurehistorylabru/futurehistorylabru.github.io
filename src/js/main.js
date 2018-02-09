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
  showTeamAbout();
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

function showTeamAbout() {
  var aboutTeamLink = $('.team-show-more');
  var closeTeamLink = $('.team-about-close-link');

  aboutTeamLink.click(function(event) {
    var el = $(this);
    var container = el.closest('.team-item');
    var about = container.find('.team-about');
    var footer = $('.footer');
    about.removeClass('hidden');
    container.css('margin-bottom', 0);
    container.nextAll().addClass('hidden');
    footer.addClass('hidden');
    event.preventDefault();
  });

  closeTeamLink.click(function(event) {
    var el = $(this);
    var container = el.closest('.team-item');
    var about = container.find('.team-about');
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
  var highestBox = 0;
  $('.events-slider-item').each(function(){
    if($(this).height() > highestBox) {
      highestBox = $(this).height(); 
    }
  });  
  $('.events-slider-item').height(highestBox);
});
