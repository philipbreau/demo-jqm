window.echoHub = 'http://api.bridgeit.mobi/echo/';
window.pushHub = 'http://api.bridgeit.mobi/push/';
window.apiKey = '197EBF31-40CD-444F-826F-10158A0F3581';
bridgeit.overrideAugmentedRealityAlphaLevel = true; //allow Augmented Reality on Android for the public demos

bridgeit.launchFailed = function(){
    document.getElementById('appStoreLink').href = bridgeit.appStoreURL();
    var popup = document.getElementById('getBridgeItPopup');
    popup.style.opacity = 0.95;
    popup.style.display = 'block';
    var vwidth = document.body.clientWidth;
    //center popup with 30px padding of body
    //popup.style.marginLeft = '' + ((vwidth*0.4)/2)-30 + 'px';
}
bridgeit.notSupported = function(id, command){
    if( !bridgeit.isIOS() && !bridgeit.isAndroid() && !bridgeit.isWindowsPhone8()){
        alert('Would you like to try the full mobile experience with BridgeIt? Grab an iOS, Android, or Windows 8 Phone device and try it out!');
    }
    else{
        alert('Sorry, the command ' + command + ' for BridgeIt is not supported on this platform');
    }
}
function closeGetBridgeItPopup(){
    var popup = document.getElementById('getBridgeItPopup');
    popup.style.opacity = 0;
    popup.style.display = 'none';
    return true;
}
function ajaxGet(url,cb){
    var request;
    if( window.XMLHttpRequest){
        request = new XMLHttpRequest();
    }
    else if( window.ActiveXObject ){
        try{
            request = new ActiveXObject("Msxml2.XMLHTTP");
        }
        catch(e){
            try{
                request = new ActiveXObject("Microsoft.XMLHTTP");
            }
            catch(e){}
        }
    }
    if( !request ){
        console.log("Unable to invoke XMLHttpRequest for " + url);
        return false;
    }
    request.onreadystatechange = function(){
        if (request.readyState === 4) {
            if (request.status === 200) {
                cb(request.responseText);
            } else {
                console.log("XMLHttpRequest for " + url +
                        " with status " + request.status);
            }
          }
    }
    request.open('GET', url);
    request.send();
}
function simpleTime()  {
    var now = new Date();
    return simpleTimeFromDate(now);
}
function simpleTimeFromDate(date){
    return date.getHours() + ":" + 
    ("00" + date.getMinutes()).slice(-2) + ":" +
    ("00" + date.getSeconds()).slice(-2);
}
var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
function dateTimeStringFromDate(date)  {
    var res = simpleTimeFromDate(date);
    return res + ' ' + months[date.getMonth()] + ' ' + date.getDate();
}
function hasClassList(){
    return "document" in self && (
                "classList" in document.createElement("_") &&
                "classList" in document.createElementNS("http://www.w3.org/2000/svg", "svg")
        );
}

function setMinContentHeight(event){
    if( navigator.userAgent.toLowerCase().indexOf('android') > -1 ){
        if( event && event.type == 'resize'){
            return;
        }
    }
    var bufferHeight = 
        (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i) ? 50 : 70);
    var minContentHeight = $(window).height() - bufferHeight;
    $("div[data-role='content']").each(function(idx, elem){
        elem.style.minHeight = '' + minContentHeight + 'px';
    });
}
window.addEventListener('onorientationchange', setMinContentHeight, false);
