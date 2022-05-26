/*!
* Start Bootstrap - Scrolling Nav v5.0.5 (https://startbootstrap.com/template/scrolling-nav)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-scrolling-nav/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});

//make intro charts button responsive
$(window).resize(function() {
  if ($(window).width() < 1000) {
    $('#btn-container-1').removeClass('btn-container');
    $('#btn-container-1').addClass('btn-container-horizontal');
  } else {
    $('#btn-container-1').addClass('btn-container');
    $('#btn-container-1').removeClass('btn-container-horizontal');
  }
});

$(window).resize(function() {
  if ($(window).width() < 1000) {
    $('#btn-container-2').removeClass('btn-container');
    $('#btn-container-2').addClass('btn-container-horizontal');
  } else {
    $('#btn-container-2').addClass('btn-container');
    $('#btn-container-2').removeClass('btn-container-horizontal');
  }
});