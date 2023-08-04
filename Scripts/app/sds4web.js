/*
 *
 *   sds4web - Responsive Admin Theme
 *   version 2.2
 *
 */

$(document).ready(function () {

    return;
    // Add body-small class if window less than 768px
    if ($(this).width() < 769) {
        $('body').addClass('body-small')
    } else {
        $('body').removeClass('body-small')
    }

    // MetsiMenu
    $('#side-menu').metisMenu();

    // Collapse ibox function
    $('.collapse-link').click(function () {
        var ibox = $(this).closest('div.ibox');
        var button = $(this).find('i');
        var content = ibox.find('div.ibox-content');
        content.slideToggle(200);
        button.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
        ibox.toggleClass('').toggleClass('border-bottom');
        setTimeout(function () {
            ibox.resize();
            ibox.find('[id^=map-]').resize();
        }, 50);
    });

    // Close ibox function
    $('.close-link').click(function () {
        var content = $(this).closest('div.ibox');
        content.remove();
    });

    // Fullscreen ibox function
    $('.fullscreen-link').click(function () {
        var ibox = $(this).closest('div.ibox');
        var button = $(this).find('i');
        $('body').toggleClass('fullscreen-ibox-mode');
        button.toggleClass('fa-expand').toggleClass('fa-compress');
        ibox.toggleClass('fullscreen');
        setTimeout(function () {
            $(window).trigger('resize');
        }, 100);
    });

    // Close menu in canvas mode
    $('.close-canvas-menu').click(function () {
        $("body").toggleClass("mini-navbar");
        SmoothlyMenu();
    });

    // Open close right sidebar
    $('.right-sidebar-toggle').click(function () {
        $('#right-sidebar').toggleClass('sidebar-open');
    });

    // Initialize slimscroll for right sidebar
    $('.sidebar-container').slimScroll({
        height: '100%',
        railOpacity: 0.4,
        wheelStep: 10
    });

    // Open close small chat
    $('.open-small-chat').click(function () {
        $(this).children().toggleClass('fa-comments').toggleClass('fa-remove');
        $('.small-chat-box').toggleClass('active');
    });

    // Initialize slimscroll for small chat
    $('.small-chat-box .content').slimScroll({
        height: '234px',
        railOpacity: 0.4
    });

    // Small todo handler
    $('.check-link').click(function () {
        var button = $(this).find('i');
        var label = $(this).next('span');
        button.toggleClass('fa-check-square').toggleClass('fa-square-o');
        label.toggleClass('todo-completed');
        return false;
    });

    // Minimalize menu
    $('.navbar-minimalize').click(function () {
        $("body").toggleClass("mini-navbar");
        SmoothlyMenu();

    });

    // Tooltips demo
    $('.tooltip-demo').tooltip({
        selector: "[data-toggle=tooltip]",
        container: "body"
    });

    // Move modal to body
    // Fix Bootstrap backdrop issu with animation.css
    $('.modal').appendTo("body");

    // Full height of sidebar
    function fix_height() {
        var heightWithoutNavbar = $("body > #wrapper").height() - 61;
        $(".sidebard-panel").css("min-height", heightWithoutNavbar + "px");

        var navbarHeigh = $('nav.navbar-default').height();
        var wrapperHeigh = $('#page-wrapper').height();

        if (navbarHeigh > wrapperHeigh) {
            $('#page-wrapper').css("min-height", navbarHeigh + "px");
        }

        if (navbarHeigh < wrapperHeigh) {
            $('#page-wrapper').css("min-height", $(window).height() + "px");
        }

        if ($('body').hasClass('fixed-nav')) {
            $('#page-wrapper').css("min-height", $(window).height() - 60 + "px");
        }

    }
    fix_height();

    // Fixed Sidebar
    $(window).bind("load", function () {
        if ($("body").hasClass('fixed-sidebar')) {
            $('.sidebar-collapse').slimScroll({
                height: '100%',
                railOpacity: 0.9
            });
        }
    })

    // Move right sidebar top after scroll
    $(window).scroll(function () {
        if ($(window).scrollTop() > 0 && !$('body').hasClass('fixed-nav')) {
            $('#right-sidebar').addClass('sidebar-top');
        } else {
            $('#right-sidebar').removeClass('sidebar-top');
        }
    });

    $(document).bind("load resize scroll", function () {
        if (!$("body").hasClass('body-small')) {
            fix_height();
        }
    });

    $("[data-toggle=popover]")
        .popover();

    // Add slimscroll to element
    $('.full-height-scroll').slimscroll({
        height: '100%'
    })
});


// Minimalize menu when screen is less than 768px
$(window).bind("resize", function () {
    if ($(this).width() < 769) {
        $('body').addClass('body-small')
    } else {
        $('body').removeClass('body-small')
    }
});

// Local Storage functions
// Set proper body class and plugins based on user configuration

$(document).ready(function () {
    
    if (localStorageSupport) {
        loadskindata();
    }
    else
    {
        var dataToPost = {
            ID: 0
        };
        $.ajax({
            url: '../Admin/GetCustomSetting',
            type: "POST",
            data: dataToPost,
            success: function (data) {
                var DefaultColor = data.DefaultColor;
                var isCustomSetting = data.isCustomSetting;
                var primaryColor = data.PrimaryColor;
                var backgroundColor = data.BackgroundColor;
                var hoverColor = data.HoverColor;
                if (DefaultColor == 'Default') {
                    //$("body").addClass('skin-0');
                    localStorageSupport && localStorage.setItem("skinsetting", "skin-0")
                }
                else if (DefaultColor == 'Blue') {
                    //$("body").addClass('skin-1');
                    localStorageSupport && localStorage.setItem("skinsetting", "skin-1")
                }
                else if (DefaultColor == 'Yellow') {
                    //$("body").addClass('skin-3');
                    localStorageSupport && localStorage.setItem("skinsetting", "skin-3")
                }
                else if (DefaultColor == 'Custom') {

                    localStorageSupport && localStorage.setItem("skinsetting", "custom")
                    //$("body").addClass("skin-custom");
                    //$('.skin-custom .spin-icon').css("background-color", primaryColor + ' !important');
                    //$('.skin-custom .nav-header').css("background-color", primaryColor);
                    //$('.skin-custom .navbar-minimalize').css("background", primaryColor);
                    //$('.skin-custom .navbar-minimalize').css("border-color", primaryColor);
                    //$('body.skin-custom').css("background", backgroundColor);
                    //$('.skin-custom .nav > li.active').css("background", backgroundColor);
                    //$('.navbar-default .nav > li > a:hover').css("background-color", hoverColor + ' !important');
                    //$('.navbar-default .nav > li > a:focus').css("background-color", hoverColor + ' !important');
                }

                loadskindata();

            }
        });
    }
});

function loadskindata() {
    
    var collapse = localStorage.getItem("collapse_menu");
    var fixedsidebar = localStorage.getItem("fixedsidebar");
    var fixednavbar = localStorage.getItem("fixednavbar");
    var boxedlayout = localStorage.getItem("boxedlayout");
    var fixedfooter = localStorage.getItem("fixedfooter");
    var skinsetting = localStorage.getItem("skinsetting");

    var body = $('body');

    if (fixedsidebar == 'on') {
        body.addClass('fixed-sidebar');
        $('.sidebar-collapse').slimScroll({
            height: '100%',
            railOpacity: 0.9
        });
    }

    if (collapse == 'on') {
        if (body.hasClass('fixed-sidebar')) {
            if (!body.hasClass('body-small')) {
                body.addClass('mini-navbar');
            }
        } else {
            if (!body.hasClass('body-small')) {
                body.addClass('mini-navbar');
            }

        }
    }

    if (fixednavbar == 'on') {
        $(".navbar-static-top").removeClass('navbar-static-top').addClass('navbar-fixed-top');
        body.addClass('fixed-nav');
    }

    if (boxedlayout == 'on') {
        body.addClass('boxed-layout');
    }

    if (fixedfooter == 'on') {
        $(".footer").addClass('fixed');
    }


    
    if (skinsetting == 'skin-0') {
        var hoverColor = '#293846';
        $('.navbar-default .nav > li > a').hover(
          function () {
              $(this).css({ "background-color": hoverColor });
          },

          function () {
              $(this).css({ "background-color": "" });
          }
      );
        //$('.sidebar-collapse .nav > li:not(.nav-header)').css("background", "#3e495f");

      //  $("body").addClass(skinsetting);
      //  $('.skin-3 .navbar-default .nav > li > a').hover(
      //    function () {
      //        $(this).css({ "background-color": " #293846" });
      //    },

      //    function () {
      //        $(this).css({ "background-color": "" });
      //    }
      //);
      //  $('.btn-primary').css("background-color", '#1ab394');
      //  $('.btn-primary').css("border-color", '#1ab394');
      //  $('.label-primary, .badge-primary').css("background-color", '#1ab394');
      //  $('.form-control').append('<style>.form-control:focus{border-color:#1ab394 !important;}</style>');
      //  $('.single-line').append('<style>.single-line:focus{border-color:#1ab394 !important;}</style>');
      //  $('.onoffswitch-switch').css("border", '2px solid #1ab394');
      //  $('.onoffswitch-inner').append('<style>.onoffswitch-inner::before{background-color:#1ab394 !important;}</style>');
      //  $('.onoffswitch-label').css("border", '2px solid #1ab394');
    }
    else if (skinsetting == 'skin-1') {
        var hoverColor = '#293846';
        $('.navbar-default .nav > li > a').hover(
          function () {
              $(this).css({ "background-color": hoverColor });
          },

          function () {
              $(this).css({ "background-color": "" });
          }
      );

      //  $("body").addClass(skinsetting);
      //  $('.skin-1 .navbar-default .nav > li > a').hover(
      //    function () {
      //        $(this).css({ "background": "#3a4459" });
      //    },

      //    function () {
      //        $(this).css({ "background": "" });
      //    }
      //);
      //  $('.btn-primary').css("background-color", '#1ab394');
      //  $('.btn-primary').css("border-color", '#1ab394');
      //  $('.label-primary, .badge-primary').css("background-color", '#1ab394');
      //  $('.form-control').append('<style>.form-control:focus{border-color:#1ab394 !important;}</style>');
      //  $('.single-line').append('<style>.single-line:focus{border-color:#1ab394 !important;}</style>');
      //  $('.onoffswitch-switch').css("border", '2px solid #1ab394');
      //  $('.onoffswitch-inner').append('<style>.onoffswitch-inner::before{background-color:#1ab394 !important;}</style>');
      //  $('.onoffswitch-label').css("border", '2px solid #1ab394');
    }
    else if (skinsetting == 'skin-2') {
        var hoverColor = '#293846';
        $('.navbar-default .nav > li > a').hover(
          function () {
              $(this).css({ "background-color": hoverColor });
          },

          function () {
              $(this).css({ "background-color": "" });
          }
      );
      //  $("body").addClass(skinsetting);
      //  $('.skin-3 .navbar-default .nav > li > a').hover(
      //    function () {
      //        $(this).css({ "background": "#e0e0e0" });
      //    },

      //    function () {
      //        $(this).css({ "background": "" });
      //    }
      //);
      //  $('.btn-primary').css("background-color", '#1ab394');
      //  $('.btn-primary').css("border-color", '#1ab394');
      //  $('.label-primary, .badge-primary').css("background-color", '#1ab394');
      //  $('.form-control').append('<style>.form-control:focus{border-color:#1ab394 !important;}</style>');
      //  $('.single-line').append('<style>.single-line:focus{border-color:#1ab394 !important;}</style>');
      //  $('.onoffswitch-switch').css("border", '2px solid #1ab394');
      //  $('.onoffswitch-inner').append('<style>.onoffswitch-inner::before{background-color:#1ab394 !important;}</style>');
      //  $('.onoffswitch-label').css("border", '2px solid #1ab394');
    }
    else if (skinsetting == 'skin-3') {
        var hoverColor = '#293846';
        $('.navbar-default .nav > li > a').hover(
          function () {
              $(this).css({ "background-color": hoverColor });
          },

          function () {
              $(this).css({ "background-color": "" });
          }
      );
      //  $("body").addClass(skinsetting);
      //  $('.skin-3 .navbar-default .nav > li > a').hover(
      //    function () {
      //        $(this).css({ "background": "#38283c" });
      //    },

      //    function () {
      //        $(this).css({ "background": "" });
      //    }
      //);
      //  $('.btn-primary').css("background-color", '#1ab394');
      //  $('.btn-primary').css("border-color", '#1ab394');
      //  $('.label-primary, .badge-primary').css("background-color", '#1ab394');
      //  $('.form-control').append('<style>.form-control:focus{border-color:#1ab394 !important;}</style>');
      //  $('.single-line').append('<style>.single-line:focus{border-color:#1ab394 !important;}</style>');
      //  $('.onoffswitch-switch').css("border", '2px solid #1ab394');
      //  $('.onoffswitch-inner').append('<style>.onoffswitch-inner::before{background-color:#1ab394 !important;}</style>');
      //  $('.onoffswitch-label').css("border", '2px solid #1ab394');
    }
    else if (skinsetting == 'custom') {

        var isCustomSetting = localStorage.getItem("customiscustomsetting");
        var primaryColor = localStorage.getItem("customprimarycolor");
        var backgroundColor = localStorage.getItem("custombackgroundcolor");
        var hoverColor = localStorage.getItem("customhovercolor");

        $('.navbar-default .nav > li > a').hover(
                  function () {
                      $(this).css({ "background-color": hoverColor });
                  },

                  function () {
                      $(this).css({ "background-color": "" });
                  }
              );

        //$("body").addClass("skin-custom");

        ////////$('.skin-custom .spin-icon').css("background-color", primaryColor + ' !important');
        ////////$('body.boxed-layout.skin-custom #wrapper').css("background-color", primaryColor);
        ////////$('.skin-custom .nav-header').css("background-color", primaryColor);

        ////////$('.skin-custom.mini-navbar .nav-second-level').css("background-color", primaryColor);
        ////////$('.skin-custom .nav > li.active').css("background-color", primaryColor);
        ////$('.skin-custom .nav > li > a').css("color", primaryColor);

        ////////$('.skin-custom .navbar-minimalize').css("background", primaryColor);
        ////////$('.skin-custom .navbar-minimalize').css("border-color", primaryColor);
        ////////$('body.skin-custom').css("background", backgroundColor);
        ////////$('.skin-custom .nav > li.active').css("background", backgroundColor);
        ////////$('.skin-custom .navbar-default .nav > li > a').hover(
        ////////        function () {
        ////////            $(this).css({ "background-color": hoverColor });
        ////////        },

        ////////        function () {
        ////////            $(this).css({ "background-color": "" });
        ////////        }
        ////////    );

        //$('.btn-primary').css("background-color", primaryColor);
        //$('.btn-primary').css("border-color", primaryColor);
        //$('.label-primary, .badge-primary').css("background-color", primaryColor);
        //$('.form-control').append('<style>.form-control:focus{border-color:' + primaryColor + ' !important;}</style>');
        //$('.single-line').append('<style>.single-line:focus{border-color:' + primaryColor + ' !important;}</style>');
        //$('.onoffswitch-switch').css("border", '2px solid ' + primaryColor);
        //$('.onoffswitch-inner').append('<style>.onoffswitch-inner::before{background-color:' + primaryColor + ' !important;}</style>');
        //$('.onoffswitch-label').css("border", '2px solid ' + primaryColor);
    }
    else {
        //$("body").addClass("skin-0");
    }
}


// check if browser support HTML5 local storage
function localStorageSupport() {
    return (('localStorage' in window) && window['localStorage'] !== null)
}

// For demo purpose - animation css script
function animationHover(element, animation) {
    element = $(element);
    element.hover(
        function () {
            element.addClass('animated ' + animation);
        },
        function () {
            //wait for animation to finish before removing classes
            window.setTimeout(function () {
                element.removeClass('animated ' + animation);
            }, 2000);
        });
}

function SmoothlyMenu() {
    if (!$('body').hasClass('mini-navbar') || $('body').hasClass('body-small')) {
        // Hide menu in order to smoothly turn on when maximize menu
        $('#side-menu').hide();
        // For smoothly turn on menu
        setTimeout(
            function () {
                $('#side-menu').fadeIn(500);
            }, 100);
    } else if ($('body').hasClass('fixed-sidebar')) {
        $('#side-menu').hide();
        setTimeout(
            function () {
                $('#side-menu').fadeIn(500);
            }, 300);
    } else {
        // Remove all inline style from jquery fadeIn function to reset menu state
        $('#side-menu').removeAttr('style');
    }
}

// Dragable panels
function WinMove() {
    var element = "[class*=col]";
    var handle = ".ibox-title";
    var connect = "[class*=col]";
    $(element).sortable(
        {
            handle: handle,
            connectWith: connect,
            tolerance: 'pointer',
            forcePlaceholderSize: true,
            opacity: 0.8
        })
        .disableSelection();
}


