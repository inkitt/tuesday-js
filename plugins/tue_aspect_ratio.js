function TueAspectRatio(){
    let tue_size=[800,480]
    let elem=tuesday.parentNode;
    let rect=elem.getBoundingClientRect();
    if( rect.height==0 || rect.width==0 ){
        var s=( (tue_size[0]/window.innerWidth)>(tue_size[1]/window.innerHeight) ) ? window.innerWidth / tue_size[0] : window.innerHeight / tue_size[1];
        tuesday.style.left=(window.innerWidth-(tue_size[0]*s))/2+"px";
        tuesday.style.top=(window.innerHeight-(tue_size[1]*s))/2+"px";
    }else{
        var s=( (tue_size[0]/rect.width)>(tue_size[1]/rect.height) ) ? rect.width / tue_size[0] : rect.height / tue_size[1];
        tuesday.style.left=(rect.width-(tue_size[0]*s))/2+"px";
        tuesday.style.top=(rect.height-(tue_size[1]*s))/2+"px";
    }
    elem.style.backgroundColor="#000";
    elem.style.overflow="hidden";
    elem.style.position="relative";
    tuesday.style.position="absolute";
    tuesday.style.transformOrigin="left top";
    tuesday.style.width =tue_size[0]+"px";
    tuesday.style.height=tue_size[1]+"px";
    tuesday.style.scale=s;
}
window.addEventListener('resize',TueAspectRatio,true);
TueAspectRatio();
