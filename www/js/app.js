// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','ionic.service.core', 'starter.controllers','ionic-datepicker','ionic.rating','firebase','ngCordova','ngCordovaOauth','ngMap','ngAutocomplete','ngMessages'])

    .run(function($ionicPlatform,$state,$ionicHistory,$ionicViewService) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
            ionic.keyboard.disable();
            var viewScroll = $ionicScrollDelegate.$getByHandle('userMessageScroll');
            var scroller = document.body.querySelector('#userMessagesView .scroll-content');

            window.addEventListener('native.keyboardshow', keyboardShowHandler);
            function keyboardShowHandler(e){
                scroller.style.bottom = e.keyboardHeight + 'px';
                viewScroll.scrollBottom();
            }
        }
        /*window.addEventListener('native.keyboardshow', keyboardShowHandler);*/
        if(window.StatusBar) {
            StatusBar.overlaysWebView(true);
            StatusBar.style(1); //Light
            StatusBar.styleLightContent();
        }
        /*if(window.StatusBar) {
            StatusBar.styleDefault();
            $cordovaStatusbar.overlaysWebView(false);
            $cordovaStatusbar.styleColor('white');
            $cordovaStatusbar.styleHex('#ffffff');
            StatusBar.overlaysWebView(true);
            StatusBar.style(1);
            $cordovaStatusBar.style(1); //Light
        }*/
        /*if (window.StatusBar) {
             org.apache.cordova.statusbar required
            StatusBar.styleDefault();
            StatusBar.overlaysWebView(true);
      StatusBar.style(1);
        }*/

        var push = new Ionic.Push({
            "debug":true
        });
        push.register(function(token){
            console.log(token.token)
        })
        if(device.platform === "iOS") {
            window.navigator.geolocation.getCurrentPosition()
        }
        //Begin the service
        //hard coded 'target'




    });
    $ionicPlatform.registerBackButtonAction(function (event) { 
        if($('.bar-dark .button.button-clear').hasClass('ponter_none_back'))
        {
            event.preventDefault();
        }
        else
        {
            $('.button.back-button').trigger('click')
        }
    }, 999);
})

    .config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider,$ionicConfigProvider) {
    $ionicConfigProvider.navBar.alignTitle('right')
    $ionicConfigProvider.backButton.previousTitleText(false);
    $ionicConfigProvider.backButton.text("Back");
    $stateProvider

        .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })
        .state('app.playlists', {
        url: '/playlists',
        views: {
            'menuContent': {
                templateUrl: 'templates/playlists.html',
            }
        }
    })
        .state('app.home', {
        url: '/home',
        views: {
            'menuContent': {
                templateUrl: 'templates/home.html'
            }
        }
    })
        .state('app.signin', {
        url: '/signin',
        views: {
            'menuContent': {
                templateUrl: 'templates/login.html'
            }
        }
    })
        .state('app.welcome', {
        url: '/welcome',
        views: {
            'menuContent': {
                templateUrl: 'templates/welcome.html'
            }
        }
    })
        .state('app.registration', {
        url: '/registration',
        views: {
            'menuContent': {
                templateUrl: 'templates/create_account.html'
            }
        }
    })
        .state('app.adminuse', {
        url: '/adminuse',
        views: {
            'menuContent': {
                templateUrl: 'templates/adminuse.html'
            }
        }
    })
        .state('app.hotel-dashboard', {
        url: '/hotel-dashboard',
        views: {
            'menuContent': {
                templateUrl: 'templates/admin_dashboard.html'
            }
        }
    })
        .state('app.about', {
        url: '/about',
        views: {
            'menuContent': {
                templateUrl: 'templates/about.html'
            }
        }
    })
        .state('app.faq', {
        url: '/faq',
        views: {
            'menuContent': {
                templateUrl: 'templates/faq.html'
            }
        }
    })
        .state('app.setting', {
        url: '/setting',
        views: {
            'menuContent': {
                templateUrl: 'templates/setting.html'
            }
        }
    })
        .state('app.recover', {
        url: '/recover',
        views: {
            'menuContent': {
                templateUrl: 'templates/pass_recover.html'
            }
        }
    })
        .state('app.profile', {
        url: '/profile',
        views: {
            'menuContent': {
                templateUrl: 'templates/profile.html'
            }
        }
    })
        .state('app.support', {
        url: '/support',
        views: {
            'menuContent': {
                templateUrl: 'templates/support.html'
            }
        }
    })
        .state('app.terms', {
        url: '/terms',
        views: {
            'menuContent': {
                templateUrl: 'templates/terms.html'
            }
        }
    })
        .state('app.privacy', {
        url: '/privacy',
        views: {
            'menuContent': {
                templateUrl: 'templates/privacy.html'
            }
        }
    })
        .state('app.list', {
        url: '/list',
        views: {
            'menuContent': {
                templateUrl: 'templates/list.html'
            }
        }
    })
        .state('app.booking', {
        url: '/booking',
        views: {
            'menuContent': {
                templateUrl: 'templates/booking.html'
            }
        }
    })
        .state('app.hoteldetail', {
        url: '/hoteldetail',
        views: {
            'menuContent': {
                templateUrl: 'templates/hotel_detail.html'
            }
        }
    })
    email = window.localStorage.getItem('email')
    console.log(email)
    user_name = window.localStorage.getItem('user_name')
    notify = window.localStorage.getItem('notify')
    sound = window.localStorage.getItem('sound')
    l_name = window.localStorage.getItem('l_name')
    mob_no = window.localStorage.getItem('mob_no')
    profile = window.localStorage.getItem('profile')
    console.log(email,user_name ,notify,mob_no)
    // window.localStorage.getItem('email')!= "" && window.localStorage.getItem('user_name') != "" && window.localStorage.getItem('email')!= null && window.localStorage.getItem('user_name') != null
    if(window.localStorage.getItem('email')!= "" && window.localStorage.getItem('email')!= null)
    {
        /*window.location = '#/app/home';*/
        $urlRouterProvider.otherwise('/app/home');
    }
    else
    {
        $urlRouterProvider.otherwise('/app/welcome');
    }

    // if none of the above states are matched, use this as the fallback
}).run(['$q', '$http', '$rootScope', '$location', '$window', '$timeout',function($q, $http, $rootScope, $location, $window, $timeout,$state,$ionicViewService,$scope,$ionicHistory){
    $rootScope.$on("$locationChangeStart", function(event, next, current){
        $rootScope.error = null;
        console.log($location.path());
        var path = $location.path();

        console.log("App Loaded!!!");
        setTimeout(function(){
            jQuery('.banner').addClass('show')
            $('.success_popup').addClass('hide');
            $('.hot_conf').addClass('hide')
            $(".fail_popup").addClass('hide')
            /*firebase.auth().onAuthStateChanged(function(user) {
                if(user.emailVerified == true)
                {
                }
            })*/
            /*var _show_  = window.localStorage.getItem('show')
            if(_show_ == "true"){
                $('.step_pop').addClass('hide');
            }
            else{
                $('.step_pop').removeClass('hide');
            }*/

            setTimeout(function(){
                $('.half_height').height($(window).height()/2)
                /*$('.home.login .bottom_sec').height($(window).height()/2 - 65)*/
                jQuery('.bottom_sec').addClass('show')
                $('#auto').val('')
                $('.start-date').val('From')
                $('.start-date').val('From')
                $('.end-date').val('To')
                $('.home .bottom_sec .star_list ul li').eq(2).trigger('click')
                var height_ = $('.tab_sys .tab_list').eq(0).height();
                $('.tab_sys').height(height_)
                $('.count_list').text('1 Room, 1 Guest, 1 Bed')

            },250)
            setTimeout(function(){
                jQuery('.btn').addClass('show')
            },500)
            $(document).on('change','.check_btn input[type="checkbox"]',function(){
                if($(this).is(':checked'))
                {
                    $(this).parent().parent().addClass('checked');
                }
                else
                {
                    $(this).parent().parent().removeClass('checked');
                    var _x_ = $('.check_btn input[type="checkbox"]').length;
                    if($('.check_btn input[type="checkbox"]:checked').length != _x_)
                    {
                        $('.top_section .check_btn input[type="checkbox"]').prop('checked', false);
                    }
                }
            })

            $('.top_section .check_btn input[type="checkbox"]').change(function(){
                if($(this).is(':checked'))
                {
                    $(this).parent().parent().addClass('checked');
                    $('.inner_list .check_btn').addClass('checked')
                    $('.check_btn input[type="checkbox"]').prop('checked', true);
                }
                else
                {
                    $('.check_btn input[type="checkbox"]').prop('checked', false);
                    $('.inner_list .check_btn').removeClass('checked')
                }

            })
            $('.start-date').datepicker({
                templates: {
                    leftArrow: '<i class="fa fa-chevron-left"></i>',
                    rightArrow: '<i class="fa fa-chevron-right"></i>'
                },
                /*format: "mm-dd-yyyy",*/
                startDate: new Date(),
                endDate:'+7d',
                keyboardNavigation: false,
                autoclose: true,
                todayHighlight: true,
                disableTouchKeyboard: true,
                orientation: "top auto"
            });

            $('.end-date').datepicker({
                templates: {
                    leftArrow: '<i class="fa fa-chevron-left"></i>',
                    rightArrow: '<i class="fa fa-chevron-right"></i>'
                },
                /*format: "mm-dd-yyyy",*/
                startDate: moment().add(1, 'days').toDate(),
                keyboardNavigation: false,
                autoclose: true,
                todayHighlight: true,
                disableTouchKeyboard: true,
                orientation: "top auto",

            });
            $('.start-date').focus(function(){
                $('#auto').addClass('no_click')
            })
            $('.end-date').focus(function(){
                $('#auto').addClass('no_click')
            })


            $('.start-date').datepicker().on("changeDate", function () {
                var startDate = $('.start-date').datepicker('getDate');
                var oneDayFromStartDate = moment(startDate).add(1, 'days').toDate();
                $('.end-date').datepicker('setStartDate', oneDayFromStartDate);
                $('.end-date').datepicker('setDate', oneDayFromStartDate);
                $('.end-date').datepicker('setEndDate', moment(startDate).add(7, 'days').toDate());
                setTimeout(function(){
                    $('#auto').removeClass('no_click')
                },450)
            });
            $('.end-date').datepicker().on("changeDate", function () {
                setTimeout(function(){
                    $('#auto').removeClass('no_click')
                },450)
            });

            $('.end-date').datepicker().on("show", function () {
                $('#auto').addClass('no_click')
                var startDate = $('.start-date').datepicker('getDate');
                $('.day.disabled').filter(function (index) {
                    return $(this).text() === moment(startDate).format('D');
                }).addClass('start-date-active');
            });

        },700)
        $timeout(function(){
            $('.loading_pop').addClass('hide')
        },10000)

    });
}])
    .factory('GeoAlert', function() {
    console.log('GeoAlert service instantiated');
    var interval;
    var duration = 6000;
    var long, lat;
    var processing = false;
    var callback;
    var minDistance = 2.41402;
    /*var lat = 23.088151;
    var long = 72.558601;*/

    // Credit: http://stackoverflow.com/a/27943/52160   
    function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(lat2-lat1);  // deg2rad below
        var dLon = deg2rad(lon2-lon1); 
        var a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
            Math.sin(dLon/2) * Math.sin(dLon/2)
        ; 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c; // Distance in km
        console.log('main dist: '+d)
        return d;
    }

    function deg2rad(deg) {
        return deg * (Math.PI/180)
    }

    function hb() {
        /*console.log('hb running');*/
        if(processing) return;
        processing = true;
        navigator.geolocation.getCurrentPosition(function(position) {
            processing = false;
            /*console.log(lat, long);*/
            console.log(position.coords.latitude, position.coords.longitude);
            var dist = getDistanceFromLatLonInKm(lat, long, position.coords.latitude, position.coords.longitude);
            /*console.log("dist in km is "+dist);*/
            if(dist <= minDistance) callback();
        });
    }

    return {
        begin:function(lt,lg,cb) {
            long = lg;
            lat = lt;
            callback = cb;
            interval = window.setInterval(hb, duration);
            hb();
        }, 
        end: function() {
            window.clearInterval(interval);
        },
        setTarget: function(lg,lt) {
            long = lg;
            lat = lt;
        }
    };

})

/*$(document).on('focus','.home.login .bottom_sec .col_1',function(){
    $('.pane.view').addClass('fix')
})
$(document).on('blur','.home.login .bottom_sec .col_1',function(){

})*/