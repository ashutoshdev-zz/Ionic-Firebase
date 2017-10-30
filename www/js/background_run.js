function onLoad() {
    document.addEventListener('deviceready', function () {
        console.log(cordova.plugins.backgroundMode.enable)
        // Android customization
        cordova.plugins.backgroundMode.setDefaults({silent: true});
        // Enable background mode
        cordova.plugins.backgroundMode.enable();
        // Called when background mode has been activated
        cordova.plugins.backgroundMode.onactivate = function () {
            /*setTimeout(function () {
                // Modify the currently displayed notification
                cordova.plugins.backgroundMode.configure({
                    text:'Running in background for more than 5s now.'
                });
            }, 100);*/
        }
    });
}
onLoad();