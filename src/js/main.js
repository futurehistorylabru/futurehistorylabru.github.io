'use strict';

require('jquery');
require('hammerjs');
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
    if ($(window).width()<500) {
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
    if ($(window).width()<500) {
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
    if ($(window).width()<500) {
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
    if ($(window).width()<500) {
      container.css('margin-bottom', '');
      container.nextAll().removeClass('hidden');
      footer.removeClass('hidden');
    }
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

function initDrag() {
  $('.project-img-item').each(function(){
    var myBlock = $(this);
    var mc = new Hammer(myBlock[0]);

    mc.add( new Hammer.Pan({ 
      threshold: 0,
      recognizers: [
        [Hammer.Pan, { direction: Hammer.DIRECTION_ALL }],
        [Hammer.Tap]
      ]
    }));

    mc.on('tap', function(ev) {
      var elem = ev.target;
      var wrapper = elem.closest('.project-img-item');
      modifyDragIndex(wrapper);
    });

    mc.on("pan", handleDrag);

    var lastPosX = 0;
    var lastPosY = 0;
    var isDragging = false;

    function handleDrag(ev) {
      var elem = ev.target;
      var wrapper = elem.closest('.project-img-item');

      if ( ! isDragging ) {
        isDragging = true;
        modifyDragIndex(wrapper);
      }
      
      var posX = ev.deltaX + lastPosX;
      var posY = ev.deltaY + lastPosY;
      
      wrapper.style.transform = 'translate3d(' + posX + 'px, ' + posY + 'px, 0)';
      
      if (ev.isFinal) {
        isDragging = false;
        lastPosX = posX;
        lastPosY = posY;
      }
    }
  });
}

function modifyDragIndex(elem) {
  $('.project-img-item').each(function(){
    if($(this).css('z-index') == 4) {
      $(this).css('z-index', '');
    }
    elem.style.zIndex = 4;
  });
}

function initZoom() {
  $('.project-img-zoom').click(function() {
    if($(this).closest('.project-img-item').css('width') == '800px') {
      $(this).closest('.project-img-item').css('width', '');
    } else {
      $(this).closest('.project-img-item').css('width', '800px');
    }
  });
  $('.project-img-collapse').click(function() {
    if($(this).closest('.project-img-item').hasClass('collapsed')) {
      $(this).closest('.project-img-item').removeClass('collapsed');
    } else {
      $(this).closest('.project-img-item').addClass('collapsed');
    }
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
  initDrag();
  initZoom();
});

$(window).bind("load",function(){
  equalHeight('.events-slider');
});

