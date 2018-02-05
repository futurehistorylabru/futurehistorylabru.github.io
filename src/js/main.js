'use strict';

import 'normalize.css';
import '../css/main.scss';

document.addEventListener("DOMContentLoaded", function() {
  var url = window.location.pathname.replace(/^\/+/g, ''),
      windowWidth = window.innerWidth,
      menuTrigger = document.getElementById("menu-trigger"),
      main = document.getElementById("main");

  if (menuTrigger) {
    menuTrigger.addEventListener("click", function() {
      if (!main.classList.contains("menu-opened")) {
        main.classList.add("menu-opened");
      } else {
        main.classList.remove("menu-opened");
      }
    });
  }

  initTabs(url);
});

function initTabs(url) {
  var tabActive = document.getElementById(url),
      tabTrigger = document.querySelectorAll('.trigger');

  if (tabActive) {
    tabActive.classList.add('active');
  } else {
    document.getElementById('intro').classList.add('active');
  }

  for(var i = 0; i < tabTrigger.length ; i++) {
    tabTrigger[i].addEventListener("click", function(e) {
      openTab(this, url);
      e.preventDefault();
    });
  }
}

function openTab(elem, url) {
  var id = elem.getAttribute('data-tab'),
      main = document.getElementById("main");
  main.classList.remove("menu-opened");
  closeTab();
  document.getElementById(id).classList.add('active');
  if (id == "intro") {
    window.history.pushState({url: "/"}, id, '/');
  } else {
    window.history.pushState({url: "" + id + ""}, id, id);
  }
}

function closeTab() {
  var menuElements = document.querySelectorAll('.trigger');
  for(var i = 0; i < menuElements.length ; i++) {
    var id = menuElements[i].getAttribute('data-tab');
    document.getElementById(id).classList.remove('active');
  }
}

// 'use strict';

// import 'normalize.css';
// import '../css/main.scss';

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

//   closeTab();

//   if (tabActive) {
//     tabActive.classList.add('active');
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