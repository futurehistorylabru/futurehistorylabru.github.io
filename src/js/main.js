'use strict';

require('jquery');
require('slick-carousel/slick/slick');
import 'normalize.css';
import 'slick-carousel/slick/slick.css';
import '../css/main.scss';

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

function initAnchors() {
  var body = $('html, body');

  $('.anchor-link[href*="#"]').click(function() {
    var target = $(this.hash);
    if (target.length == 0){ return true; }
    body.animate({scrollTop: target.offset().top - 20 }, 400);
    return false;
  });
}

function initSliders() {
  $('.project-slider-mobile').slick();
  $('.events-slider').slick();
}

function initNav() {
  var el = $('#main');
  var menuTrigger = $('#menu-trigger');
  var mobileMenu = $('.mobile-menu');
  var body = $('html, body');
  var trigger = $('.trigger');
  var url = window.location.pathname.replace(/^\/+/g, '');
  var projects = $('#startpage');
  var contacts = $('#contacts');
  var team = $('#team');
  var section = $('.section');

  setActivePage(el, projects, contacts, team);

  $( window ).resize(function() {
    setActivePage(el, projects, contacts, team);
  });

  setTimeout( function() {
    el.addClass('animated');
  }, 50);

  menuTrigger.click(function(event) {
    el.toggleClass("menu-opened");
    mobileMenu.toggleClass("opened");
  });

  trigger.click(function(event) {
    url = $(this).attr('href').slice(1);
    el.removeClass('startpage-active contacts-active team-active');
    if (url=="projects") {
      url = "startpage";
      el.addClass('' + url + '-active')
      setTimeout( function() {
        body.animate({scrollTop: $('#projects').offset().top - 42 }, 0);
      }, 1);
    } else {
      el.addClass('' + url + '-active')
    }
    setActivePage(el, projects, contacts, team);
    el.removeClass("menu-opened");
    mobileMenu.removeClass("opened");
    event.preventDefault();
  });

  section.click(function(event) {
    url = $(this).attr('id');
    if (!el.hasClass('' + url + '-active')) {
      el.removeClass('startpage-active contacts-active team-active');
      el.addClass('' + url + '-active');
      setActivePage(el, projects, contacts, team);
    }
  });
}

function setActivePage(el, projects, contacts, team) {
  if ($(window).width()>500) {
    var info = $('#startpage .main-info');
    if (el.hasClass('startpage-active')) {
      contacts.css('transform','translateX(' + (info.width() + info.offset().left + 24) + 'px)');
      team.css('transform','translateX(' + (info.width() + info.offset().left + 84) + 'px)');
    }
    if (el.hasClass('contacts-active')) {
      contacts.css('transform','translateX(' + (info.offset().left + 60) + 'px)');
      team.css('transform','translateX(' + (info.width() + info.offset().left + 84) + 'px)');
    }
    if (el.hasClass('team-active')) {
      contacts.css('transform','translateX(' + (info.offset().left + 60) + 'px)');
      team.css('transform','translateX(' + (info.offset().left + 120) + 'px)');
    }
    contacts.css('width','' + (info.width() + 25) + 'px');
    team.css('width','' + (info.width() + info.offset().left) + 'px');
  } else {
    contacts.css('transform', '','width','');
    team.css('transform', '','width','');
  }
}

function initVideos() {
  var videoWrapper = $('.video-wrapper');
  videoWrapper.each(function(){
    var el = $(this);
    var video = $(this).find('.video').get(0);
    var trigger = $(this).find('.video-trigger');
    trigger.click(function() {
      if (video.paused) {
        video.play();
        el.addClass('playing');
      } else {
        video.pause();
        el.removeClass('playing');
      }
    });
  });
}

function equalHeight(el) {
  var el = $('.events-slider');
  el.each(function(){  
    var highestBox = 0;
    $('.events-slider-item', this).each(function(){
      if($(this).height() > highestBox) {
        highestBox = $(this).height(); 
      }
    });
    $('.events-slider-item').css('height', '');
    $('.events-slider-item',this).height(highestBox);        
  }); 
}

$(document).ready(function(){
  showProjectAbout();
  showTeamAbout();
  initAnchors();
  initSliders();
  initNav();
  initVideos();
  equalHeight('.events-slider');
});

$(window).bind("load",function(){
  equalHeight('.events-slider');
});

