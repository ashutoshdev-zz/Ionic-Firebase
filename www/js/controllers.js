var filters,date_1,date_2, selected ,use_naem , booking_id ,email,log_stts =false ,flag = false ;var chaed = false,user_name ,timerId , hot_counting , store_city ,stars ,night ,notify,sound,h_lat,h_log,l_name,profile,mob_no;
angular.module('starter.controllers', [])

    .controller('AppCtrl', function($scope, $ionicModal, $timeout) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    /*$ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });*/

    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function() {
        $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {
        console.log('Doing login', $scope.loginData);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function() {
            $scope.closeLogin();
        }, 1000);
    };
    $scope.$on('$destroy', function() {
        delete window.onbeforeunload;
    });


})
    .controller('loginController',function($scope,$firebaseAuth,$location ,$cordovaEmailComposer ,$http ,$stateParams,$state,$window,$ionicHistory, $cordovaOauth, $ionicPopup,$ionicLoading,$location){
    /* Google Auth */


    $scope.google_auth =function(){
        /*$ionicHistory.nextViewOptions({
            disableBack: true
        });
        var igClientId = "50c8ed0dd2c54edba819ec9a393ea537";
        $cordovaOauth.instagram(igClientId, ["basic","comments", "relationships"]).then(function(result) {
            var r = JSON.stringify(result);
            $scope.result = r;
            alert(result.access_token)
            $http.get('https://api.instagram.com/v1/users/self/?access_token='+result.access_token).then(function(datas){
                alert(JSON.stringify(datas))
                alert(datas.data.username)
                alert(datas.data.profile_picture)
                alert(datas.data.full_name)
                window.localStorage.setItem('email',result.data.email)
                window.localStorage.setItem('user_name',result.data.name)
                window.localStorage.setItem('notify',true)
                window.localStorage.setItem('sound',true)
                email = result.data.email;
                user_name =result.data.name;
                notify = true
                sound = true;
            })
        }, function(error) {
            var e = error;
            $scope.result = e;
        });*/
    }

    $scope.fb_auth = function(){
        $cordovaOauth.facebook("1088629794568389", ["email"], {"auth_type": "rerequest"}).then(function(result) {
            console.log(JSON.stringify(result));
            window.open("https://graph.facebook.com/v2.2/me", { params: { access_token: result.access_token, fields: "id,email,name,gender,location,website,picture,relationship_status",email ,format: "json"}}).then(function(result) {
                $scope.profileData = result.data;
                window.localStorage.setItem('email',result.data.email)
                window.localStorage.setItem('user_name',result.data.name)
                window.localStorage.setItem('notify',true)
                window.localStorage.setItem('sound',true)
                email = result.data.email;
                user_name =result.data.name;
                notify = true
                sound = true;
                $ionicHistory.nextViewOptions({
                    disableBack: true
                });
                $('.step_pop').removeClass('hide')
                $('.step_pop').addClass('input_hide')

            }, function(error) {
                var alertPopup = $ionicPopup.alert({
                    title: 'Error',
                    template: 'Facebook Login not successful. Please try again.'
                });
                console.log(error);
            });

        }, function(error) {
            var alertPopup = $ionicPopup.alert({
                title: 'Error',
                template: 'Facebook Login not successful. Please try again.'
            });
            alert(JSON.stringify(error));
            console.log(JSON.stringify(error))
        });
    }

    $scope.clear = function(){
        $ionicHistory.nextViewOptions({
            disableBack: true
        });
    }

    /* Login  */
    $scope.login = function(username,password){ 
        if(username == undefined && password==undefined){
            var alertPopup = $ionicPopup.alert({
                title: 'Error',
                template: "values can't be empty"
            });
            return false;
        }
        firebase.auth().signInWithEmailAndPassword(username, password).then(function(data){
            $ionicLoading.show({
                template: 'Loading...',
                duration: 3000
            }).then(function(){
                console.log("The loading indicator is now displayed");
            });
            firebase.database().ref().child('users').on('value',function(data){
                var list_user = data.val();
                for(var x in list_user){
                    if(list_user[x].type == "admin" && (list_user[x].reg == false || list_user[x].reg == "false"))
                    {
                        window.location = "#/app/adminuse?id="+x
                    }
                    else{
                        if(list_user[x].email == username)
                        {
                            console.log(list_user[x].verify)
                            if(list_user[x].verify == false || list_user[x].verify == "undefined" || list_user[x].verify == "false"){
                                $('#con_number').removeClass('hide')
                            }
                            else
                            {
                                email = username;
                                window.localStorage.setItem('email',username)
                                var user = firebase.database().ref().child('users/')
                                user.on('value',function(snapshot){
                                    var user_list = snapshot.val();
                                    for(var key in user_list)
                                    {
                                        if(user_list[key].email == email)
                                        {
                                            user_name = user_list[key].username
                                            l_name = user_list[key].l_name
                                            profile = user_list[key].img
                                            console.log(profile)
                                            mob_no = user_list[key].mobile
                                            console.log(user_name)
                                            notify = user_list[key].notify
                                            sound = user_list[key].sound
                                            window.localStorage.setItem('user_name',user_name)
                                            window.localStorage.setItem('l_name',l_name)
                                            window.localStorage.setItem('notify',notify)
                                            window.localStorage.setItem('sound',sound)
                                            window.localStorage.setItem('profile',profile)
                                            window.localStorage.setItem('mob_no',mob_no)
                                            console.log(user_name,l_name,sound,profile,mob_no)
                                            if(user_list[key].show == "true"){
                                                $ionicLoading.hide().then(function(){
                                                    console.log("The loading indicator is now hidden");
                                                });
                                                if(window.localStorage.getItem('login_state') == true || window.localStorage.getItem('login_state') == "true")
                                                {
                                                    /*window.history.back();*/
                                                    $ionicHistory.goBack();
                                                }
                                                else{
                                                    $('.step_pop').removeClass('hide');
                                                    window.location = "#/app/home"  
                                                    $ionicHistory.nextViewOptions({
                                                        disableBack: true
                                                    });
                                                }
                                            }
                                            else{
                                                $('.step_pop').removeClass('hide');   
                                            }
                                        }
                                    }
                                })       
                            }
                        }
                    }
                }
            }) 
        }).catch(function(error) {

            if(error.message == "The password is invalid or the user does not have a password.")
            {
                var alertPopup = $ionicPopup.alert({
                    title: 'Incorrect Password',
                    template: 'The password you entered is incorrect. Please try again.'
                });

            }
            if(error.message == "There is no user record corresponding to this identifier. The user may have been deleted."){
                var alertPopup = $ionicPopup.alert({
                    title: 'Error',
                    template: 'Incorrect Password or Username'
                });
            }
            return false;
        });
        if(window.localStorage.getItem('login_state') == true || window.localStorage.getItem('login_state') == "true"){
        }
        else{
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
        }
    }


    /* Verify */
    $scope.varify_click = function(number){
        firebase.database().ref().child('users').on('value',function(data){
            var list_user = data.val();
            for(var x in list_user){
                if(list_user[x].email == $('#email').val())
                {

                    if(list_user[x].conform == number)
                    {
                        firebase.database().ref().child('users/'+x).update({
                            verify:true
                        });
                        window.localStorage.setItem('email',$('#email').val())
                        var user = firebase.database().ref().child('users/'+x)
                        user.on('value',function(snapshot){
                            $scope.user_list = snapshot.val();
                            user_name = $scope.user_list.username
                            notify = $scope.user_list.notify
                            sound = $scope.user_list.sound
                            mob_no = $scope.user_list.mobile
                            profile = $scope.user_list.profile
                            console.log(user_name)
                            window.localStorage.setItem('user_name',user_name)
                            window.localStorage.setItem('notify',notify)
                            window.localStorage.setItem('sound',sound)
                            window.localStorage.setItem('mob_no',mob_no)
                            window.localStorage.setItem('profile',profile)

                        })
                        $('.fail_popup').addClass('hide')
                        $('#demo').removeClass('hide')
                        if(window.localStorage.getItem('login_state') == true || window.localStorage.getItem('login_state') == "true"){
                            $ionicHistory.goBack();
                        }
                        else{
                            window.location = "#/app/home"  
                            $ionicHistory.nextViewOptions({
                                disableBack: true
                            });
                        }

                    }
                    else
                    {
                        $('.on_error').addClass('active');
                    }
                }
            }
        }) 
    }
    $(document).on('click','.ref_pag',function(){
        $ionicHistory.clearCache([$state.current.name]).then(function() {
            $state.reload();
        })
        setTimeout(function(){
            $ionicHistory.clearCache([$state.current.name]).then(function() {
                $state.reload();
            })
            window.location.reload();
        },350)
    })

    $scope.conform = function(number){
        /*console.log($scope.login)*/
        firebase.database().ref().child('users').on('value',function(data){
            var list_user = data.val();
            console.log($scope.login.username)
            for(var x in list_user){
                if(list_user[x].email == $scope.login.username)
                {
                    if(list_user[x].conform == number)
                    {
                        firebase.database().ref().child('users/'+x).update({
                            verify:true
                        });
                        window.localStorage.setItem('email',$scope.login.username)
                        var user = firebase.database().ref().child('users/'+x)
                        user.on('value',function(snapshot){
                            $scope
                            $scope.user_list = snapshot.val();
                            user_name = $scope.user_list.username
                            console.log(user_name)
                            notify = $scope.user_list.notify
                            sound = $scope.user_list.sound
                            window.localStorage.setItem('user_name',user_name)
                            window.localStorage.setItem('notify',notify)
                            window.localStorage.setItem('sound',sound)
                        })
                        $('#con_number').addClass('hide')
                        $('#demo').removeClass('hide')

                    }
                    else
                    {
                        $('.on_error').addClass('active');
                    }
                }
            }
        }) 
    }
    /* Create Account */
    $scope.createUser = function(name,email,password,repeat,l_name,mobile,$timeout,$location){
        $('input.required_field').each(function(){
            if($(this).val() == ""){
                $(this).addClass('error_input')
            }    
        })
        if($('input.required_field').val() != "")
        {
            if(password != repeat)
            {
                var alertPopup = $ionicPopup.alert({
                    title: 'Error',
                    template:'password not match'
                });
                return false;
            }
            else{
                firebase.auth().createUserWithEmailAndPassword(email, password).then(function(firebaseUser,$timeout) {
                    // if rootscope is set
                    /*$('.fail_popup').removeClass('hide')*/
                    var img;
                    if($('#profile').val() == ""){
                        img = "person-flat.png"
                    }
                    else{
                        img = document.getElementById("profile").files[0].name
                    }
                    var _number_ = Math.floor(Math.random()*900000) + 10000;
                    firebase.database().ref().child('users/').push({
                        email: email,
                        l_name:l_name,
                        username: name,
                        notify:true,
                        mobile:mobile,
                        sound:true,
                        verify:false,
                        img:img,
                        conform:_number_,
                        show:"false"
                    });
                    /*window.localStorage.setItem('email',email)
                    window.localStorage.setItem('user_name',name)
                    window.localStorage.setItem('notify',true);*/
                    $scope.email = email
                    $('.fail_popup').removeClass('hide');
                    flag = true;
                    var method = 'POST';
                    var url = 'http://www.codeandcore.com/ourwork/app_mail/code.php';
                    /*var email = "test@treverse.com";*/
                    var code = '<div style="max-width:600px; width:100%;"><p><img src="http://codeandcore.com/ourwork/app_mail/mail_img.jpg" alt="" /></p><h2 style="font-size:45px; color:#a71ba2; text-align:center">'+_number_+'</h2><h3>Dear <i style="font-style:none; color:#a71ba2">'+name+'</i> <p class="display: inline-block"></p></h3><table style="font-size:15px;"><tr><p>Welcome to Treverse! Thank you for creating an account with us. Your User Authentication Confirmation code is below. </p><p style="color:#a71ba2;">'+_number_+'</p><p>For Security Purposes, Please do not share this number with anyone as this is necessary to complete your user account signup.</p></tr></table><p>Regards</p><a href="javascript:void(0)" style="color:#a71ba2">Treverse</a></div>' 
                    $scope.codeStatus = "";
                    var FormData = {
                        'name' : "treverse",
                        'email' : email,
                        'message': code
                    };
                    $http({
                        method: method,
                        url: url,
                        data: FormData,
                        html:true,
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                    }).
                    success(function(response) {
                        $scope.codeStatus = response.data;
                    }).
                    error(function(response) {
                        $scope.codeStatus = response || "Request failed";
                    });
                    return false;
                })
                    .catch(function(error) {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Error',
                        template: error.message
                    });
                    return false;
                })    
            }


        }
        else{
            var alertPopup = $ionicPopup.alert({
                title: 'Error',
                template: 'Fill The detail'
            });
        }

    }

    $scope.adminuser = function(name,l_name,mobile){
        $('input.req_admin').each(function(){
            if($(this).val() == ""){
                $(this).addClass('error_input')
            }    
        })
        if($('.req_admin').val() != "")
        {
            var img_;
            if($('#profile').val() == ""){
                img = "person-flat.png"
            }
            else{
                img = document.getElementById("profile").files[0].name
            }
            var admin_u_id = $location.search().id
            var _number_ = Math.floor(Math.random()*900000) + 10000;
            firebase.database().ref().child('users/'+admin_u_id).update({
                l_name:l_name,
                username: name,
                notify:true,
                mobile:mobile,
                sound:true,
                verify:true,
                img:img_,
                conform:_number_,
                show:"false",
                reg:true
            }).then(function(){
                $ionicHistory.nextViewOptions({
                    disableBack: true
                });
                window.location = "#/app/home"
            })
        }
        else{
            var alertPopup = $ionicPopup.alert({
                title: 'Error',
                template: 'Fill The detail'
            });
        }

    }



    /* Reset Password */
    $scope.reset = function(username){
        var auth = firebase.auth();
        auth.sendPasswordResetEmail(username).then(function() {
            alert('Link has been sent to your email account')
        }, function(error) {
            var alertPopup = $ionicPopup.alert({
                title: 'Error',
                template: error
            });
            // An error happened.
        }); 
    }
    $(document).on('click','.rest_btn',function(){
        var name =  $('#name').val();
        /*$('#email').val('shivang.cnc@gmail.com');*/
        var email_ = $('#email').val();
        var _number_ = Math.floor(Math.random()*900000) + 10000;
        var method = 'POST';
        var url = 'http://www.codeandcore.com/ourwork/app_mail/code.php';
        /*var email = "test@treverse.com";*/
        var code = '<div style="max-width:600px; width:100%;"><p><img src="http://codeandcore.com/ourwork/app_mail/mail_img.jpg" alt="" /></p><h2 style="font-size:45px; color:#a71ba2; text-align:center">'+_number_+'</h2><h3>Dear <i style="font-style:none; color:#a71ba2">'+name+'</i> <p class="display: inline-block"></p></h3><table style="font-size:15px;"><tr><p>Welcome to Treverse! Thank you for creating an account with us. Your User Authentication Confirmation code is below. </p><p style="color:#a71ba2;">'+_number_+'</p><p>For Security Purposes, Please do not share this number with anyone as this is necessary to complete your user account signup.</p></tr></table><p>Regards</p><a href="javascript:void(0)" style="color:#a71ba2">Treverse</a></div>' 
        $scope.codeStatus = "";
        var FormData = {
            'name' : "treverse",
            'email' : email_,
            'message': code
        };
        $http({
            method: method,
            url: url,
            data: FormData,
            html:true,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).
        success(function(response) {
            $scope.codeStatus = response.data;
        }).
        error(function(response) {
            $scope.codeStatus = response || "Request failed";
        });
        var sub_obj
        firebase.database().ref().child('users').on('value',function(data){
            var alldata = data.val()

            for (var x in alldata){
                if(alldata[x].email === email_){
                    sub_obj = x;
                }
            }
        })
        firebase.database().ref().child('users/'+sub_obj).update({
            conform:_number_,
        })
    })



})
    .controller('yourCtrl', function($scope) {
    // set the rate and max variables
    $scope.rating = {};
    $scope.rating.rate = 3;
    $scope.rating.max = 5;

    $scope.init = function(test1,test2){
        /*var posOptions = {timeout: 10000, enableHighAccuracy: false};*/
        var lat  = h_lat;
        var long = h_log;
        var R = 6371;
        var p = 0.017453292519943295;    // Math.PI / 180
        var c = Math.cos;
        var a = 0.5 - c((lat - test1) * p)/2 + 
            c(test1 * p) * c(lat * p) * 
            (1 - c((long - (test2)) * p))/2;
        a= 12742 * Math.asin(Math.sqrt(a)); 
        $scope.dis = ( a * 0.62137).toFixed(2);
        /*console.log($scope.dis)*/
        /*$('.loading_pop').addClass('hide')*/

    }
})
    .controller("ExampleController", function($scope,$http,$state,$filter,$ionicLoading,$location,$ionicHistory,$ionicPopup) {



    $scope.$watch(function(){
        if(window.localStorage.getItem('login_state') == true || window.localStorage.getItem('login_state') == "true")
        {    
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            window.localStorage.removeItem('login_state')
        }
    })

    /*$scope.result1 = '';
    $scope.options1 = null;
    $scope.details1 = '';*/

    /*$scope.result1 = '';
    $scope.options1 = {
        country: 'us',
        typesEnabled: false,
        types: '(cities)'
    }
    $scope.details1 = '';*/
    var options = {
        componentRestrictions: {country: "us"}
    };

    var inputFrom = document.getElementById('auto');
    var autocompleteFrom = new google.maps.places.Autocomplete(inputFrom, options);
    /*container = document.getElementsByClassName('pac-container');
    // disable ionic data tab
    angular.element(container).attr('data-tap-disabled', 'true');
    // leave input field if google-address-entry is selected
    angular.element(container).on("click", function(){
        document.getElementById('searchBar').blur();
    });*/
    $scope.disableTap = function(){
        container = document.getElementsByClassName('pac-container');
        // disable ionic data tab
        angular.element(container).attr('data-tap-disabled', 'true');
        // leave input field if google-address-entry is selected
        angular.element(container).on("click", function(){
            console.log(0)
            document.getElementById('searchBar').blur();

        });
    };

    $(document).on('blur','#auto',function(){
        var $this = $(this)
        var z ;
        setTimeout(function(){
            z = $this.val()
            var temp1 = $this.val();
            console.log(temp1.replace('United States',''))
            $this.val(temp1.replace(', United States',''))
        },200)
        setTimeout(function(){
            geocoder = new google.maps.Geocoder();
            geocoder.geocode( { "address": z }, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK && results.length > 0) {
                    var location = results[0].geometry.location;
                    /*console.log(results)*/
                    h_lat = location.lat()
                    h_log = location.lng()
                    store_city = results[0].address_components[0].short_name;
                    filters = results[0].address_components[2].short_name;
                    console.log(h_lat,h_log,filters,store_city)
                    /*$('#auto').val(store_city+', '+filters);*/
                    $('#auto').val($('#auto').val().replace(', United States',''));
                }
            });
        },300)
    })

    document.addEventListener('DOMNodeInserted', function(event) {
        var target;
        target = $(event.target);
        if (target.hasClass('pac-item')) {
            $('.pac-item, .pac-item span', this).addClass('needsclick');
            return target.html(target.html().replace(/United States<\/span>$/, "</span>"));
        }
    });
    $scope.forget = function(){
        $http({
            method: 'POST',
            url: '//codeandcore.com/ourwork/app_send.php',
            data: { mailTo: 'shivang.cnc@gmail.com', msg: 'hello!' }
        }).then(function successCallback(response) {
            alert("msg sent!");
        }, function errorCallback(response) {
            var alertPopup = $ionicPopup.alert({
                title: 'Error',
                template: 'error with sending a msg'
            });
        });
    };


    var user = firebase.database().ref().child('users')
    /*user.on('value',function(snapshot){
        var user_list = snapshot.val();
        for(var key in user_list)
        {
            if(user_list[key].email == email)
            {

            }
        }
    });*/
    $scope.$watch(function(){
        $scope.user_name = user_name
    })
    $scope.accept_offer = function($firebaseObject,$firebaseArray)
    {
        var ref = firebase.database().ref().child('teml_hotel_list');
        var req = firebase.database().ref().child('request');
    }
    $scope.formData = {};
    $scope.submit = function(d_1,d_2) {
        /*if(email == "undefined" || email == null)
        {
            $state.go("app.signin")
        }*/
        /*else
        {*/
        console.log(moment($('#modalmode').val()).unix())
        console.log(moment($('#modalmode_1').val()).unix())
        /*date_2 = moment(d_1).unix();*/
        console.log(d_1)
        console.log(d_2)
        date_2 = Math.round(new Date(String(d_2)).getTime()/1000)
        /*date_1 = moment(d_2).unix();*/
        date_1 = Math.round(new Date(String(d_1)).getTime()/1000)
        console.log(date_2,date_1)
        //console.log(date_1,date_2)
        if($('#auto').val() == "")
        {
            var alertPopup = $ionicPopup.alert({
                title: 'Please Enter Information',
                template: 'Please Enter Address or City'
            });
            return false;
        }
        else if($('.start-date').val() == "From")
        {
            var alertPopup = $ionicPopup.alert({
                title: 'Please Enter Information',
                template: 'Please Select From Date and To Date'
            });
            return false;
        }
        stars = $('.home .bottom_sec .star_list p').text()
        $state.go("app.playlists")
        /*}*/
    }


}).controller('city_lat',function($scope){
    $scope.init = function(test1,test2){
        var lat  = h_lat;
        var long = h_log;
        var R = 6371;
        var p = 0.017453292519943295;    // Math.PI / 180
        var c = Math.cos;
        var a = 0.5 - c((lat - test1) * p)/2 + 
            c(test1 * p) * c(lat * p) * 
            (1 - c((long - (test2)) * p))/2;
        a= 12742 * Math.asin(Math.sqrt(a)); 
        $scope.dis = ( a * 0.62137).toFixed(2);
        console.log($scope.dis)
    }
})



    .controller('checkval',function($scope,$timeout,$http,$firebaseObject,$firebaseArray,$cordovaLocalNotification,$state,$ionicHistory ,$ionicConfig,$ionicViewService,$rootScope,GeoAlert){

    /*
    $cordovaGoogleAnalytics.setUserId('USER_ID');
    $cordovaGoogleAnalytics.trackView('Home Screen');
    $cordovaGoogleAnalytics.addCustomDimension('dimension1', 'Level 1');
    $cordovaGoogleAnalytics.trackEvent('Videos', 'Video Load Time', 'Gone With the Wind', 100);
    $cordovaGoogleAnalytics.addTransaction('1234', 'Acme Clothing', '11.99', '5', '1.29', 'EUR');
    $cordovaGoogleAnalytics.addTransactionItem(
        '1234', 'Fluffy Pink Bunnies', 'DD23444', 'Party Toys', '11.99', '1', 'GBP'
    );
    $cordovaGoogleAnalytics.setAllowIDFACollection(true);*/

    /*$ionicConfig.backButton.text("Back");*/
    var confo_numre;
    var _x_1 = $('.start-date').val()
    var _x_2 = $('.end-date').val()
    _x_1 = new Date(_x_1);
    _x_2 = new Date(_x_2);
    night  = _x_2.getDate() - _x_1.getDate();
    $scope.night = night;

    $(document).on('click','.go_to',function(){
        $ionicViewService.nextViewOptions({
            disableBack: true
        });
        $state.go('app.profile');

    })

    var user = firebase.database().ref().child('users')
    $scope.user_req = $('.count_list').text()
    $scope.user_req_per = parseFloat($('.count_list').text())
    user.on('value',function(snapshot){
        var user_list = snapshot.val();
        for(var key in user_list)
        {
            if(user_list[key].email == email)
            {
                $scope.user_name = user_list[key].username

            }
        }
    })
    var ref = firebase.database().ref().child('hotel')
    $scope.test = $firebaseArray(ref)
    $scope.new_ = $scope.price;
    /*temp_hotel.on('value',function(snapshot){
        var ss = snapshot.val();
        console.log()
    })*/
    $scope.confo_numre;
    var req_hotel = firebase.database().ref().child('request/')
    var req_ = $firebaseArray(req_hotel);

    req_hotel.on('child_changed',function(data){
        var player = data.val();
        for(var key in player )
        {
            if(player[key].user_id == email && player[key].archive == true){
                var update_id = firebase.database().ref().child('user_hotel_list/')
                update_id.on('value',function(data){
                    var list = data.val();
                    for(var key_inner in list )
                    {
                        if(list[key_inner].user_id == email)
                        {
                            if(player[key].booking_id == list[key_inner].conformation)
                            {
                                var chande_id = firebase.database().ref().child('user_hotel_list/'+key_inner);
                                confo_numre = player[key].hotel_confo;
                                $('.confo_numre').text(player[key].hotel_confo)
                                $scope.confo_numre = confo_numre;
                                console.log(confo_numre)
                                chande_id.update({
                                    "hotel_confo": player[key].hotel_confo
                                });
                            }
                        }

                    }
                })

                if(player[key].hotel_confo != ""){
                    $scope.final_conform = player[key];
                    var  hot_id = player[key].hotel_id
                    firebase.database().ref().child('hotel/'+hot_id).on('value',function(data){
                        $scope.hotel_info = data.val()
                    })
                    $scope.$watch(function(){
                        $scope.confo_numre = confo_numre;
                    })
                    $scope.confo_numre = confo_numre;
                    console.log($scope.confo_numre)
                    $('.offer_popup').addClass('hide');
                    $('.success_popup').addClass('hide');
                    $('.hot_conf').removeClass('hide');
                    if(notify == "true")
                    {
                        var sound_file;
                        if(sound == "false" || sound == false)
                        {
                            var alarmTime = new Date();
                            alarmTime.setMinutes(alarmTime.getMinutes());
                            $cordovaLocalNotification.add({
                                id: "11111",
                                date: alarmTime,
                                title: "Confirmation Number",
                                message: "Your Hotel Confirmation number "+player[key].hotel_confo,
                                icons:"res://icon/android/icon.png",
                                autoCancel: true,
                                icon: 'file://icon.png',
                                sound:'http://codeandcore.com/ourwork/treverse/slient.wav',
                                smallIcon: 'file://icon.png',
                            }).then(function () {
                                console.log("The notification has been set");
                            });
                        } 
                        else
                        {
                            var alarmTime = new Date();
                            alarmTime.setMinutes(alarmTime.getMinutes());
                            $cordovaLocalNotification.add({
                                id: "11111",
                                date: alarmTime,
                                title: "Confirmation Number",
                                message: "Your Hotel Confirmation number "+player[key].hotel_confo,
                                icons:"res://icon/android/icon.png",
                                autoCancel: true,
                                icon: 'file://icon.png',
                                sound:'file://audio/slient.mp3',
                                smallIcon: 'file://icon.png',
                            }).then(function () {
                                console.log("The notification has been set");
                            });
                        }

                    }
                }
            }
        }
    })

    req_hotel.on('child_added',function(data){
        var player = data.val();
        if(chaed != false)
        {
            chaed = false;
            for(var key in player )
            {
                if(player[key].user_id == email)
                {
                    if(player[key].desci == "true")
                    {
                        firebase.database().ref().child('hotel/'+player[key].hotel_id).on('value',function(h_data){
                            $scope.test_data = player[key];
                            $scope.l_data = h_data.val();
                            $scope.$apply();
                        })
                        clearInterval(timerId);
                        clearInterval(hot_counting);
                        $("#countTime").html("0 : 00");
                        $('.offer_popup').addClass('hide');
                        $('.sorry').addClass('hide');
                        $('.fail_popup').addClass('hide');
                        $('.success_popup').removeClass('hide');
                        $('.btn.show_pop.show').removeClass('ponter_none')
                        $('.bar-dark .button.button-clear').removeClass('ponter_none_back')
                        $('.sorry').addClass('hide');
                        if(notify == "true")
                        {


                        }
                    }
                }
            }
        }
    })


    user.on("value", function(snapshot) {
        var newPost = snapshot.val();
        user.on("child_added", function(newPost,pre){
            newchild = newPost.val();

        }); 
    });
    $scope.rate = jQuery('.ion-ios-star').length;
    $scope.dates_1 = date_1;
    $scope.dates_2 = date_2;
    if(filters == ""){
        $scope.cites = filters;
    }
    else{
        $scope.cites = filters;
    }

    $scope.cites_2 = store_city;
    console.log(filters,store_city)
    $http.get('hotels.json').success(function(res){

    });
    var _x_ = 0;
    $scope.values = _x_;
    $scope.change = function() {
        $timeout(function(){
            _x_ = $('.inner_list .checkbox input:checked').length;
            $scope.values = _x_;
        },100)
    };

    $scope.$watch(function(){
        if($('.red_list').length == 0 && $('.top_list').length == 0)
        {
            $('.null_val').fadeIn();
        }
        else{
            $('.null_val').fadeOut();
        }

    })

    $scope.scrolling = function(){
        $('.pac-container').css('top',$('#auto').offset().top +34)
    }


    /* Hotel Near*/
    var _hot_id_;
    firebase.database().ref().child("user_hotel_list").on('value',function(data){
        if(email != "" && email != null && email != undefined )
        {
            var current_date = Math.round(new Date().getTime()/1000)
            var _x_ = data.val();
            for(x in _x_){
                if(_x_[x].user_id == email)
                {
                    if(_x_[x].hotel_confo != "" && _x_[x].Arrival >= current_date)
                    {

                        var new_uid = _x_[x].user_id
                        //console.log(_x_[x].user_id)
                        //console.log(_x_[x].conformation);
                        lat = _x_[x].Latitude
                        long = _x_[x].Longitude
                        var lat;
                        var long;
                        function onConfirm(idx) {
                            console.log('button '+idx+' pressed');
                        }
                        var  new_confo  = _x_[x].conformation
                        var _hot_confo_ = _x_[x].hotel_confo
                        GeoAlert.begin(lat,long, function() {
                            firebase.database().ref().child('request/'+new_confo).on('value',function(data){
                                //console.log(new_confo)
                                var _y_ = data.val();
                                for(var y in _y_){
                                    _hot_id_ = _y_[y].hotel_id
                                    console.log(_hot_id_)
                                }
                            })
                            firebase.database().ref().child('user_tracker/'+current_date).set({
                                user_tracker:current_date,
                                hotel_id:_hot_id_,
                                user_email:new_uid,
                                hotel_confo:_hot_confo_
                            })
                            console.log('TARGET');
                            /* About Question */
                            GeoAlert.end();
                        });
                    }
                }
            }
        }
    })
})
    .controller('checkval2',function($scope,$timeout,$http,$firebaseObject,$firebaseArray,$cordovaLocalNotification,$state,$ionicHistory ,$ionicConfig,$ionicViewService,$rootScope,$ionicPopup){
    $scope.rating = {};
    $scope.rating.max = 5;
    /*$ionicConfig.backButton.text("Back");*/

    var confo_numre;
    var _x_1 = $('.start-date').val()
    var _x_2 = $('.end-date').val()
    _x_1 = new Date(_x_1);
    _x_2 = new Date(_x_2);
    night  = _x_2.getDate() - _x_1.getDate();
    var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
    var firstDate = new Date(_x_1);
    var secondDate = new Date(_x_2);
    var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
    $scope.night = diffDays;

    $scope.change_state = function(){
        window.localStorage.setItem('login_state',true)
        $('.red_popup').addClass('hide');
    }
    $scope.erase_his = function(){
        $ionicHistory.nextViewOptions({
            disableBack: true
        });
    }

    $(document).on('click','.go_to',function(){
        $ionicViewService.nextViewOptions({
            disableBack: true
        });
        $state.go('app.client-dashboard');

    })

    var user = firebase.database().ref().child('users')
    $scope.user_req = $('.count_list').text()
    $scope.user_req_per = parseFloat($('.count_list').text())
    user.on('value',function(snapshot){
        var user_list = snapshot.val();
        for(var key in user_list)
        {
            if(user_list[key].email == email)
            {
                $scope.user_name = user_list[key].username

            }
        }
    })
    var ref = firebase.database().ref().child('hotel')
    $scope.test = $firebaseArray(ref)
    $scope.new_ = $scope.price;
    /*temp_hotel.on('value',function(snapshot){
        var ss = snapshot.val();
        console.log()
    })*/
    $scope.confo_numre;
    var req_hotel = firebase.database().ref().child('request/')
    var req_ = $firebaseArray(req_hotel);
    /*req_hotel.on('child_changed',function(data){
        var player = data.val();
        for(var key in player )
        {
            console.log(player)
            if(player[key].user_id == email && player[key].archive == true){
                var update_id = firebase.database().ref().child('user_hotel_list/')
                update_id.on('value',function(data){
                    var list = data.val();
                    for(var key_inner in list )
                    {
                        if(list[key_inner].user_id == email)
                        {
                            if(player[key].booking_id == list[key_inner].conformation)
                            {
                                var chande_id = firebase.database().ref().child('user_hotel_list/'+key_inner);
                                confo_numre = player[key].hotel_confo;
                                $('.confo_numre').text(player[key].hotel_confo)
                                $scope.confo_numre = confo_numre;
                                console.log(confo_numre)
                                chande_id.update({
                                    "hotel_confo": player[key].hotel_confo
                                });
                            }
                        }

                    }
                })

                if(player[key].hotel_confo != ""){
                    $scope.$watch(function(){
                        $scope.confo_numre = confo_numre;
                    })
                    $scope.confo_numre = confo_numre;
                    console.log($scope.confo_numre)
                    $('.offer_popup').addClass('hide');
                    $('.success_popup').addClass('hide');
                    $('.hot_conf').removeClass('hide');
                    if(notify == "true")
                    {
                        var sound_file;
                        if(sound == "false" || sound == false)
                        {
                            var alarmTime = new Date();
                            alarmTime.setMinutes(alarmTime.getMinutes());
                            $cordovaLocalNotification.add({
                                id: "11111",
                                date: alarmTime,
                                title: "Confirmation Number",
                                message: "Your Hotel Confirmation number "+player[key].hotel_confo,
                                icons:"res://icon/android/icon.png",
                                autoCancel: true,
                                sound:'http://codeandcore.com/ourwork/treverse/slient.wav',
                                icon: 'file://icon.png',
                                smallIcon: 'file://icon.png',
                            }).then(function () {
                                console.log("The notification has been set");
                            });  
                        } 
                        else
                        {
                            var alarmTime = new Date();
                            alarmTime.setMinutes(alarmTime.getMinutes());
                            $cordovaLocalNotification.add({
                                id: "11111",
                                date: alarmTime,
                                title: "Confirmation Number",
                                message: "Your Hotel Confirmation number "+player[key].hotel_confo,
                                icons:"res://icon/android/icon.png",
                                autoCancel: true,
                                icon: 'file://icon.png',
                                smallIcon: 'file://icon.png',
                            }).then(function () {
                                console.log("The notification has been set");
                            });  
                        }

                    }
                }
            }
        }
    })*/

    chaed = true
    req_hotel.on('child_added',function(data){
        var player = data.val();
        if(chaed != false)
        {
            console.log(2)
            chaed = false;
            for(var key in player )
            {
                console.log(3)
                if(player[key].user_id == email)
                {
                    if(player[key].desci == "true")
                    {
                        firebase.database().ref().child('hotel/'+player[key].hotel_id).on('value',function(h_data){
                            $scope.l_data = h_data.val();
                            $scope.test_data = player[key];
                            $scope.$apply();
                        })
                        console.log(4)
                        clearInterval(timerId);
                        clearInterval(hot_counting);
                        $("#countTime").html("0 : 00");
                        $('.offer_popup').addClass('hide');
                        $('.sorry').addClass('hide');
                        $('.fail_popup').addClass('hide');
                        $('.success_popup').removeClass('hide');
                        $('.btn.show_pop.show').removeClass('ponter_none')
                        $('.bar-dark .button.button-clear').removeClass('ponter_none_back')
                        $('.sorry').addClass('hide');
                        console.log(1)
                        if(notify == "true" || notify == true)
                        {
                            console.log(0)
                            var sound_file;
                            if(sound == "false" || sound == false)
                            {
                                var alarmTime = new Date();
                                alarmTime.setMinutes(alarmTime.getMinutes());
                                $cordovaLocalNotification.add({
                                    id: "11111",
                                    date: alarmTime,
                                    title: "Offer Accepted",
                                    message: "Your offer has been accepted.",
                                    icons:"res://icon/android/icon.png",
                                    autoCancel: true,
                                    sound:'http://codeandcore.com/ourwork/treverse/slient.wav',
                                    icon: 'file://icon.png',
                                    smallIcon: 'file://icon.png',
                                }).then(function () {
                                    console.log("The notification has been set");
                                });    
                            } 
                            else
                            {
                                var alarmTime = new Date();
                                alarmTime.setMinutes(alarmTime.getMinutes());
                                $cordovaLocalNotification.add({
                                    id: "11111",
                                    date: alarmTime,
                                    title: "Offer Accepted",
                                    message: "Your offer has been accepted.",
                                    icons:"res://icon/android/icon.png",
                                    autoCancel: true,
                                    sound:'file://audio/slient.mp3',
                                    icon: 'file://icon.png',
                                    smallIcon: 'file://icon.png',
                                }).then(function () {
                                    console.log("The notification has been set");
                                });
                            }

                        }
                    }
                }
            }
        }
    })


    user.on("value", function(snapshot) {
        var newPost = snapshot.val();
        user.on("child_added", function(newPost,pre){
            newchild = newPost.val();

        }); 
    });
    $scope.rate = jQuery('.ion-ios-star').length;
    $scope.dates_1 = date_1;
    $scope.dates_2 = date_2;
    if(filters == ""){
        $scope.cites = filters;
    }
    else{
        $scope.cites = filters;
    }

    $scope.cites_2 = store_city;
    console.log(filters,store_city)
    $http.get('hotels.json').success(function(res){

    });
    var _x_ = 0

    $scope.sent =function(){
        if(email == "undefined" || email == null){
            /*$state.go('app.signin')*/
            var total_hotel;
            chaed = true;
            if($('#hotel_num').val() == 0){
                var alertPopup = $ionicPopup.alert({
                    title: 'Error',
                    template: 'Please Select at least 1 Hotel'
                });
                console.log($('.bot_fix .top_bottom input[type="number"]').val())
                return false;
            }
            if($('.bot_fix .top_bottom input[type="number"]').val() == ""){
                var alertPopup = $ionicPopup.alert({
                    title: 'Error',
                    template: 'Please Make an Offer'
                });
                console.log($('.bot_fix .top_bottom input[type="number"]').val())
                return false;
            }
            if($('.bot_fix .top_bottom input[type="number"]').val() < 10.00){
                var alertPopup = $ionicPopup.alert({
                    title: 'Error',
                    template: 'Minimum value $10'
                });
                return false;
            }
            if($('#hotel_num').val() == 0 && $('.bot_fix .top_bottom input[type="number"]').val() == "")
            {
                var alertPopup = $ionicPopup.alert({
                    title: 'Error',
                    template: 'Please select the desire values'
                });
                console.log($('.bot_fix .top_bottom input[type="number"]').val())
                return false;
            }

            $('.red_popup').removeClass('hide')
        }
        else{

            $('.bar-dark .button.button-clear').addClass('ponter_none_back')
            var total_hotel;
            chaed = true;
            if($('#hotel_num').val() == 0){
                var alertPopup = $ionicPopup.alert({
                    title: 'Error',
                    template: 'Please Select at least 1 Hotel'
                });
                console.log($('.bot_fix .top_bottom input[type="number"]').val())
                return false;
            }
            if($('.bot_fix .top_bottom input[type="number"]').val() == ""){
                var alertPopup = $ionicPopup.alert({
                    title: 'Error',
                    template: 'Please Make an Offer'
                });
                console.log($('.bot_fix .top_bottom input[type="number"]').val())
                return false;
            }
            if($('.bot_fix .top_bottom input[type="number"]').val() < 10.00){
                var alertPopup = $ionicPopup.alert({
                    title: 'Error',
                    template: 'Minimum value $10'
                });
                return false;
            }
            if($('#hotel_num').val() == 0 && $('.bot_fix .top_bottom input[type="number"]').val() == "")
            {
                var alertPopup = $ionicPopup.alert({
                    title: 'Error',
                    template: 'Please select the desire values'
                });
                console.log($('.bot_fix .top_bottom input[type="number"]').val())
                return false;
            }
            else
            {
                function IDGenerator() {

                    this.length = 8;
                    this.timestamp = +new Date;

                    var _getRandomInt = function( min, max ) {
                        return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
                    }

                    this.generate = function() {
                        var ts = this.timestamp.toString();
                        var parts = ts.split( "" ).reverse();
                        var id = "";

                        for( var i = 0; i < this.length; ++i ) {
                            var index = _getRandomInt( 0, parts.length - 1 );
                            id += parts[index];	 
                        }

                        return id;
                    }
                }
                var generator = new IDGenerator();
                booking_id = new Date().getTime()
                $scope.booking_id = booking_id;
                $('.offer_popup').removeClass('hide');
                $('.inner_list .checkbox input:checked').each(function(i){
                    var id  = $(this).parent().parent().attr('id')
                    console.log(user_name)
                    firebase.database().ref().child('teml_hotel_list/'+booking_id).push({
                        hotel_id : id,
                        ammount : $('.bot_fix .top_bottom input[type="number"]').val(),
                        desci : false,
                        email: email,
                        l_name:l_name,
                        name:$('.names').eq(i).html(),
                        user_name:user_name,
                        night:night,
                        room:$('.room p span').text(),
                        guest:$('.guest p span').text(),
                        bed:$('.beds p span').text(),
                        Arrival:date_1,
                        cod:date_2,
                        mobile:mob_no,
                        l_name:l_name,
                        h_mobile:$(this).parent().parent().next().attr('data-mobile'),
                    });
                    firebase.database().ref().child('user_req_list/'+user_name).push({
                        hotel_id : id,
                        time:booking_id,
                        ammount : $('.bot_fix .top_bottom input[type="number"]').val(),
                        desci : false,
                        email: email,
                        name:$('.names').eq(i).html(),
                        user_name:user_name,
                        night:night,
                        room:$('.room p span').text(),
                        guest:$('.guest p span').text(),
                        bed:$('.beds p span').text(),
                        Arrival:date_1,
                        cod:date_2,
                        mobile:mob_no,
                        l_name:l_name,
                        h_mobile:$(this).parent().parent().next().attr('data-mobile'),
                        stts:""
                    });
                    firebase.database().ref().child('track/'+booking_id).set({
                        user:email,
                        hotel_id:id,
                        sub_date:booking_id,
                        accept:"Pending",
                        reject:"Pending",
                        conform:"Pending",
                        timeout:'Pending',
                        night:night,
                        room:$('.room p span').text(),
                        guest:$('.guest p span').text(),
                        bed:$('.beds p span').text(),
                        t_ammount : $('.bot_fix .top_bottom input[type="number"]').val(),
                        ammount : ($('.bot_fix .top_bottom input[type="number"]').val()/night),
                        Arrival:date_1,
                        cod:date_2,
                        mobile:mob_no,
                        l_name:l_name,
                        h_mobile:$(this).parent().parent().next().attr('data-mobile'),
                    })
                    var id = $(this).parent().parent().attr('id');
                    $scope.amount_ = $('.bot_fix .top_bottom input[type="number"]').val();
                    $scope.per_day = $('.bot_fix .top_bottom input[type="number"]').val()/night;
                    $scope.cid = date_1
                    $scope.cod = date_2
                    $scope.guest = $('.guest p span').text();
                    $scope.beds = $('.beds p span').text();

                })
                var hotel_rej = firebase.database().ref().child('teml_hotel_list/'+booking_id)
                var shiv = $firebaseArray(hotel_rej)
                shiv.$loaded().then(function(data) {
                    $scope.$watch(function(){
                        total_hotel = data.length;
                    })
                });
                $('.btn.show_pop.show').addClass('ponter_none');
                var countdown = 1 * 60 * 1000;
                setTimeout(function(){
                    hot_counting = setInterval(function(){
                        if(total_hotel == 0)
                        {
                            clearInterval(timerId);
                            clearInterval(hot_counting);
                            $("#countTime").html("0 : 00");
                            $('.btn.show_pop.show').removeClass('ponter_none')
                            $('.bar-dark .button.button-clear').removeClass('ponter_none_back')
                            $('.offer_popup').addClass('hide');
                            $('.success_popup').addClass('hide');
                            $('.fail_popup').addClass('hide');
                            $('.sorry').removeClass('hide');
                            firebase.database().ref().child("user_hotel_list/").push({
                                total : $('.inner_list .checkbox input:checked').length,
                                city : store_city ,
                                stars : stars ,
                                user_id : email,
                                ammount :$('.bot_fix .top_bottom input[type="number"]').val(),
                                reject : true,
                                night:night,
                                room:$('.room p span').text(),
                                guest:$('.guest p span').text(),
                                bed:$('.beds p span').text(),
                                archive:true,
                                State:filters,
                                stts:"rej"
                            })
                            if(notify == "true")
                            {
                                var sound_file;
                                if(sound == "false" || sound == false)
                                {
                                    var alarmTime = new Date();
                                    alarmTime.setMinutes(alarmTime.getMinutes());
                                    $cordovaLocalNotification.add({
                                        id: "11111",
                                        date: alarmTime,
                                        title: "Offer Not Accepted",
                                        message: "Your offer was not accepted",
                                        icons:"res://icon/android/icon.png",
                                        autoCancel: true,
                                        icon: 'file://icon.png',
                                        sound:'http://codeandcore.com/ourwork/treverse/slient.wav',
                                        smallIcon: 'file://icon.png',
                                    }).then(function () {
                                        console.log("The notification has been set");
                                    });   
                                } 
                                else
                                {
                                    var alarmTime = new Date();
                                    alarmTime.setMinutes(alarmTime.getMinutes());
                                    $cordovaLocalNotification.add({
                                        id: "11111",
                                        date: alarmTime,
                                        title: "Offer Not Accepted",
                                        message: "Your offer was not accepted",
                                        icons:"res://icon/android/icon.png",
                                        autoCancel: true,
                                        icon: 'file://icon.png',
                                        sound:'file://audio/slient.mp3',
                                        smallIcon: 'file://icon.png',
                                    }).then(function () {
                                        console.log("The notification has been set");
                                    });
                                }

                            }
                        } 

                    },100)
                },250)
                timerId = setInterval(function(){
                    countdown -= 1000;
                    var min = Math.floor(countdown / (60 * 1000));
                    var sec = Math.floor((countdown - (min * 60 * 1000)) / 1000);  //correct
                    if(sec < 10)
                    {
                        sec = ("00" + sec).substr(-2);
                    }
                    if (countdown <= 0) {
                        $('.bar-dark .button.button-clear').removeClass('ponter_none_back')
                        clearInterval(timerId);
                        clearInterval(hot_counting);
                        $("#countTime").html("0 : 00");
                        $('.offer_popup').addClass('hide');
                        $('.success_popup').addClass('hide');
                        $('.sorry').addClass('hide');
                        $('.fail_popup').removeClass('hide');
                        $('.fail_popup .popup').removeClass('hide');
                        $('.btn.show_pop.show').removeClass('ponter_none')
                        var temp_hotel = firebase.database().ref().child('teml_hotel_list/')
                        /*var request = firebase.database().ref().child('request/')*/
                        firebase.database().ref().child('teml_hotel_list/'+booking_id).on('value',function(data){
                            var new_data = data.val();
                            for(var z in new_data){
                                $scope.test_data = new_data[z]
                            }
                            /*console.log($scope.test_data)*/
                            firebase.database().ref().child('timeout/'+booking_id+'').set(data.val());
                            /*var new_x = firebase.database().ref().child('timeout/'+booking_id).on('value',function(data){
                            var new_data = data.val();
                            for(var x in new_data)
                            {
                                firebase.database().ref().child('timeout/'+booking_id+'/'+x).update({timeout:new Date().getTime()});
                            }
                        })*/
                        })
                        firebase.database().ref().child('track/'+booking_id).update({
                            accept:"-",
                            reject:"-",
                            conform:"-",
                            timeout:new Date().getTime()
                        })
                        firebase.database().ref().child('teml_hotel_list/'+booking_id).remove()
                        if(notify == "true")
                        {
                            var sound_file;
                            if(sound == "false" || sound == false)
                            {
                                var alarmTime = new Date();
                                alarmTime.setMinutes(alarmTime.getMinutes());
                                $cordovaLocalNotification.add({
                                    id: "11111",
                                    date: alarmTime,
                                    title: "Offer Timed Out",
                                    message: "Your offer was not accepted in time.",
                                    icons:"res://icon/android/icon.png",
                                    autoCancel: true,
                                    icon: 'file://icon.png',
                                    sound:'http://codeandcore.com/ourwork/treverse/slient.wav',
                                    smallIcon: 'file://icon.png',
                                }).then(function () {
                                    console.log("The notification has been set");
                                });  
                            }
                            else
                            {
                                var alarmTime = new Date();
                                alarmTime.setMinutes(alarmTime.getMinutes());
                                $cordovaLocalNotification.add({
                                    id: "11111",
                                    date: alarmTime,
                                    title: "Offer Timed Out",
                                    message: "Your offer was not accepted in time.",
                                    icons:"res://icon/android/icon.png",
                                    autoCancel: true,
                                    icon: 'file://icon.png',
                                    sound:'file://audio/slient.mp3',
                                    smallIcon: 'file://icon.png',
                                }).then(function () {
                                    console.log("The notification has been set");
                                });  
                            }
                        }
                        temp_obj = $firebaseArray(temp_hotel)
                    } else {
                        $("#countTime").html(min + " : " + sec);
                    }

                }, 1000); //1000ms. = 1sec.
            }
        }
    }
    $scope.values = _x_;
    $scope.change = function() {
        $timeout(function(){
            _x_ = $('.inner_list .checkbox input:checked').length;
            $scope.values = _x_;
        },100)
    };

    $scope.$watch(function(){
        if($('.red_list').length == 0 && $('.top_list').length == 0)
        {
            $('.null_val').fadeIn();
        }
        else{
            $('.null_val').fadeOut();
        }

    })

    $scope.scrolling = function(){
        $('.pac-container').css('top',$('#auto').offset().top +34)
    }


})
    .controller("push", function($scope, $cordovaLocalNotification ,$state ,$ionicHistory) {
    $scope.clear = function(){
    }

    $scope.go = function(){
        if(flag == true)
        {
            console.log(flag)
            $state.go("app.home")
        }
        else
        {
            console.log(flag)
            $state.go("app.signin")
        }
    }


    /*$(document).on('click','.reset',function(){
        alert(0)
        var auth = firebase.auth();
        var emailAddress = window.localStorage.getItem('email');

        auth.sendPasswordResetEmail(emailAddress).then(function() {
            alert('Link has been sent to your email account')
        }, function(error) {
            // An error happened.
        });    
    })*/
    $scope.add = function() {
        var alarmTime = new Date();
        alarmTime.setMinutes(alarmTime.getMinutes());
        $cordovaLocalNotification.add({
            id: "1234",
            date: alarmTime,
            message: "This is a message",
            title: "This is a title",
            icons:"res://icon/android/icon.png",
            autoCancel: true,
            icon: 'file://icon.png',
            smallIcon: 'file://icon.png',
        }).then(function () {
            console.log("The notification has been set");
        });
    };

    $scope.isScheduled = function() {
        $cordovaLocalNotification.isScheduled("1234").then(function(isScheduled) {
            alert("Notification 1234 Scheduled: " + isScheduled);
        });
    }

})
    .controller("states",function($scope,$state,$ionicSideMenuDelegate,$ionicHistory){
    $scope.$watch(function(){
        if(email != null)
        {
            log_stts = true;
            $scope.status = log_stts;
        }
        else
        {
            $scope.status = log_stts;
        }
    })
    $scope.logout = function(){
        firebase.auth().signOut().then(function() {
            console.log('Signed Out');
        }, function(error) {
            console.error('Sign Out Error', error);
        });

        localStorage.clear();
        email = null;
        user_name = null
        flag = false;
        log_stts = false
        $state.go('app.welcome')
        $ionicSideMenuDelegate.toggleLeft();
        localStorage.removeItem('email')
        localStorage.removeItem('user_name')
        $state.go('app.welcome', {}, {reload: true});
        $ionicHistory.nextViewOptions({
            disableBack: true
        });
        window.location.reload();
        /*window.localstorage.removeitem('user_name')
        window.localstorage.removeitem('email')*/
    }
    /*$scope.home = function(){
        if(flag == true)
        {
            $state.go("app.home")
        }
        else
        {
            $state.go('app.signin')
        }
    }
    $scope.client = function(){
        if(flag == true)
        {

            $state.go('app.client-dashboard')
        }
        else
        {
            $state.go('app.client-dashboard')
        }
    }*/
})
    .controller("dashbord",function($scope,$firebaseObject,$firebaseArray,$ionicHistory){
    /*setTimeout(function(){
        $ionicHistory.clearCache([$state.current.name]).then(function() {
            $state.reload();
        })
    },100)*/
    /*$ionicHistory.nextViewOptions({
        disableBack: true
    });*/
    $scope.$watch(function(){
        $scope.profile = profile
        $scope.user_name = user_name
        $scope.l_name = l_name
    })

    var user_list = firebase.database().ref().child("user_hotel_list")
    $scope.dash_name = user_name;
    $scope.user_ls = $firebaseArray(user_list);
    $scope.user_log = email
    $scope.$watch(function(){
        $scope.user_log = email

    })
    $(document).on('click','.bar_bottom.del_sec a',function(){
        var key  = $(this).attr('data-id');
        firebase.database().ref().child('user_hotel_list/'+key).remove();
    })
    $scope.change = function() {
        $timeout(function(){
            var _x_ = $('.inner_list .checkbox input:checked').length;
            $scope.values = _x_;
        },100)
    };

    $scope.archive = function(id)
    {
        firebase.database().ref().child("user_hotel_list/"+id).update({
            archive:false    
        })

    }

})
    .controller('GeoCtrl', function() {

})
    .controller('push',function($scope,$ionicHistory){

    $ionicHistory.nextViewOptions({
        disableBack: true
    }); 

    var user_key;
    notify = localStorage.getItem('notify');
    sound = localStorage.getItem('sound');
    if(notify == "true")
        $scope.airplaneMode  = Boolean(1);
    else
        $scope.airplaneMode  = Boolean(0);

    console.log(sound)
    if(sound == "true" || sound == true)
        $scope.soundmode  = Boolean(1);
    else
        $scope.soundmode  = Boolean(0);

    var user_key = firebase.database().ref().child('users');
    user_key.on('value',function(data){
        var x= data.val()
        for(var key in x)
        {
            if(x[key].email == email){
                user_key = key;
            }
        }   
    })
    $scope.change = function(){

        console.log($scope.airplaneMode)
        if($scope.airplaneMode != Boolean(1))
        {
            localStorage.removeItem('notify')
            notify = "false";
            window.localStorage.setItem('notify',false)
            /*console.log(localStorage.getItem('notify'))*/
            firebase.database().ref().child('users/'+user_key).update({
                "notify": false
            });
        }
        else
        {
            localStorage.removeItem('notify')
            notify = "true"
            localStorage.setItem('notify',notify)
            /*console.log(localStorage.getItem('notify'))*/
            firebase.database().ref().child('users/'+user_key).update({
                "notify": true
            });
        }
    }
    $scope.sound = function(e){
        console.log($scope.soundmode)
        console.log(window.localStorage.getItem('sound'),0)
        if($scope.soundmode != Boolean(1))
        {
            localStorage.removeItem('sound')
            notify = "false";
            $scope.soundmode = false
            localStorage.setItem('sound',notify)
            /*console.log(localStorage.getItem('notify'))*/
            firebase.database().ref().child('users/'+user_key).update({
                "sound": false
            });
        }
        else
        {
            localStorage.removeItem('sound')
            sound = "true"
            /*$scope.soundmode = Boolean(1)*/
            $scope.soundmode = true
            localStorage.setItem('sound',sound)
            /*console.log(localStorage.getItem('notify'))*/
            firebase.database().ref().child('users/'+user_key).update({
                "sound": true
            });
        }
        return false
    }
})
    .controller('feedback',function($scope,$cordovaEmailComposer,$http,$ionicPopup){
    $scope.feedback = function(email,option,text){
        console.log(option)
        var method = 'POST';
        var url = 'http://www.codeandcore.com/ourwork/app_mail/feedback.php';
        var code = '<p>Type : '+option+'</p><p>Send From : '+email+'</p><p>Content : '+text+'</p>' 
        $scope.codeStatus = "";
        var FormData = {
            'name' : "treverse",
            'email' : email,
            'message': code
        };
        $http({
            method: method,
            url: url,
            data: FormData,
            html:true,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).
        success(function(response) {
            $scope.codeStatus = response.data;
            var alertPopup = $ionicPopup.alert({
                title: 'Feedback',
                template: 'Thank you for your help, we will contact you soon.'
            });
        }).
        error(function(response) {
            $scope.codeStatus = response || "Request failed";
        });
        return false;

    }


})
    .controller('hotel_detail',function($scope,$ionicSlideBoxDelegate,$timeout ,$ionicLoading){

    $scope.rating = {};
    $scope.rating.rate = 3;
    $scope.rating.max = 5;


    $scope.nextSlide = function() {
        $ionicSlideBoxDelegate.next();
    }
    $scope.previousSlide = function() {
        $ionicSlideBoxDelegate.previous();
    }
    var list_id = [];
    var _id_;
    $(document).on('click','#hot_id',function(){
        list_id = []
        $('a[data-h_id]').each(function(){
            var idlist = $(this).data('h_id')
            list_id.push(idlist);
        })
        $ionicLoading.show({
            content: 'Loading',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });
        _id_ = $(this).attr('data-h_id');
        console.log(_id_)
        var ref = firebase.database().ref().child('hotel/'+_id_).on('value',function(data){
            $scope.hotel_detail = data.val()
            $scope.img_list = $scope.hotel_detail.list_img
            $scope.icon_hot = $scope.hotel_detail.hotel_am
            $scope.icon_room = $scope.hotel_detail.room_am
            var test1,test2;
            test1 = $scope.hotel_detail.Latitude
            test2 = $scope.hotel_detail.Longitude
            var lat  = h_lat;
            var long = h_log;
            var R = 6371;
            var p = 0.017453292519943295;    // Math.PI / 180
            var c = Math.cos;
            var a = 0.5 - c((lat - test1) * p)/2 + 
                c(test1 * p) * c(lat * p) * 
                (1 - c((long - (test2)) * p))/2;
            a= 12742 * Math.asin(Math.sqrt(a)); 
            $scope.dis = ( a * 0.62137).toFixed(2);
            console.log($scope.dis)
            console.log(lat,long)
            /*$('.loading_pop').addClass('hide')*/
            /*return a;*/
            console.log($scope.hotel_detail.Longitude)
            $ionicLoading.hide();
        });
    })

    $(document).on('click','#right_btn',function(){
        $ionicLoading.show({
            content: 'Loading',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });
        console.log(list_id)
        var ind ,new_id;
        list_id.find(function(currentValue,index){
            new_id = currentValue;
            console.log(new_id)
            if(currentValue == _id_)
            {
                ind = index+1;
                new_id = list_id[ind];
                if(new_id == undefined)
                {
                    console.log(new_id = currentValue)
                }
            }
        })
        var ref = firebase.database().ref().child('hotel/'+new_id).on('value',function(data){
            $scope.hotel_detail = data.val()

            var test1,test2;
            test1 = $scope.hotel_detail.Latitude;
            test2 = $scope.hotel_detail.Longitude;
            var lat  = h_lat
            var long = h_log
            var R = 6371;
            var p = 0.017453292519943295;    // Math.PI / 180
            var c = Math.cos;
            var a = 0.5 - c((lat - test1) * p)/2 + 
                c(test1 * p) * c(lat * p) * 
                (1 - c((long - (test2)) * p))/2;
            a= 12742 * Math.asin(Math.sqrt(a)); 
            $scope.dis = ( a * 0.62137).toFixed(2);
            console.log($scope.dis)
            /*$('.loading_pop').addClass('hide')*/
            /*return a;*/
            $ionicLoading.hide();
            console.log($scope.hotel_detail.Latitude)
            console.log($scope.hotel_detail.Longitude)
        });

    })
}).controller('how_work',function($scope,$state){
    $scope.reg = function(){
        $state.go('app.home')
        /*if(email != null)
        {
            $('.how_it_work').removeClass('active')
            $('.slides').removeClass('active')
        }
        else
        {
        }*/
    }
})
/* Jquery */
$(document).on('click','.tab_sec .tab_list a',function(){
    $('.tab_sec .tab_list a').removeClass('active');
    $(this).addClass('active')
    var i = $(this).index();
    var height = $('.tab_sys .tab_list').eq(i).height();
    var height1 = $('.tab_sys ul').height();
    $('.tab_sys').height(height)
    $('.tab_sys .tab_list').removeClass('active')
    $('.tab_sys .tab_list').eq(i).addClass('active');
})


jQuery(document).on('click','.home .bottom_sec .star_list ul li',function(){
    setTimeout(function(){
        var _len_ = jQuery('.home .bottom_sec .star_list .ion-ios-star').length;
        if(_len_ >= 5)
        {
            jQuery('.home .bottom_sec .star_list p').text("5 stars")
        }
        else
        {
            jQuery('.home .bottom_sec .star_list p').text(_len_+ ' stars & up');
        }
    },100)
})
$(document).on('click','.show_pop',function(){

})
$(document).on('click','.close',function(){
    $(this).parent().parent().addClass('hide')
})
$(document).on('click','.open_pop',function(){
    $('.how_it_work').toggleClass('active')
    $('.slides').toggleClass('active')
})
$(document).on('click','.how_it_work , .menu_btn',function(){
    $('.how_it_work').removeClass('active')
    $('.slides').removeClass('active')
})
$(document).on('click','.make_another',function(e){
    e.preventDefault();
    $('.sorry').addClass('hide')
    $('.fail_popup').addClass('hide')
})
$(document).on('change','.bot_fix .top_bottom input[type="number"]',function(){
    (function(el){el.value=parseFloat(el.value).toFixed(2);})(this)
    $('.offer_popup .popup .mid_part .right_txt .sub_total h3 b').text(parseFloat(Math.round(($(this).val()) * 100) / 100).toFixed(2))
    $('.offer_popup .popup .mid_part .right_txt .per_night h3 b').text(parseFloat(Math.round(($(this).val()/night) * 100) / 100).toFixed(2))
    var x = parseFloat(Math.round(($(this).val()/night) * 100) / 100).toFixed(2)
    $('.pric_fail_data').text(x)
    $('.pric_fail').text($(this).val())
    $('.succ_price').text($(this).val())

    setTimeout(function(){
    },100)
})
$(document).on('click','.easy-autocomplete-container ul li',function(){
    var x = $('#auto').val();
    $('#auto').attr('data-city', x);
    var y = $(this).text()
    y = y.replace('-',',')
    $('#auto').val();
    $('#auto').val(y);
})


$(document).on('click','.count_list',function(){
    $('.count_pop').addClass('active');
    $('.overlay').addClass('active');
})
$(document).on('click','.set_btn, .overlay',function(){
    $('.count_pop').removeClass('active');
    $('.overlay').removeClass('active');
})
$(document).on('click','.home .count_pop .counter a.right_btn',function(){
    var x = $(this).prev().children('span').text();
    var y = $(this).prev().children('em').text();
    x = parseInt(x)
    $(this).prev().children('span').text(x+1)
    var z = $(this).prev().children('span').text()
    if(z > 1)
    {   
        if(y == "Room")
        {
            $(this).prev().children('em').text("Rooms")
        }
        if(y == "Guest")
        {
            $(this).prev().children('em').text("Guests")
        }
        if(y == "Bed")
        {
            $(this).prev().children('em').text("Beds")
        }
    }

})
$(document).on('click','.counter.room a.left_btn',function(){
    $('.guest p span').text('1')
    $('.beds p span').text('1')
})
$(document).on('click','.home .count_pop .counter a.left_btn',function(){
    var x = $(this).next().children('span').text();
    x = parseInt(x)
    if($(this).next().children('em').text() == "Rooms")
    {
        $('.guest p em').text("Guest")
        $('.beds p em').text("Bed")
    }
    if(x <=2)
    {
        if($(this).next().children('em').text() == "Rooms")
        {
            $(this).next().children('em').text("Room")
            $('.guest p em').text("Guest")
            $('.beds p em').text("Bed")
        }
        if($(this).next().children('em').text() == "Guests")
        {
            $(this).next().children('em').text("Guest")
        }
        if($(this).next().children('em').text() == "Beds")
        {
            $(this).next().children('em').text("Bed")
        }
    }
    if(x <= 1)
    {

        return false
    }
    else
    {
        $(this).next().children('span').text(x - 1)
    }

})

$(document).on('click','.set_btn',function(){
    var r = $('.room p').text()
    var g = $('.guest p').text()
    var b = $('.beds p').text()
    $('.count_list').text(r+", "+g + ", "+b);
})

$(document).on('click','.term_btn',function(){
    $('.term_over').removeClass('hide')
    $('.terms').removeClass('hide')
})
$(document).on('click','.term_over',function(){
    $('.term_over').addClass('hide')
    $('.terms').addClass('hide')
})

$(document).on('click','.how_do_work .que_slid h3',function(){
    if($(this).hasClass('active'))
    {
        $(this).next().slideUp();
        $(this).removeClass('active');        
    }
    else
    {
        $('.how_do_work .que_slid h3').removeClass('active')
        $('.how_do_work .que_slid h3').next().slideUp();

        $(this).next().slideDown();
        $(this).addClass('active');
    }
})
$(document).on('change','.step_pop .popup .inner_detail input[type="checkbox"]',function(){
    if(this.checked) {
        $(this).parent().addClass('active')
        firebase.database().ref().child('users').on('value',function(data){
            var list_user = data.val();
            for(var x in list_user){
                if(list_user[x].email == email)
                {
                    console.log(x)
                    firebase.database().ref().child('users/'+x).update({
                        show:"true"
                    })
                }
            }
        }) 
    }
    else{
        firebase.database().ref().child('users').on('value',function(data){
            var list_user = data.val();
            for(var x in list_user){
                if(list_user[x].email == email)
                {
                    firebase.database().ref().child('user/'+x).update({
                        show:"false"
                    })
                }
            }
        }) 
        $(this).parent().removeClass('active')
    }
});

$(document).on('click','.user_dashboard .bdr_list .show_more',function(){
    $(this).toggleClass('active');
    if($(this).hasClass('active')){
        $(this).children().text('Show Less')
    }
    else{
        $(this).children().text('Show More')
    }
    $(this).parent().children('.more_detail').slideToggle()
    $(this).parent().children('.center').slideToggle()
})


$(document).on('click','.add_btn',function(){
    setTimeout(function(){
        $('#profile').trigger('click')
    },100)
})
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#test').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}

$(document).on('change',"#profile",function(){
    readURL(this);
});


var data = new FormData();
$(document).on('submit', '#sent', function( e ){
    if($('#profile').val() == ""){
        return false;
    }
    else{
        $.ajax( {
            url: "http://codeandcore.com/ourwork/treverse/src/js/controllers/profile.php",
            type:'POST',
            data: new FormData( this ),
            processData: false,
            contentType: false,
        });
        e.preventDefault();
    }
});

$(document).on('click','.map_open',function(){
    window.open($(this).attr('data-maps'), '_blank');
})

$(document).on('click','.g_back',function(){
    $('.red_popup').addClass('hide')
})