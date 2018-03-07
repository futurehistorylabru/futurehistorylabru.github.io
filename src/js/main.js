'use strict';

require('jquery');
// require('hammerjs');
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
    var wrapper = about.find('.project-about-wrapper');
    var footer = $('.footer');
    about.removeClass('hidden');
    if ($(window).width()<768) {
      container.css('margin-bottom', 0);
      container.nextAll().addClass('hidden');
      footer.addClass('hidden');
    } else {
      if (wrapper.height() + 48 > $(window).height()) {
        wrapper.addClass('project-about-static');
      }
    }
    event.preventDefault();
  });

  closeProjectLink.click(function(event) {
    var el = $(this);
    var container = el.closest('.project-item');
    var about = container.find('.project-about');
    var wrapper = about.find('.project-about-wrapper');
    var footer = $('.footer');
    about.addClass('hidden');
    if ($(window).width()<768) {
      container.css('margin-bottom', '');
      container.nextAll().removeClass('hidden');
      footer.removeClass('hidden');
    } else {
      if (wrapper.height() + 48 > $(window).height()) {
        wrapper.removeClass('project-about-static');
      }
    }
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
    var wrapper = about.find('.team-about-wrapper');
    var footer = $('.footer');
    about.removeClass('hidden');
    if ($(window).width()<768) {
      container.css('margin-bottom', 0);
      container.nextAll().addClass('hidden');
      footer.addClass('hidden');
    }
    event.preventDefault();
  });

  closeTeamLink.click(function(event) {
    var el = $(this);
    var container = el.closest('.team-item');
    var about = container.find('.team-about');
    var footer = $('.footer');
    about.addClass('hidden');
    if ($(window).width()<768) {
      container.css('margin-bottom', '');
      container.nextAll().removeClass('hidden');
      footer.removeClass('hidden');
    }
    event.preventDefault();
  });
}

function initAnchors() {
  $('.anchor-link[href*="#"]').click(function() {
    var target = $(this.hash);
    var top = $(this).attr('data-top');
    if (target.length == 0){ return true; }
    if ($(window).width() > 768) {
      var el = $(this).closest('.scrollable');
      if ($(this).attr('href') == "#top") {
        var distance = 0;
      } else {
        var distance = target.offset().top + el.scrollTop() - top;
      }
      el.animate({scrollTop: distance}, 400);
    } else {
      var el = $('html, body');
      var distance = target.offset().top - top;
      el.animate({scrollTop: distance}, 400);
    }
    return false;
  });
}

function initSliders() {
  $('.project-slider-mobile').slick({
    arrows: true,
    infinite: false,
    nextArrow: '<div class="project-slider-mobile-arrow font-size-h1">></div>',
    responsive: [
      {
        breakpoint: 768,
        settings: {
          infinite: true,
          arrows: false
        }
      }
    ]
  });
  $('.events-slider').on('init', function(event, slick, currentSlide, nextSlide){
    equalHeight($(this));
  });
  $('.events-slider').slick();
  $('.event-gallery').slick();
}

function equalHeight(el) {
  var highestBox = 0;
  el.each(function(){  
    
    $('.slider-item', this).each(function(){
      if($(this).height() > highestBox) {
        highestBox = $(this).height(); 
      }
      $(this).css('height', '');
    });
    
    $('.slider-item',this).height(highestBox);        
  }); 
}

function initVideos() {
  var videoWrapper = $('.video-wrapper');
  videoWrapper.each(function(){
    var el = $(this);
    var video = $(this).find('.video').get(0);
    var trigger = $(this).find('.video-trigger');
    var slider = $(this).closest('.project-slider-mobile');
    var isSliding = false;
    slider.on('beforeChange', function() {
      isSliding = true;
    });
    slider.on('afterChange', function() {
      isSliding = false;
    });
    trigger.click(function() {
      if (isSliding) {
        return;
      } else {
        if (video.paused) {
          video.play();
          el.addClass('playing');
        } else {
          video.pause();
          el.removeClass('playing');
        }
      }  
    });
  });
}

function initGallery() {
  var pos = 1;
  var item = $('.event-item');
  var totalSlides = $('.event-item').length;
  var control = $('.next-event');

  control.click(function() {
    pos++;
    if (pos == totalSlides+1) {
      pos = 1;
    }
    item.removeClass('active');
    $('.event-item[data-pos="' + pos + '"]').addClass('active');
    $('.event-item[data-pos="' + pos + '"]').find('.event-gallery').slick('setPosition');
  });
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
      el.addClass('' + url + '-active');
      if ($(window).width() < 768) {
        setTimeout( function() {
          body.animate({scrollTop: $('#projects').offset().top - 42 }, 0);
        }, 1);
      }
    } else {
      el.addClass('' + url + '-active')
    }
    setActivePage(el, projects, contacts, team);
    el.removeClass("menu-opened");
    mobileMenu.removeClass("opened");
    event.preventDefault();
  });

  section.click(function(event) {
    var target = $(this);
    url = $(this).attr('id');
    if (!el.hasClass('' + url + '-active')) {
      el.removeClass('startpage-active contacts-active team-active');
      $('.section').removeClass('active');
      el.addClass('' + url + '-active');
      target.addClass('active');
      setActivePage(el, projects, contacts, team);
    }
  });
}

function setActivePage(el, projects, contacts, team) {
  if ($(window).width()>768) {
    var info = $('#startpage .main-info');
    var section = el.find('.section');
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

$(document).ready(function(){
  showProjectAbout();
  showTeamAbout();
  initAnchors();
  initNav();
  initVideos();
  initGallery();
  initSliders();
});

