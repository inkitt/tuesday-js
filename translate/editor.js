var countWords=0,countSymbols=0,countBytes=0,reg=/[aA-zZаА-яЯёЁ\u2019\u0027\-]+/g;
var body=document.body,html=document.documentElement;
var all_blocks=document.getElementsByClassName("story_block");
var story_lines=document.getElementById("story_lines");
var menu_add=document.getElementById('add_element');
var img_file=document.getElementById('json_file');
var color_chois=document.getElementById('paletr');
var languare="en";
const runtime = document.getElementById('runtime').innerHTML;
let arr_l;
let arr_n;
const color_ui=[
    ['#cec8e3','#efefff','rgba(110,95,165,0.25)','rgb(90,75,145)','rgba(110,95,165,0.5)','#6e5fa5','#fff','none','#000'],
    ['#a3cdf0','#e8f3ff','rgba(83,150,204,0.25)','rgb(83,150,204)','rgba(83,150,204,0.5)','#596c7f','#fff','none','#000'],
    ['#adced1','#def9fb','rgba(103,123,124,0.25)','rgb(103,123,124)','rgba(103,123,124,0.5)','#677b7c','#fff','none','#000'],
    ['#ccc','#eee','rgba(0,0,0,0.25)','#444','rgba(0,0,0,0.25)','#777','#fff','none','#000'],
    ['#beb3af','#dfd9d7','rgba(64,55,51,0.25)','rgb(160,142,136)','rgba(160,142,136,0.5)' ,'#5a4d46','#fff','none','#000'],
    ['#d2c4a5','#efe1c3','rgba(121,103,63,0.25)','rgb(121,103,63)','rgba(121,103,63,0.5)' ,'#7b6f54','#fff','none','#000'],
    ['#c4cebb','#dfebd5','rgba(109,124,91,0.25)','rgb(109,124,91)','rgba(109,124,91,0.5)' ,'#427e00','#fff','none','#000'],
    ['#7f7f7f','#1f1f1f','rgba(0,0,0,0.5)','rgba(0,0,0,0.7)','rgba(0,0,0,0.5)','#888','#383838','invert(85%) hue-rotate(180deg)','#d8d8d8',"#7f7f7f"],
    ['#6178aa','#192543','rgba(0,0,0,0.5)','rgba(0,0,0,0.7)','rgba(0,0,0,0.5)','#888','#303f6a','invert(90%) hue-rotate(180deg)','#ddd',"#6178aa"],
    ['#7f7f7f','#131a1e','rgba(0,0,0,0.5)','rgba(0,0,0,0.7)','rgba(0,0,0,0.5)','#888','#26343d','invert(90%)','#ddd',"#647f90"],
    ['#9d7290','#1e111a','rgba(0,0,0,0.5)','rgba(0,0,0,0.7)','rgba(0,0,0,0.5)','#888','#411934','invert(85%) hue-rotate(180deg)','#ddd',"#6B4C61"],
    ['#8d726d','#24130f','rgba(0,0,0,0.5)','rgba(0,0,0,0.7)','rgba(0,0,0,0.5)','#888','#3a2622','invert(85%) hue-rotate(180deg)','#ddd',"#64452b"]
]
let story_script={};
let line_controll=[];
let scen_data=[];
let copy_arr={};
let scen_element={};
const plugins_list = {
  tue_aspect_ratio: {
    name: "Aspect ratio",
    text: "fixed screen size while maintaining aspect ratio",
    code: 'function TueAspectRatio(){let e=story_json.parameters.resolutions,t=tuesday.parentNode,i=t.getBoundingClientRect();if(0==i.height||0==i.width){var s=e[0]/window.innerWidth>e[1]/window.innerHeight?window.innerWidth/e[0]:window.innerHeight/e[1];tuesday.style.left=(window.innerWidth-e[0]*s)/2+"px",tuesday.style.top=(window.innerHeight-e[1]*s)/2+"px"}else{var s=e[0]/i.width>e[1]/i.height?i.width/e[0]:i.height/e[1];tuesday.style.left=(i.width-e[0]*s)/2+"px",tuesday.style.top=(i.height-e[1]*s)/2+"px"}t.style.backgroundColor=e[2]&&e[2].length>0?e[2]:"#000",t.style.backgroundImage="url(\'"+e[3]+"\')",t.style.backgroundPosition="center",t.style.backgroundSize="cover",t.style.overflow="hidden",t.style.position="relative",tuesday.style.position="absolute",tuesday.style.transformOrigin="left top",tuesday.style.width=e[0]+"px",tuesday.style.height=e[1]+"px",tuesday.style.transform="scale("+s+")"}window.addEventListener("script_executed",TueAspectRatio,!0),window.addEventListener("script_loaded",TueAspectRatio,!0),window.addEventListener("resize",TueAspectRatio,!0);',
  },
  game_pad: {
    name: "GamePad",
    text: "Support for external game controllers",
    code: 'let gamepad,gamepadPress,gamepad_choice=-1,gamepad_choices,gamepad_cursor=0;function select_choice(e){if(0==gamepad_cursor){gamepad_choices=story_json[tue_story][scene].terrain_map?tuesday.getElementsByClassName("tue_map_item"):tuesday.getElementsByClassName("tue_choice"),(gamepad_cursor=document.createElement("div")).style.position="absolute",gamepad_cursor.style.pointerEvents="none",gamepad_cursor.id="gamepad_cursor";let a=story_json.parameters.gamepad.cursor;gamepad_cursor.innerHTML="<div "+(a[6].length>0?"class=\'"+a[6]+"\'":"")+" style=\'"+(a[5].length>0?a[5]+";":"")+(""!=a[0]?" background-size:100% 100%;background-repeat:no-repeat;background-position:center;background-image:url("+art_data(a[0])+");":"")+"pointer-events:none;position:absolute;top:"+a[1]+";left:"+a[2]+";"+(0!=a[3]?"width:"+a[3]+";":"")+(0!=a[3]?"height:"+a[3]+";":"")+"\'></div>",story_json[tue_story][scene].terrain_map?tue_map.appendChild(gamepad_cursor):tuesday.appendChild(gamepad_cursor)}if("hidden"!=gamepad_choices[gamepad_choice=gamepad_choice+e>=gamepad_choices.length?0:gamepad_choice+e<0?gamepad_choices.length-1:gamepad_choice+e].style.visibility&&(story_json[tue_story][scene].terrain_map||gamepad_choices[gamepad_choice].onclick.toString().includes("go_to")||gamepad_choices[gamepad_choice].onclick.toString().includes("go_story")||gamepad_choices[gamepad_choice].onclick.toString().includes("tue_load_autosave")||gamepad_choices[gamepad_choice].onclick.toString().includes("load_stag"))){if(gamepad_cursor.style.left=gamepad_choices[gamepad_choice].style.left,gamepad_cursor.style.top=gamepad_choices[gamepad_choice].style.top,gamepad_cursor.style.right=gamepad_choices[gamepad_choice].style.right,gamepad_cursor.style.bottom=gamepad_choices[gamepad_choice].style.bottom,gamepad_cursor.style.width=gamepad_choices[gamepad_choice].style.width,gamepad_cursor.style.height=gamepad_choices[gamepad_choice].style.height,gamepad_cursor.style.padding=gamepad_choices[gamepad_choice].style.padding,gamepad_cursor.style.zIndex=gamepad_choices[gamepad_choice].style.zIndex,gamepad_cursor.style.transform=gamepad_choices[gamepad_choice].style.transform,story_json[tue_story][scene].terrain_map){let c=gamepad_choices[gamepad_choice].getBoundingClientRect();tue_world.scrollTop=tue_world.scrollTop+(c.top-tuesday.clientHeight/2),tue_world.scrollLeft=tue_world.scrollLeft+(c.left-tuesday.clientWidth/2)}}else select_choice(e)}function gamepad_cursor_cler(){gamepad_cursor.remove(),gamepad_cursor=0,gamepad_choice=-1}tuesday.addEventListener("creation_dialog",function(e){0!=gamepad_cursor&&gamepad_cursor_cler()}),window.addEventListener("keydown",function(e){37==(e=e.keyCode)?story_json[tue_story][scene].terrain_map||0!=story_json[tue_story][scene].dialogs.length&&!check_choice(story_json[tue_story][scene].dialogs)?select_choice(1):story_json.parameters.key&&story_json.parameters.key.next||back_story():39==e?story_json[tue_story][scene].terrain_map||0!=story_json[tue_story][scene].dialogs.length&&!check_choice(story_json[tue_story][scene].dialogs)?select_choice(-1):story_json.parameters.key&&story_json.parameters.key.back||go_story():38==e?(story_json[tue_story][scene].terrain_map||!check_choice(story_json[tue_story][scene].dialogs))&&select_choice(1):40==e?(story_json[tue_story][scene].terrain_map||!check_choice(story_json[tue_story][scene].dialogs))&&select_choice(-1):13==e||32==e?0!=gamepad_cursor&&(gamepad_choices[gamepad_choice].click(),story_json[tue_story][scene].terrain_map&&gamepad_cursor_cler()):27!=e||story_json.parameters.key&&story_json.parameters.key.launch_story||go_to(story_json.parameters.launch_story)}),window.addEventListener("gamepadconnected",function(e){let a=()=>{for(gamepad of navigator.getGamepads()){if(!gamepad)continue;let e=gamepad.buttons.some(e=>e.pressed);gamepadPress!==e&&(gamepadPress=e,gamepad.buttons[14].pressed?story_json[tue_story][scene].terrain_map||!check_choice(story_json[tue_story][scene].dialogs)?select_choice(1):back_story():gamepad.buttons[15].pressed?story_json[tue_story][scene].terrain_map||!check_choice(story_json[tue_story][scene].dialogs)?select_choice(-1):go_story():gamepad.buttons[12].pressed?(story_json[tue_story][scene].terrain_map||!check_choice(story_json[tue_story][scene].dialogs))&&select_choice(1):gamepad.buttons[13].pressed?(story_json[tue_story][scene].terrain_map||!check_choice(story_json[tue_story][scene].dialogs))&&select_choice(-1):gamepad.buttons[1].pressed||gamepad.buttons[2].pressed||gamepad.buttons[3].pressed||gamepad.buttons[0].pressed?0!=gamepad_cursor&&(gamepad_choices[gamepad_choice].click(),story_json[tue_story][scene].terrain_map&&gamepad_cursor_cler()):(gamepad.buttons[8].pressed||gamepad.buttons[9].pressed)&&(go_to(story_json.parameters.launch_story),story_json[tue_story][scene].terrain_map&&gamepad_cursor_cler()))}requestAnimationFrame(a)};a()});',
  },
  hidden_objects: {
    name: "Hidden objects",
    text: "player must find items from a list that are hidden within a scene",
    code: 'var ho={startmove_x:null,startmove_y:null,scroll_x:null,scroll_y:null,scale:1};function hidden_objects(){clearTimeout(dialog_timeout),arr_dialog=story_json[tue_story][scene].hidden_objects,tue_text_view.innerHTML="",tuesday.style.backgroundImage="none",findobjects=story_json.parameters.hidden_objects.label.items>arr_dialog.objects.length?arr_dialog.objects.length:story_json.parameters.hidden_objects.label.items;var e=document.createElement("div");e.id="tue_hiddenobjects",e.style="height:100%;width:100%;overflow:auto;";var t=document.createElement("div"),s=Math.round(arr_dialog.objects.length/findobjects),l=0,o=0;findobjects<arr_dialog.objects.length&&s<2&&(s=2);var a=Math.round(Math.random()*(s-1));arr_dialog.scale&&(ho.scale=arr_dialog.scale),t.id="tue_objectsroom",t.className=arr_dialog.className,t.style=arr_dialog.style,t.style.width=arr_dialog.size[0]+"px",t.style.height=arr_dialog.size[1]+"px",t.style.backgroundRepeat="no-repeat",t.style.backgroundPosition="center",t.style.backgroundSize="cover",arr_dialog.color&&(e.style.backgroundColor=art_data(arr_dialog.color)),t.style.backgroundImage=\'url("\'+art_data(arr_dialog.art)+\'")\',t.style.position="relative",t.style.overflow="hidden";for(var r=story_json.parameters.hidden_objects.label_find.sound?story_json.parameters.hidden_objects.label_find.sound:"",n=0;n<arr_dialog.objects.length;n++){var i=document.createElement("div");i.className=arr_dialog.objects[n].className,i.style=arr_dialog.objects[n].style,i.style.width=arr_dialog.objects[n].size[0]+"px",i.style.height=arr_dialog.objects[n].size[1]+"px",i.style.backgroundRepeat="no-repeat",i.style.backgroundPosition="center",i.style.backgroundSize=arr_dialog.objects[n].fit,i.style.backgroundImage=\'url("\'+art_data(arr_dialog.objects[n].art)+\'")\',i.style.position="absolute",i.style.transformOrigin="top left",i.style.transform="rotate("+arr_dialog.objects[n].angle+"deg)",i.style.top=arr_dialog.objects[n].position[1]+"px",i.style.left=arr_dialog.objects[n].position[0]+"px";var c=document.createElement("div");story_json.parameters.hidden_objects.label.style&&(c.style=story_json.parameters.hidden_objects.label.style),story_json.parameters.hidden_objects.label.className&&(c.className=story_json.parameters.hidden_objects.label.className),n==a&&o<findobjects&&(l+=s,i.setAttribute("onclick",\'sound_play("\'+(arr_dialog.objects[n].sound?arr_dialog.objects[n].sound:r)+\'");\'+(story_json.parameters.hidden_objects.label_find.no_del_item?"this.setAttribute(\'onclick\',\'\')":"this.remove();")+(arr_dialog.objects[n].js?arr_dialog.objects[n].js:"")+\';find_item("item\'+n+\'");\'),c.style.width=story_json.parameters.hidden_objects.label.size[0],c.style.height=story_json.parameters.hidden_objects.label.size[1],c.style.float="left",c.id="item"+n,"text"!=story_json.parameters.hidden_objects.label.tip&&story_json.parameters.hidden_objects.label.tip||(c.style.display="flex",c.style.justifyContent=story_json.parameters.hidden_objects.label.align?story_json.parameters.hidden_objects.label.align[0]:"center",c.style.alignItems=story_json.parameters.hidden_objects.label.align?story_json.parameters.hidden_objects.label.align[1]:"center",c.innerHTML=art_data(arr_dialog.objects[n].name)),"art"!=story_json.parameters.hidden_objects.label.tip&&story_json.parameters.hidden_objects.label.tip||(c.style.backgroundRepeat="no-repeat",c.style.backgroundPosition=story_json.parameters.hidden_objects.label.art_align?story_json.parameters.hidden_objects.label.art_align:"center",story_json.parameters.hidden_objects.label.color_text&&(c.style.color=story_json.parameters.hidden_objects.label.color_text),story_json.parameters.hidden_objects.label.fit?c.style.backgroundSize=story_json.parameters.hidden_objects.label.fit:story_json.parameters.hidden_objects.label.art_size&&("object"==typeof story_json.parameters.hidden_objects.label.art_size?c.style.backgroundSize=story_json.parameters.hidden_objects.label.art_size[0]+" "+story_json.parameters.hidden_objects.label.art_size[1]:c.style.backgroundSize=story_json.parameters.hidden_objects.label.art_size),c.style.backgroundImage=\'url("\'+art_data(arr_dialog.objects[n].art)+\'")\'),s>1&&(a=l+Math.round(Math.random()*(s-1))),arr_dialog.objects.length-l<findobjects-o&&(a=l,s=1),story_json.parameters.hidden_objects.label.color&&(c.style.backgroundColor=story_json.parameters.hidden_objects.label.color),tue_text_view.appendChild(c),o++),t.appendChild(i)}tue_text_block.style.visibility="visible",story_json.parameters.text_panel.color&&(tue_text_block.style.backgroundColor=story_json.parameters.text_panel.color),document.getElementById("tue_next")&&(tue_next.style.visibility="hidden"),document.getElementById("tue_back")&&(tue_back.style.visibility="hidden"),e.appendChild(t),tuesday.appendChild(e),objectsroom_resize(),tue_objectsroom.style.transformOrigin="left top",0==tue_set_audio&&arr_dialog.background_music&&!tue_bg_music.src.includes(encodeURI(arr_dialog.background_music))?(tue_bg_music.canPlayType("audio/mpeg")?arr_dialog.background_music.includes("blob:")?tue_bg_music.src=arr_dialog.background_music:arr_dialog.background_music.includes(".mp3")?tue_bg_music.src=arr_dialog.background_music:tue_bg_music.src=arr_dialog.background_music+".mp3":tue_bg_music.src=arr_dialog.background_music+".ogg",tue_bg_music.loop=!0,tue_bg_music.play()):arr_dialog.background_music&&""!=arr_dialog.background_music?0==tue_set_audio&&tue_bg_music.play():tue_bg_music.pause(),e.onmousedown=function(t){ho.startmove_x=t.clientX,ho.startmove_y=t.clientY,ho.scroll_x=e.scrollTop,ho.scroll_y=e.scrollLeft,document.onmousemove=function(t){e.scrollTop=ho.scroll_x-(t.clientY-ho.startmove_y),e.scrollLeft=ho.scroll_y-(t.clientX-ho.startmove_x)},document.onmouseup=function(e){document.onmousemove=null,document.onmouseup=null},document.onmouseleave=function(){document.onmousemove=null,document.onmouseup=null}}}function objectsroom_resize(){if(!story_json.parameters.resolutions){var e=tuesday.getBoundingClientRect();arr_dialog.size[0]/arr_dialog.size[1]>e.width/e.height?tue_objectsroom.style.transform="scale("+e.height/arr_dialog.size[1]*ho.scale+")":tue_objectsroom.style.transform="scale("+e.width/arr_dialog.size[0]*ho.scale+")",tue_objectsroom.style.marginBottom="-"+(e.height+arr_dialog.size[1])+"px",tue_objectsroom.style.marginRight="-"+(e.width+arr_dialog.size[0])+"px",tue_objectsroom.style.marginTop="0px",tue_objectsroom.style.marginLeft="0px"}}function find_item(id){findobjects--,story_json.parameters.hidden_objects.label_find.no_del_label?(id=document.getElementById(id),story_json.parameters.hidden_objects.label_find.className&&(id.className=story_json.parameters.hidden_objects.label_find.className),story_json.parameters.hidden_objects.label_find.style&&(id.className=story_json.parameters.hidden_objects.label_find.style),story_json.parameters.hidden_objects.label_find.color&&(id.style.backgroundColor=story_json.parameters.hidden_objects.label_find.color),story_json.parameters.hidden_objects.label_find.color_text&&(id.style.color=story_json.parameters.hidden_objects.label_find.color_text)):document.getElementById(id).remove(),findobjects<=0&&(arr_dialog.js&&eval(arr_dialog.js),tue_hiddenobjects.remove(),"tue_go"==arr_dialog.go_to?(scene++,dialog=0,creation_scene()):go_to(arr_dialog.go_to))}tuesday.addEventListener("hidden_objects",function(e){hidden_objects()}),window.addEventListener("resize",objectsroom_resize,!0);',
  },
  screen_control: {
    name: "Screen control",
    text: "switches dialogue by click to screen.",
    code: 'let tue_screen_control=!0;tuesday.addEventListener("mouseup",function(e){tue_screen_control&&e.pageX>tuesday.offsetWidth/3?(0==story_json[tue_story][scene].dialogs||check_choice(story_json[tue_story][scene].dialogs))&&go_story():(0==story_json[tue_story][scene].dialogs||check_choice(story_json[tue_story][scene].dialogs)&&tue_screen_control)&&back_story(),tue_screen_control=!0}),tuesday.addEventListener("script_loaded",function(e){document.getElementById("tue_back")&&(tue_back.style.pointerEvents="none"),document.getElementById("tue_next")&&(tue_next.style.pointerEvents="none");for(var t=document.getElementById("tuesday").getElementsByClassName("tue_controll"),n=0;n<t.length;n++)t[n].setAttribute("onmouseup","tue_screen_control=false;")});',
  },
  speech: {
    name: "Speech",
    text: "Speech synthesis TTS<br>reading text with a synthesized voice",
    code: 'const synth=window.speechSynthesis;function play_synth(e,t,s){if(e=e?e="object"==typeof e?e[languare]:e:arr_dialog.text_add?arr_dialog.text_add:dialog_text,"hidden"!=tue_text_block.style.visibility&&(story_json.parameters.text_panel.speech||arr_dialog.speech)){let n=new SpeechSynthesisUtterance(e||dialog_text);synth.speaking&&synth.cancel();let a=t&&t.length>0?[t,s||1]:arr_dialog.speech&&arr_dialog.speech[languare][0].length>0?arr_dialog.speech[languare]:story_json.parameters.text_panel.speech[languare],p=speechSynthesis.getVoices(),h=a[0].split(",").map(e=>e.trim()),c=!1;for(v=0;v<p.length&&(p.filter(e=>{e.name==h[v]&&(c=e)}),!c);v++);n.voice=c,n.rate=a[1],synth.speak(n)}}tuesday.addEventListener("creation_dialog",()=>{story_json.parameters.text_panel.speech_play&&tue_set_audio<2?play_synth():synth.cancel()});',
  },
  show_toast: {
    name: "Show toast",
    text: "small message appears for a while",
    code: 'let tue_toast;function creation_tost(){var t=document.createElement("style");t.type="text/css",t.innerHTML="#toast{position: fixed;opacity: 0;top: -96px;z-index: 1000;}.toast_anim{left: 50%;transform: translateX(-50%);animation: viwe 0.25s, stop 2s 0.25s, close 0.5s 2s linear;}@keyframes viwe {from {opacity: 0;top: 3em}to {opacity: 1;top: 3em}}@keyframes stop {from {opacity: 1;top: 3em}to {opacity: 1;top: 3em}}@keyframes close {from {opacity: 1;top: 3em}to {opacity: 0;top: -96px}}",document.getElementsByTagName("head")[0].appendChild(t),(tue_toast=document.createElement("div")).id="toast",tue_toast.innerHTML="<table border=\'0\' height=\'100%\' width=\'100%\'><tbody><tr><td id=\'toast_message\' align=\'center\' valign=\'center\' ></td></tr></tbody></table>",document.body.appendChild(tue_toast)}function toast(t){tue_toast.classList.remove("toast_anim"),document.getElementById("toast_message").innerHTML=t,tue_toast.offsetParent,tue_toast.classList.add("toast_anim")}creation_tost(),tuesday.addEventListener("creation_dialog",function(t){story_json[tue_story][scene].dialogs[dialog].toast&&(story_json[tue_story][scene].dialogs[dialog].toast[languare]?toast(story_json[tue_story][scene].dialogs[dialog].toast[languare]):toast(story_json[tue_story][scene].dialogs[dialog].toast))});',
  },
  terrain_map: {
    name: "Terrain map",
    text: "location with markers for transition to other plot blocks.",
    code: 'var wmap={startmove_x:null,startmove_y:null,scroll_x:null,scroll_y:null,scale:1};function terrain_map(){clearTimeout(dialog_timeout),arr_dialog=story_json[tue_story][scene].terrain_map,tue_text_view.innerHTML="",tuesday.style.backgroundImage="none";var e=document.createElement("div");e.id="tue_world",e.style="height:100%;width:100%;overflow:auto;",e.className="tue_html_scene";var t=document.createElement("div");arr_dialog.scale&&(wmap.scale=arr_dialog.scale),t.id="tue_map",t.className=arr_dialog.className,t.style=arr_dialog.style,t.style.width=arr_dialog.size[0]+"px",t.style.height=arr_dialog.size[1]+"px",t.style.backgroundRepeat=arr_dialog.repeat?arr_dialog.repeat:"no-repeat",arr_dialog.art_align&&(t.style.backgroundPosition=arr_dialog.art_align),arr_dialog.fit&&(t.style.backgroundSize="object"==typeof arr_dialog.fit?arr_dialog.fit[0]+" "+arr_dialog.fit[1]:arr_dialog.fit),arr_dialog.color&&(e.style.backgroundColor=art_data(arr_dialog.color)),arr_dialog.art&&art_data(arr_dialog.art).length>0&&(t.style.backgroundImage=\'url("\'+art_data(arr_dialog.art)+\'")\'),t.style.position="relative",t.style.overflow="hidden",t.style.transformOrigin="left top";for(var o=0;o<arr_dialog.objects.length;o++){var s=document.createElement("div");s.className=arr_dialog.objects[o].className+" tue_map_item",s.style=arr_dialog.objects[o].style,s.style.width=arr_dialog.objects[o].size[0]+"px",s.style.height=arr_dialog.objects[o].size[1]+"px","patch"!=arr_dialog.objects[o].fit?(s.style.backgroundRepeat="no-repeat",s.style.backgroundPosition="center",s.style.backgroundSize="object"==typeof arr_dialog.objects[o].fit?arr_dialog.objects[o].fit[0]+" "+arr_dialog.objects[o].fit[1]:arr_dialog.objects[o].fit,s.style.backgroundImage=\'url("\'+art_data(arr_dialog.objects[o].art)+\'")\',s.style.backgroundPosition=arr_dialog.objects[o].art_align?arr_dialog.objects[o].art_align[0]+" "+arr_dialog.objects[o].art_align[1]:"center"):"patch"==arr_dialog.objects[o].fit?(s.style.backgroundImage="none",s.style.backgroundSize="none",s.style.backgroundClip="padding-box",s.style.borderStyle="solid",s.style.borderWidth=arr_dialog.objects[o].patch[0]+"px "+arr_dialog.objects[o].patch[1]+"px "+arr_dialog.objects[o].patch[2]+"px "+arr_dialog.objects[o].patch[3]+"px",s.style.borderImage="url(\'"+art_data(arr_dialog.objects[o].art)+"\') "+arr_dialog.objects[o].patch[0]+" "+arr_dialog.objects[o].patch[1]+" "+arr_dialog.objects[o].patch[2]+" "+arr_dialog.objects[o].patch[3]+" stretch stretch"):tue_id.style.backgroundSize=arr_dialog.objects[o].art_size,s.style.position="absolute",s.style.transformOrigin="top left",s.style.transform="rotate("+arr_dialog.objects[o].angle+"deg)",s.style.top=arr_dialog.objects[o].position[1]+"px",s.style.left=arr_dialog.objects[o].position[0]+"px",s.style.display="flex",arr_dialog.objects[o].color&&(s.style.backgroundColor=arr_dialog.objects[o].color),arr_dialog.objects[o].name&&(s.innerHTML=art_data(arr_dialog.objects[o].name),arr_dialog.objects[o].indent_text&&(s.style.padding=arr_dialog.objects[o].indent_text),arr_dialog.objects[o].color_text&&(s.style.color=arr_dialog.objects[o].color_text),arr_dialog.objects[o].size_text&&(s.style.fontSize=arr_dialog.objects[o].size_text),arr_dialog.objects[o].font_family&&(s.style.fontFamily=arr_dialog.objects[o].font_family),s.style.whiteSpace="pre-wrap",arr_dialog.objects[o].align?(s.style.justifyContent=arr_dialog.objects[o].align?arr_dialog.objects[o].align[0]:"center",s.style.alignItems=arr_dialog.objects[o].align?arr_dialog.objects[o].align[1]:"center"):(s.style.justifyContent="center",s.style.alignItems="center")),story_json.parameters.cursors&&story_json.parameters.cursors.choice&&(s.style.cursor="url("+art_data(story_json.parameters.cursors.choice[0])+") "+story_json.parameters.cursors.choice[1]+" "+story_json.parameters.cursors.choice[2]+",auto"),arr_dialog.objects[o].show_if&&show_if(arr_dialog.objects[o].show_if,s);var l="";arr_dialog.objects[o].sound?l+="sound_play(\'"+arr_dialog.objects[o].sound+"\');":arr_dialog.sound&&(l+="sound_play(\'"+arr_dialog.sound+"\');"),arr_dialog.objects[o].js&&(l+=arr_dialog.objects[o].js+";"),arr_dialog.objects[o].go_to&&(arr_dialog.objects[o].text_from?l+="tue_story=\'"+arr_dialog.objects[o].go_to+"\';scene=0;dialog=0;creation_dialog();":arr_dialog.objects[o].url?l+="window.open(\'"+(arr_dialog.objects[o].go_to[languare]?arr_dialog.objects[o].go_to[languare]:arr_dialog.objects[o].go_to)+"\',\'_"+arr_dialog.objects[o].url+"\');":l+="tue_world.remove();"+("tue_go"==arr_dialog.objects[o].go_to?"scene++;dialog=0;creation_scene();":"go_to(\'"+arr_dialog.objects[o].go_to+"\');")),s.setAttribute("onclick",l),t.appendChild(s)}e.onmousedown=function(t){wmap.startmove_x=t.clientX,wmap.startmove_y=t.clientY,wmap.scroll_x=e.scrollTop,wmap.scroll_y=e.scrollLeft,document.onmousemove=function(t){e.scrollTop=wmap.scroll_x-(t.clientY-wmap.startmove_y),e.scrollLeft=wmap.scroll_y-(t.clientX-wmap.startmove_x)},document.onmouseup=function(t){document.onmousemove=null,document.onmouseup=null,arr_dialog.scroll&&(arr_dialog.scroll[1]=e.scrollTop,arr_dialog.scroll[0]=e.scrollLeft)},document.onmouseleave=function(){document.onmousemove=null,document.onmouseup=null,arr_dialog.scroll[1]=e.scrollTop,arr_dialog.scroll[0]=e.scrollLeft}},0==tue_set_audio&&arr_dialog.background_music&&!tue_bg_music.src.includes(encodeURI(arr_dialog.background_music))?(tue_bg_music.canPlayType("audio/mpeg")?arr_dialog.background_music.includes("blob:")?tue_bg_music.src=arr_dialog.background_music:arr_dialog.background_music.includes(".mp3")?tue_bg_music.src=arr_dialog.background_music:tue_bg_music.src=arr_dialog.background_music+".mp3":tue_bg_music.src=arr_dialog.background_music+".ogg",tue_bg_music.loop=!0,tue_bg_music.play()):arr_dialog.background_music&&""!=arr_dialog.background_music?0==tue_set_audio&&tue_bg_music.play():tue_bg_music.pause(),document.getElementById("tue_next")&&(tue_next.style.visibility="hidden"),document.getElementById("tue_back")&&(tue_back.style.visibility="hidden"),e.appendChild(t),tuesday.appendChild(e),worldmap_resize(),arr_dialog.scroll&&(e.scrollTop=arr_dialog.scroll[1],e.scrollLeft=arr_dialog.scroll[0])}function worldmap_resize(){if(!story_json.parameters.resolutions){var e=tuesday.getBoundingClientRect();arr_dialog.size[0]/arr_dialog.size[1]>e.width/e.height?tue_map.style.transform="scale("+e.height/arr_dialog.size[1]*wmap.scale+")":tue_map.style.transform="scale("+e.width/arr_dialog.size[0]*wmap.scale+")",tue_map.style.marginBottom="-"+(e.height+arr_dialog.size[1])+"px",tue_map.style.marginRight="-"+(e.width+arr_dialog.size[0])+"px",tue_map.style.marginTop="0px",tue_map.style.marginLeft="0px"}}tuesday.addEventListener("terrain_map",function(e){terrain_map()}),window.addEventListener("resize",worldmap_resize,!0);',
  },
  touch_swipe: {
    name: "Touch swipe",
    text: "switches dialogue by swiping your finger across the touchscreen",
    code: 'var endTime,starttouch=null;window.addEventListener("touchstart",function(t){startTime=new Date,starttouch=1===t.touches.length?t.touches.item(0).clientX:null}),window.addEventListener("touchend",function(t){var e=new Date-startTime;if(starttouch&&e<500&&controll){var n=t.changedTouches.item(0).clientX;n>starttouch+40&&back_story(),n<starttouch-40&&check_choice(story_json[tue_story][scene].dialogs)&&go_story()}});',
  },
};

const languares={"English":"en","Japanese":"ja","French":"fr","Russian":"ru","Spanish":"es","Chinese":"zh","Korean":"ko","German":"de","Dutch":"nl","Portuguese":"pt","Afar":"aa","Abkhazian":"ab","Afrikaans":"af","Akan":"ak","Albanian":"sq","Amharic":"am","Arabic":"ar","Aragonese":"an","Armenian":"hy","Assamese":"as","Avaric":"av","Avestan":"ae","Aymara":"ay","Azerbaijani":"az","Bambara":"bm","Bashkir":"ba","Basque":"eu","Belarusian":"be","Bengali (Bangla)":"bn","Bihari":"bh","Bislama":"bi","Bosnian":"bs","Breton":"br","Bulgarian":"bg","Burmese":"my","Catalan":"ca","Chamorro":"ch","Chechen":"ce","Chichewa,Chewa,Nyanja":"ny","Chinese (Simplified)":"zh-Hans","Chinese (Traditional)":"zh-Hant","Chuvash":"cv","Cornish":"kw","Corsican":"co","Cree":"cr","Croatian":"hr","Czech":"cs","Danish":"da","Divehi,Dhivehi,Maldivian":"dv","Dzongkha":"dz","Esperanto":"eo","Estonian":"et","Ewe":"ee","Faroese":"fo","Fijian":"fj","Finnish":"fi","Fula,Fulah,Pulaar,Pular":"ff","Galician":"gl","Gaelic (Scottish)":"gd","Gaelic (Manx)":"gv","Georgian":"ka","Greek":"el","Greenlandic":"kl","Guarani":"gn","Gujarati":"gu","Haitian Creole":"ht","Hausa":"ha","Hebrew":"he","Herero":"hz","Hindi":"hi","Hiri Motu":"ho","Hungarian":"hu","Icelandic":"is","Ido":"io","Igbo":"ig","Indonesian":"id","Interlingua":"ia","Interlingue":"ie","Inuktitut":"iu","Inupiak":"ik","Irish":"ga","Italian":"it","Javanese":"jv","Kalaallisut,Greenlandic":"kl","Kannada":"kn","Kanuri":"kr","Kashmiri":"ks","Kazakh":"kk","Khmer":"km","Kikuyu":"ki","Kinyarwanda (Rwanda)":"rw","Kirundi":"rn","Kyrgyz":"ky","Komi":"kv","Kongo":"kg","Kurdish":"ku","Kwanyama":"kj","Lao":"lo","Latin":"la","Latvian (Lettish)":"lv","Limburgish ( Limburger)":"li","Lingala":"ln","Lithuanian":"lt","Luga-Katanga":"lu","Luganda,Ganda":"lg","Luxembourgish":"lb","Manx":"gv","Macedonian":"mk","Malagasy":"mg","Malay":"ms","Malayalam":"ml","Maltese":"mt","Maori":"mi","Marathi":"mr","Marshallese":"mh","Moldavian":"mo","Mongolian":"mn","Nauru":"na","Navajo":"nv","Ndonga":"ng","Northern Ndebele":"nd","Nepali":"ne","Norwegian":"no","Norwegian bokmål":"nb","Norwegian nynorsk":"nn","Nuosu":"ii","Occitan":"oc","Ojibwe":"oj","Old Church Slavonic,Old Bulgarian":"cu","Oriya":"or","Oromo (Afaan Oromo)":"om","Ossetian":"os","Pāli":"pi","Pashto,Pushto":"ps","Persian (Farsi)":"fa","Polish":"pl","Punjabi (Eastern)":"pa","Quechua":"qu","Romansh":"rm","Romanian":"ro","Sami":"se","Samoan":"sm","Sango":"sg","Sanskrit":"sa","Serbian":"sr","Serbo-Croatian":"sh","Sesotho":"st","Setswana":"tn","Shona":"sn","Sichuan Yi":"ii","Sindhi":"sd","Sinhalese":"si","Siswati":"ss","Slovak":"sk","Slovenian":"sl","Somali":"so","Southern Ndebele":"nr","Sundanese":"su","Swahili (Kiswahili)":"sw","Swati":"ss","Swedish":"sv","Tagalog":"tl","Tahitian":"ty","Tajik":"tg","Tamil":"ta","Tatar":"tt","Telugu":"te","Thai":"th","Tibetan":"bo","Tigrinya":"ti","Tonga":"to","Tsonga":"ts","Turkish":"tr","Turkmen":"tk","Twi":"tw","Uyghur":"ug","Urdu":"ur","Uzbek":"uz","Venda":"ve","Vietnamese":"vi","Volapük":"vo","Wallon":"wa","Welsh":"cy","Wolof":"wo","Western Frisian":"fy","Xhosa":"xh","Yiddish":"yi","Yoruba":"yo","Zhuang,Chuang":"za","Zulu":"zu"}
const color_bg=['#ffd4d4','#ebd4d4','#ffedd2','#edffca','#cfffd8','#deffff',false,'#d3f2ff','#d8e7ff','#d3d1ff','#f0e0ff','#fbddff','#e9e9e9']
const color_dg=['#774C4C','#634C4C','#77654A','#657742','#477750','#567777',false,'#4B6A77','#505F77','#4B4977','#685877','#735577','#616161']
const texts = {
  tutorials: [
    { en: "Move to the next block based on the values ​​in variables. Variables are created in the 'Settings project' in the 'Variables' section.", },
    { en: "Text and character name settings that will be displayed in the text area. To use data from variable, use < var_name >. To add furigana or annotations use < 簡単 = かんたん >. If you write only skip then the phrase in the localization will be skipped.", },
    { en: "Customize the look of the scene, its background image and music, for subsequent dialogues and actions.", },
    { en: "Select a working folder with resources for the project.", },
    { en: 'Changes in the values ​​of variables, their values ​​can be displayed in the text as < var_name > or in "Legacy Choice" to go to another block of script.', },
    { en: "Choose the input device that suits you. You can change the device in the settings in the 'editor' section.", },
    { en: "Mouse<br>control with the zoom wheel", },
    { en: "TouchPad<br>recommended for laptops and MacBooks", },
    { en: "Html file<br><br>Only index.html file will be created, after its creation it is necessary to transfer it to the working folder of the project.", },
    { en: "Zip file<br><br>All files from the working folder and index.html will be packed into a zip archive.", },
    { en: "Base64<br><br>Not recommended! All files will be combined into one html file in base64 format. Use only with a small number of files.", },
    { en: "CSV Comma-Separated Values.", },
    { en: "TSV tab separated values.", },
    { en: "the limit of the cursor size is 128×128px. Larger cursor images are ignored. However, you should limit yourself to the size 32×32 for maximum compatibility with operating systems and platforms.", },
    { en: "The variables are in story_json.parameters.variables[var_name] array", },
    { en: "More settings for appearance and position of the choice on layout are located in the scene editor", },
    { en: "You can set transition to a specific scene and dialogue in blok (the function may cause errors)", },
    { en: "Telegram bot<br><br>Project export to chat bot for telegram messenger<br>Warning! some features may not be supported by bot", },
    { en: "You can change the token for bot in the project settings. step-by-step instructions for starting bot can be found in <a href='https://kirilllive.github.io/tuesday-js/doc_editor.html#bot_telegram' target='_blank'>documentation</a>", },
    { en: "Warning! Voices may vary across OS and browsers.", },
  ],
};

let setup_editor = {
  wheel: true,
  fon: "",
  ui: 0,
  lines: false,
  preview: [76, 0, 0, 1],
  ferst: true,
  pvw: [640, 480],
  lines_anim: true,
};

let buf=['',''],back_up=[];

if (localStorage.getItem("editor_setup")) {
  setup_editor = JSON.parse(localStorage.getItem("editor_setup"));
}
if (setup_editor.ferst) {
  var sel =
    "<div class='window' style='padding:24px 8px;'><p>Devices control</p><br><hr style='margin:0;'><p class='text_tutorials_a select_tutorials'>" +
    texts.tutorials[5].en +
    "</p>" +
    "<table style=' border-spacing:10px;border-collapse:separate;'><tbody><tr>" +
    "<td><div style='width:256px;height:256px;border-radius:8px;' class='button_menu img_mouse' onclick='setup_editor.ferst=false;setup_editor.wheel=true;modal_window(\"close\");editor_setup();localStorage.setItem(\"editor_setup\",JSON.stringify(setup_editor));'></div><br><p style='font-size:12px;text-align:center;width:256px;' class='select_tutorials'>" +
    texts.tutorials[6].en +
    "</p></td>" +
    "<td><div style='width:256px;height:256px;border-radius:8px;' class='button_menu img_touch' onclick='setup_editor.ferst=false;setup_editor.wheel=false;modal_window(\"close\");editor_setup();localStorage.setItem(\"editor_setup\",JSON.stringify(setup_editor));'></div><br><p style='font-size:12px;text-align:center;width:256px;' class='select_tutorials'>" +
    texts.tutorials[7].en +
    "</p></td>" +
    "</tr></tbody></table></div>";
  modal_window("open", sel);
} else {
  editor_setup();
}


function editor_setup() {
  world.className = setup_editor.fon;
  screen_preview.className = setup_editor.fon;
  //preview_size(true);
  if (setup_editor.wheel) {
    html.style.overflow = "hidden";
  }
  if (setup_editor.ui && setup_editor.ui != 0) {
    set_ui(setup_editor.ui);
  }
  if (!setup_editor.pvw) {
    setup_editor.pvw = [640, 480];
  } else {
    html.style.overflow = "auto";
  }
  if (setup_editor.lines_anim) {
    document.querySelector(":root").style.setProperty("--ls", "20");
  } else {
    document.querySelector(":root").style.setProperty("--ls", "0");
  }
  document
    .getElementById("screen_size")
    .getElementsByTagName("option")[1].value =
    setup_editor.pvw[0] >= setup_editor.pvw[1]
      ? setup_editor.pvw[0]
      : setup_editor.pvw[1];
}

document.addEventListener("wheel",function(e){if(setup_editor.wheel&&(!scroll_block||(scene_screen&&scene_view.tabindex==1))){if(e.deltaY>0) world_scale(false);else world_scale(2);}});
let project_files=[];
var load_files
img_file.addEventListener('change',loadFiles);
var load_new=false;
var wf;
var tool_update=false;

function set_ui(t){
  var r=document.querySelector(':root');
  r.style.setProperty('--cb', color_ui[t][0]);
  r.style.setProperty('--cw', color_ui[t][1]);
  r.style.setProperty('--cs', color_ui[t][2]);
  r.style.setProperty('--cf', color_ui[t][3]);
  r.style.setProperty('--cm', color_ui[t][4]);
  r.style.setProperty('--cl', color_ui[t][5]);
  r.style.setProperty('--wn', color_ui[t][6]);
  r.style.setProperty('--ft', color_ui[t][7]);
  r.style.setProperty('--tx', color_ui[t][8]);
  if(story_script.blocks){block_colors();}
}
function block_colors(){
  for(var i=0;i<Object.keys(story_script.blocks).length;i++){
      for(var c=0;c<color_bg.length;c++){
          if(setup_editor.ui<7&&story_script.blocks[Object.keys(story_script.blocks)[i]][3]==color_dg[c]){
              story_script.blocks[Object.keys(story_script.blocks)[i]][3]=color_bg[c];break;
          } else if(setup_editor.ui>=7&&story_script.blocks[Object.keys(story_script.blocks)[i]][3]==color_bg[c]){
              story_script.blocks[Object.keys(story_script.blocks)[i]][3]=color_dg[c];break;
          }
      }
  }
}

function clear_Files(){
    for(var i=0;i<project_files.length;i++){URL.revokeObjectURL(project_files[i][1])}
    project_files=[];
}

function loadFiles(e) {
  load_files = e.target.files;
  wf = e.target.files[0].webkitRelativePath.split("/")[0] + "/";
  if (load_new) {
    clear_Files();
    countBytes = 0;
    for (var i = 0; i < e.target.files.length; i++) {
      countBytes += e.target.files[i].size;
      project_files.push([
        e.target.files[i].webkitRelativePath
          .replace(wf, "")
          .replace(".mp3", "")
          .replace(".MP3", ""),
        URL.createObjectURL(e.target.files[i]),
        e.target.files[i].type,
      ]);
    }
    if (document.getElementById("project_foler")) {
      project_foler.value = wf;
    }
  } else {
    var jsons = [];
    clear_Files();
    countBytes = 0;
    for (var i = 0; i < e.target.files.length; i++) {
      countBytes += e.target.files[i].size;
      project_files.push([
        e.target.files[i].webkitRelativePath
          .replace(wf, "")
          .replace(".mp3", "")
          .replace(".MP3", ""),
        URL.createObjectURL(e.target.files[i]),
        e.target.files[i].type,
      ]);
      if (
        e.target.files[i].type == "application/json" &&
        e.target.files[i].webkitRelativePath.split("/").length == 2
      ) {
        jsons.push([i, e.target.files[i].name]);
      }
    }
    if (jsons.length == 1) {
      load_story_edit(URL.createObjectURL(e.target.files[jsons[0][0]]));
    } else if (jsons.length > 1) {
      var html =
        "<div class='window'><div class='win_head'>Select JSON project file<div class='window_close icon icon_close' onclick='modal_window(\"close\")'></div></div><hr><div style='margin:0 8px 0 8px;max-height:75vh;overflow-x:hidden;'>";
      for (var f = 0; f < jsons.length; f++) {
        html +=
          "<table class='button' style='width:412px;margin:8px 0px;' onclick='load_story_edit(open_file(\"" +
          jsons[f][1] +
          "\"));modal_window(\"close\");'><tbody><tr><td width='48px' height='48px' class='icon icon_new'> </td><td align='left'><div style='width:364px;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;'>" +
          jsons[f][1] +
          "</div></td></tr></tbody></table>";
      }
      html += "</div></div>";
      modal_window("open", html);
    } else if (jsons.length == 0) {
      alert("JSON file not found");
    }
  }
}

window.addEventListener('load',function(){
    var dropEvent=function(e){e.stopPropagation();e.preventDefault();return false;};
    var dragEnter=function(e){e.stopPropagation();e.preventDefault();};
    var dragOver=function(e){e.stopPropagation();e.preventDefault();};
    var dragLeave=function(e){e.stopPropagation();e.preventDefault();};
    window.addEventListener('dragenter',dragEnter,false);
    window.addEventListener('dragover',dragOver,false);
    window.addEventListener('dragleave',dragLeave,false);
    window.addEventListener('drop',dropEvent,false);
});
function open_file(name){
  for (var f = 0; f < project_files.length; f++) {
    if (project_files[f][0] == name) {
      name = project_files[f][1];
      break;
    }
  }
  return name;  
}
function new_novel() {
  story_script = {
    parameters: {
      text_panel: {
        size: ["95%", "25%"],
        position: [],
        color: "rgba(242,242,242,0.7)",
        style: "border-radius:8px;backdrop-filter: blur(12px);",
        color_text: "#000",
        indent_text: "8px",
        indent_bottom: "32px",
        dialog_speed: "10",
      },
      name_panel: {
        size: ["", "32px"],
        position: ["0", "0", "-36px", "0"],
        style: "border-radius:8px;",
        indent_text: "0 8px",
        color_text: "#fff",
        align: ["start", "center"],
        color: "#000",
      },
      title: { en: "new novel" },
      launch_story: "",
      key: {
        next: "",
        back: "",
        save: "",
        load: "",
        full_screen: "",
        launch_story: "",
        load_autosave: "",
      },
      languares: ["en"],
      buttons: [
        {
          name: "tue_back",
          position: ["2.5%", 0, 0, "32px"],
          size: ["25%", "25%"],
          color_text: "#000",
          size_text: "28px",
          text: "<",
          hotspot: ["0%", "0%"],
          align: ["start", "end"],
          indent_text: "8px 14px",
        },
        {
          name: "tue_next",
          position: [0, "2.5%", 0, "32px"],
          size: ["25%", "25%"],
          color_text: "#000",
          size_text: "28px",
          text: ">",
          hotspot: ["0%", "0%"],
          align: ["end", "end"],
          indent_text: "8px 14px",
        },
      ],
      autosave: false,
      font: "Arial",
      font_size: "18px",
    },
    blocks: {},
  };
  update_novel();
  state_num = 0;
  back_up = [];
  state_save();
}

function update_novel() {
  if (scene_screen) {
    if (!tool_update) {
      scen_edit_update(true);
    } else {
      eval(tool_update);
    }
  } else {
    menu_add.style.visibility = "hidden";
    story_blocks.innerHTML = "";
    line_controll = [];
    search_block.value = "";
    while (story_lines.hasChildNodes()) {
      story_lines.removeChild(story_lines.firstChild);
    }
    parse_story();
    lines();
    if (block_active && story_script[block_active]) {
      story_blocks.appendChild(document.getElementById(block_active));
    }
  }
}

function load_story_edit(url){
    var xmlhttp=new XMLHttpRequest();
    if(scene_screen){scen_edit_update(false);open_tool()};
    xmlhttp.onreadystatechange=function(){
        if(this.readyState==4&&this.status==200){
            open_tool();new_novel();
            story_script=JSON.parse(this.responseText);
            if(!story_script.parameters){alert("Error in JSON file")}
			else{
                toast("JSON file loading completed");
                languare=story_script.parameters.languares[0]
                if(story_script.blocks){block_colors();}
                parse_story()
                lines()
                document.dispatchEvent(new Event('tue_story_open'));
                state_num=0;back_up=[];state_save();
            }
        }
    };
    xmlhttp.open("GET",url,true);
    xmlhttp.send();
    xmlhttp.onerror=function(){if(this.status==0){alert('JSON file not loaded');}}
}
var all_blocks=0;
function parse_story(){
    let story_blocks=document.getElementById("story_blocks");
    story_blocks.innerHTML="";list_blocks.innerHTML="";
    story_lines=document.getElementById("story_lines");
	story_blocks.setAttribute("align","center");
    while(story_lines.hasChildNodes()){story_lines.removeChild(story_lines.firstChild);}
    all_blocks=0;countWords=0;countSymbols=0
	if(!story_script.blocks){story_script.blocks={}}
    if(!story_script.parameters.key){story_script.parameters.key={}}
    if(!story_script.parameters.title){story_script.parameters.title=""}
    if(!story_script.parameters.variables){story_script.parameters.variables={}}
    if(!story_script.parameters.characters){story_script.parameters.characters={}}
    while(Object.keys(story_script)[all_blocks]){creation_block(all_blocks);all_blocks++;}
	if(story_script.parameters.languares){lang_select()}
    control_dlock();
    world_size();
}
function lang_select(){
	var lang_list=document.getElementById('language_view');
	lang_list.innerHTML=project_languares(languare);
}
language_view.onchange=function(e){
	languare=language_view.value;
    if(arr_n=="hidden_objects"||arr_n=="terrain_map"){ho_update();}
    else if(scene_screen){scen_editor(scen_data[0],scen_data[1],scen_data[2]);}
    else{update_novel()}
};
function creation_block(b){
    var chapter=document.createElement("div"),element="",all=0,go="";
    chapter.id=Object.keys(story_script)[b];
    if(chapter.id!="parameters"&&chapter.id!="blocks"){
        for(var i=0;i<story_script[chapter.id].length;i++){
            element+="<div id='s_"+chapter.id+"_"+i+"' class='scene' align='center'>"
            if(story_script[chapter.id][i].random_choice){
				element+="<table height='22px' width='100%' style='margin:4px;'><tbody><tr><td width='24px' class='icon_m icon_up' title='Scene up' onmouseup='move_elenetn(story_script."+chapter.id+","+i+",-1)'></td><td width='24px' class='icon_m icon_down' title='Scene down' onmouseup='move_elenetn(story_script."+chapter.id+","+i+",1)'></td><td><p class='namber'>Random choice:"+(i+1)+"</p></td><td width='48px' class='icon_m icon_show' id='"+chapter.id+"_"+i+"_edit' onmouseup='arr_l=story_script."+chapter.id+";arr_n="+i+";element_m(this.id,\"random choice\");' title='Scene edit'></td></tr></tbody></table><div width='100%'>"
                for(var l=0;l<story_script[chapter.id][i].random_choice.length;l++){
                    go=story_script[chapter.id][i].random_choice[l][1];
                    if(story_script[go]){
                        element+="<table id='"+all+"r"+l+go+all_blocks+"' class='choice_b to_go' width='100%'><tbody><td align='right'><select style='width:90%;background-color:var(--cw);' onchange='story_script."+chapter.id+"["+i+"].random_choice["+l+"][1]=this.value;update_novel();'>"+option_block(go,0)+"</select></td><td class='icon button_block icon_go' style='cursor:pointer;"+((story_script.blocks[go][3])?"background-color:"+story_script.blocks[go][3]+";border-radius:6px;filter:none;":"")+"' onmouseup=\"go_to_block('"+go+"')\"> </td></tr></tbody></table>"
                        if(go!=chapter.id){creaton_line(all+"r"+l+go+all_blocks,go,chapter.id)}
                        all++
                    }else{element+="<table id='"+all+"r"+l+go+all_blocks+"' class='choice_b' width='100%'><tbody><tr><td align='right'><select style='width:90%;background-color:var(--cw);' onchange='story_script."+chapter.id+"["+i+"].random_choice["+l+"][1]=this.value;update_novel();'>"+option_block(go,0)+"</select></td><td class='icon button_block icon_go' style='cursor:pointer;' onmouseup=\"go_to_block('"+go+"')\"> </td></tr></tbody></table>"}
                }
                element+="</div>"
            }else if(story_script[chapter.id][i].legacy_choice){
				element+="<table height='22px' width='100%' style='margin:4px;'><tbody><tr><td width='24px' class='icon_m icon_up' title='Scene up' onmouseup='move_elenetn(story_script."+chapter.id+","+i+",-1)'></td><td width='24px' class='icon_m icon_down' title='Scene down' onmouseup='move_elenetn(story_script."+chapter.id+","+i+",1)'></td><td><p class='namber'>Legacy choice:"+(i+1)+"</p></td><td width='48px' class='icon_m icon_show' id='"+chapter.id+"_"+i+"_edit' onmouseup='arr_l=story_script."+chapter.id+";arr_n="+i+";element_m(this.id,\"legacy choice\");' title='Scene edit'></td></tr></tbody></table><div width='100%'>"
                for(var l=0;l<story_script[chapter.id][i].legacy_choice.length;l++){
                    if(story_script[chapter.id][i].legacy_choice[l][0]){
                        go=story_script[chapter.id][i].legacy_choice[l][3];
                        if(story_script[go]){
                            element+="<table id='"+all+"l"+l+go+all_blocks+"' class='choice_b to_go' width='100%'><tbody><tr><td>"+story_script[chapter.id][i].legacy_choice[l][0]+" "+story_script[chapter.id][i].legacy_choice[l][1]+" "+story_script[chapter.id][i].legacy_choice[l][2]+"</td><td></td><td colspan='3' align='right'><select style='width:90%;background-color:var(--cw);' onchange='story_script."+chapter.id+"["+i+"].legacy_choice["+l+"][3]=this.value;update_novel();'>"+option_block(go,0)+"</select></td><td class='icon button_block icon_go' style='cursor:pointer;"+((story_script.blocks[go][3])?"background-color:"+story_script.blocks[go][3]+";border-radius:6px;filter:none;":"")+"' onmouseup=\"go_to_block('"+go+"')\"> </td></tr></tbody></table>"
                            if(go!=chapter.id){creaton_line(all+"l"+l+go+all_blocks,go,chapter.id)}
                            all++
                        }else{element+="<table id='"+all+"l"+l+go+all_blocks+"' class='choice_b' width='100%'><tbody><tr><td>"+story_script[chapter.id][i].legacy_choice[l][0]+" "+story_script[chapter.id][i].legacy_choice[l][1]+" "+story_script[chapter.id][i].legacy_choice[l][2]+"</td><td align='center'><select style='width:90%;background-color:var(--cw);' onchange='story_script."+chapter.id+"["+i+"].legacy_choice["+l+"][3]=this.value;update_novel();'>"+option_block(go,0)+"</select></td><td class='icon button_block icon_go' style='cursor:pointer;' onmouseup=\"go_to_block('"+go+"')\"> </td></tr></tbody></table>"}
                    }else if(story_script[chapter.id][i].legacy_choice[l].go_to){
                        go=story_script[chapter.id][i].legacy_choice[l].go_to;
                        if(story_script[go]){
                            element+="<table id='"+all+"l"+l+go+all_blocks+"' class='choice_b to_go' style='width:100%;'><tbody><tr><td><select style='width:90%;background-color:var(--cw);' onchange='story_script."+chapter.id+"["+i+"].legacy_choice["+l+"].go_to=this.value;update_novel();'>"+option_block(go,0)+"</select></td><td class='button_block icon icon_go' style='cursor:pointer;"+((story_script.blocks[go][3])?"background-color:"+story_script.blocks[go][3]+";border-radius:6px;filter:none;":"")+"' onmouseup=\"go_to_block('"+go+"')\"> </td></tr></tbody></table>"
                            if(go!=chapter.id){creaton_line(all+"l"+l+go+all_blocks,go,chapter.id)}
                            all++
                        }else{element+="<div id='"+all+"l"+l+go+all_blocks+"' class='choice_b'><select style='width:90%;background-color:var(--cw);' onchange='story_script."+chapter.id+"["+i+"].legacy_choice["+l+"].go_to=this.value;update_novel();'>"+option_block(go,0)+"</select></div>"}
                    }
                };element+="</div>"
            }else if(story_script[chapter.id][i].hidden_objects){
                element+="<table height='22px' width='100%' style='margin:4px;'><tbody><tr><td width='24px' class='icon_m icon_up' title='Scene up' onmouseup='move_elenetn(story_script."+chapter.id+","+i+",-1)'></td><td width='24px' class='icon_m icon_down' title='Scene down' onmouseup='move_elenetn(story_script."+chapter.id+","+i+",1)'></td><td><p class='namber'>"+plugins_list.hidden_objects.name+": "+(i+1)+"</p></td><td width='48px' class='icon_m icon_show' id='"+chapter.id+"_"+i+"_edit' onmouseup='arr_l=story_script."+chapter.id+";arr_n="+i+";scen_data=[\""+chapter.id+"\","+i+",0];element_m(this.id,plugins_list.hidden_objects.name);' title='Scene edit'></td></tr></tbody></table><div width='100%'>"
                if(story_script[chapter.id][i].hidden_objects.art&&(typeof story_script[chapter.id][i].hidden_objects.art!=='object'||(story_script[chapter.id][i].hidden_objects.art[languare]&&typeof story_script[chapter.id][i].hidden_objects.art[languare]!=='object'))||story_script[chapter.id][i].hidden_objects.color){element+="<div class='scene_bg' ondblclick='arr_l=story_script."+chapter.id+"["+i+"];arr_n=\"hidden_objects\";scen_data=[\""+chapter.id+"\","+i+",0];ho_edit();' style='background-image:url("+open_file(languare_data(story_script[chapter.id][i].hidden_objects.art))+");background-color:"+story_script[chapter.id][i].hidden_objects.color+";' width='100%'></div>"}
                go=(story_script[chapter.id][i].hidden_objects.go_to)?story_script[chapter.id][i].hidden_objects.go_to:'tue_no';
                    if(go&&go!=""&&go!="undefined"){
                    if(story_script[go]){
                        element+="<table id='"+all+"ho"+d+go+all_blocks+"' style='width:100%;' class='choice_b to_go'><tbody><tr><td style='padding:0 8px;'><select style='background-color:var(--cw);' onchange='story_script."+chapter.id+"["+i+"].hidden_objects.go_to=this.value;update_novel();'>"+option_block(go,1)+"</select></td><td class='button_block icon icon_go' style='cursor:pointer;"+((story_script.blocks[go][3])?"background-color:"+story_script.blocks[go][3]+";border-radius:6px;filter:none;":"")+"' onmouseup=\"go_to_block('"+go+"')\"></td></tr></tbody></table>"
                        if(go!=chapter.id){creaton_line(all+"ho"+d+go+all_blocks,go,chapter.id);}
                    }else{element+="<table style='width:100%;' class='choice_b'><tbody><tr><td style='padding:0 8px;'><select style='background-color:var(--cw);' onchange='story_script."+chapter.id+"["+i+"].hidden_objects.go_to=this.value;update_novel();'>"+option_block(go,1)+"</select></td></tr></tbody></table>"}
                };all++;element+="</div>"
            }else if(story_script[chapter.id][i].terrain_map){
                element+="<table height='22px' width='100%' style='margin:4px;'><tbody><tr><td width='24px' class='icon_m icon_up' title='Scene up' onmouseup='move_elenetn(story_script."+chapter.id+","+i+",-1)'></td><td width='24px' class='icon_m icon_down' title='Scene down' onmouseup='move_elenetn(story_script."+chapter.id+","+i+",1)'></td><td><p class='namber'>"+plugins_list.terrain_map.name+": "+(i+1)+"</p></td><td width='48px' class='icon_m icon_show' id='"+chapter.id+"_"+i+"_edit' onmouseup='arr_l=story_script."+chapter.id+";arr_n="+i+";scen_data=[\""+chapter.id+"\","+i+",0];element_m(this.id,plugins_list.terrain_map.name);' title='Scene edit'></td></tr></tbody></table><div width='100%'>"
                if(story_script[chapter.id][i].terrain_map.art&&(typeof story_script[chapter.id][i].terrain_map.art!=='object'||(story_script[chapter.id][i].terrain_map.art[languare]&&typeof story_script[chapter.id][i].terrain_map.art[languare]!=='object'))||story_script[chapter.id][i].terrain_map.color){element+="<div class='scene_bg' ondblclick='arr_l=story_script."+chapter.id+"["+i+"];arr_n=\"terrain_map\";scen_data=[\""+chapter.id+"\","+i+",0];ho_edit();' style='background-image:url("+open_file(languare_data(story_script[chapter.id][i].terrain_map.art))+");background-color:"+story_script[chapter.id][i].terrain_map.color+";' width='100%'></div>"}
                for(var c=0;c<story_script[chapter.id][i].terrain_map.objects.length;c++){
                    go=story_script[chapter.id][i].terrain_map.objects[c].go_to;
                    if(go&&go!=""&&go!="undefined"){
                        var t=languare_data(story_script[chapter.id][i].terrain_map.objects[c].name);if(typeof t!=='object'){countWords+=t.split(reg).length-1;countSymbols+=t.length}
                        if(story_script[go]){
                            element+="<table id='"+all+"map"+d+go+all_blocks+c+"' style='width:100%;' class='choice_b to_go'><tbody><tr><td style='padding-left:8px;width:50%;'><input style='width:100%;' class='input_text' onkeyup='story_script."+chapter.id+"["+i+"].terrain_map.name=this.value' value='"+((t=="")?go:t)+"' type='text'></td><td><select style='background-color:var(--cw);' onchange='story_script."+chapter.id+"["+i+"].terrain_map.objects["+c+"].go_to=this.value;update_novel();'>"+option_block(go,1)+"</select></td><td class='button_block icon icon_go' style='cursor:pointer;"+((story_script.blocks[go][3])?"background-color:"+story_script.blocks[go][3]+";border-radius:6px;filter:none;":"")+"' onmouseup=\"go_to_block('"+go+"')\"></td></tr></tbody></table>"
                            if(go!=chapter.id){creaton_line(all+"map"+d+go+all_blocks+c,go,chapter.id);}
                        }else{element+="<table style='width:100%;' class='choice_b'><tbody><tr><td style='padding-left:8px;width:50%;'><input style='width:100%;' class='input_text' onkeyup='story_script."+chapter.id+"["+i+"].terrain_map.objects["+c+"].name=this.value' value='"+((t=="")?go:t)+"' type='text'></td><td><select style='background-color:var(--cw);' onchange='story_script."+chapter.id+"["+i+"].terrain_map.objects["+c+"].go_to=this.value;update_novel();'>"+option_block(go,1)+"</select></td><td class='button_block icon'></td></tr></tbody></table>"}
                    }
                };all++;element+="</div>"
            }else{element+="<table height='22px' width='100%' style='margin:4px;'><tbody><tr><td width='24px' class='icon_m icon_up' title='Scene up' onmouseup='move_elenetn(story_script."+chapter.id+","+i+",-1)'></td><td width='24px' class='icon_m icon_down' title='Scene down' onmouseup='move_elenetn(story_script."+chapter.id+","+i+",1)'></td><td><p class='namber'>scene: "+(i+1)+"</p></td><td width='45px' class='icon_m icon_show' id='"+chapter.id+"_"+i+"_edit' onmouseup='arr_l=story_script."+chapter.id+";arr_n="+i+";scene_m(this.id,"+(i+1)+",\""+chapter.id+"\");' title='Scene edit'></td></tr></tbody></table>"}
            if(story_script[chapter.id][i].background_image&&(typeof story_script[chapter.id][i].background_image!=='object'||(story_script[chapter.id][i].background_image[languare]&&typeof story_script[chapter.id][i].background_image[languare]!=='object'))||story_script[chapter.id][i].background_color){element+="<div class='scene_bg' ondblclick='"+((story_script[chapter.id][i].dialogs.length==0)?"arr_l=story_script."+chapter.id+";arr_n="+i+";scene_edit();":"arr_l=story_script."+chapter.id+"["+i+"].dialogs[0];scen_data=[\""+chapter.id+"\","+i+",0];scen_editor(scen_data[0],scen_data[1],scen_data[2]);scen_edit_data();")+"' style='content-visibility:auto;background-size:"+((story_script[chapter.id][i].background_size)?story_script[chapter.id][i].background_size:"cover")+";background-image:url("+open_file(languare_data(story_script[chapter.id][i].background_image))+");background-color:"+story_script[chapter.id][i].background_color+";"+((story_script[chapter.id][i].background_align)?"background-position:"+story_script[chapter.id][i].background_align:"")+";' width='100%'></div>"}
            if(story_script[chapter.id][i].dialogs){
                for(var d=0;d<story_script[chapter.id][i].dialogs.length;d++){
					element+="<div class='dialog' id='d_"+chapter.id+"_"+i+"_"+d+"'><table height='22px' width='100%' style='margin-bottom:4px'><tbody><tr><td width='24px' class='icon_m icon_up' title='Dialog up' onmouseup='move_elenetn(story_script."+chapter.id+"["+i+"].dialogs,"+d+",-1)'></td><td width='24px' class='icon_m icon_down' title='Dialog down' onmouseup='move_elenetn(story_script."+chapter.id+"["+i+"].dialogs,"+d+",1)'></td><td><p class='namber'>scene: "+(i+1)+" | dialog: "+(d+1)+"</p></td><td id='m_"+chapter.id+"_"+i+"_"+d+"' onmouseup=\"arr_l=story_script."+chapter.id+"["+i+"].dialogs;arr_n="+d+";dialog_m(this.id,'"+(d+1)+"','"+chapter.id+"',"+i+")\" class='add_button icon_m icon_show' title='Dialog'></td></tr></tbody></table>"
                    var n=(story_script[chapter.id][i].dialogs[d].name&&story_script.parameters.characters[story_script[chapter.id][i].dialogs[d].name])?story_script.parameters.characters[story_script[chapter.id][i].dialogs[d].name][languare]:languare_data(story_script[chapter.id][i].dialogs[d].name)
					if(story_script[chapter.id][i].dialogs[d].back_to){
                        go=story_script[chapter.id][i].dialogs[d].back_to;
                        if(story_script[go]){
						element+="<div class='dialog_element'><table height='22px' width='100%' style='margin:4px 0px;'><tbody><tr><td align='left' valign='center' style='padding-left:4px;'><b>Back to</b></td><td id='dialog_"+chapter.id+"_"+i+"_"+d+"_back_to' onmouseup=\"arr_l=story_script."+chapter.id+"["+i+"].dialogs["+d+"];arr_n='back_to';dialog_el(this.id,'Back to',false)\"  width='24px' class='icon_m icon_edit' title='Change next block'></td></tr></tbody></table><table id='"+all+"b"+d+go+all_blocks+"' class='choice_b to_go' style='width:100%;'><tbody><tr><td><select style='width:90%;background-color:var(--cw);' onchange='story_script."+chapter.id+"["+i+"].dialogs["+d+"].back_to=this.value;update_novel();'>"+option_block(go,0)+"</select></td><td class='button_block icon icon_go' style='cursor:pointer;"+((story_script.blocks[go][3])?"background-color:"+story_script.blocks[go][3]+";border-radius:6px;filter:none;":"")+"' onmouseup=\"go_to_block('"+go+"')\"> </td></tr></tbody></table>"
                            if(go!=chapter.id){creaton_line(all+"b"+d+go+all_blocks,go,chapter.id)}
                            all++
                        }else{element+="<div class='dialog_element'><table height='22px' width='100%' style='margin:4px 0px;'><tbody><tr><td align='left' valign='center' style='padding-left:4px;'><b>Back to</b></td><td id='dialog_"+chapter.id+"_"+i+"_"+d+"_go_to' onmouseup=\"arr_l=story_script."+chapter.id+"["+i+"].dialogs["+d+"];arr_n='back_to';dialog_el(this.id,'Back to',false)\"  width='24px' class='icon_m icon_edit' title='Change next block'></td></tr></tbody></table><div id='"+all+"b"+d+go+all_blocks+"' class='choice_b'><select style='width:90%;background-color:var(--cw);' onchange='story_script."+chapter.id+"["+i+"].dialogs["+d+"].back_to=this.value;update_novel();'>"+option_block(go,0)+"</select></div>";}
						element+="</div>"
                    }
                    if(story_script[chapter.id][i].dialogs[d].video){
                        element+="<div class='dialog_element' ondblclick='arr_l=story_script."+chapter.id+"["+i+"].dialogs["+d+"];arr_n=\"video\";dialog_video_edit();'><table height='22px' width='100%' style='margin:4px 0px;'><tbody><tr><td align='left' valign='center' style='padding-left:4px;'><b>Video</b></td><td id='dialog_"+chapter.id+"_"+i+"_"+d+"_video' onmouseup=\"arr_l=story_script."+chapter.id+"["+i+"].dialogs["+d+"];arr_n='video';dialog_el(this.id,'Video',true);\" width='24px' class='icon_m icon_edit' title='Video'></td></tr></tbody></table>"
                        go=(story_script[chapter.id][i].dialogs[d].video.go_to)?story_script[chapter.id][i].dialogs[d].video.go_to:'tue_no';
                            if(go&&go!=""&&go!="undefined"){
                            if(story_script[go]){
                                element+="<table id='video_"+all+"c"+d+go+all_blocks+"' style='width:100%;' class='choice_b to_go'><tbody><tr><td style='padding:0 8px;'><select style='background-color:var(--cw);' onchange='story_script."+chapter.id+"["+i+"].dialogs["+d+"].video.go_to=this.value;update_novel();'>"+option_block(go,1)+"</select></td><td class='button_block icon icon_go' style='cursor:pointer;"+((story_script.blocks[go][3])?"background-color:"+story_script.blocks[go][3]+";border-radius:6px;filter:none;":"")+"' onmouseup=\"go_to_block('"+go+"')\"></td></tr></tbody></table>"
                                if(go!=chapter.id){creaton_line("video_"+all+"c"+d+go+all_blocks,go,chapter.id);}
                            }else{element+="<table style='width:100%;' class='choice_b'><tbody><tr><td style='padding:0 8px;'><select style='background-color:var(--cw);' onchange='story_script."+chapter.id+"["+i+"].dialogs["+d+"].video.go_to=this.value;update_novel();'>"+option_block(go,1)+"</select></td></tr></tbody></table>"}
                        }all++
                        element+="</div>"
                    }
                    if(story_script[chapter.id][i].dialogs[d].art){
                        var t="<table width='100%' height='48px' style='margin:4px 0;'><tbody><tr>"
                            +((story_script[chapter.id][i].dialogs[d].art[4])?"<td width='20%' style='background: url("+open_file(languare_data(story_script[chapter.id][i].dialogs[d].art[4].url))+") no-repeat center;background-size:contain;'></td>":"")
                            +((story_script[chapter.id][i].dialogs[d].art[3])?"<td width='20%' style='background: url("+open_file(languare_data(story_script[chapter.id][i].dialogs[d].art[3].url))+") no-repeat center;background-size:contain;'></td>":"")
                            +((story_script[chapter.id][i].dialogs[d].art[2])?"<td width='20%' style='background: url("+open_file(languare_data(story_script[chapter.id][i].dialogs[d].art[2].url))+") no-repeat center;background-size:contain;'></td>":"")
                            +((story_script[chapter.id][i].dialogs[d].art[1])?"<td width='20%' style='background: url("+open_file(languare_data(story_script[chapter.id][i].dialogs[d].art[1].url))+") no-repeat center;background-size:contain;'></td>":"")
                            +((story_script[chapter.id][i].dialogs[d].art[0])?"<td width='20%' style='background: url("+open_file(languare_data(story_script[chapter.id][i].dialogs[d].art[0].url))+") no-repeat center;background-size:contain;'></td>":"")
                            +"</tr></tbody></table>"
                        element+="<div class='dialog_element' align='left' ondblclick='arr_l=story_script."+chapter.id+"["+i+"].dialogs["+d+"];arr_n=\"art\";scen_data=[\""+chapter.id+"\","+i+","+(d+1)+"];scen_editor(scen_data[0],scen_data[1],scen_data[2]);scen_edit_data();'><table height='22px' width='100%' style='margin:4px 0px;'><tbody><tr><td align='left' valign='center' style='padding-left:4px;'><b>Art<b></td><td id='dialog_"+chapter.id+"_"+i+"_"+d+"_art' onmouseup=\"arr_l=story_script."+chapter.id+"["+i+"].dialogs["+d+"];arr_n='art';scen_data=[\'"+chapter.id+"\',"+i+","+(d+1)+"];dialog_el(this.id,'Art',true);\" width='24px' class='icon_m icon_edit' title='Scen editor'></td></tr></tbody></table>"+t+"</div>"
                    }
                    if(story_script[chapter.id][i].dialogs[d].text){
						var t=languare_data(story_script[chapter.id][i].dialogs[d].text);if(typeof t!=='object'){countWords+=t.split(reg).length-1;countSymbols+=t.length}
                        element+="<div class='dialog_element' align='left' ondblclick='arr_l=story_script."+chapter.id+"["+i+"].dialogs["+d+"];arr_n=\"text\";dialog_text_edit();'><table height='22px' width='100%' style='margin:4px 0px;'><tbody><tr><td align='left' valign='center'>"
                                +((n)?"<p><b>"+n.replaceAll("<","").replaceAll(">","")+"</p></b>" :"&nbsp;")
                                +"</td><td id='dialog_"+chapter.id+"_"+i+"_"+d+"_text' onmouseup=\"arr_l=story_script."+chapter.id+"["+i+"].dialogs["+d+"];arr_n='text';dialog_el(this.id,'Text',true)\" width='24px' class='icon_m icon_edit' title='Edit dialog'></td></tr></tbody></table><p style='padding:4px;overflow:hidden;'>"+((t.length>0)?t.replaceAll("<","").replaceAll(">",""):'&nbsp;')+"</p></div>"
					}
                    if(story_script[chapter.id][i].dialogs[d].text_add){
                        var t=languare_data(story_script[chapter.id][i].dialogs[d].text_add);if(typeof t!=='object'){countWords+=t.split(reg).length-1;countSymbols+=t.length}
                        element+="<div class='dialog_element' align='left' ondblclick='arr_l=story_script."+chapter.id+"["+i+"].dialogs["+d+"];arr_n=\"text_add\";dialog_text_edit();'><table height='22px' width='100%' style='margin:4px 0px;'><tbody><tr><td align='left' valign='center'>"+((n.length>0)?"<p><b>"+n+" " :"<p><b>")+"text add</b></p></td><td id='dialog_"+chapter.id+"_"+i+"_"+d+"_text_add' onmouseup=\"arr_l=story_script."+chapter.id+"["+i+"].dialogs["+d+"];arr_n='text_add';dialog_el(this.id,'Text add',true)\" width='24px' class='icon_m icon_edit' title='Edit dialog'></td></tr></tbody></table><p style='padding:4px;overflow:hidden;'>"+((t.length>0)?t.replaceAll("<","").replaceAll(">",""):'&nbsp;')+"</p></div>"
                    }
                    if(story_script[chapter.id][i].dialogs[d].choice){
                        element+="<div class='dialog_element'><table height='22px' width='100%' style='margin:4px 0px;' ondblclick='arr_l=story_script."+chapter.id+"["+i+"].dialogs["+d+"];arr_n=\"choice\";edit_choice();'><tbody><tr><td align='left' valign='center' style='padding-left:4px;'><b>Choice ph 2</b></td><td id='dialog_"+chapter.id+"_"+i+"_"+d+"_choice' onmouseup=\"arr_l=story_script."+chapter.id+"["+i+"].dialogs["+d+"];arr_n='choice';dialog_el(this.id,'Choice',true)\" width='24px' class='icon_m icon_edit' title='Edit choice'></td></tr></tbody></table>"
                        for(var c=story_script[chapter.id][i].dialogs[d].choice.length-1;c>=0;c--){
                          const choice = story_script[chapter.id][i].dialogs[d].choice[c];
                            go=(typeof choice.go_to==='object')?choice.go_to[0]:choice.go_to;
                            if(go&&go!=""&&go!="undefined"){
                                if(choice.text){data_corr(choice,'text')}
                                var t=languare_data(choice.text);if(typeof t!=='object'){countWords+=t.split(reg).length-1;countSymbols+=t.length}
                                if(story_script[go]){
                                    element+="<table id='"+all+"c"+d+go+all_blocks+"' style='width:100%;' class='choice_b to_go'>"+
                                      "<tbody>"+
                                        "<tr>"+
                                          "<td style='padding-left:8px;width:50%;'>" +(choice.diamonds ? "<span title='"+choice.diamonds+"'>💎</span>" : '' )+ "<input style='width:calc(100% - "+(choice.diamonds ? '20px' : '0px')+");' class='input_text' onkeyup='story_script."+chapter.id+"["+i+"].dialogs["+d+"].choice["+c+"].text[\""+languare+"\"]=this.value' value='"+((t=="")?go:t)+"' type='text'></td>"+
                                          "<td>"+((typeof choice.go_to==='object')?"<div onmouseup='timeline_edit(story_script."+chapter.id+"["+i+"].dialogs["+d+"].choice["+c+"])'>"+go+" / "+choice.go_to[1]+" / "+choice.go_to[2]+"<div>":"<select style='background-color:var(--cw);' onchange='story_script."+chapter.id+"["+i+"].dialogs["+d+"].choice["+c+"].go_to=this.value;update_novel();'>"+option_block(go,2)+"</select>")+"</td>"+
                                          "<td class='button_block icon icon_go' style='cursor:pointer;"+((story_script.blocks[go][3])?"background-color:"+story_script.blocks[go][3]+";border-radius:6px;filter:none;":"")+"' onmouseup=\"go_to_block('"+go+"')\"></td>"+
                                        "</tr>"+
                                      "</tbody>"+
                                    "</table>"
                                    if (go!=chapter.id) {
                                      creaton_line(all+"c"+d+go+all_blocks,((typeof choice.go_to!='object')?go:"d_"+go+"_"+choice.go_to[1]+"_"+choice.go_to[2]),chapter.id);
                                    }
                                } else {element+="<table style='width:100%;' class='choice_b'><tbody><tr><td style='padding-left:8px;width:50%;'><input style='width:100%;' class='input_text' onkeyup='story_script."+chapter.id+"["+i+"].dialogs["+d+"].choice["+c+"].text[\""+languare+"\"]=this.value' value='"+((t=="")?go:t)+"' type='text'></td><td>"+((typeof choice.go_to==='object')?go+" / "+story_script[chapter.id][i].dialogs[d].choice[c].go_to[1]+" / "+story_script[chapter.id][i].dialogs[d].choice[c].go_to[2]:"<select style='background-color:var(--cw);' onchange='story_script."+chapter.id+"["+i+"].dialogs["+d+"].choice["+c+"].go_to=this.value;update_novel();'>"+option_block(go,2)+"</select>")+"</td><td class='button_block icon'></td></tr></tbody></table>"}
                            } else {
                              var t=languare_data(choice.text);
                              if(typeof t!=='object'){
                                countWords+=t.split(reg).length-1;countSymbols+=t.length
                              }
								              element+="<table style='width:100%;' class='choice_b'><tbody><tr><td class='button_block'></td><td style='padding:4px;'>"+((t=="")?go:t)+"</td><td class='button_block icon'></td></tr></tbody></table>"
                            }
                            all++;
                        };
                        element+="</div>";
                    }
                    if(story_script[chapter.id][i].dialogs[d].sound_stop){element+="<div class='dialog_element' align='left'><table height='22px' width='100%' style='margin:4px 0px;' ondblclick='arr_l=story_script."+chapter.id+"["+i+"].dialogs["+d+"];arr_n=\"sound_stop\";dialog_audio_edit(\"sound_stop_"+all+"_"+d+go+all_blocks+"\");'><tbody><tr><td align='left' valign='center' style='padding-left:4px;'><b>Stop sound<b></td><td id='dialog_"+chapter.id+"_"+i+"_"+d+"_sound_stop' onmouseup=\"arr_l=story_script."+chapter.id+"["+i+"].dialogs["+d+"];arr_n='sound_stop';dialog_el(this.id,'Stop sound',true)\" width='24px' class='icon_m icon_edit' title='Edit sound'></td></tr></tbody></table></div>"} //<input id='sound_stop_"+all+"_"+d+go+all_blocks+"' class='input_text' onkeyup='story_script."+chapter.id+"["+i+"].dialogs["+d+"].sound_stop=this.value' value='"+story_script[chapter.id][i].dialogs[d].sound_stop+"' type='text'>
                    if(story_script[chapter.id][i].dialogs[d].sound){element+="<div class='dialog_element' align='left'><table height='22px' width='100%' style='margin:4px 0px;' ondblclick='arr_l=story_script."+chapter.id+"["+i+"].dialogs["+d+"];arr_n=\"sound\";dialog_audio_edit(\"sound_"+all+"_"+d+go+all_blocks+"\");'><tbody><tr><td align='left' valign='center' style='padding-left:4px;'><b>Play sound<b></td><td id='dialog_"+chapter.id+"_"+i+"_"+d+"_sound' onmouseup=\"arr_l=story_script."+chapter.id+"["+i+"].dialogs["+d+"];arr_n='sound';dialog_el(this.id,'Play sound',true)\" width='24px' class='icon_m icon_edit' title='Edit sound'></td></tr></tbody></table></div>"} //<input id='sound_"+all+"_"+d+go+all_blocks+"' class='input_text' onkeyup='story_script."+chapter.id+"["+i+"].dialogs["+d+"].sound=this.value' value='"+story_script[chapter.id][i].dialogs[d].sound+"' type='text'>
                    if(story_script[chapter.id][i].dialogs[d].timer){
                        go=story_script[chapter.id][i].dialogs[d].timer[1];
                        element+="<div class='dialog_element' align='left'><table height='22px' width='100%' style='margin:4px 0px;'><tbody><tr><td align='left' valign='center' style='padding-left:4px;'><b>Timer<b></td><td id='dialog_"+chapter.id+"_"+i+"_"+d+"_timer' onmouseup=\"arr_l=story_script."+chapter.id+"["+i+"].dialogs["+d+"];arr_n='timer';dialog_el(this.id,'Timer',false)\" width='24px' class='icon_m icon_edit' title='Edit timer'></td></tr></tbody></table><table style='width:100%;' id='"+all+"t"+d+go+all_blocks+"' class='"+((go!="tue_go"&&go!="tue_no")?'to_go':'')+" choice_b'><tbody><tr><td style='padding-left:8px;'><input style='width:100%;' class='input_text' onkeyup='story_script."+chapter.id+"["+i+"].dialogs["+d+"].timer[0]=(this.value*1000)' value='"+(story_script[chapter.id][i].dialogs[d].timer[0]/1000)+"' type='text'></td><td valign='center'>seconds</td><td style='width:40%;'><select style='background-color:var(--cw);' onchange='story_script."+chapter.id+"["+i+"].dialogs["+d+"].timer[1]=this.value;update_novel();'>"+option_block(go,1)+"</select></td>"
                        if(go!="tue_update_scene"&&go!="tue_go"&&go!="tue_no"){
                            element+="<td class='button_block icon icon_go' style='cursor:pointer;"+((story_script.blocks[go][3])?"background-color:"+story_script.blocks[go][3]+";border-radius:6px;filter:none;":"")+"' onmouseup='go_to_block(\""+go+"\")'></td>"
                            if(go!=chapter.id){creaton_line(all+"t"+d+go+all_blocks,go,chapter.id);}
                        }else{element+="<td class='button_block'></td>"}
                        all++;element+="</tr></tbody></table></div>"}
                    if(story_script[chapter.id][i].dialogs[d].variables){
                        var t="";
                        for(var c=0;c<story_script[chapter.id][i].dialogs[d].variables.length;c++){t+="<table width='100%' height='28px' class='choice_b'><tbody><tr><td><select style='background-color:var(--cw);margin-left:6px;' onchange='story_script."+chapter.id+"["+i+"].dialogs["+d+"].variables["+c+"][0]=this.value;'>"+option_var(story_script[chapter.id][i].dialogs[d].variables[c][0])+"</select></td><td width='15%'><select style='background-color:var(--cw);' onchange='story_script."+chapter.id+"["+i+"].dialogs["+d+"].variables["+c+"][1]=this.value;'><option value='add'>add</option><option value='set' "+((story_script[chapter.id][i].dialogs[d].variables[c][1]=="set")?"selected":"")+">set</option></select></td><td width='34%'><input class='input_text' onkeyup='story_script."+chapter.id+"["+i+"].dialogs["+d+"].variables["+c+"][2]=this.value' value='"+story_script[chapter.id][i].dialogs[d].variables[c][2]+"' type='text'></td><td width='5%'></td></tr></tbody></table>"};
                        element+="<div class='dialog_element' align='left'><table height='22px' width='100%' style='margin:4px 0px;' ondblclick='arr_l=story_script."+chapter.id+"["+i+"].dialogs["+d+"];arr_n=\"variables\";variables_set_edit();'><tbody><tr><td align='left' valign='center' style='padding-left:4px;'><b>Variables<b></td><td id='dialog_"+chapter.id+"_"+i+"_"+d+"_variables' onmouseup=\"arr_l=story_script."+chapter.id+"["+i+"].dialogs["+d+"];arr_n='variables';dialog_el(this.id,'Variables',true)\" width='24px' class='icon_m icon_edit' title='Edit variables'></td></tr></tbody></table>"+t+"</div>"
                    }
					if(story_script[chapter.id][i].dialogs[d].go_to){
                        go=story_script[chapter.id][i].dialogs[d].go_to;
                        if(story_script[go]){
                            element+="<div class='dialog_element'><table height='22px' width='100%' style='margin:4px 0px;'><tbody><tr><td align='left' valign='center' style='padding-left:4px;'><b>Go to</b></td><td id='dialog_"+chapter.id+"_"+i+"_"+d+"_go_to' onmouseup=\"arr_l=story_script."+chapter.id+"["+i+"].dialogs["+d+"];arr_n='go_to';dialog_el(this.id,'Go to',false)\" width='24px' class='icon_m icon_edit' title='Change next block'></td></tr></tbody></table><table id='"+all+"g"+d+go+all_blocks+"' class='choice_b to_go' style='width:100%;'><tbody><tr><td><select style='width:90%;background-color:var(--cw);' onchange='story_script."+chapter.id+"["+i+"].dialogs["+d+"].go_to=this.value;update_novel();'>"+option_block(go,0)+"</select></td><td class='button_block icon icon_go' style='cursor:pointer;"+((story_script.blocks[go][3])?"background-color:"+story_script.blocks[go][3]+";border-radius:6px;filter:none;":"")+"' onmouseup=\"go_to_block('"+go+"')\"> </td></tr></tbody></table>"
                            if(go!=chapter.id){creaton_line(all+"g"+d+go+all_blocks,go,chapter.id)}
                            all++
                        }else{element+="<div class='dialog_element'><table height='22px' width='100%' style='margin:4px 0px;'><tbody><tr><td align='left' valign='center' style='padding-left:4px;'><b>Go to</b></td><td id='dialog_"+chapter.id+"_"+i+"_"+d+"_go_to' onmouseup=\"arr_l=story_script."+chapter.id+"["+i+"].dialogs["+d+"];arr_n='go_to';dialog_el(this.id,'Go to',false)\" width='24px' class='icon_m icon_edit' title='Change next block'></td></tr></tbody></table><div id='"+all+"g"+d+go+all_blocks+"' class='choice_b'><select style='width:90%;background-color:var(--cw);' onchange='story_script."+chapter.id+"["+i+"].dialogs["+d+"].go_to=this.value;update_novel();'>"+option_block(go,0)+"</select></div>";}
						element+="</div>"
                    }
                    if(story_script[chapter.id][i].dialogs[d].event){element+="<div class='dialog_element'><table height='22px' width='100%' style='margin:4px 0px;'><tbody><tr><td align='left' valign='center' style='padding-left:4px;'><b>ID event<b></td><td id='dialog_"+chapter.id+"_"+i+"_"+d+"_event' onmouseup=\"arr_l=story_script."+chapter.id+"["+i+"].dialogs["+d+"];arr_n='event';dialog_el(this.id,'Event',false)\" width='24px' class='icon_m icon_edit' title='Edit event'></td></tr></tbody></table><input class='input_text' onkeyup='story_script."+chapter.id+"["+i+"].dialogs["+d+"].event=this.value' value='"+story_script[chapter.id][i].dialogs[d].event+"' type='text'></div>"}
                    if(story_script[chapter.id][i].dialogs[d].controll){element+="<div class='dialog_element'><table height='22px' width='100%' style='margin:4px 0px;'><tbody><tr><td align='left' valign='center' style='padding-left:4px;'><b>Hide interface<b></td><td id='dialog_"+chapter.id+"_"+i+"_"+d+"_controll' onmouseup=\"arr_l=story_script."+chapter.id+"["+i+"].dialogs["+d+"];arr_n='controll';dialog_el(this.id,'Interface',false)\" width='24px' class='icon_m icon_edit' title='Edit interface'></td></tr></tbody></table><div class='choice_b'><select style='width:90%;background-color:var(--cw);' oninput='story_script."+chapter.id+"["+i+"].dialogs["+d+"].controll=this.value'><option value='hidden_here' "+((story_script[chapter.id][i].dialogs[d].controll=="hidden_here")?"selected":"")+">Hidden only here</option><option value='hidden' "+((story_script[chapter.id][i].dialogs[d].controll=="hidden")?"selected":"")+">Hidden</option><option value='visible' "+((story_script[chapter.id][i].dialogs[d].controll=="visible")?"selected":"")+">Visible</option></select></div></div>"}
                    if(story_script[chapter.id][i].dialogs[d].no_autosave){element+="<div class='dialog_element'><table height='22px' width='100%' style='margin:4px 0px;'><tbody><tr><td align='left' valign='center' style='padding-left:4px;'><b>No autosave</b></td><td id='dialog_"+chapter.id+"_"+i+"_"+d+"_no_autosave' onmouseup=\"arr_l=story_script."+chapter.id+"["+i+"].dialogs["+d+"];arr_n='no_autosave';dialog_el(this.id,'No Autosava',false);\" width='24px' class='icon_m icon_edit' title='No Autosava'></td></tr></tbody></table></div>"}
                    if(story_script[chapter.id][i].dialogs[d].html){element+="<div class='dialog_element' ondblclick='arr_l=story_script."+chapter.id+"["+i+"].dialogs["+d+"];arr_n=\"html\";edit_html();'><table height='22px' width='100%' style='margin:4px 0px;'><tbody><tr><td align='left' valign='center' style='padding-left:4px;'><b>HTML code</b></td><td id='dialog_"+chapter.id+"_"+i+"_"+d+"_html' onmouseup=\"arr_l=story_script."+chapter.id+"["+i+"].dialogs["+d+"];arr_n='html';dialog_el(this.id,'HTML code',true);\" width='24px' class='icon_m icon_edit' title='Edit html'></td></tr></tbody></table></div>"}
                    if(story_script[chapter.id][i].dialogs[d].js){element+="<div class='dialog_element' ondblclick='copy_arr=story_script."+chapter.id+"["+i+"].dialogs["+d+"];edit_code(\"js\",\"JavaScript\");'><table height='22px' width='100%' style='margin:4px 0px;'><tbody><tr><td align='left' valign='center' style='padding-left:4px;'><b>JavaScript code</b></td><td id='dialog_"+chapter.id+"_"+i+"_"+d+"_js' onmouseup=\"arr_l=story_script."+chapter.id+"["+i+"].dialogs["+d+"];arr_n='js';dialog_el(this.id,'JavaScript code',true);\" width='24px' class='icon_m icon_edit' title='JavaScript html'></td></tr></tbody></table></div>"}
                    if(story_script[chapter.id][i].dialogs[d].toast){element+="<div class='dialog_element' align='left'><table height='22px' width='100%' style='margin:4px 0px;'><tbody><tr><td align='left' valign='center' style='padding-left:4px;'><b>Toast</b></td><td id='dialog_"+chapter.id+"_"+i+"_"+d+"_html' onmouseup=\"arr_l=story_script."+chapter.id+"["+i+"].dialogs["+d+"];arr_n='toast';dialog_el(this.id,'HTML code',true);\" width='24px' class='icon_m icon_edit' title='Edit toast'></td></tr></tbody></table><p style='padding:4px;'>"+languare_data(story_script[chapter.id][i].dialogs[d].toast)+"</p></div>"}
					element+="<div align='right'><div id='add_d_"+chapter.id+"_"+i+"_"+d+"' onmouseup=\"arr_l=story_script."+chapter.id+"["+i+"].dialogs["+d+"];scen_data=[\'"+chapter.id+"\',"+i+","+(d+1)+"];add_element_d(this.id,'"+(d+1)+"')\" class='add_button icon_m icon_add' title='Add element to dialog'></div></div></div>"
                };element+="<div align='right' style='margin-right:4px;'><div id='add_s_"+chapter.id+"_"+i+"' onmouseup=\"arr_l=story_script."+chapter.id+"["+i+"].dialogs;arr_n="+d+";scen_data=[\'"+chapter.id+"\',"+i+","+(d+1)+"];add_element_s(this.id,'"+(i+1)+"')\" class='add_button icon_m icon_add' title='Add element to scene'></div></div>"
            };element+="</div>"
        };element+="<div align='right' style='margin-right:8px;'><div id='add_b_"+chapter.id+"' onmouseup=\"add_element_b(this.id,\'"+chapter.id+"\');\" class='add_button icon_m icon_add' title='Add element to block'></div></div>"
        chapter.innerHTML="<div style='margin:2px;'><table height='100%' width='100%'><tbody><tr><td align='center' style='cursor:pointer;' onmousedown=\"block_open('"+chapter.id+"_content');story_script.blocks['"+chapter.id+"'][2]=((story_script.blocks['"+chapter.id+"'][2]=='none')?'block':'none');\" class='button_block icon icon_more'></td><td align='center'>"+((chapter.id.length>17)?chapter.id.slice(0,15)+"...":chapter.id )+"</td><td align='center' style='cursor:pointer;width:48px;' onmouseup=\"edit_block('"+chapter.id+"')\" class='icon_m button_block icon_edit'></td><td align='center' style='cursor:pointer;' onmouseup=\"play_novel('"+chapter.id+"')\" class='icon_m button_block icon_play'></td><td style='width:8px;'></td> </tr></tbody></table></div><div id='"+chapter.id+"_content' style='display:"+((story_script.blocks[chapter.id])?story_script.blocks[chapter.id][2]:"none" )+";'>"+element+"</div>";
        chapter.className="story_block panel";
        list_blocks.innerHTML+="<option value="+chapter.id+">"
		if(!story_script.blocks[chapter.id]){
			chapter.style.left=64+(320*(all_blocks-1))+"px";
			chapter.style.top=64+(128*(all_blocks-1))+"px";
			story_script.blocks[chapter.id]=[chapter.style.left,chapter.style.top,'none','#fff']
		}else{
			chapter.style.left=story_script.blocks[chapter.id][0];
			chapter.style.top=story_script.blocks[chapter.id][1];
			chapter.style.backgroundColor=story_script.blocks[chapter.id][3];
		};story_blocks.appendChild(chapter);
    }
}
function languare_data(data){if(data){return ((data[languare])?data[languare]:data);}else{return ""}}
function data_corr(arr,key){
    if(!arr[key][languare]){
        if(typeof arr[key]!=='object'){
            data_la(arr,key)
        }else if(arr[key][story_script.parameters.languares[0]]){
            arr[key][languare]=arr[key][story_script.parameters.languares[0]]
        }
    }
}
function data_la(arr,key){
    var s=((Object.keys(arr[key])[0]==languare)?arr[key][languare]:arr[key]);
    arr[key]={};
    if(typeof s!=='object'){for(var i=0;i<story_script.parameters.languares.length;i++){arr[key][story_script.parameters.languares[i]]=s;}}else{arr[key]=s}
}
function data_only(arr,key){
    if(arr[key]&&arr[key][languare]){
        var n=arr[key][languare],a=0;
        for(var i=0;i<story_script.parameters.languares.length;i++){
            if(arr[key][story_script.parameters.languares[i]]){
                if(n.length==0||n==arr[key][story_script.parameters.languares[i]]||arr[key][story_script.parameters.languares[i]].length==0){a++}
                else{n=arr[key][story_script.parameters.languares[i]]}
            }else{a++}
        }if(a==story_script.parameters.languares.length){arr[key]=n}
    }else if(arr[key]&&arr[key].length==0){delete arr[key];if(key=='art'){delete arr.art_size}}}
function creaton_line(id,go,chapter){
    line_controll.push([go,chapter,id]);
    var newLine=document.createElementNS("http://www.w3.org/2000/svg",'line');
    if(story_script.blocks[go]&&story_script.blocks[go][3]){newLine.style.stroke=(setup_editor.ui<7)? colorLuminance(story_script.blocks[go][3],-0x222222):story_script.blocks[go][3];}
    newLine.id=id+"l";
    story_lines.appendChild(newLine);
}
new_novel()
function save_file(){
    var n;
    if(story_script.parameters.title){
        n=(story_script.parameters.title.en)?story_script.parameters.title.en:(story_script.parameters.title[story_script.parameters.languares[0]])?story_script.parameters.title[story_script.parameters.languares[0]]:n=story_script.parameters.title
        n=correct_name(String(n).toLowerCase());
    }else{n="new_novel";}
    create_json_files(n+'.json',JSON.stringify(story_script))
	async function create_json_files(n,c){
		if("showSaveFilePicker" in window&&window.self===window.top) {
			const opt={
				suggestedName:n,
				id:'tuesdyaJSengine',
				types:[{description:'Text Files',accept:{'application/json':['.json']}}],
			};
			const file = await window.showSaveFilePicker(opt);
			const content = await file.createWritable();
			await content.write(c);
			await content.close();
		} else {download_files(n,"data:text/json;charset=utf-8,"+encodeURIComponent(c))}
	}
}

function download_files(n,c){
    let e=document.getElementById('downloadAnchorElem');
    e.setAttribute("href",c);
    e.setAttribute("download",n);
    e.click();
}
function data_time(){
    var d=new Date(),dm=String(d.getMonth()+1),dd=String(d.getDate()),dh=String(d.getHours()),di=String(d.getMinutes()),ds=String(d.getSeconds());
    return d.getFullYear()+'_'+(dm.length<2?'0'+dm :dm)+'_'+(dd.length<2?'0'+dd :dd)+'_'+(dh.length<2?'0'+dh :dh)+"-"+(di.length<2?'0'+di:di)+"-"+(ds.length<2?'0'+ds:ds)
}
function lines(elem){
    var rect,rect2,title_block,l1,l2,line
    for(var x=0;x<line_controll.length;x++){
        line=document.getElementById(line_controll[x][2]+"l")
        if(!document.getElementById(line_controll[x][0])){delete line_controll[x][0];}
        else{
            if(setup_editor.lines_anim){line.style.animationPlayState='running';}else{line.style.animationPlayState='paused';}
            title_block=document.getElementById(line_controll[x][0]).getBoundingClientRect();
            if(!setup_editor.lines){if((elem==line_controll[x][1]||elem==line_controll[x][0])&&title_block.top!=0){line.style.visibility='visible'}else{line.style.visibility='hidden'}}else if(title_block.top==0){line.style.visibility='hidden'}else{line.style.visibility='visible'}
            if(document.getElementById(line_controll[x][1]+"_content").style.display=='none'){
                rect=document.getElementById(line_controll[x][1]).getBoundingClientRect();
                l1=(html.scrollLeft+rect.left)/scale;
                l2=(html.scrollLeft+title_block.left)/scale
                if(l1>l2){
                    moveSlider(l1,'x2',line_controll[x][2]);
                    moveSlider((rect.top+html.scrollTop+(22*scale)-3)/scale,'y2',line_controll[x][2]);
                    moveSlider((l2+((l1-264>l2)?264:0)),'x1',line_controll[x][2]);
                    moveSlider((title_block.top+html.scrollTop+(22*scale)-3)/scale,'y1',line_controll[x][2]);
                }else{
                    moveSlider(l1+264,'x2',line_controll[x][2]);
                    moveSlider((rect.top+html.scrollTop+(22*scale)-3)/scale,'y2',line_controll[x][2]);
                    moveSlider(l2+((l1>l2-264)?264:0),'x1',line_controll[x][2]);
                    moveSlider((title_block.top+html.scrollTop+(22*scale)-3)/scale,'y1',line_controll[x][2]);
                }
            }else{
                rect=document.getElementById(line_controll[x][2]).getBoundingClientRect();
                rect2=document.getElementById(line_controll[x][1]).getBoundingClientRect();
                l1=(html.scrollLeft+rect2.left)/scale;
                l2=(html.scrollLeft+title_block.left)/scale
                if(l1>l2){
                    moveSlider(l1,'x2',line_controll[x][2]);
                    moveSlider((rect.top+html.scrollTop+(12*scale)-3)/scale,'y2',line_controll[x][2]);
                    moveSlider((l2+((l1-264>l2)?264:0)),'x1',line_controll[x][2]);
                    moveSlider((title_block.top+html.scrollTop+(22*scale)-3)/scale,'y1',line_controll[x][2]);
                }else{
                    moveSlider(l1+264,'x2',line_controll[x][2]);
                    moveSlider((rect.top+html.scrollTop+(12*scale)-3)/scale,'y2',line_controll[x][2]);
                    moveSlider(l2+((l1>l2-264)?264:0),'x1',line_controll[x][2]);
                    moveSlider((title_block.top+html.scrollTop+(22*scale)-3)/scale,'y1',line_controll[x][2]);
                }
            }
        }
    }
}
var moveSlider=function(slider,direction,id){
    var element=document.getElementById(id+"l");
    element.setAttributeNS(null,direction,slider);
}
function control_dlock(){
    all_blocks=document.getElementsByClassName("story_block");
    for(var i=0;i<all_blocks.length;i++){movie_dlock(all_blocks[i].id)}
}
var scroll_block=false;
var block_active=false;
function movie_dlock(id){
    var focus_block=document.getElementById(id);
    focus_block.onmousedown=function(e){
        story_blocks.appendChild(focus_block);
        menu_add.style.visibility="hidden";
        var coords=getCoords(focus_block);
        var shiftX=(e.pageX-coords.left);
        var shiftY=(e.pageY-coords.top);
        scroll_block=true;
        focus_block.style.position='absolute';
        focus_block.style.animation=false;
        focus_block.style.WebkitAnimation=false;
        moveAt(e);
        function moveAt(e){
            focus_block.style.left=((e.pageX-shiftX)/scale)+'px';
            focus_block.style.top=((e.pageY-shiftY)/scale)+'px';
            lines(id)
        }
        document.onmousemove=function(e){moveAt(e);};
        focus_block.onmouseup=function(){
			story_script.blocks[focus_block.id][0]=focus_block.style.left;
            story_script.blocks[focus_block.id][1]=focus_block.style.top,
            document.onmousemove=null;
            focus_block.onmouseup=null;
            if(window_zone.style.visibility!="visible"){scroll_block=false};
            block_active=id;world_size();
        };
    }
    focus_block.ontouchstart=function(e){
        menu_add.style.visibility="hidden";
        var coords=getCoords(focus_block);
        var shiftX=(e.touches[0].pageX-coords.left);
        var shiftY=(e.touches[0].pageY-coords.top);
        scroll_block=true;
        focus_block.style.position='absolute';
        focus_block.style.animation=false;
        focus_block.style.WebkitAnimation=false;
        story_blocks.appendChild(focus_block);
        moveAt(e);
        function moveAt(e){
            focus_block.style.left=((e.touches[0].pageX-shiftX)/scale)+'px';
            focus_block.style.top=((e.touches[0].pageY-shiftY)/scale)+'px';
            lines(id)
        }
        document.ontouchmove=function(e){moveAt(e);};
        focus_block.ontouchend=function(){
			story_script.blocks[focus_block.id][0]=focus_block.style.left;
            story_script.blocks[focus_block.id][1]=focus_block.style.top,
            document.ontouchmove=null;
            focus_block.ontouchend=null;
            if(window_zone.style.visibility!="visible"){scroll_block=false};
            block_active=id;world_size();
        };
    }
    focus_block.ondragstart=function(){return false;};
    function getCoords(elem){
        var box=elem.getBoundingClientRect();
        return {
            top:box.top+pageYOffset,
            left:box.left+pageXOffset
        };
    }
}
function world_size(){
    let height=Math.max(body.scrollHeight,body.offsetHeight,html.clientHeight,html.scrollHeight,html.offsetHeight);
    let width=Math.max(body.scrollWidth,body.offsetWidth,html.clientWidth,html.scrollWidth,html.offsetWidth);
    story_lines.setAttribute("height",height/scale);
    story_lines.setAttribute("width",width/scale);
    story_lines.setAttribute("viewBox","0,0,"+width/scale+","+height/scale);
}
function block_open(id){
    var e=document.getElementById(id);
    if(e.style.display==="block"){e.style.display="none";}
	else{e.style.display="block";}
    lines()
}
var startmove_x=null,startmove_y=null,scroll_x=null,scroll_y=null,scroll_xz=null,scroll_yz=null,dictat_m=0,dictat_s=0;
html.ontouchstart=function(e){
    if(!scroll_block||(scene_screen&&!scene_scroll)){
        html.style.overflow='scroll';
        if(e.touches.length>1){dictat_s=Math.sqrt((e.touches[0].clientX-e.touches[1].clientX)**2+(e.touches[0].clientY-e.touches[1].clientY)**2)}
        html.ontouchmove=function(e){
            if(e.touches.length>1&&!scene_screen){
                dictat_m=((Math.sqrt((e.touches[0].clientX-e.touches[1].clientX)**2+(e.touches[0].clientY-e.touches[1].clientY)**2))-dictat_s)/1000;
                world.style.transform='scale('+Math.min(2,Math.max(0.25,(scale+dictat_m)))+')';
                scene_view.style.overflow="hidden";
            }
        }
        html.ontouchend=function(e){
            startmove_x=null;
            startmove_y=null;
            html.ontouchmove=null;
            html.ontouchend=null;
            scene_view.style.overflow="auto";
            scale=Math.min(2,Math.max(0.25,(scale+dictat_m)));dictat_m=0;
            scroll_z();
        };
    }else{html.style.overflow='hidden';}
}
scene_view.ontouchstart=function(e){
    if(scene_screen&&scene_scroll){
        if(e.touches.length>1){dictat_s=Math.sqrt((e.touches[0].clientX-e.touches[1].clientX)**2+(e.touches[0].clientY-e.touches[1].clientY)**2)}
        scene_view.ontouchmove=function(e){
            if(e.touches.length>1){
                dictat_m=((Math.sqrt((e.touches[0].clientX-e.touches[1].clientX)**2+(e.touches[0].clientY-e.touches[1].clientY)**2))-dictat_s)/1000;
                screen_preview.style.transform='scale('+Math.min(2,Math.max(0.25,(scale_scene+dictat_m)))+')';
                scene_view.style.overflow="hidden";
            }
        }
        scene_view.ontouchend=function(e){
            startmove_x=null;
            startmove_y=null;
            scene_view.ontouchmove=null;
            scene_view.ontouchend=null;
            scene_view.style.overflow="auto";
            scale_scene=Math.min(2,Math.max(0.25,(scale_scene+dictat_m)));dictat_m=0;
            scroll_z();
        };
    }
}
world.onmousedown=function(e){
    if(!scroll_block&&!scene_screen){
        startmove_x=e.clientX;
        startmove_y=e.clientY;
        scroll_x=html.scrollTop;
        scroll_y=html.scrollLeft;
        html.onmousemove=function(e){
            html.scrollTop=scroll_x-(e.clientY-startmove_y);
            html.scrollLeft=scroll_y-(e.clientX-startmove_x);
        }
        html.onmouseup=function(e){
            startmove_x=null;
            startmove_y=null;
            html.onmousemove=null;
            html.onmouseup=null;
            scroll_z();
        };
		html.onmouseleave=function(){
			html.onmousemove=null;
			html.onmouseup=null;
			document.onmousemove=null;
			document.onmouseup=null;
		};
    }
}
scene_view.onmousedown=function(e){
    if(scene_screen&&scene_scroll){
        startmove_x=e.clientX;
        startmove_y=e.clientY;
        scroll_x=scene_view.scrollTop;
        scroll_y=scene_view.scrollLeft;
        html.onmousemove=function(e){
            scene_view.scrollTop=scroll_x-(e.clientY-startmove_y);
            scene_view.scrollLeft=scroll_y-(e.clientX-startmove_x);
        }
        html.onmouseup=function(e){
            startmove_x=null;
            startmove_y=null;
            html.onmousemove=null;
            html.onmouseup=null;
        };
        html.onmouseleave=function(){
            html.onmousemove=null;
            html.onmouseup=null;
            document.onmousemove=null;
            document.onmouseup=null;
        };
    }
}
function scroll_z(){
    scroll_xz=((html.scrollTop+(html.clientHeight/2))/scale)-(html.clientHeight/2);
    scroll_yz=((html.scrollLeft+(html.clientWidth/2))/scale)-(html.clientWidth/2);
}
function modal_window(action,content){
    var window_zone=document.getElementById("window_zone");
    if(audio_preplay.currentTime>0){audio_preplay.currentTime=0;audio_preplay.pause()}
    if(action=='close'){
        menu_add.style.visibility="hidden";
        window_zone.style.visibility="hidden"
        window_zone.style.backgroundColor='rgba(110,95,165,0)';
        if(!scene_screen){html.style.overflow='scroll';scroll_block=false;}
        window_zone.innerHTML="";
    }else if(action=='open'&&window_zone.style.visibility!="visible"){
        window_zone.style.visibility="visible";
        window_zone.style.backgroundColor='var(--cm)'
        html.style.overflow='hidden';
        window_zone.innerHTML=content;
        scroll_block=true;
    }
}
var preview=null
function play_novel(bl,se){
    if(preview!=null){preview.close();}
    var story_preview=JSON.stringify(story_script)+((story_script.parameters.js)?";"+story_script.parameters.js:""),plugins_code="",plugins_file="",fonts="",css=(story_script.parameters.css)?story_script.parameters.css:"",d=JSON.parse(JSON.stringify(project_files)),s=0,p=0,a=d.length;
    for(var x=0;x<a;x++){for(var i=0;i<d.length;i++){if(d[i][0].length>s){p=i;s=d[i][0].length}};css=css.replaceAll(d[p][0],d[p][1]);if(d[p][0].length>3){story_preview=story_preview.replaceAll(d[p][0],d[p][1])};d.splice(p,1);s=0;p=0;}
    if(story_script.parameters.plugins){for(var i=0;i<story_script.parameters.plugins.length;i++){
        if(plugins_list[story_script.parameters.plugins[i]]){if(plugins_list[story_script.parameters.plugins[i]].code){plugins_code+=plugins_list[story_script.parameters.plugins[i]].code+" "}
        else if(plugins_list[story_script.parameters.plugins[i]].file){plugins_file+="<script type='text/javascript' src='"+open_file(plugins_list[story_script.parameters.plugins[i]].file)+"'><\/script>"}
        }else{plugins_file+=((plugins_list[story_script.parameters.plugins[i]])?"<script type='text/javascript' src='"+open_file(plugins_list[story_script.parameters.plugins[i]].file)+"'><\/script>":"<script type='text/javascript' src='"+open_file(story_script.parameters.plugins[i])+"'><\/script>")}
    }}
    if(story_script.parameters.font_files){for(var i=0;i<Object.keys(story_script.parameters.font_files).length;i++){fonts+="@font-face{font-family:"+Object.keys(story_script.parameters.font_files)[i]+";src:url("+open_file(story_script.parameters.font_files[Object.keys(story_script.parameters.font_files)[i]])+");} "}}
    preview=window.open("","preview","location=no,scrollbars=no,width="+setup_editor.pvw[0]+",height="+setup_editor.pvw[1]);
    preview.document.write("<html><head><title>"+languare_data(story_script.parameters.title)+"</title><style>"+css+fonts+" "+((story_script.parameters.font)?"*{font-family:"+story_script.parameters.font+";} ":"")+"body{font-size:"+story_script.parameters.font_size+";background-color:var(--wn);border-collapse:collapse;border:none;margin:0;padding:0;border:0;border-spacing:0px;-webkit-touch-callout:none;user-select:none;height:100vh;}<\/style><\/head><body><div id='tuesday' style='width:100%;height:100vh;'> <\/div><script type='text/javascript'>"+runtime+plugins_code+"<\/script>"+plugins_file+"<script src='true'><\/script><script type='text/javascript'>let story_preview="+story_preview+";tuesday.addEventListener('script_executed',function(event){languare='"+languare+"'});"+((bl)?"tuesday.addEventListener('script_loaded',function(event){go_to('"+bl+"');"+((se)?"scene="+scen_data[1]+";dialog="+(scen_data[2]-1)+";del_element('tue_choice');creation_scene();":"")+" });" :"")+" load_story('data',story_preview);<\/script><\/body><\/html>");
}
function search_block(){
    var i,txt;
    var input=document.getElementById("search_block");
    var filter=input.value.toUpperCase();
    var li=document.getElementsByClassName("story_block");
    var ferst=false
    for(i=0;i<li.length;i++){
        txt=li[i].id.toUpperCase();
        if(txt.toUpperCase().includes(filter)){li[i].style.opacity=1;if(filter.length>0&&!ferst){scroll_to_block(li[i]);ferst=true;}else if(filter==txt){scroll_to_block(li[i]);ferst=true;}}
    }
}
function search_file(){
    var i,txt;
    var input=document.getElementById("search_file");
    var filter=input.value.toUpperCase();
    var li=document.getElementsByClassName("add_file");
    for(i=0;i<li.length;i++){
        txt=li[i].title.toUpperCase();
        if(txt.toUpperCase().includes(filter)){
            li[i].style.display="block";
        }else{li[i].style.display="none";}
    }
}
var search
function search_text(id,s){
    const i = document.getElementById(id);
    i.focus();
    var n = i.value.indexOf(s,[search])
    search = n+s.length;
    i.setSelectionRange(n,search);
    var w,y=0;
    for (w=0;w<i.value.split("\n").length;w++) {
        if(y>search){break}
       else{y=i.value.indexOf("\n",[y+1])}
    }
    i.scrollTop = ((i.rows+2) * w)-(i.rows+2);
}
function go_to_block(bl){if(story_script[bl]){scroll_to_block(document.getElementById(bl));}}
function scroll_to_block(bl){
    var rect=bl.getBoundingClientRect();
    html.scrollTop=(html.scrollTop+(rect.top-(html.clientHeight/2)+22));
    html.scrollLeft=(html.scrollLeft+(rect.left-(html.clientWidth/2)+(rect.width/2)));
    bl.style.animation="flash 2s 1";
    bl.style.WebkitAnimation="flash 2s 1";
    story_blocks.appendChild(bl);
}
function toast(message, color){
    var x=document.getElementById("toast");
    if(color){x.style.backgroundColor=color}else{x.style.backgroundColor='var(--wn)'}
    x.classList.remove("toast_anim");
    x.innerHTML=message
    void x.offsetParent;
    x.classList.add("toast_anim");
}
function about(){
    var html="<div class='window' style='padding:24px 16px 0px 16px;width:422px;'><div><div class='window_close icon icon_close' onclick='modal_window(\"close\")'></div></div><div align='center'><p style='font-size:22px;'>Tuesday JS visual novel engine</p><hr><p>Release: 46</p>"
    +"<table style=' border-spacing:10px;border-collapse:separate; width: 100%;'><tr><td align='right' colspan='1'>E-Mail:</td><td align='left' colspan='2'><a href='mailto:tuesdayjsengine@gmail.com' target='_blank'>tuesdayjsengine@gmail.com</a></td></tr><tr><td align='right' colspan='1'>WebSite:</td><td align='left' colspan='3'><a href='https://kirilllive.github.io/tuesday-js' target='_blank'>kirilllive.github.io/tuesday-js</a></td></tr>  <tr><td align='right' colspan='1'>Tutorial:</td><td align='left' colspan='3'><a href='https://kirilllive.github.io/tuesday-js/doc_editor.html#quick_tutorial' target='_blank'>kirilllive.github.io/tuesday-js/doc_editor</a></td></tr><tr>"
    +"<td class='button_menu' style='border-radius:16px;width:33%;height:64px' align='center'><a href='https://github.com/Kirilllive/tuesday-js' target='_blank'><svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 256 256' style='filter:var(--ft);'><path d='M128,0C57,0 0,57 0,128c0,57 37,104 88,121 6,1 9,-3 9,-6 0,-3-0,-13-0,-24C64,225 56,212 53,204 52,201 45,189 40,186c-4,-2-11,-8-0,-8 10,-0 17,9 20,13 12,19 30,14 37,11 1,-8 4,-14 8,-17-28,-3-58,-14-58,-63 0,-14 5,-25 13,-34-1,-3-6,-16 1,-34 0,0 11,-3 35,13 10,-3 21,-4 32,-4 11,0 22,1 32,4 24,-17 35,-13 35,-13 7,18 3,31 1,34 8,9 13,20 13,34 0,49-30,60-58,63 5,4 9,12 9,24 0,17-0,31-0,35 0,3 2,7 9,6C219,232 256,184 256,128 256,57 199,0 128,0Z' fill='#000' /></svg></a></td>"
    +"<td class='button_menu' style='border-radius:16px;width:33%;height:64px' align='center'><a href='https://www.reddit.com/r/TuesdayJS/' target='_blank'> <svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 116 116' style='filter:var(--ft);'><path fill='#000' transform='translate(-82,-80)' d='m 195.7,139.8 c 0,-6.8 -5.5,-12.2 -12.2,-12.2 -3.3,0 -6.3,1.3 -8.5,3.4 -8.4,-6 -19.9,-9.9 -32.7,-10.4 l 5.6,-26.2 18.2,3.9 c 0.2,4.6 4,8.3 8.7,8.3 4.8,0 8.7,-3.9 8.7,-8.7 0,-4.8 -3.9,-8.7 -8.7,-8.7 -3.4,0 -6.4,2 -7.8,4.9 l -20.3,-4.3 c -0.6,-0.1 -1.2,0 -1.6,0.3 -0.5,0.3 -0.8,0.8 -0.9,1.4 l -6.2,29.2 c -13,0.4 -24.7,4.3 -33.2,10.4 -2.2,-2.1 -5.2,-3.4 -8.5,-3.4 -6.8,0 -12.2,5.5 -12.2,12.2 0,5 3,9.2 7.2,11.1 -0.2,1.2 -0.3,2.4 -0.3,3.7 0,18.8 21.9,34.1 48.9,34.1 27,0 48.9,-15.2 48.9,-34.1 0,-1.2 -0.1,-2.5 -0.3,-3.7 4.2,-1.9 7.2,-6.2 7.2,-11.2 z m -83.8,8.7 c 0,-4.8 3.9,-8.7 8.7,-8.7 4.8,0 8.7,3.9 8.7,8.7 0,4.8 -3.9,8.7 -8.7,8.7 -4.8,0.1 -8.7,-3.9 -8.7,-8.7 z m 48.7,23.1 c -6,6 -17.4,6.4 -20.7,6.4 -3.4,0 -14.8,-0.5 -20.7,-6.4 -0.9,-0.9 -0.9,-2.3 0,-3.2 0.9,-0.9 2.3,-0.9 3.2,0 3.8,3.8 11.8,5.1 17.5,5.1 5.7,0 13.8,-1.3 17.5,-5.1 0.9,-0.9 2.3,-0.9 3.2,0 0.8,0.9 0.8,2.3 0,3.2 z M 159,157.3 c -4.8,0 -8.7,-3.9 -8.7,-8.7 0,-4.8 3.9,-8.7 8.7,-8.7 4.8,0 8.7,3.9 8.7,8.7 0,4.7 -3.9,8.7 -8.7,8.7 z'/></svg></a></td>"
    +"<td class='button_menu' style='border-radius:16px;width:33%;height:64px' align='center'><a href='https://twitter.com/TuesdayJS_vn' target='_blank'><svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 256 256' style='filter:var(--ft);'><path fill='#000' d='m256,45c-9,4-20,7-30,8 11,-6 19,-17 23,-29-10,6-21,10-33,13C206,26 192,20 177,20c-29,0-53,24-53,53 0,4 0,8 1,12C82,82 44,61 18,30c-5,8-7,17-7,26 0,18 9,34 23,44-9,-0-17,-3-24,-7 0,0 0,0 0,1 0,25 18,47 42,51-4,1-9,2-14,2-3,0-7,-0-10,-1 7,21 26,36 49,36-18,14-41,22-65,22-4,0-8,-0-13,-1 23,15 51,24 81,24 97,0 149,-80 149,-149 0,-2-0,-5-0,-7 10,-7 19,-17 26,-27z'/></svg></a></td>"
    +"</tr></table><p>Thanks for the help from users</p><hr><table width='100%' align='center'><tbody><tr>"
    +"<td width='25%' align='center' height='64px'><a href='https://twitter.com/Suki_Novels' target='_blank'>Suki Novels</a></td>"
    +"<td width='25%' align='center'>Argosa</td>"
    +"<td width='25%' align='center'><a href='https://twitter.com/onigi123' target='_blank'>Onigi</a></td>"
    +"<td width='25%' align='center'>Arne Krause</td></tr><tr>"
    +"</tr></tbody></table>"
    +"<p><a href='https://www.patreon.com/kirill_live' target='_blank'><svg height='40' width='200' viewBox='0 0 1000 200' xmlns='http://www.w3.org/2000/svg'><rect width='1000' height='200' fill='#FF424D'/><path d='M310 129V72h19c7 0 12 1 15 4 4 2 5 6 5 11 0 3 0 5-2 7-1 3-3 4-6 5a13 13 0 0110 13c0 6-2 10-6 13-3 2-8 4-14 4zm10-26v18h11l7-2c2-2 3-4 3-7 0-6-3-9-9-9zm0-7h10l7-2c2-2 2-4 2-6 0-3 0-5-2-6l-8-2h-9zm58 34c-6 0-11-2-14-6-4-4-6-9-6-15v-1l2-12c2-3 4-6 7-7 3-2 6-3 10-3 6 0 10 2 13 5 4 4 5 9 5 16v4h-27c0 3 1 6 3 8s5 3 8 3c4 0 8-2 10-5l5 5-6 6zm-1-37c-3 0-5 1-6 3-2 2-3 5-3 8h18v-1c0-3-1-5-3-7-1-2-3-3-6-3zm43 29l6-2 2-5h9l-2 7-7 6-8 2c-6 0-11-2-14-6-4-4-5-9-5-16v-1c0-6 1-12 5-15 3-4 8-6 14-6 5 0 9 1 12 4s5 7 5 12h-9l-2-6-6-3c-3 0-6 2-7 4-2 2-3 5-3 10v1c0 5 1 8 3 11 1 2 4 3 7 3zm23-15c0-4 0-8 2-11s4-6 7-7c3-2 6-3 10-3 6 0 11 2 14 5 4 4 6 9 6 15v2c0 4-1 8-3 11-1 4-3 6-6 8s-7 3-11 3c-6 0-10-2-14-6s-5-10-5-16zm9 1c0 5 1 8 3 10 2 3 4 4 7 4s6-1 8-4c2-2 2-6 2-11 0-4 0-7-2-10-2-2-5-4-8-4s-5 2-7 4c-2 3-3 6-3 11zm47-21v4c3-3 7-5 12-5 6 0 10 2 12 6 3-4 7-6 13-6 5 0 8 1 10 4 3 2 4 6 4 11v28h-10v-28l-1-6-6-1-6 1-2 5v29h-10v-28c0-5-3-7-8-7-3 0-6 1-8 4v31h-9V87zm79 43c-6 0-11-2-15-6-3-4-5-9-5-15v-1l2-12c2-3 4-6 7-7 3-2 6-3 10-3 6 0 10 2 13 5 4 4 5 9 5 16v4h-28l4 8c2 2 5 3 8 3 4 0 8-2 10-5l5 5-6 6zm-1-37c-3 0-5 1-6 3-2 2-3 5-3 8h18v-1c-1-3-1-5-3-7-1-2-3-3-6-3zm71 36l-1-4c-3 3-7 5-12 5-4 0-7-2-10-4s-4-5-4-9 2-8 5-10c3-3 8-4 14-4h6v-3c0-2 0-4-2-5l-5-2-6 2-2 4h-9l2-7 6-4c3-2 6-2 9-2 5 0 9 1 12 4 3 2 5 6 5 10v19l1 9v1zm-11-7l5-1 4-4v-8h-5l-8 2c-2 1-2 3-2 5l1 4zm59-14v21h-10V72h22c7 0 12 2 15 5 4 3 6 8 6 13 0 6-2 10-6 13-3 3-8 5-15 5zm0-8h12c4 0 6-1 8-3 2-1 3-4 3-7s-1-5-3-7-4-3-7-3h-13zm66 29l-1-4c-3 3-7 5-11 5s-8-2-11-4c-2-2-4-5-4-9s2-8 5-10c4-3 9-4 15-4h6v-3l-2-5-6-2-5 2c-2 1-2 2-2 4h-10c0-3 1-5 3-7 1-2 3-3 6-4 2-2 5-2 9-2 5 0 9 1 12 4 2 2 4 6 4 10v19l2 9v1zm-10-7l5-1 4-4v-8h-6l-8 2-2 5c0 2 0 3 2 4 1 1 2 2 5 2zm40-46v11h7v7h-7v23l1 4 3 1 4-1v8l-7 1c-7 0-11-4-11-12V94h-7v-7h7V76zm37 19h-4c-5 0-7 2-9 5v29h-9V87h9v4c2-3 5-5 9-5h4zm4 12l2-11c2-3 4-6 7-7 3-2 7-3 11-3 5 0 10 2 13 5 4 4 6 9 6 15v2l-2 11c-2 4-4 6-7 8s-6 3-10 3c-6 0-11-2-15-6-3-4-5-10-5-16zm9 1c0 5 1 8 3 10 2 3 4 4 8 4 3 0 5-1 7-4 2-2 3-6 3-11 0-4-1-7-3-10-2-2-4-4-7-4-4 0-6 2-8 4-2 3-3 6-3 11zm47-21v4c3-3 8-5 13-5 8 0 13 5 13 15v28h-9v-28l-2-5c-1-2-3-2-6-2-4 0-7 1-8 5v30h-10V87z' fill='#fff'/><path d='M165 39c-25 0-45 21-45 46s20 46 45 46 45-21 45-46-20-46-45-46' fill='#fff'/><path d='M83 161V39h23v122z' fill='#fff'/></svg></a></p><br></div></div>"
    modal_window("open",html);
}
function new_project(){
    var html="<div class='window' style='width:360px;'><div class='win_head'>New project<div class='window_close icon icon_close' onclick='modal_window(\"close\")'></div></div><hr><br><div style='overflow-x:hidden; overflow-y:auto; width:100%; max-height:60vh;'>"
        +"<p align='left' style=' margin-left:8px;'>Project folder/location</p>"
        +"<table style='width:100%;'><tbody><tr><td><input id='project_foler' onclick=\"json_file.value=null;load_new=true;json_file.click()\" class='input_text' style='padding-top:10px;' type='text'></td><td onclick=\"json_file.value=null;load_new=true;json_file.click()\" style='width:40px; cursor:pointer;' title='delet' class='icon icon_load'></td></tr></tbody></table><p class='text_tutorials_b select_tutorials'>"+texts.tutorials[3].en+"</p><br><br>"
        +"<p align='left' style=' margin-left:8px;'>Name project</p><table id='new_title'><tbody>"
        +"<tr><td style='padding-right:8px; border-right:1px solid var(--cb); width:40%; padding-top:10px;'><select class='title_lang'>"+big_languares()+"</select></td><td><input class='title_name input_text' placeholder='translated title' style='padding-top:10px;' type='text' value='"
        +story_script.parameters.title.en+"'></td><td onclick=\"var a=this.closest('tr'); a.parentElement.removeChild(a);\" style='width:40px; cursor:pointer;' title='delet' class='icon icon_del'></td></tr>"
        +"</tbody></table><div onclick=\"add_tr('new_title')\" class='icon icon_add' style='margin-top:16px;height:26px; width:26px; cursor:pointer;'></div>"
        +"</div><br><br><table class='big_button' width='256px' onclick='scen_editor_apply();open_tool();create_project();new_novel();'><tbody><tr><td width='42px' class='icon icon_ok'></td><td align='center'>Create project</td><td width='42px'></td></tr></tbody></table></div>"
    modal_window("open",html);
}
function build(){
    // Note: main build function that preprocesses the content and then builds into ZIP
    let story_build=(story_script.base)?JSON.parse(copy_arr):JSON.parse(JSON.stringify(story_script));
    if(story_script.base){story_build.base=JSON.parse(JSON.stringify(story_script.base));story_build.parameters.sounds=JSON.parse(JSON.stringify(story_script.base_sound));story_build.parameters.style_file=story_script.style_file;delete story_script.style_file;}
    var plugins_file="",plugins_code="",fonts="";
    if(story_script.parameters.plugins){for(var i=0;i<story_script.parameters.plugins.length;i++){
        if(plugins_list[story_script.parameters.plugins[i]]){
            if(plugins_list[story_script.parameters.plugins[i]].code){plugins_code+=plugins_list[story_script.parameters.plugins[i]].code+" "}
        else if(plugins_list[story_script.parameters.plugins[i]].file){plugins_file+="<script type='text/javascript' src='"+plugins_list[story_script.parameters.plugins[i]].file+"'><\/script>"}
        }else{plugins_file+=((plugins_list[story_script.parameters.plugins[i]])?"<script type='text/javascript' src='"+plugins_list[story_script.parameters.plugins[i]].file+"'><\/script>":"<script type='text/javascript' src='"+story_script.parameters.plugins[i]+"'><\/script>")}
    }}
    if(story_build.parameters.font_files){for(var i=0;i<Object.keys(story_build.parameters.font_files).length;i++){fonts+="@font-face{font-family:"+Object.keys(story_build.parameters.font_files)[i]+";src:url("+story_build.parameters.font_files[Object.keys(story_build.parameters.font_files)[i]]+");} "}}
    var par=[((story_script.parameters.font)?story_script.parameters.font:0),((story_script.parameters.font_size)?story_script.parameters.font_size:0),((story_script.parameters.icon)?story_script.parameters.icon:0)]
    if(story_build.parameters.characters&&Object.keys(story_build.parameters.characters).length==0){delete story_build.parameters.characters}
    if(story_build.parameters.sounds&&Object.keys(story_build.parameters.sounds).length==0){delete story_build.parameters.sounds}
    if(story_build.parameters.key&&Object.keys(story_build.parameters.key).length==0){delete story_build.parameters.key}
    if(story_build.parameters.style_file&&story_build.parameters.style_file.length==0){delete story_build.parameters.style_file}
    delete story_build.parameters['plugins'];
    delete story_build.parameters['font_size'];
    delete story_build.parameters['icon'];
    delete story_build.parameters.font_files;
    delete story_build.parameters.css;
    delete story_build.parameters.js;
    delete story_build.blocks;
    var story_preview=JSON.stringify(story_build)+((story_script.parameters.js)?";"+story_script.parameters.js:"");
    var dataStr="<!DOCTYPE html><html><head>"+((par[2]!=0)?"<link rel='shortcut icon' href='"+par[2]+"' type='image/x-icon'>":"")+"<meta charset='UTF-8'><meta name='viewport' content='initial-scale="+((story_script.parameters.scale)?story_script.parameters.scale:1)+",width=device-width,height=device-height,viewport-fit=cover,maximum-scale="+((story_script.parameters.scale)?story_script.parameters.scale:1)+",user-scalable=no'><style>"+((story_script.parameters.css)?story_script.parameters.css:"")+fonts+" "+((par[0]!=0)?"*{font-family:"+par[0]+";} ":"")+"body {"+((par[1]!=0)?"font-size:"+par[1]:"")+";background-color:var(--wn);border-collapse:collapse;border:none;margin:0;padding:0;border:0;border-spacing:0px;user-select:none;}<\/style><\/head><body><div id='tuesday' style='width:100%;height:100vh;'> <\/div><script type='text/javascript'>"+runtime+plugins_code+"<\/script>"+plugins_file+"<script>let story_novel="+story_preview+";load_story('data',story_novel);<\/script><\/body><\/html>";
    build_zip(dataStr);
}
function build_base_start(){
    modal_window("open","<div class='window' style='padding:24px 24px;'><table><tbody><tr><td style='width:32px;height:32px;background-repeat:no-repeat;background-size: 32px 32px;background-position:center;' class='img_wait'></td><td align='center' style='width:188px;'>Converting data to base64</td></tr></tbody></table></div>");
    copy_arr=JSON.stringify(story_script);arr_n=0;build_base(arr_n);
}
function build_base(){
    if(!story_script.base){story_script.base=[];story_script.base_sound={};}
    if(copy_arr.includes(project_files[arr_n][0])){
        const reader = new FileReader();
        reader.readAsDataURL(load_files[arr_n]);
        reader.onload=function(){
            if(project_files[arr_n][2].includes("image")||project_files[arr_n][2].includes("video")){story_script.base.push(reader.result); copy_arr=copy_arr.replaceAll('"'+project_files[arr_n][0]+'"',story_script.base.length);}
            else if(load_files[arr_n].name.includes(".mp3")&&project_files[arr_n][2].includes("audio")){
                if(story_script.parameters.sounds[project_files[arr_n][0]]){story_script.base_sound[project_files[arr_n][0]]=reader.result}
                else{story_script.base.push(reader.result); copy_arr=copy_arr.replaceAll('"'+project_files[arr_n][0]+'"',story_script.base.length);}
            }else if(story_script.parameters.style_file&&load_files[arr_n].name.includes(".css")&&story_script.parameters.style_file==project_files[arr_n][0]){story_script.style_file=reader.result}
            else if(project_files[arr_n][2]!="audio/mpeg"){copy_arr=copy_arr.replaceAll(project_files[arr_n][0],reader.result);}
            if(arr_n<load_files.length-1){arr_n++;build_base();}
            else if(arr_n==load_files.length-1){build(0);}
        }
    }else{
        if(arr_n<load_files.length-1){arr_n++;build_base();}
        else if(arr_n==load_files.length-1){build(0);}
    }
}

// TODO: assure this works
function postContentBlobToAPI(fileBlob) {
    // Assuming myBlob is your Blob object
    const formData = new FormData();
    formData.append('content', fileBlob, 'filename.zip');

    fetch(
        // TODO: assure we have an endpoint
        'http://localhost:8080/content',
        { method: 'POST', body: formData}
    ).then(response => response.json())
     .then(result => console.log('Success:', result))
     .catch(error => {
        console.error('Error:', error);
    });
}


function build_zip(dataStr){
    modal_window("open","<div class='window' style='padding:24px 24px;'><table><tbody><tr><td style='width:32px;height:32px;background-repeat:no-repeat;background-size: 32px 32px;background-position:center;' class='img_wait'></td><td align='center' style='width:144px;'>Creation ZIP archive</td></tr></tbody></table></div>");
    var arhiv = new JSZip();
    arhiv.file("index.html", dataStr);
    for(var f=0;f<project_files.length;f++){if(project_files[f][2]!="application/json"&&dataStr.includes(project_files[f][0])){arhiv.file(((project_files[f][2].includes('audio/mpeg'))?project_files[f][0]+'.mp3':project_files[f][0]),load_files[f],{binary:true});}}
    arhiv.generateAsync({type:"blob"})
    .then(function(content) {
        var n="new";
        if(story_script.parameters.title){n=(story_script.parameters.title.en)?story_script.parameters.title.en :story_script.parameters.title;}
        console.log("URL: ", URL.createObjectURL(content))
        var zipBlob = new Blob([content], { type: 'application/zip' });
        // TODO: make this function work and then remove the download_files call
        // postContentBlobToAPI(zipBlob);
        download_files(n+'_'+data_time()+'.zip',URL.createObjectURL(content))
        modal_window("close")
        toast('zip archive complete')
    });
}
function build_bot(){
    if(story_script.parameters.telegram && story_script.parameters.telegram.length>0){
        build(2);
    } else {
    	var html="<div class='window' style='width:360px;'><div class='win_head'>Build Telegram bot<div class='window_close icon icon_close' onclick='modal_window(\"close\")'></div></div><hr style='margin:0;'><p class='text_tutorials_a select_tutorials'>"+texts.tutorials[18].en+"</p>"
        +"<table style='width:100%;border-spacing:10px;border-collapse:separate;'><tbody><tr><td style='width:50px;white-space:nowrap;' align='right'>Token for bot:</td><td align='left'><input id='token_bot' class='input_text' type='text'></td></tr></tbody></table><br>"
		+"<br><table class='big_button' width='256px' onclick='story_script.parameters.telegram=token_bot.value;build_bot();modal_window(\"close\");'><tbody><tr><td width='42px' class='icon icon_ok'></td><td align='center'>Build</td><td width='42px'></td></tr></tbody></table></div>";
		modal_window("open",html);
    }
}
function jsonedit(arr){
	if(arr){var html="<div class='window' style='padding:0px 2px 16px 0px;width:calc(100vw - 32px);'>"
    +"<table style='width:100%;'><tbody><tr>"
    +"<td style='width:168px;'></td>"
    +"<td align='center'>JSON edit</td>"
    +"<td style='width:88px;'><input id='search_edit' onkeypress='if(event.key==\"Enter\"){search_text(\"editJson\",this.value)}' type='text' class='search' style='height:40px;width:100%;' placeholder='Search text'></td>"
    +"<td class='icon icon_search' style='width:60px;' onclick='search_text(\"editJson\",search_edit.value)'></td>"
    +"<td class='icon icon_close' style='width:40px;' onclick='modal_window(\"close\")'></td>"
    +"</tr></tbody></table><p><div class='codeView'><pre class='code_show'></pre><textarea id='editJson' class='code_text' spellcheck='false' wrap='off' oninput='code_edit(this,this.previousElementSibling,\"json\")'>"+JSON.stringify(arr_l[arr_n],null,'\t')+"</textarea></div><br><table class='big_button' width='256px' onclick='arr_l[arr_n]=JSON.parse(editJson.value);update_novel();state_save();modal_window(\"close\");toast(\"script updated\");menu_add.style.visibility=\"hidden\";'><tbody><tr><td width='42px' class='icon icon_ok'></td><td align='center'>Apply</td><td width='42px'></td></tr></tbody></table></div>"}
    else{var html="<div class='window' style='padding:0px 2px 16px 0px;width:calc(100vw - 32px);'>"
    +"<table style='width:100%;'><tbody><tr>"
    +"<td style='width:168px;'></td>"
    +"<td align='center'>JSON edit</td>"
    +"<td style='width:88px;'><input id='search_edit' onkeypress='if(event.key==\"Enter\"){search_text(\"editJson\",this.value)}' type='text' class='search' style='height:40px;width:100%;' placeholder='Search text'></td>"
    +"<td class='icon icon_search' style='width:60px;' onclick='search_text(\"editJson\",search_edit.value)'></td>"
    +"<td class='icon icon_close' style='width:40px;' onclick='modal_window(\"close\")'></td></tr></tbody></table>"
    +"<div class='codeView'><pre class='code_show'></pre><textarea id='editJson' class='code_text' spellcheck='false' wrap='off' oninput='code_edit(this,this.previousElementSibling,\"json\")'>"+JSON.stringify(story_script,null,'\t')+"</textarea></div></p><br><table class='big_button' width='256px' onclick='story_script=JSON.parse(editJson.value);if(story_script.blocks){block_colors()};update_novel();state_save();modal_window(\"close\");toast(\"script updated\");'><tbody><tr><td width='42px' class='icon icon_ok'></td><td align='center'>Apply</td><td width='42px'></td></tr></tbody></table></div>"}
    modal_window("open",html);code_edit(editJson,editJson.previousElementSibling,"json")
}
function big_languares(s){
    var lang='<optgroup>';
    for(let l=0;l<Object.keys(languares).length;l++){lang+="<option value='"+languares[Object.keys(languares)[l]]+"' "+((languares[Object.keys(languares)[l]]==s)?"selected":"")+">"+languares[Object.keys(languares)[l]].toUpperCase()+" - "+Object.keys(languares)[l]+"</option>"+((l==8)?"</optgroup><optgroup>":"")}
    return lang+='</optgroup>';
}
function create_project(){
    let li_n=document.getElementsByClassName("title_lang");
    let li_v=document.getElementsByClassName("title_name");
    story_script.parameters.title={};
    story_script.parameters.languares=[];
    for(var i=0;i<li_n.length;i++){
        story_script.parameters.title[li_n[i].value]=li_v[i].value
        story_script.parameters.languares.push(li_n[i].value);
    }
    languare=story_script.parameters.languares[0]
    modal_window("close");
    document.dispatchEvent(new Event('tue_story_new'));
    state_num=0;back_up=[];state_save();
    toast('New project created')
}
function new_block(){
    menu_add.style.visibility="hidden";
	var html="<div class='window' style='width:380px;'><div class='win_head'>New story block<div class='window_close icon icon_close' onclick='modal_window(\"close\")'></div></div><hr><br>"
		+"<form id='color_chec' onsubmit='return false;create_block();'><table style='width:100%;border-spacing:10px;border-collapse:separate;'><tbody><tr><td style='width:50px;white-space:nowrap;' align='right'>block id </td><td align='left'><input id='block_id' value='block "+(Object.keys(story_script).length-1)+"' class='input_text' type='text'></td></tr></tbody></table><br><p style=':14px;margin-left:12px;' align='left'>color block</p><br><table style='width:100%;border-spacing:4px;border-collapse:separate;'><tbody><tr>"
		+"<td align='center'><input style='background-color:"+((setup_editor.ui<7)?color_bg[0]:color_dg[0])+";' class='checkbox_b' type='radio' name='color' value='0'></td>"
		+"<td align='center'><input style='background-color:"+((setup_editor.ui<7)?color_bg[1]:color_dg[1])+";' class='checkbox_b' type='radio' name='color' value='1'></td>"
		+"<td align='center'><input style='background-color:"+((setup_editor.ui<7)?color_bg[2]:color_dg[2])+";' class='checkbox_b' type='radio' name='color' value='2'></td>"
		+"<td align='center'><input style='background-color:"+((setup_editor.ui<7)?color_bg[3]:color_dg[3])+";' class='checkbox_b' type='radio' name='color' value='3'></td>"
		+"<td align='center'><input style='background-color:"+((setup_editor.ui<7)?color_bg[4]:color_dg[4])+";' class='checkbox_b' type='radio' name='color' value='4'></td>"
		+"<td align='center'><input style='background-color:"+((setup_editor.ui<7)?color_bg[5]:color_dg[5])+";' class='checkbox_b' type='radio' name='color' value='5'></td>"
		+"<td align='center'><input style='background-color:transparent;border:1px solid var(--cw);' class='checkbox_b' type='radio' name='color' value='6'></td>"
		+"<td align='center'><input style='background-color:"+((setup_editor.ui<7)?color_bg[7]:color_dg[7])+";' class='checkbox_b' type='radio' name='color' value='7'></td>"
		+"<td align='center'><input style='background-color:"+((setup_editor.ui<7)?color_bg[8]:color_dg[8])+";' class='checkbox_b' type='radio' name='color' value='8'></td>"
		+"<td align='center'><input style='background-color:"+((setup_editor.ui<7)?color_bg[9]:color_dg[9])+";' class='checkbox_b' type='radio' name='color' value='9'></td>"
		+"<td align='center'><input style='background-color:"+((setup_editor.ui<7)?color_bg[10]:color_dg[10])+";' class='checkbox_b' type='radio' name='color' value='10'></td>"
		+"<td align='center'><input style='background-color:"+((setup_editor.ui<7)?color_bg[11]:color_dg[11])+";' class='checkbox_b' type='radio' name='color' value='11'></td>"
		+"<td align='center'><input style='background-color:"+((setup_editor.ui<7)?color_bg[12]:color_dg[12])+";' class='checkbox_b' type='radio' name='color' value='12'></td>"
		+"</tr></tbody></table></form><br><br><table class='big_button' width='256px' onclick='create_block()'><tbody><tr><td width='42px' class='icon icon_ok'></td><td align='center'>Create block</td><td width='42px'></td></tr></tbody></table></div>"
    modal_window("open",html);
}
function create_block(){
    if(block_id.value.length<5){toast('Name at least 5 characters')}
    else if(/^[\w\s]+$/i.test(block_id.value)){
        var color_chec=document.forms.color_chec;
        for(let i=0;i<color_chec.length;i++){
            if(color_chec[i].checked){
            color_chec=(setup_editor.ui<7)?color_bg[color_chec[i].value]:color_dg[color_chec[i].value]
            break;}
        }
        var new_id=correct_name(block_id.value);
        if(new_id!=''&&!story_script[new_id]){
            if(Object.keys(story_script).length<=2){story_script.parameters.launch_story=new_id}
            story_script[new_id]=[];
            for(var i=0 ;i<Object.keys(story_script).length;i++){if(Object.keys(story_script)[i]==new_id){creation_block(i);break;}}
            new_id=document.getElementById(new_id)
            var rect=new_id.getBoundingClientRect();
            new_id.style.backgroundColor=color_chec;
            new_id.style.left=html.scrollLeft+((html.clientWidth/2)-(rect.width/2))+"px";
            new_id.style.top=html.scrollTop+((html.clientHeight/2)-(rect.height/2))+"px";
            new_id.style.animation="flash 2s 1";
            new_id.style.WebkitAnimation="flash 2s 1";
            control_dlock()
            toast("New block created");
            modal_window('close');
        }else if(story_script[new_id]){
            toast("This name is used by other blocks");
            modal_window('close');
        }else{
            toast("block id not entered");
            modal_window('close');
        }
        story_script.blocks[new_id.id]=[new_id.style.left,new_id.style.top,document.getElementById(new_id.id+"_content").style.display,((typeof color_chec==='object')?false:color_chec)]
        state_save();
    }else{toast('Only latin characters & numbers')}
}
function edit_block(id){
	var html="<div class='window' style='width:360px;'><div class='win_head'>Edit story block<div class='window_close icon icon_close' onclick='modal_window(\"close\")'></div></div><hr><br>"
		+"<form id='color_chec' onsubmit='return false;updata_block(\""+id+"\");'><table style='width:100%;border-spacing:10px;border-collapse:separate;'><tbody><tr><td style='width:50px;white-space:nowrap;' align='right'>block id </td><td align='left'><input id='block_id' class='input_text' type='text' value="+id+"></td></tr></tbody></table><br><p style=' margin-left:12px;' align='left'>color block</p><br><table style='border-spacing:4px;border-collapse:separate;'><tbody><tr>"
		+"<td align='center'><input style='background-color:"+((setup_editor.ui<7)?color_bg[0]:color_dg[0])+";' class='checkbox_b' type='radio' name='color' value='0'></td>"
		+"<td align='center'><input style='background-color:"+((setup_editor.ui<7)?color_bg[1]:color_dg[1])+";' class='checkbox_b' type='radio' name='color' value='1'></td>"
		+"<td align='center'><input style='background-color:"+((setup_editor.ui<7)?color_bg[2]:color_dg[2])+";' class='checkbox_b' type='radio' name='color' value='2'></td>"
		+"<td align='center'><input style='background-color:"+((setup_editor.ui<7)?color_bg[3]:color_dg[3])+";' class='checkbox_b' type='radio' name='color' value='3'></td>"
		+"<td align='center'><input style='background-color:"+((setup_editor.ui<7)?color_bg[4]:color_dg[4])+";' class='checkbox_b' type='radio' name='color' value='4'></td>"
		+"<td align='center'><input style='background-color:"+((setup_editor.ui<7)?color_bg[5]:color_dg[5])+";' class='checkbox_b' type='radio' name='color' value='5'></td>"
		+"<td align='center'><input style='background-color:transparent;border:1px solid var(--cw);' class='checkbox_b' type='radio' name='color' value='6'></td>"
		+"<td align='center'><input style='background-color:"+((setup_editor.ui<7)?color_bg[7]:color_dg[7])+";' class='checkbox_b' type='radio' name='color' value='7'></td>"
		+"<td align='center'><input style='background-color:"+((setup_editor.ui<7)?color_bg[8]:color_dg[8])+";' class='checkbox_b' type='radio' name='color' value='8'></td>"
		+"<td align='center'><input style='background-color:"+((setup_editor.ui<7)?color_bg[9]:color_dg[9])+";' class='checkbox_b' type='radio' name='color' value='9'></td>"
		+"<td align='center'><input style='background-color:"+((setup_editor.ui<7)?color_bg[10]:color_dg[10])+";' class='checkbox_b' type='radio' name='color' value='10'></td>"
		+"<td align='center'><input style='background-color:"+((setup_editor.ui<7)?color_bg[11]:color_dg[11])+";' class='checkbox_b' type='radio' name='color' value='11'></td>"
		+"<td align='center'><input style='background-color:"+((setup_editor.ui<7)?color_bg[12]:color_dg[12])+";' class='checkbox_b' type='radio' name='color' value='12'></td>"
		+"</tr></tbody></table></form><br><br><table class='big_button' width='256px' onclick='delet_block(\""+id+"\");'><tbody><tr><td width='42px' class='icon icon_del'></td><td align='center'>Delete block</td><td width='42px'></td></tr></tbody></table><br><table class='big_button' width='256px' onclick='updata_block(\""+id+"\")'><tbody><tr><td width='42px' class='icon icon_ok'></td><td align='center'>Update block</td><td width='42px'></td></tr></tbody></table> </div>";
    modal_window("open",html);
}
function delet_block(id){
	delete story_script[id];
    if(story_script.parameters.launch_story==id){
        for(let i=0;i<color_chec.length;i++){
            if(Object.keys(story_script)[i]!='parameters'&&Object.keys(story_script)[i]!='blocks'){story_script.parameters.launch_story=Object.keys(story_script)[i];break;}
        }
    }
	update_novel();state_save();
	toast("Block removed");
	modal_window('close');
}
function updata_block(old_id){
    if(block_id.value.length<5){toast('Name at least 5 characters')}
    else if(/^[\w\s]+$/i.test(block_id.value)){
        var color_chec=document.forms.color_chec;
        for(let i=0;i<color_chec.length;i++){
            if(color_chec[i].checked){
            story_script.blocks[old_id][3]=(setup_editor.ui<7)?color_bg[color_chec[i].value]:color_dg[color_chec[i].value]
            document.getElementById(old_id).style.backgroundColor=color_bg[color_chec[i].value]
            break;}
        }
        var new_id=correct_name(block_id.value);
        if(old_id!=new_id&&!story_script[new_id]){
            var story_rename=JSON.stringify(story_script)
            story_script=JSON.parse(story_rename.replaceAll(old_id,new_id));
            parse_story();
            toast("Block updated");
        }else if(story_script[new_id]){toast("This name is used by other blocks");}
        modal_window ('close');
        update_novel();state_save();
    }else{toast('Only latin characters & numbers')}
}
function file_catalog(id,files,area,preview,arr){
    var code,f,t,a;
    if(project_files.length==0){
        code="<div class='window' style='position:fixed;width:360px;'><div class='win_head'>Project folder/location<div class='window_close icon icon_close' onclick=\"menu_add.style.visibility='hidden';scroll_block=true;\"></div></div><hr><br><div style='overflow-x:hidden;overflow-y:auto;width:100%;max-height:60vh;'>"
        +"<table style='width:100%;'><tbody><tr><td><input id='project_foler' onclick=\"json_file.value=null;load_new=true;json_file.click();menu_add.style.visibility='hidden';\" class='input_text' style='padding-top:10px;' type='text'></td><td onclick=\"json_file.value=null;load_new=true;json_file.click();menu_add.style.visibility='hidden';\" style='width:40px;cursor:pointer;' title='delet' class='icon icon_load'></td></tr></tbody></table><p class='text_tutorials_b select_tutorials'>"+texts.tutorials[3].en+"</p><br><br>"
        +"</div><br><br><table class='big_button' width='256px' onclick=\"menu_add.style.visibility='hidden';scroll_block=true;\"><tbody><tr><td width='42px' class='icon icon_ok'></td><td align='center'>Apply</td><td width='42px'></td></tr></tbody></table></div>"
    }else{
        code='<div class="window" style="width:480px;position:fixed;"><table style="width:100%;"><tbody><tr>'
            +'<td style="height:40px;border-radius:16px 16px 0 0;border-bottom:1px solid var(--cb);" align="center" onclick="" width="52px"></td>'
            +'<td style="height:40px;border-radius:16px 16px 0 0;border-bottom:1px solid var(--cb);" align="center">File selection</td>'
            +'<td style="height:40px;border-radius:16px 16px 0 0;border-bottom:1px solid var(--cb);" align="center" title="update working folder" onclick="json_file.value=null;load_new=true;json_file.click();menu_add.style.visibility=\'hidden\';" width="52px" class="icon icon_load"></td>'
            +'<td style="height:40px;border-radius:16px 16px 0 0;border-bottom:1px solid var(--cb);" align="center" width="88px"><input type="text" class="search" id="search_file" onkeyup="search_file()" placeholder="search file"></td>'
            +'<td style="height:40px;border-radius:16px 16px 0 0;border-bottom:1px solid var(--cb);background-position:right center;cursor:pointer;" align="center" onclick="menu_add.style.visibility=\'hidden\';if(audio_preplay.currentTime>0){audio_preplay.currentTime=0;audio_preplay.pause()}" width="40px" class="icon icon_close"></td>'
            +'</tr><tr><td colspan="5"><div style="overflow-x:hidden;overflow-y:auto;max-height:80vh;"><table style="width:100%;"><tbody>'
        if(id.includes('artt')){a=id.replace("artt","art")}
        else{a=''}
        if(files=='img'){
            files=['.jpg','.JPG','.svg','.SVG','.gif','.GIF','.jpeg','.JPEG','.png','.PNG','.webp','.WEBP','.apng','.APNG','.aPNG','.bmp','.BMP'];
            for(f=0;f<project_files.length;f++){for(t=0;t<files.length;t++){if(project_files[f][0].includes(files[t])){code+='<tr><td class="add_el add_file" title="'+project_files[f][0]+'" style="height:64px;padding:4px;border-bottom:1px solid var(--cb);" onclick="'+((a.length>1)?a+'.src=\''+project_files[f][1]+'\';':'')+' '+arr+'=\''+project_files[f][0]+'\';'+((area.length>1)?area+'.value=\''+project_files[f][0]+'\';':'')+((preview.length>1)?preview+'.style.backgroundImage=\'url('+project_files[f][1]+')\';':((preview==1)?'scen_edit_update(true);':''))+'menu_add.style.visibility=\'hidden\';'+((tool_update)?tool_update+';':'')+'"><table style="height:64px;"><tbody><tr><td width="64px" height="64px" style=\'content-visibility:auto;background-image:url(\"'+project_files[f][1]+'\");background-size:contain;background-repeat:no-repeat;background-position:center;\'></td><td style="padding:0px 8px;word-break:break-all;">'+project_files[f][0]+'</td></tr></tbody></table></td></tr>'}}}
        }else if(files=='audio'){
            files=['audio/mpeg'];
            for(f=0;f<project_files.length;f++){for(t=0;t< files.length;t++){if(project_files[f][2].includes(files[t])){code+='<tr><td class="add_el add_file" title="'+project_files[f][0]+'" style="height:64px;padding:4px;border-bottom:1px solid var(--cb);" onclick="var n='+((id!='files_auio')?'add_audio(\''+project_files[f][0]+'\')':'\''+project_files[f][0]+'\'')+';'+arr+'=n;'+area+'.value=n;menu_add.style.visibility=\'hidden\';audio_preplay.currentTime=0;audio_preplay.pause();'+((preview=='update')?'update_novel();':'')+'"><table style="height:64px;"><tbody><tr><td width="64px" height="64px" class="icon_m icon_audio_play" onclick="preplay_audio(\''+project_files[f][0]+'\');event.stopPropagation();"></td><td style="padding:0px 8px;word-break:break-all;">'+project_files[f][0]+((project_files[f][0].length<4)?' ⨻ warning short name':'')+'</td></tr></tbody></table></td></tr>'}}}
        }else if(files=='video'){
            files=['video/mp4'];
            for(f=0;f<project_files.length;f++){for(t=0;t< files.length;t++){if(project_files[f][2].includes(files[t])){code+='<tr><td class="add_el add_file" title="'+project_files[f][0]+'" style="height:64px;padding:4px;border-bottom:1px solid var(--cb);" onclick="'+arr+'=\''+project_files[f][0]+'\';'+area+'.value=\''+project_files[f][0]+'\';menu_add.style.visibility=\'hidden\';'+preview+'.innerHTML=preview_video(\''+project_files[f][0]+'\');"><table style="height:64px;"><tbody><tr><td width="40px" height="40px" class="icon_m icon_video"></td><td style="padding:0px 8px;word-break:break-all;">'+project_files[f][0]+'</td></tr></tbody></table></td></tr>'}}}
        }else if(files=='js'){
            files=['javascript'];
            for(f=0;f<project_files.length;f++){for(t=0;t< files.length;t++){if(project_files[f][2].includes(files[t])){code+='<tr><td class="add_el add_file" title="'+project_files[f][0]+'" style="height:64px;padding:4px;border-bottom:1px solid var(--cb);" onclick="'+arr+'=\''+project_files[f][0]+'\';'+area+'.value=\''+project_files[f][0]+'\';menu_add.style.visibility=\'hidden\';"><table style="height:64px;"><tbody><tr><td width="40px" height="40px" class="icon_m icon_new"></td><td style="padding:0px 8px;word-break:break-all;">'+project_files[f][0]+'</td></tr></tbody></table></td></tr>'}}}
        }else if(files=='font'){
            files=['.ttf','.woff'];
            for(f=0;f<project_files.length;f++){for(t=0;t< files.length;t++){if(project_files[f][0].includes(files[t])){code+='<tr><td class="add_el add_file" title="'+project_files[f][0]+'" style="height:64px;padding:4px;border-bottom:1px solid var(--cb);" onclick="'+arr+'=\''+project_files[f][0]+'\';'+area+'.value=\''+project_files[f][0]+'\';menu_add.style.visibility=\'hidden\';"><table style="height:64px;"><tbody><tr><td width="40px" height="40px" class="icon_m icon_new"></td><td style="padding:0px 8px;word-break:break-all;">'+project_files[f][0]+'</td></tr></tbody></table></td></tr>'}}}
        }else{
            files=[files];
            for(f=0;f<project_files.length;f++){for(t=0;t<files.length;t++){if(project_files[f][0].includes(files[t])){code+='<tr><td class="add_el add_file" title="'+project_files[f][0]+'" style="height:64px;padding:4px;border-bottom:1px solid var(--cb);" onclick="'+arr+'=\''+project_files[f][0]+'\';'+area+'.value=\''+project_files[f][0]+'\';menu_add.style.visibility=\'hidden\';"><table style="height:64px;"><tbody><tr><td width="40px" height="40px" class="icon_m icon_new"></td><td style="padding:0px 8px;word-break:break-all;">'+project_files[f][0]+'</td></tr></tbody></table></td></tr>'}}}
        };code+='</tbody></table></div></td></tr><tr><td colspan="5" style="border-radius:0 0 16px 16px;height:16px;"></td></tr></tbody></table></div>'
    }
    menu_add.innerHTML=code
    menu_add.style.visibility='visible';
}
function add_audio(d){
    if(!story_script.parameters.sounds){story_script.parameters.sounds={};}
    n=d.split("/")[d.split("/").length-1]
    if(!story_script.parameters.sounds[n]){story_script.parameters.sounds[n]=d}
    return n
}
function add_plugin(p){
    if(!story_script.parameters.plugins){story_script.parameters.plugins=[]}
    if(!story_script.parameters.plugins.includes(p)){story_script.parameters.plugins.push(p)}
}
function add_element_b(id,arr){
    var code='<div class="add_w" style="width:220px;"><table style="width:100%;"><tbody>'
        +'<tr><td style="height:40px;border-radius:16px 16px 0 0;border-bottom:1px solid var(--cb);" align="center">Add to block \''+arr+'\'</td></tr>'
        +((buf[0]=='scene')?'<tr><td class="add_el" style="border-bottom:1px solid var(--cb);" onclick="arr_n=\''+arr+'\';data_past();menu_add.style.visibility=\'hidden\';"><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_paste"></td><td>paste scene</td></tr></tbody></table></td></tr>':'')
        +'<tr><td class="add_el" style="border-bottom:1px solid var(--cb);" onclick="scene_add(\''+arr+'\');menu_add.style.visibility=\'hidden\';"><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_art"></td><td>Scene</td></tr></tbody></table></td></tr>'
        +'<tr><td class="add_el" style="border-bottom:1px solid var(--cb);" onclick="add_plugin(\'terrain_map\');menu_add.style.visibility=\'hidden\';ho_add(\''+arr+'\',\'terrain_map\');"><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_map"></td><td>'+plugins_list.terrain_map.name+'</td></tr></tbody></table></td></tr>'
        +'<tr><td class="add_el" style="border-bottom:1px solid var(--cb);" onclick="add_plugin(\'hidden_objects\');menu_add.style.visibility=\'hidden\';ho_add(\''+arr+'\',\'hidden_objects\');"><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_search"></td><td>'+plugins_list.hidden_objects.name+'</td></tr></tbody></table></td></tr>'
        +'<tr><td class="add_el" style="border-bottom:1px solid var(--cb);" onclick="'+((story_script.parameters.variables&&Object.keys(story_script.parameters.variables).length>0)?'legacy_choice_add(\''+arr+'\')':'setup();set_menu(4);')+';menu_add.style.visibility=\'hidden\';"><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_choice"></td><td>Legacy choice</td></tr></tbody></table></td></tr>'
        +'<tr><td class="add_el" style="border-bottom:1px solid var(--cb);" onclick="random_choice_add(\''+arr+'\');menu_add.style.visibility=\'hidden\';"><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_random"></td><td>Random choice</td></tr></tbody></table></td></tr>'
        +'<tr><td class="add_el" style="border-radius:0 0 16px 16px;" onclick="menu_add.style.visibility=\'hidden\';"><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_close"></td><td>Cancel</td></tr></tbody></table></td></tr>'
        +'</tbody></table></div>'
	menu_view(id,code,48)
}
function add_element_s(id,n){
    var code='<div class="add_w" style="width:220px;"><table style="width:100%;"><tbody>'
        +'<tr><td style="height:40px;border-radius:16px 16px 0 0;border-bottom:1px solid var(--cb);" align="center">Add to scene '+n+'</td></tr>'
        +((buf[0]=='dialogs')?'<tr><td class="add_el" style="border-bottom:1px solid var(--cb);" onclick="arr_l=story_script[scen_data[0]];arr_n=scen_data[1];data_past();menu_add.style.visibility=\'hidden\';"><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_paste"></td><td>Paste dialog</td></tr></tbody></table></td></tr>':'')
        +'<tr><td class="add_el" style="border-bottom:1px solid var(--cb);" onclick="dialog_add();state_save();menu_add.style.visibility=\'hidden\';"><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_textadd"></td><td>Add dialog</td></tr></tbody></table></td></tr>'
        +'<tr><td class="add_el" style="border-bottom:1px solid var(--cb);" onclick=\'dialog_add();arr_l=arr_l[arr_n];arr_n="back_to";element_to();state_save();menu_add.style.visibility="hidden";\'><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_back"></td><td>Back to</td></tr></tbody></table></td></tr>'
        +'<tr><td class="add_el" style="border-bottom:1px solid var(--cb);" onclick=\'dialog_add();arr_l=arr_l[arr_n];arr_n="art";scen_editor("'+scen_data[0]+'",'+scen_data[1]+','+scen_data[2]+');scen_edit_data();menu_add.style.visibility="hidden";\'><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_art"></td><td>Art</td></tr></tbody></table></td></tr>'
        +'<tr><td class="add_el" style="border-bottom:1px solid var(--cb);" onclick=\'dialog_add();arr_l=arr_l[arr_n];arr_n="text";element_to();dialog_text_edit();menu_add.style.visibility="hidden";\'><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_text"></td><td>Text</td></tr></tbody></table></td></tr>'
        +'<tr><td class="add_el" style="border-bottom:1px solid var(--cb);" onclick=\'dialog_add();arr_l=arr_l[arr_n];arr_n="text_add";element_to();dialog_text_edit();menu_add.style.visibility="hidden";\'><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_textadd"></td><td>Text add</td></tr></tbody></table></td></tr>'
        +'<tr><td class="add_el" style="border-bottom:1px solid var(--cb);" onclick="dialog_add();arr_l=arr_l[arr_n];arr_n=\'choice\';element_to();menu_add.style.visibility=\'hidden\';"><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_choice"></td><td>Choice ph3</td></tr></tbody></table></td></tr>'
        +'<tr><td class="add_el" style="border-bottom:1px solid var(--cb);" onclick="dialog_add();arr_l=arr_l[arr_n];arr_n=\'video\';element_to();dialog_video_edit();"><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_video"></td><td>Video</td></tr></tbody></table></td></tr>'
        +'<tr><td class="add_el" style="border-bottom:1px solid var(--cb);" onclick="dialog_add();arr_l=arr_l[arr_n];arr_n=\'sound_stop\';element_to();dialog_audio_edit(\''+id+'\');"><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_audio_off"></td><td>Stop sound</td></tr></tbody></table></td></tr>'
        +'<tr><td class="add_el" style="border-bottom:1px solid var(--cb);" onclick="dialog_add();arr_l=arr_l[arr_n];arr_n=\'sound\';element_to();dialog_audio_edit(\''+id+'\');"><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_audio_play"></td><td>Play sound'+((story_script.parameters.launch_story==scen_data[0]&&scen_data[1]==0&& arr_l.length<1)?' ⨻ warning blocks':'')+'</td></tr></tbody></table></td></tr>'
        +'<tr><td class="add_el" style="border-bottom:1px solid var(--cb);" onclick="dialog_add();arr_l=arr_l[arr_n];arr_n=\'timer\';element_to();state_save();menu_add.style.visibility=\'hidden\';"><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_timer"></td><td>Timer</td></tr></tbody></table></td></tr>'
        +'<tr><td class="add_el" style="border-bottom:1px solid var(--cb);" onclick=\' '+((story_script.parameters.variables&&Object.keys(story_script.parameters.variables).length>0)?'dialog_add();arr_l=arr_l[arr_n];arr_n="variables";element_to();':'setup();set_menu(4);')+' menu_add.style.visibility="hidden";\'><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_var"></td><td>Variables</td></tr></tbody></table></td></tr>'
        +'<tr><td class="add_el" style="border-bottom:1px solid var(--cb);" onclick=\'dialog_add();arr_l=arr_l[arr_n];arr_n="go_to";element_to();state_save();menu_add.style.visibility="hidden";\'><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_goto"></td><td>Go to</td></tr></tbody></table></td></tr>'
        +'<tr><td class="add_el" style="border-bottom:1px solid var(--cb);" onclick=\'dialog_add();arr_l=arr_l[arr_n];arr_n="event";element_to();state_save();menu_add.style.visibility="hidden";\'><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_event"></td><td>ID event</td></tr></tbody></table></td></tr>'
        +'<tr><td class="add_el" style="border-bottom:1px solid var(--cb);" onclick=\'dialog_add();arr_l=arr_l[arr_n];arr_n="controll";element_to();state_save();menu_add.style.visibility="hidden";\'><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_controll"></td><td>Hide interface</td></tr></tbody></table></td></tr>'
        +'<tr><td class="add_el" style="border-bottom:1px solid var(--cb);" onclick=\'dialog_add();arr_l=arr_l[arr_n];arr_n="no_autosave";element_to();state_save();menu_add.style.visibility="hidden";\'><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_save"></td><td>No autosave</td></tr></tbody></table></td></tr>'
        +'<tr><td class="add_el" style="border-bottom:1px solid var(--cb);" onclick="dialog_add();arr_l=arr_l[arr_n];arr_n=\'html\';edit_html();menu_add.style.visibility=\'hidden\';"><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_html"></td><td>HTML code</td></tr></tbody></table></td></tr>'
        +'<tr><td class="add_el" style="border-bottom:1px solid var(--cb);" onclick="dialog_add();copy_arr=arr_l[arr_n];edit_code(\'js\',\'JavaScript\');menu_add.style.visibility=\'hidden\';"><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_js"></td><td>JavaScript code</td></tr></tbody></table></td></tr>'
        +((story_script.parameters.plugins)?((story_script.parameters.plugins.includes("show_toast"))?'<tr><td class="add_el" style="border-bottom:1px solid var(--cb);" onclick="dialog_add();arr_l=arr_l[arr_n];arr_n=\'toast\';edit_toast();menu_add.style.visibility=\'hidden\';"><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_toast"></td><td>'+plugins_list.show_toast.name+'</td></tr></tbody></table></td></tr>':''):'')
        +'<tr><td class="add_el" style="border-radius:0 0 16px 16px;" onclick="menu_add.style.visibility=\'hidden\';"><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_close"></td><td>Cancel</td></tr></tbody></table></td></tr>'
        +'</tbody></table></div>'
	menu_view(id,code,48)
}
function add_element_d(id,n){
    var code='<div class="add_w" style="width:220px;"><table style="width:100%;"><tbody>'
        +'<tr><td style="height:40px;border-radius:16px 16px 0 0;border-bottom:1px solid var(--cb);" align="center">Add element to dialog '+n+'</td></tr>'
        +((buf[0]!='scene'&&buf[0]!='dialogs'&&buf[0]!='')?'<tr><td class="add_el" style="border-bottom:1px solid var(--cb);" onclick="arr_l=story_script[scen_data[0]][scen_data[1]].dialogs;arr_n=scen_data[2]-1;data_past();menu_add.style.visibility=\'hidden\';"><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_paste"></td><td>Paste '+buf[0]+'</td></tr></tbody></table></td></tr>':'')
        +((arr_l.back_to)?'':'<tr><td class="add_el" style="border-bottom:1px solid var(--cb);" onclick=\'arr_n="back_to";element_to();state_save();menu_add.style.visibility="hidden";\'><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_back"></td><td>Back to</td></tr></tbody></table></td></tr>')
        +((arr_l.art)?'':'<tr><td class="add_el" style="border-bottom:1px solid var(--cb);" onclick=\'arr_n="art";scen_editor("'+scen_data[0]+'",'+scen_data[1]+','+scen_data[2]+');scen_edit_data();menu_add.style.visibility="hidden";\'><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_art"></td><td>Art</td></tr></tbody></table></td></tr>')
        +((arr_l.text||arr_l.text_add)?'':'<tr><td class="add_el" style="border-bottom:1px solid var(--cb);" onclick=\'arr_n="text";element_to();dialog_text_edit();menu_add.style.visibility="hidden";\'><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_text"></td><td>Text</td></tr></tbody></table></td></tr>')
        +((arr_l.text||arr_l.text_add)?'':'<tr><td class="add_el" style="border-bottom:1px solid var(--cb);" onclick=\'arr_n="text_add";element_to();dialog_text_edit();menu_add.style.visibility="hidden";\'><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_textadd"></td><td>Text add</td></tr></tbody></table></td></tr>')
        +((arr_l.choice)?'':'<tr><td class="add_el" style="border-bottom:1px solid var(--cb);" onclick="arr_n=\'choice\';element_to();menu_add.style.visibility=\'hidden\';"><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_choice"></td><td>Choice</td></tr></tbody></table></td></tr>')
        +((arr_l.video)?'':'<tr><td class="add_el" style="border-bottom:1px solid var(--cb);" onclick=\'arr_n="video";element_to();dialog_video_edit();\'><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_video"></td><td>Video</td></tr></tbody></table></td></tr>')
        +((arr_l.sound_stop)?'':'<tr><td class="add_el" style="border-bottom:1px solid var(--cb);" onclick=\'arr_n="sound_stop";element_to();dialog_audio_edit("'+id+'");\'><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_audio_off"></td><td>Stop sound</td></tr></tbody></table></td></tr>')
        +((arr_l.sound)?'':'<tr><td class="add_el" style="border-bottom:1px solid var(--cb);" onclick=\'arr_n="sound";element_to();dialog_audio_edit("'+id+'");\'><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_audio_play"></td><td>Play sound'+((story_script.parameters.launch_story==scen_data[0]&&scen_data[1]==0&&scen_data[2]==1)?' ⨻ warning blocks':'')+'</td></tr></tbody></table></td></tr>')
        +((arr_l.timer)?'':'<tr><td class="add_el" style="border-bottom:1px solid var(--cb);" onclick="arr_n=\'timer\';element_to();state_save();menu_add.style.visibility=\'hidden\';"><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_timer"></td><td>Timer</td></tr></tbody></table></td></tr>')
        +((arr_l.variables)?'':'<tr><td class="add_el" style="border-bottom:1px solid var(--cb);" onclick=\' '+((story_script.parameters.variables&&Object.keys(story_script.parameters.variables).length>0)?'arr_n="variables";element_to();':'setup();set_menu(4);')+' menu_add.style.visibility="hidden";\'><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_var"></td><td>Variables</td></tr></tbody></table></td></tr>')
        +((arr_l.go_to)?'':'<tr><td class="add_el" style="border-bottom:1px solid var(--cb);" onclick=\'arr_n="go_to";element_to();state_save();menu_add.style.visibility="hidden";\'><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_goto"></td><td>Go to</td></tr></tbody></table></td></tr>')
        +((arr_l.event)?'':'<tr><td class="add_el" style="border-bottom:1px solid var(--cb);" onclick=\'arr_n="event";element_to();state_save();menu_add.style.visibility="hidden";\'><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_event"></td><td>ID event</td></tr></tbody></table></td></tr>')
        +((arr_l.controll)?'':'<tr><td class="add_el" style="border-bottom:1px solid var(--cb);" onclick=\'arr_n="controll";element_to();state_save();menu_add.style.visibility="hidden";\'><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_controll"></td><td>Hide interface</td></tr></tbody></table></td></tr>')
        +((arr_l.no_autosave)?'':'<tr><td class="add_el" style="border-bottom:1px solid var(--cb);" onclick=\'arr_n="no_autosave";element_to();state_save();menu_add.style.visibility="hidden";\'><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_save"></td><td>No autosave</td></tr></tbody></table></td></tr>')
        +((arr_l.html)?'':'<tr><td class="add_el" style="border-bottom:1px solid var(--cb);" onclick="arr_n=\'html\';edit_html();menu_add.style.visibility=\'hidden\';"><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_html"></td><td>HTML code</td></tr></tbody></table></td></tr>')
        +((arr_l.js)?'':'<tr><td class="add_el" style="border-bottom:1px solid var(--cb);" onclick="copy_arr=arr_l;edit_code(\'js\',\'JavaScript\');menu_add.style.visibility=\'hidden\';"><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_js"></td><td>JavaScript code</td></tr></tbody></table></td></tr>')
        +((story_script.parameters.plugins)?((!arr_l.toast&&story_script.parameters.plugins.includes("show_toast"))?'<tr><td class="add_el" style="border-bottom:1px solid var(--cb);" onclick="arr_n=\'toast\';edit_toast();menu_add.style.visibility=\'hidden\';"><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_toast"></td><td>Toast</td></tr></tbody></table></td></tr>':''):'')
        +'<tr><td class="add_el" style="border-radius:0 0 16px 16px;" onclick="menu_add.style.visibility=\'hidden\';"><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_close"></td><td>Cancel</td></tr></tbody></table></td></tr>'
        +'</tbody></table></div>'
	menu_view(id,code,130)
}
function dialog_m(id,n,block,i){
	var code='<div class="add_w" style="width:220px;"><table style="width:100%;"><tbody>'
        +'<tr><td style="height:40px;border-radius:16px 16px 0 0;border-bottom:1px solid var(--cb);" align="center">Dialog '+n+'</td></tr>'
        +'<tr><td class="add_el" style="border-bottom:1px solid var(--cb);" onclick="scen_editor(\''+block+'\','+i+','+n+');scen_edit_data();menu_add.style.visibility=\'hidden\';"><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_layout"></td><td>Scene edit</td></tr></tbody></table></td></tr>'
        +'<tr><td class="add_el" style="border-bottom:1px solid var(--cb);" onclick="duplicat_arr();menu_add.style.visibility=\'hidden\';"><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_copu"></td><td>Duplicate</td></tr></tbody></table></td></tr>'
        +'<tr><td class="add_el" style="border-bottom:1px solid var(--cb);" onclick="data_copy(\'dialogs\');element_del();menu_add.style.visibility=\'hidden\';"><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_cut"></td><td>Cut</td></tr></tbody></table></td></tr>'
        +'<tr><td class="add_el" style="border-bottom:1px solid var(--cb);" onclick="data_copy(\'dialogs\');menu_add.style.visibility=\'hidden\';"><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_copy"></td><td>Copy dialog</td></tr></tbody></table></td></tr>'
        +((buf[0]!='scene'&&buf[0]!='dialogs'&&buf[0]!=''&&!buf[0].includes('update'))?'<tr><td class="add_el" style="border-bottom:1px solid var(--cb);" onclick="data_past();menu_add.style.visibility=\'hidden\';toast(\'Paste '+((buf[0]=='js')?'JavaScript':buf[0])+'\')"><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_paste"></td><td>Paste '+((buf[0]=='js')?'JavaScript':buf[0])+'</td></tr></tbody></table></td></tr>':'')
        +((buf[0]=='dialogs')?'<tr><td class="add_el" style="border-bottom:1px solid var(--cb);" onclick="arr_l[arr_n]=JSON.parse(buf[1]);menu_add.style.visibility=\'hidden\';update_novel();toast(\'Scene replaced\');"><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_refrash"></td><td>Replace scene</td></tr></tbody></table></td></tr><tr><td class="add_el" style="border-bottom:1px solid var(--cb);" onclick="arr_l.splice(arr_n+1,0,JSON.parse(buf[1]));menu_add.style.visibility=\'hidden\';update_novel();"><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_paste"></td><td>Paste '+buf[0]+' below</td></tr></tbody></table></td></tr>':'')
        +'<tr><td class="add_el" style="border-bottom:1px solid var(--cb);" onclick="jsonedit(true);menu_add.style.visibility=\'hidden\';"><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_json"></td><td>JSON</td></tr></tbody></table></td></tr>'
        +'<tr><td class="add_el" style="border-bottom:1px solid var(--cb);" onclick="element_del();menu_add.style.visibility=\'hidden\';"><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_del"></td><td>Delete</td></tr></tbody></table></td></tr>'
        +'<tr><td class="add_el" style="border-bottom:1px solid var(--cb);" onclick="scen_data[1]='+i+';scen_data[2]='+n+';play_novel(\''+block+'\',true);menu_add.style.visibility=\'hidden\';"><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_play"></td><td>Play</td></tr></tbody></table></td></tr>'
        +'<tr><td class="add_el" style="border-radius:0 0 16px 16px;" onclick="menu_add.style.visibility=\'hidden\';menu_add.style.visibility=\'hidden\';"><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_close"></td><td>Cancel</td></tr></tbody></table></td></tr>'
        +'</tbody></table></div>'
	menu_view(id,code,48)
}
function element_m(id,n){
    var code='<div class="add_w" style="width:220px;"><table style="width:100%;"><tbody>'
        +'<tr><td style="height:40px;border-radius:16px 16px 0 0;border-bottom:1px solid var(--cb);" align="center">'+n+'</td></tr>'
        +((n=='legacy choice')?'<tr><td class="add_el" style="border-bottom:1px solid var(--cb);" onclick="legacy_choice_edit();menu_add.style.visibility=\'hidden\';"><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_edit2"></td><td>Edit</td></tr></tbody></table></td></tr>':'')
        +((n=='random choice')?'<tr><td class="add_el" style="border-bottom:1px solid var(--cb);" onclick="random_choice_edit();menu_add.style.visibility=\'hidden\';"><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_edit2"></td><td>Edit</td></tr></tbody></table></td></tr>':'')
        +((n==plugins_list.hidden_objects.name)?'<tr><td class="add_el" style="border-bottom:1px solid var(--cb);" onclick="menu_add.style.visibility=\'hidden\';arr_l=arr_l[arr_n];arr_n=\'hidden_objects\';ho_edit();"><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_edit2"></td><td>Edit</td></tr></tbody></table></td></tr>':'')
        +((n==plugins_list.terrain_map.name)?'<tr><td class="add_el" style="border-bottom:1px solid var(--cb);" onclick="menu_add.style.visibility=\'hidden\';arr_l=arr_l[arr_n];arr_n=\'terrain_map\';ho_edit();"><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_edit2"></td><td>Edit</td></tr></tbody></table></td></tr>':'')
        +'<tr><td class="add_el" style="border-bottom:1px solid var(--cb);" onclick="data_copy(\'scene\');element_del();menu_add.style.visibility=\'hidden\';"><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_cut"></td><td>Cut</td></tr></tbody></table></td></tr>'
        +'<tr><td class="add_el" style="border-bottom:1px solid var(--cb);" onclick="duplicat_arr();menu_add.style.visibility=\'hidden\';"><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_copu"></td><td>Duplicate</td></tr></tbody></table></td></tr>'
        +'<tr><td class="add_el" style="border-bottom:1px solid var(--cb);" onclick="data_copy(\'scene\');menu_add.style.visibility=\'hidden\';"><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_copy"></td><td>Copy scene</td></tr></tbody></table></td></tr>'
        +'<tr><td class="add_el" style="border-bottom:1px solid var(--cb);" onclick="jsonedit(true);menu_add.style.visibility=\'hidden\';"><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_json"></td><td>JSON</td></tr></tbody></table></td></tr>'
        +((buf[0]=='dialogs')?'<tr><td class="add_el" style="border-bottom:1px solid var(--cb);" onclick="data_past();menu_add.style.visibility=\'hidden\';"><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_paste"></td><td>Paste dialog</td></tr></tbody></table></td></tr>':'')
        +((buf[0]=='scene')?'<tr><td class="add_el" style="border-bottom:1px solid var(--cb);" onclick="arr_l[arr_n]=JSON.parse(buf[1]);menu_add.style.visibility=\'hidden\';update_novel();toast(\'Scene replaced\');"><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_refrash"></td><td>Replace scene</td></tr></tbody></table></td></tr> <tr><td class="add_el" style="border-bottom:1px solid var(--cb);" onclick="arr_l.splice(arr_n+1,0,JSON.parse(buf[1]));menu_add.style.visibility=\'hidden\';update_novel();"><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_paste"></td><td>Paste '+buf[0]+' below</td></tr></tbody></table></td></tr>':'')
        +'<tr><td class="add_el" style="border-bottom:1px solid var(--cb);" onclick="element_del();menu_add.style.visibility=\'hidden\';"><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_del"></td><td>Delete</td></tr></tbody></table></td></tr>'
        +'<tr><td class="add_el" style="border-bottom:1px solid var(--cb);" onclick="play_novel(scen_data[0],true);menu_add.style.visibility=\'hidden\';"><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_play"></td><td>Play</td></tr></tbody></table></td></tr>'
        +'<tr><td class="add_el" style="border-radius:0 0 16px 16px;" onclick="menu_add.style.visibility=\'hidden\';"><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_close"></td><td>Cancel</td></tr></tbody></table></td></tr>'
        +'</tbody></table></div>'
	menu_view(id,code,48)
}
function scene_m(id,i,block){
    var code='<div class="add_w" style="width:220px;"><table style="width:100%;"><tbody>'
        +'<tr><td style="height:40px;border-radius:16px 16px 0 0;border-bottom:1px solid var(--cb);" align="center">Scene '+i+'</td></tr>'
        +'<tr><td class="add_el" style="border-bottom:1px solid var(--cb);" onclick="scene_edit();menu_add.style.visibility=\'hidden\';"><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_edit2"></td><td>Edit</td></tr></tbody></table></td></tr>'
        +((story_script[block][i-1].dialogs[0])?'<tr><td class="add_el" style="border-bottom:1px solid var(--cb);" onclick="scen_data[1]='+(i-1)+';scen_editor(\''+block+'\',scen_data[1],1);scen_edit_data();menu_add.style.visibility=\'hidden\';"><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_layout"></td><td>Scene edit</td></tr></tbody></table></td></tr>':'')
        +'<tr><td class="add_el" style="border-bottom:1px solid var(--cb);" onclick="duplicat_arr();menu_add.style.visibility=\'hidden\';"><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_copu"></td><td>Duplicate</td></tr></tbody></table></td></tr>'
        +'<tr><td class="add_el" style="border-bottom:1px solid var(--cb);" onclick="data_copy(\'scene\');element_del();menu_add.style.visibility=\'hidden\';"><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_cut"></td><td>Cut</td></tr></tbody></table></td></tr>'
        +'<tr><td class="add_el" style="border-bottom:1px solid var(--cb);" onclick="data_copy(\'scene\');menu_add.style.visibility=\'hidden\';"><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_copy"></td><td>Copy scene</td></tr></tbody></table></td></tr>'
        +((buf[0]=='dialogs')?'<tr><td class="add_el" style="border-bottom:1px solid var(--cb);" onclick="data_past();menu_add.style.visibility=\'hidden\';"><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_paste"></td><td>Paste dialog</td></tr></tbody></table></td></tr>':'')
        +((buf[0]=='scene')?'<tr><td class="add_el" style="border-bottom:1px solid var(--cb);" onclick="arr_l[arr_n]=JSON.parse(buf[1]);menu_add.style.visibility=\'hidden\';update_novel();toast(\'Scene replaced\');"><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_refrash"></td><td>Replace scene</td></tr></tbody></table></td></tr> <tr><td class="add_el" style="border-bottom:1px solid var(--cb);" onclick="arr_l.splice(arr_n+1,0,JSON.parse(buf[1]));menu_add.style.visibility=\'hidden\';update_novel();"><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_paste"></td><td>Paste '+buf[0]+' below</td></tr></tbody></table></td></tr>':'')
        +'<tr><td class="add_el" style="border-bottom:1px solid var(--cb);" onclick="jsonedit(true);menu_add.style.visibility=\'hidden\';"><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_json"></td><td>JSON</td></tr></tbody></table></td></tr>'
        +'<tr><td class="add_el" style="border-bottom:1px solid var(--cb);" onclick="element_del();menu_add.style.visibility=\'hidden\';"><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_del"></td><td>Delete</td></tr></tbody></table></td></tr>'
        +'<tr><td class="add_el" style="border-bottom:1px solid var(--cb);" onclick="scen_data[1]='+(i-1)+';scen_data[2]=1;play_novel(\''+block+'\',true);menu_add.style.visibility=\'hidden\';"><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_play"></td><td>Play</td></tr></tbody></table></td></tr>'
        +'<tr><td class="add_el" style="border-radius:0 0 16px 16px;" onclick="menu_add.style.visibility=\'hidden\';"><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_close"></td><td>Cancel</td></tr></tbody></table></td></tr>'
        +'</tbody></table></div>'
	menu_view(id,code,48)
}
function dialog_el(id,n,e){
    var code='<div class="add_w" style="width:220px;"><table style="width:100%;"><tbody><tr><td style="height:40px;border-radius:16px 16px 0 0;border-bottom:1px solid var(--cb);" align="center">'+n+'</td></tr>'
        if(e){
            if(arr_n=='html'){
                code+='<tr><td class="add_el" style="border-bottom:1px solid var(--cb);" onclick="edit_html();menu_add.style.visibility=\'hidden\';"><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_edit2"></td><td>Edit</td></tr></tbody></table></td></tr>'
            }else if(arr_n=='text'||arr_n=='text_add'){
                code+='<tr><td class="add_el" style="border-bottom:1px solid var(--cb);" onclick="dialog_text_edit();menu_add.style.visibility=\'hidden\';"><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_edit2"></td><td>Edit</td></tr></tbody></table></td></tr>'
            }else if(arr_n=='variables'){
                code+='<tr><td class="add_el" style="border-bottom:1px solid var(--cb);" onclick="variables_set_edit();menu_add.style.visibility=\'hidden\';"><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_edit2"></td><td>Edit</td></tr></tbody></table></td></tr>'
            }else if(arr_n=='toast'){
                code+='<tr><td class="add_el" style="border-bottom:1px solid var(--cb);" onclick="edit_toast();menu_add.style.visibility=\'hidden\';"><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_edit2"></td><td>Edit</td></tr></tbody></table></td></tr>'
            }else if(arr_n=='choice'){
                code+='<tr><td class="add_el" style="border-bottom:1px solid var(--cb);" onclick="edit_choice();menu_add.style.visibility=\'hidden\';"><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_edit2"></td><td>Edit</td></tr></tbody></table></td></tr>'
            }else if(arr_n=='sound'||arr_n=='sound_stop'){
                code+='<tr><td class="add_el" style="border-bottom:1px solid var(--cb);" onclick="menu_add.style.visibility=\'hidden\';dialog_audio_edit(\''+id+'\');"><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_edit2"></td><td>Edit</td></tr></tbody></table></td></tr>'
            }else if(arr_n=='js'){
                code+='<tr><td class="add_el" style="border-bottom:1px solid var(--cb);" onclick="copy_arr=arr_l;edit_code(\'js\',\'JavaScript\');menu_add.style.visibility=\'hidden\';"><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_edit2"></td><td>Edit</td></tr></tbody></table></td></tr>'
            }else if(arr_n=='art'){
                code+='<tr><td class="add_el" style="border-bottom:1px solid var(--cb);" onclick="scen_editor(scen_data[0],scen_data[1],scen_data[2]);scen_edit_data();menu_add.style.visibility=\'hidden\';"><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_edit2"></td><td>Edit</td></tr></tbody></table></td></tr>'
            }else if(arr_n=='video'){
                code+='<tr><td class="add_el" style="border-bottom:1px solid var(--cb);" onclick="dialog_video_edit();menu_add.style.visibility=\'hidden\';"><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_edit2"></td><td>Edit</td></tr></tbody></table></td></tr>'
            }
        }
        code+='<tr><td class="add_el" style="border-bottom:1px solid var(--cb);" onclick="data_copy(\''+arr_n+'\');delete arr_l.name;element_dialog_del();menu_add.style.visibility=\'hidden\';"><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_cut"></td><td>Cut</td></tr></tbody></table></td></tr>'
        +'<tr><td class="add_el" style="border-bottom:1px solid var(--cb);" onclick="data_copy(\''+arr_n+'\');menu_add.style.visibility=\'hidden\';"><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_copy"></td><td>Copy '+((arr_n=='js')?'JavaScript':buf[0])+'</td></tr></tbody></table></td></tr>'
        +((arr_n==buf[0])?'<tr><td class="add_el" style="border-bottom:1px solid var(--cb);" onclick="data_past();menu_add.style.visibility=\'hidden\';toast(\''+((arr_n=='js')?'JavaScript':buf[0])+' replaced\');"><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_refrash"></td><td>Replace '+((arr_n=='js')?'JavaScript':buf[0])+'</td></tr></tbody></table></td></tr>':'')
        +'<tr><td class="add_el" style="border-bottom:1px solid var(--cb);" onclick="jsonedit(true);menu_add.style.visibility=\'hidden\';"><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_json"></td><td>JSON</td></tr></tbody></table></td></tr>'
        +'<tr><td class="add_el" style="border-bottom:1px solid var(--cb);" onclick="delete arr_l.name;element_dialog_del();menu_add.style.visibility=\'hidden\';"><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_del"></td><td>Delete</td></tr></tbody></table></td></tr>'
        +'<tr><td class="add_el" style="border-radius:0 0 16px 16px;" onclick="menu_add.style.visibility=\'hidden\';"><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_close"></td><td>Cancel</td></tr></tbody></table></td></tr>'
        +'</tbody></table></div>'
	menu_view(id,code,48)
}
function menu_view(id,code,top){
    var rect=document.getElementById(id).getBoundingClientRect();
    menu_add=document.getElementById('add_element');
    menu_add.style.visibility='visible';
    menu_add.innerHTML=code;
    menu_add.style.left=html.scrollLeft+rect.right+"px";
    menu_add.style.top=html.scrollTop+rect.top-top+"px";
}
function data_copy(name){buf[0]=name;buf[1]=JSON.stringify(arr_l[arr_n]);}
function data_past(){
    if(buf[0]=='dialogs'){arr_l[arr_n].dialogs.splice(arr_l[arr_n].dialogs.length,0,JSON.parse(buf[1]));
    }else if(buf[0]=='scene'){story_script[arr_n].push(JSON.parse(buf[1]));
    }else if(buf[0]==arr_n){arr_l[arr_n]=JSON.parse(buf[1]);
    }else{arr_l[arr_n][buf[0]]=JSON.parse(buf[1]);
    }update_novel();state_save();
}
function scene_add(arr){
	story_script[arr].push({"background_image":"","background_music":"","dialogs":[{}]});
	arr_l=story_script[arr]
	arr_n=story_script[arr].length-1
	scene_edit();
	update_novel();
}
function ho_add(arr,plugin){
    if(plugin=="terrain_map"){
        story_script[arr].push({"terrain_map":{"color":"#fff","fit":"contain","objects":[],"art":"","size":[setup_editor.pvw[0],setup_editor.pvw[1]]}});
	}else if(plugin=="hidden_objects"){
        if(!story_script.parameters.hidden_objects){story_script.parameters.hidden_objects={"label":{"tip":false,"size":["12.5%","90%"],"items":"8","art_size": ["90%","auto"]},"label_find":{"del":true}}}
        story_script[arr].push({"hidden_objects":{"color":"#fff","fit":"contain","objects":[]}});
	}
    scen_data=[arr,story_script[arr].length-1,0];
    arr_l=story_script[scen_data[0]][scen_data[1]];
	arr_n=plugin
	update_novel();ho_edit();
}
function legacy_choice_add(arr){
	story_script[arr].push({"legacy_choice":[["","=",0,""],{"go_to":""}]});
	arr_n=story_script[arr].length-1
	arr_l=story_script[arr]
	legacy_choice_edit();
    state_save();
}
function random_choice_add(arr){
	story_script[arr].push({"random_choice":[]});
	arr_n=story_script[arr].length-1
	arr_l=story_script[arr]
	random_choice_edit();
    state_save();
}
function option_var(d){
	var var_list='';
	if(story_script.parameters.variables){for(let l=0;l<Object.keys(story_script.parameters.variables).length;l++){var_list+="<option value='"+Object.keys(story_script.parameters.variables)[l]+"' "+((d==Object.keys(story_script.parameters.variables)[l])?"selected" :"")+">"+Object.keys(story_script.parameters.variables)[l]+"</option>"}}
	return var_list
}
function project_languares(d){
	var lang='';
	for(let l=0;l<story_script.parameters.languares.length;l++){lang+="<option value='"+story_script.parameters.languares[l]+"' "+((d==story_script.parameters.languares[l])?"selected":"")+">"+story_script.parameters.languares[l].toUpperCase()+"</option>"}
	return lang
}
function option_block(d,g){
	var scene_list="";
    if(g>=1){scene_list+="<option value='tue_no' "+((d=="tue_no")?"selected":"")+">none</option>";}
    scene_list+="<optgroup label='Story blocks'>"+((g!=3)?"<option value='tue_go' "+((d=="tue_go")?"selected":"")+">Next scene</option><option value='tue_update_scene' "+((d=="tue_update_scene")?"selected":"")+">Scene update</option>":"");
    for(var l=0;l<Object.keys(story_script).length;l++){if(Object.keys(story_script)[l]!="parameters"&&Object.keys(story_script)[l]!="blocks"){scene_list+="<option value='"+Object.keys(story_script)[l]+"' "+((d==Object.keys(story_script)[l])?"selected":"")+">"+Object.keys(story_script)[l]+"</option>"}}
    if(g>=2){scene_list+='</optgroup><optgroup label="System function">';
        for(var s=0;s<Object.keys(button_name).length;s++){
            scene_list+="<option value='"+Object.keys(button_name)[s]+"' "+((d==Object.keys(button_name)[s])?"selected":"")+">"+button_name[Object.keys(button_name)[s]]+"</option>"
        }
        if(story_script.parameters.plugins&&story_script.parameters.plugins.includes("speech")){
            scene_list+="<option value='tue_speech' "+((d=="tue_speech")?"selected":"")+">Speech text</option>"
        }
        if(story_script.parameters.languares.length>1){
            scene_list+='</optgroup><optgroup label="Switch languare">';
            for(var s=0;s<story_script.parameters.languares.length;s++){scene_list+="<option value='tue_"+story_script.parameters.languares[s]+"' "+((d=="tue_"+story_script.parameters.languares[s])?"selected":"")+">"+story_script.parameters.languares[s].toUpperCase()+"</option>"}
        }
    }
    return scene_list+'</optgroup>'
}
var tool_scale=1
function ho_scale(s){
    if(!s){ho_canvas.style.transform='scale(1)';tool_scale=1;s=0}
    else{tool_scale=Math.max(0.25,Math.min(2,tool_scale+s));ho_canvas.style.transform='scale('+tool_scale+')';}
}
function ho_edit(){
    arr_l=story_script[scen_data[0]][scen_data[1]];tool_scale=1;
    if(arr_n=="hidden_objects"&&!arr_l[arr_n].art){tool_update='ho_edit()';scroll_block=true;file_catalog('','img','','','arr_l.'+arr_n+'.art');}
    else if(!arr_l[arr_n].size){
        var image = new Image();
        image.src = open_file(languare_data(arr_l[arr_n].art));
        image.onload = function(){arr_l[arr_n].size=[this.width,this.height];ho_edit();}
    }else{var p=story_script.parameters[arr_n]
    if(!arr_l[arr_n].art[languare]){data_la(arr_l[arr_n],'art')}
    var tool="<table style='width:100%;height:100vh;background-color:var(--cw);'><tbody><tr><td rowspan='3' style='position:relative;'>"
    +"<div id='ho_preview' style='width:calc(100vw - 286px);height:100vh;overflow:auto;box-sizing:border-box;background-color:var(--cw);' onmouseup='window.getSelection().removeAllRanges();' onclick='if(ho_room_sizer.style.visibility==\"visible\"){ho_stopResize()};'>"
    +"<div id='ho_canvas' class='"+setup_editor.fon+"' style='transform-origin:left top;display:grid;justify-content:center;align-items:center;width:"+(arr_l[arr_n].size[0]+512)+"px;height:"+(arr_l[arr_n].size[1]+512)+"px;background-color:var(--cw);background-blend-mode:overlay;background-size:64px;'><div id='ho_room' style='position:relative;background-repeat:"+((arr_l[arr_n].repeat)?arr_l[arr_n].repeat:"no-repeat")+";background-position:"+((arr_l[arr_n].art_align)?arr_l[arr_n].art_align:"left top")+";"+((arr_l[arr_n].art)?"background-image:url("+open_file(languare_data(arr_l[arr_n].art))+");":"")+((arr_l[arr_n].color)?"background-color:"+arr_l[arr_n].color+";":"")+";background-size:"+((arr_l[arr_n].fit)?arr_l[arr_n].fit:"auto")+";width:"+arr_l[arr_n].size[0]+"px;height:"+arr_l[arr_n].size[1]+"px;border-radius:8px;box-shadow:0px 2px 24px var(--cs);' onclick='if(ho_room_sizer.style.visibility==\"visible\"){ho_stopResize()};'></div></div>"
    +"<div id='ho_controll' style='right:320px;'><table height='100%'><tbody><tr>"
        +"<td width='42px' class='icon button_menu icon_equal' onclick='ho_scale(0.05)'></td>"
        +"<td width='42px' class='icon button_menu icon_scale' onclick='ho_scale()'></td>"
        +"<td width='42px' class='icon button_menu icon_minus' onclick='ho_scale(-0.05)'></td>"
        +"<td width='42px' class='icon button_menu icon_play'  onclick='play_novel(scen_data[0],true)' style='border-radius:0 20px 20px 0;'></td>"
    +"</tr></tbody></table></div>"
    +"<div class='scene_close' onclick='ho_close();'><div class='icon button_menu icon_undo'></div></div></div></td>"
    +"<td style='width:286px;height:40px;background-color:var(--wn);' class='namber set_layout_panel' align='center'>"+scen_data[0]+" ( scene: "+scen_data[1]+" "+plugins_list[arr_n].name+" )</td></tr><tr>"
    +"<td id='ho_content' class='set_layout_panel' style='background-color:var(--wn);border-bottom:1px solid var(--cb);border-top:1px solid var(--cb);'><div id='hidden_objects_setup' style='height:calc(100vh - 80px);overflow-x:hidden;overflow-y:auto;position:relative;'>"
    //label
    if(arr_n=="hidden_objects"){
    tool+="<table onclick='block_open(\"ho_label\");' class='set_title' height='40px' width='100%'><tbody><tr><td width='40px' class='icon_m icon_more'></td><td align='left' valign='center'>Labels</td></tr></tbody></table>"
    +"<div class='set_panel' id='ho_label' style='width:100%;display:none;'>"
    +"<table style='width:100%;'><tbody>"
        +"<tr><td height='40px' align='right' style='width:40%;padding-right:8px;'>Width</td><td style='padding-right:8px;' colspan='3'>"
        +"<input class='input_text' onchange='this.value=correct_value(this.value);story_script.parameters.hidden_objects.label.size[0]=this.value;' type='text' value='"+p.label.size[0]+"' style='width:100%;'>"
        +"</td></tr>"
        +"<tr><td height='40px' align='right' style='padding-right:8px;'>Height</td><td style='padding-right:8px;' colspan='3'>"
        +"<input class='input_text' onchange='this.value=correct_value(this.value);story_script.parameters.hidden_objects.label.size[1]=this.value' type='text' value='"+p.label.size[1]+"' style='width:100%;'>"
        +"</td></tr>"
        +"<tr><td height='40px' align='right' style='padding-right:8px;'>Items for search</td><td style='padding-right:8px;' colspan='3'>"
        +"<input class='input_text' onchange='this.value=correct_value(this.value,true);story_script.parameters.hidden_objects.label.items=this.value' type='text' value='"+p.label.items+"' style='width:100%;'>"
        +"</td></tr>"
        +"<tr><td height='40px' align='right' style='padding-right:8px;'>Sound</td>"
        +"<td colspan='2'><input id='ho_ls' class='input_text' onchange='story_script.parameters.hidden_objects.label_find.sound=this.value;' type='text' style='width:100%;height:28px' value='"+((p.label_find.sound)?p.label_find.sound:'')+"'></td>"
        +"<td height='40px' align='right' style='width:30px;' class='icon icon_load' onclick=\"file_catalog('','audio','ho_ls','','story_script.parameters.hidden_objects.label_find.sound')\">"
        +"</td></tr>"
        +"<tr><td height='40px' align='right' style='padding-right:8px;'>Delete label</td><td style='padding-right:8px;' colspan='3'>"
        +"<select onchange='if(this.selectedIndex==0){delete story_script.parameters.hidden_objects.label_find.no_del_label}else{story_script.parameters.hidden_objects.label_find.no_del_label=true};'>"
            +"<option "+((!p.label_find.no_del_label)?'selected':'')+" value=true>Yes</option>"
            +"<option "+((p.label_find.no_del_label)?'selected':'')+" value='art'>No</option>"
        +"</select></td></tr>"
        +'</tr><tr>'
        +"<tr><td height='40px' align='right' style='padding-right:8px;'>Delete item</td><td style='padding-right:8px;' colspan='3'>"
        +"<select onchange='if(this.selectedIndex==0){delete story_script.parameters.hidden_objects.label_find.no_del_item}else{story_script.parameters.hidden_objects.label_find.no_del_item=true};'>"
            +"<option "+((!p.label_find.no_del_item)?'selected':'')+" value=true>Yes</option>"
            +"<option "+((p.label_find.no_del_item)?'selected':'')+" value='art'>No</option>"
        +"</select></td></tr>"
        +"<tr><td height='40px' align='right' style='padding-right:8px;'>Tip label</td><td style='padding-right:8px;' colspan='3'>"
        +"<select onchange='story_script.parameters.hidden_objects.label.tip=((this.selectedIndex!=0)?this.value:false);'>"
            +"<option "+((p.label.tip)?'selected':'')+" value=true>Art & text</option>"
            +"<option "+((p.label.tip=='art')?'selected':'')+" value='art'>Art</option>"
            +"<option "+((p.label.tip=='text')?'selected':'')+" value='text'>Text</option>"
        +"</select></td></tr>"
        +"</td></tr><td colspan='4' height='40px' align='left' style='padding-left:8px;border-bottom:1px solid var(--cb);'>Label text</td></tr>"
        +"<tr><td height='40px' align='right' style='padding-right:8px;'>Default color text</td><td style='width:40px;' align='center'><div class='show_color' id='ho_lcp' "+((p.label.color_text)?'style="background-color:'+p.label.color_text+';"':"")+"></div></td><td style='padding-right:8px;'>"
        +"<input id='ho_lc' class='input_text' onchange='story_script.parameters.hidden_objects.label.color_text=this.value;ho_lcp.style.backgroundColor=this.value;' type='text' value='"+((p.label.color_text)?p.label.color_text:"")+"' style='width:100%;'>"
        +"</td><td height='40px' align='right' style='width:40px;' class='icon icon_color' onclick='edit_color(\"ho_lc\",ho_lc.value)'>"
        +"</td></tr>"
        +"<tr><td height='40px' align='right' style='padding-right:8px;'>Find color text</td><td style='width:40px;' align='center'><div class='show_color' id='ho_fcp' "+((p.label_find.color_text)?'style="background-color:'+p.label_find.color_text+';"':"")+"></div></td><td style='padding-right:8px;'>"
        +"<input id='ho_fc' class='input_text' onchange='story_script.parameters.hidden_objects.label_find.color_text=this.value;ho_fcp.style.backgroundColor=this.value;' type='text' value='"+((p.label_find.color_text)?p.label_find.color_text:"")+"' style='width:100%;'>"
        +"</td><td height='40px' align='right' style='width:40px;' class='icon icon_color' onclick='edit_color(\"ho_fc\",ho_fc.value)'>"
        +"</td></tr>"
        +"<td height='40px' align='right' style='padding-right:8px;'>Align text</td>"
        +"<td colspan='3' align='center'>"
            +"<table style='border-radius:4px;'><tbody><tr>"
                +"<td><input class='icon icon_diag align' type='radio' name='align_tl' onchange='story_script.parameters.hidden_objects.label.align=[\"start\",\"start\"];' "+((p.label.align&&p.label.align[0]=="start"&&p.label.align[1]=="start")?"checked":"")+" style='transform:scaleX(-1) scaleY(-1);'></td>"
                +"<td><input class='icon icon_side align' type='radio' name='align_tl' onchange='story_script.parameters.hidden_objects.label.align=[\"center\",\"start\"];' "+((p.label.align&&p.label.align[0]=="center"&&p.label.align[1]=="start")?"checked":"")+"></td>"
                +"<td><input class='icon icon_diag align' type='radio' name='align_tl' onchange='story_script.parameters.hidden_objects.label.align=[\"end\",\"start\"];' "+((p.label.align&&p.label.align[0]=="end"&&p.label.align[1]=="start")?"checked":"")+" style='transform:scaleY(-1);'></td>"
            +"</tr><tr>"
                +"<td><input class='icon icon_side align' type='radio' name='align_tl' onchange='story_script.parameters.hidden_objects.label.align=[\"start\",\"center\"];' "+((p.label.align&&p.label.align[0]=="start"&&p.label.align[1]=="center")?"checked":"")+" style='transform:rotate(270deg);'></td>"
                +"<td><input class='icon icon_cent align' type='radio' name='align_tl' onchange='delete story_script.parameters.hidden_objects.label.align;' "+((!p.label.align)?"checked":"")+"></td>"
                +"<td><input class='icon icon_side align' type='radio' name='align_tl' onchange='story_script.parameters.hidden_objects.label.align=[\"end\",\"center\"];' "+((p.label.align&&p.label.align[0]=="end"&&p.label.align[1]=="center")?"checked":"")+" style='transform:rotate(90deg);'></td>"
            +"</tr><tr>"
                +"<td><input class='icon icon_diag align' type='radio' name='align_tl' onchange='story_script.parameters.hidden_objects.label.align=[\"start\",\"end\"];' "+((p.label.align&&p.label.align[0]=="start"&&p.label.align[1]=="end")?"checked":"")+" style='transform:scaleX(-1);'></td>"
                +"<td><input class='icon icon_side align' type='radio' name='align_tl' onchange='story_script.parameters.hidden_objects.label.align=[\"center\",\"end\"];' "+((p.label.align&&p.label.align[0]=="center"&&p.label.align[1]=="end")?"checked":"")+" style='transform:scaleY(-1);'></td>"
                +"<td><input class='icon icon_diag align' type='radio' name='align_tl' onchange='story_script.parameters.hidden_objects.label.align=[\"end\",\"end\"];' "+((p.label.align&&p.label.align[0]=="end"&&p.label.align[1]=="end")?"checked":"")+" style='transform:scaleX(1);'></td>"
            +"</tr></tbody></table>"
            +"</td>"
        +"</tr><tr>"
        +"</td></tr><td colspan='4' height='40px' align='left' style='padding-left:8px;border-bottom:1px solid var(--cb);'>Label image</td></tr>"
        +"<tr><td height='40px' align='right' style='padding-right:8px;'>Width art</td><td style='padding-right:8px;' colspan='3'>"
        +"<input class='input_text' onchange='this.value=correct_value(this.value);if(!story_script.parameters.hidden_objects.label.art_size){story_script.parameters.hidden_objects.label.art_size=[this.value,this.value]};story_script.parameters.hidden_objects.label.art_size[0]=this.value;' type='text' value='"+((p.label.art_size)?p.label.art_size[0]:"")+"' style='width:100%;'>"
        +"</td></tr>"
        +"<tr><td height='40px' align='right' style='padding-right:8px;'>Height art</td><td style='padding-right:8px;' colspan='3'>"
        +"<input class='input_text' onchange='this.value=correct_value(this.value);if(!story_script.parameters.hidden_objects.label.art_size){story_script.parameters.hidden_objects.label.art_size=[this.value,this.value]};story_script.parameters.hidden_objects.label.art_size[1]=this.value;' type='text' value='"+((p.label.art_size)?p.label.art_size[1]:"")+"' style='width:100%;'>"
        +"</td></tr>"
        +"<tr><td height='40px' align='right' style='padding-right:8px;'>Fill art</td><td style='padding-right:8px;' colspan='3'>"
        +"<select onchange='if(this.selectedIndex!=0){story_script.parameters.hidden_objects.label.fit=this.value;}else{delete story_script.parameters.hidden_objects.label.fit}'>"
            +"<option "+((!p.label.fit)?'selected':'')+">size</option>"
            +"<option "+((p.label.fit=='cover')?'selected':'')+" value='cover'>cover</option>"
            +"<option "+((p.label.fit=='contain')?'selected':'')+" value='contain'>contain</option>"
            +"<option "+((p.label.fit=='100% 100%')?'selected':'')+" value='100% 100%'>fill</option>"
        +"</select></td></tr>"
        +"<td height='40px' align='right' style='padding-right:8px;'>Align art</td>"
        +"<td colspan='3' align='center'>"
            +"<table style='border-radius:4px;'><tbody><tr>"
                +"<td><input class='icon icon_diag align' type='radio' name='align_ta' onchange='story_script.parameters.hidden_objects.label.art_align=\"left top\";' "+((p.label.art_align=="left top")?"checked":"")+" style='transform:scaleX(-1) scaleY(-1);'></td>"
                +"<td><input class='icon icon_side align' type='radio' name='align_ta' onchange='story_script.parameters.hidden_objects.label.art_align=\"center top\";' "+((p.label.art_align=="center top")?"checked":"")+"></td>"
                +"<td><input class='icon icon_diag align' type='radio' name='align_ta' onchange='story_script.parameters.hidden_objects.label.art_align=\"right top\";' "+((p.label.art_align=="right top")?"checked":"")+" style='transform:scaleY(-1);'></td>"
            +"</tr><tr>"
                +"<td><input class='icon icon_side align' type='radio' name='align_ta' onchange='story_script.parameters.hidden_objects.label.art_align=\"left center\";' "+((p.label.art_align=="left center")?"checked":"")+" style='transform:rotate(270deg);'></td>"
                +"<td><input class='icon icon_cent align' type='radio' name='align_ta' onchange='delete story_script.parameters.hidden_objects.label.art_align;' "+((!p.label.art_align||p.label.art_align=="center"||p.label.art_align=="center center")?"checked":"")+"></td>"
                +"<td><input class='icon icon_side align' type='radio' name='align_ta' onchange='story_script.parameters.hidden_objects.label.art_align=\"right center\";' "+((p.label.art_align=="right center")?"checked":"")+" style='transform:rotate(90deg);'></td>"
            +"</tr><tr>"
                +"<td><input class='icon icon_diag align' type='radio' name='align_ta' onchange='story_script.parameters.hidden_objects.label.art_align=\"left bottom\";' "+((p.label.art_align=="left bottom")?"checked":"")+" style='transform:scaleX(-1);'></td>"
                +"<td><input class='icon icon_side align' type='radio' name='align_ta' onchange='story_script.parameters.hidden_objects.label.art_align=\"center bottom\";' "+((p.label.art_align=="center bottom")?"checked":"")+" style='transform:scaleY(-1);'></td>"
                +"<td><input class='icon icon_diag align' type='radio' name='align_ta' onchange='story_script.parameters.hidden_objects.label.art_align=\"right bottom\";' "+((p.label.art_align=="right bottom")?"checked":"")+" style='transform:scaleX(1);'></td>"
            +"</tr></tbody></table>"
            +"</td>"
        +"</tr><tr>"
        +"</td></tr><td colspan='4' height='40px' align='left' style='padding-left:8px;border-bottom:1px solid var(--cb);'>Style</td></tr>"
        +"<tr><td height='40px' align='right' style='padding-right:8px;'>Default color label</td><td style='width:40px;' align='center'><div class='show_color' id='ho_lcdp' "+((p.label.color)?'style="background-color:'+p.label.color+';"':"")+"></div></td><td style='padding-right:8px;'>"
        +"<input id='ho_lcd' class='input_text' onchange='story_script.parameters.hidden_objects.label.color=this.value;ho_lcdp.style.backgroundColor=this.value;' type='text' value='"+((p.label.color)?p.label.color:"")+"' style='width:100%;'>"
        +"</td><td height='40px' align='right' style='width:40px;' class='icon icon_color' onclick='edit_color(\"ho_lcd\",ho_lcd.value)'>"
        +"</td></tr>"
        +"<tr><td height='40px' align='right' style='padding-right:8px;'>Find color label</td><td style='width:40px;' align='center'><div class='show_color' id='ho_lcfp' "+((p.label_find.color)?'style="background-color:'+p.label_find.color+';"':"")+"></div></td><td style='padding-right:8px;'>"
        +"<input id='ho_lcf' class='input_text' onchange='story_script.parameters.hidden_objects.label_find.color=this.value;ho_lcfp.style.backgroundColor=this.value;' type='text' value='"+((p.label.color)?p.label_find.color:"")+"' style='width:100%;'>"
        +"</td><td height='40px' align='right' style='width:40px;' class='icon icon_color' onclick='edit_color(\"ho_lcf\",ho_lcf.value)'>"
        +"</td></tr>"
        +"<tr><td height='40px' align='right' style='padding-right:8px;'>Default style CSS</td><td style='padding-right:8px;' colspan='2'>"
        +"<input class='input_text' onchange='story_script.parameters.hidden_objects.label.style=this.value;' type='text' value='"+((p.label.style)?p.label.style:"")+"' style='width:100%;'>"
        +"</td><td height='40px' align='right' style='width:30px;' class='icon icon_edit' onclick='copy_arr=story_script.parameters.hidden_objects.label;edit_code(\"style\",\"Style CSS\",\"ho_update()\");'>"
        +'</tr><tr>'
        +"<tr><td height='40px' align='right' style='padding-right:8px;'>Find style CSS</td><td style='padding-right:8px;' colspan='2'>"
        +"<input class='input_text' onchange='story_script.parameters.hidden_objects.label_find.style=this.value;' type='text' value='"+((p.label.style)?p.label_find.style:"")+"' style='width:100%;'>"
        +"</td><td height='40px' align='right' style='width:30px;' class='icon icon_edit' onclick='copy_arr=story_script.parameters.hidden_objects.label_find;edit_code(\"style\",\"Style CSS\",\"ho_update()\");'>"
        +'</tr><tr>'
        +"<tr><td height='40px' align='right' style='padding-right:8px;'>Default class name</td><td style='padding-right:8px;' colspan='3'>"
        +"<input class='input_text' onchange='story_script.parameters.hidden_objects.label.className=this.value;' type='text' value='"+((p.label.className)?p.label.className:"")+"' style='width:100%;'>"
        +'</tr><tr>'
        +"<tr><td height='40px' align='right' style='padding-right:8px;'>Find class name</td><td style='padding-right:8px;' colspan='3'>"
        +"<input class='input_text' onchange='story_script.parameters.hidden_objects.label_find.className=this.value;' type='text' value='"+((p.label.className)?p.label_find.className:"")+"' style='width:100%;'>"
        +'</tr><tr>'
    +"</tbody></table></div>"}
    //Scene
    tool+="<table onclick='block_open(\"ho_location\");' class='set_title' height='40px' width='100%'><tbody><tr><td width='40px' class='icon_m icon_more'></td><td align='left' valign='center'>Scene</td></tr></tbody></table>"
    +"<div class='set_panel' id='ho_location' style='width:100%;display:block;'>"
    +"<table style='width:100%;'><tbody>"
        +"<tr><td height='40px' align='right' style='padding-right:8px;'>Art</td>"
        +"<td style='width:28px;' align='center'><select id='ho_rl' onchange='ho_rf.value=arr_l."+arr_n+".art[this.value];ho_room.style.backgroundImage=\"url(\"+open_file(arr_l."+arr_n+".art[this.value])+\")\"' style='height:28px;width:100%;border-left:1px solid var(--cb);border-right:1px solid var(--cb);border-bottom:1px solid var(--cb);'>"+project_languares(languare)+"</select></td>"
        +"<td><input id='ho_rf' class='input_text' onchange='var v=document.getElementById(\"ho_rl\");arr_l."+arr_n+".art[v.value]=this.value;ho_room.style.backgroundImage=\"url(\"+open_file(this.value)+\")\";' type='text' style='width:100%;height:28px' value='"+((arr_l[arr_n].art[languare]&&arr_l[arr_n].art[languare].length>0)?arr_l[arr_n].art[languare]:'')+"'></td>"
        +"<td height='40px' align='right' style='width:40px;' class='icon icon_load' onclick=\"file_catalog('ho_rf','img','ho_rf','ho_room','arr_l."+arr_n+".art[ho_rl.value]')\">"
        +"</td></tr>"
        +"<tr><td height='40px' align='right' style='width:40%;padding-right:8px;'>Width</td><td style='padding-right:8px;' colspan='2'>"
        +"<input id='ho_w' class='input_text' onchange='var s=parseInt(correct_value(this.value,true));if(ho_bs.checked){arr_l."+arr_n+".size[1]=parseInt(arr_l."+arr_n+".size[1]*(s/arr_l."+arr_n+".size[0]))};arr_l."+arr_n+".size[0]=s;ho_size();state_save();' type='text' value='"+arr_l[arr_n].size[0]+"' style='width:100%;'>"
        +'<td height="40px" align="right" rowspan="2"><input id="ho_bs" type="checkbox" class="proportion_c" checked></td>'
        +"</td></tr>"
        +"<tr><td height='40px' align='right' style='padding-right:8px;'>Height</td><td style='padding-right:8px;' colspan='2'>"
        +"<input id='ho_h' class='input_text' onchange='var s=parseInt(correct_value(this.value,true));if(ho_bs.checked){arr_l."+arr_n+".size[0]=parseInt(arr_l."+arr_n+".size[0]*(s/arr_l."+arr_n+".size[1]))};arr_l."+arr_n+".size[1]=s;ho_size();state_save();' type='text' value='"+arr_l[arr_n].size[1]+"' style='width:100%;'>"
        +"</td></tr>"
        +"<tr><td height='40px' align='right' style='padding-right:8px;'>Scale</td><td style='padding-right:8px;' colspan='3'>"
        +"<input id='ho_z' class='input_text' onchange='var s=parseFloat(correct_value(this.value,true));if(s<1){s=1};if(s==1){delete arr_l."+arr_n+".scale}else{arr_l."+arr_n+".scale=s};this.value=s;state_save();' type='text' value='"+((arr_l[arr_n].scale)?arr_l[arr_n].scale:1)+"' style='width:100%;'>"
        +"</td></tr>"
        +((arr_n=="hidden_objects")?"<tr><td height='40px' align='right' style='padding-right:8px;'>Go to</td><td style='padding-right:8px;' colspan='3'><select onchange='arr_l.hidden_objects.go_to=this.value;'>"+option_block(arr_l.hidden_objects.go_to,0)+"</select></td></tr></td></tr>":"")
        +((arr_n=="hidden_objects")?"<tr><td height='40px' align='right' style='padding-right:8px;'>JavaScript</td><td style='padding-right:8px;' colspan='2'><input id='ho_j' class='input_text' onchange='arr_l.hidden_objects.js=this.value' type='text' value='"+((arr_l.hidden_objects.js)?arr_l.hidden_objects.js:"")+"' style='width:100%;'></td><td height='40px' align='right' style='width:30px;' class='icon icon_edit' onclick='copy_arr=arr_l.hidden_objects;edit_code(\"js\",\"JavaScript\",\"ho_update()\");'></td></tr>":"")
        if(arr_n=="terrain_map"){if(!arr_l[arr_n].scale){arr_l[arr_n].scroll=[0,0];}
        tool+="</td></tr>"
        +"<tr><td height='40px' align='right' style='padding-right:8px;'>Start scroll X</td><td style='padding-right:8px;' colspan='3'>"
        +"<input class='input_text' onchange='var s=parseFloat(correct_value(this.value,true));arr_l."+arr_n+".scroll[0]=s;this.value=s;state_save();' type='text' value='"+arr_l[arr_n].scroll[0]+"' style='width:100%;'>"
        +"</td></tr>"
        +"<tr><td height='40px' align='right' style='padding-right:8px;'>Start scroll Y</td><td style='padding-right:8px;' colspan='3'>"
        +"<input class='input_text' onchange='var s=parseFloat(correct_value(this.value,true));arr_l."+arr_n+".scroll[1]=s;this.value=s;state_save();' type='text' value='"+arr_l[arr_n].scroll[1]+"' style='width:100%;'>"
        +"</td></tr>"}
        if(arr_n=="terrain_map"){tool+="</td></tr><td colspan='4' height='40px' align='left' style='padding-left:8px;border-bottom:1px solid var(--cb);'>Background image</td>"
        +"<tr><td height='40px' align='right' style='padding-right:8px;'>Size</td><td style='padding-right:8px;' colspan='3'>"
        +"<select onchange='if(this.selectedIndex==0){delete arr_l."+arr_n+".fit;ho_size_art.style.display=\"table\";ho_room.style.backgroundSize=\"auto\";ho_sw.value=\"\"; ho_sh.value=\"\";}else{arr_l."+arr_n+".fit=this.value;ho_size_art.style.display=\"none\";ho_room.style.backgroundSize=this.value;}'>"
            +"<option value=''>original</option>"
            +"<option "+((arr_l[arr_n].fit=="cover")?"selected":"")+" value='cover'>cover</option>"
            +"<option "+((arr_l[arr_n].fit=="contain")?"selected":"")+" value='contain'>contain</option>"
            +"<option "+((arr_l[arr_n].fit=="100% 100%")?"selected":"")+" value='100% 100%'>fill</option>"
        +"</select></td></tr>"
        +"<tr><td height='40px' align='right' style='padding-right:8px;'>Repeat</td><td style='padding-right:8px;' colspan='3'>"
        +"<select onchange='arr_l."+arr_n+".repeat=this.value;ho_room.style.backgroundRepeat=this.value;'>"
            +"<option "+((arr_l[arr_n].repeat=="no-repeat")?"selected":"")+" value='no-repeat'>no</option>"
            +"<option "+((arr_l[arr_n].repeat=="repeat")?"selected":"")+" value='repeat'>yes</option>"
            +"<option "+((arr_l[arr_n].repeat=="repeat-x")?"selected":"")+" value='repeat-x'>horizontal</option>"
            +"<option "+((arr_l[arr_n].repeat=="repeat-y")?"selected":"")+" value='repeat-y'>vertical</option>"
        +"</select></td></tr></tbody></table>"
        +"<table id='ho_size_art' style='width:100%;display:"+((!arr_l[arr_n].fit||(arr_l[arr_n].fit!="cover"&&arr_l[arr_n].fit!="contain"&&arr_l[arr_n].fit!="100% 100%"))?"table":"none")+";'><tbody><tr><td height='40px' align='right' style='width:40%;padding-right:8px;'>Width art</td><td style='padding-right:8px;' colspan='3'>"
        +"<input id='ho_sw' class='input_text' onchange='if(typeof arr_l."+arr_n+".fit!==\"object\"){arr_l."+arr_n+".fit=[correct_value(this.value),\"auto\"]}else{arr_l."+arr_n+".fit[0]=correct_value(this.value)};if(arr_l."+arr_n+".fit[1].length==0){arr_l."+arr_n+".fit[1]=\"auto\"};ho_size();state_save();' type='text' value='"+((typeof arr_l[arr_n].fit==="object")?arr_l[arr_n].fit[0]:"")+"' style='width:100%;'>"
        +"</td></tr>"
        +"<tr><td height='40px' align='right' style='padding-right:8px;'>Height art</td><td style='padding-right:8px;' colspan='3'>"
        +"<input id='ho_sh' class='input_text' onchange='if(typeof arr_l."+arr_n+".fit!==\"object\"){arr_l."+arr_n+".fit=[\"auto\",correct_value(this.value)]}else{arr_l."+arr_n+".fit[1]=correct_value(this.value)};if(arr_l."+arr_n+".fit[0].length==0){arr_l."+arr_n+".fit[0]=\"auto\"};ho_size();state_save();' type='text' value='"+((typeof arr_l[arr_n].fit==="object")?arr_l[arr_n].fit[1]:"")+"' style='width:100%;'>"
        +"</td></tr></tbody></table>"
        +"<table style='width:100%;'><tbody><td height='40px' align='right' style='padding-right:8px;'>Align art</td>"
        +"<td colspan='3' align='center'>"
            +"<table style='border-radius:4px;'><tbody><tr>"
                +"<td><input class='icon icon_diag align' type='radio' name='align_ta' onchange='delete arr_l."+arr_n+".art_align;ho_room.style.backgroundPosition=\"left top\";state_save();' "+((!arr_l[arr_n].art_align)?"checked":"")+" style='transform:scaleX(-1) scaleY(-1);'></td>"
                +"<td><input class='icon icon_side align' type='radio' name='align_ta' onchange='arr_l."+arr_n+".art_align=\"center top\";ho_room.style.backgroundPosition=\"center top\";state_save();' "+((arr_l[arr_n].art_align=="center top")?"checked":"")+"></td>"
                +"<td><input class='icon icon_diag align' type='radio' name='align_ta' onchange='arr_l."+arr_n+".art_align=\"right top\";ho_room.style.backgroundPosition=\"right top\";state_save();' "+((arr_l[arr_n].art_align=="right top")?"checked":"")+" style='transform:scaleY(-1);'></td>"
            +"</tr><tr>"
                +"<td><input class='icon icon_side align' type='radio' name='align_ta' onchange='arr_l."+arr_n+".art_align=\"left center\";ho_room.style.backgroundPosition=\"left center\";state_save();' "+((arr_l[arr_n].art_align=="left center")?"checked":"")+" style='transform:rotate(270deg);'></td>"
                +"<td><input class='icon icon_cent align' type='radio' name='align_ta' onchange='arr_l."+arr_n+".art_align=\"center\";ho_room.style.backgroundPosition=\"center\";state_save();' "+((arr_l[arr_n].art_align=="center"||arr_l[arr_n].art_align=="center center")?"checked":"")+"></td>"
                +"<td><input class='icon icon_side align' type='radio' name='align_ta' onchange='arr_l."+arr_n+".art_align=\"right center\";ho_room.style.backgroundPosition=\"right center\";state_save();' "+((arr_l[arr_n].art_align=="right center")?"checked":"")+" style='transform:rotate(90deg);'></td>"
            +"</tr><tr>"
                +"<td><input class='icon icon_diag align' type='radio' name='align_ta' onchange='arr_l."+arr_n+".art_align=\"left bottom\";ho_room.style.backgroundPosition=\"left bottom\";state_save();' "+((arr_l[arr_n].art_align=="left bottom")?"checked":"")+" style='transform:scaleX(-1);'></td>"
                +"<td><input class='icon icon_side align' type='radio' name='align_ta' onchange='arr_l."+arr_n+".art_align=\"center bottom\";ho_room.style.backgroundPosition=\"center bottom\";state_save();' "+((arr_l[arr_n].art_align=="center bottom")?"checked":"")+" style='transform:scaleY(-1);'></td>"
                +"<td><input class='icon icon_diag align' type='radio' name='align_ta' onchange='arr_l."+arr_n+".art_align=\"right bottom\";ho_room.style.backgroundPosition=\"right bottom\";state_save();' "+((arr_l[arr_n].art_align=="right bottom")?"checked":"")+" style='transform:scaleX(1);'></td>"
            +"</tr></tbody></table></td>"
        +"</tr><tr>"}
        tool+="</td></tr><td colspan='4' height='40px' align='left' style='padding-left:8px;border-bottom:1px solid var(--cb);'>Style</td>"
        +"<tr><td height='40px' align='right' style='width:40%;padding-right:8px;'>Color</td><td style='width:40px;' align='center'><div class='show_color' id='ho_cp' "+((arr_l[arr_n].color)?'style="background-color:'+arr_l[arr_n].color+';"':"")+"></div></td><td style='padding-right:8px;'>"
        +"<input id='ho_c' class='input_text' onchange='ho_room.style.backgroundColor=this.value;ho_cp.style.backgroundColor=this.value;arr_l."+arr_n+".color=this.value' type='text' value='"+((arr_l[arr_n].color)?arr_l[arr_n].color:"")+"' style='width:100%;'>"
        +"</td><td height='40px' align='right' style='width:40px;' class='icon icon_color' onclick='edit_color(\"ho_c\",ho_c.value)'>"
        +"</td></tr>"
        +"<tr><td height='40px' align='right' style='padding-right:8px;'>Class name</td><td style='padding-right:8px;' colspan='3'>"
        +"<input id='ho_n' class='input_text' onchange='arr_l."+arr_n+".className=this.value;' type='text' value='"+((arr_l[arr_n].className)?arr_l[arr_n].className:"")+"' style='width:100%;'>"
        +"</td></tr>"
        +"<tr><td height='40px' align='right' style='padding-right:8px;'>Style CSS</td><td style='padding-right:8px;' colspan='2'>"
        +"<input id='ho_s' class='input_text' onchange='arr_l."+arr_n+".style=this.value' type='text' value='"+((arr_l[arr_n].style)?arr_l[arr_n].style:"")+"' style='width:100%;'>"
        +"</td><td height='40px' align='right' style='width:40px;' class='icon icon_edit' onclick='copy_arr=arr_l."+arr_n+";edit_code(\"style\",\"Style CSS\",\"ho_update()\");'>"
        +"</td></tr>"
        +"</td></tr><td colspan='4' height='40px' align='left' style='padding-left:8px;border-bottom:1px solid var(--cb);'>Sounds</td>"
        +((arr_n=="terrain_map")?"<tr><td height='40px' align='right' style='padding-right:8px;'>Click sound</td><td colspan='2'><input id='ho_b' class='input_text' onchange='arr_l."+arr_n+".sound=this.value;' type='text' style='width:100%;height:28px' value='"+((arr_l[arr_n].sound)?arr_l[arr_n].sound:'')+"'></td><td height='40px' align='right' style='width:30px;' class='icon icon_load' onclick=\"file_catalog('','audio','ho_b','','arr_l."+arr_n+".sound')\"></td></tr>":"")
        +"<tr><td height='40px' align='right' style='padding-right:8px;'>Music</td>"
        +"<td colspan='2'><input id='ho_m' class='input_text' onchange='arr_l."+arr_n+".background_music=this.value;' type='text' style='width:100%;height:28px' value='"+((arr_l[arr_n].background_music)?arr_l[arr_n].background_music:'')+"'></td>"
        +"<td height='40px' align='right' style='width:40px;' class='icon icon_load' onclick=\"file_catalog('files_auio','audio','ho_m',0,'arr_l."+arr_n+".background_music')\">"
        +"</td></tr>"
    +"</tbody></table></div>"
    //items
    +"<table onclick='block_open(\"ho_items\");' class='set_title' height='40px' width='100%'><tbody><tr><td width='40px' class='icon_m icon_more'></td><td align='left' valign='center'>Items</td></tr></tbody></table>"
    +"<div class='set_panel' id='ho_items' style='width:100%;display:block;'><div id='ho_catalog' style='margin-bottom:12px;'></div>"
        +"<div style='width:100%;margin-bottom:16px;' align='center'><div id='add_item' class='add_button icon_m icon_add' onclick='ho_new()'></div></div>"
    +"</div>"
    +"<div id='menu_objects' align='center' style='z-index:10040;position:absolute;right:64px;top:0;visibility:hidden;width:190px;'></div>"
    +"</div></td></tr><tr>"
    +"<td height='40px' style='background-color:var(--wn);' style='background-color:var(--wn);' class='button_menu set_layout_panel'><table class='button_menu' width='100%' height='100%' onclick='ho_close();'><tbody><tr><td width='42px' class='icon icon_ok'></td><td align='center'>Back</td><td width='42px'></td></tr></tbody></table></td></tr></tbody></table>"
    open_tool(tool,"ho_update()");ho_update();
    tool=document.getElementById('ho_preview');
    adden_scroll(tool,document.getElementById('ho_canvas'));tool.scrollTop=200;tool.scrollLeft=240;
    }
}
function ho_size(){
    ho_canvas.style.width=(((arr_l[arr_n].size[0]+512)<ho_preview.offsetWidth)?parseFloat(arr_l[arr_n].size[0])+512+ho_preview.offsetWidth:parseFloat(arr_l[arr_n].size[0])+512)+"px";
    ho_room.style.width=arr_l[arr_n].size[0]+"px"
    ho_canvas.style.height=(((arr_l[arr_n].size[1]+512)<ho_preview.offsetHeight)?parseFloat(arr_l[arr_n].size[1])+512+ho_preview.offsetHeight:parseFloat(arr_l[arr_n].size[1])+512)+"px";
    ho_room.style.height=arr_l[arr_n].size[1]+"px"
    ho_w.value=arr_l[arr_n].size[0];
    ho_h.value=arr_l[arr_n].size[1];
    if(typeof arr_l[arr_n].fit==="object"){ho_sw.value=arr_l[arr_n].fit[0];ho_sh.value=arr_l[arr_n].fit[1];}
    if(arr_l[arr_n].repeat){ho_room.style.backgroundRepeat=arr_l[arr_n].repeat;}
    if(arr_l[arr_n].fit){ho_room.style.backgroundSize=(typeof arr_l[arr_n].fit==="object")?arr_l[arr_n].fit[0]+" "+arr_l[arr_n].fit[1]:arr_l[arr_n].fit;}
}
function ho_new(s){
    if(!s){
        var a=story_script[scen_data[0]][scen_data[1]][arr_n],p=[(ho_canvas.offsetWidth-ho_room.offsetWidth)/2,(ho_canvas.offsetHeight-ho_room.offsetHeight)/2];
        if(arr_n=="hidden_objects"){a.objects.push({"position":[(ho_preview.scrollLeft-p[0])+(ho_preview.clientWidth/2),(ho_preview.scrollTop-p[1])+(ho_preview.clientHeight/2)],"size":[128,128],"art":"","fit":"contain","name":""});
            file_catalog('','img','hois_art'+(a.objects.length-1),'','story_script[scen_data[0]][scen_data[1]].'+arr_n+'.objects['+(a.objects.length-1)+'].art');}
        else{a.objects.push({"go_to":"tue_go","position":[(ho_preview.scrollLeft-p[0])+(ho_preview.clientWidth/2),(ho_preview.scrollTop-p[1])+(ho_preview.clientHeight/2)],"size":[128,128],"art":"","fit":"contain","name":"label","indent_text":"8px"});}
        tool_update='ho_new(1)';ho_update();
    }else if(s==1){
        var a=story_script[scen_data[0]][scen_data[1]][arr_n].objects,image = new Image();
        image.src=open_file(languare_data(a[a.length-1].art));
        image.onload=function(){a[a.length-1].size=[this.width,this.height];tool_update='ho_update()';ho_update();}
    }
}
function ho_update(){
    droppFocus(document.getElementById("ho_room_sizer"))
    off_drag();
    arr_l=story_script[scen_data[0]][scen_data[1]]
    ho_size();
    var e=document.getElementById('ho_room'),c=document.getElementById('ho_catalog'),o='',k='';
    if(arr_l[arr_n].js){ho_j.value=arr_l[arr_n].js}
    if(arr_l[arr_n].style){ho_s.value=arr_l[arr_n].style}
    e.innerHTML="";c.innerHTML="";
    for(var i=0;i<arr_l[arr_n].objects.length;i++){
        if(arr_l[arr_n].objects[i].name&&!arr_l[arr_n].objects[i].name[languare]){data_la(arr_l[arr_n].objects[i],'name')}
        if(!arr_l[arr_n].objects[i].art[languare]){data_la(arr_l[arr_n].objects[i],"art")}
        if(arr_l[arr_n].objects[i].url&&!arr_l[arr_n].objects[i].go_to[languare]){data_corr(arr_l[arr_n].objects[i],'go_to')}
        o=document.createElement("div");
        o.id="item"+i;
        o.setAttribute('onclick','objSelect(this.id,\"'+e.id+'\");arr_e=story_script.'+scen_data[0]+'['+scen_data[1]+'].'+[arr_n]+'.objects['+i+'];event.stopPropagation();');
        o.classList.add("ho_item");o.classList.add("objSelect");
        if(arr_l[arr_n].objects[i].style){o.style=arr_l[arr_n].objects[i].style;}
        o.style.zIndex=1001+i;
        o.style.position="absolute";
        o.style.transformOrigin="top left";
        o.style.top=arr_l[arr_n].objects[i].position[1]+"px"
        o.style.left=arr_l[arr_n].objects[i].position[0]+"px";
        o.style.width=arr_l[arr_n].objects[i].size[0]+"px";
        o.style.height=arr_l[arr_n].objects[i].size[1]+"px";
        o.style.display="flex";
        o.style.transform='translate(0%, 0%) rotate('+arr_l[arr_n].objects[i].angle+'deg)';
        if(arr_l[arr_n].objects[i].fit=='patch'){
            if(!arr_l[arr_n].objects[i].patch){arr_l[arr_n].objects[i].patch=[8,8,8,8]};
            o.style.backgroundImage="none";
            o.style.backgroundSize="none";
            o.style.backgroundClip="padding-box";
            o.style.borderStyle="solid";
            o.style.borderWidth=arr_l[arr_n].objects[i].patch[0]+"px "+arr_l[arr_n].objects[i].patch[1]+"px "+arr_l[arr_n].objects[i].patch[2]+"px "+arr_l[arr_n].objects[i].patch[3]+"px";
            o.style.borderImage="url('"+open_file((arr_l[arr_n].objects[i].art[languare])?arr_l[arr_n].objects[i].art[languare]:arr_l[arr_n].objects[i].art)+"') "+arr_l[arr_n].objects[i].patch[0]+" "+arr_l[arr_n].objects[i].patch[1]+" "+arr_l[arr_n].objects[i].patch[2]+" "+arr_l[arr_n].objects[i].patch[3]+" stretch stretch";
        }else{
            o.style.backgroundImage="url("+open_file(arr_l[arr_n].objects[i].art[languare])+")";
            o.style.backgroundPosition=((arr_l[arr_n].objects[i].art_align)?arr_l[arr_n].objects[i].art_align[0]+" "+arr_l[arr_n].objects[i].art_align[1]:"center");
            o.style.backgroundRepeat="no-repeat";
            if(arr_l[arr_n].objects[i].fit){o.style.backgroundSize=(typeof arr_l[arr_n].objects[i].fit==="object")?arr_l[arr_n].objects[i].fit[0]+" "+arr_l[arr_n].objects[i].fit[1]:arr_l[arr_n].objects[i].fit}
        }
        if(arr_l[arr_n].objects[i].color){o.style.backgroundColor=arr_l[arr_n].objects[i].color}
        if(arr_l[arr_n].objects[i].name){
            o.innerHTML=arr_l[arr_n].objects[i].name[languare];
            if(arr_l[arr_n].objects[i].indent_text){o.style.padding=arr_l[arr_n].objects[i].indent_text;}
            if(arr_l[arr_n].objects[i].color_text){o.style.color=arr_l[arr_n].objects[i].color_text}
            if(arr_l[arr_n].objects[i].size_text){o.style.fontSize=arr_l[arr_n].objects[i].size_text}
            if(arr_l[arr_n].objects[i].font_family){o.style.fontFamily=arr_l[arr_n].objects[i].font_family}
            o.style.whiteSpace="pre-wrap";
            if(arr_l[arr_n].objects[i].align){
                o.style.justifyContent=((arr_l[arr_n].objects[i].align)?arr_l[arr_n].objects[i].align[0]:"center");
                o.style.alignItems=((arr_l[arr_n].objects[i].align)?arr_l[arr_n].objects[i].align[1]:"center");
            }else{o.style.justifyContent="center";o.style.alignItems="center"}
        }
        e.appendChild(o);
        var show_if="<table width='100%'><tbody><tr><td style='width:128px;' valign='bottom'></td><td style='width:48px;border-right:1px solid var(--cb);border-left:1px solid var(--cb);'></td><td></td><td style='width:30px;'></td></tr>"
        if(arr_l[arr_n].objects[i].show_if){
            show_if+="<tr><td colspan='4'><select class='choice_var_operation' onchange='story_script."+scen_data[0]+"["+scen_data[1]+"]."+arr_n+".objects["+i+"].show_if[0]=((this.selectedIndex==0)?true:false);'><option>show if</option><option "+((!arr_l[arr_n].objects[i].show_if[0])?"selected":"")+">hidden if</option></select></td></tr>"
            for(var s=1;s<arr_l[arr_n].objects[i].show_if.length;s++){
                show_if+="<tr><td valign='bottom'><select class='choice_var_name' onchange='story_script."+scen_data[0]+"["+scen_data[1]+"]."+arr_n+".objects["+i+"].show_if["+s+"][0]=this.value'>"+option_var(arr_l[arr_n].objects[i].show_if[s][0])+"</select></td><td style='border-right:1px solid var(--cb);border-left:1px solid var(--cb);'><select class='choice_var_operation' onchange='story_script."+scen_data[0]+"["+scen_data[1]+"]."+arr_n+".objects["+i+"].show_if["+s+"][1]=this.value'><option value='&#61'>&#61</option><option value='&lt;' "+((arr_l[arr_n].objects[i].show_if[s][1]=="<")?"selected":"")+">&lt;</option><option value='&gt;' "+((arr_l[arr_n].objects[i].show_if[s][1]==">")?"selected":"")+">&gt;</option></select></td><td><input class='input_text choice_var_value' onchange='if(parseFloat(this.value)==this.value){story_script."+scen_data[0]+"["+scen_data[1]+"]."+arr_n+".objects["+i+"].show_if["+s+"][2]=parseFloat(this.value)}else{story_script."+scen_data[0]+"["+scen_data[1]+"]."+arr_n+".objects["+i+"].show_if["+s+"][2]=this.value}' value='"+arr_l[arr_n].objects[i].show_if[s][2]+"' type='text'></td><td onclick='story_script."+scen_data[0]+"["+scen_data[1]+"]."+arr_n+".objects["+i+"].show_if.splice("+s+", 1);if(story_script."+scen_data[0]+"["+scen_data[1]+"]."+arr_n+".objects["+i+"].show_if.length<=1){delete story_script."+scen_data[0]+"["+scen_data[1]+"]."+arr_n+".objects["+i+"].show_if;}ho_update();state_save();' style='cursor:pointer;' title='delet' class='icon icon_del'></td></tr>"
            };
        };
        show_if+="</tbody></table>"+((story_script.parameters.variables&&Object.keys(story_script.parameters.variables).length>0)?"<div onclick=\"if(!story_script."+scen_data[0]+"["+scen_data[1]+"]."+arr_n+".objects["+i+"].show_if){story_script."+scen_data[0]+"["+scen_data[1]+"]."+arr_n+".objects["+i+"].show_if=[true]};story_script."+scen_data[0]+"["+scen_data[1]+"]."+arr_n+".objects["+i+"].show_if.push( ['"+Object.keys(story_script.parameters.variables)[0]+"','=',0] );ho_update();state_save();\" class='icon_m icon_add' style='margin-top:4px;padding-bottom:16px;height:26px;width:100%;cursor:pointer;'></div>":"<div onclick=\"setup();set_menu(4);\" class='icon_m icon_add' style='margin-top:16px;height:26px;width:100%;cursor:pointer;'></div>")
        o=document.createElement("div");
        var k="<div id='b_item"+i+"' class='ui_buttons dialog' style='margin:8px;'><table style='width:100%' ondblclick='objSelect(\"item"+i+"\",\""+e.id+"\");arr_e=story_script."+scen_data[0]+"["+scen_data[1]+"]."+arr_n+".objects["+i+"]'><tbody><tr>"
            +"<td width='24px' class='icon_m icon_up'   onclick='move_elenetn(story_script."+scen_data[0]+"["+scen_data[1]+"]."+arr_n+".objects,"+i+",-1);ho_update();state_save();' height='22px'></td>"
            +"<td width='24px' class='icon_m icon_down' onclick='move_elenetn(story_script."+scen_data[0]+"["+scen_data[1]+"]."+arr_n+".objects,"+i+",1);ho_update();state_save();'></td><td>&nbsp;</td>"
            +"<td width='26px' class='icon_show icon_m' style='cursor:pointer;' onclick='panel_m(\"b_item"+i+"\",\""+arr_n+"\",\""+scen_data[0]+"\","+scen_data[1]+","+i+",\"objects\",\"ho_update\")' ></td>"
            +"</tr><tr><td colspan='4' height='40px' align='center'><div id='ho_ip"+i+"' style='background-image:url("+open_file((arr_l[arr_n].objects[i].art[languare])?arr_l[arr_n].objects[i].art[languare]:arr_l[arr_n].objects[i].art)+");background-position:center;background-repeat:no-repeat;background-size:contain;height:100%;width:100%;display:grid;justify-content:center;align-items:center;'>"+ ((arr_l[arr_n].objects[i].name&&arr_l[arr_n].objects[i].name[languare])?arr_l[arr_n].objects[i].name[languare]:"")+" </div></td></tr><tr>"
            +"<td class='icon_m icon_more' height='22px' onclick='block_open(\"ho_is"+i+"\");scen_element.ho_is"+i+"=ho_is"+i+".style.display;menu_objects.style.visibility=\"hidden\"'></td><td colspan='2'></td></tr></tbody></table>"
            +"<table width='100%' id=ho_is"+i+" style='display:"+((scen_element["ho_is"+i])?scen_element["ho_is"+i]:"none")+";border-top:1px solid var(--cb);margin-top:8px;'><tbody><tr>"
            +((arr_n=="terrain_map")?"<tr><td height='40px' align='right' style='padding-right:8px;'><select style='height:28px;width:100%;border-bottom:1px solid var(--cb);' onchange='if(this.selectedIndex==2){story_script."+scen_data[0]+"["+scen_data[1]+"].terrain_map.objects["+i+"].go_to=[story_script.parameters.launch_story,0,0]}else if((this.selectedIndex==1||this.selectedIndex==0)&&typeof story_script."+scen_data[0]+"["+scen_data[1]+"].terrain_map.objects["+i+"].go_to===\"object\"){story_script."+scen_data[0]+"["+scen_data[1]+"].terrain_map.objects["+i+"].go_to=story_script.parameters.launch_story;}if(this.selectedIndex==1){story_script."+scen_data[0]+"["+scen_data[1]+"].terrain_map.objects["+i+"].text_from=true;}else{delete story_script."+scen_data[0]+"["+scen_data[1]+"].terrain_map.objects["+i+"].text_from;}if(this.selectedIndex==3){story_script."+scen_data[0]+"["+scen_data[1]+"].terrain_map.objects["+i+"].url=\"self\";}else{delete story_script."+scen_data[0]+"["+scen_data[1]+"].terrain_map.objects["+i+"].url;};ho_update()'><option "+((!arr_l[arr_n].objects[i].text_from&&typeof arr_l[arr_n].objects[i].go_to!="object")?"selected":"")+">Go to</option><option "+((arr_l[arr_n].objects[i].text_from)?"selected":"")+">Only text from</option><option "+((typeof arr_l[arr_n].objects[i].go_to==="object")?"selected":"")+">Timeline</option><option "+((arr_l[arr_n].objects[i].url)?"selected":"")+">Link</option></select></td>"+((!arr_l[arr_n].objects[i].url&&typeof arr_l[arr_n].objects[i].go_to==="object")?"<td colspan='3' id='tl_show"+i+"' align='center' onclick='timeline_edit(story_script."+scen_data[0]+"["+scen_data[1]+"].terrain_map.objects["+i+"],this.id)'>"+arr_l[arr_n].objects[i].go_to[0]+" / "+arr_l[arr_n].objects[i].go_to[1]+" / "+arr_l[arr_n].objects[i].go_to[2]+"</td>":((arr_l[arr_n].objects[i].url)?"<td style='width:28px;' align='center'><select id='urll"+i+"' onchange='urlt"+i+".value=((story_script."+scen_data[0]+"["+scen_data[1]+"].terrain_map.objects["+i+"].go_to[this.value].length>0)?story_script."+scen_data[0]+"["+scen_data[1]+"].terrain_map.objects["+i+"].go_to[this.value]:\"\")' style='height:28px;width:100%;border-left:1px solid var(--cb);border-right:1px solid var(--cb);border-bottom:1px solid var(--cb);background-color: var(--cw);'>"+project_languares(languare)+"</select></td><td colspan='2'><input id='urlt"+i+"' class='input_text' onchange='story_script."+scen_data[0]+"["+scen_data[1]+"].terrain_map.objects["+i+"].go_to[urll"+i+".value]=this.value;' type='text' style='width:100%;height:28px' value='"+((arr_l[arr_n].objects[i].go_to[languare])?arr_l[arr_n].objects[i].go_to[languare]:"")+"'></td>":"<td style='padding-right:8px;' colspan='3'><select style='height:28px;width:100%;border-bottom:1px solid var(--cb)' onchange='story_script."+scen_data[0]+"["+scen_data[1]+"].terrain_map.objects["+i+"].go_to=this.value'>"+option_block( arr_l[arr_n].objects[i].go_to,0)+"</select></td>"))+((arr_l[arr_n].objects[i].url)?"</tr><tr id><td height='40px' align='right' style='padding-right:8px;'>Open link</td><td colspan='3'><select oninput='story_script."+scen_data[0]+"["+scen_data[1]+"].terrain_map.objects["+i+"].url=this.value;state_save();' style='background-color: var(--cw);'><option value='self'>This tab</option><option "+((arr_l[arr_n].objects[i].url=="blank")?"selected":"")+" value='blank'>New tab</option></select></td>":""):"")
            +"</tr><tr>"
            +"<td height='40px' align='right' style='width:40%;padding-right:8px;'>Name</td><td style='width:28px;' align='center'><select id='ho_tl"+i+"' onchange='ho_t"+i+".value=story_script."+scen_data[0]+"["+scen_data[1]+"]."+arr_n+".objects["+i+"].name[this.value];' style='height:28px;width:100%;border-left:1px solid var(--cb);border-right:1px solid var(--cb);border-bottom:1px solid var(--cb);'>"+project_languares(languare)+"</select></td><td colspan='2'><input id='ho_t"+i+"' class='input_text' onchange='var v=document.getElementById(\"ho_tl"+i+"\");if(!story_script."+scen_data[0]+"["+scen_data[1]+"]."+arr_n+".objects["+i+"].name){story_script."+scen_data[0]+"["+scen_data[1]+"]."+arr_n+".objects["+i+"].name={}};story_script."+scen_data[0]+"["+scen_data[1]+"]."+arr_n+".objects["+i+"].name[v.value]=this.value;ho_update();state_save();' type='text' style='width:100%;height:28px;' value='"+((arr_l[arr_n].objects[i].name&&arr_l[arr_n].objects[i].name[languare])?arr_l[arr_n].objects[i].name[languare]:"")+"'></td>"
            +"</tr><tr>"
            +"<tr><td height='40px' align='right' style='width:40%;padding-right:8px;'>Width size</td><td style='padding-right:8px;' colspan='2'>"
            +"<input id='ho_w"+i+"' class='input_text' onchange='var s=parseInt(correct_value(this.value,true));if(ho_bs"+i+".checked){story_script."+scen_data[0]+"["+scen_data[1]+"]."+arr_n+".objects["+i+"].size[1]=parseInt(story_script."+scen_data[0]+"["+scen_data[1]+"]."+arr_n+".objects["+i+"].size[1]*(s/story_script."+scen_data[0]+"["+scen_data[1]+"]."+arr_n+".objects["+i+"].size[0]))};story_script."+scen_data[0]+"["+scen_data[1]+"]."+arr_n+".objects["+i+"].size[0]=s;item"+i+".style.width=s+\"px\";state_save();if(ho_bs"+i+".checked){ho_update()}' type='text' value='"+arr_l[arr_n].objects[i].size[0]+"' style='width:100%;'>"
            +"<td height='40px' align='right' rowspan='2'><input id='ho_bs"+i+"' type='checkbox' class='proportion_c' checked></td>"
            +"</td></tr>"
            +"<tr><td height='40px' align='right' style='padding-right:8px;'>Height size</td><td style='padding-right:8px;' colspan='2'>"
            +"<input id='ho_h"+i+"' class='input_text' onchange='var s=parseInt(correct_value(this.value,true));if(ho_bs"+i+".checked){story_script."+scen_data[0]+"["+scen_data[1]+"]."+arr_n+".objects["+i+"].size[0]=parseInt(story_script."+scen_data[0]+"["+scen_data[1]+"]."+arr_n+".objects["+i+"].size[0]*(s/story_script."+scen_data[0]+"["+scen_data[1]+"]."+arr_n+".objects["+i+"].size[1]))};story_script."+scen_data[0]+"["+scen_data[1]+"]."+arr_n+".objects["+i+"].size[1]=s;item"+i+".style.height=s+\"px\";state_save();if(ho_bs"+i+".checked){ho_update()}' type='text' value='"+arr_l[arr_n].objects[i].size[1]+"' style='width:100%;'>"
            +"</td></tr>"
            +"<tr><td height='40px' align='right' style='padding-right:8px;'>Sound</td>"
            +"<td colspan='2'><input id='ho_m"+i+"' class='input_text' onchange='story_script."+scen_data[0]+"["+scen_data[1]+"]."+arr_n+".objects["+i+"].sound=this.value;' type='text' style='width:100%;height:28px' value='"+((arr_l[arr_n].objects[i].sound)?arr_l[arr_n].objects[i].sound:'')+"'></td>"
            +"<td height='40px' align='right' style='width:30px;' class='icon icon_load' onclick=\"file_catalog('','audio','ho_m"+i+"','','story_script."+scen_data[0]+"["+scen_data[1]+"]."+arr_n+".objects["+i+"].sound')\">"
            +"</td></tr>"
            +"<tr><td height='40px' align='right' style='padding-right:8px;'>JavaScript</td><td style='padding-right:8px;' colspan='2'><input id='ho_j"+i+"' class='input_text' onchange='story_script."+scen_data[0]+"["+scen_data[1]+"]."+arr_n+".objects["+i+"].js=this.value' type='text' value='"+((arr_l[arr_n].objects[i].js)?arr_l[arr_n].objects[i].js:"")+"' style='width:100%;'></td><td height='40px' align='right' style='width:30px;' class='icon icon_edit' onclick='copy_arr=arr_l."+arr_n+".objects["+i+"];edit_code(\"js\",\"JavaScript\",\"ho_update()\");'>"
            +"</tr><tr>"
            if(arr_n=="terrain_map"){k+="<td height='40px' align='right' style='padding-right:8px;'>Indent text</td>"
            +"<td colspan='3'><input class='input_text' onchange='story_script."+scen_data[0]+"["+scen_data[1]+"]."+arr_n+".objects["+i+"].indent_text=correct_value(this.value);ho_update();state_save();' type='text' style='width:100%;height:28px' value='"+((arr_l[arr_n].objects[i].indent_text)?arr_l[arr_n].objects[i].indent_text:'')+"'></td>"
            +"</tr><tr>"
            +"<td colspan='4' height='40px' align='left' style='padding-left:8px;border-bottom:1px solid var(--cb);'>Text</td></tr>"
            +"<td height='40px' align='right' style='padding-right:8px;'>Text color</td>"
            +"<td style='width:28px;' align='center'><div class='show_color' style='"+((arr_l[arr_n].objects[i].color_text)?"background-color:"+arr_l[arr_n].objects[i].color_text:"")+"'></div></td>"
            +"<td style='padding-right:8px;'><input id='ho_tc"+i+"' class='input_text' onchange='story_script."+scen_data[0]+"["+scen_data[1]+"]."+arr_n+".objects["+i+"].color_text=this.value;ho_update();state_save();' type='text' value='"+((arr_l[arr_n].objects[i].color_text)?arr_l[arr_n].objects[i].color_text:"")+"' style='width:100%;'></td>"
            +"<td height='40px' align='right' style='width:30px;' class='icon icon_color' onclick='edit_color(\"ho_tc"+i+"\",ho_tc"+i+".value);'></td>"
            +"</tr><tr>"
            +"<td height='40px' align='right' style='padding-right:8px;'>Font size</td>"
            +"<td colspan='3'><input id='ho_tfs"+i+"' class='input_text' onchange='story_script."+scen_data[0]+"["+scen_data[1]+"]."+arr_n+".objects["+i+"].size_text=correct_value(this.value);ho_update();state_save();' type='text' style='width:100%;height:28px' value='"+((arr_l[arr_n].objects[i].size_text)?arr_l[arr_n].objects[i].size_text:"")+"'></td>"
            +"</td></tr>"
            +"<td height='40px' align='right' style='padding-right:8px;'>Font family</td>"
            +"<td colspan='3'><input id='ho_tff"+i+"' class='input_text' onchange='story_script."+scen_data[0]+"["+scen_data[1]+"]."+arr_n+".objects["+i+"].font_family=this.value;ho_update();state_save();' type='text' style='width:100%;height:28px' value='"+((arr_l[arr_n].objects[i].font_family)?arr_l[arr_n].objects[i].font_family:"")+"'></td>"
            +"</td></tr>"
            +"<td height='40px' align='right' style='padding-right:8px;'>Align text</td>"
                +"<td colspan='3' align='center'>"
                +"<table style='background-color:var(--cw);border-radius:4px;'><tbody><tr>"
                    +"<td><input class='icon icon_diag align' type='radio' name='ho_ta"+i+"' onchange='story_script."+scen_data[0]+"["+scen_data[1]+"]."+arr_n+".objects["+i+"].align=[\"start\",\"start\"];ho_update();' "+((arr_l[arr_n].objects[i].align&&arr_l[arr_n].objects[i].align[0]=="start"&&arr_l[arr_n].objects[i].align[1]=="start")?"checked":"")+" style='transform:scaleX(-1) scaleY(-1);'></td>"
                    +"<td><input class='icon icon_side align' type='radio' name='ho_ta"+i+"' onchange='story_script."+scen_data[0]+"["+scen_data[1]+"]."+arr_n+".objects["+i+"].align=[\"center\",\"start\"];ho_update();' "+((arr_l[arr_n].objects[i].align&&arr_l[arr_n].objects[i].align[0]=="center"&&arr_l[arr_n].objects[i].align[1]=="start")?"checked":"")+"></td>"
                    +"<td><input class='icon icon_diag align' type='radio' name='ho_ta"+i+"' onchange='story_script."+scen_data[0]+"["+scen_data[1]+"]."+arr_n+".objects["+i+"].align=[\"end\",\"start\"];ho_update();' "+((arr_l[arr_n].objects[i].align&&arr_l[arr_n].objects[i].align[0]=="end"&&arr_l[arr_n].objects[i].align[1]=="start")?"checked":"")+" style='transform:scaleY(-1);'></td>"
                +"</tr><tr>"
                    +"<td><input class='icon icon_side align' type='radio' name='ho_ta"+i+"' onchange='story_script."+scen_data[0]+"["+scen_data[1]+"]."+arr_n+".objects["+i+"].align=[\"start\",\"center\"];ho_update();' "+((arr_l[arr_n].objects[i].align&&arr_l[arr_n].objects[i].align[0]=="start"&&arr_l[arr_n].objects[i].align[1]=="center")?"checked":"")+" style='transform:rotate(270deg);'></td>"
                    +"<td><input class='icon icon_cent align' type='radio' name='ho_ta"+i+"' onchange='delete story_script."+scen_data[0]+"["+scen_data[1]+"]."+arr_n+".objects["+i+"].align;ho_update();' "+((!arr_l[arr_n].objects[i].align)?"checked":"")+"></td>"
                    +"<td><input class='icon icon_side align' type='radio' name='ho_ta"+i+"' onchange='story_script."+scen_data[0]+"["+scen_data[1]+"]."+arr_n+".objects["+i+"].align=[\"end\",\"center\"];ho_update();' "+((arr_l[arr_n].objects[i].align&&arr_l[arr_n].objects[i].align[0]=="end"&&arr_l[arr_n].objects[i].align[1]=="center")?"checked":"")+" style='transform:rotate(90deg);'></td>"
                +"</tr><tr>"
                    +"<td><input class='icon icon_diag align' type='radio' name='ho_ta"+i+"' onchange='story_script."+scen_data[0]+"["+scen_data[1]+"]."+arr_n+".objects["+i+"].align=[\"start\",\"end\"];ho_update();' "+((arr_l[arr_n].objects[i].align&&arr_l[arr_n].objects[i].align[0]=="start"&&arr_l[arr_n].objects[i].align[1]=="end")?"checked":"")+" style='transform:scaleX(-1);'></td>"
                    +"<td><input class='icon icon_side align' type='radio' name='ho_ta"+i+"' onchange='story_script."+scen_data[0]+"["+scen_data[1]+"]."+arr_n+".objects["+i+"].align=[\"center\",\"end\"];ho_update();' "+((arr_l[arr_n].objects[i].align&&arr_l[arr_n].objects[i].align[0]=="center"&&arr_l[arr_n].objects[i].align[1]=="end")?"checked":"")+" style='transform:scaleY(-1);'></td>"
                    +"<td><input class='icon icon_diag align' type='radio' name='ho_ta"+i+"' onchange='story_script."+scen_data[0]+"["+scen_data[1]+"]."+arr_n+".objects["+i+"].align=[\"end\",\"end\"];ho_update();' "+((arr_l[arr_n].objects[i].align&&arr_l[arr_n].objects[i].align[0]=="end"&&arr_l[arr_n].objects[i].align[1]=="end")?"checked":"")+" style='transform:scaleX(1);'></td>"
                +"</tr></tbody></table>"
                +"</td>"
            +'</tr><tr>'}
        k+="<td colspan='4' height='40px' align='left' style='padding-left:8px;border-bottom:1px solid var(--cb);'>Art</td></tr>"
            +"<td height='40px' align='right' style='padding-right:8px;'>Art</td>"
            +"<td style='width:28px;' align='center'><select id='hois_artl"+i+"' onchange='if(!story_script."+scen_data[0]+"["+scen_data[1]+"]."+arr_n+".objects["+i+"].art[languare]){data_la(story_script."+scen_data[0]+"["+scen_data[1]+"]."+arr_n+".objects["+i+"],\"art\")} ;hois_art"+i+".value=story_script."+scen_data[0]+"["+scen_data[1]+"]."+arr_n+".objects["+i+"].art[this.value];' style='height:28px;width:100%;border-left:1px solid var(--cb);border-right:1px solid var(--cb);border-bottom:1px solid var(--cb);'>"+project_languares(languare)+"</select></td>"
            +"<td><input id='hois_art"+i+"' class='input_text' onchange='if(!story_script."+scen_data[0]+"["+scen_data[1]+"]."+arr_n+".objects["+i+"].art){story_script."+scen_data[0]+"["+scen_data[1]+"]."+arr_n+".objects["+i+"].art=[]};story_script."+scen_data[0]+"["+scen_data[1]+"]."+arr_n+".objects["+i+"].art[hois_artl"+i+".value]=this.value;ho_update();state_save();' type='text' style='width:100%;height:28px' value='"+((arr_l[arr_n].objects[i].art)?arr_l[arr_n].objects[i].art[languare]:"")+"'></td>"
            +"<td height='40px' align='right' style='width:30px;' class='icon icon_load' onclick='file_catalog(\"\",\"img\",\"hois_art"+i+"\",\"\",\"story_script."+scen_data[0]+"["+scen_data[1]+"]."+arr_n+".objects["+i+"].art[hois_artl"+i+".value]\");'></td>"
            +"</td></tr>"
            +"<tr><td height='40px' align='right' style='padding-right:8px;'>Size</td><td style='padding-right:8px;' colspan='3'>"
            +"<select onchange='if(this.selectedIndex==0){delete story_script."+scen_data[0]+"["+scen_data[1]+"]."+arr_n+".objects["+i+"].fit}else{story_script."+scen_data[0]+"["+scen_data[1]+"]."+arr_n+".objects["+i+"].fit=this.value};ho_update();state_save();' style='height:28px;width:100%;border-bottom:1px solid var(--cb);'>"
                +"<option value=''>original</option>"
                +"<option "+((arr_l[arr_n].objects[i].fit=="cover")?"selected":"")+" value='cover'>cover</option>"
                +"<option "+((arr_l[arr_n].objects[i].fit=="contain")?"selected":"")+" value='contain'>contain</option>"
                +"<option "+((arr_l[arr_n].objects[i].fit=="100% 100%")?"selected":"")+" value='100% 100%'>fill</option>"
                +'<option '+((arr_l[arr_n].objects[i].fit=='patch')?'selected':'')+' value="patch">9-patch</option>'
            +"</select></td></tr>"
        if(arr_n=="terrain_map"){if(!arr_l[arr_n].objects[i].fit||(arr_l[arr_n].objects[i].fit!='patch'&&arr_l[arr_n].objects[i].fit!='cover'&&arr_l[arr_n].objects[i].fit!='contain'&&arr_l[arr_n].objects[i].fit!='100% 100%')){k+="<tr><td height='40px' align='right' style='width:40%;padding-right:8px;'>Width art</td><td style='padding-right:8px;' colspan='3'>"
                +"<input id='ho_aw"+i+"' class='input_text' onchange='if(typeof story_script."+scen_data[0]+"["+scen_data[1]+"]."+arr_n+".objects["+i+"].fit!==\"object\"){story_script."+scen_data[0]+"["+scen_data[1]+"]."+arr_n+".objects["+i+"].fit=[correct_value(this.value),\"auto\"]}else{story_script."+scen_data[0]+"["+scen_data[1]+"]."+arr_n+".objects["+i+"].fit[0]=correct_value(this.value)};if(ho_ah"+i+".value.length==0){story_script."+scen_data[0]+"["+scen_data[1]+"]."+arr_n+".objects["+i+"].fit[1]=\"auto\"};ho_update();state_save();' type='text' value='"+((arr_l[arr_n].objects[i].fit)?arr_l[arr_n].objects[i].fit[0]:"")+"' style='width:100%;'>"
            +"</td></tr>"
                +"<tr><td height='40px' align='right' style='padding-right:8px;'>Height art</td><td style='padding-right:8px;' colspan='3'>"
                +"<input id='ho_ah"+i+"' class='input_text' onchange='if(typeof story_script."+scen_data[0]+"["+scen_data[1]+"]."+arr_n+".objects["+i+"].fit!==\"object\"){story_script."+scen_data[0]+"["+scen_data[1]+"]."+arr_n+".objects["+i+"].fit=[\"auto\",correct_value(this.value)]}else{story_script."+scen_data[0]+"["+scen_data[1]+"]."+arr_n+".objects["+i+"].fit[1]=correct_value(this.value)};if(ho_aw"+i+".value.length==0){story_script."+scen_data[0]+"["+scen_data[1]+"]."+arr_n+".objects["+i+"].fit[0]=\"auto\"};ho_update();state_save();' type='text' value='"+((arr_l[arr_n].objects[i].fit)?arr_l[arr_n].objects[i].fit[1]:"")+"' style='width:100%;'>"
            +"</td></tr>"}
            if(arr_l[arr_n].objects[i].fit=='patch'){k+='</tr><tr>'
                    +'<td height="40px" align="right" style="padding-right:8px;">Top border</td>'
                    +'<td colspan="3"><input class="input_text" onchange="story_script.'+scen_data[0]+'['+scen_data[1]+'].'+arr_n+'.objects['+i+'].patch[0]=parseInt(correct_value(this.value,true));ho_update();state_save();" type="text" style="width:100%;height:28px" value="'+((arr_l[arr_n].objects[i].patch)?arr_l[arr_n].objects[i].patch[0]:'')+'"></td>'
                +'</tr><tr>'
                    +'<td height="40px" align="right" style="padding-right:8px;">Left border</td>'
                    +'<td colspan="3"><input class="input_text" onchange="story_script.'+scen_data[0]+'['+scen_data[1]+'].'+arr_n+'.objects['+i+'].patch[3]=parseInt(correct_value(this.value,true));ho_update();state_save();" type="text" style="width:100%;height:28px" value="'+((arr_l[arr_n].objects[i].patch)?arr_l[arr_n].objects[i].patch[3]:'')+'"></td>'
                +'</tr><tr>'
                    +'<td height="40px" align="right" style="padding-right:8px;">Right border</td>'
                    +'<td colspan="3"><input class="input_text" onchange="story_script.'+scen_data[0]+'['+scen_data[1]+'].'+arr_n+'.objects['+i+'].patch[1]=parseInt(correct_value(this.value,true));ho_update();state_save();" type="text" style="width:100%;height:28px" value="'+((arr_l[arr_n].objects[i].patch)?arr_l[arr_n].objects[i].patch[1]:'')+'"></td>'
                +'</tr><tr>'
                    +'<td height="40px" align="right" style="padding-right:8px;">Bottom border</td>'
                    +'<td colspan="3"><input class="input_text" onchange="story_script.'+scen_data[0]+'['+scen_data[1]+'].'+arr_n+'.objects['+i+'].patch[2]=parseInt(correct_value(this.value,true));ho_update();state_save();" type="text" style="width:100%;height:28px" value="'+((arr_l[arr_n].objects[i].patch)?arr_l[arr_n].objects[i].patch[2]:'')+'"></td>'
                +"</tr><tr>"
            }else if(arr_l[arr_n].objects[i].fit!='100% 100%'){k+="<td height='40px' align='right' style='padding-right:8px;'>Align art</td>"
                +"<td colspan='3' align='center'>"
                +"<table style='background-color:var(--cw);border-radius:4px;'><tbody><tr>"
                    +"<td><input class='icon icon_diag align' type='radio' name='ho_aa"+i+"' onchange='story_script."+scen_data[0]+"["+scen_data[1]+"]."+arr_n+".objects["+i+"].art_align=[\"left\",\"top\"];ho_update();' "+((arr_l[arr_n].objects[i].art_align&&arr_l[arr_n].objects[i].art_align[0]=="left"&&arr_l[arr_n].objects[i].art_align[1]=="top")?"checked":"")+" style='transform:scaleX(-1) scaleY(-1);'></td>"
                    +"<td><input class='icon icon_side align' type='radio' name='ho_aa"+i+"' onchange='story_script."+scen_data[0]+"["+scen_data[1]+"]."+arr_n+".objects["+i+"].art_align=[\"center\",\"top\"];ho_update();' "+((arr_l[arr_n].objects[i].art_align&&arr_l[arr_n].objects[i].art_align[0]=="center"&&arr_l[arr_n].objects[i].art_align[1]=="top")?"checked":"")+"></td>"
                    +"<td><input class='icon icon_diag align' type='radio' name='ho_aa"+i+"' onchange='story_script."+scen_data[0]+"["+scen_data[1]+"]."+arr_n+".objects["+i+"].art_align=[\"right\",\"top\"];ho_update();' "+((arr_l[arr_n].objects[i].art_align&&arr_l[arr_n].objects[i].art_align[0]=="right"&&arr_l[arr_n].objects[i].art_align[1]=="top")?"checked":"")+" style='transform:scaleY(-1);'></td>"
                +"</tr><tr>"
                    +"<td><input class='icon icon_side align' type='radio' name='ho_aa"+i+"' onchange='story_script."+scen_data[0]+"["+scen_data[1]+"]."+arr_n+".objects["+i+"].art_align=[\"left\",\"center\"];ho_update();' "+((arr_l[arr_n].objects[i].art_align&&arr_l[arr_n].objects[i].art_align[0]=="left"&&arr_l[arr_n].objects[i].art_align[1]=="center")?"checked":"")+" style='transform:rotate(270deg);'></td>"
                    +"<td><input class='icon icon_cent align' type='radio' name='ho_aa"+i+"' onchange='delete story_script."+scen_data[0]+"["+scen_data[1]+"]."+arr_n+".objects["+i+"].art_align;ho_update();' "+((!arr_l[arr_n].objects[i].art_align)?"checked":"")+"></td>"
                    +"<td><input class='icon icon_side align' type='radio' name='ho_aa"+i+"' onchange='story_script."+scen_data[0]+"["+scen_data[1]+"]."+arr_n+".objects["+i+"].art_align=[\"right\",\"center\"];ho_update();' "+((arr_l[arr_n].objects[i].art_align&&arr_l[arr_n].objects[i].art_align[0]=="right"&&arr_l[arr_n].objects[i].art_align[1]=="center")?"checked":"")+" style='transform:rotate(90deg);'></td>"
                +"</tr><tr>"
                    +"<td><input class='icon icon_diag align' type='radio' name='ho_aa"+i+"' onchange='story_script."+scen_data[0]+"["+scen_data[1]+"]."+arr_n+".objects["+i+"].art_align=[\"left\",\"bottom\"];ho_update();' "+((arr_l[arr_n].objects[i].art_align&&arr_l[arr_n].objects[i].art_align[0]=="left"&&arr_l[arr_n].objects[i].art_align[1]=="bottom")?"checked":"")+" style='transform:scaleX(-1);'></td>"
                    +"<td><input class='icon icon_side align' type='radio' name='ho_aa"+i+"' onchange='story_script."+scen_data[0]+"["+scen_data[1]+"]."+arr_n+".objects["+i+"].art_align=[\"center\",\"bottom\"];ho_update();' "+((arr_l[arr_n].objects[i].art_align&&arr_l[arr_n].objects[i].art_align[0]=="center"&&arr_l[arr_n].objects[i].art_align[1]=="bottom")?"checked":"")+" style='transform:scaleY(-1);'></td>"
                    +"<td><input class='icon icon_diag align' type='radio' name='ho_aa"+i+"' onchange='story_script."+scen_data[0]+"["+scen_data[1]+"]."+arr_n+".objects["+i+"].art_align=[\"right\",\"bottom\"];ho_update();' "+((arr_l[arr_n].objects[i].art_align&&arr_l[arr_n].objects[i].art_align[0]=="right"&&arr_l[arr_n].objects[i].art_align[1]=="bottom")?"checked":"")+" style='transform:scaleX(1);'></td>"
                +"</tr></tbody></table>"
                +"</td>"
            +"</tr><tr>"}
        }
        k+="<td colspan='4' height='40px' align='left' style='padding-left:8px;border-bottom:1px solid var(--cb);'>Position</td></tr>"
            +"<tr><td height='40px' align='right' style='width:40%;padding-right:8px;'>Left position</td><td style='padding-right:8px;' colspan='3'>"
            +"<input id='ho_w"+i+"' class='input_text' onchange='story_script."+scen_data[0]+"["+scen_data[1]+"]."+arr_n+".objects["+i+"].position[0]=parseInt(correct_value(this.value,true));ho_update();state_save();' type='text' value='"+arr_l[arr_n].objects[i].position[0]+"' style='width:100%;'>"
            +"</td></tr>"
            +"<tr><td height='40px' align='right' style='padding-right:8px;'>Top position</td><td style='padding-right:8px;' colspan='3'>"
            +"<input id='ho_h"+i+"' class='input_text' onchange='story_script."+scen_data[0]+"["+scen_data[1]+"]."+arr_n+".objects["+i+"].position[1]=parseInt(correct_value(this.value,true));ho_update();state_save();' type='text' value='"+arr_l[arr_n].objects[i].position[1]+"' style='width:100%;'>"
            +"</td></tr>"
            +"<tr><td height='40px' align='right' style='padding-right:8px;'>Angle</td><td style='padding-right:8px;' colspan='3'>"
            +"<input id='ho_a"+i+"' class='input_text' onchange='story_script."+scen_data[0]+"["+scen_data[1]+"]."+arr_n+".objects["+i+"].angle=parseInt(correct_value(this.value,true));ho_update();state_save();' type='text' value='"+((arr_l[arr_n].objects[i].angle)?arr_l[arr_n].objects[i].angle:0)+"' style='width:100%;'>"
            +"</td></tr>"
            +"<td colspan='4' height='40px' align='left' style='padding-left:8px;border-bottom:1px solid var(--cb);'>Style</td></tr>"
            +"<tr><td height='40px' align='right' style='padding-right:8px;'>Class name</td><td style='padding-right:8px;' colspan='3'>"
            +"<input id='ho_c"+i+"' class='input_text' onchange='story_script."+scen_data[0]+"["+scen_data[1]+"]."+arr_n+".objects["+i+"].className=this.value;' type='text' value='"+((arr_l[arr_n].objects[i].className)?arr_l[arr_n].objects[i].className:"")+"' style='width:100%;'>"
            +"</td></tr>"
            +"<tr><td height='40px' align='right' style='padding-right:8px;'>Style CSS</td><td style='padding-right:8px;' colspan='2'>"
            +"<input id='ho_s"+i+"' class='input_text' onchange='story_script."+scen_data[0]+"["+scen_data[1]+"]."+arr_n+".objects["+i+"].style=this.value;ho_update();' type='text' value='"+((arr_l[arr_n].objects[i].style)?arr_l[arr_n].objects[i].style:"")+"' style='width:100%;'>"
            +"</td><td height='40px' align='right' style='width:30px;' class='icon icon_edit' onclick='copy_arr=arr_l."+arr_n+".objects["+i+"];edit_code(\"style\",\"Style CSS\",\"ho_update()\");'>"
            +"</td></tr>"
        if(arr_n=="terrain_map"){k+="<td height='40px' align='right' style='padding-right:8px;'>Color</td>"
            +"<td style='width:28px;' align='center'><div class='show_color' style='"+((arr_l[arr_n].objects[i].color)?"background-color:"+arr_l[arr_n].objects[i].color:"")+"'></div></td>"
            +"<td style='padding-right:8px;'><input id='ho_ec"+i+"' class='input_text' onchange='story_script."+scen_data[0]+"["+scen_data[1]+"]."+arr_n+".objects["+i+"].color=this.value;ho_update();state_save();' type='text' value='"+((arr_l[arr_n].objects[i].color)?arr_l[arr_n].objects[i].color:"")+"' style='width:100%;'></td>"
            +"<td height='40px' align='right' style='width:30px;' class='icon icon_color' onclick='edit_color(\"ho_ec"+i+"\",ho_ec"+i+".value);'></td>"
            +"</tr><tr>"
            +"<td colspan='4' height='40px' align='left' style='padding-left:8px;border-bottom:1px solid var(--cb);'>Display conditions</td></tr><tr><td colspan='4'>"+show_if+"</td></tr>"}
        k+="</tbody></table></div>";
        o.innerHTML=k;
        c.appendChild(o);
    }adden_sizer(e,"ho_stopResize(angle);");
}
function ho_stopResize(a){
    var b=((objFocus.style.paddingTop.replace('px',''))*2)+((objFocus.style.borderTopWidth)?parseFloat(objFocus.style.borderTopWidth):0)+((objFocus.style.borderBottomWidth)?parseFloat(objFocus.style.borderBottomWidth):0);
    var r=((objFocus.style.paddingLeft.replace('px',''))*2)+((objFocus.style.borderRightWidth)?parseFloat(objFocus.style.borderRightWidth):0)+((objFocus.style.borderLeftWidth)?parseFloat(objFocus.style.borderLeftWidth):0);
    arr_e.position=[parseInt(ho_room_sizer.style.left),parseInt(ho_room_sizer.style.top)];
    arr_e.size=[parseInt(ho_room_sizer.style.width)-r,parseInt(ho_room_sizer.style.height)-b];
    if(a&&a!=0){arr_e.angle=a.toFixed(2);}
    droppFocus(document.getElementById("ho_room_sizer"));off_drag();state_save();ho_update();
}
function ho_close(a){
    droppFocus(document.getElementById('ho_room_sizer'));
    data_only(arr_l[arr_n],'art');
    if(arr_n=="terrain_map"&&arr_l[arr_n].scroll==0&&arr_l[arr_n].scroll[1]==0){ delete arr_l[arr_n].scroll}
    for(var i=0;i<arr_l[arr_n].objects.length;i++){
        if(arr_l[arr_n].objects[i].name){data_only(arr_l[arr_n].objects[i],'name')}
        if(arr_l[arr_n].objects[i].art){data_only(arr_l[arr_n].objects[i],'art')}
        if(arr_l[arr_n].objects[i].url){data_only(arr_l[arr_n].objects[i],'go_to')};
    }
    open_tool();update_novel();
}
function open_tool(content,update){
    if(content&&tools_zone.style.visibility!="visible"){
        if(update){tool_update=update}else{tool_update=false;};
        html.style.overflow='hidden';
        menu_panel.style.zIndex='10010';
        tools_zone.innerHTML=content;
        tools_zone.style.visibility="visible";
        scroll_block=true;scene_screen=true;scene_scroll=true;tool_scale=1;
    }else{
        tool_update=false;
        tools_zone.style.visibility="hidden";
        html.style.overflow='scroll';
        menu_panel.style.zIndex=null;
        tools_zone.innerHTML="";
        scroll_block=false;scene_screen=false;
    }
}
function adden_sizer(id,f){
    var r=document.getElementById(id.id+"_sizer");
    if(!r){
        r=document.createElement("div");
        r.style='visibility:hidden;';
        r.id=id.id+"_sizer";
        r.className="drag";
        r.innerHTML="<div class='resizer size-right'></div><div class='resizer size-top'></div><div class='resizer size-left'></div><div class='resizer size-bottom'></div><div class='resizer top-right'></div><div class='resizer top-left'></div><div class='resizer bottom-left'></div><div class='resizer bottom-right'></div><div class='resizer rotate'></div>";
        id.appendChild(r);
    }make_resizable(r,f);
}
function adden_scroll(id,z){
    id.onmousedown=function(e){
    if(scene_scroll){
        startmove_x=e.clientX;
        startmove_y=e.clientY;
        scroll_y=this.scrollTop;
        scroll_x=this.scrollLeft;
        this.onmousemove=function(e) {
            this.scrollTop=scroll_y-(e.clientY-startmove_y);
            this.scrollLeft=scroll_x-(e.clientX-startmove_x);
        };
        this.onmouseup=function (e){
            startmove_x=null;
            startmove_y=null;
            this.onmousemove=null;
            this.onmouseup=null;
        };
		this.onmouseleave=function(){
			this.onmousemove=null;
			this.onmouseup=null;
			document.onmousemove=null;
			document.onmouseup=null;
		};
    }}
    id.ontouchstart=function(e) {
    if(scene_scroll){
        if(e.touches.length>1){dictat_s=Math.sqrt((e.touches[0].clientX-e.touches[1].clientX)**2+(e.touches[0].clientY-e.touches[1].clientY)**2)}
        this.ontouchmove=function(e){
            if(z&&e.touches.length>1){
                dictat_m=((Math.sqrt((e.touches[0].clientX-e.touches[1].clientX)**2+(e.touches[0].clientY-e.touches[1].clientY)**2))-dictat_s)/1000;
                z.style.transform='scale('+Math.min(2,Math.max(0.25,(tool_scale+dictat_m)))+')';
                scene_view.style.overflow="hidden";
            }
        };
        this.ontouchend=function(e){
            startmove_x=null;
            startmove_y=null;
            this.ontouchmove=null;
            this.ontouchend=null;
            scene_view.style.overflow="auto";
            tool_scale=Math.min(2,Math.max(0.25,(tool_scale+dictat_m)));dictat_m=0;
        };
    }}
}
function random_choice_edit(){
    let var_if="";
    for(var i=0;i<arr_l[arr_n].random_choice.length;i++){var_if+="<tr><td><select class='random_block'>"+option_block(arr_l[arr_n].random_choice[i][1],0)+"</select></td><td style='width:24px;cursor:pointer;background-position:right center;' onclick=\"var a=this.closest('tr');a.parentElement.removeChild(a);\" title='delet' class='icon icon_del'></td></tr>"}
    var html="<div class='window' style='min-width:128px;padding-bottom:8px;'><div class='win_head'>Random choice<div class='window_close icon icon_close' onclick='modal_window(\"close\")'></div></div><hr style='margin:0;'> <br><div style='max-height:70vh;overflow-x:hidden;overflow-y:auto;'><table width='100%' id='random_choice_edit'><tbody>"
    +var_if+"</tbody></table><div aling='center' onclick=\"random_choice_new()\" class='icon icon_add' style='margin-top:16px;height:26px;width:26px;cursor:pointer;'></div> </div><br><table class='big_button' width='256px' onclick='random_choice_apply()'><tbody><tr><td width='42px' class='icon icon_ok'></td><td align='center'>Apply</td><td width='42px'></td></tr></tbody></table></div>"
	modal_window("open",html);
}
function random_choice_new(){
	let tbody=document.getElementById('random_choice_edit').getElementsByTagName('tbody')[0];
	let row=document.createElement("tr");
    let td2=document.createElement("td");
    var td7=document.createElement("td");
    td2.innerHTML="<select class='random_block'>"+option_block(story_script.parameters.launch_story,0)+"</select>";
    td7.style="width:24px;cursor:pointer;background-position:right center;";
    td7.title="delet";
    td7.className="icon icon_del";
    td7.setAttribute("onclick","var a=this.closest('tr');a.parentElement.removeChild(a);");
    row.appendChild(td2);
    row.appendChild(td7);
    tbody.appendChild(row);
}
function random_choice_apply(){
    arr_l[arr_n].random_choice=[];
    let li_b=document.getElementsByClassName("random_block");
    for(var i=0;i<li_b.length;i++){ arr_l[arr_n].random_choice.push(["go_to",li_b[i].value])}
	modal_window('close');
	update_novel();state_save();
}
function legacy_choice_edit(){
	var var_if="<table width='100%' id='legacy_choice_edit'><tbody>";
	for(var i=0;i<arr_l[arr_n].legacy_choice.length-1;i++){
		var_if+="<tr><td style='padding-right:4px;white-space:nowrap;' align='right'>"+((i==0)?"if {":"else if {")+"</td>"
		+"<td style='width:128px;' valign='bottom'><select class='legacy_var'>"+option_var(arr_l[arr_n].legacy_choice[i][0])+"</select></td>"
		+"<td style='width:24px;border-right:1px solid var(--cb);border-left:1px solid var(--cb);' valign='bottom'><select class='legacy_compare'><option value='&#61' "+((arr_l[arr_n].legacy_choice[i][1]=="=")?"selected":"")+">&#61</option><option value='&lt;' "+((arr_l[arr_n].legacy_choice[i][1]=="<")?"selected":"")+">&lt;</option><option value='&gt;' "+((arr_l[arr_n].legacy_choice[i][1]==">")?"selected":"")+">&gt;</option></select></td>"
        +"<td style='width:64px;' valign='bottom'><input class='input_text legacy_value' value='"+arr_l[arr_n].legacy_choice[i][2]+"' type='text'></td>"
		+"<td style='width:92px;font-size:12px;' align='center' valign='center'>} go to:</td>"
		+"<td style='width:128px;' valign='bottom'><select class='legacy_block'>"+option_block(arr_l[arr_n].legacy_choice[i][3],0)+"</select></td>"
		+"<td style='width:40px;cursor:pointer;' onclick=\"var a=this.closest('tr');a.parentElement.removeChild(a);\" title='delet' class='icon icon_del'></td>"
		+"</tr>";
	}
	var_if+="</tbody><tbody><tr><td style='width:40px;'>else</td><td colspan='5'><select id='legacy_go_to' class='input_text'>"+option_block(arr_l[arr_n].legacy_choice[i].go_to,0)+"</select></td><td style='width:40px;'></td></tr></tbody></table><div aling='center' onclick=\"legacy_choice_new()\" class='icon icon_add' style='margin-top:16px;height:26px;width:26px;cursor:pointer;'></div>"
    var html="<div class='window' style='min-width:512px;'><div class='win_head'>Legacy choice edit<div class='window_close icon icon_close' onclick='modal_window(\"close\")'></div></div><hr style='margin:0;'><p class='text_tutorials_a select_tutorials'>"+texts.tutorials[0].en+"</p><br><div style='max-height:70vh;overflow-x:hidden;overflow-y:auto;'>"+var_if+"</div><br><table class='big_button' width='256px' onclick='legacy_choice_apply()'><tbody><tr><td width='42px' class='icon icon_ok'></td><td align='center'>Apply</td><td width='42px'></td></tr></tbody></table></div>"
	modal_window("open",html);
}
function legacy_choice_new(){
	var tbody=document.getElementById('legacy_choice_edit').getElementsByTagName('tbody')[0];
	var row=document.createElement("tr");
    var td1=document.createElement("td");
    var td2=document.createElement("td");
    var td3=document.createElement("td");
    var td4=document.createElement("td");
    var td5=document.createElement("td");
    var td6=document.createElement("td");
    var td7=document.createElement("td");
	td1.innerHTML="else if {";
    td1.align="right";
	td1.style="padding-right:4px;white-space:nowrap;";
	td2.innerHTML="<select class='legacy_var'>"+option_var()+"</select>";
	td3.innerHTML="<select class='legacy_compare'><option value='&#61'>&#61</option><option value='&lt;'>&lt;</option><option value='&gt;'>&gt;</option></select>";
	td3.style="border-right:1px solid var(--cb);border-left:1px solid var(--cb);";
	td4.innerHTML="<input class='input_text legacy_value' value='' type='text'>";
	td5.innerHTML="} go to:";
    td5.style="white-space:nowrap;";
	td5.setAttribute("valign","center");
	td5.setAttribute("align","center");
	td6.innerHTML="<select class='legacy_block'>"+option_block(story_script.parameters.launch_story,0)+"</select>";
    td7.style="cursor:pointer;";
    td7.title="delet";
    td7.className="icon icon_del";
    td7.setAttribute("onclick","var a=this.closest('tr');a.parentElement.removeChild(a);");
	row.appendChild(td1);
    row.appendChild(td2);
    row.appendChild(td3);
	row.appendChild(td4);
    row.appendChild(td5);
    row.appendChild(td6);
    row.appendChild(td7);
    tbody.appendChild(row);
}
function legacy_choice_apply(){
    arr_l[arr_n].legacy_choice=[];
    li_v=document.getElementsByClassName("legacy_var");
    li_c=document.getElementsByClassName("legacy_compare");
    li_z=document.getElementsByClassName("legacy_value");
    li_b=document.getElementsByClassName("legacy_block");
    for(var i=0;i<li_v.length;i++){if(li_z[i].value){arr_l[arr_n].legacy_choice.push([li_v[i].value,li_c[i].value,((parseFloat(li_z[i].value)==li_z[i].value)?parseFloat(li_z[i].value):li_z[i].value),li_b[i].value])}}
	arr_l[arr_n].legacy_choice.push({"go_to":legacy_go_to.value})
	modal_window('close');
	update_novel();state_save();
}
function duplicat_arr(){arr_l.splice(arr_n,0,JSON.parse(JSON.stringify(arr_l[arr_n])));update_novel();state_save();}
function element_del(){arr_l.splice(arr_n,1);update_novel();state_save();}
function element_dialog_del(){delete arr_l[arr_n];update_novel();state_save();}
function dialog_add(){arr_l.push({});arr_n=arr_l.length-1;update_novel();state_save();}
function element_to(){
    if(arr_n=='go_to'||arr_n=='back_to'){arr_l[arr_n]=story_script.parameters.launch_story;}
    else if(arr_n=='event'){arr_l[arr_n]="event";}
    else if(arr_n=='controll'){arr_l[arr_n]="visible"}
    else if(arr_n=='no_autosave'){arr_l[arr_n]=true}
    else if(arr_n=='variables'){arr_l[arr_n]=[[Object.keys(story_script.parameters.variables)[0], "add", 1]];variables_set_edit()}
    else if(arr_n=='choice'){arr_l.choice=[];edit_choice();}
    else if(arr_n=='text'){arr_l.text={};for(var i=0;i<story_script.parameters.languares.length;i++){arr_l.text[story_script.parameters.languares[i]]='';}}
    else if(arr_n=='text_add'){arr_l.text_add={};for(var i=0;i<story_script.parameters.languares.length;i++){arr_l.text_add[story_script.parameters.languares[i]]='';}}
    else if(arr_n=='sound'){arr_l[arr_n]=""}
    else if(arr_n=='video'){arr_l[arr_n]={"url":""}}
    else if(arr_n=='sound_stop'){arr_l[arr_n]=""}
    else if(arr_n=='timer'){arr_l[arr_n]=["3000",story_script.parameters.launch_story]}
	update_novel();
}
function dialog_audio_edit(id){
    arr_e=languare;
    if(!arr_l[arr_n][languare]){
        var s=JSON.parse(JSON.stringify(arr_l[arr_n]));
        copy_arr[arr_n]={};
        for(var i=0;i<story_script.parameters.languares.length;i++){copy_arr[arr_n][story_script.parameters.languares[i]]=s;}
    }else{copy_arr=JSON.parse(JSON.stringify(arr_l))}
    var html="<div class='window' style='width:480px;'><div class='win_head'>"+((arr_n!="sound_stop")?"Play sound":"Stop sound")+"<div class='window_close icon icon_close' onclick='modal_window(\"close\")'></div></div><hr style='margin:0;'>"
		+"<table style='height:32px;border-bottom:1px solid var(--cb);width:100%;'><tbody><tr><td width='80px' align='center'>language:</td><td><select id='audio_la' onchange='dialog_audio_save(arr_e);document.getElementById(\"dialog_audio\").getElementsByTagName(\"tbody\")[0].innerHTML=dialog_audio_update(this.value);arr_e=this.value;' style='height:32px;width:40px;border-bottom:0;border-left:1px solid var(--cb);border-right:1px solid var(--cb);'>"+project_languares(languare)+"</select></td></tr></tbody></table>"
		+"<div style='max-height:70vh;overflow-x:hidden;overflow-y:auto;'><table id='dialog_audio' style='width:100%'><tbody>"+dialog_audio_update(languare)+"</tbody></table>"
		+"<div onclick='dialog_audio_add()' class='icon icon_add' style='margin:16px 0;height:26px;width:26px;cursor:pointer;'></div></div><table class='big_button' width='256px' onclick='dialog_audio_save(arr_e);data_only(copy_arr,arr_n);arr_l[arr_n]=JSON.parse(JSON.stringify(copy_arr[arr_n]));modal_window(\"close\");state_save();update_novel();'><tbody><tr><td width='42px' class='icon icon_ok'></td><td align='center'>Apply</td><td width='42px'></td></tr></tbody></table></div>"
    modal_window("open",html);
}
function dialog_audio_save(l){
    var tbody=document.getElementById('dialog_audio').getElementsByTagName('tr');
    if(tbody.length==0){modal_window("close");}
    else if(tbody.length>1){copy_arr[arr_n][l]=[];for(var i=0;i<tbody.length;i++){copy_arr[arr_n][l].push(tbody[i].getElementsByTagName('input')[0].value)}}
    else{copy_arr[arr_n][l]=tbody[0].getElementsByTagName('input')[0].value}
}
function dialog_audio_update(l){
    var h="";
    if(typeof copy_arr[arr_n][l]=='object'){for(var i=0;i<copy_arr[arr_n][l].length;i++){h+="<tr><td style='height:40px;'><input id='audio_src"+i+"' class='addon_path input_text' style='height:26px;' type='text' value='"+copy_arr[arr_n][l][i]+"'></td><td style='width:40px;cursor:pointer;' class='icon icon_audio_play' onclick='preplay_audio(story_script.parameters.sounds[audio_src"+i+".value])'></td><td style='width:40px;cursor:pointer;' class='icon icon_load' onclick='file_catalog(\"audio_src"+i+"\",\"audio\",\"audio_src"+i+"\");audio_preplay.currentTime=0;audio_preplay.pause()'></td><td style='width:40px;cursor:pointer;' class='icon icon_del' onclick='var a=this.closest(\"tr\");a.parentElement.removeChild(a);audio_preplay.currentTime=0;audio_preplay.pause()'></td></tr>"}}
    else if(copy_arr[arr_n][l].length>0){h="<tr><td style='height:40px;'><input id='audio_src0' class='addon_path input_text' style='height:26px;' type='text' value='"+copy_arr[arr_n][l]+"'></td><td style='width:40px;cursor:pointer;' class='icon icon_audio_play' onclick='preplay_audio(story_script.parameters.sounds[audio_src0.value])'></td><td style='width:40px;cursor:pointer;' class='icon icon_load' onclick='file_catalog(\"audio_src0\",\"audio\",\"audio_src0\");audio_preplay.currentTime=0;audio_preplay.pause()'></td><td style='width:40px;cursor:pointer;' class='icon icon_del' onclick='var a=this.closest(\"tr\");a.parentElement.removeChild(a);audio_preplay.currentTime=0;audio_preplay.pause()'></td></tr>"}
    return h;
}
function dialog_audio_add(){
    var tbody=document.getElementById('dialog_audio').getElementsByTagName('tbody')[0],i=tbody.getElementsByTagName('tr').length;
    var row=document.createElement("tr");
    var td0=document.createElement("td");
    var td1=document.createElement("td");
    var td2=document.createElement("td");
    var td3=document.createElement("td");
    td3.style="width:40px;cursor:pointer;";
    td3.className="icon icon_del";
    td3.setAttribute("onclick","var a=this.closest('tr');a.parentElement.removeChild(a);audio_preplay.currentTime=0;audio_preplay.pause()");
    td2.style="width:40px;cursor:pointer;";
    td2.className="icon icon_load";
    td2.setAttribute("onclick","file_catalog('audio_src"+i+"','audio','audio_src"+i+"');audio_preplay.currentTime=0;audio_preplay.pause()");
    td1.style="height:40px;";
    td1.innerHTML="<input id='audio_src"+i+"' class='addon_path input_text' style='height:26px;' type='text'>";
    td0.style="width:40px;cursor:pointer;";
    td0.className="icon icon_audio_play";
    td0.setAttribute("onclick","preplay_audio(story_script.parameters.sounds[audio_src"+i+".value])");
    row.appendChild(td1);
    row.appendChild(td0);
    row.appendChild(td2);
    row.appendChild(td3);
    tbody.appendChild(row);
    file_catalog("audio_src"+i,"audio","audio_src"+i);
}
function preplay_audio(s){if(audio_preplay.currentTime>0&&audio_preplay.src==open_file(s)){audio_preplay.currentTime=0;audio_preplay.pause()}else{audio_preplay.src=open_file(s);audio_preplay.currentTime=0;audio_preplay.play();}}
function preview_video(data){return "<div style='position:relative;overflow:hidden;width:100%;height:286px;border-radius:10px;background-color:var(--cw);'><video id='video_preview' muted loop onloadedmetadata='video_set();' style='transform:translate(-50%,-50%);position:absolute;top:50%;left:50%;"+((copy_arr[arr_n].fit=='contain'||copy_arr[arr_n].fit=='position')?'width:100%;height:100%;':'')+"'><source src='"+open_file(data)+"' type='video/mp4'></video></div>";}
function dialog_video_edit(){
    copy_arr=JSON.parse(JSON.stringify(arr_l));
    if(!copy_arr[arr_n].url){copy_arr[arr_n].url=''}
    if(!copy_arr[arr_n].url[languare]){data_la(copy_arr[arr_n],'url')}
	var html="<div class='window' style='max-width:640px;width:calc(100% - 32px);'><div class='win_head'>Video<div class='window_close icon icon_close' onclick='modal_window(\"close\")'></div></div><hr style='margin:0;'><br>"
	+"<table width='100%'><tbody><tr>"
        +"<td rowspan='8' style='max-width:356px;width:50%;' id='v_pv'>"+preview_video(open_file(languare_data(copy_arr[arr_n].url)))+"</td>"
        +"<td align='right' style='width:84px;height:28px;padding-right:8px;'>Video:</td>"
        +"<td style='width:40px;'><select id='video_la' onchange='v_pv.innerHTML=preview_video(copy_arr[arr_n].url[this.value]);video_url.value=copy_arr[arr_n].url[this.value];' style='height:28px;width:40px;border-left:1px solid var(--cb);border-right:1px solid var(--cb);'>"+project_languares(languare)+"</select></td>"
        +"<td><input id='video_url' class='input_text' style='height:28px;width:100%;' onchange='v_pv.innerHTML=preview_video(this.value);copy_arr[arr_n].url[video_la.value]=this.value;video_preview.volume=this.value;' value='"+((copy_arr[arr_n].url[languare].length>0)?copy_arr[arr_n].url[languare]:'')+"' type='text'></td>"
        +"<td class='icon icon_load' style='height:40px;width:40px;' onclick='file_catalog(\"video_url\",\"video\",\"video_url\",\"v_pv\",\"copy_arr[arr_n].url[video_la.value]\");'></td>"
    +"</tr><tr><td align='right' style='height:40px;padding-right:8px;'>Sound:</td>"
        +"<td colspan='2'><input id='video_sv' class='input_slider' oninput='video_st.value=this.value;' onchange='copy_arr[arr_n].sound=this.value;video_preview.volume=this.value/100' type='range' value='"+((copy_arr[arr_n].sound)?copy_arr[arr_n].sound:0)+"' min='0' max='100' step='0.1' style='width:100%;'></td>"
        +"<td style='height:40px;width:40px;' align='center'><input id='video_st' class='input_text' onchange='copy_arr[arr_n].sound=correct_value(this.value,true);video_preview.volume=this.value/100;video_sv.value=copy_arr[arr_n].sound;this.value=copy_arr[arr_n].sound;' style='height:28px;width:32px;' value='"+((copy_arr[arr_n].sound)?copy_arr[arr_n].sound:0)+"' type='text'></td>"
    +"</tr><tr><td align='right' style='height:40px;padding-right:8px;'>Size:</td>"
        +"<td colspan='2'><select onchange='copy_arr[arr_n].fit=this.value;v_pv.innerHTML=preview_video(copy_arr[arr_n].url[video_la.value]);video_set();'>"
            +"<option "+((copy_arr[arr_n].fit=='cover')?'selected':'')+" value='cover'>cover</option>"
            +"<option "+((copy_arr[arr_n].fit=='contain')?'selected':'')+" value='contain'>contain</option>"
            +"<option "+((copy_arr[arr_n].fit=='position')?'selected':'')+" value='position'>position</option>"
        +"</select></td>"
        +"<td style='height:40px;width:40px;'></td>"
	+"</tr><tr><td height='40px' align='right' style='height:40px;padding-right:8px;'>Loop:</td>"
        +"<td colspan='2'><select onchange='copy_arr[arr_n].loop=((this.selectedIndex==1)?true:false);video_set();'>"
            +"<option "+((!copy_arr[arr_n].loop)?'selected':'')+">No</option>"
            +"<option "+((copy_arr[arr_n].loop)?'selected':'')+">Yes</option>"
        +"</select></td>"
        +"<td style='height:40px;width:40px;'></td>"
    +"</tr><tr><td height='40px' align='right' style='height:40px;padding-right:8px;'>Autoplay:</td>"
        +"<td colspan='2'><select onchange='copy_arr[arr_n].stop=((this.selectedIndex==0)?true:false);video_set();'>"
            +"<option "+((copy_arr[arr_n].stop)?'selected':'')+">No</option>"
            +"<option "+((!copy_arr[arr_n].stop)?'selected':'')+">Yes</option>"
        +"</select></td>"
        +"<td style='height:40px;width:40px;'></td>"
	+"</tr><tr><td align='right' style='height:40px;padding-right:8px;white-space:nowrap;'>Time start:</td>"
        +"<td colspan='2'><input id='scene_class' class='input_text' onchange='copy_arr[arr_n].time_start=correct_value(this.value,true);video_set();this.value=copy_arr[arr_n].time_start;' style='height:28px;' value='"+((copy_arr[arr_n].time_start)?copy_arr[arr_n].time_start:'')+"' type='text'></td>"
        +"<td style='height:40px;width:40px;'></td>"
	+"</tr><tr><td align='right' style='height:40px;padding-right:8px;white-space:nowrap;'>Time end:</td>"
        +"<td colspan='2'><input id='scene_class' class='input_text' onchange='copy_arr[arr_n].time_end=correct_value(this.value,true);video_set();this.value=copy_arr[arr_n].time_end;' style='height:28px;' value='"+((copy_arr[arr_n].time_end)?copy_arr[arr_n].time_end:'')+"' type='text'></td>"
        +"<td style='height:40px;width:40px;'></td>"
	+"</tr><tr><td align='right' style='height:40px;padding-right:8px;'>Go to</td>"
        +"<td colspan='2'><select onchange='copy_arr[arr_n].go_to=this.value;video_set()' style='width:100%;height:28px' oninput=''>"+option_block(copy_arr[arr_n].go_to,1)+"</select></td>"
        +"<td style='height:40px;width:40px;'></td>"
	+"</tr></tbody></table><br>"
	+"<table class='big_button' width='256px' onclick='dialog_video_apply();'><tbody><tr><td width='42px' class='icon icon_ok'></td><td align='center'>Apply</td><td width='42px'></td></tr></tbody></table></div>"
    modal_window("open",html);
    video_set();
}
function video_set(){
    if(copy_arr[arr_n].fit=='cover'||!copy_arr[arr_n].fit){
        if(video_preview.videoWidth>video_preview.videoHeight){video_preview.style.height='100%';video_preview.style.width='auto';}
        else{video_preview.style.height='auto';video_preview.style.width='100%';}
    } else if(copy_arr[arr_n].fit=='position'){  if(!copy_arr[arr_n].size){copy_arr[arr_n].size=[setup_editor.pvw[0]+'px',setup_editor.pvw[1]+'px']};  if(!copy_arr[arr_n].position){copy_arr[arr_n].position=['0px',0,'0px',0]}  }
    if(copy_arr[arr_n].sound && copy_arr[arr_n].sound>0){
        video_preview.muted=false;
        video_preview.volume=copy_arr[arr_n].sound/100
    }else{video_preview.muted=true;}
    if(copy_arr[arr_n].time_start){video_preview.currentTime=copy_arr[arr_n].time_start}
    if(copy_arr[arr_n].time_end&&copy_arr[arr_n].time_end!=0){video_preview.ontimeupdate = function(){if(this.currentTime>=copy_arr[arr_n].time_end){this.currentTime=copy_arr[arr_n].time_start}};}
    if(!copy_arr[arr_n].stop||copy_arr[arr_n].stop!=true){video_preview.play();}else{video_preview.pause();}
}
function dialog_video_apply(){
    data_only(copy_arr[arr_n],'url');
    if(copy_arr[arr_n].time_start==''){delete copy_arr[arr_n].time_start}
    if(copy_arr[arr_n].go_to=='tue_no'){delete copy_arr[arr_n].go_to}
    if(copy_arr[arr_n].time_end==''){delete copy_arr[arr_n].time_end}
    if(copy_arr[arr_n].fit=='cover'){delete copy_arr[arr_n].fit}
    if(copy_arr[arr_n].stop!=true){delete copy_arr[arr_n].stop}
    if(copy_arr[arr_n].fit!='position'){delete copy_arr[arr_n].position;delete copy_arr[arr_n].size;}
    if(copy_arr[arr_n].sound==0){delete copy_arr[arr_n].sound}
    arr_l[arr_n]=JSON.parse(JSON.stringify(copy_arr[arr_n]))
    modal_window("close");state_save();
    if(scene_screen){scen_editor(scen_data[0],scen_data[1],scen_data[2])}
    else{update_novel()}
}
function dialog_text_edit(){
	copy_arr=JSON.parse(JSON.stringify(arr_l));
    var n,v=story_script.parameters.plugins&&story_script.parameters.plugins.includes("speech");
	if(!copy_arr.name){copy_arr.name={}}
    if(story_script.parameters.characters&&story_script.parameters.characters[copy_arr.name]){n=story_script.parameters.characters[copy_arr.name]}
    if(typeof copy_arr[arr_n]!=='object'){data_la(copy_arr,arr_n)};if(!copy_arr[arr_n][languare]){copy_arr[arr_n][languare]=""};
	var html="<div class='window' style='width:90%;max-width:800px;padding: 2px 0 24px 0;'><div class='win_head'>Dialogue text<div class='window_close icon icon_close' onclick='modal_window(\"close\");synth.cancel();'></div></div><hr style='margin:0;'><p class='text_tutorials_a select_tutorials'>"+texts.tutorials[1].en+"</p>"
	+"<table width='100%' style='border-bottom:1px solid var(--cb);'><tbody><tr><td align='right' style='width:1%;white-space:nowrap;'>&nbsp;language:&nbsp;</td>"
	+"<td width='40px'><select id='text_la' onchange='"+((n)?"name_text.value=((story_script.parameters.characters[copy_arr.name][this.value])?story_script.parameters.characters[copy_arr.name][this.value]:\"\")":"name_text.value=((copy_arr.name[this.value])?copy_arr.name[this.value]:\"\")")+((v)?";voices_data.value=copy_arr.speech[this.value][0];voices_speed.value=copy_arr.speech[this.value][1]":"")+";dialogtext.value=((copy_arr.text[this.value])?copy_arr.text[this.value]:\"\");text_chars.innerHTML=dialogtext.value.length;text_words.innerHTML=dialogtext.value.split(reg).length-1;synth.cancel();loadVoices()' style='height:40px;border-left:1px solid var(--cb);border-right:1px solid var(--cb);border-bottom:0'>"+project_languares(languare)+"</select></td>"
    +"<td align='right' style='width:1%;white-space:nowrap;'>&nbsp;&nbsp;symbols:&nbsp;</td><td align='left' id='text_chars' style='width:1%;padding-right:8px;'>"+copy_arr[arr_n][languare].length+"</td><td style='width:1%;white-space:nowrap;' align='right'>&nbsp;&nbsp;words:&nbsp;</td><td align='left' id='text_words'>"+(copy_arr[arr_n][languare].split(reg).length-1)+"</td>"
    +"<td align='right' id='name_speec' style='display:none;white-space:nowrap;width:1%;'>&nbsp;speech:</td><td width='40px'><div id='play_speak' style='display:none;width:100%;height:40px' class='icon_m icon_audio_play' onclick='speak(dialogtext.selectionStart==dialogtext.selectionEnd?dialogtext.value:dialogtext.value.substring(dialogtext.selectionStart,dialogtext.selectionEnd))'></div></td><td align='left' style='width:1%;'><select id='voice_select' onchange='localStorage.setItem(\"tue_voice\",this.value)' style='display:none;height:40px;width:64px;border-left:1px solid var(--cb);border-right:1px solid var(--cb);border-bottom:0'></select></td>"
    +"<td></td></tr></tbody></table><table width='100%' style='border-bottom:1px solid var(--cb);'><tbody><tr>"
    +"<td><textarea id='dialogtext' oninput='text_chars.innerHTML=this.value.length;text_words.innerHTML=this.value.split(reg).length-1;copy_arr[arr_n][text_la.value]=this.value;synth.cancel();' class='input_text' style='min-height:128px;border-bottom:none;white-space:pre-wrap;resize:none;padding:4px;-moz-box-sizing:border-box;box-sizing:border-box;height:calc(90vh - 256px);width:100%;border-right:1px solid var(--cb);'>"+((copy_arr[arr_n][languare].length>0)?copy_arr[arr_n][languare]:"")+"</textarea></td>"
	+"<td style='max-width:286px;width:45%;' valign='top'><div style='width:100%;min-height:128px;height:calc(90vh - 256px);overflow-x:hidden;overflow-y:auto;'><table width='100%'><tbody>"
	+"<tr><td width='80px' height='40px' align='left' style='padding-left:8px;border-bottom:1px solid var(--cb);' colspan='3'>Text panel settings</td></tr>"
    +"<tr><td height='40px' align='right' style='padding-right:8px;'>Text color</td><td><input id='text_color' onchange='' class='input_text' value='"+((copy_arr.color_text)?copy_arr.color_text:"")+"' type='text'></td>"
    +"<td class='icon icon_color' style='height:40px;width:40px;' onclick='edit_color(\"text_color\",text_color.value);'></td></tr>"
    +"<tr><td height='40px' align='right' style='padding-right:8px;'>Panel color</td><td><input id='p_color' onchange='' class='input_text' value='"+((copy_arr.color)?copy_arr.color:"")+"' type='text'></td>"
    +"<td class='icon icon_color' style='height:40px;width:40px;' onclick='edit_color(\"p_color\",p_color.value);'></td></tr>"
	+"<tr><td height='40px' align='right' style='padding-right:8px;'>ClassName</td><td><input id='text_class' class='input_text' value='"+((copy_arr[arr_n].className)?copy_arr[arr_n].className:"")+"' type='text'></td><td></td></tr>"
	+"<tr><td height='28px' align='left' colspan='3'></td></tr>"
	+"<tr><td height='40px' align='left' style='padding-left:8px;border-bottom:1px solid var(--cb);' colspan='3'>Name panel settings</td></tr>"
	+"<tr><td height='40px' align='right' style='padding-right:8px;'>Name character</td><td><input id='name_text' class='input_text' oninput='"+((n)?"story_script.parameters.characters[copy_arr.name][text_la.value]=this.value;":"copy_arr.name[text_la.value]=this.value;")+"' value='"+((n&&n[languare])?n[languare]:((copy_arr.name[languare])?copy_arr.name[languare]:""))+"' type='text'></td><td class='icon icon_char' style='cursor:pointer;' onclick='dialog_char();'></td></tr>"
	+"<tr><td height='40px' align='right' style='padding-right:8px;'>Text color</td><td><input id='t_color' onchange='' class='input_text' value='"+((n&&n.color_text)?n.color_text:((copy_arr.name.color_text)?copy_arr.name.color_text:""))+"' type='text'></td>"
    +"<td class='icon icon_color' style='height:40px;width:40px;' onclick='edit_color(\"t_color\",t_color.value);'></td></tr>"
    +"<tr><td align='right' style='padding-right:8px;'>Panel color</td><td><input id='c_color' class='input_text'  onchange='' value='"+((n&&n.color)?n.color:((copy_arr.name.color)?copy_arr.name.color:""))+"' type='text'></td>"
    +"<td class='icon icon_color' style='height:40px;width:40px;' onclick='edit_color(\"c_color\",c_color.value);'></td></tr>"
    +"<tr><td height='40px' align='right' style='padding-right:8px;'>ClassName</td><td><input id='c_class' class='input_text' value='"+((n&&n.className)?n.className:((copy_arr.name.className)?copy_arr.name.className:""))+"' type='text'></td><td></td></tr>"
    +"<tr><td align='right' style='padding-right:8px;'>Art</td><td><input id='c_art' class='input_text' value='"+((n&&n.art)?n.art:((copy_arr.name.className)?copy_arr.name.className:""))+"' type='text'></td>"
    +"<td class='icon icon_load' style='height:40px;width:40px;' onclick='file_catalog(\"c_art\",\"img\",\"c_art\",0);'></td></tr>"
	+"<tr><td height='28px' align='left' colspan='3'></td></tr>"
	+"<tr><td height='40px' align='left' style='padding-left:8px;border-bottom:1px solid var(--cb);' colspan='3'>End text cursor</td></tr>"
    +"<tr><td align='right' style='padding-right:8px;'>Art</td><td><input id='e_art' class='input_text' value='"+((copy_arr.end_text_cursor)?copy_arr.end_text_cursor[0]:"")+"' type='text'></td>"
    +"<td class='icon icon_load' style='height:40px;width:40px;' onclick='file_catalog(\"e_art\",\"img\",\"e_art\",0);'></td></tr>"
    +"<tr><td height='40px' align='right' style='padding-right:8px;'>Width size</td><td><input id='e_width' class='input_text' onchange='this.value=correct_value(this.value);if(e_height.value.length==0){e_height.value=\"auto\"}' value='"+((copy_arr.end_text_cursor)?copy_arr.end_text_cursor[1]:"")+"' type='text'></td><td></td></tr>"
    +"<tr><td height='40px' align='right' style='padding-right:8px;'>Height size</td><td><input id='e_height' class='input_text' onchange='this.value=correct_value(this.value);if(e_width.value.length==0){e_width.value=\"auto\"};' value='"+((copy_arr.end_text_cursor)?copy_arr.end_text_cursor[2]:"")+"' type='text'></td><td></td></tr>"
    +"<tr><td height='40px' align='right' style='padding-right:8px;'>Style CSS</td><td><input id='e_style' class='input_text' value='"+((copy_arr.end_text_cursor)?copy_arr.end_text_cursor[3]:"")+"' type='text'></td><td></td></tr>"
    if(v){
        if(!copy_arr.speech){copy_arr.speech={}}
        if(typeof story_script.parameters.text_panel.speech_play=="undefined"){story_script.parameters.text_panel.speech_play=true}
        if(!copy_arr.speech[languare]){
            for(var i=0;i<story_script.parameters.languares.length;i++){copy_arr.speech[story_script.parameters.languares[i]]=["",1];}
            copy_arr.speech[languare]=["",1]
        };
        html+="<tr><td height='40px' align='left' style='padding-left:8px;border-bottom:1px solid var(--cb);' colspan='3'>Speech synthesis</td></tr>"
        +"<tr><td align='right' style='padding-right:8px;'>Voice</td><td><input id='voices_data' class='input_text' onchange='copy_arr.speech[text_la.value][0]=this.value' value='"+copy_arr.speech[languare][0]+"' type='text'></td>"
        +"<td class='icon icon_edit' style='height:40px;width:40px;' onclick='voicesSynthesis(text_la.value,\"voices_data\",\"copy_arr.speech[text_la.value][0]\",dialogtext.value)'></td></tr>"
        +"<tr><td height='40px' align='right' style='padding-right:8px;'>Speed</td><td><input id='voices_speed' class='input_slider input_slider_progress' type='range' min='0' max='2' step='0.1' style='width:100%;' onchange='copy_arr.speech[text_la.value][1]=this.value' value='"+copy_arr.speech[languare][1]+"'></td><td></td></tr>"
    }
    html+="</tbody></table></div></td></tr></tbody></table><br><table class='big_button' width='256px' onclick='dialog_text_apply()'><tbody><tr><td width='42px' class='icon icon_ok'></td><td align='center'>Apply</td><td width='42px'></td></tr></tbody></table></div>"
    modal_window("open",html);if('speechSynthesis' in window){loadVoices();window.speechSynthesis.onvoiceschanged=function(e){loadVoices()}};
}
function voicesSynthesis(l,t,a,d){
    let v="",voices=speechSynthesis.getVoices(),s=document.getElementById(t).value.split(",").map((item)=>{return item.trim()});
    voices.forEach(function(voice,i){if(l==voice.lang.substring(0,2)){v+="<tr><td style='width:60px;' align='center'><label class='switchbox'><input type='checkbox' class='chec_plugin' value='"+voice.name+"' "+((s.includes(voice.name))?"checked":"")+"><span class='toggle round'></span></label>   </td><td>"+voice.name+"</td><td class='icon_m icon_audio_play' style='height:40px;width:40px;' onclick='speak(\""+((d.length>0)?d.replaceAll("'","").replaceAll('"',''):"Hello")+"\",\""+voice.name+"\")'></td></tr>"}});
    code='<div class="window" style="position:fixed;padding:8px;width:380px;"><div><div class="window_close icon icon_close" onclick="synth.cancel();menu_add.style.visibility=\'hidden\';" ></div></div><p>Voice selection</p>   <br><hr style="margin:0;"><p class="text_tutorials_a select_tutorials">'+texts.tutorials[19].en+'</p>  <div style="border-bottom:1px solid var(--cb);overflow-x:hidden;overflow-y:auto;max-height:calc(100vh - 190px);"><table id="all_voices" style="width: 100%;"><tbody>'+v+'</tbody></table></div>'
    +'<br><table class="big_button" width="256px" onclick="synth.cancel();voicesSynthesis_apply(\''+l+'\',\''+t+'\','+a+');menu_add.style.visibility=\'hidden\';"><tbody><tr><td width="42px" class="icon icon_ok"></td><td align="center">Apply</td><td width="42px"></td></tr></tbody></table></div>'
    menu_add.innerHTML=code;
    menu_add.style.visibility='visible';
}
function voicesSynthesis_apply(l,t,a){
    let c=0,s=document.getElementById(t).value.split(",").map((item)=>{return item.trim()}),voices=all_voices.getElementsByClassName("chec_plugin");
    for(let i=0;i<voices.length;i++){
        if(voices[i].checked){
            if(!s.includes(voices[i].value)){s.push(voices[i].value)}
        } else {s=s.filter((s) => s!==voices[i].value)};
    }
    document.getElementById(t).value=String(s);
    document.getElementById(t).onchange();
}
function loadVoices(){
	var voices = speechSynthesis.getVoices();
    voice_select.innerHTML="";
    if(voices.length>0&&'speechSynthesis' in window){
        let tue_voice=localStorage.getItem("tue_voice");
        voice_select.style.removeProperty("display");
        name_speec.style.removeProperty("display");
        play_speak.style.removeProperty("display");
        voices.forEach(function(voice, i) {
            if(text_la.value==voice.lang.substring(0,2)){
                var option = document.createElement('option');
                option.selected = (voice.name==tue_voice);
                option.value = voice.name;
                option.text = voice.name;
                voice_select.add( option );
            }
        });
    }else{
        voice_select.style.display="none";
        name_speec.style.display="none";
        play_speak.style.display="none";
    }
}
function speak(text,v){
	const speech = new SpeechSynthesisUtterance(text);
    if (synth.speaking){synth.cancel()}
    else{
        speech.rate=0.85;
        if(v){speech.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name==v; })[0];}
        else if(voice_select.value){speech.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name==voice_select.value; })[0];}
        synth.speak(speech);
    }
}
const synth = window.speechSynthesis;
function dialog_char(){
    var code,f,t,a;
    code='<div class="window" style="width:480px;position:fixed;"><table style="width:100%;"><tbody><tr>'
        +'<td style="height:40px;border-radius:16px 16px 0 0;border-bottom:1px solid var(--cb);" align="center" onclick="" width="52px"></td>'
        +'<td style="height:40px;border-radius:16px 16px 0 0;border-bottom:1px solid var(--cb);" align="center">Character selection</td>'
        +'<td style="height:40px;border-radius:16px 16px 0 0;border-bottom:1px solid var(--cb);" align="center" width="88px"><input type="text" class="search" id="search_file" onkeyup="search_file()" placeholder="search name"></td>'
        +'<td style="height:40px;border-radius:16px 16px 0 0;border-bottom:1px solid var(--cb);" align="center" onclick="menu_add.style.visibility=\'hidden\';" width="52px" class="icon icon_close"></td>'
        +'</tr><tr><td colspan="5"><div style="overflow-x:hidden;overflow-y:auto;max-height:80vh;"><table style="width:100%;"><tbody>'
        if(copy_arr.name&&copy_arr.name.length>0){code+='<tr><td class="add_el add_file" style="height:42px;padding:4px;border-bottom:1px solid var(--cb);" onclick="name_text.setAttribute(\'oninput\',\'copy_arr.name[text_la.value]=this.value;\');copy_arr.name={};dialog_char_update();menu_add.style.visibility=\'hidden\';"><table style="height:42px;"><tbody><tr><td class="icon icon_clear" width="42px"></td><td style="padding:0px 8px;">Clear</td></tr></tbody></table></td></tr>'}
    for(t=0;t<Object.keys(story_script.parameters.characters).length;t++){
        var p=story_script.parameters.characters[Object.keys(story_script.parameters.characters)[t]][languare]
        code+='<tr><td class="add_el add_file" title="'+((p)?p:'no translation ( '+Object.keys(story_script.parameters.characters)[t]+' )')+'" style="height:42px;padding:4px;border-bottom:1px solid var(--cb);" onclick="copy_arr.name=\''+Object.keys(story_script.parameters.characters)[t]+'\';dialog_char_update();menu_add.style.visibility=\'hidden\';"><table style="height:42px;"><tbody><tr><td class="icon icon_char" width="42px"></td><td style="padding:0px 8px;">'+((p)?p:'no translation ( '+Object.keys(story_script.parameters.characters)[t]+' )')+'</td></tr></tbody></table></td></tr>'
    }
    code+='</tbody></table></div></td></tr><tr><td colspan="5" style="border-radius:0 0 16px 16px;height:16px;"></td></tr></tbody></table></div>'
    menu_add.innerHTML=code
    menu_add.style.visibility='visible';
}
function dialog_char_update(){
    var arr_s=story_script.parameters.characters[copy_arr.name]
    name_text.value=(arr_s&&arr_s[languare])?arr_s[languare]:((copy_arr.name[languare])?copy_arr.name[languare]:"")
    c_class.value=(arr_s&&arr_s.className)?arr_s.className:'';
    t_color.value=(arr_s&&arr_s.color_text)?arr_s.color_text:'';
    c_color.value=(arr_s&&arr_s.color)?arr_s.color:'';
    c_art.value=(arr_s&&arr_s.art)?arr_s.art:'';
}
function dialog_text_apply(){
	if(text_class.value!=""){copy_arr[arr_n].className=text_class.value;}else{delete copy_arr[arr_n].className};
    if(text_color.value!=""){arr_l.color_text=text_color.value;}else{delete arr_l.color_text};
    if(p_color.value!=""){arr_l.color=p_color.value;}else{delete arr_l.color};
    if(!copy_arr[arr_n].style&&!copy_arr[arr_n].className)data_only(copy_arr,arr_n);
    if(!story_script.parameters.characters){story_script.parameters.characters={}}
    var arr_s=story_script.parameters.characters,n=0,l,c=0;
    if(copy_arr.name.length!=0&&!arr_s[copy_arr.name]){
        for(let l=0;l<story_script.parameters.languares.length;l++){
            var z=copy_arr.name[story_script.parameters.languares[l]];
            if(z){c+=z.length;}
            if(z && z.length>0 && /^[\w\s]+$/i.test(z) ){n=correct_name(z);break;}
        }
        if(c>0){
            if(n==0){n='char'+Object.keys(arr_s).length}
            arr_s[n]=JSON.parse(JSON.stringify(copy_arr.name))
        } toast('Added new character '+n);
    }else if(copy_arr.name&&copy_arr.name.length!=0){n=copy_arr.name;};
    if(n){
        if(c_class.value!=""){arr_s[n].className=c_class.value;}else{delete arr_s[n].className}
        if(t_color.value!=""){arr_s[n].color_text=t_color.value;}else{delete arr_s[n].color_text};
        if(c_color.value!=""){arr_s[n].color=c_color.value;}else{delete arr_s[n].color};
        if(c_art.value!=""){arr_s[n].art=c_art.value;}else{delete arr_s[n].art};
        arr_l.name=n
    }
    if(e_art.value.length!=0){
        arr_l.end_text_cursor=[ e_art.value , e_width.value , e_height.value , e_style.value ];
    }else{delete arr_l.end_text_cursor}
    if(story_script.parameters.plugins&&story_script.parameters.plugins.includes("speech")){arr_l.speech=JSON.parse(JSON.stringify(copy_arr.speech));}
    if(Object.keys(copy_arr.name).length==0){delete arr_l.name}
	arr_l[arr_n]=JSON.parse(JSON.stringify(copy_arr[arr_n]));
	modal_window("close");state_save();
    if(scene_screen){scen_editor(scen_data[0],scen_data[1],scen_data[2])}
    else{update_novel();}
    synth.cancel();
}
function scene_edit(){
	copy_arr=JSON.parse(JSON.stringify(arr_l));
    if(!copy_arr[arr_n].background_image){copy_arr[arr_n].background_image=""}
    if(!copy_arr[arr_n].background_image[languare]){data_la(copy_arr[arr_n],'background_image')}
    var html="<div class='window' style='max-width:640px;width:calc(100% - 32px);'><div class='win_head'>Settings scene<div class='window_close icon icon_close' onclick='modal_window(\"close\")'></div></div><hr style='margin:0;'><p class='text_tutorials_a select_tutorials'>"+texts.tutorials[2].en+"</p><br><br>"
    +"<table width='100%' height='256px'><tbody><tr>"
    +"<td id='scene_bg_preview' rowspan='6' style='background-size:"+((copy_arr[arr_n].background_size)?copy_arr[arr_n].background_size:"cover")+";width:256px;border-radius:10px;background-image:url("+open_file((copy_arr[arr_n].background_image[languare])?copy_arr[arr_n].background_image[languare]:copy_arr[arr_n].background_image)+");background-color:"+((copy_arr[arr_n].background_color)?copy_arr[arr_n].background_color:"var(--cw)")+";background-repeat:no-repeat;background-position:center;"+((copy_arr[arr_n].background_align)?" background-position:"+copy_arr[arr_n].background_align:"")+"'>&nbsp;</td>"
    +"<td align='right' style='height:28px;padding:0 8px;white-space:nowrap;'>Image:</td>"
    +"<td style='width:40px;'><select id='scene_la' onchange='scene_bg_preview.style.backgroundImage=\"url(\"+open_file(copy_arr[arr_n].background_image[this.value])+\")\";scene_bg_url.value=copy_arr[arr_n].background_image[this.value];' style='height:28px;width:40px;border-left:1px solid var(--cb);border-right:1px solid var(--cb);'>"+project_languares(languare)+"</select></td>"
    +"<td><input id='scene_bg_url' class='input_text' style='height:28px;width:100%;' oninput='copy_arr[arr_n].background_image[scene_la.value]=this.value;scene_bg_preview.style.backgroundImage=\"url(\"+open_file(copy_arr[arr_n].background_image[scene_la.value])+\")\";' value='"+((copy_arr[arr_n].background_image[languare]&&copy_arr[arr_n].background_image[languare].length>0)?copy_arr[arr_n].background_image[languare]:'&nbsp;')+"' type='text'></td>"
    +"<td id='files_img' class='icon icon_load' style='height:40px;width:40px;' onclick='file_catalog(\"scene_bg_url\",\"img\",\"scene_bg_url\",\"scene_bg_preview\",\"copy_arr[arr_n].background_image[scene_la.value]\")'></td>"
    +"</tr><tr>"
    +"<td width='50px' height='40px' align='right' style='padding:0 8px;white-space:nowrap;'>Music:</td>"
    +"<td colspan='2'><input id='scene_music' class='input_text' style='height:28px;' value='"+((copy_arr[arr_n].background_music)?copy_arr[arr_n].background_music:"")+"' type='text'></td>"
    +"<td id='files_auio' class='icon icon_load' style='height:40px;width:40px;' onclick='file_catalog(this.id,\"audio\",\"scene_music\",0,\"copy_arr[arr_n].background_music\")'></td>"
    +"</tr><tr>"
    +"<td width='50px' height='40px' align='right' style='padding:0 8px;white-space:nowrap;'>Color:</td>"
    +"<td colspan='2'><input id='scene_color' class='input_text' style='height:28px;' value='"+((copy_arr[arr_n].background_color)?copy_arr[arr_n].background_color:"")+"' type='text' onchange='scene_bg_preview.style.backgroundColor=this.value'></td>"
    +"<td class='icon icon_color' style='height:40px;width:40px;' onclick='edit_color(\"scene_color\",scene_color.value)'></td>"
    +"</tr><tr>"
    +"<td width='50px' height='40px' align='right' style='padding:0 8px;white-space:nowrap;'>Size:</td>"
    +"<td colspan='2'><select id='scene_size' oninput='scene_bg_preview.style.backgroundSize=this.value'>"
        +"<option value='cover'>cover</option>"
        +"<option "+((copy_arr[arr_n].background_size=='contain')?'selected':'')+" value='contain'>contain</option>"
        +"<option "+((copy_arr[arr_n].background_size=='100% 100%')?'selected':'')+" value='100% 100%'>fill</option>"
    +"</select></td>"
    +"</tr><tr>"
    +"<td width='50px' height='40px' align='right' style='padding:0 8px;white-space:nowrap;'>Position:</td>"
    +"<td colspan='2'><select id='scene_pos' oninput='scene_bg_preview.style.backgroundPosition=this.value'>"
		+"<option value='center'>center</option>"
        +"<option value='top left' "+((copy_arr[arr_n].background_align=='top left')?'selected':'')+">top left</option>"
        +"<option value='top' "+((copy_arr[arr_n].background_align=='top')?'selected':'')+">top</option>"
        +"<option value='right top' "+((copy_arr[arr_n].background_align=='right top')?'selected':'')+">top right</option>"
        +"<option value='left' "+((copy_arr[arr_n].background_align=='left')?'selected':'')+">left</option>"
        +"<option value='right' "+((copy_arr[arr_n].background_align=='right')?'selected':'')+">right</option>"
        +"<option value='bottom left' "+((copy_arr[arr_n].background_align=='bottom left')?'selected':'')+">bottom left</option>"
        +"<option value='bottom' "+((copy_arr[arr_n].background_align=='bottom')?'selected':'')+">bottom</option>"
        +"<option value='bottom right' "+((copy_arr[arr_n].background_align=='bottom right')?'selected':'')+">bottom right</option>"
    +"</select></td>"
    +"<td style='height:40px;width:40px;'></td>"
    +"</tr><tr>"
    +"<td width='50px' height='40px' align='right' style='padding:0 8px;white-space:nowrap;'>Class:</td>"
    +"<td colspan='2'><input id='scene_class' class='input_text' style='height:28px;' value='"+((copy_arr[arr_n].background_class)?copy_arr[arr_n].background_class:"")+"' type='text'></td>"
    +"<td style='height:40px;width:40px;'></td>"
    +"</tr><tr>"
    +"<td>&nbsp;</td>"
    +"<td colspan='3'>&nbsp;</td>"
    +"</tr></tbody></table><br>"
	+"<table class='big_button' width='256px' onclick='scene_edit_apply();'><tbody><tr><td width='42px' class='icon icon_ok'></td><td align='center'>Apply</td><td width='42px'></td></tr></tbody></table></div>"
    modal_window("open",html);
}
function scene_edit_apply(){
	if(copy_arr[arr_n].background_image){
        var a=0,n;
        for(var i=0;i<story_script.parameters.languares.length;i++){
            n=copy_arr[arr_n].background_image[story_script.parameters.languares[i]];
            if(n.length>0){a++}
        }if(a==0){
            delete arr_l[arr_n].background_image;
        }else{
            data_only(copy_arr[arr_n],'background_image');
            if(copy_arr[arr_n].background_image){arr_l[arr_n].background_image=JSON.parse(JSON.stringify(copy_arr[arr_n].background_image))}
        }
    }
	if(scene_music.value!=""){arr_l[arr_n].background_music=scene_music.value;}else{delete arr_l[arr_n].background_music};
    if(scene_color.value!=""){arr_l[arr_n].background_color=scene_color.value;}else{delete arr_l[arr_n].background_color};
    if(scene_class.value!=""){arr_l[arr_n].background_class=scene_class.value;}else{delete arr_l[arr_n].background_class};
    if(scene_size.value!="cover"){arr_l[arr_n].background_size=scene_size.value;}else{delete arr_l[arr_n].background_size};
    if(scene_pos.value!="center"){arr_l[arr_n].background_align=scene_pos.value;}else{delete arr_l[arr_n].background_align};
    modal_window("close");state_save();
    if(scene_screen){scen_editor(scen_data[0],scen_data[1],scen_data[2])}
    else{update_novel();}
}
function edit_html(){
    var html="<div class='window' style='padding:0px 2px 16px 0px;width:calc(100vw - 32px);'>"
    +"<table style='width:100%;'><tbody><tr>"
    +"<td style='width:168px;'></td>"
    +"<td align='center'style='white-space:nowrap;'>HTML code edit</td>"
    +"<td style='width:88px;'><input id='search_edit' onkeypress='if(event.key==\"Enter\"){search_text(\"editcode\",this.value)}' type='text' class='search' style='height:40px;width:100%;' placeholder='Search text'></td>"
    +"<td class='icon icon_search' style='width:60px;' onclick='search_text(\"editHtml\",search_edit.value)'></td>"
    +"<td class='icon icon_close' style='width:40px;' onclick='modal_window(\"close\")'></td>"
    +"</tr></tbody></table>"
    +"<p><textarea id='editHtml' rows='12' spellcheck='false' class='input_text' wrap='off' style='font-family:monospace;resize:none;padding-left:0px;height:calc(90vh - 128px);width:100%;border:1px solid var(--cb);min-height:92px;'>"+((arr_l[arr_n])?arr_l[arr_n]:'')+"</textarea></p><br><table class='big_button' width='256px' onclick='arr_l[arr_n]=editHtml.value;update_novel();state_save();modal_window(\"close\");menu_add.style.visibility=\"hidden\";'><tbody><tr><td width='42px' class='icon icon_ok'></td><td align='center'>Apply</td><td width='42px'></td></tr></tbody></table></div>"
    modal_window("open",html);
}
function edit_code(vol,n){
    let code=(vol=="script_js")?story_script.parameters.js:(vol=="script_css")?story_script.parameters.css:(copy_arr[vol])?copy_arr[vol]:'';
    let html="<div class='window' style='padding:0px 2px 16px 0px;width:calc(100vw - 32px);'>"
    +"<table style='width:100%;'><tbody><tr>"
    +"<td style='width:40px;height:40px;'></td>"
    +"<td align='center' style='white-space:nowrap;'>"+n+" code edit</td>"
    +"<td class='icon icon_close' style='width:40px;' onclick='modal_window(\"close\")'></td>"
    +"</tr></tbody></table><p><div class='codeView'><pre class='code_show'></pre><textarea id='editcode' class='code_text' spellcheck='false' wrap='off' oninput='code_edit(this,this.previousElementSibling,"+(vol=="script_js"?"\"js\"":"false")+")'>"+code+"</textarea></div>"
    +"</p><br><table class='big_button' width='256px' onclick='"+((vol=="script_js")?"story_script.parameters.js":(vol=="script_css")?"story_script.parameters.css":"copy_arr[\""+vol+"\"]")+"=editcode.value;update_novel();state_save();modal_window(\"close\");menu_add.style.visibility=\"hidden\";'><tbody><tr><td width='42px' class='icon icon_ok'></td><td align='center'>Apply</td><td width='42px'></td></tr></tbody></table></div>"
    modal_window("open",html);
    code_edit(editcode,editcode.previousElementSibling,(vol=="script_js")?"js":false)
}
function edit_toast(){
    copy_arr=JSON.parse(JSON.stringify(arr_l));
    if(!copy_arr[arr_n]){copy_arr[arr_n]=""}
    if(!copy_arr[arr_n][languare]){data_la(copy_arr,arr_n)}
    var toast_list="<table width='90%' id='var_toast' style='margin:10px 0 10px 0;'><tbody>";
    for(var l=0;l<story_script.parameters.languares.length;l++){toast_list+="<tr><td align='center' style='width:40px;'>"+story_script.parameters.languares[l]+"</td><td style='calc(100% - 40px)'><input class='addon_path input_text' oninput='copy_arr[arr_n]."+story_script.parameters.languares[l]+"=this.value;' value='"+copy_arr[arr_n][story_script.parameters.languares[l]]+"' type='text'></td></tr>";}
    toast_list+="</tbody></table>"
    var html="<div class='window' style='width:512px;'><div class='win_head'>Toast edit<div class='window_close icon icon_close' onclick='modal_window(\"close\")'></div></div><hr style='margin:0;'><div style='max-height:75vh;overflow-x:hidden;overflow-y:auto;'>"+toast_list+"</div><br><table class='big_button' width='256px' onclick='data_only(copy_arr,arr_n);arr_l[arr_n]=JSON.parse(JSON.stringify(copy_arr[arr_n]));update_novel();state_save();modal_window(\"close\");menu_add.style.visibility=\"hidden\";'><tbody><tr><td width='42px' class='icon icon_ok'></td><td align='center'>Apply</td><td width='42px'></td></tr></tbody></table></div>"
    modal_window("open",html);
}
function edit_choice(){
    copy_arr=JSON.parse(JSON.stringify(arr_l));
    var choice_list="<table width='98%' id='var_choice' style='margin:10px 0 10px 0;'><tbody>";
    for(var l=0;l<copy_arr[arr_n].length;l++){
        if(!copy_arr[arr_n][l].text[languare]){data_la(copy_arr[arr_n][l],'text')}
        choice_list+="<tr>" +
          "<td style='width:32px;height:26px;'>Text</td>"+
          "<td valign='bottom' style='height:26px;width:28px;'><select id='chol"+l+"' onchange='chot"+l+".value=copy_arr."+arr_n+"["+l+"].text[this.value];' style='height:26px;width:30px;border-left:1px solid var(--cb);border-right:1px solid var(--cb);border-bottom:1px solid var(--cb);'>"+project_languares(languare)+"</select></td>"+
          "<td><input id='chot"+l+"' class='input_text' oninput='copy_arr."+arr_n+"["+l+"].text[chol"+l+".value]=this.value;' style='height:26px;' value='"+copy_arr[arr_n][l].text[languare]+"' type='text'></td>"+
          "<td style='width:64px;padding-right:8px;' align='right'>Position X</td>"+
          "<td style='width:48px;'><input class='input_text' style='height:26px;' oninput='copy_arr."+arr_n+"["+l+"].position[0]=this.value;' value='"+copy_arr[arr_n][l].position[0]+"' type='text'></td>"+
          "<td style='width:16px;' align='center'>Y</td>"+
          "<td style='width:48px;'><input class='input_text' oninput='copy_arr."+arr_n+"["+l+"].position[2]=this.value;' style='height:26px;' value='"+copy_arr[arr_n][l].position[2]+"' type='text'></td>"+
          "<td style='width:48px;' align='right'>go to to:</td>"+
          "<td style='width:92px;'><select onchange='copy_arr."+arr_n+"["+l+"].go_to=this.value;'>"+option_block(copy_arr[arr_n][l].go_to,2)+"</select></td>"+

          "<td style='width:48px;' align='right'>💎:</td>"+
          "<td style='width:50px;' align='right'><input type='number' value='"+copy_arr[arr_n][l].diamonds+"' onchange='copy_arr."+arr_n+"["+l+"].diamonds=this.value;' max='100' min='0' /></td>"+

          "<td onclick='copy_arr."+arr_n+"["+l+"]={};var a=this.closest(\"tr\");a.parentElement.removeChild(a);' style='width:32px;cursor:pointer;' title='delet' class='icon icon_del'></td>"+
          "</tr>"
    }
    choice_list+="</tbody></table>"
    var html="<div class='window' style='max-width:568px;width:calc(100% - 32px);'><div class='win_head'>Choice edit<div class='window_close icon icon_close' onclick='modal_window(\"close\")'></div></div><hr style='margin:0;'> <p class='text_tutorials_a select_tutorials'>"+texts.tutorials[15].en+"</p>  <div style='max-height:70vh;overflow-x:hidden;overflow-y:auto;'>"+choice_list+"<div onclick=\"edit_choice_new()\" class='icon icon_add' style='margin-top:16px;height:26px;width:26px;cursor:pointer;'></div></div><br><br><table class='big_button' width='256px' onclick='for(var l=copy_arr[arr_n].length;l>=0;l--){if(!copy_arr[arr_n][l]||!copy_arr[arr_n][l].go_to){copy_arr[arr_n].splice(l,1);}else{data_only(copy_arr[arr_n][l],\"text\");}};arr_l[arr_n]=JSON.parse(JSON.stringify(copy_arr[arr_n]));update_novel();state_save();modal_window(\"close\");menu_add.style.visibility=\"hidden\";'><tbody><tr><td width='42px' class='icon icon_ok'></td><td align='center'>Apply</td><td width='42px'></td></tr></tbody></table></div>"
    modal_window("open",html);
}
function edit_choice_new(){
	var tbody=document.getElementById('var_choice').getElementsByTagName('tbody')[0];
    var l=copy_arr[arr_n].length;
    copy_arr[arr_n].push({"go_to":"tue_no","position":["50%","0","50%","0"],"size":[0,story_script.parameters.buttons[0].size[1]-8],"color":story_script.parameters.text_panel.color,"color_text":story_script.parameters.text_panel.color_text,"text":"button","indent_text":"8px"});
    data_la(copy_arr[arr_n][l],'text')
    var row=document.createElement("tr");
    var td1=document.createElement("td");
    var td2=document.createElement("td");
    var td3=document.createElement("td");
    var td4=document.createElement("td");
    var td5=document.createElement("td");
    var td6=document.createElement("td");
    var td7=document.createElement("td");
    var td8=document.createElement("td");
    var td9=document.createElement("td");
    var td10=document.createElement("td");
    var td11=document.createElement("td");
    var td12=document.createElement("td");
	td1.innerHTML="Text";
	td1.style="width:32px;height:26px;";
	td2.innerHTML="<select id='chol"+l+"' class='choice_la' onchange='chot"+l+".value=copy_arr."+arr_n+"["+l+"].text[this.value];' style='height:26px;width:30px;border-left:1px solid var(--cb);border-right:1px solid var(--cb);border-bottom:1px solid var(--cb);'>"+project_languares(languare)+"</select>";
	td2.setAttribute("valign","bottom");
    td2.style="height:26px;width:28px;";
    td3.innerHTML="<input id='chot"+l+"' class='addon_path input_text' oninput='copy_arr."+arr_n+"["+l+"].text[chol"+l+".value]=this.value;' style='height:26px;' value='button' type='text'>";
    td4.innerHTML="Position X";
	td4.setAttribute("align","right");
    td4.style="width:64px;padding-right:8px;";
	td5.innerHTML="<input class='addon_path input_text' style='height:26px;' oninput='copy_arr."+arr_n+"["+l+"].position[0]=this.value;' value='50%' type='text'>";
	td5.setAttribute("valign","center");
    td5.style="height:26px;width:28px;";
    td6.innerHTML="Y";
	td6.setAttribute("align","center");
    td6.style="width:16px;";
    td7.innerHTML="<input class='addon_path input_text' style='height:26px;' oninput='copy_arr."+arr_n+"["+l+"].position[2]=this.value;' value='50%' type='text'>";
    td7.style="width:48px;";
    td8.innerHTML="go to:";
    td8.setAttribute("align","right");
    td8.style="width:48px;white-space:nowrap;";
    td9.innerHTML="<select onchange='copy_arr."+arr_n+"["+l+"].go_to=this.value;'>"+option_block("tue_no",2)+"</select>";
    td9.style="width:92px;";
    td10.innerHTML="💎:";
    td10.title="How many diamonds is this choice worth?";
    td11.innerHTML="<input type='number' onchange='copy_arr."+arr_n+"["+l+"].diamonds=this.value;' max='100' min='0' />";
    td11.style="width:50px;";
    td12.style="width:32px;cursor:pointer;";
    td12.title="delete";
    td12.className="icon icon_del";
    td12.setAttribute("onclick","copy_arr."+arr_n+"["+l+"]={};var a=this.closest('tr');a.parentElement.removeChild(a);");
	row.appendChild(td1);
    row.appendChild(td2);
    row.appendChild(td3);
	row.appendChild(td4);
    row.appendChild(td5);
    row.appendChild(td6);
    row.appendChild(td7);
    row.appendChild(td8);
    row.appendChild(td9);
    row.appendChild(td10);
    row.appendChild(td11);
    row.appendChild(td12);
    tbody.appendChild(row);
}
function scen_edit_data(){
    var arr_t=story_script.parameters.text_panel
    var arr_p=story_script.parameters.name_panel
    s_scene_audio_play.setAttribute("onclick","if(!story_script."+scen_data[0]+"["+scen_data[1]+"].dialogs["+(scen_data[2]-1)+"].sound){story_script."+scen_data[0]+"["+scen_data[1]+"].dialogs["+(scen_data[2]-1)+"].sound=''};arr_l=story_script."+scen_data[0]+"["+scen_data[1]+"].dialogs["+(scen_data[2]-1)+"];arr_n='sound';dialog_audio_edit('s_scene_audio_play');");
    s_scene_audio_off.setAttribute("onclick","if(!story_script."+scen_data[0]+"["+scen_data[1]+"].dialogs["+(scen_data[2]-1)+"].sound_stop){story_script."+scen_data[0]+"["+scen_data[1]+"].dialogs["+(scen_data[2]-1)+"].sound_stop=''};arr_l=story_script."+scen_data[0]+"["+scen_data[1]+"].dialogs["+(scen_data[2]-1)+"];arr_n='sound_stop';dialog_audio_edit('s_scene_audio_off');");
    s_scene_video.setAttribute("onclick","if(!story_script."+scen_data[0]+"["+scen_data[1]+"].dialogs["+(scen_data[2]-1)+"].video){story_script."+scen_data[0]+"["+scen_data[1]+"].dialogs["+(scen_data[2]-1)+"].video={'url':'','fit':'cover'}};arr_l=story_script."+scen_data[0]+"["+scen_data[1]+"].dialogs["+(scen_data[2]-1)+"];arr_n='video';dialog_video_edit();");
    s_scene_edit.setAttribute("onclick","arr_l=story_script['"+scen_data[0]+"'];arr_n="+scen_data[1]+";scene_edit();");
    s_scene_json.setAttribute("onclick","arr_l=story_script."+scen_data[0]+"["+scen_data[1]+"].dialogs;arr_n="+(scen_data[2]-1)+";jsonedit(true);");
    s_scene_text.setAttribute("onclick","if(!story_script."+scen_data[0]+"["+scen_data[1]+"].dialogs["+(scen_data[2]-1)+"].text){story_script."+scen_data[0]+"["+scen_data[1]+"].dialogs["+(scen_data[2]-1)+"].text=''};arr_l=story_script."+scen_data[0]+"["+scen_data[1]+"].dialogs["+(scen_data[2]-1)+"];arr_n='text';dialog_text_edit();");
    s_scene_html.setAttribute("onclick","if(!story_script."+scen_data[0]+"["+scen_data[1]+"].dialogs["+(scen_data[2]-1)+"].html){story_script."+scen_data[0]+"["+scen_data[1]+"].dialogs["+(scen_data[2]-1)+"].html=''};arr_l=story_script."+scen_data[0]+"["+scen_data[1]+"].dialogs["+(scen_data[2]-1)+"];arr_n='html';edit_html();");
    s_scene_var.setAttribute("onclick","if(!story_script."+scen_data[0]+"["+scen_data[1]+"].dialogs["+(scen_data[2]-1)+"].variables  ){story_script."+scen_data[0]+"["+scen_data[1]+"].dialogs["+(scen_data[2]-1)+"].variables=[]}if(story_script.parameters.variables&&Object.keys(story_script.parameters.variables).length>0){arr_l=story_script."+scen_data[0]+"["+scen_data[1]+"].dialogs["+(scen_data[2]-1)+"];arr_n='variables';variables_set_edit();}else{setup();set_menu(4);}");
    s_scene_js.setAttribute("onclick","if(!story_script."+scen_data[0]+"["+scen_data[1]+"].dialogs["+(scen_data[2]-1)+"].js){story_script."+scen_data[0]+"["+scen_data[1]+"].dialogs["+(scen_data[2]-1)+"].js=''};copy_arr=story_script."+scen_data[0]+"["+scen_data[1]+"].dialogs["+(scen_data[2]-1)+"];edit_code(\'js\',\'JavaScript\');");
    size_w.value=((arr_t.size[0])?arr_t.size[0]:"")
    size_h.value=((arr_t.size[1])?arr_t.size[1]:"")
    className.value=((arr_t.className)?arr_t.className:"")
    style.value=((arr_t.style)?arr_t.style:"")
    if(arr_t.position){
        position_l.value=((arr_t.position[0])?arr_t.position[0]:0)
        position_r.value=((arr_t.position[1])?arr_t.position[1]:0)
        position_t.value=((arr_t.position[2])?arr_t.position[2]:0)
    }if(arr_t.color){
        color_t.value=arr_t.color
        color_t_s.style.backgroundColor=arr_t.color
    }else{color_t.value=""}
    if(arr_t.color_text){
        color_text.value=arr_t.color_text
        color_text_s.style.backgroundColor=arr_t.color_text
    }else{color_text.value=""}
    indent_bottom.value=((arr_t.indent_bottom)?arr_t.indent_bottom:0)
    indent_text.value=arr_t.indent_text
    size_text.value=arr_t.size_text?arr_t.size_text:"";
    font_family.value=arr_t.font_family?arr_t.font_family:"";
    dialog_speed.value=arr_t.dialog_speed
    console_mode.selectedIndex=((arr_t.scroll)?1:0)
    if(arr_t.end_text_cursor){
        console_mode.selectedIndex=((arr_t.scroll)?1:0)
        etc_i.value=arr_t.end_text_cursor[0]
        etc_w.value=arr_t.end_text_cursor[1]
        etc_h.value=arr_t.end_text_cursor[2]
        etc_s.value=arr_t.end_text_cursor[3]
    }
    n_size_w.value=((arr_p.size[0])?arr_p.size[0]:0)
    n_size_h.value=((arr_p.size[1])?arr_p.size[1]:0)
    if(arr_p.position){
        n_position_l.value=arr_p.position[0]
        n_position_r.value=arr_p.position[1]
        n_position_t.value=arr_p.position[2]
        n_position_b.value=arr_p.position[3]
    }
    n_className.value=((arr_p.className)?arr_p.className:"")
    n_style.value=((arr_p.style)?arr_p.style:"")
    n_indent_text.value=((arr_p.indent_text)?arr_p.indent_text:"")
    n_size_text.value=((arr_p.size_text)?arr_p.size_text:"")
    n_font_family.value=((arr_p.font_family)?arr_p.font_family:"")
    if(arr_p.color){
        n_color.value=arr_p.color
        n_color_s.style.backgroundColor=arr_p.color
    }else{n_color.value=""}
    if(arr_p.color_text){
        n_color_text.value=arr_p.color_text
        n_color_text_s.style.backgroundColor=arr_p.color_text
    }else{n_color_text.value=""}
    n_align_tp.innerHTML="<tr>"
        +"<td><input class='icon icon_diag align' type='radio' name='align_tp' "+((arr_p.align&&arr_p.align[0]=='start'&&arr_p.align[1]=='start')?'checked':'')+" onchange='story_script.parameters.name_panel.align=[\"start\",\"start\"];scen_edit_update(true);state_save()' style='transform:scaleX(-1) scaleY(-1);'></td>"
        +"<td><input class='icon icon_side align' type='radio' name='align_tp' "+((arr_p.align&&arr_p.align[0]=='center'&&arr_p.align[1]=='start')?'checked':'')+" onchange='story_script.parameters.name_panel.align=[\"center\",\"start\"];scen_edit_update(true);state_save()' ></td>"
        +"<td><input class='icon icon_diag align' type='radio' name='align_tp' "+((arr_p.align&&arr_p.align[0]=='end'&&arr_p.align[1]=='start')?'checked':'')+" onchange='story_script.parameters.name_panel.align=[\"end\",\"start\"];scen_edit_update(true);state_save()' style='transform:scaleY(-1);'></td>"
    +"</tr><tr>"
        +"<td><input class='icon icon_side align' type='radio' name='align_tp' "+((arr_p.align&&arr_p.align[0]=='start'&&arr_p.align[1]=='center')?'checked':'')+" onchange='story_script.parameters.name_panel.align=[\"start\",\"center\"];scen_edit_update(true);state_save()' style='transform:rotate(270deg);'></td>"
        +"<td><input class='icon icon_cent align' type='radio' name='align_tp' "+((!arr_p.align)?'checked':'')+" onchange='delete story_script.parameters.name_panel.align;scen_edit_update(true);state_save()' ></td>"
        +"<td><input class='icon icon_side align' type='radio' name='align_tp' "+((arr_p.align&&arr_p.align[0]=='end'&&arr_p.align[1]=='center')?'checked':'')+" onchange='story_script.parameters.name_panel.align=[\"end\",\"center\"];scen_edit_update(true);state_save()' style='transform:rotate(90deg);'></td>"
    +"</tr><tr>"
        +"<td><input class='icon icon_diag align' type='radio' name='align_tp' "+((arr_p.align&&arr_p.align[0]=='start'&&arr_p.align[1]=='end')?'checked':'')+" onchange='story_script.parameters.name_panel.align=[\"start\",\"end\"];scen_edit_update(true);state_save()' style='transform:scaleX(-1);'></td>"
        +"<td><input class='icon icon_side align' type='radio' name='align_tp' "+((arr_p.align&&arr_p.align[0]=='center'&&arr_p.align[1]=='end')?'checked':'')+" onchange='story_script.parameters.name_panel.align=[\"center\",\"end\"];scen_edit_update(true);state_save()' style='transform:scaleY(-1);'></td>"
        +"<td><input class='icon icon_diag align' type='radio' name='align_tp' "+((arr_p.align&&arr_p.align[0]=='end'&&arr_p.align[1]=='end')?'checked':'')+" onchange='story_script.parameters.name_panel.align=[\"end\",\"end\"];scen_edit_update(true);state_save()' style='transform:scaleX(1);'></td>"
    +"</tr>"
}
function scen_edit_update(show){
    var arr_t=story_script.parameters.text_panel
    var arr_p=story_script.parameters.name_panel
    if(document.getElementById('editcode')&&editcode.value!=''){style.value=(arr_t.style)?arr_t.style:'';}
    else if(!style.value==''){arr_t.style=style.value}else{delete arr_t.style;}
    if(document.getElementById('editcode')&&editcode.value!=''){n_style.value=(arr_p.style)?arr_p.style:'';}
    else if(!n_style.value==''){arr_p.style=n_style.value;}else{delete arr_p.style;}
    if(show){
        scroll_x=scene_view.scrollTop;
        scroll_y=scene_view.scrollLeft;
        scen_editor(scen_data[0],scen_data[1],scen_data[2])}else{scen_element={};scen_editor_apply()}
}
var scene_scroll=false,script_scroll=[];
function values_in_text(e){
    let t=Array.from(e.matchAll(/<(.*?)>/g));
    for(var a=0;a<t.length;a++){
        let r,o=t[a];
        if(o[1].includes("=")){r=o[1].split('=');e=e.replace(o[0],"<ruby style='color:inherit;'>"+r[0]+"<rt style='color:inherit;'>"+r[1]+"</rt></ruby>")}
        else{e=e.replace(o[0],story_script.parameters.variables[o[1]])}
    }return e
}
function scen_editor(block,i,n){
    var arr_s=story_script[block][i].dialogs[n-1];
    var arr_t=story_script.parameters.text_panel;
    var arr_p=story_script.parameters.name_panel;
    var arr_c=(story_script.parameters.characters)?story_script.parameters.characters:false;
    script_scroll=[html.scrollLeft,html.scrollTop]
    if(scen_data[2]<n){
        if(i>=story_script[block].length-1){i=story_script[block].length-1;}
        if(!arr_s){i+=1;n=1;}
        if(!story_script[block][i]||story_script[block][i].dialogs.length==0){i-=1;n=story_script[block][i].dialogs.length;toast('Not scene')}
    }else if(scen_data[2]>n&&!arr_s&&story_script[block][i-1]&&story_script[block][i-1].dialogs){i-=1;n=story_script[block][i].dialogs.length;}else if(n<1){n=1;toast('Not scene')}
    if(story_script.parameters.pixelmode){scene_layout.style.imageRendering="pixelated";scene_layout.style.fontSmooth="never";}
    else{scene_layout.style.imageRendering="auto";scene_layout.style.fontSmooth="auto";}
    arr_s=story_script[block][i].dialogs[n-1];
    scen_data=[block,i,n];
    p_width.value=setup_editor.preview[0];
    screen_size.getElementsByTagName('option')[2].style.display=(story_script.parameters.resolutions)?"block":"none";
    scene_layout.style.overflow=(setup_editor.preview[3]&&setup_editor.preview[3]==1)?"visible":"hidden";
    off_screen.selectedIndex=setup_editor.preview[3];
    aspect_ratio.selectedIndex=(setup_editor.preview[0]==76)?1:(setup_editor.preview[0]==56)?2:(setup_editor.preview[0]==100)?0:-1;
    ratio_screen.selectedIndex=setup_editor.preview[1];
    if(setup_editor.preview[2]){screen_size.selectedIndex=(setup_editor.preview[2]==2&&!story_script.parameters.resolutions)?0:setup_editor.preview[2];}
    world.style.display="none";
    new_story_block.style.display="none";
    scene_maker.style.display="initial";
    html.style.overflow="hidden"
    menu_element.style.visibility='hidden';
    scrnr_title.innerHTML=block+" ( scene: "+(i+1)+" | dialog: "+n+" )";
    preview_size(false);
    scene_layout.style.backgroundImage='none';
    scene_layout.style.backgroundImage='url('+open_file(languare_data(story_script[block][i].background_image))+')';
    scene_layout.style.backgroundSize=((!story_script[block][i].background_size)?"cover":story_script[block][i].background_size);
    scene_layout.style.backgroundPosition=((!story_script[block][i].background_align)?"center":story_script[block][i].background_align);
    scene_layout.style.backgroundColor=story_script[block][i].background_color;
    if(!scene_screen){
        scene_view.scrollTop=(screen_preview.clientHeight/2)-(scene_view.clientHeight/2);
        scene_view.scrollLeft=(screen_preview.clientWidth/2)-(scene_view.clientWidth/2);
    }
    scroll_block=true;
    scene_screen=true;
    scene_scroll=true;
    if(story_script[block][i].dialogs[n-1].video){
        var video=document.getElementById("scen_video");
        if(!video){video=document.createElement("video");}
        else{video.style.display="block";}
        video.classList.add("tue_video");video.classList.add("objSelect");
        video.src=open_file(languare_data(story_script[block][i].dialogs[n-1].video.url))+((!story_script[block][i].dialogs[n-1].video.time_start)?"":"#t="+story_script[block][i].dialogs[n-1].video.time_start);
        video.style.position="absolute";
        video.style.left="50%";
        video.style.top="50%";
        video.style.transform='translate(-50%,-50%)';
        video.id='scen_video'
        video.setAttribute('onclick','');
        video.setAttribute('ondblclick','arr_l=story_script.'+block+'['+i+'].dialogs['+(n-1)+'];arr_n=\'video\';dialog_video_edit();');
        if(story_script[block][i].dialogs[n-1].video.fit){
            if(story_script[block][i].dialogs[n-1].video.fit=='contain'){
                video.style.width="100%";
                video.style.height="100%";
            }else if(story_script[block][i].dialogs[n-1].video.fit=='position'){
                video.setAttribute('onclick','objSelect(this.id);arr_e=story_script.'+block+'['+i+'].dialogs['+(n-1)+'].video');
                video.setAttribute('ondblclick','');
                video.style.transformOrigin="top left";
                if(story_script[block][i].dialogs[n-1].video.angle){video.style.transform="rotate("+story_script[block][i].dialogs[n-1].video.angle+"deg)"}else{video.style.transform='none';}
                if(story_script[block][i].dialogs[n-1].video.size){
                    video.style.width=story_script[block][i].dialogs[n-1].video.size[0];
                    video.style.height=story_script[block][i].dialogs[n-1].video.size[1];
                }
                if(story_script[block][i].dialogs[n-1].video.position){
                    if(story_script[block][i].dialogs[n-1].video.position[0]!=0){video.style.right=null;video.style.left=story_script[block][i].dialogs[n-1].video.position[0];}
                    if(story_script[block][i].dialogs[n-1].video.position[1]!=0){video.style.left=null;video.style.right=story_script[block][i].dialogs[n-1].video.position[1];}
                    if(story_script[block][i].dialogs[n-1].video.position[2]!=0){video.style.bottom=null;video.style.top=story_script[block][i].dialogs[n-1].video.position[2];}
                    if(story_script[block][i].dialogs[n-1].video.position[3]!=0){video.style.top=null;video.style.bottom=story_script[block][i].dialogs[n-1].video.position[3];}
                }
            //}else if(story_script[block][i].dialogs[n-1].video.fit=='cover'&&tue_video){tue_video;video.setAttribute('onloadedmetadata','video_size();');}
            }else if(story_script[block][i].dialogs[n-1].video.fit=='cover'){video.setAttribute('onloadedmetadata','video_size();');}
        }else{video.setAttribute('onloadedmetadata','video_size();');}
        scene_layout.appendChild(video);
    }else if(document.getElementById("scen_video")){scen_video.style.display="none";}
    if(story_script[block][i].dialogs[n-1]){
        if((story_script[block][i].dialogs[n-1].text&&(typeof story_script[block][i].dialogs[n-1].text!=='object'||(story_script[block][i].dialogs[n-1].text[languare]&&typeof story_script[block][i].dialogs[n-1].text[languare]!=='object')))||(story_script[block][i].dialogs[n-1].text_add&&(typeof story_script[block][i].dialogs[n-1].text_add!=='object'||(story_script[block][i].dialogs[n-1].text_add[languare]&&typeof story_script[block][i].dialogs[n-1].text_add[languare]!=='object')))){
            if(arr_t.style){tue_text_block.style=arr_t.style;}else{tue_text_block.style=null};
            tue_text_block.style.visibility='visible';
            tue_text_element.style.position="relative";
            if(arr_t.className){tue_text_block.className=arr_t.className;}else{tue_text_block.className=""};
            tue_text_block.style.position="absolute";
            tue_text_block.style.borderCollapse="separate";
            if(arr_t.size){
                tue_text_block.style.width=arr_t.size[0];
                tue_text_block.style.height=arr_t.size[1];
            }
            if(!arr_t.position){arr_t.position=[]}
            if((!arr_t.position[0]||arr_t.position[0]=="0")&&(!arr_t.position[1]||arr_t.position[1]=="0")){
                tue_text_block.style.marginLeft="auto";
                tue_text_block.style.marginRight="auto";
                tue_text_block.style.left=0;
                tue_text_block.style.right=0;
            }else{
                tue_text_block.style.left=(arr_t.position[0]!="0")?arr_t.position[0]:null;
                tue_text_block.style.right=(arr_t.position[1]!="0")?arr_t.position[1]:null;
                tue_text_block.style.margin=null;
            }
            tue_text_block.style.top=(arr_t.position[2]!="0")?arr_t.position[2]:null;
            tue_text_block.style.bottom=(arr_t.indent_bottom!="0")?arr_t.indent_bottom:null;
            tue_text_block.style.zIndex="1000";
            tue_text_block.style.borderSpacing="0";
            tue_text_block.style.zIndex=1998;
            let tue_text_view=document.getElementById("tue_text_view");
            tue_text_view.style.padding=arr_t.indent_text;
            tue_text_view.style.fontSize=((arr_t.size_text)?arr_t.size_text:story_script.parameters.font_size);
            tue_text_view.style.fontFamily=((arr_t.font_family)?arr_t.font_family:story_script.parameters.font);
            tue_text_view.style.height="100%";
            tue_text_view.style.whiteSpace="pre-wrap";
            if(story_script.parameters.text_panel.scroll){
                tue_text_view.style.height=arr_t.size[1];
                tue_text_view.style.position="relative";
                tue_text_view.style.overflowY="hidden";
            }
            if(story_script[block][i].dialogs[n-1].end_text_cursor||story_script.parameters.text_panel.end_text_cursor){
                var e_cursor=JSON.parse(JSON.stringify((story_script[block][i].dialogs[n-1].end_text_cursor)?story_script[block][i].dialogs[n-1].end_text_cursor:story_script.parameters.text_panel.end_text_cursor));
                if(e_cursor[1]==""&&story_script.parameters.text_panel.end_text_cursor[1]){e_cursor[1]=story_script.parameters.text_panel.end_text_cursor[1]}
                if(e_cursor[2]==""&&story_script.parameters.text_panel.end_text_cursor[2]){e_cursor[2]=story_script.parameters.text_panel.end_text_cursor[2]}
                if(e_cursor[3]==""&&story_script.parameters.text_panel.end_text_cursor[3]){e_cursor[3]=story_script.parameters.text_panel.end_text_cursor[3]}
            }
            if(story_script[block][i].dialogs[n-1].text){tue_text_view.innerHTML=values_in_text(languare_data(story_script[block][i].dialogs[n-1].text)).replace(new RegExp("\n","g"),"<br>")
            +((e_cursor&&e_cursor[0])?'&nbsp<img src="'+open_file(e_cursor[0])+'" style="width:'+((e_cursor[1])?e_cursor[1]:'auto')+';height:'+((e_cursor[2])?e_cursor[2]:'auto')+';'+((e_cursor[3])?e_cursor[3]:'')+'">':'');}
            else {tue_text_view.innerHTML=languare_data(story_script[block][i].dialogs[n-1].text_add).replace(new RegExp("\n","g"),"<br>")+((e_cursor&&e_cursor[0])?'&nbsp<img src="'+open_file(e_cursor[0])+'" style="width:'+((e_cursor[1])?e_cursor[1]:'auto')+';height:'+((e_cursor[2])?e_cursor[2]:'auto')+';'+((e_cursor[3])?e_cursor[3]:'')+'">':'');}
            if(story_script[block][i].dialogs[n-1].name&&arr_p){
                if(arr_p.className){tue_name_block.className=arr_p.className;}else{tue_name_block.className=""};
                if(arr_p.style){tue_name_block.style=arr_p.style;}else if(arr_c[story_script[block][i].dialogs[n-1].name] && arr_c[story_script[block][i].dialogs[n-1].name].style){tue_name_block.style=arr_c[story_script[block][i].dialogs[n-1].name].style}else{tue_name_block.style=null};
                if(arr_c[story_script[block][i].dialogs[n-1].name] && arr_c[story_script[block][i].dialogs[n-1].name].color){tue_name_block.style.backgroundColor=arr_c[story_script[block][i].dialogs[n-1].name].color}else if(arr_p.color){tue_name_block.style.backgroundColor=arr_p.color}else{tue_name_block.style.backgroundColor=null};
                if(arr_c[story_script[block][i].dialogs[n-1].name] && arr_c[story_script[block][i].dialogs[n-1].name].color_text){tue_name_block.style.color=arr_c[story_script[block][i].dialogs[n-1].name].color_text}else if(arr_p.color_text){tue_name_block.style.color=arr_p.color_text}else{tue_name_block.style.color=null};
                tue_name_block.style.position="absolute";
                tue_name_block.style.padding=arr_p.indent_text;
                tue_name_block.style.fontSize=((arr_p.size_text)?arr_p.size_text:story_script.parameters.font_size);
                tue_name_block.style.fontFamily=((arr_p.font_family)?arr_p.font_family:story_script.parameters.font);
                tue_name_block.style.display="flex";
                tue_name_block.style.justifyContent=((arr_p.align)?arr_p.align[0]:"center");
                tue_name_block.style.alignItems=((arr_p.align)?arr_p.align[1]:"center");
                if(tue_name_block.style.width=arr_p.size[0]!=0){tue_name_block.style.width=arr_p.size[0];}
                tue_name_block.style.height=arr_p.size[1];
                tue_name_block.style.left=(arr_p.position[0]==""||arr_p.position[0]=="0")?null:arr_p.position[0];
                tue_name_block.style.right=(arr_p.position[1]==""||arr_p.position[1]=="0")?null:arr_p.position[1];
                tue_name_block.style.top=(arr_p.position[2]==""||arr_p.position[2]=="0")?((arr_p.position[3]==""||arr_p.position[3]=="0")?"0px":null):arr_p.position[2];
                tue_name_block.style.bottom=(arr_p.position[3]==""||arr_p.position[3]=="0")?null:arr_p.position[3];
                tue_name_block.innerHTML=values_in_text((arr_c&&arr_c[story_script[block][i].dialogs[n-1].name])?languare_data(arr_c[story_script[block][i].dialogs[n-1].name]):languare_data(story_script[block][i].dialogs[n-1].name));
                tue_name_block.style.visibility='visible';
            }else{tue_name_block.style.visibility='hidden';}
            if(arr_s.color){tue_text_block.style.backgroundColor=arr_s.color;}else if(arr_t.color){tue_text_block.style.backgroundColor=arr_t.color;}
            if(arr_s.color_text){tue_text_view.style.color=arr_s.color_text;}else if(arr_t.color_text){tue_text_view.style.color=arr_t.color_text;}
            bg_art(arr_p,'tue_name_block',(arr_c[story_script[block][i].dialogs[n-1].name]&&arr_c[story_script[block][i].dialogs[n-1].name].art)?arr_c[story_script[block][i].dialogs[n-1].name].art:false);
            bg_art(arr_t,'tue_text_block');
            function bg_art(arr_u,tue_id,art){
                tue_id=document.getElementById(tue_id);
                tue_id.style.backgroundRepeat="no-repeat";
                tue_id.style.backgroundPosition=((arr_u.art_align)?arr_u.art_align[0]+" "+arr_u.art_align[1]:"center");
                art=(art)?art:arr_u.art;
                if(art){
                    var a=art[languare]?art[languare]:art;
                    if(a.length>0){tue_id.style.backgroundImage="url('"+open_file(a)+"')";}
                }
                if(arr_u.art_size){
                    if(arr_u.art_size=='patch'){tue_id.style.backgroundImage='none'}else if(arr_u.patch){delete arr_u.patch}
                    if(typeof arr_u.art_size==='object'){tue_id.style.backgroundSize=arr_u.art_size[0]+" "+arr_u.art_size[1];}
                    else if(arr_u.art_size=='patch'){
                        if(!arr_u.patch){arr_u.patch=[8,8,8,8]};
                        tue_id.style.backgroundImage="none";
                        tue_id.style.backgroundSize="none";
                        tue_id.style.backgroundClip="padding-box";
                        tue_id.style.borderStyle="solid";
                        tue_id.style.borderWidth=arr_u.patch[0]+"px "+arr_u.patch[1]+"px "+arr_u.patch[2]+"px "+arr_u.patch[3]+"px";
                        tue_id.style.borderImage="url('"+open_file((arr_u.art[languare])?arr_u.art[languare]:arr_u.art)+"') "+arr_u.patch[0]+" "+arr_u.patch[1]+" "+arr_u.patch[2]+" "+arr_u.patch[3]+" stretch stretch";
                    }else{tue_id.style.backgroundSize=arr_u.art_size;}
                }
            }
            tue_text_block.setAttribute("ondblclick","s_scene_text.onclick();");
        }else{tue_text_block.style.visibility='hidden';tue_name_block.style.visibility='hidden';}
        panel_art('anp_edit');panel_art('atp_edit');button_panel_update();
        if(story_script[block][i].dialogs[n-1].art){art_panel_update(block,i,n);}else{arts_ec.innerHTML="";var tue_art=document.getElementsByClassName("tue_art");while(tue_art.length){scene_layout.removeChild(tue_art[0]);}}
        add_art.setAttribute('onclick','art_panel_add("'+block+'",'+i+','+n+')');
        if(story_script[block][i].dialogs[n-1].choice){choice_panel_update(block,i,n);}else{choice_ec.innerHTML="";var tue_choice=document.getElementsByClassName("tue_choice");while(tue_choice.length){scene_layout.removeChild(tue_choice[0]);}}
        add_choice.setAttribute('onclick','choice_panel_add("'+block+'",'+i+','+n+')');
        var html_show=document.getElementsByClassName("tue_html_dialog");
        while(html_show.length){scene_layout.removeChild(html_show[0]);}
        if(story_script[block][i].dialogs[n-1].html){
            if(arr_s.html[languare]){
                html_show=document.createElement("div");
                html_show.className='tue_html_dialog';
                html_show.innerHTML=arr_dialog.html[languare];
                scene_layout.appendChild(html_show);
            }else{
                html_show=document.createElement("div");
                html_show.className='tue_html_dialog';
                html_show.innerHTML=arr_s.html;
                scene_layout.appendChild(html_show);
            }
        }
    }make_resizable(document.getElementById("resizers"));
}
function video_size(){
    var v=document.getElementById('scen_video')
    if(v && (!story_script[scen_data[0]][scen_data[1]].dialogs[(scen_data[2]-1)].video.fit||story_script[scen_data[0]][scen_data[1]].dialogs[(scen_data[2]-1)].video.fit=='cover')){
        var tue_size=scene_layout.getBoundingClientRect();
        if((v.videoWidth/v.videoHeight)>(tue_size.width/tue_size.height)){v.style.height='100%';v.style.width='auto';}
        else{v.style.height='auto';v.style.width='100%';}
    }
}
function panel_art(id){
    var arr_s,arr_t,tbody=document.getElementById(id);
    if(id=='atp_edit'){arr_s=story_script.parameters.text_panel;arr_t='story_script.parameters.text_panel'}
    else if(id=='anp_edit'){arr_s=story_script.parameters.name_panel;arr_t='story_script.parameters.name_panel'}
    if(!arr_s.art){arr_s.art="";}
    data_la(arr_s,'art');
    if(!arr_s.art_size){arr_s.art_size=' '}
    tbody.innerHTML='<tr><td height="40px" align="right" style="padding-right:8px;">Art</td>'
        +'<td style="width:28px;" align="center"><select id="la'+id+'" onchange="lat'+id+'.value='+arr_t+'.art[this.value]" style="height:28px;width:100%;border-left:1px solid var(--cb);border-right:1px solid var(--cb);border-bottom:1px solid var(--cb);">'+project_languares(languare)+'</select></td>'
        +'<td><input id="lat'+id+'" class="input_text" onchange="var v=document.getElementById(\'la'+id+'\');'+arr_t+'.art[v.value]=this.value;scen_edit_update(true);" type="text" style="width:100%;height:28px" value="'+((arr_s.art[languare]&&arr_s.art[languare].length>0)?arr_s.art[languare]:'')+'"></td>'
        +'<td height="40px" align="right" style="width:30px;" class="icon icon_load" onclick=\'file_catalog("lat'+id+'","img","lat'+id+'","'+((id=='atp_edit')?'tue_text_block':'tue_name_block')+'","'+arr_t+'.art[la'+id+'.value]")\'></td>'
    +'<tr></tr><td height="40px" align="right" style="padding-right:8px;">Size</td>'
    +'<td colspan="3"><select oninput="'+arr_t+'.art_size=this.value;scen_edit_update(true);">'
        +'<option value=" ">none</option>'
        +'<option '+((arr_s.art_size=='cover')?'selected':'')+' value="cover">cover</option>'
        +'<option '+((arr_s.art_size=='contain')?'selected':'')+' value="contain">contain</option>'
        +'<option '+((arr_s.art_size=='100% 100%')?'selected':'')+' value="100% 100%">fill</option>'
        +'<option '+((arr_s.art_size=='patch')?'selected':'')+' value="patch">9-patch</option>'
    +'</select></td></tr>'
    if(!arr_s.art_size||arr_s.art_size==' '||typeof arr_s.art_size==='object'||(arr_s.art_size!='patch'&&arr_s.art_size!='100% 100%')){
        if(arr_s.art_size==' '){delete arr_s.art_size};
        if(arr_s.art_size!='cover'&&arr_s.art_size!='contain'){tbody.innerHTML+='<tr><td height="40px" align="right" style="padding-right:8px;">Width art</td>'
            +'<td colspan="3"><input class="input_text" onchange="if(!'+arr_t+'.art_size){'+arr_t+'.art_size=[correct_value(this.value),\'auto\']};'+arr_t+'.art_size[0]=correct_value(this.value);scen_edit_update(true);" type="text" style="width:100%;height:28px" value="'+((arr_s.art_size)?arr_s.art_size[0]:'')+'"></td>'
        +'</tr><tr><td height="40px" align="right" style="padding-right:8px;">Height art</td>'
            +'<td colspan="3"><input class="input_text" onchange="if(!'+arr_t+'.art_size){'+arr_t+'.art_size=[\'auto\',correct_value(this.value)]};'+arr_t+'.art_size[1]=correct_value(this.value);scen_edit_update(true);" type="text" style="width:100%;height:28px" value="'+((arr_s.art_size)?arr_s.art_size[1]:'')+'"></td>'
        }
        tbody.innerHTML+='</tr><tr>'
            +'<td height="40px" align="right" style="padding-right:8px;">Align art</td>'
            +'<td colspan="3" align="center">'
            +'<table style="border-radius:4px;"><tbody><tr>'
                +'<td><input class="icon icon_diag align" type="radio" name="align_art'+id+'" onchange="'+arr_t+'.art_align=[\'left\',\'top\'];scen_edit_update(true);state_save();" '+((arr_s.art_align&&arr_s.art_align[0]=='left'&&arr_s.art_align[1]=='top')?'checked':'')+' style="transform:scaleX(-1) scaleY(-1);"></td>'
                +'<td><input class="icon icon_side align" type="radio" name="align_art'+id+'" onchange="'+arr_t+'.art_align=[\'center\',\'top\'];scen_edit_update(true);state_save();" '+((arr_s.art_align&&arr_s.art_align[0]=='center'&&arr_s.art_align[1]=='top')?'checked':'')+'></td>'
                +'<td><input class="icon icon_diag align" type="radio" name="align_art'+id+'" onchange="'+arr_t+'.art_align=[\'right\',\'top\'];scen_edit_update(true);state_save();" '+((arr_s.art_align&&arr_s.art_align[0]=='right'&&arr_s.art_align[1]=='top')?'checked':'')+' style="transform:scaleY(-1);"></td>'
            +'</tr><tr>'
                +'<td><input class="icon icon_side align" type="radio" name="align_art'+id+'" onchange="'+arr_t+'.art_align=[\'left\',\'center\'];scen_edit_update(true);state_save();" '+((arr_s.art_align&&arr_s.art_align[0]=='left'&&arr_s.art_align[1]=='center')?'checked':'')+' style="transform:rotate(270deg);"></td>'
                +'<td><input class="icon icon_cent align" type="radio" name="align_art'+id+'" onchange="delete '+arr_t+'.art_align;scen_edit_update(true);state_save();" '+((!arr_s.art_align)?'checked':'')+'></td>'
                +'<td><input class="icon icon_side align" type="radio" name="align_art'+id+'" onchange="'+arr_t+'.art_align=[\'right\',\'center\'];scen_edit_update(true);state_save();" '+((arr_s.art_align&&arr_s.art_align[0]=='right'&&arr_s.art_align[1]=='center')?'checked':'')+' style="transform:rotate(90deg);"></td>'
            +'</tr><tr>'
                +'<td><input class="icon icon_diag align" type="radio" name="align_art'+id+'" onchange="'+arr_t+'.art_align=[\'left\',\'bottom\'];scen_edit_update(true);state_save();" '+((arr_s.art_align&&arr_s.art_align[0]=='left'&&arr_s.art_align[1]=='bottom')?'checked':'')+' style="transform:scaleX(-1);"></td>'
                +'<td><input class="icon icon_side align" type="radio" name="align_art'+id+'" onchange="'+arr_t+'.art_align=[\'center\',\'bottom\'];scen_edit_update(true);state_save();" '+((arr_s.art_align&&arr_s.art_align[0]=='center'&&arr_s.art_align[1]=='bottom')?'checked':'')+' style="transform:scaleY(-1);"></td>'
                +'<td><input class="icon icon_diag align" type="radio" name="align_art'+id+'" onchange="'+arr_t+'.art_align=[\'right\',\'bottom\'];scen_edit_update(true);state_save();" '+((arr_s.art_align&&arr_s.art_align[0]=='right'&&arr_s.art_align[1]=='bottom')?'checked':'')+' style="transform:scaleX(1);"></td>'
            +'</tr></tbody></table>'
     }else if(arr_s.art_size=='patch'){
        if(!arr_s.patch){arr_s.patch=[8,8,8,8]};
        tbody.innerHTML+='</tr><tr>'
            +'<td height="40px" align="right" style="padding-right:8px;">Top border</td>'
            +'<td colspan="3"><input class="input_text" onchange="'+arr_t+'.patch[0]=parseInt(correct_value(this.value,true));scen_edit_update(true);state_save();" type="text" style="width:100%;height:28px" value="'+((arr_s.art_size)?arr_s.patch[0]:'')+'"></td>'
        +'</tr><tr>'
            +'<td height="40px" align="right" style="padding-right:8px;">Left border</td>'
            +'<td colspan="3"><input class="input_text" onchange="'+arr_t+'.patch[3]=parseInt(correct_value(this.value,true));scen_edit_update(true);state_save();" type="text" style="width:100%;height:28px" value="'+((arr_s.art_size)?arr_s.patch[3]:'')+'"></td>'
        +'</tr><tr>'
            +'<td height="40px" align="right" style="padding-right:8px;">Right border</td>'
            +'<td colspan="3"><input class="input_text" onchange="'+arr_t+'.patch[1]=parseInt(correct_value(this.value,true));scen_edit_update(true);state_save();" type="text" style="width:100%;height:28px" value="'+((arr_s.art_size)?arr_s.patch[1]:'')+'"></td>'
        +'</tr><tr>'
            +'<td height="40px" align="right" style="padding-right:8px;">Bottom border</td>'
            +'<td colspan="3"><input class="input_text" onchange="'+arr_t+'.patch[2]=parseInt(correct_value(this.value,true));scen_edit_update(true);state_save();" type="text" style="width:100%;height:28px" value="'+((arr_s.art_size)?arr_s.patch[2]:'')+'"></td>'
    }
    if(story_script.parameters.plugins&&story_script.parameters.plugins.includes("speech")){
        let arr_t=story_script.parameters.text_panel;
        if(!arr_t.speech){arr_t.speech={}}
        if(typeof arr_t.speech_play=="undefined"){arr_t.speech_play=true}
        if(!arr_t.speech[languare]){
            for(var i=0;i<story_script.parameters.languares.length;i++){arr_t.speech[story_script.parameters.languares[i]]=["",1];}
            arr_t.speech[languare]=["",1]
        };
        tbody.innerHTML+="</td></tr><td colspan='4' height='40px' align='left' style='padding-left:8px;border-bottom:1px solid var(--cb);'>Speech synthesis</td></tr>"
        +"<tr><td height='40px' align='right' style='padding-right:8px;'>Voice</td>"
            +'<td style="width:28px;" align="center"><select id="vols" onchange="vot.value=story_script.parameters.text_panel.speech[this.value][0];vots.value=story_script.parameters.text_panel.speech[this.value][1];" style="height:28px;width:100%;border-left:1px solid var(--cb);border-right:1px solid var(--cb);border-bottom:1px solid var(--cb);">'+project_languares(languare)+'</select></td>'
            +"<td><input id='vot' class='input_text' onchange='story_script.parameters.text_panel.speech[document.getElementById(\"vols\").value][0]=this.value' type='text' style='width:100%;height:28px' value='"+arr_t.speech[languare][0]+"'></td>"
            +"<td height='40px' align='right' style='width:30px;' class='icon icon_edit' onclick='let l=document.getElementById(\"vols\").value;voicesSynthesis(l,\"vot\",\"story_script.parameters.text_panel.speech.\"+l+\"[0]\",tue_text_view.textContent)'></td>"
        +"<tr></tr><tr><td height='40px' align='right' style='width:40%;padding-right:8px;'>Speed</td><td style='padding-right:8px;' colspan='3'>"
            +"<input id='vots' class='input_slider input_slider_progress' onchange='let l=document.getElementById(\"vols\").value;story_script.parameters.text_panel.speech[l][1]=this.value' type='range' min='0' max='2' step='0.1' value='"+arr_t.speech[languare][1]+"' style='width:100%;'>"
        +"<tr></tr><tr><td height='40px' align='right' style='width:40%;padding-right:8px;'>Play</td><td style='padding-right:8px;' colspan='3'>"
            +"<select class='choice_var_operation' onchange='story_script.parameters.text_panel.speech_play=(this.selectedIndex==0)?true:false'><option>Dialog start</option><option "+((arr_t.speech_play)?"":"selected")+">Button click</option></select>"
        +"</td></tr>"
    }
}
function art_panel_update(block,i,n){
    droppFocus(document.getElementById('resizers'));
    arts_ec.innerHTML=""
    var arr_s=story_script[block][i].dialogs[n-1]
    var tue_art=document.getElementsByClassName("tue_art");
    while(tue_art.length){scene_layout.removeChild(tue_art[0]);}
    if(arr_s.art.length==0){delete story_script[block][i].dialogs[n-1].art}
    else{for(var b=arr_s.art.length-1;b>=0;b--){
        if(!arr_s.art[b].url[languare]){data_corr(arr_s.art[b],'url')}
        var art=document.createElement("img");
        art.id='art'+b
        art.setAttribute('draggable','false');
        art.setAttribute('onclick','objSelect(this.id);arr_e=story_script.'+block+'['+i+'].dialogs['+(n-1)+'].art['+b+']');
        art.src=(arr_s.art[b].url[languare])?open_file(arr_s.art[b].url[languare]):open_file(arr_s.art[b].url)
        art.classList.add("tue_art");art.classList.add("objSelect");
        if(arr_s.art[b].style&&arr_s.art[b].style.length>0){
            var s=arr_s.art[b].style;
            for(var f=0;f<project_files.length;f++){s=s.replaceAll(project_files[f][0],project_files[f][1]);};
            art.style=s;
        }
        art.style.position="absolute";
        art.style.transformOrigin="top left";
        art.style.zIndex=1001+b;
        if(arr_s.art[b].fit)art.style.objectFit=arr_s.art[b].fit;
        if(arr_s.art[b].size){
            art.style.width=arr_s.art[b].size[0];
            art.style.height=arr_s.art[b].size[1];
        }
        if(!arr_s.art[b].hotspot){arr_s.art[b].hotspot=['0%','0%']}
        if(arr_s.art[b].align){art.style.objectPosition=arr_s.art[b].align[0]+" "+arr_s.art[b].align[1];}
        art.style.transform="translate("+arr_s.art[b].hotspot[0]+","+arr_s.art[b].hotspot[1]+") "+((arr_s.art[b].angle)?"rotate("+arr_s.art[b].angle+"deg)":"")
        if(arr_s.art[b].position[0]!=0){art.style.left=arr_s.art[b].position[0];}
        if(arr_s.art[b].position[1]!=0){art.style.right=arr_s.art[b].position[1];}
        if(arr_s.art[b].position[2]!=0){art.style.top=arr_s.art[b].position[2];}
        if(arr_s.art[b].position[3]!=0){art.style.bottom=arr_s.art[b].position[3];}
        if(arr_s.art[b].opacity){art.style.opacity=arr_s.art[b].opacity;}
        scene_layout.appendChild(art);
        arts_ec.innerHTML+=art_panel_edit(block,i,n,b)
    }}
}
function art_panel_add(block,i,n){
    var arr_s=story_script[block][i].dialogs[n-1]
    if(!arr_s.art){arr_s.art=[]}
    arr_s.art.unshift({"position":["33%","0","33%","0"],"size":["33%","33%"],"url":"","fit":"contain"});
    art_panel_update(block,i,n)
    file_catalog('artt'+0,'img','artt'+0,'artpre'+0,'story_script.'+block+'['+i+'].dialogs['+(n-1)+'].art[0].url');
    state_save();
}
function panel_m(id,n,block,i,b,el,update){
    var a,u,e,p
    if(block==0){e=document.getElementById('menu_element');p=document.getElementById('scen_setup');a='story_script.parameters.buttons';u=update+'(\''+block+'\','+i+','+n+')'}
    else if(n=="hidden_objects"||n=="terrain_map"){e=document.getElementById('menu_objects');p=document.getElementById('hidden_objects_setup');a='story_script.'+block+'['+i+'].'+arr_n+'.'+el;u=update+'()'}
    else{e=document.getElementById('menu_element');p=document.getElementById('scen_setup');a='story_script.'+block+'['+i+'].dialogs['+(n-1)+'].'+el;u=update+'(\''+block+'\','+i+','+n+')'}
	var code='<div class="add_w" style="width:220px;"><table style="width:100%;"><tbody>'
        +'<tr><td class="add_el" style="height:40px;border-radius:16px 16px 0 0;border-bottom:1px solid var(--cb);" onclick="var arr_d='+a+';'+a+'.splice('+b+',0,JSON.parse(JSON.stringify(arr_d['+b+'])));'+u+';state_save();'+e.id+'.style.visibility=\'hidden\';"><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_copu"></td><td>Duplicate</td></tr></tbody></table></td></tr>'
        +'<tr><td class="add_el" style="border-bottom:1px solid var(--cb);" onclick="buf[0]=\''+update+'\';buf[1]=JSON.stringify('+a+'['+b+']);'+a+'.splice('+b+',1);'+u+';state_save();'+e.id+'.style.visibility=\'hidden\';"><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_cut"></td><td>Cut</td></tr></tbody></table></td></tr>'
        +'<tr><td class="add_el" style="border-bottom:1px solid var(--cb);" onclick="buf[0]=\''+update+'\';buf[1]=JSON.stringify('+a+'['+b+']);'+e.id+'.style.visibility=\'hidden\';"><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_copy"></td><td>Copy</td></tr></tbody></table></td></tr>'
        +((update!=buf[0])?'':'<tr><td class="add_el" style="border-bottom:1px solid var(--cb);" onclick="'+a+'['+b+']=JSON.parse(buf[1]);'+u+';state_save();'+e.id+'.style.visibility=\'hidden\';toast(\'Element replaced\');"><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_refrash"></td><td>Replace</td></tr></tbody></table></td></tr><tr><td class="add_el" style="border-bottom:1px solid var(--cb);" onclick="var arr_d='+a+';'+a+'.splice('+(b+1)+',0,JSON.parse(buf[1]));'+u+';state_save();'+e.id+'.style.visibility=\'hidden\';"><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_paste"></td><td>Paste above</td></tr></tbody></table></td></tr>')
        +'<tr><td class="add_el" style="border-bottom:1px solid var(--cb);" onclick="'+a+'.splice('+b+',1);'+u+';state_save();'+e.id+'.style.visibility=\'hidden\';"><table><tbody><tr><td width="40px" height="26px" class="icon icon_del"></td><td>Delete</td></tr></tbody></table></td></tr>'
        +'<tr><td class="add_el" style="border-radius:0 0 16px 16px;" onclick="'+e.id+'.style.visibility=\'hidden\';"><table><tbody><tr><td width="40px" height="26px" class="icon_m icon_close"></td><td>Cancel</td></tr></tbody></table></td></tr>'
        +'</tbody></table></div>'
    var rect=document.getElementById(id).getBoundingClientRect();
    e.style.visibility='visible';
    e.innerHTML=code;
    e.style.top=p.scrollTop+rect.top-10+"px";
}
function art_panel_edit(block,i,n,b){
    var arr_s=story_script[block][i].dialogs[n-1]
    var show_if="<table width='100%'><tbody><tr><td style='width:128px;' valign='bottom'></td><td style='width:48px;border-right:1px solid var(--cb);border-left:1px solid var(--cb);'></td><td></td><td style='width:30px;'></td></tr>"
    if(arr_s.art[b].show_if){
        show_if+="<tr><td colspan='4'><select class='choice_var_operation' onchange='story_script."+block+"["+i+"].dialogs["+(n-1)+"].art["+b+"].show_if[0]=(this.selectedIndex==0)?true:false'><option>show if</option><option "+((arr_s.art[b].show_if[0])?"":"selected")+">hidden if</option></select></td></tr>"
        for(var c=1;c<arr_s.art[b].show_if.length;c++){show_if+="<tr><td valign='bottom'><select class='choice_var_name' onchange='story_script."+block+"["+i+"].dialogs["+(n-1)+"].art["+b+"].show_if["+c+"][0]=this.value'>"+option_var(arr_s.art[b].show_if[c][0])+"</select></td><td style='border-right:1px solid var(--cb);border-left:1px solid var(--cb);'><select class='choice_var_operation' onchange='story_script."+block+"["+i+"].dialogs["+(n-1)+"].art["+b+"].show_if["+c+"][1]=this.value'><option value='&#61'>&#61</option><option value='&lt;' "+((arr_s.art[b].show_if[c][1]=="<")?"selected":"")+">&lt;</option><option value='&gt;' "+((arr_s.art[b].show_if[c][1]==">")?"selected":"")+">&gt;</option></select></td><td><input class='input_text choice_var_value' onchange='if(parseFloat(this.value)==this.value){story_script."+block+"["+i+"].dialogs["+(n-1)+"].art["+b+"].show_if["+c+"][2]=parseFloat(this.value)}else{story_script."+block+"["+i+"].dialogs["+(n-1)+"].art["+b+"].show_if["+c+"][2]=this.value}' value='"+arr_s.art[b].show_if[c][2]+"' type='text'></td><td onclick='story_script."+block+"["+i+"].dialogs["+(n-1)+"].art["+b+"].show_if.splice("+c+", 1);if(story_script."+block+"["+i+"].dialogs["+(n-1)+"].art["+b+"].show_if.length<=1){delete story_script."+block+"["+i+"].dialogs["+(n-1)+"].art["+b+"].show_if;}art_panel_update(\""+block+"\","+i+","+n+");state_save();' style='cursor:pointer;' title='delet' class='icon icon_del'></td></tr>"};
    };
    show_if+="</tbody></table>"+((story_script.parameters.variables&&Object.keys(story_script.parameters.variables).length>0)?"<div onclick=\"if(!story_script."+block+"["+i+"].dialogs["+(n-1)+"].art["+b+"].show_if){story_script."+block+"["+i+"].dialogs["+(n-1)+"].art["+b+"].show_if=[true]};story_script."+block+"["+i+"].dialogs["+(n-1)+"].art["+b+"].show_if.push( ['"+Object.keys(story_script.parameters.variables)[0]+"','=',0] );art_panel_update('"+block+"',"+i+","+n+");state_save();\" class='icon_m icon_add' style='margin-top:4px;padding-bottom:16px;height:26px;width:100%;cursor:pointer;'></div>":"<div onclick=\"setup();set_menu(4);\" class='icon_m icon_add' style='margin-top:4px;padding-bottom:16px;height:26px;width:100%;cursor:pointer;'></div>")
    var html='<div id="b_art'+b+'" class="ui_buttons dialog" style="margin:8px;"><table style="width:100%" ondblclick="objSelect(\'art'+b+'\');arr_e=story_script.'+block+'['+i+'].dialogs['+(n-1)+'].art['+b+'];"><tbody><tr>'
            +'<td width="24px" class="icon_m icon_up"   onclick="move_elenetn(story_script.'+block+'['+i+'].dialogs['+(n-1)+'].art,'+b+',1);art_panel_update(\''+block+'\','+i+','+n+');state_save();" height="22px"></td>'
            +'<td width="24px" class="icon_m icon_down" onclick="move_elenetn(story_script.'+block+'['+i+'].dialogs['+(n-1)+'].art,'+b+',-1);art_panel_update(\''+block+'\','+i+','+n+');state_save();"></td><td>&nbsp;</td>'
            +'<td width="26px" class="icon_show icon_m" style="cursor:pointer;" onclick="panel_m(\'b_art'+b+'\','+n+',\''+block+'\','+i+','+b+',\'art\',\'art_panel_update\')" ></td>'
    +'</tr><tr><td colspan="5" height="40px" align="center"><div id="artpre'+b+'" style="background-image:url('+((arr_s.art[b].url[languare])?open_file(arr_s.art[b].url[languare]):open_file(arr_s.art[b].url))+');background-position:center;background-repeat:no-repeat;background-size:contain;height:100%;width:100%";> </div></td></tr><tr>'
    +'<td class="icon_m icon_more" height="22px" onclick="menu_element.style.visibility=\'hidden\';block_open(\'artsp'+b+'\');scen_element.artsp'+b+'=artsp'+b+'.style.display;"></td><td colspan="2"></td></tr></tbody></table>'
    +'<table width="100%" id=artsp'+b+' style="display:'+((scen_element['artsp'+b])?scen_element['artsp'+b]:'none')+';border-top:1px solid var(--cb);margin-top:8px;"><tbody><tr>'
        +'<td height="40px" align="right" style="width:40%;padding-right:8px;">Art</td>'
        +'<td style="width:28px;" align="center"><select id="artl'+b+'" onchange="if(!story_script.'+block+'['+i+'].dialogs['+(n-1)+'].art['+b+'].url[languare]){data_la(story_script.'+block+'['+i+'].dialogs['+(n-1)+'].art['+b+'],\'url\')} ;artt'+b+'.value=story_script.'+block+'['+i+'].dialogs['+(n-1)+'].art['+b+'].url[this.value];" style="height:28px;width:100%;border-left:1px solid var(--cb);border-right:1px solid var(--cb);border-bottom:1px solid var(--cb);">'+project_languares(languare)+'</select></td>'
        +'<td ><input id="artt'+b+'" class="input_text" onchange="story_script.'+block+'['+i+'].dialogs['+(n-1)+'].art['+b+'].url[artl'+b+'.value]=this.value;art_panel_update(\''+block+'\','+i+','+n+');state_save();" type="text" style="width:100%;height:28px" value="'+((arr_s.art[b].url[languare])?arr_s.art[b].url[languare]:arr_s.art[b].url)+'"></td>'
        +'<td height="40px" align="right" style="width:30px;" class="icon icon_load" onclick="file_catalog(\'artt'+b+'\',\'img\',\'artt'+b+'\',\'artpre'+b+'\',\'story_script.'+block+'['+i+'].dialogs['+(n-1)+'].art['+b+'].url[artl'+b+'.value]\');"></td>'
    +'</tr><tr>'
        +'<td height="40px" align="right" style="padding-right:8px;">Width size</td>'
        +'<td colspan="2"><input class="input_text" onchange="story_script.'+block+'['+i+'].dialogs['+(n-1)+'].art['+b+'].size[0]=correct_value(this.value);art_panel_update(\''+block+'\','+i+','+n+');state_save();" type="text" style="width:100%;height:28px" value="'+arr_s.art[b].size[0]+'"></td>'
        +'<td height="40px" align="right" rowspan="2"><input id="artp'+b+'" onchange="var f=(this.checked)?\'contain\':\'fill\';art'+b+'.style.objectFit=f;story_script.'+block+'['+i+'].dialogs['+(n-1)+'].art['+b+'].fit=f;state_save();" type="checkbox" class="proportion_c" '+((arr_s.art[b].fit=='contain')?'checked':'')+'></td>'
    +'</tr><tr>'
        +'<td height="40px" align="right" style="padding-right:8px;">Height size</td>'
        +'<td colspan="2"><input class="input_text" onchange="story_script.'+block+'['+i+'].dialogs['+(n-1)+'].art['+b+'].size[1]=correct_value(this.value);art_panel_update(\''+block+'\','+i+','+n+');state_save();" type="text" style="width:100%;height:28px" value="'+arr_s.art[b].size[1]+'"></td>'
    +'</tr><tr>'
        +'<td height="40px" align="right" style="padding-right:8px;">Align art</td>'
        +'<td colspan="3" align="center">'
        +'<table style="background-color:var(--cw);border-radius:4px;"><tbody><tr>'
            +'<td><input class="icon icon_diag align" type="radio" name="align_a'+b+'" onchange="story_script.'+block+'['+i+'].dialogs['+(n-1)+'].art['+b+'].align=[\'left\',\'top\'];art_panel_update(\''+block+'\','+i+','+n+');state_save();" '+((arr_s.art[b].align&&arr_s.art[b].align[0]=='left'&&arr_s.art[b].align[1]=='top')?'checked':'')+' style="transform:scaleX(-1) scaleY(-1);"></td>'
            +'<td><input class="icon icon_side align" type="radio" name="align_a'+b+'" onchange="story_script.'+block+'['+i+'].dialogs['+(n-1)+'].art['+b+'].align=[\'center\',\'top\'];art_panel_update(\''+block+'\','+i+','+n+');state_save();" '+((arr_s.art[b].align&&arr_s.art[b].align[0]=='center'&&arr_s.art[b].align[1]=='top')?'checked':'')+'></td>'
            +'<td><input class="icon icon_diag align" type="radio" name="align_a'+b+'" onchange="story_script.'+block+'['+i+'].dialogs['+(n-1)+'].art['+b+'].align=[\'right\',\'top\'];art_panel_update(\''+block+'\','+i+','+n+');state_save();" '+((arr_s.art[b].align&&arr_s.art[b].align[0]=='right'&&arr_s.art[b].align[1]=='top')?'checked':'')+' style="transform:scaleY(-1);"></td>'
        +'</tr><tr>'
            +'<td><input class="icon icon_side align" type="radio" name="align_a'+b+'" onchange="story_script.'+block+'['+i+'].dialogs['+(n-1)+'].art['+b+'].align=[\'left\',\'center\'];art_panel_update(\''+block+'\','+i+','+n+');state_save();" '+((arr_s.art[b].align&&arr_s.art[b].align[0]=='left'&&arr_s.art[b].align[1]=='center')?'checked':'')+' style="transform:rotate(270deg);"></td>'
            +'<td><input class="icon icon_cent align" type="radio" name="align_a'+b+'" onchange="delete story_script.'+block+'['+i+'].dialogs['+(n-1)+'].art['+b+'].align;art_panel_update(\''+block+'\','+i+','+n+');state_save();" '+((!arr_s.art[b].align)?'checked':'')+'></td>'
            +'<td><input class="icon icon_side align" type="radio" name="align_a'+b+'" onchange="story_script.'+block+'['+i+'].dialogs['+(n-1)+'].art['+b+'].align=[\'right\',\'center\'];art_panel_update(\''+block+'\','+i+','+n+');" '+((arr_s.art[b].align&&arr_s.art[b].align[0]=='right'&&arr_s.art[b].align[1]=='center')?'checked':'')+' style="transform:rotate(90deg);"></td>'
        +'</tr><tr>'
            +'<td><input class="icon icon_diag align" type="radio" name="align_a'+b+'" onchange="story_script.'+block+'['+i+'].dialogs['+(n-1)+'].art['+b+'].align=[\'left\',\'bottom\'];art_panel_update(\''+block+'\','+i+','+n+');state_save();" '+((arr_s.art[b].align&&arr_s.art[b].align[0]=='left'&&arr_s.art[b].align[1]=='bottom')?'checked':'')+' style="transform:scaleX(-1);"></td>'
            +'<td><input class="icon icon_side align" type="radio" name="align_a'+b+'" onchange="story_script.'+block+'['+i+'].dialogs['+(n-1)+'].art['+b+'].align=[\'center\',\'bottom\'];art_panel_update(\''+block+'\','+i+','+n+');state_save();" '+((arr_s.art[b].align&&arr_s.art[b].align[0]=='center'&&arr_s.art[b].align[1]=='bottom')?'checked':'')+' style="transform:scaleY(-1);"></td>'
            +'<td><input class="icon icon_diag align" type="radio" name="align_a'+b+'" onchange="story_script.'+block+'['+i+'].dialogs['+(n-1)+'].art['+b+'].align=[\'right\',\'bottom\'];art_panel_update(\''+block+'\','+i+','+n+');state_save();" '+((arr_s.art[b].align&&arr_s.art[b].align[0]=='right'&&arr_s.art[b].align[1]=='bottom')?'checked':'')+' style="transform:scaleX(1);"></td>'
        +'</tr></tbody></table>'
        +'</td>'
    +'</tr><tr>'
        +'<td colspan="4" height="40px" align="left" style="padding-left:8px;border-bottom:1px solid var(--cb);">Position</td>'
    +'</tr><tr>'
        +'<td height="40px" align="right" style="padding-right:8px;">Top position</td>'
        +'<td colspan="3"><input class="input_text" onchange="story_script.'+block+'['+i+'].dialogs['+(n-1)+'].art['+b+'].position[2]=correct_value(this.value);art_panel_update(\''+block+'\','+i+','+n+');state_save();" type="text" style="width:100%;height:28px" value="'+arr_s.art[b].position[2]+'"></td>'
    +'</tr><tr>'
        +'<td height="40px" align="right" style="padding-right:8px;">Left position</td>'
        +'<td colspan="3"><input class="input_text" onchange="story_script.'+block+'['+i+'].dialogs['+(n-1)+'].art['+b+'].position[0]=correct_value(this.value);art_panel_update(\''+block+'\','+i+','+n+');state_save();" type="text" style="width:100%;height:28px" value="'+arr_s.art[b].position[0]+'"></td>'
    +'</tr><tr>'
        +'<td height="40px" align="right" style="padding-right:8px;">Bottom position</td>'
        +'<td colspan="3"><input class="input_text" onchange="story_script.'+block+'['+i+'].dialogs['+(n-1)+'].art['+b+'].position[3]=correct_value(this.value);art_panel_update(\''+block+'\','+i+','+n+');state_save();" type="text" style="width:100%;height:28px" value="'+arr_s.art[b].position[3]+'"></td>'
    +'</tr><tr>'
        +'<td height="40px" align="right" style="padding-right:8px;">Right position</td>'
        +'<td colspan="3"><input class="input_text" onchange="story_script.'+block+'['+i+'].dialogs['+(n-1)+'].art['+b+'].position[1]=correct_value(this.value);art_panel_update(\''+block+'\','+i+','+n+');state_save();" type="text" style="width:100%;height:28px" value="'+arr_s.art[b].position[1]+'"></td>'
    +'</tr><tr>'
        +'<td height="40px" align="right" style="padding-right:8px;">OffSet X</td>'
        +'<td colspan="3"><input class="input_text" onchange="story_script.'+block+'['+i+'].dialogs['+(n-1)+'].art['+b+'].hotspot[0]=((this.value.length>0)?correct_value(this.value):0);art_panel_update(\''+block+'\','+i+','+n+');state_save();" type="text" style="width:100%;height:28px" value="'+((arr_s.art[b].hotspot)?arr_s.art[b].hotspot[0]:0)+'"></td>'
    +'</tr><tr>'
        +'<td height="40px" align="right" style="padding-right:8px;">OffSet Y</td>'
        +'<td colspan="3"><input class="input_text" onchange="story_script.'+block+'['+i+'].dialogs['+(n-1)+'].art['+b+'].hotspot[1]=((this.value.length>0)?correct_value(this.value):0);art_panel_update(\''+block+'\','+i+','+n+');state_save();" type="text" style="width:100%;height:28px" value="'+((arr_s.art[b].hotspot)?arr_s.art[b].hotspot[1]:0)+'"></td>'
    +'</tr><tr>'
        +'<td height="40px" align="right" style="padding-right:8px;">Angle</td>'
        +'<td colspan="3"><input class="input_text" onchange="story_script.'+block+'['+i+'].dialogs['+(n-1)+'].art['+b+'].angle=correct_value(this.value,true);art_panel_update(\''+block+'\','+i+','+n+');state_save();" type="text" style="width:100%;height:28px" value="'+((arr_s.art[b].angle)?arr_s.art[b].angle:0)+'"></td>'
    +'</tr><tr>'
            +'<td colspan="4" height="40px" align="left" style="padding-left:8px;border-bottom:1px solid var(--cb);">Animation</td>'
    +'</tr><tr>'
        +'<td height="40px" align="right" style="padding-right:8px;">Time transform</td>'
        +'<td colspan="3"><input class="input_text" onchange="story_script.'+block+'['+i+'].dialogs['+(n-1)+'].art['+b+'].move=correct_value(this.value,true);art_panel_update(\''+block+'\','+i+','+n+');state_save();" type="text" style="width:100%;height:28px" value="'+((arr_s.art[b].move)?arr_s.art[b].move:0)+'"></td>'
    +'</tr><tr>'
        +'<td height="40px" align="right" style="padding-right:8px;">Speed transform</td>'
        +'<td colspan="3"><select onchange="story_script.'+block+'['+i+'].dialogs['+(n-1)+'].art['+b+'].speed=this.value;state_save();" style="width:100%;height:28px;"><option value="ease" '+((arr_s.art[b].speed=='ease')?'selected':'')+'>ease</option><option value="linear" '+((arr_s.art[b].speed=='linear')?'selected':'')+'>linear</option><option value="ease-in" '+((arr_s.art[b].speed=='ease-in')?'selected':'')+'>ease-in</option><option value="ease-out" '+((arr_s.art[b].speed=='ease-out')?'selected':'')+'>ease-out</option><option value="ease-in-out" '+((arr_s.art[b].speed=='ease-in-out')?'selected':'')+'>ease-in-out</option></select></td>'
    +'</tr><tr>'
        +'<td colspan="4" height="40px" align="left" style="padding-left:8px;border-bottom:1px solid var(--cb);">Style</td>'
    +'</tr><tr>'
        +'<td height="40px" align="right" style="padding-right:8px;">Opacity</td>'
        +'<td ><input id="opacity_t" class="input_text" onchange="opacity_r.value=correct_value(this.value,true);story_script.'+block+'['+i+'].dialogs['+(n-1)+'].art['+b+'].opacity=correct_value(this.value,true);art_panel_update(\''+block+'\','+i+','+n+');state_save();" type="text" style="width:100%;height:28px" value="'+((arr_s.art[b].opacity)?arr_s.art[b].opacity:1)+'"></td>'
        +'<td colspan="2" align="right" ><input id="opacity_r" class="input_slider" onchange="story_script.'+block+'['+i+'].dialogs['+(n-1)+'].art['+b+'].opacity=this.value;art_panel_update(\''+block+'\','+i+','+n+');state_save();" oninput="opacity_t.value=this.value;" type="range" value="'+((arr_s.art[b].opacity)?arr_s.art[b].opacity:1)+'" min="0" max="1" step="0.01" style="width:96%;background: var(--cb);"></td>'
    +'</tr><tr>'
        +'<td height="40px" align="right" style="width:40%;padding-right:8px;">Style CSS</td>'
        +'<td colspan="2"><input class="input_text" onchange="story_script.'+block+'['+i+'].dialogs['+(n-1)+'].art['+b+'].style=this.value;art_panel_update(\''+block+'\','+i+','+n+');state_save();" type="text" style="width:100%;height:28px;" value="'+((arr_s.art[b].style)?arr_s.art[b].style:'')+'"></td>'
        +'<td height="40px" align="right" style="width:30px;" class="icon icon_edit" onclick="copy_arr=story_script.'+block+'['+i+'].dialogs['+(n-1)+'].art['+b+'];edit_code(\'style\',\'Style CSS\');"></td>'
    +'</tr><tr>'
        +'<td height="40px" align="right" style="width:40%;padding-right:8px;">Class Name</td>'
        +'<td colspan="3"><input class="input_text" onchange="story_script.'+block+'['+i+'].dialogs['+(n-1)+'].art['+b+'].className=this.value;art_panel_update(\''+block+'\','+i+','+n+');state_save();" type="text" style="width:100%;height:28px" value="'+((arr_s.art[b].className)?arr_s.art[b].className:'')+'"></td>'
    +'</tr><tr>'
        +'<td colspan="4" height="40px" align="left" style="padding-left:8px;border-bottom:1px solid var(--cb);">Display conditions</td>'
    +'</tr><tr>'
        +'<td colspan="4">'+show_if+'</td>'
    +'</tr></tbody></table></div>'
    return html;
}
function choice_panel_update(block,i,n){
    droppFocus(document.getElementById('resizers'));
    choice_ec.innerHTML=""
    var arr_s=story_script[block][i].dialogs[n-1].choice
    var tue_choice=document.getElementsByClassName("tue_choice");
    while(tue_choice.length){scene_layout.removeChild(tue_choice[0]);}
    if(arr_s.length==0){delete story_script[block][i].dialogs[n-1].choice}
    else{for(var b=arr_s.length-1;b>=0;b--){
        if(!arr_s[b].text){arr_s[b].text=''}
        if(!arr_s[b].text[languare]){data_corr(arr_s[b],'text')}
        if(arr_s[b].url&&!arr_s[b].go_to[languare]){data_corr(arr_s[b],'go_to')}
        if(!arr_s[b].art){arr_s[b].art=''}
        if(!arr_s[b].art[languare]){data_corr(arr_s[b],'art')}
        if(arr_s[b].go_to=='tue_audio'||arr_s[b].go_to=='tue_fullScreen'||arr_s[b].go_to=='tue_speech'){
            if(!arr_s[b].text1){arr_s[b].text1=''}
            if(!arr_s[b].text1[languare]){data_corr(arr_s[b],'text1')}
            if(!arr_s[b].text2){arr_s[b].text2=''}
            if(!arr_s[b].text2[languare]){data_corr(arr_s[b],'text2')}
            if(!arr_s[b].art1){arr_s[b].art1=''}
            if(!arr_s[b].art1[languare]){data_corr(arr_s[b],'art1')}
            if(!arr_s[b].art2){arr_s[b].art2=''}
            if(!arr_s[b].art2[languare]){data_corr(arr_s[b],'art2')}
        }
        if(!arr_s[b].sound){arr_s[b].sound=''}
        if(!arr_s[b].sound[languare]){data_corr(arr_s[b],'sound')}
        var choice=document.createElement("div");
        choice.id='cho'+b
        choice.setAttribute('onclick','objSelect(this.id);arr_e=story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice['+b+']');
        if(arr_s[b].style&&arr_s[b].style.length>0){
            var s=arr_s[b].style;
            for(var f=0;f<project_files.length;f++){s=s.replaceAll(project_files[f][0],project_files[f][1]);};
            choice.style=s;
        }
        choice.classList.add("tue_choice");choice.classList.add("objSelect");
        choice.style.position="absolute";
        choice.style.transformOrigin="top left";
        choice.style.backgroundColor=arr_s[b].color;
        choice.style.backgroundRepeat="no-repeat";
        choice.style.backgroundPosition=((arr_s[b].art_align)?arr_s[b].art_align[0]+" "+arr_s[b].art_align[1]:"center");
        if(arr_s[b].size){
            if(arr_s[b].size[0]!=0){choice.style.width=arr_s[b].size[0];}
            if(arr_s[b].size[1]!=0){choice.style.height=arr_s[b].size[1];}
        }
        if(!arr_s[b].hotspot){arr_s[b].hotspot=['0%','0%']}
        choice.style.transform="translate("+arr_s[b].hotspot[0]+","+arr_s[b].hotspot[1]+")"+((arr_s[b].angle)?" rotate("+arr_s[b].angle+"deg)":"")
        if(arr_s[b].art){choice.style.backgroundImage="url('"+open_file((arr_s[b].art[languare])?arr_s[b].art[languare]:arr_s[b].art)+"')";}
        if(arr_s[b].art_size){
            if(arr_s[b].art_size=='patch'){choice.style.backgroundImage='none'}else if(arr_s[b].patch){delete arr_s[b].patch}
            if(typeof arr_s[b].art_size==='object'){choice.style.backgroundSize=arr_s[b].art_size[0]+" "+arr_s[b].art_size[1];}
            else if(arr_s[b].art_size=='patch'){
                if(!arr_s[b].patch){arr_s[b].patch=[8,8,8,8]};
                choice.style.backgroundImage="none";
                choice.style.backgroundSize="none";
                choice.style.backgroundClip="padding-box";
                choice.style.borderStyle="solid";
                choice.style.borderWidth=arr_s[b].patch[0]+"px "+arr_s[b].patch[1]+"px "+arr_s[b].patch[2]+"px "+arr_s[b].patch[3]+"px";
                choice.style.borderImage="url('"+open_file((arr_s[b].art[languare])?arr_s[b].art[languare]:arr_s[b].art)+"') "+arr_s[b].patch[0]+" "+arr_s[b].patch[1]+" "+arr_s[b].patch[2]+" "+arr_s[b].patch[3]+" stretch stretch";
            }else{choice.style.backgroundSize=arr_s[b].art_size;}
        }
        if(arr_s[b].position[0]!=0){choice.style.left=arr_s[b].position[0];}
        if(arr_s[b].position[1]!=0){choice.style.right=arr_s[b].position[1];}
        if(arr_s[b].position[2]!=0){choice.style.top=arr_s[b].position[2];}
        if(arr_s[b].position[3]!=0){choice.style.bottom=arr_s[b].position[3];}
        choice.style.color=arr_s[b].color_text;
        choice.style.fontSize=((arr_s[b].size_text)?arr_s[b].size_text:story_script.parameters.font_size);
        choice.style.fontFamily=((arr_s[b].font_family)?arr_s[b].font_family:story_script.parameters.font);
        choice.style.whiteSpace="pre-wrap";
        choice.style.zIndex=2001+b;
        choice.style.display="flex";
        choice.style.justifyContent=((arr_s[b].align)?arr_s[b].align[0]:"center");
        choice.style.alignItems=((arr_s[b].align)?arr_s[b].align[1]:"center");
        if(arr_s[b].text[languare]){
            choice.innerHTML=values_in_text(arr_s[b].text[languare]);
            choice.style.padding=arr_s[b].indent_text;
        }
        scene_layout.appendChild(choice);
        choice_ec.innerHTML+=choice_panel_edit(block,i,n,b);
    }}
}
function choice_panel_add(block,i,n){
    var arr_s=story_script[block][i].dialogs[n-1]
    if(!arr_s.choice){arr_s.choice=[]}
    var a=arr_s.choice.length
    if(a>0){
        arr_s.choice.unshift(JSON.parse(JSON.stringify(arr_s.choice[a-1])))
        arr_s.choice[0].position=["50%","0","50%","0"];
        arr_s.choice[0].go_to=story_script.parameters.launch_story;
        arr_s.choice[0].text="choice";
        arr_s.choice[0].indent_text="8px";
    }else{
        arr_s.choice.unshift({"go_to":story_script.parameters.launch_story,"position":["50%","0","50%","0"],"size":[0,(story_script.parameters.buttons[0]&&story_script.parameters.buttons[0].size)?story_script.parameters.buttons[0].size[1]:0],"color":story_script.parameters.text_panel.color,"color_text":story_script.parameters.text_panel.color_text,"text":"choice","indent_text":"12px"});
    }
    let b=arr_s.choice.length-1;
    choice_panel_update(block,i,n);
    state_save();
}
function choice_panel_edit(block,i,n,b){
    var arr_s=story_script[block][i].dialogs[n-1].choice
    var var_choice="<table id='var_table"+b+"' width='100%'><tbody><tr><td style='width:128px;' valign='bottom'></td><td style='width:48px;border-right:1px solid var(--cb);border-left:1px solid var(--cb);'></td><td></td><td style='width:30px;'></td></tr>"
    if(arr_s[b].variables){for(var c=0;c<arr_s[b].variables.length;c++){var_choice+="<tr><td valign='bottom'><select class='choice_var_name' onchange='story_script."+block+"["+i+"].dialogs["+(n-1)+"].choice["+b+"].variables["+c+"][0]=this.value'>"+option_var(arr_s[b].variables[c][0])+"</select></td><td style='border-right:1px solid var(--cb);border-left:1px solid var(--cb);'><select class='choice_var_operation' onchange='story_script."+block+"["+i+"].dialogs["+(n-1)+"].choice["+b+"].variables["+c+"][1]=this.value'><option value='add'>add</option><option value='set' "+((arr_s[b].variables[c][1]=="set")?"selected":"")+">set</option></select></td><td><input class='input_text choice_var_value' onchange='if(parseFloat(this.value)==this.value){story_script."+block+"["+i+"].dialogs["+(n-1)+"].choice["+b+"].variables["+c+"][2]=parseFloat(this.value)}else{story_script."+block+"["+i+"].dialogs["+(n-1)+"].choice["+b+"].variables["+c+"][2]=this.value}' value='"+ arr_s[b].variables[c][2] +"' type='text'></td><td onclick='story_script."+block+"["+i+"].dialogs["+(n-1)+"].choice["+b+"].variables.splice("+c+", 1);choice_panel_update(\""+block+"\","+i+","+n+");state_save();' style='cursor:pointer;' title='delet' class='icon icon_del'></td></tr>"};};
    var_choice+="</tbody></table>"+((story_script.parameters.variables&&Object.keys(story_script.parameters.variables).length>0)?"<div onclick=\"if(!story_script."+block+"["+i+"].dialogs["+(n-1)+"].choice["+b+"].variables){story_script."+block+"["+i+"].dialogs["+(n-1)+"].choice["+b+"].variables=[]};story_script."+block+"["+i+"].dialogs["+(n-1)+"].choice["+b+"].variables.push( ['"+Object.keys(story_script.parameters.variables)[0]+"','add',0] );choice_panel_update('"+block+"',"+i+","+n+");state_save();\" class='icon_m icon_add' style='margin-top:12px;height:26px;width:100%;cursor:pointer;'></div>":"<div onclick=\"setup();set_menu(4);\" class='icon_m icon_add' style='margin-top:12px;height:26px;width:100%;cursor:pointer;'></div>")
    var show_if="<table width='100%'><tbody><tr><td style='width:128px;' valign='bottom'></td><td style='width:48px;border-right:1px solid var(--cb);border-left:1px solid var(--cb);'></td><td></td><td style='width:30px;'></td></tr>"
    if(arr_s[b].show_if){
        show_if+="<tr><td colspan='4'><select class='choice_var_operation' onchange='story_script."+block+"["+i+"].dialogs["+(n-1)+"].choice["+b+"].show_if[0]=(this.selectedIndex==0)?true:false'><option>show if</option><option "+((arr_s[b].show_if[0])?"":"selected")+">hidden if</option></select></td></tr>"
        for(var c=1;c<arr_s[b].show_if.length;c++){show_if+="<tr><td valign='bottom'><select class='choice_var_name' onchange='story_script."+block+"["+i+"].dialogs["+(n-1)+"].choice["+b+"].show_if["+c+"][0]=this.value'>"+option_var(arr_s[b].show_if[c][0])+"</select></td><td style='border-right:1px solid var(--cb);border-left:1px solid var(--cb);'><select class='choice_var_operation' onchange='story_script."+block+"["+i+"].dialogs["+(n-1)+"].choice["+b+"].show_if["+c+"][1]=this.value'><option value='&#61'>&#61</option><option value='&lt;' "+((arr_s[b].show_if[c][1]=="<")?"selected":"")+">&lt;</option><option value='&gt;' "+((arr_s[b].show_if[c][1]==">")?"selected":"")+">&gt;</option></select></td><td><input class='input_text choice_var_value' onchange='if(parseFloat(this.value)==this.value){story_script."+block+"["+i+"].dialogs["+(n-1)+"].choice["+b+"].show_if["+c+"][2]=parseFloat(this.value)}else{story_script."+block+"["+i+"].dialogs["+(n-1)+"].choice["+b+"].show_if["+c+"][2]=this.value}' value='"+ arr_s[b].show_if[c][2] +"' type='text'></td><td onclick='story_script."+block+"["+i+"].dialogs["+(n-1)+"].choice["+b+"].show_if.splice("+c+", 1);if(story_script."+block+"["+i+"].dialogs["+(n-1)+"].choice["+b+"].show_if.length<=1){delete story_script."+block+"["+i+"].dialogs["+(n-1)+"].choice["+b+"].show_if;}choice_panel_update(\""+block+"\","+i+","+n+");state_save();' style='cursor:pointer;' title='delet' class='icon icon_del'></td></tr>"};
    };
    show_if+="</tbody></table>"+((story_script.parameters.variables&&Object.keys(story_script.parameters.variables).length>0)?"<div onclick=\"if(!story_script."+block+"["+i+"].dialogs["+(n-1)+"].choice["+b+"].show_if){story_script."+block+"["+i+"].dialogs["+(n-1)+"].choice["+b+"].show_if=[true]};story_script."+block+"["+i+"].dialogs["+(n-1)+"].choice["+b+"].show_if.push( ['"+Object.keys(story_script.parameters.variables)[0]+"','=',0] );choice_panel_update('"+block+"',"+i+","+n+");state_save();\" class='icon_m icon_add' style='margin-top:4px;padding-bottom:16px;height:26px;width:100%;cursor:pointer;'></div>":"<div onclick=\"setup();set_menu(4);\" class='icon_m icon_add' style='margin-top:4px;padding-bottom:16px;height:26px;width:100%;cursor:pointer;'></div>")
    var html='<div id="b_cho'+b+'" class="ui_buttons dialog" style="margin:8px;"><table style="width:100%;'+((story_script.blocks[arr_s[b].go_to]&&story_script.blocks[arr_s[b].go_to][3])?'border-radius:6px;background-color:'+story_script.blocks[arr_s[b].go_to][3]+';':'')+'" ondblclick="objSelect(\'cho'+b+'\');arr_e=story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice['+b+']"><tbody><tr>'
            +'<td width="24px" class="icon_m icon_up"   onclick="move_elenetn(story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice,'+b+',1);choice_panel_update(\''+block+'\','+i+','+n+');state_save();" height="22px"></td>'
            +'<td width="24px" class="icon_m icon_down" onclick="move_elenetn(story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice,'+b+',-1);choice_panel_update(\''+block+'\','+i+','+n+');state_save();"></td><td></td>'
            +'<td width="26px" class="icon_show icon_m" style="cursor:pointer;" onclick="panel_m(\'b_cho'+b+'\','+n+',\''+block+'\','+i+','+b+',\'choice\',\'choice_panel_update\')" ></td>'
    +'</tr><tr><td id="chdbn'+b+'" colspan="4" height="40px" align="center" style="background-image:url('+open_file((arr_s[b].art[languare])?arr_s[b].art[languare]:arr_s[b].art)+');background-position:center;background-repeat:no-repeat;background-size:contain;">'+((arr_s[b].text[languare])?arr_s[b].text[languare]:((arr_s[b].text.length>0)?arr_s[b].text:((arr_s[b].art[languare])?'':arr_s[b].go_to)))+'</td></tr><tr>'
    +'<td class="icon_m icon_more" height="22px" onclick="menu_element.style.visibility=\'hidden\';block_open(\'chosp'+b+'\');scen_element.chosp'+b+'=chosp'+b+'.style.display;"></td><td colspan="3"></td></tr></tbody></table>'
    +'<table id="chosp'+b+'" width="100%" style="display:'+((scen_element['chosp'+b])?scen_element['chosp'+b]:'none')+';border-top:1px solid var(--cb);margin-top:8px;"><tbody><tr>'
        +'<td height="40px" align="right" style="padding-right:8px;"><select style="height:28px;width:100%;border-bottom:1px solid var(--cb);" onchange="if(this.selectedIndex==2){story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice['+b+'].go_to=[story_script.parameters.launch_story,0,0]}else if((this.selectedIndex==1||this.selectedIndex==0)&&typeof story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice['+b+'].go_to===\'object\'){story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice['+b+'].go_to=story_script.parameters.launch_story} if(this.selectedIndex==1){story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice['+b+'].text_from=true;}else{delete story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice['+b+'].text_from;} if(this.selectedIndex==3){story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice['+b+'].url=\'self\';}else{delete story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice['+b+'].url;};choice_panel_update(\''+block+'\','+i+','+n+');state_save();"><option '+((!arr_s[b].text_from)?'selected':'')+'>Go to</option><option '+((arr_s[b].text_from&&typeof arr_s[b].go_to!='object')?'selected':'')+'>Only text from</option><option '+((typeof arr_s[b].go_to==='object')?'selected':'')+'>Timeline</option><option '+((arr_s[b].url)?'selected':'')+'>Link</option> </select></td>'
        +((!arr_s[b].url&&typeof arr_s[b].go_to==='object')?'<td id="tl_show'+b+'" colspan="3" align="center" onclick="timeline_edit(story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice['+b+'],this.id)">'+arr_s[b].go_to[0]+' / '+arr_s[b].go_to[1]+' / '+arr_s[b].go_to[2]+'</td>':((arr_s[b].url)?'<td style="width:28px;" align="center"><select id="urll'+b+'" onchange="urlt'+b+'.value=((story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice['+b+'].go_to[this.value].length>0)?story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice['+b+'].go_to[this.value]:\'\')" style="height:28px;width:100%;border-left:1px solid var(--cb);border-right:1px solid var(--cb);border-bottom:1px solid var(--cb);">'+project_languares(languare)+'</select></td><td colspan="2"><input id="urlt'+b+'" class="input_text" onchange="story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice['+b+'].go_to[urll'+b+'.value]=this.value;" type="text" style="width:100%;height:28px" value="'+((arr_s[b].go_to[languare])?arr_s[b].go_to[languare]:'')+'"></td>':'<td colspan="3"><select onchange="story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice['+b+'].go_to=this.value;choice_panel_update(\''+block+'\','+i+','+n+');state_save();" style="width:100%;height:28px;">'+option_block(arr_s[b].go_to,2)+'</select></td>'))
    +((arr_s[b].text_from)?'</tr><tr id><td height="40px" align="right" style="padding-right:8px;">Delete</td><td colspan="3"><select oninput="if(this.selectedIndex==0){delete story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice['+b+'].delete}else{story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice['+b+'].delete=this.value};choice_panel_update(\''+block+'\','+i+','+n+');state_save();"><option value=false>no</option><option '+((arr_s[b].delete)?'selected':'')+' value=true>after click</option></select></td>':'')
    +((arr_s[b].url)?'</tr><tr id><td height="40px" align="right" style="padding-right:8px;">Open link</td><td colspan="3"><select oninput="story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice['+b+'].url=this.value;state_save();"><option value="self">This tab</option><option '+((arr_s[b].url=='blank')?'selected':'')+' value="blank">New tab</option></select></td>':'')
    +'</tr><tr>'
        +'<td height="40px" align="right" style="width:40%;padding-right:8px;">Text</td>'
        +'<td style="width:28px;" align="center"><select id="cts'+b+'" onchange="ctм'+b+'.value=((story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice['+b+'].text[this.value].length>0)?story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice['+b+'].text[this.value]:\'\')" style="height:28px;width:100%;border-left:1px solid var(--cb);border-right:1px solid var(--cb);border-bottom:1px solid var(--cb);">'+project_languares(languare)+'</select></td>'
        +'<td colspan="2"><input id="ctм'+b+'" class="input_text" onchange="story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice['+b+'].text[cts'+b+'.value]=this.value;choice_panel_update(\''+block+'\','+i+','+n+');state_save();" type="text" style="width:100%;height:28px" value="'+((arr_s[b].text[languare])?arr_s[b].text[languare]:'')+'"></td>'
    +((arr_s[b].go_to=='tue_fullScreen')?'</tr><tr>'
        +'<td height="40px" align="right" style="width:40%;padding-right:8px;">Text fullscreen</td>'
        +'<td style="width:28px;" align="center"><select id="ctsm'+b+'" onchange="ctмm'+b+'.value=((story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice['+b+'].text1[this.value].length>0)?story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice['+b+'].text1[this.value]:\'\')" style="height:28px;width:100%;border-left:1px solid var(--cb);border-right:1px solid var(--cb);border-bottom:1px solid var(--cb);">'+project_languares(languare)+'</select></td>'
        +'<td colspan="2"><input id="ctмm'+b+'" class="input_text" onchange="story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice['+b+'].text1[ctsm'+b+'.value]=this.value;choice_panel_update(\''+block+'\','+i+','+n+');state_save();" type="text" style="width:100%;height:28px" value="'+((arr_s[b].text1[languare])?arr_s[b].text1[languare]:'')+'"></td>':"")
    +((arr_s[b].go_to=='tue_audio')?'</tr><tr>'
        +'<td height="40px" align="right" style="width:40%;padding-right:8px;">Text off music</td>'
        +'<td style="width:28px;" align="center"><select id="ctsm'+b+'" onchange="ctмm'+b+'.value=((story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice['+b+'].text1[this.value].length>0)?story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice['+b+'].text1[this.value]:\'\')" style="height:28px;width:100%;border-left:1px solid var(--cb);border-right:1px solid var(--cb);border-bottom:1px solid var(--cb);">'+project_languares(languare)+'</select></td>'
        +'<td colspan="2"><input id="ctмm'+b+'" class="input_text" onchange="story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice['+b+'].text1[ctsm'+b+'.value]=this.value;choice_panel_update(\''+block+'\','+i+','+n+');state_save();" type="text" style="width:100%;height:28px" value="'+((arr_s[b].text1[languare])?arr_s[b].text1[languare]:'')+'"></td>'
    +'</tr><tr>'
        +'<td height="40px" align="right" style="width:40%;padding-right:8px;">Text off sound</td>'
        +'<td style="width:28px;" align="center"><select id="ctsa'+b+'" onchange="ctмa'+b+'.value=((story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice['+b+'].text2[this.value].length>0)?story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice['+b+'].text2[this.value]:\'\')" style="height:28px;width:100%;border-left:1px solid var(--cb);border-right:1px solid var(--cb);border-bottom:1px solid var(--cb);">'+project_languares(languare)+'</select></td>'
        +'<td colspan="2"><input id="ctмa'+b+'" class="input_text" onchange="story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice['+b+'].text2[ctsa'+b+'.value]=this.value;choice_panel_update(\''+block+'\','+i+','+n+');state_save();" type="text" style="width:100%;height:28px" value="'+((arr_s[b].text2[languare])?arr_s[b].text2[languare]:'')+'"></td>':"")
    +((arr_s[b].go_to=='tue_speech')?'</tr><tr>'
        +'<td height="40px" align="right" style="width:40%;padding-right:8px;">Speech text</td>'
        +'<td style="width:28px;" align="center"><select id="ctsm'+b+'" onchange="ctvv'+b+'.value=((story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice['+b+'].text1[this.value].length>0)?story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice['+b+'].text1[this.value]:\'\')" style="height:28px;width:100%;border-left:1px solid var(--cb);border-right:1px solid var(--cb);border-bottom:1px solid var(--cb);">'+project_languares(languare)+'</select></td>'
        +'<td colspan="2"><input id="ctvv'+b+'" class="input_text" onchange="story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice['+b+'].text1[ctsm'+b+'.value]=this.value;choice_panel_update(\''+block+'\','+i+','+n+');state_save();" type="text" style="width:100%;height:28px" value="'+((arr_s[b].text1[languare])?arr_s[b].text1[languare]:'')+'"></td>'
    +'</tr><tr>'
        +'<td height="40px" align="right" style="width:40%;padding-right:8px;">Speech voice</td>'
        +'<td style="width:28px;" align="center"><select id="ctsa'+b+'" onchange="ctvt'+b+'.value=((story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice['+b+'].text2[this.value].length>0)?story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice['+b+'].text2[this.value]:\'\')" style="height:28px;width:100%;border-left:1px solid var(--cb);border-right:1px solid var(--cb);border-bottom:1px solid var(--cb);">'+project_languares(languare)+'</select></td>'
        +'<td><input id="ctvt'+b+'" class="input_text" onchange="story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice['+b+'].text2[ctsa'+b+'.value]=this.value;choice_panel_update(\''+block+'\','+i+','+n+');state_save();" type="text" style="width:100%;height:28px" value="'+((arr_s[b].text2[languare])?arr_s[b].text2[languare]:'')+'"></td>'
        +'<td height="40px" align="right" style="width:30px;" class="icon icon_edit" onclick="let l=document.getElementById(\'ctsa'+b+'\').value;voicesSynthesis(l,\'ctvt'+b+'\',\'story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice['+b+'].text2[ctsa'+b+'.value]\',((\'ctvv'+b+'.value.length>0\')?ctvv'+b+'.value:\'hello\'))    "></td>':"")
    +'</tr><tr>'
        +'<td height="40px" align="right" style="padding-right:8px;">Indent text</td>'
        +'<td colspan="3"><input class="input_text" onchange="story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice['+b+'].indent_text=correct_value(this.value);choice_panel_update(\''+block+'\','+i+','+n+');state_save();" type="text" style="width:100%;height:28px" value="'+((arr_s[b].indent_text)?arr_s[b].indent_text:'')+'"></td>'
    +'</tr><tr>'
        +'<td height="40px" align="right" style="padding-right:8px;">Width size</td>'
        +'<td colspan="3"><input class="input_text" onchange="story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice['+b+'].size[0]=correct_value(this.value);choice_panel_update(\''+block+'\','+i+','+n+');state_save();" type="text" style="width:100%;height:28px" value="'+((arr_s[b].size)?arr_s[b].size[0]:'')+'"></td>'
    +'</tr><tr>'
        +'<td height="40px" align="right" style="padding-right:8px;">Height size</td>'
        +'<td colspan="3"><input class="input_text" onchange="story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice['+b+'].size[1]=correct_value(this.value);choice_panel_update(\''+block+'\','+i+','+n+');state_save();" type="text" style="width:100%;height:28px" value="'+((arr_s[b].size)?arr_s[b].size[1]:'')+'"></td>'
    +'</tr><tr>'
        +'<td height="40px" align="right" style="padding-right:8px;">Sound</td>'
        +'<td style="width:28px;" align="center"><select id="csl'+b+'" onchange="cst'+b+'.value=story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice['+b+'].sound[this.value]" style="height:28px;width:100%;border-left:1px solid var(--cb);border-right:1px solid var(--cb);border-bottom:1px solid var(--cb);">'+project_languares(languare)+'</select></td>'
        +'<td><input id="cst'+b+'" class="input_text" onchange="story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice['+b+'].sound[csl'+b+'.value]=this.value;choice_panel_update(\''+block+'\','+i+','+n+');state_save();" type="text" style="width:100%;height:28px" value="'+((arr_s[b].sound[languare]&&arr_s[b].sound[languare].length>0)?arr_s[b].sound[languare]:'')+'"></td>'
        +'<td height="40px" align="right" style="width:30px;" class="icon icon_load" onclick="file_catalog(\'cst'+b+'\',\'audio\',\'cst'+b+'\',\'update\',\'story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice['+b+'].sound[csl'+b+'.value]\');"></td>'
    +'</tr><tr>'
        +'<td height="40px" align="right" style="padding-right:8px;">JavaScript</td>'
        +'<td colspan="2"><input id="cjs'+b+'" class="input_text" onchange="story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice['+b+'].js=this.value;choice_panel_update(\''+block+'\','+i+','+n+');state_save();" type="text" style="width:100%;height:28px" value="'+((arr_s[b].js)?arr_s[b].js:'')+'"></td>'
        +'<td height="40px" align="right" style="width:30px;" class="icon icon_edit" onclick="copy_arr=story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice['+b+'];edit_code(\'js\',\'JavaScript\');"></td>'
    +'</tr><tr>'
        +'<td colspan="4" height="40px" align="left" style="padding-left:8px;border-bottom:1px solid var(--cb);">Position</td>'
    +'</tr><tr>'
        +'<td height="40px" align="right" style="padding-right:8px;">Top position</td>'
        +'<td colspan="3"><input class="input_text" onchange="story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice['+b+'].position[2]=correct_value(this.value);choice_panel_update(\''+block+'\','+i+','+n+');state_save();" type="text" style="width:100%;height:28px" value="'+((arr_s[b].position)?arr_s[b].position[2]:'')+'"></td>'
    +'</tr><tr>'
        +'<td height="40px" align="right" style="padding-right:8px;">Left position</td>'
        +'<td colspan="3"><input class="input_text" onchange="story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice['+b+'].position[0]=correct_value(this.value);choice_panel_update(\''+block+'\','+i+','+n+');state_save();" type="text" style="width:100%;height:28px" value="'+((arr_s[b].position)?arr_s[b].position[0]:'')+'"></td>'
    +'</tr><tr>'
        +'<td height="40px" align="right" style="padding-right:8px;">Bottom position</td>'
        +'<td colspan="3"><input class="input_text" onchange="story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice['+b+'].position[3]=correct_value(this.value);choice_panel_update(\''+block+'\','+i+','+n+');state_save();" type="text" style="width:100%;height:28px" value="'+((arr_s[b].position)?arr_s[b].position[3]:'')+'"></td>'
    +'</tr><tr>'
        +'<td height="40px" align="right" style="padding-right:8px;">Right position</td>'
        +'<td colspan="3"><input class="input_text" onchange="story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice['+b+'].position[1]=correct_value(this.value);choice_panel_update(\''+block+'\','+i+','+n+');state_save();" type="text" style="width:100%;height:28px" value="'+((arr_s[b].position)?arr_s[b].position[1]:'')+'"></td>'
    +'</tr><tr>'
        +'<td height="40px" align="right" style="padding-right:8px;">OffSet X</td>'
        +'<td colspan="3"><input class="input_text" onchange="story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice['+b+'].hotspot[0]=((this.value.length>0)?correct_value(this.value):0);choice_panel_update(\''+block+'\','+i+','+n+');state_save();" type="text" style="width:100%;height:28px" value="'+((arr_s[b].hotspot)?arr_s[b].hotspot[0]:'')+'"></td>'
    +'</tr><tr>'
        +'<td height="40px" align="right" style="padding-right:8px;">OffSet Y</td>'
        +'<td colspan="3"><input class="input_text" onchange="story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice['+b+'].hotspot[1]=((this.value.length>0)?correct_value(this.value):0);choice_panel_update(\''+block+'\','+i+','+n+');state_save();" type="text" style="width:100%;height:28px" value="'+((arr_s[b].hotspot)?arr_s[b].hotspot[1]:'')+'"></td>'
    +'</tr><tr>'
        +'<td height="40px" align="right" style="padding-right:8px;">Angle</td>'
        +'<td colspan="3"><input class="input_text" onchange="story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice['+b+'].angle=correct_value(this.value,true);choice_panel_update(\''+block+'\','+i+','+n+');state_save();" type="text" style="width:100%;height:28px" value="'+((arr_s[b].angle)?arr_s[b].angle:0)+'"></td>'
    +'</tr><tr>'
        +'<td colspan="4" height="40px" align="left" style="padding-left:8px;border-bottom:1px solid var(--cb);">Text</td>'
    +'</tr><tr>'
        +'<td height="40px" align="right" style="padding-right:8px;">Color text</td>'
        +'<td style="width:28px;" align="center"><div class="show_color" style="background-color:'+arr_s[b].color_text+';"></div></td>'
        +'<td style="padding-right:8px;"><input class="input_text" onchange="story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice['+b+'].color_text=this.value;choice_panel_update(\''+block+'\','+i+','+n+');state_save();" type="text" style="width:100%;height:28px" value="'+((arr_s[b].color_text)?arr_s[b].color_text:'')+'"></td>'
        +'<td height="40px" align="right" style="width:30px;" class="icon icon_color" onclick="arr_l=story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice['+b+'];arr_n=[\'color_text\',\''+block+'\','+i+','+n+'];edit_color(\'choice\',\''+arr_s[b].color_text+'\');"></td>'
    +'</tr><tr>'
        +'<td height="40px" align="right" style="padding-right:8px;">Font size</td>'
        +'<td colspan="3"><input class="input_text" onchange="story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice['+b+'].size_text=correct_value(this.value);choice_panel_update(\''+block+'\','+i+','+n+');state_save();" type="text" style="width:100%;height:28px" value="'+((arr_s[b].size_text)?arr_s[b].size_text:'')+'"></td>'
    +'</tr><tr>'
        +'<td height="40px" align="right" style="padding-right:8px;">Font family</td>'
        +'<td colspan="3"><input class="input_text" onchange="story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice['+b+'].font_family=correct_value(this.value);choice_panel_update(\''+block+'\','+i+','+n+');state_save();" type="text" style="width:100%;height:28px" value="'+((arr_s[b].font_family)?arr_s[b].font_family:'')+'"></td>'
    +'</tr><tr>'
        +'<td height="40px" align="right" style="padding-right:8px;">Align text</td>'
        +'<td colspan="3" align="center">'
        +'<table style="background-color:var(--cw);border-radius:4px;"><tbody><tr>'
            +'<td><input class="icon icon_diag align" type="radio" name="align_c'+b+'" onchange="story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice['+b+'].align=[\'start\',\'start\'];choice_panel_update(\''+block+'\','+i+','+n+');state_save();" '+((arr_s[b].align&&arr_s[b].align[0]=='start'&&arr_s[b].align[1]=='start')?'checked':'')+' style="transform:scaleX(-1) scaleY(-1);"></td>'
            +'<td><input class="icon icon_side align" type="radio" name="align_c'+b+'" onchange="story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice['+b+'].align=[\'center\',\'start\'];choice_panel_update(\''+block+'\','+i+','+n+');state_save();" '+((arr_s[b].align&&arr_s[b].align[0]=='center'&&arr_s[b].align[1]=='start')?'checked':'')+'></td>'
            +'<td><input class="icon icon_diag align" type="radio" name="align_c'+b+'" onchange="story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice['+b+'].align=[\'end\',\'start\'];choice_panel_update(\''+block+'\','+i+','+n+');state_save();" '+((arr_s[b].align&&arr_s[b].align[0]=='end'&&arr_s[b].align[1]=='start')?'checked':'')+' style="transform:scaleY(-1);"></td>'
        +'</tr><tr>'
            +'<td><input class="icon icon_side align" type="radio" name="align_c'+b+'" onchange="story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice['+b+'].align=[\'start\',\'center\'];choice_panel_update(\''+block+'\','+i+','+n+');state_save();" '+((arr_s[b].align&&arr_s[b].align[0]=='start'&&arr_s[b].align[1]=='center')?'checked':'')+' style="transform:rotate(270deg);"></td>'
            +'<td><input class="icon icon_cent align" type="radio" name="align_c'+b+'" onchange="delete story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice['+b+'].align;choice_panel_update(\''+block+'\','+i+','+n+');state_save();" '+((!arr_s[b].align)?'checked':'')+'></td>'
            +'<td><input class="icon icon_side align" type="radio" name="align_c'+b+'" onchange="story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice['+b+'].align=[\'end\',\'center\'];choice_panel_update(\''+block+'\','+i+','+n+');state_save();" '+((arr_s[b].align&&arr_s[b].align[0]=='end'&&arr_s[b].align[1]=='center')?'checked':'')+' style="transform:rotate(90deg);"></td>'
        +'</tr><tr>'
            +'<td><input class="icon icon_diag align" type="radio" name="align_c'+b+'" onchange="story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice['+b+'].align=[\'start\',\'end\'];choice_panel_update(\''+block+'\','+i+','+n+');state_save();" '+((arr_s[b].align&&arr_s[b].align[0]=='start'&&arr_s[b].align[1]=='end')?'checked':'')+' style="transform:scaleX(-1);"></td>'
            +'<td><input class="icon icon_side align" type="radio" name="align_c'+b+'" onchange="story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice['+b+'].align=[\'center\',\'end\'];choice_panel_update(\''+block+'\','+i+','+n+');state_save();" '+((arr_s[b].align&&arr_s[b].align[0]=='center'&&arr_s[b].align[1]=='end')?'checked':'')+' style="transform:scaleY(-1);"></td>'
            +'<td><input class="icon icon_diag align" type="radio" name="align_c'+b+'" onchange="story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice['+b+'].align=[\'end\',\'end\'];choice_panel_update(\''+block+'\','+i+','+n+');state_save();" '+((arr_s[b].align&&arr_s[b].align[0]=='end'&&arr_s[b].align[1]=='end')?'checked':'')+' style="transform:scaleX(1);"></td>'
        +'</tr></tbody></table>'
        +'</td>'
    +'</tr><tr>'
        +'<td colspan="4" height="40px" align="left" style="padding-left:8px;border-bottom:1px solid var(--cb);">Style</td>'
    +'</tr><tr>'
        +'<td height="40px" align="right" style="padding-right:8px;">Style CSS</td>'
        +'<td colspan="2"><input class="input_text"  onchange="story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice['+b+'].style=this.value;choice_panel_update(\''+block+'\','+i+','+n+');state_save();" type="text" style="width:100%;height:28px" value="'+((arr_s[b].style)?arr_s[b].style:'')+'"></td>'
        +'<td height="40px" align="right" style="width:30px;" class="icon icon_edit" onclick="copy_arr=story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice['+b+'];edit_code(\'style\',\'Style CSS\');"></td>'
    +'</tr><tr>'
        +'<td height="40px" align="right" style="padding-right:8px;">Class Name</td>'
        +'<td colspan="3"><input class="input_text" onchange="story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice['+b+'].className=this.value;state_save();" type="text" style="width:100%;height:28px" value="'+((arr_s[b].className)?arr_s[b].className:'')+'"></td>'
    +'</tr><tr>'
        +'<td height="40px" align="right" style="padding-right:8px;">Color</td>'
        +'<td style="width:28px;" align="center"><div class="show_color" style="background-color:'+arr_s[b].color+';"></div></td>'
        +'<td style="padding-right:8px;"><input class="input_text" onchange="story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice['+b+'].color=this.value;choice_panel_update(\''+block+'\','+i+','+n+');state_save();" type="text" style="width:100%;height:28px" value="'+((arr_s[b].color)?arr_s[b].color:'')+'"></td>'
        +'<td height="40px" align="right" style="width:30px;" class="icon icon_color" onclick="arr_l=story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice['+b+'];arr_n=[\'color\',\''+block+'\','+i+','+n+'];edit_color(\'choice\',\''+arr_s[b].color+'\');"></td>'
    +'</tr><tr>'
        +'<td colspan="4" height="40px" align="left" style="padding-left:8px;border-bottom:1px solid var(--cb);">Art</td>'
    +'</tr><tr>'
        +'<td height="40px" align="right" style="padding-right:8px;">Art</td>'
        +'<td style="width:28px;" align="center"><select id="cas'+b+'" onchange="ctt'+b+'.value=story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice['+b+'].art[this.value];" style="height:28px;width:100%;border-left:1px solid var(--cb);border-right:1px solid var(--cb);border-bottom:1px solid var(--cb);">'+project_languares(languare)+'</select></td>'
        +'<td><input id="ctt'+b+'" class="input_text" onchange="var v=document.getElementById(\'cas'+b+'\');story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice['+b+'].art[v.value]=this.value;choice_panel_update(\''+block+'\','+i+','+n+');state_save();" type="text" style="width:100%;height:28px" value="'+((arr_s[b].art[languare]&&arr_s[b].art[languare].length>0)?arr_s[b].art[languare]:'')+'"></td>'
        +'<td height="40px" align="right" style="width:30px;" class="icon icon_load" onclick="file_catalog(\'ctt'+b+'\',\'img\',\'ctt'+b+'\',\'cho'+b+'\',\'story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice['+b+'].art[cas'+b+'.value]\');"></td>'
    +((arr_s[b].go_to=='tue_fullScreen')?'</tr><tr>'
        +'<td height="40px" align="right" style="padding-right:8px;">Art fullscreen</td>'
        +'<td style="width:28px;" align="center"><select id="casm'+b+'" onchange="cttm'+b+'.value=story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice['+b+'].art1[this.value];" style="height:28px;width:100%;border-left:1px solid var(--cb);border-right:1px solid var(--cb);border-bottom:1px solid var(--cb);">'+project_languares(languare)+'</select></td>'
        +'<td><input id="cttm'+b+'" class="input_text" onchange="var v=document.getElementById(\'casm'+b+'\');story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice['+b+'].art1[v.value]=this.value;choice_panel_update(\''+block+'\','+i+','+n+');state_save();" type="text" style="width:100%;height:28px" value="'+((arr_s[b].art1[languare]&&arr_s[b].art1[languare].length>0)?arr_s[b].art1[languare]:'')+'"></td>'
        +'<td height="40px" align="right" style="width:30px;" class="icon icon_load" onclick="file_catalog(\'cttm'+b+'\',\'img\',\'cttm'+b+'\',\'cho'+b+'\',\'story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice['+b+'].art1[casm'+b+'.value]\');"></td>':"")
    +((arr_s[b].go_to=='tue_audio')?'</tr><tr>'
        +'<td height="40px" align="right" style="padding-right:8px;">Art off music</td>'
        +'<td style="width:28px;" align="center"><select id="casm'+b+'" onchange="cttm'+b+'.value=story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice['+b+'].art1[this.value];" style="height:28px;width:100%;border-left:1px solid var(--cb);border-right:1px solid var(--cb);border-bottom:1px solid var(--cb);">'+project_languares(languare)+'</select></td>'
        +'<td><input id="cttm'+b+'" class="input_text" onchange="var v=document.getElementById(\'casm'+b+'\');story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice['+b+'].art1[v.value]=this.value;choice_panel_update(\''+block+'\','+i+','+n+');state_save();" type="text" style="width:100%;height:28px" value="'+((arr_s[b].art1[languare]&&arr_s[b].art1[languare].length>0)?arr_s[b].art1[languare]:'')+'"></td>'
        +'<td height="40px" align="right" style="width:30px;" class="icon icon_load" onclick="file_catalog(\'cttm'+b+'\',\'img\',\'cttm'+b+'\',\'cho'+b+'\',\'story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice['+b+'].art1[casm'+b+'.value]\');"></td>'
    +'</tr><tr>'
        +'<td height="40px" align="right" style="padding-right:8px;">Art off sound</td>'
        +'<td style="width:28px;" align="center"><select id="casa'+b+'" onchange="ctta'+b+'.value=story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice['+b+'].art2[this.value];" style="height:28px;width:100%;border-left:1px solid var(--cb);border-right:1px solid var(--cb);border-bottom:1px solid var(--cb);">'+project_languares(languare)+'</select></td>'
        +'<td><input id="ctta'+b+'" class="input_text" onchange="var v=document.getElementById(\'casa'+b+'\');story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice['+b+'].art2[v.value]=this.value;choice_panel_update(\''+block+'\','+i+','+n+');state_save();" type="text" style="width:100%;height:28px" value="'+((arr_s[b].art2[languare]&&arr_s[b].art2[languare].length>0)?arr_s[b].art2[languare]:'')+'"></td>'
        +'<td height="40px" align="right" style="width:30px;" class="icon icon_load" onclick="file_catalog(\'ctta'+b+'\',\'img\',\'ctta'+b+'\',\'cho'+b+'\',\'story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice['+b+'].art2[casa'+b+'.value]\');"></td>':"")
    +'</tr><tr>'
        +'<td height="40px" align="right" style="padding-right:8px;">Size</td>'
        +'<td colspan="3"><select oninput="story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice['+b+'].art_size=this.value;choice_panel_update(\''+block+'\','+i+','+n+');state_save();">'
            +'<option value="">original</option>'
            +'<option '+((arr_s[b].art_size=='cover')?'selected':'')+' value="cover">cover</option>'
            +'<option '+((arr_s[b].art_size=='contain')?'selected':'')+' value="contain">contain</option>'
            +'<option '+((arr_s[b].art_size=='100% 100%')?'selected':'')+' value="100% 100%">fill</option>'
            +'<option '+((arr_s[b].art_size=='patch')?'selected':'')+' value="patch">9-patch</option>'
        +'</select></td>'
    if(!arr_s[b].art_size||arr_s[b].art_size==''||(arr_s[b].art_size!='patch'&&arr_s[b].art_size!='100% 100%')){
        if(arr_s[b].art_size==''){delete arr_s[b].art_size};
        if(arr_s[b].art_size!='cover'&&arr_s[b].art_size!='contain'){html+='</tr><tr>'
                +'<td height="40px" align="right" style="padding-right:8px;">Width art</td>'
                +'<td colspan="3"><input class="input_text" onchange="if(!story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice['+b+'].art_size){story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice['+b+'].art_size=[correct_value(this.value),\'auto\']};story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice['+b+'].art_size[0]=correct_value(this.value);choice_panel_update(\''+block+'\','+i+','+n+');state_save();" type="text" style="width:100%;height:28px" value="'+((arr_s[b].art_size)?arr_s[b].art_size[0]:'')+'"></td>'
            +'</tr><tr>'
                +'<td height="40px" align="right" style="padding-right:8px;">Height art</td>'
                +'<td colspan="3"><input class="input_text" onchange="if(!story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice['+b+'].art_size){story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice['+b+'].art_size=[\'auto\',correct_value(this.value)]};story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice['+b+'].art_size[1]=correct_value(this.value);choice_panel_update(\''+block+'\','+i+','+n+');state_save();" type="text" style="width:100%;height:28px" value="'+((arr_s[b].art_size)?arr_s[b].art_size[1]:'')+'"></td>'
        }
        html+='</tr><tr>'
            +'<td height="40px" align="right" style="padding-right:8px;">Align art</td>'
            +'<td colspan="3" align="center">'
            +'<table style="background-color:var(--cw);border-radius:4px;"><tbody><tr>'
                +'<td><input class="icon icon_diag align" type="radio" name="art_c'+b+'" onchange="story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice['+b+'].art_align=[\'left\',\'top\'];choice_panel_update(\''+block+'\','+i+','+n+');state_save();" '+((arr_s[b].art_align&&arr_s[b].art_align[0]=='left'&&arr_s[b].art_align[1]=='top')?'checked':'')+' style="transform:scaleX(-1) scaleY(-1);"></td>'
                +'<td><input class="icon icon_side align" type="radio" name="art_c'+b+'" onchange="story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice['+b+'].art_align=[\'center\',\'top\'];choice_panel_update(\''+block+'\','+i+','+n+');state_save();" '+((arr_s[b].art_align&&arr_s[b].art_align[0]=='center'&&arr_s[b].art_align[1]=='top')?'checked':'')+'></td>'
                +'<td><input class="icon icon_diag align" type="radio" name="art_c'+b+'" onchange="story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice['+b+'].art_align=[\'right\',\'top\'];choice_panel_update(\''+block+'\','+i+','+n+');state_save();" '+((arr_s[b].art_align&&arr_s[b].art_align[0]=='right'&&arr_s[b].art_align[1]=='top')?'checked':'')+' style="transform:scaleY(-1);"></td>'
            +'</tr><tr>'
                +'<td><input class="icon icon_side align" type="radio" name="art_c'+b+'" onchange="story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice['+b+'].art_align=[\'left\',\'center\'];choice_panel_update(\''+block+'\','+i+','+n+');state_save();" '+((arr_s[b].art_align&&arr_s[b].art_align[0]=='left'&&arr_s[b].art_align[1]=='center')?'checked':'')+' style="transform:rotate(270deg);"></td>'
                +'<td><input class="icon icon_cent align" type="radio" name="art_c'+b+'" onchange="delete story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice['+b+'].art_align;choice_panel_update(\''+block+'\','+i+','+n+');state_save();" '+((!arr_s[b].art_align)?'checked':'')+'></td>'
                +'<td><input class="icon icon_side align" type="radio" name="art_c'+b+'" onchange="story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice['+b+'].art_align=[\'right\',\'center\'];choice_panel_update(\''+block+'\','+i+','+n+');state_save();" '+((arr_s[b].art_align&&arr_s[b].art_align[0]=='right'&&arr_s[b].art_align[1]=='center')?'checked':'')+' style="transform:rotate(90deg);"></td>'
            +'</tr><tr>'
                +'<td><input class="icon icon_diag align" type="radio" name="art_c'+b+'" onchange="story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice['+b+'].art_align=[\'left\',\'bottom\'];choice_panel_update(\''+block+'\','+i+','+n+');state_save();" '+((arr_s[b].art_align&&arr_s[b].art_align[0]=='left'&&arr_s[b].art_align[1]=='bottom')?'checked':'')+' style="transform:scaleX(-1);"></td>'
                +'<td><input class="icon icon_side align" type="radio" name="art_c'+b+'" onchange="story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice['+b+'].art_align=[\'center\',\'bottom\'];choice_panel_update(\''+block+'\','+i+','+n+');state_save();" '+((arr_s[b].art_align&&arr_s[b].art_align[0]=='center'&&arr_s[b].art_align[1]=='bottom')?'checked':'')+' style="transform:scaleY(-1);"></td>'
                +'<td><input class="icon icon_diag align" type="radio" name="art_c'+b+'" onchange="story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice['+b+'].art_align=[\'right\',\'bottom\'];choice_panel_update(\''+block+'\','+i+','+n+');state_save();" '+((arr_s[b].art_align&&arr_s[b].art_align[0]=='right'&&arr_s[b].art_align[1]=='bottom')?'checked':'')+' style="transform:scaleX(1);"></td>'
            +'</tr></tbody></table>'
    }else if(arr_s[b].art_size=='patch'){
        html+='</tr><tr>'
            +'<td height="40px" align="right" style="padding-right:8px;">Top border</td>'
            +'<td colspan="3"><input class="input_text" onchange="story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice['+b+'].patch[0]=parseInt(correct_value(this.value,true));choice_panel_update(\''+block+'\','+i+','+n+');state_save();" type="text" style="width:100%;height:28px" value="'+((arr_s[b].art_size)?arr_s[b].patch[0]:'')+'"></td>'
        +'</tr><tr>'
            +'<td height="40px" align="right" style="padding-right:8px;">Left border</td>'
            +'<td colspan="3"><input class="input_text" onchange="story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice['+b+'].patch[3]=parseInt(correct_value(this.value,true));choice_panel_update(\''+block+'\','+i+','+n+');state_save();" type="text" style="width:100%;height:28px" value="'+((arr_s[b].art_size)?arr_s[b].patch[3]:'')+'"></td>'
        +'</tr><tr>'
            +'<td height="40px" align="right" style="padding-right:8px;">Right border</td>'
            +'<td colspan="3"><input class="input_text" onchange="story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice['+b+'].patch[1]=parseInt(correct_value(this.value,true));choice_panel_update(\''+block+'\','+i+','+n+');state_save();" type="text" style="width:100%;height:28px" value="'+((arr_s[b].art_size)?arr_s[b].patch[1]:'')+'"></td>'
        +'</tr><tr>'
            +'<td height="40px" align="right" style="padding-right:8px;">Bottom border</td>'
            +'<td colspan="3"><input class="input_text" onchange="story_script.'+block+'['+i+'].dialogs['+(n-1)+'].choice['+b+'].patch[2]=parseInt(correct_value(this.value,true));choice_panel_update(\''+block+'\','+i+','+n+');state_save();" type="text" style="width:100%;height:28px" value="'+((arr_s[b].art_size)?arr_s[b].patch[2]:'')+'"></td>'
    } html+='</tr><tr>'
        +'<td colspan="4" height="40px" align="left" style="padding-left:8px;border-bottom:1px solid var(--cb);">Variables</td>'
    +'</tr><tr>'
        +'<td colspan="4">'+var_choice+'</td>'
    +'</tr><tr>'
        +'<td colspan="4" height="40px" align="left" style="padding-left:8px;border-bottom:1px solid var(--cb);">Display conditions</td>'
    +'</tr><tr>'
        +'<td colspan="4">'+show_if+'</td>'
    +'</tr></tbody></table></div>'
    return html;
}
let button_name={
    'tue_home':'Start block',
    'tue_save':'Save stage',
    'tue_load':'Load stage',
    'tue_load_autosave':'Load autosave',
    'tue_fullScreen':'Full screen',
    'tue_fastRewind':'Skip dialogues',
    'tue_audio':'Sound toggle',
}
function button_panel_update(){
    droppFocus(document.getElementById('resizers'));
    interface_buttons_c.innerHTML=""
    var arr_s=story_script.parameters.buttons
    var clear_ui=document.getElementsByClassName("tue_controll");
    while(clear_ui.length){scene_layout.removeChild(clear_ui[0]);}
    for(var b=arr_s.length-1;b>=0;b--){
        if(!arr_s[b].text){arr_s[b].text=''}
        if(!arr_s[b].text[languare]){data_corr(arr_s[b],'text')}
        if(!arr_s[b].art){arr_s[b].art=''}
        if(!arr_s[b].art[languare]){data_corr(arr_s[b],'art')}
        if(arr_s[b].name=='tue_audio'||arr_s[b].name=='tue_fullScreen'||arr_s[b].name=='tue_speech'){
            if(!arr_s[b].text1){arr_s[b].text1=''}
            if(!arr_s[b].text1[languare]){data_corr(arr_s[b],'text1')}
            if(!arr_s[b].text2){arr_s[b].text2=''}
            if(!arr_s[b].text2[languare]){data_corr(arr_s[b],'text2')}
            if(!arr_s[b].art1){arr_s[b].art1=''}
            if(!arr_s[b].art1[languare]){data_corr(arr_s[b],'art1')}
            if(!arr_s[b].art2){arr_s[b].art2=''}
            if(!arr_s[b].art2[languare]){data_corr(arr_s[b],'art2')}
        }
        if(!arr_s[b].sound){arr_s[b].sound=''}
        if(!arr_s[b].sound[languare]){data_corr(arr_s[b],'sound')}
        var ui_button=document.createElement("div");
        if(arr_s[b].style&&arr_s[b].style.length>0){
            var s=arr_s[b].style;
            for(var f=0;f<project_files.length;f++){s=s.replaceAll(project_files[f][0],project_files[f][1]);};
            ui_button.style=s;
        }
        if(arr_s[b].text){
            if(arr_s[b].text[languare]){
                ui_button.innerHTML=values_in_text(arr_s[b].text[languare]);
                ui_button.style.padding=arr_s[b].indent_text;
            };
            ui_button.style.display="flex";
            ui_button.style.whiteSpace="pre-wrap";
            ui_button.style.justifyContent=((arr_s[b].align)?arr_s[b].align[0]:"center");
            ui_button.style.alignItems=((arr_s[b].align)?arr_s[b].align[1]:"center");
            ui_button.style.color=arr_s[b].color_text;
            ui_button.style.fontSize=((arr_s[b].size_text)?arr_s[b].size_text:story_script.parameters.font_size);
            ui_button.style.fontFamily=((arr_s[b].font_family)?arr_s[b].font_family:story_script.parameters.font);
        }
        ui_button.style.zIndex=3000+b;
        ui_button.id=arr_s[b].name+b;
        ui_button.setAttribute('onclick','objSelect(this.id);arr_e=story_script.parameters.buttons['+b+']');
        ui_button.classList.add("tue_controll");ui_button.classList.add("objSelect");
        ui_button.style.position="absolute";
        ui_button.style.transformOrigin="top left";
        if(arr_s[b].size){
            if(arr_s[b].size[0]!=0){ui_button.style.width=arr_s[b].size[0];}
            if(arr_s[b].size[1]!=0){ui_button.style.height=arr_s[b].size[1];}
        }
        if(!arr_s[b].hotspot){arr_s[b].hotspot=['0%','0%']}
        ui_button.style.transform="translate("+arr_s[b].hotspot[0]+","+arr_s[b].hotspot[1]+")"+((arr_s[b].angle)?" rotate("+arr_s[b].angle+"deg)":"")
        ui_button.style.backgroundColor=arr_s[b].color;
        ui_button.style.backgroundRepeat="no-repeat";
        ui_button.style.backgroundPosition=((arr_s[b].art_align)?arr_s[b].art_align[0]+" "+arr_s[b].art_align[1]:"center");
        if(arr_s[b].art){ui_button.style.backgroundImage="url('"+open_file((arr_s[b].art[languare])?arr_s[b].art[languare]:arr_s[b].art)+"')";}
        if(arr_s[b].art_size){
            if(arr_s[b].art_size=='patch'){ui_button.style.backgroundImage="none"}else if(arr_s[b].patch){delete arr_s[b].patch}
            if(typeof arr_s[b].art_size==='object'){ui_button.style.backgroundSize=arr_s[b].art_size[0]+" "+arr_s[b].art_size[1];}
            else if(arr_s[b].art_size=='patch'){
                if(!arr_s[b].patch){arr_s[b].patch=[8,8,8,8]};
                ui_button.style.backgroundImage="none";
                ui_button.style.backgroundSize="none";
                ui_button.style.backgroundClip="padding-box";
                ui_button.style.borderStyle="solid";
                ui_button.style.borderWidth=arr_s[b].patch[0]+"px "+arr_s[b].patch[1]+"px "+arr_s[b].patch[2]+"px "+arr_s[b].patch[3]+"px";
                ui_button.style.borderImage="url('"+open_file((arr_s[b].art[languare])?arr_s[b].art[languare]:arr_s[b].art)+"') "+arr_s[b].patch[0]+" "+arr_s[b].patch[1]+" "+arr_s[b].patch[2]+" "+arr_s[b].patch[3]+" stretch stretch"
            }else{ui_button.style.backgroundSize=arr_s[b].art_size;}
        }
        if(arr_s[b].position[0]!=0){ui_button.style.left=arr_s[b].position[0];}
        if(arr_s[b].position[1]!=0){ui_button.style.right=arr_s[b].position[1];}
        if(arr_s[b].position[2]!=0){ui_button.style.top=arr_s[b].position[2];}
        if(arr_s[b].position[3]!=0){ui_button.style.bottom=arr_s[b].position[3];}
        scene_layout.appendChild(ui_button);
        interface_buttons_c.innerHTML+=button_panel_edit(b)
    }
}
function button_panel_edit(b){
    var arr_s=story_script.parameters.buttons
    if(b==-1){
        var a=story_script.parameters.buttons.length
        if(a>0){
            story_script.parameters.buttons.unshift(JSON.parse(JSON.stringify(story_script.parameters.buttons[a-1])))
            story_script.parameters.buttons[0].position=["50%","0","50%","0"];
            story_script.parameters.buttons[0].name="none";
            story_script.parameters.buttons[0].text="button";
        }
        else{story_script.parameters.buttons.unshift({"name":"tue_no","position":["50%","0","50%","0"],"size":[0,(story_script.parameters.buttons[0]&&story_script.parameters.buttons[0].size)?story_script.parameters.buttons[0].size[1]:0],"color":story_script.parameters.text_panel.color,"art":"","text":"button","indent_text": "12px","color_text":story_script.parameters.text_panel.color_text})}
        b=(a>0)?a-1:0;
    }
    var html='<div id=b_'+arr_s[b].name+b+' class="ui_buttons dialog" style="margin:8px;"><table style="width:100%;'+((story_script.blocks[arr_s[b].name]&&story_script.blocks[arr_s[b].name][3])?'border-radius:6px;background-color:'+story_script.blocks[arr_s[b].name][3]+';':'')+'" ondblclick="objSelect(\''+arr_s[b].name+b+'\');arr_e=story_script.parameters.buttons['+b+']"><tbody><tr>'
            +'<td width="24px" class="icon_m icon_up" onclick="move_elenetn(story_script.parameters.buttons,'+b+',1);button_panel_update();state_save();" height="22px"></td>'
            +'<td width="24px" class="icon_m icon_down" onclick="move_elenetn(story_script.parameters.buttons,'+b+',-1);button_panel_update();state_save();"></td><td>&nbsp;</td>'
            +'<td width="26px" class="icon_show icon_m" style="cursor:pointer;" onclick="panel_m(\'b_'+arr_s[b].name+b+'\',0,0,0,'+b+',\'buttons\',\'button_panel_update\')"></td>'
            +'</tr><tr><td id="bt'+b+'" colspan="5" height="40px" align="center" style="background-image:url('+open_file((arr_s[b].art[languare])?arr_s[b].art[languare]:arr_s[b].art)+');background-position:center;background-repeat:no-repeat;background-size:contain;">'+((arr_s[b].text[languare])?arr_s[b].text[languare]:((arr_s[b].text.length>0)?arr_s[b].text:((arr_s[b].art[languare])?'':arr_s[b].name)))+'</td></tr><tr>'
        +'<td height="22px" class="icon_m icon_more" onclick="menu_element.style.visibility=\'hidden\';block_open(\'bpsp'+b+'\');scen_element.bpsp'+b+'=bpsp'+b+'.style.display;"></td><td colspan="3"></td></tr></tbody></table>'
        +'<table id="bpsp'+b+'" width="100%" style="display:'+((scen_element['bpsp'+b])?scen_element['bpsp'+b]:'none')+';border-top:1px solid var(--cb);margin-top:8px;"><tbody><tr>'
            +'<td height="40px" align="right" style="width:40%;padding-right:8px;">Function</td><td colspan="3"><select oninput="story_script.parameters.buttons['+b+'].name=this.value;button_panel_update(true);state_save();" style="width:100%;height:28px;">'+"<option value='tue_next' "+((arr_s[b].name=='tue_next')?"selected":"")+">Next</option><option value='tue_back' "+((arr_s[b].name=='tue_back')?"selected":"")+">Back</option>" + option_block(arr_s[b].name,3)+'</select></select></td></tr>'
        +'<tr>'
            +'<td height="40px" align="right" style="width:40%;padding-right:8px;">Text</td>'
            +'<td style="width:28px;" align="center"><select id="bts'+b+'" onchange="btv'+b+'.value=((story_script.parameters.buttons['+b+'].text[this.value].length>0)?story_script.parameters.buttons['+b+'].text[this.value]:\'\');" style="height:28px;width:100%;border-left:1px solid var(--cb);border-right:1px solid var(--cb);border-bottom:1px solid var(--cb);">'+project_languares(languare)+'</select></td>'
            +'<td colspan="2"><input id="btv'+b+'" class="input_text" onchange="story_script.parameters.buttons['+b+'].text[bts'+b+'.value]=this.value;button_panel_update(true);state_save();" type="text" style="width:100%;height:28px;" value="'+((arr_s[b].text[languare])?arr_s[b].text[languare]:'')+'"></td>'
        +((arr_s[b].name=='tue_fullScreen')?'</tr><tr>'
            +'<td height="40px" align="right" style="width:40%;padding-right:8px;">Text fullscreen</td>'
            +'<td style="width:28px;" align="center"><select id="btsa'+b+'" onchange="btva'+b+'.value=((story_script.parameters.buttons['+b+'].text[this.value].length>0)?story_script.parameters.buttons['+b+'].text[this.value]:\'\');" style="height:28px;width:100%;border-left:1px solid var(--cb);border-right:1px solid var(--cb);border-bottom:1px solid var(--cb);">'+project_languares(languare)+'</select></td>'
            +'<td colspan="2"><input id="btva'+b+'" class="input_text" onchange="story_script.parameters.buttons['+b+'].text1[btsa'+b+'.value]=this.value;button_panel_update(true);state_save();" type="text" style="width:100%;height:28px;" value="'+((arr_s[b].text1[languare])?arr_s[b].text1[languare]:'')+'"></td>':"")
        +((arr_s[b].name=='tue_audio')?'</tr><tr>'
            +'<td height="40px" align="right" style="width:40%;padding-right:8px;">Text off music</td>'
            +'<td style="width:28px;" align="center"><select id="btsa'+b+'" onchange="btva'+b+'.value=((story_script.parameters.buttons['+b+'].text1[this.value].length>0)?story_script.parameters.buttons['+b+'].text[this.value]:\'\');" style="height:28px;width:100%;border-left:1px solid var(--cb);border-right:1px solid var(--cb);border-bottom:1px solid var(--cb);">'+project_languares(languare)+'</select></td>'
            +'<td colspan="2"><input id="btva'+b+'" class="input_text" onchange="story_script.parameters.buttons['+b+'].text1[btsa'+b+'.value]=this.value;button_panel_update(true);state_save();" type="text" style="width:100%;height:28px;" value="'+((arr_s[b].text1[languare])?arr_s[b].text1[languare]:'')+'"></td>'
        +'</tr><tr>'
            +'<td height="40px" align="right" style="width:40%;padding-right:8px;">Text off sound</td>'
            +'<td style="width:28px;" align="center"><select id="btsm'+b+'" onchange="btvm'+b+'.value=((story_script.parameters.buttons['+b+'].text2[this.value].length>0)?story_script.parameters.buttons['+b+'].text[this.value]:\'\');" style="height:28px;width:100%;border-left:1px solid var(--cb);border-right:1px solid var(--cb);border-bottom:1px solid var(--cb);">'+project_languares(languare)+'</select></td>'
            +'<td colspan="2"><input id="btvm'+b+'" class="input_text" onchange="story_script.parameters.buttons['+b+'].text2[btsm'+b+'.value]=this.value;button_panel_update(true);state_save();" type="text" style="width:100%;height:28px;" value="'+((arr_s[b].text2[languare])?arr_s[b].text2[languare]:'')+'"></td>':"")
        +((arr_s[b].name=='tue_speech')?'</tr><tr>'
            +'<td height="40px" align="right" style="width:40%;padding-right:8px;">Speech text</td>'
            +'<td style="width:28px;" align="center"><select id="btsvts'+b+'" onchange="btsvt'+b+'.value=((story_script.parameters.buttons['+b+'].text1[this.value].length>0)?story_script.parameters.buttons['+b+'].text1[this.value]:\'\');" style="height:28px;width:100%;border-left:1px solid var(--cb);border-right:1px solid var(--cb);border-bottom:1px solid var(--cb);">'+project_languares(languare)+'</select></td>'
            +'<td colspan="2"><input id="btsvt'+b+'" class="input_text" onchange="story_script.parameters.buttons['+b+'].text1[btsvts'+b+'.value]=this.value;button_panel_update(true);state_save();" type="text" style="width:100%;height:28px;" value="'+((arr_s[b].text1[languare])?arr_s[b].text1[languare]:'')+'"></td>'
        +'</tr><tr>'
            +'<td height="40px" align="right" style="width:40%;padding-right:8px;">Speech voice</td>'
            +'<td style="width:28px;" align="center"><select id="btsvs'+b+'" onchange="btsv'+b+'.value=((story_script.parameters.buttons['+b+'].text2[this.value].length>0)?story_script.parameters.buttons['+b+'].text2[this.value]:\'\');" style="height:28px;width:100%;border-left:1px solid var(--cb);border-right:1px solid var(--cb);border-bottom:1px solid var(--cb);">'+project_languares(languare)+'</select></td>'
            +'<td><input id="btsv'+b+'" class="input_text" onchange="story_script.parameters.buttons['+b+'].text2[btsvs'+b+'.value]=this.value;button_panel_update(true);state_save();" type="text" style="width:100%;height:28px;" value="'+((arr_s[b].text2[languare])?arr_s[b].text2[languare]:'')+'"></td>'
            +'<td height="40px" align="right" style="width:30px;" class="icon icon_edit" onclick="let l=document.getElementById(\'btsvs'+b+'\').value;voicesSynthesis(l,\'btsv'+b+'\',\'story_script.parameters.buttons['+b+'].text2[btsvs'+b+'.value]\',((\'btsvt'+b+'.value.length>0\')?btsvt'+b+'.value:\'hello\'))"></td>':"")
        +'</tr><tr>'
            +'<td height="40px" align="right" style="padding-right:8px;">Width size</td>'
            +'<td colspan="3"><input class="input_text" onchange="story_script.parameters.buttons['+b+'].size[0]=correct_value(this.value);button_panel_update();state_save();" type="text" style="width:100%;height:28px" value="'+((arr_s[b].size)?arr_s[b].size[0]:'')+'"></td>'
        +'</tr><tr>'
            +'<td height="40px" align="right" style="padding-right:8px;">Height size</td>'
            +'<td colspan="3"><input class="input_text" onchange="story_script.parameters.buttons['+b+'].size[1]=correct_value(this.value);button_panel_update();state_save();" type="text" style="width:100%;height:28px" value="'+((arr_s[b].size)?arr_s[b].size[1]:'')+'"></td>'
        +'</tr><tr>'
            +'<td height="40px" align="right" style="padding-right:8px;">Indent text</td>'
            +'<td colspan="3"><input class="input_text" onchange="story_script.parameters.buttons['+b+'].indent_text=correct_value(this.value);button_panel_update();state_save();" type="text" style="width:100%;height:28px" value="'+((arr_s[b].indent_text)?arr_s[b].indent_text:'')+'"></td>'
        +'</tr><tr>'
            +'<td height="40px" align="right" style="padding-right:8px;">Sound</td>'
            +'<td style="width:28px;" align="center"><select id="bpsl'+b+'" onchange="bpst'+b+'.value=story_script.parameters.buttons['+b+'].sound[this.value]" style="height:28px;width:100%;border-left:1px solid var(--cb);border-right:1px solid var(--cb);border-bottom:1px solid var(--cb);">'+project_languares(languare)+'</select></td>'
            +'<td><input id="bpst'+b+'" class="input_text" onchange="story_script.parameters.buttons['+b+'].sound[bpsl'+b+'.value]=this.value;button_panel_update();state_save();" type="text" style="width:100%;height:28px" value="'+((arr_s[b].sound&&arr_s[b].sound[languare]&&arr_s[b].sound[languare].length>0)?arr_s[b].sound[languare]:'')+'"></td>'
            +'<td height="40px" align="right" style="width:30px;" class="icon icon_load" onclick="file_catalog(\'bpst'+b+'\',\'audio\',\'bpst'+b+'\',false,\'story_script.parameters.buttons['+b+'].sound[bpsl'+b+'.value]\')"></td>'
        +'</tr><tr>'
            +'<td height="40px" align="right" style="padding-right:8px;">JavaScript</td>'
            +'<td colspan="2"><input id="bjs'+b+'" class="input_text" onchange="story_script.parameters.buttons['+b+'].js=this.value;button_panel_update();" type="text" style="width:100%;height:28px" value="'+((arr_s[b].js)?arr_s[b].js:'')+'"></td>'
            +'<td height="40px" align="right" style="width:30px;" class="icon icon_edit" onclick="copy_arr=story_script.parameters.buttons['+b+'];edit_code(\'js\',\'JavaScript\');state_save();"></td>'
        +'</tr><tr>'
            +'<td colspan="4" height="40px" align="left" style="padding-left:8px;border-bottom:1px solid var(--cb);">Position</td>'
        +'</tr><tr>'
            +'<td height="40px" align="right" style="padding-right:8px;">Top position</td>'
            +'<td colspan="3"><input class="input_text" onchange="story_script.parameters.buttons['+b+'].position[2]=correct_value(this.value);button_panel_update();state_save();" type="text" style="width:100%;height:28px" value="'+((arr_s[b].position)?arr_s[b].position[2]:'')+'"></td>'
        +'</tr><tr>'
            +'<td height="40px" align="right" style="padding-right:8px;">Left position</td>'
            +'<td colspan="3"><input class="input_text" onchange="story_script.parameters.buttons['+b+'].position[0]=correct_value(this.value);button_panel_update();state_save();" type="text" style="width:100%;height:28px" value="'+((arr_s[b].position)?arr_s[b].position[0]:'')+'"></td>'
        +'</tr><tr>'
            +'<td height="40px" align="right" style="padding-right:8px;">Bottom position</td>'
            +'<td colspan="3"><input class="input_text" onchange="story_script.parameters.buttons['+b+'].position[3]=correct_value(this.value);button_panel_update();state_save();" type="text" style="width:100%;height:28px" value="'+((arr_s[b].position)?arr_s[b].position[3]:'')+'"></td>'
        +'</tr><tr>'
            +'<td height="40px" align="right" style="padding-right:8px;">Right position</td>'
            +'<td colspan="3"><input class="input_text" onchange="story_script.parameters.buttons['+b+'].position[1]=correct_value(this.value);button_panel_update();state_save();" type="text" style="width:100%;height:28px" value="'+((arr_s[b].position)?arr_s[b].position[1]:'')+'"></td>'
        +'</tr><tr>'
            +'<td height="40px" align="right" style="padding-right:8px;">OffSet X</td>'
            +'<td colspan="3"><input class="input_text" onchange="story_script.parameters.buttons['+b+'].hotspot[0]=((this.value.length>0)?correct_value(this.value):0);button_panel_update();state_save();" type="text" style="width:100%;height:28px" value="'+((arr_s[b].hotspot&&arr_s[b].position)?arr_s[b].hotspot[0]:'')+'"></td>'
        +'</tr><tr>'
            +'<td height="40px" align="right" style="padding-right:8px;">OffSet Y</td>'
            +'<td colspan="3"><input class="input_text" onchange="story_script.parameters.buttons['+b+'].hotspot[1]=((this.value.length>0)?correct_value(this.value):0);button_panel_update();state_save();" type="text" style="width:100%;height:28px" value="'+((arr_s[b].hotspot&&arr_s[b].position)?arr_s[b].hotspot[1]:'')+'"></td>'
        +'</tr><tr>'
            +'<td height="40px" align="right" style="padding-right:8px;">Angle</td>'
            +'<td colspan="3"><input class="input_text" onchange="story_script.parameters.buttons['+b+'].angle=correct_value(this.value,true);button_panel_update();state_save();" type="text" style="width:100%;height:28px" value="'+((arr_s[b].angle)?arr_s[b].angle:0)+'"></td>'
        +'</tr><tr>'
            +'<td colspan="4" height="40px" align="left" style="padding-left:8px;border-bottom:1px solid var(--cb);">Text</td>'
        +'</tr><tr>'
            +'<td height="40px" align="right" style="padding-right:8px;">Color text</td>'
            +'<td style="width:28px;" align="center"><div class="show_color" '+((arr_s[b].color_text)?'style="background-color:'+arr_s[b].color_text+';"':"")+'></div></td>'
            +'<td style="padding-right:8px;"><input class="input_text" onchange="story_script.parameters.buttons['+b+'].color_text=this.value;button_panel_update();state_save();" type="text" style="width:100%;height:28px" value="'+((arr_s[b].color_text)?arr_s[b].color_text:'')+'"></td>'
            +'<td height="40px" align="right" style="width:30px;" class="icon icon_color" onclick="arr_l=story_script.parameters.buttons['+b+'];arr_n=\'color_text\';edit_color(\'button\',\''+arr_s[b].color_text+'\');"></td>'
        +'</tr><tr>'
            +'<td height="40px" align="right" style="padding-right:8px;">Font size</td>'
            +'<td colspan="3"><input class="input_text" onchange="story_script.parameters.buttons['+b+'].size_text=correct_value(this.value);button_panel_update();state_save();" type="text" style="width:100%;height:28px" value="'+((arr_s[b].size_text)?arr_s[b].size_text:'')+'"></td>'
        +'</tr><tr>'
            +'<td height="40px" align="right" style="padding-right:8px;">Font family</td>'
            +'<td colspan="3"><input class="input_text" onchange="story_script.parameters.buttons['+b+'].font_family=correct_value(this.value);button_panel_update();state_save();" type="text" style="width:100%;height:28px" value="'+((arr_s[b].font_family)?arr_s[b].font_family:'')+'"></td>'
        +'</tr><tr>'
            +'<td height="40px" align="right" style="padding-right:8px;">Align text</td>'
            +'<td colspan="3" align="center">'
            +'<table style="background-color:var(--cw);border-radius:4px;"><tbody><tr>'
                +'<td><input class="icon icon_diag align" type="radio" name="align_b'+b+'" onchange="story_script.parameters.buttons['+b+'].align=[\'start\',\'start\'];button_panel_update(true);state_save();" '+((arr_s[b].align&&arr_s[b].align[0]=='start'&&arr_s[b].align[1]=='start')?'checked':'')+' style="transform:scaleX(-1) scaleY(-1);"></td>'
                +'<td><input class="icon icon_side align" type="radio" name="align_b'+b+'" onchange="story_script.parameters.buttons['+b+'].align=[\'center\',\'start\'];button_panel_update(true);state_save();" '+((arr_s[b].align&&arr_s[b].align[0]=='center'&&arr_s[b].align[1]=='start')?'checked':'')+'></td>'
                +'<td><input class="icon icon_diag align" type="radio" name="align_b'+b+'" onchange="story_script.parameters.buttons['+b+'].align=[\'end\',\'start\'];button_panel_update(true);state_save();" '+((arr_s[b].align&&arr_s[b].align[0]=='end'&&arr_s[b].align[1]=='start')?'checked':'')+' style="transform:scaleY(-1);"></td>'
            +'</tr><tr>'
                +'<td><input class="icon icon_side align" type="radio" name="align_b'+b+'" onchange="story_script.parameters.buttons['+b+'].align=[\'start\',\'center\'];button_panel_update(true);state_save();" '+((arr_s[b].align&&arr_s[b].align[0]=='start'&&arr_s[b].align[1]=='center')?'checked':'')+' style="transform:rotate(270deg);"></td>'
                +'<td><input class="icon icon_cent align" type="radio" name="align_b'+b+'" onchange="delete story_script.parameters.buttons['+b+'].align;button_panel_update(true);state_save();" '+((!arr_s[b].align)?'checked':'')+'></td>'
                +'<td><input class="icon icon_side align" type="radio" name="align_b'+b+'" onchange="story_script.parameters.buttons['+b+'].align=[\'end\',\'center\'];button_panel_update(true);" '+((arr_s[b].align&&arr_s[b].align[0]=='end'&&arr_s[b].align[1]=='center')?'checked':'')+' style="transform:rotate(90deg);"></td>'
            +'</tr><tr>'
                +'<td><input class="icon icon_diag align" type="radio" name="align_b'+b+'" onchange="story_script.parameters.buttons['+b+'].align=[\'start\',\'end\'];button_panel_update(true);state_save();" '+((arr_s[b].align&&arr_s[b].align[0]=='start'&&arr_s[b].align[1]=='end')?'checked':'')+' style="transform:scaleX(-1);"></td>'
                +'<td><input class="icon icon_side align" type="radio" name="align_b'+b+'" onchange="story_script.parameters.buttons['+b+'].align=[\'center\',\'end\'];button_panel_update(true);state_save();" '+((arr_s[b].align&&arr_s[b].align[0]=='center'&&arr_s[b].align[1]=='end')?'checked':'')+' style="transform:scaleY(-1);"></td>'
                +'<td><input class="icon icon_diag align" type="radio" name="align_b'+b+'" onchange="story_script.parameters.buttons['+b+'].align=[\'end\',\'end\'];button_panel_update(true);state_save();" '+((arr_s[b].align&&arr_s[b].align[0]=='end'&&arr_s[b].align[1]=='end')?'checked':'')+' style="transform:scaleX(1);"></td>'
            +'</tr></tbody></table>'
            +'</td>'
        +'</tr><tr>'
            +'<td colspan="4" height="40px" align="left" style="padding-left:8px;border-bottom:1px solid var(--cb);">Style</td>'
        +'</tr><tr>'
            +'<td height="40px" align="right" style="padding-right:8px;">Style CSS</td>'
            +'<td colspan="2"><input class="input_text" onchange="story_script.parameters.buttons['+b+'].style=this.value;button_panel_update();state_save();" type="text" style="width:100%;height:28px" value="'+((arr_s[b].style)?arr_s[b].style:'')+'"></td>'
            +'<td height="40px" align="right" style="width:30px;" class="icon icon_edit" onclick="copy_arr=story_script.parameters.buttons['+b+'];edit_code(\'style\',\'Style CSS\');"></td>'
        +'</tr><tr>'
            +'<td height="40px" align="right" style="padding-right:8px;">Class Name</td>'
            +'<td colspan="3"><input class="input_text" onchange="story_script.parameters.buttons['+b+'].className=this.value;state_save();" type="text" style="width:100%;height:28px" value="'+((arr_s[b].className)?arr_s[b].className:'')+'"></td>'
        +'</tr><tr>'
            +'<td height="40px" align="right" style="padding-right:8px;">Color</td>'
            +'<td style="width:28px;" align="center"><div class="show_color" '+((arr_s[b].color)?'style="background-color:'+arr_s[b].color+';"':"")+'></div></td>'
            +'<td style="padding-right:8px;"><input class="input_text" onchange="story_script.parameters.buttons['+b+'].color=this.value;button_panel_update();state_save();" type="text" style="width:100%;height:28px" value="'+((arr_s[b].color)?arr_s[b].color:'')+'"></td>'
            +'<td height="40px" align="right" style="width:30px;" class="icon icon_color" onclick="arr_l=story_script.parameters.buttons['+b+'];arr_n=\'color\';edit_color(\'button\',\''+arr_s[b].color+'\');"></td>'
        +'</tr><tr>'
            +'<td colspan="4" height="40px" align="left" style="padding-left:8px;border-bottom:1px solid var(--cb);">Art</td>'
        +'</tr><tr>'
            +'<td height="40px" align="right" style="padding-right:8px;">Art</td>'
            +'<td style="width:28px;" align="center"><select id="bpal'+b+'" onchange="bpat'+b+'.value=story_script.parameters.buttons['+b+'].art[this.value]" style="height:28px;width:100%;border-left:1px solid var(--cb);border-right:1px solid var(--cb);border-bottom:1px solid var(--cb);">'+project_languares(languare)+'</select></td>'
            +'<td><input id="bpat'+b+'" class="input_text" onchange="story_script.parameters.buttons['+b+'].art[bpal'+b+'.value]=this.value;button_panel_update();state_save();" type="text" style="width:100%;height:28px" value="'+((arr_s[b].art[languare]&&arr_s[b].art[languare].length>0)?arr_s[b].art[languare]:'')+'"></td>'
            +'<td height="40px" align="right" style="width:30px;" class="icon icon_load" onclick="file_catalog(\'bpat'+b+'\',\'img\',\'bpat'+b+'\',\''+arr_s[b].name+b+'\',\'story_script.parameters.buttons['+b+'].art[bpal'+b+'.value]\')"></td>'
        +((arr_s[b].name=='tue_fullScreen')?'</tr><tr>'
            +'<td height="40px" align="right" style="padding-right:8px;">Art fullscreen</td>'
            +'<td style="width:28px;" align="center"><select id="bpalm'+b+'" onchange="bpatm'+b+'.value=story_script.parameters.buttons['+b+'].art[this.value]" style="height:28px;width:100%;border-left:1px solid var(--cb);border-right:1px solid var(--cb);border-bottom:1px solid var(--cb);">'+project_languares(languare)+'</select></td>'
            +'<td><input id="bpatm'+b+'" class="input_text" onchange="story_script.parameters.buttons['+b+'].art[bpalm'+b+'.value]=this.value;button_panel_update();state_save();" type="text" style="width:100%;height:28px" value="'+((arr_s[b].art1[languare]&&arr_s[b].art1[languare].length>0)?arr_s[b].art1[languare]:'')+'"></td>'
            +'<td height="40px" align="right" style="width:30px;" class="icon icon_load" onclick="file_catalog(\'bpatm'+b+'\',\'img\',\'bpatm'+b+'\',\''+arr_s[b].name+b+'\',\'story_script.parameters.buttons['+b+'].art1[bpalm'+b+'.value]\')"></td>':"")
        +((arr_s[b].name=='tue_audio')?'</tr><tr>'
            +'<td height="40px" align="right" style="padding-right:8px;">Art off music</td>'
            +'<td style="width:28px;" align="center"><select id="bpalm'+b+'" onchange="bpatm'+b+'.value=story_script.parameters.buttons['+b+'].art[this.value]" style="height:28px;width:100%;border-left:1px solid var(--cb);border-right:1px solid var(--cb);border-bottom:1px solid var(--cb);">'+project_languares(languare)+'</select></td>'
            +'<td><input id="bpatm'+b+'" class="input_text" onchange="story_script.parameters.buttons['+b+'].art[bpalm'+b+'.value]=this.value;button_panel_update();state_save();" type="text" style="width:100%;height:28px" value="'+((arr_s[b].art1[languare]&&arr_s[b].art1[languare].length>0)?arr_s[b].art1[languare]:'')+'"></td>'
            +'<td height="40px" align="right" style="width:30px;" class="icon icon_load" onclick="file_catalog(\'bpatm'+b+'\',\'img\',\'bpatm'+b+'\',\''+arr_s[b].name+b+'\',\'story_script.parameters.buttons['+b+'].art1[bpalm'+b+'.value]\')"></td>'
        +'</tr><tr>'
            +'<td height="40px" align="right" style="padding-right:8px;">Art off sound</td>'
            +'<td style="width:28px;" align="center"><select id="bpala'+b+'" onchange="bpata'+b+'.value=story_script.parameters.buttons['+b+'].art[this.value]" style="height:28px;width:100%;border-left:1px solid var(--cb);border-right:1px solid var(--cb);border-bottom:1px solid var(--cb);">'+project_languares(languare)+'</select></td>'
            +'<td><input id="bpata'+b+'" class="input_text" onchange="story_script.parameters.buttons['+b+'].art[bpala'+b+'.value]=this.value;button_panel_update();state_save();" type="text" style="width:100%;height:28px" value="'+((arr_s[b].art2[languare]&&arr_s[b].art2[languare].length>0)?arr_s[b].art2[languare]:'')+'"></td>'
            +'<td height="40px" align="right" style="width:30px;" class="icon icon_load" onclick="file_catalog(\'bpata'+b+'\',\'img\',\'bpata'+b+'\',\''+arr_s[b].name+b+'\',\'story_script.parameters.buttons['+b+'].art2[bpala'+b+'.value]\')"></td>':"")
        +'</tr><tr>'
            +'<td height="40px" align="right" style="padding-right:8px;">Size</td>'
            +'<td colspan="3"><select oninput="story_script.parameters.buttons['+b+'].art_size=this.value;button_panel_update();state_save();">'
                +'<option value="">original</option>'
                +'<option '+((arr_s[b].art_size=='cover')?'selected':'')+' value="cover">cover</option>'
                +'<option '+((arr_s[b].art_size=='contain')?'selected':'')+' value="contain">contain</option>'
                +'<option '+((arr_s[b].art_size=='100% 100%')?'selected':'')+' value="100% 100%">fill</option>'
                +'<option '+((arr_s[b].art_size=='patch')?'selected':'')+' value="patch">9-patch</option>'
            +'</select></td>'
        if(!arr_s[b].art_size||arr_s[b].art_size==''||(arr_s[b].art_size!='patch'&&arr_s[b].art_size!='100% 100%')){
            if(arr_s[b].art_size==''){delete arr_s[b].art_size};
            if(arr_s[b].art_size!='cover'&&arr_s[b].art_size!='contain'){html+='</tr><tr>'
                    +'<td height="40px" align="right" style="padding-right:8px;">Width art</td>'
                    +'<td colspan="3"><input class="input_text" onchange="if(!story_script.parameters.buttons['+b+'].art_size){story_script.parameters.buttons['+b+'].art_size=[correct_value(this.value),\'auto\']}else{story_script.parameters.buttons['+b+'].art_size[0]=correct_value(this.value)};button_panel_update();state_save();" type="text" style="width:100%;height:28px" value="'+((arr_s[b].art_size)?arr_s[b].art_size[0]:'')+'"></td>'
                +'</tr><tr>'
                    +'<td height="40px" align="right" style="padding-right:8px;">Height art</td>'
                    +'<td colspan="3"><input class="input_text" onchange="if(!story_script.parameters.buttons['+b+'].art_size){story_script.parameters.buttons['+b+'].art_size=[\'auto\',correct_value(this.value)]}else{story_script.parameters.buttons['+b+'].art_size[1]=correct_value(this.value)};button_panel_update();state_save();" type="text" style="width:100%;height:28px" value="'+((arr_s[b].art_size)?arr_s[b].art_size[1]:'')+'"></td>'
            }
            html+='</tr><tr>'
                +'<td height="40px" align="right" style="padding-right:8px;">Align art</td>'
                +'<td colspan="3" align="center">'
                +'<table style="background-color:var(--cw);border-radius:4px;"><tbody><tr>'
                    +'<td><input class="icon icon_diag align" type="radio" name="art_b'+b+'" onchange="story_script.parameters.buttons['+b+'].art_align=[\'left\',\'top\'];button_panel_update();state_save();" '+((arr_s[b].art_align&&arr_s[b].art_align[0]=='left'&&arr_s[b].art_align[1]=='top')?'checked':'')+' style="transform:scaleX(-1) scaleY(-1);"></td>'
                    +'<td><input class="icon icon_side align" type="radio" name="art_b'+b+'" onchange="story_script.parameters.buttons['+b+'].art_align=[\'center\',\'top\'];button_panel_update();state_save();" '+((arr_s[b].art_align&&arr_s[b].art_align[0]=='center'&&arr_s[b].art_align[1]=='top')?'checked':'')+'></td>'
                    +'<td><input class="icon icon_diag align" type="radio" name="art_b'+b+'" onchange="story_script.parameters.buttons['+b+'].art_align=[\'right\',\'top\'];button_panel_update();state_save();" '+((arr_s[b].art_align&&arr_s[b].art_align[0]=='right'&&arr_s[b].art_align[1]=='top')?'checked':'')+' style="transform:scaleY(-1);"></td>'
                +'</tr><tr>'
                    +'<td><input class="icon icon_side align" type="radio" name="art_b'+b+'" onchange="story_script.parameters.buttons['+b+'].art_align=[\'left\',\'center\'];button_panel_update();state_save();" '+((arr_s[b].art_align&&arr_s[b].art_align[0]=='left'&&arr_s[b].art_align[1]=='center')?'checked':'')+' style="transform:rotate(270deg);"></td>'
                    +'<td><input class="icon icon_cent align" type="radio" name="art_b'+b+'" onchange="delete story_script.parameters.buttons['+b+'].art_align;button_panel_update();state_save();" '+((!arr_s[b].art_align)?'checked':'')+'></td>'
                    +'<td><input class="icon icon_side align" type="radio" name="art_b'+b+'" onchange="story_script.parameters.buttons['+b+'].art_align=[\'right\',\'center\'];button_panel_update();state_save();" '+((arr_s[b].art_align&&arr_s[b].art_align[0]=='right'&&arr_s[b].art_align[1]=='center')?'checked':'')+' style="transform:rotate(90deg);"></td>'
                +'</tr><tr>'
                    +'<td><input class="icon icon_diag align" type="radio" name="art_b'+b+'" onchange="story_script.parameters.buttons['+b+'].art_align=[\'left\',\'bottom\'];button_panel_update();state_save();" '+((arr_s[b].art_align&&arr_s[b].art_align[0]=='left'&&arr_s[b].art_align[1]=='bottom')?'checked':'')+' style="transform:scaleX(-1);"></td>'
                    +'<td><input class="icon icon_side align" type="radio" name="art_b'+b+'" onchange="story_script.parameters.buttons['+b+'].art_align=[\'center\',\'bottom\'];button_panel_update();state_save();" '+((arr_s[b].art_align&&arr_s[b].art_align[0]=='center'&&arr_s[b].art_align[1]=='bottom')?'checked':'')+' style="transform:scaleY(-1);"></td>'
                    +'<td><input class="icon icon_diag align" type="radio" name="art_b'+b+'" onchange="story_script.parameters.buttons['+b+'].art_align=[\'right\',\'bottom\'];button_panel_update();state_save();" '+((arr_s[b].art_align&&arr_s[b].art_align[0]=='right'&&arr_s[b].art_align[1]=='bottom')?'checked':'')+' style="transform:scaleX(1);"></td>'
                +'</tr></tbody></table>'
        }else if(arr_s[b].art_size=='patch'){
            html+='</tr><tr>'
                +'<td height="40px" align="right" style="padding-right:8px;">Top border</td>'
                +'<td colspan="3"><input class="input_text" onchange="story_script.parameters.buttons['+b+'].patch[0]=parseInt(correct_value(this.value,true));button_panel_update();state_save();" type="text" style="width:100%;height:28px" value="'+((arr_s[b].art_size)?arr_s[b].patch[0]:'')+'"></td>'
            +'</tr><tr>'
                +'<td height="40px" align="right" style="padding-right:8px;">Left border</td>'
                +'<td colspan="3"><input class="input_text" onchange="story_script.parameters.buttons['+b+'].patch[3]=parseInt(correct_value(this.value,true));button_panel_update();state_save();" type="text" style="width:100%;height:28px" value="'+((arr_s[b].art_size)?arr_s[b].patch[3]:'')+'"></td>'
            +'</tr><tr>'
                +'<td height="40px" align="right" style="padding-right:8px;">Right border</td>'
                +'<td colspan="3"><input class="input_text" onchange="story_script.parameters.buttons['+b+'].patch[1]=parseInt(correct_value(this.value,true));button_panel_update();state_save();" type="text" style="width:100%;height:28px" value="'+((arr_s[b].art_size)?arr_s[b].patch[1]:'')+'"></td>'
            +'</tr><tr>'
                +'<td height="40px" align="right" style="padding-right:8px;">Bottom border</td>'
                +'<td colspan="3"><input class="input_text" onchange="story_script.parameters.buttons['+b+'].patch[2]=parseInt(correct_value(this.value,true));button_panel_update();state_save();" type="text" style="width:100%;height:28px" value="'+((arr_s[b].art_size)?arr_s[b].patch[2]:'')+'"></td>'
        }
        html+='</tbody></table></div>'
    return html;
}
function preview_size(scale){
    var rows=document.getElementById('set_layout').getElementsByTagName('tbody')[0].rows
    if(screen_size.selectedIndex==1||screen_size.selectedIndex==2){rows[3].style.display='none';rows[4].style.display='none';}
    else{rows[3].style.display='table-row';rows[4].style.display='table-row';}
    if(screen_size.value==0){
        screen_preview.style.backgroundSize="64px"
        screen_preview.style.width="100%";
        screen_preview.style.height="calc(100vh - 40px)";
        if(ratio_screen.selectedIndex==0){
            scene_layout.style.width="100%";
            scene_layout.style.height=p_width.value+"%";
        }else{
            scene_layout.style.height="100%";
            scene_layout.style.width=p_width.value+"%";
        }
    }else{
        let r=(story_script.parameters)?story_script.parameters.resolutions:false;
        screen_preview.style.width=(((screen_size.value==-2)?(r[0]>r[1])?r[0]:r[1]:screen_size.value)*2.5)*scale_scene+"px";
        screen_preview.style.height=screen_preview.style.width;
        if(ratio_screen.selectedIndex==0){
            scene_layout.style.height=(screen_size.selectedIndex==1)?setup_editor.pvw[1]+"px":(r&&screen_size.selectedIndex==2)?r[1]+"px":screen_size.value+"px";
            scene_layout.style.width=(screen_size.selectedIndex==1)?setup_editor.pvw[0]+"px":(r&&screen_size.selectedIndex==2)?r[0]+"px":((100/p_width.value)*screen_size.value)+"px";
        }else{
            scene_layout.style.width=(screen_size.selectedIndex==1)?setup_editor.pvw[1]+"px":(screen_size.selectedIndex==2)?r[1]+"px":screen_size.value+"px";
            scene_layout.style.height=(screen_size.selectedIndex==1)?setup_editor.pvw[0]+"px":(screen_size.selectedIndex==2)?r[0]+"px":((100/p_width.value)*screen_size.value)+"px";
        }
    }
    if(scale){
        if(screen_size.value==0){world_scale(1);}
        scene_view.scrollTop=(screen_preview.clientHeight/2)-(scene_view.clientHeight/2);
        scene_view.scrollLeft=(screen_preview.clientWidth/2)-(scene_view.clientWidth/2);
    }
}
function scen_editor_apply(){
    menu_element.style.visibility='hidden';
    world.style.display="initial";
    new_story_block.style.display="initial";
    scene_maker.style.display="none";
    scroll_block=false;
    scene_screen=false;
    html.style.overflow="auto";
    html.scrollLeft=script_scroll[0];
    html.scrollTop=script_scroll[1];
    update_novel();
}
function variables_set_edit(){
    copy_arr=JSON.parse(JSON.stringify(arr_l));
    var t=""
    for(var c=0;c<copy_arr.variables.length;c++){t+="<tr><td style='width:128px;' valign='bottom'><select class='var_name'>"+option_var(arr_l.variables[c][0])+"</select></td><td style='width:48px;border-right:1px solid var(--cb);border-left:1px solid var(--cb);'><select class='var_operation'><option value='add'>add</option><option value='set' "+((arr_l.variables[c][1]=="set")?"selected":"")+">set</option></select></td><td><input class='input_text var_value' value='"+ arr_l.variables[c][2] +"' type='text'></td><td onclick='var a=this.closest(\"tr\");a.parentElement.removeChild(a);' style='width:40px;cursor:pointer;' title='delet' class='icon icon_del'></td></tr>"};
    var html="<div class='window' style='width:480px;'><div class='win_head'>Changes to variables<div class='window_close icon icon_close' onclick='modal_window(\"close\")'></div></div><hr><p class='text_tutorials_a select_tutorials'>"+texts.tutorials[4].en+"</p>"
    +"<div style='max-height:60vh;overflow-x:hidden;overflow-y:auto;'><table id='var_table' width='100%'><tbody>"+t+"</tbody></table>"
    +"<div onclick=\"variables_set_add('var_table')\" class='icon icon_add' style='margin-top:16px;height:26px;width:100%;cursor:pointer;'></div></div>"
    +"<br><table class='big_button' width='256px' onclick='variables_set_apply();'><tbody><tr><td width='42px' class='icon icon_ok'></td><td align='center'>Apply</td><td width='42px'></td></tr></tbody></table></div>"
    modal_window("open",html);
}
function variables_set_add(id){
    var tbody=document.getElementById(id).getElementsByTagName('tbody')[0];
    var row=document.createElement("tr");
    var td1=document.createElement("td");
    var td2=document.createElement("td");
    var td3=document.createElement("td");
    var td4=document.createElement("td");
    td1.innerHTML="<select class='var_name'>"+option_var()+"</select>";
    td2.innerHTML="<select class='var_operation'><option value='add'>add</option><option value='set'>set</option></select>";
    td2.style='width:48px;border-right:1px solid var(--cb);border-left:1px solid var(--cb);';
    td3.innerHTML="<input class='input_text var_value' value='0' type='text'>";
    td4.style="width:40px;cursor:pointer;";
    td4.title="delet";
    td4.className="icon icon_del";
    td4.setAttribute("onclick","var a=this.closest('tr');a.parentElement.removeChild(a);");
    row.appendChild(td1);
    row.appendChild(td2);
    row.appendChild(td3);
    row.appendChild(td4);
    tbody.appendChild(row);
}
function variables_set_apply(){
    li_v=document.getElementsByClassName("var_name");
    li_c=document.getElementsByClassName("var_operation");
    li_z=document.getElementsByClassName("var_value");
    copy_arr.variables=[];
    for(var i=0;i<li_v.length;i++){copy_arr.variables.push([li_v[i].value,li_c[i].value,((parseFloat(li_z[i].value)==li_z[i].value)?parseFloat(li_z[i].value):li_z[i].value)])};
    arr_l.variables=JSON.parse(JSON.stringify(copy_arr.variables));
    modal_window("close");
    update_novel();state_save();
}
function scen_compres(block,i,n){
    var a=0,arr_s=story_script[block][i].dialogs[n-1]
    data_only(story_script.parameters.text_panel,'art');
    data_only(story_script.parameters.name_panel,'art');
    for(a=0;a<story_script.parameters.buttons.length;a++){
        data_only(story_script.parameters.buttons[a],'art');
        data_only(story_script.parameters.buttons[a],'text');
        data_only(story_script.parameters.buttons[a],'sound');
        if(story_script.parameters.buttons[a].name!='tue_audio'&&story_script.parameters.buttons[a].name!='tue_fullScreen'&&story_script.parameters.buttons[a].name!=='tue_speech'){
            delete story_script.parameters.buttons[a].text1
            delete story_script.parameters.buttons[a].text2
            delete story_script.parameters.buttons[a].art1
            delete story_script.parameters.buttons[a].art2
        }else{
            data_only(story_script.parameters.buttons[a],'art1');
            data_only(story_script.parameters.buttons[a],'text1');
            data_only(story_script.parameters.buttons[a],'art2');
            data_only(story_script.parameters.buttons[a],'text2');
        }
    }
    if(arr_s){
        if(arr_s.art){for(a=0;a<arr_s.art.length;a++){data_only(arr_s.art[a],'url');}}
        if(arr_s.choice){for(a=0;a<arr_s.choice.length;a++){
            data_only(arr_s.choice[a],'art');
            if(arr_s.choice[a].url){data_only(arr_s.choice[a],'go_to')};
            data_only(arr_s.choice[a],'text');
            data_only(arr_s.choice[a],'sound');
            if(arr_s.choice[a].go_to!='tue_audio'&&arr_s.choice[a].go_to!='tue_fullScreen'&&arr_s.choice[a].go_to!=='tue_speech'){
                delete arr_s.choice[a].text1
                delete arr_s.choice[a].text2
                delete arr_s.choice[a].art1
                delete arr_s.choice[a].art2
            }else{
                data_only(arr_s.choice[a],'art1');
                data_only(arr_s.choice[a],'text1');
                data_only(arr_s.choice[a],'art2');
                data_only(arr_s.choice[a],'text2');
            }
        }}
    }
    var v=document.getElementById('scen_video');if(v){v.pause();}
}
function correct_name(name){return name.trim().replace(/[\s.,':;]/g,'_');};
let units=['px','%','em',"pc","pt","in","mm","cm","ex","ch","rem","vw","vh"];
function correct_value(name,unit){
    var l=((!unit)?"px":"")
    if(name.includes("calc")){return name}
    else if(name.includes("+")||name.includes("-")||name.includes("*")||name.includes("/")){
        for(var u=0;u<units.length;u++){if(name.includes(units[u])){name=name.replaceAll(units[u],'');l=units[u];}}
        return (eval(name).toFixed(2)+l).replace('.00','');}
    else if(name==parseInt(name)&&name!=0){return name+l}
    else{return name}
}
function move_elenetn(arr,o,n){
	var new_index=((o+n)<0)?o:o+n;
    arr.splice(new_index,0,arr.splice(o,1)[0]);
    update_novel();
};
function setup(){
    var block_list;
    var i
    var li=document.getElementsByClassName("story_block");
    if(!story_script.parameters.plugins){story_script.parameters.plugins=[]}
    if(!story_script.parameters.key){story_script.parameters.key=[]}
    for(i=0;i<li.length;i++){block_list+="<option value='"+li[i].id+"' "+((li[i].id==story_script.parameters.launch_story)?"selected" :"")+">"+li[i].id+"</option>"}
    var var_list="<table width='100%' id='var_tablet'><tbody>";
    if(story_script.parameters.variables){for(i=0;i<Object.keys(story_script.parameters.variables).length;i++){var_list+="<tr><td style='padding-right:8px;border-right:1px solid var(--cb);width:40%;padding-top:10px;'><input class='var_name input_text' onchange='this.value=correct_name(this.value)' placeholder='Name' value='"+Object.keys(story_script.parameters.variables)[i]+"' type='text'></td><td><input class='var_vol input_text' placeholder='Value' style='padding-top:10px;' value='"+story_script.parameters.variables[Object.keys(story_script.parameters.variables)[i]]+"' type='text'></td><td onclick=\"var a=this.closest('tr');a.parentElement.removeChild(a);\" style='width:40px;cursor:pointer;' title='delet "+Object.keys(story_script.parameters.variables)[i]+"' class='icon icon_del'></td></tr>";}}
    var_list+="</tbody></table><div onclick=\"add_tr('var_tablet')\" class='icon icon_add' style='margin:16px 0 0 45%;height:26px;width:26px;cursor:pointer;'></div>"
    var sound_list="<table width='100%' id='var_sounds'><tbody>";
    if(story_script.parameters.sounds){for(i=0;i<Object.keys(story_script.parameters.sounds).length;i++){sound_list+="<tr><td style='padding-right:8px;border-right:1px solid var(--cb);width:40%;padding-top:10px;'><input class='sound_name input_text' placeholder='Name' value='"+Object.keys(story_script.parameters.sounds)[i]+"' type='text'></td><td><input class='sound_path input_text' placeholder='path to audio file' style='padding-top:10px;' value='"+story_script.parameters.sounds[Object.keys(story_script.parameters.sounds)[i]]+"' type='text'></td><td onclick=\"var a=this.closest('tr');a.parentElement.removeChild(a);\" style='width:40px;cursor:pointer;' title='delet "+Object.keys(story_script.parameters.sounds)[i]+"' class='icon icon_del'></td></tr>";}}
    sound_list+="</tbody></table><div onclick=\"add_tr('var_sounds')\" class='icon icon_add' style='margin:16px 0 0 45%;height:26px;width:26px;cursor:pointer;'></div>"
    var font_list="<table width='100%' id='var_fonts'><tbody>";
    if(story_script.parameters.font_files){for(i=0;i<Object.keys(story_script.parameters.font_files).length;i++){font_list+="<tr><td style='padding-right:8px;border-right:1px solid var(--cb);width:40%;padding-top:10px;'><input class='font_name input_text' placeholder='Name' value='"+Object.keys(story_script.parameters.font_files)[i]+"' type='text'></td><td><input id='font"+i+"' class='font_path input_text' placeholder='path to font file' style='padding-top:10px;' value='"+story_script.parameters.font_files[Object.keys(story_script.parameters.font_files)[i]]+"' type='text'></td><td style='width:32px;cursor:pointer;' class='icon icon_load' onclick='file_catalog(\"\",\"font\",\"font"+i+"\",0)'></td><td onclick=\"var a=this.closest('tr');a.parentElement.removeChild(a);\" style='width:40px;cursor:pointer;' title='delet "+Object.keys(story_script.parameters.font_files)[i]+"' class='icon icon_del'></td></tr>";}}
    font_list+="</tbody></table><div onclick=\"add_tr('var_fonts')\" class='icon icon_add' style='margin:16px 0 0 45%;height:26px;width:26px;cursor:pointer;'></div>"
    if(!story_script.parameters.title[languare]){data_la(story_script.parameters,'title')};
    var title_list="<table width='100%' id='var_title'><tbody>";
    if(story_script.parameters.title){
        for(i=0;i<Object.keys(story_script.parameters.title).length;i++){
            title_list+="<tr><td style='padding-right:8px;border-right:1px solid var(--cb);width:42%;padding-top:10px;'><select class='title_lang'>"
            +big_languares(Object.keys(story_script.parameters.title)[i])+"</select></td><td><input class='title_name input_text' placeholder='translated title' style='padding-top:10px;' value='"+story_script.parameters.title[Object.keys(story_script.parameters.title)[i]]+"' type='text'></td><td onclick=\"var a=this.closest('tr');a.parentElement.removeChild(a);\" style='width:40px;cursor:pointer;' title='delet' class='icon icon_del'></td></tr>";
        }
    }
    var plugins_show="<table id='plugin' style='width:100%;border-spacing:10px;border-collapse:separate;'>"
    var plugins_name
    for(i=0;i<Object.keys(plugins_list).length;i++){plugins_name=Object.keys(plugins_list)[i];plugins_show+="<tr><td align='right' style='padding-top:4px;height:40px;'><label class='switchbox'><input type='checkbox' id='"+plugins_name+"' class='chec_plugin' "+((story_script.parameters.plugins.includes(plugins_name))?'checked' :'')+"><span class='toggle round'></span></label></td><td align='left' style='width:80px;white-space:nowrap;'>"+plugins_list[plugins_name].name+"</td><td>"+plugins_list[plugins_name].text+"</td></tr>"}
    plugins_show+="</table>"
    var thems="<table style='width:100%;border-spacing:10px;border-collapse:separate;'><tbody><tr>"
    for(i=0;i<7;i++){thems+="<td align='center'><input class='checkbox_b' type='radio' name='color' style='background-color:"+color_ui[i][0]+";' value='"+i+"' "+((setup_editor.ui==i)?'checked' :'')+"></td>"}
    thems+="</tr></tbody></table>"
    thems+="<p align='left' style='margin-left:8px;'>Dark them</p><hr><table style='width:72%;border-spacing:10px;border-collapse:separate;'><tbody><tr>"
    for(i=7;i<color_ui.length;i++){thems+="<td align='center'><input class='checkbox_b' type='radio' name='color' style='background-color:"+color_ui[i][9]+";' value='"+i+"' "+((setup_editor.ui==i)?'checked' :'')+"></td>"}
    thems+="</tr></tbody></table>"
    var addon_list="<table width='100%' id='var_addon'><tbody>";
    if(story_script.parameters.plugins){for(i=0;i<story_script.parameters.plugins.length;i++){if(!plugins_list[story_script.parameters.plugins[i]]){addon_list+="<tr><td style='padding-right:8px;padding-left:8px;width:calc(100% - 14px);padding-top:10px;'><input id='plugin"+i+"' class='addon_path input_text' placeholder='path to plugin js file' value='"+story_script.parameters.plugins[i]+"' type='text'></td><td onclick='file_catalog(this.id,\"js\",\"plugin"+i+"\",0)' style='width:32px;cursor:pointer;' class='icon icon_load'></td><td onclick=\"var a=this.closest('tr');a.parentElement.removeChild(a);\" style='width:32px;cursor:pointer;' title='delet' class='icon icon_del'></td></tr>";}}}
    addon_list+="</tbody></table><div onclick='add_addon()' class='icon icon_add' style='margin:16px 0 0 45%;height:26px;width:26px;cursor:pointer;'></div>"
    title_list+="</tbody></table><div onclick=\"add_tr('var_title')\" class='icon icon_add' style='margin:16px 0 0 45%;height:26px;width:26px;cursor:pointer;'></div>"
    let sar=story_script.parameters.plugins.includes("tue_aspect_ratio");
    function add_gamepad(){
        if(story_script.parameters.gamepad){
            return "<br><br><p align='left' style='margin-left:8px;'>D-pad cursor</p><hr>"+
            "<table style='margin-left:10px;width:100%;border-spacing:10px;border-collapse:separate;'><tbody>"+
            "<tr><td align='right' style='width:1%;'>Image cursor</td><td align='left'><input id='gamepad_image' class='input_text' value='"+((story_script.parameters.gamepad)?story_script.parameters.gamepad.cursor[0] :'')+"' type='text'><td class='icon icon_load' onclick=' file_catalog(\"gamepad_image\",\"img\",\"gamepad_image\",0) ' style='width:40px;' ></td></tr>"+
            "<tr><td align='right'>Width size</td><td align='left'><input id='gamepad_width' class='input_text'   onchange='this.value=correct_value(this.value)' value='"+((story_script.parameters.gamepad)?story_script.parameters.gamepad.cursor[3] :'')+"' type='text'><td></td></tr>"+
            "<tr><td align='right'>Height size</td><td align='left'><input id='gamepad_height' class='input_text' onchange='this.value=correct_value(this.value)' value='"+((story_script.parameters.gamepad)?story_script.parameters.gamepad.cursor[4] :'')+"' type='text'><td></td></tr>"+
            "<tr><td align='right'>Left position</td><td align='left'><input id='gamepad_left' class='input_text' onchange='this.value=correct_value(this.value)' value='"+((story_script.parameters.gamepad)?story_script.parameters.gamepad.cursor[2] :'')+"' type='text'><td></td></tr>"+
            "<tr><td align='right'>Top position</td><td align='left'><input id='gamepad_top' class='input_text'   onchange='this.value=correct_value(this.value)' value='"+((story_script.parameters.gamepad)?story_script.parameters.gamepad.cursor[1] :'')+"' type='text'><td></td></tr>"+
            "<tr><td align='right'>Style</td><td align='left'><input id='gamepad_style' class='input_text' onchange='this.value=correct_value(this.value)' value='"+((story_script.parameters.gamepad)?story_script.parameters.gamepad.cursor[5] :'')+"' type='text'><td></td></tr>"+
            "<tr><td align='right'>Class name</td><td align='left'><input id='gamepad_class' class='input_text' onchange='this.value=correct_value(this.value)' value='"+((story_script.parameters.gamepad)?story_script.parameters.gamepad.cursor[6] :'')+"' type='text'><td></td></tr></tbody></table>"
        }else{return ""}
    }
    var html="<div class='window' style='padding:4px 24px 24px 16px;width:480px;'><div class='win_head'>Settings project<div class='window_close icon icon_close' onclick='modal_window(\"close\")'></div></div>"+
        "<table width='100%' style='height:60vh;border-radius:8px;border-top:1px solid var(--cb);'><tbody>"+
        "<tr><td id='set_1' onclick='set_menu(0)' align='right' class='set_button set_select'>Project</td><td width='100%' valign='top' rowspan='6' style='position:relative;'>"+
        //
        "<div id='blank_0' style='visibility:visible;' class='set_blank'><table style='width:100%;border-spacing:10px;border-collapse:separate;'><tbody>"+
        "<tr><td align='right' style='white-space:nowrap;'>start block </td><td align='left'><select id='launch_story'>"+((block_list)?block_list :'')+"</select></td></tr>"+
        ((story_script.parameters.languares.length>1)?"<tr><td align='right' style='white-space:nowrap;'>default language </td><td align='left'><select id='default_language' class='input_text'>"+project_languares(story_script.parameters.languares[0])+"</select></td></tr>":"")+
        "<tr><td align='right' style='white-space:nowrap;'>working folder </td><td align='left'><input id='project_foler' class='input_text' value='"+((wf)?wf:"")+"' onclick='json_file.value=null;load_new=true;json_file.click();' type='text'></td><td id='l_icon' style='width:14px;cursor:pointer;' class='icon icon_load' onclick='json_file.value=null;load_new=true;json_file.click();'></td></tr>"+
        "<tr><td align='right' style='white-space:nowrap;'>css styles file </td><td align='left'><input id='style_file' class='input_text' value='"+((story_script.parameters.style_file)?story_script.parameters.style_file:'')+"' type='text'></td><td id='l_css' style='width:14px;cursor:pointer;' class='icon icon_load' onclick='file_catalog(this.id,\".css\",\"style_file\",0,\"story_script.parameters.style_file\")'></td></tr>"+
        "<tr><td align='right' style='white-space:nowrap;'>mobile scale </td><td align='left'><input id='mobile_scale' class='input_text' onchange='this.value=correct_value(this.value,true)' value='"+((story_script.parameters.scale)?story_script.parameters.scale:1)+"' type='text'></td></tr>"+
        "<tr><td align='right' style='white-space:nowrap;'>dialog speed </td><td align='left'><input id='dialog_speed_s' onchange='this.value=parseInt(correct_value(this.value,true))' class='input_text' value='"+((story_script.parameters.text_panel.dialog_speed)?story_script.parameters.text_panel.dialog_speed:'')+"' type='text'></td></tr>"+
        "<tr><td align='right' style='white-space:nowrap;'>screen size </td><td align='left' style='height:29px;'><select id='set_aspect_ratio' style='height:28px;width:"+((sar)?"80px":"100%")+";display:inline;' oninput='let r=this.selectedIndex==1;tue_aspect_ratio.checked=r;this.style.width=(r)?\"80px\":\"100%\";this.nextElementSibling.style.display=(r)?\"inline-grid\":\"none\";let d=(r)?\"table-row\":\"none\";scol.style.display=d;sima.style.display=d;if(r&&!story_script.parameters.resolutions){screen_w.value=800;screen_h.value=600;}'><option value=0>Adaptive</option><option value=1 "+((sar)?"selected":"")+">Fixed</option></select><div style='width:calc(100% - 80px);display:"+((sar)?"inline-grid":"none")+"; grid-template-columns:auto auto auto auto;grid-column-gap:8px;justify-content:center;align-items:center;  '>W<input id='screen_w' class='input_text' style='height:27px;' value='"+((story_script.parameters.resolutions)?story_script.parameters.resolutions[0]:"")+"' type='text'>H<input id='screen_h' class='input_text' style='height:27px;' value='"+((story_script.parameters.resolutions)?story_script.parameters.resolutions[1]:"")+"' type='text'></div>  </td></tr>"+
        "<tr id='scol' style='display:"+((sar)?"table-row":"none")+";'><td align='right' style='white-space:nowrap;'>screen color </td><td align='left' style='height:29px;'><input id='screen_color' class='input_text' value='"+((story_script.parameters.resolutions)?story_script.parameters.resolutions[2]:'#000')+"' type='text' onchange=''></td><td style='width:14px;cursor:pointer;' class='icon icon_color' onclick='edit_color(\"screen_color\",screen_color.value)'></td></tr>"+
        "<tr id='sima' style='display:"+((sar)?"table-row":"none")+";'><td align='right' style='white-space:nowrap;'>screen image </td><td align='left' style='height:29px;'><input id='screen_image' class='input_text' value='"+((story_script.parameters.resolutions)?story_script.parameters.resolutions[3]:'')+"' type='text'></td><td style='width:14px;cursor:pointer;' class='icon icon_load' onclick='file_catalog(this.id,\"img\",\"screen_image\",0)'></td></tr>"+
        "<tr><td align='right'>font family </td><td align='left'><input id='font' class='input_text' value='"+((story_script.parameters.font)?story_script.parameters.font :'')+"' type='text'></td></tr><tr><td align='right' style='white-space:nowrap;'>font size </td><td align='left'><input id='font_size' class='input_text' onchange='this.value=correct_value(this.value)' value='"+((story_script.parameters.font_size)?story_script.parameters.font_size:'')+"' type='text'></td></tr>"+
        "<tr><td align='right' style='white-space:nowrap;'>icon </td><td align='left'><input id='icon' class='input_text' value='"+((story_script.parameters.icon)?story_script.parameters.icon :'')+"' type='text'></td><td id='l_icon' style='width:14px;cursor:pointer;' class='icon icon_load' onclick='file_catalog(this.id,\"img\",\"icon\",0,\"story_script.parameters.icon\")'></td></tr>"+
        ((story_script.parameters.telegram && story_script.parameters.telegram.length>0)?"<tr><td align='right' style='white-space:nowrap;'>telegram token</td><td align='left'><input id='telegram_token' class='input_text' value='"+story_script.parameters.telegram+"' type='text'></td><td></td></tr>":"")+
        "<tr><td height='20px' style='white-space:nowrap;'></td><td></td></tr>"+
        "<tr><td align='right' style='white-space:nowrap;'>Auto save </td><td align='left' style='padding-top:4px;width:60%;'><table style='width:100%'><tbody><tr><td><label class='switchbox'><input type='checkbox' id='autosave' "+((story_script.parameters.autosave)?'checked':'')+"><span class='toggle round'></span></label>"+
        "</td><td align='right' style='white-space:nowrap;'>Clear all save:</td></tr></tbody></table></td><td onclick=\"localStorage.clear();toast('LocalStorage cleared');\" style='width:40px;cursor:pointer;' title='clear autosave' class='icon icon_del'></td></tr>"+
        "<tr><td align='right' style='white-space:nowrap;'>Pixel mode </td><td align='left' style='padding-top:4px;width:60%;'><table style='width:100%'><tbody><tr><td><label class='switchbox'><input type='checkbox' id='pixelmode' "+((story_script.parameters.pixelmode)?'checked':'')+"><span class='toggle round'></span></label>"+
        "</td><td align='right'></td></tr></tbody></table></td><td></td></tr>"+
        "</table></div>"+
        //
        "<div id='blank_3' style='visibility:hidden;white-space:nowrap;' class='set_blank'><table style='width:100%;border-spacing:10px;border-collapse:separate;'><tbody>"+
        "<tr><td align='right'>Next </td><td align='left'><input id='key_next' class='input_text' onkeyup='this.value=event.code;' value='"+((story_script.parameters.key.next)?story_script.parameters.key.next :'')+"' type='text'></td><td class='icon icon_clear' onclick='key_next.value=\"\"'><div style='display:block;width:40px;'></div></td></tr>"+
        "<tr><td align='right'>Back </td><td align='left'><input id='key_back' class='input_text' onkeyup='this.value=event.code;' value='"+((story_script.parameters.key.back)?story_script.parameters.key.back :'')+"' type='text'></td><td class='icon icon_clear' onclick='key_back.value=\"\"'></td></tr>"+
        "<tr><td align='right'>Save stage</td><td align='left'><input id='key_save' class='input_text' onkeyup='this.value=event.code;' value='"+((story_script.parameters.key.save)?story_script.parameters.key.save :'')+"' type='text'></td><td class='icon icon_clear' onclick='key_save.value=\"\"'></td></tr>"+
        "<tr><td align='right'>Load stage</td><td align='left'><input id='key_load' class='input_text' onkeyup='this.value=event.code;' value='"+((story_script.parameters.key.load)?story_script.parameters.key.load :'')+"' type='text'></td><td class='icon icon_clear' onclick='key_load.value=\"\"'></td></tr>"+
        "<tr><td align='right'>Full screen</td><td align='left'><input id='key_full_screen' class='input_text' onkeyup='this.value=event.code;' value='"+((story_script.parameters.key.full_screen)?story_script.parameters.key.full_screen :'')+"' type='text'></td><td class='icon icon_clear' onclick='key_full_screen.value=\"\"'></td></tr>"+
        "<tr><td align='right'>Skip dialogues</td><td align='left'><input id='key_fast_rewind' class='input_text' onkeyup='this.value=event.code;' value='"+((story_script.parameters.key.fast_rewind)?story_script.parameters.key.fast_rewind :'')+"' type='text'></td><td class='icon icon_clear' onclick='key_fast_rewind.value=\"\"'></td></tr>"+
        "<tr><td align='right'>Start block</td><td align='left'><input id='key_launch_story' class='input_text' onkeyup='this.value=event.code;' value='"+((story_script.parameters.key.launch_story)?story_script.parameters.key.launch_story :'')+"' type='text'></td><td class='icon icon_clear' onclick='key_launch_story.value=\"\"'></td></tr>"+
        "<tr><td align='right'>Load autosave</td><td align='left' style='width:60%;'><input id='key_load_autosave' class='input_text' onkeyup='this.value=event.code;' value='"+((story_script.parameters.key.load_autosave)?story_script.parameters.key.load_autosave :'')+"' type='text'></td><td class='icon icon_clear' onclick='key_load_autosave.value=\"\"' style='width:40px;'></td></tr>"+
        "</tbody></table></div>"+
        //
        "<div id='blank_1' style='visibility:hidden;' class='set_blank'>"+title_list+"</div>"+
        "<div id='blank_4' style='visibility:hidden;white-space:nowrap;' class='set_blank'><p style='border-radius:8px;white-space:normal;margin:10px 0 0 10px;' class='text_tutorials_a select_tutorials'>"+texts.tutorials[14].en+"</p>"+var_list+"</div>"+
        "<div id='blank_6' style='visibility:hidden;' class='set_blank'>"+sound_list+"</div>"+
        "<div id='blank_2' style='visibility:hidden;' class='set_blank'>"+chars_list()+"</div>"+
        "<div id='blank_8' style='visibility:hidden;' class='set_blank'>"+font_list+"</div>"+
        //
        "<div id='blank_9' style='visibility:hidden;' class='set_blank'><br><p align='left' style=' margin-left:8px;'>Devices control</p><hr><form id='devices'><table id='controll' style='width:100%;border-spacing:10px;border-collapse:separate;'>"+
        "<tr><td align='right' style='padding-top:4px;height:40px;'><input type='radio' name='devices' class='chec_plugin checkbox_a' "+((setup_editor.wheel==true)?'checked' :'')+"></td><td align='left' style='width:80px;'>Mouse </td><td> scrolling with the mouse cursor, zooming with the wheel</td></tr>"+
        "<tr><td align='right' style='padding-top:4px;height:40px;'><input type='radio' name='devices' class='chec_plugin checkbox_a' "+((setup_editor.wheel==false)?'checked' :'')+"></td><td align='left' style='width:80px;'>TouchPad </td><td> swipe scrolling is recommended for Laptops and MacBooks</td></tr>"+
        "</tbody></table></form><br>"+
        "<p align='left' style='margin-left:8px;'>Preview window size</p><hr>"+
        "<table style='width:100%;border-spacing:10px;border-collapse:separate;'><tbody>"+
        "<tr><td align='right'>Width</td><td align='left' colspan='2'><input id='pv_v' class='input_text' value='"+setup_editor.pvw[0]+"' type='text'></td></tr>"+
        "<tr><td align='right'>Height</td><td align='left' colspan='2'><input id='pv_h' class='input_text' value='"+setup_editor.pvw[1]+"' type='text'></td></tr>"+
        "</tbody></table><br>"+
        "<p align='left' style=' margin-left:8px;'>Display script</p><hr><table id='controll' style='width:100%;border-spacing:10px;border-collapse:separate;'><tbody>"+
        "<tr><td align='right' style='padding-top:4px;height:40px;'><label class='switchbox'><input type='checkbox' id='all_lines' class='chec_plugin' "+((setup_editor.lines)?'checked' :'')+"><span class='toggle round'></span></label></td><td align='left' style='width:90px;'>Show all lines </td><td> show all lines of a block or only a selected block</td></tr>"+
        "<tr><td align='right' style='padding-top:4px;height:40px;'><label class='switchbox'><input type='checkbox' id='ani_lines' class='chec_plugin' "+((setup_editor.lines_anim)?'checked' :'')+"><span class='toggle round'></span></label></td><td align='left' style='width:90px;'>line animation </td><td> animate lines from element to next block</td></tr>"+
        "</tbody></table><br>"+
        "<p align='left' style='margin-left:8px;'>Light them</p><hr><form id='ui_color'>"+thems+
        "</form><br>"+
        "<p align='left' style='margin-left:8px;'>Background</p><hr><form id='bg_edit'><table style='width:100%;'><tbody><tr>"+
        "<td align='center' height='92px'><input type='radio' name='bg_edit' class='chec_bg' value='' "+((setup_editor.fon=='')?'checked' :'')+"></td>"+
        "<td align='center'><input type='radio' name='bg_edit' class='chec_bg bg_1' value='bg_1' "+((setup_editor.fon=='bg_1')?'checked' :'')+"></td>"+
        "<td align='center'><input type='radio' name='bg_edit' class='chec_bg bg_2' value='bg_2' "+((setup_editor.fon=='bg_2')?'checked' :'')+"></td>"+
        "<td align='center'><input type='radio' name='bg_edit' class='chec_bg bg_8' value='bg_8' "+((setup_editor.fon=='bg_8')?'checked' :'')+"></td></tr><tr>"+
        "<td align='center' height='92px'><input type='radio' name='bg_edit' class='chec_bg bg_4' value='bg_4' "+((setup_editor.fon=='bg_4')?'checked' :'')+"></td>"+
        "<td align='center'><input type='radio' name='bg_edit' class='chec_bg bg_5' value='bg_5' "+((setup_editor.fon=='bg_5')?'checked' :'')+"></td>"+
        "<td align='center'><input type='radio' name='bg_edit' class='chec_bg bg_6' value='bg_6' "+((setup_editor.fon=='bg_6')?'checked' :'')+"></td>"+
        "<td align='center'><input type='radio' name='bg_edit' class='chec_bg bg_3' value='bg_3' "+((setup_editor.fon=='bg_3')?'checked' :'')+"></td></tr><tr>"+
        "<td align='center' height='92px'><input type='radio' name='bg_edit' class='chec_bg bg_7' value='bg_7' "+((setup_editor.fon=='bg_7')?'checked' :'')+"></td>"+
        "<td align='center'><input type='radio' name='bg_edit' class='chec_bg bg_9' value='bg_9' "+((setup_editor.fon=='bg_9')?'checked' :'')+"></td>"+
        "<td align='center'><input type='radio' name='bg_edit' class='chec_bg bg_0' value='bg_0' "+((setup_editor.fon=='bg_0')?'checked' :'')+"></td>"+
        "<td align='center'><input type='radio' name='bg_edit' class='chec_bg bg_d' value='bg_d' "+((setup_editor.fon=='bg_d')?'checked' :'')+"></td></tr><tr>"+
        "<td align='center' height='92px'><input type='radio' name='bg_edit' class='chec_bg bg_b' value='bg_b' "+((setup_editor.fon=='bg_b')?'checked' :'')+"></td>"+
        "<td align='center'><input type='radio' name='bg_edit' class='chec_bg bg_c' value='bg_c' "+((setup_editor.fon=='bg_c')?'checked' :'')+"></td>"+
        "<td align='center'><input type='radio' name='bg_edit' class='chec_bg bg_a' value='bg_a' "+((setup_editor.fon=='bg_a')?'checked' :'')+"></td>"+
        "<td align='center'><input type='radio' name='bg_edit' class='chec_bg bg_e' value='bg_e' "+((setup_editor.fon=='bg_e')?'checked' :'')+"></td></tr></tbody></table></form></div>"+
        //
        "<div id='blank_7' style='visibility:hidden;' class='set_blank'>"+plugins_show+"<br>"+addon_list+"</div>"+
        //
        "<div id='blank_5' style='visibility:hidden;white-space:nowrap;' class='set_blank'><p style='margin:10px;border-radius:8px;white-space:normal;' class='text_tutorials_a select_tutorials'>"+texts.tutorials[13].en+"</p><table style='width:100%;margin-left:10px;'><tbody>"+
        "<td style='height:40px;padding-right:10px;' align='right'>Main cursor </td><td><input id='cur_m' class='cur_i input_text' value='"+((story_script.parameters.cursors&&story_script.parameters.cursors.main)?story_script.parameters.cursors.main[0]:"")+"' type='text'></td><td style='width:48px;cursor:pointer;' class='icon icon_load' onclick='file_catalog(\"cur_m\",\"img\",\"cur_m\",0)'></td><td>OffSet X</td><td><input style='width:28px;' class='cur_x input_text' value='"+((story_script.parameters.cursors&&story_script.parameters.cursors.main)?story_script.parameters.cursors.main[1]:0)+"' type='text'></td><td>Y</td><td><input style='width:38px;' class='cur_y input_text' value='"+((story_script.parameters.cursors&&story_script.parameters.cursors.main)?story_script.parameters.cursors.main[2]:0)+"' type='text'></td></tr><tr>"+
        "<td style='height:40px;padding-right:10px;' align='right'>Button cursor</td><td><input id='cur_b' class='cur_i input_text' value='"+((story_script.parameters.cursors&&story_script.parameters.cursors.button)?story_script.parameters.cursors.button[0]:"")+"' type='text'></td><td style='width:48px;cursor:pointer;' class='icon icon_load' onclick='file_catalog(\"cur_b\",\"img\",\"cur_b\",0)'></td><td>OffSet X</td><td><input style='width:28px;' class='cur_x input_text' value='"+((story_script.parameters.cursors&&story_script.parameters.cursors.button)?story_script.parameters.cursors.button[1]:0)+"' type='text'></td><td>Y</td><td><input style='width:38px;' class='cur_y input_text' value='"+((story_script.parameters.cursors&&story_script.parameters.cursors.button)?story_script.parameters.cursors.button[2]:0)+"' type='text'></td></tr><tr>"+
        "<td style='height:40px;padding-right:10px;' align='right'>Choice cursor</td><td><input id='cur_c' class='cur_i input_text' value='"+((story_script.parameters.cursors&&story_script.parameters.cursors.choice)?story_script.parameters.cursors.choice[0]:"")+"' type='text'></td><td style='width:48px;cursor:pointer;' class='icon icon_load' onclick='file_catalog(\"cur_c\",\"img\",\"cur_c\",0)'></td><td>OffSet X</td><td><input style='width:28px;' class='cur_x input_text' value='"+((story_script.parameters.cursors&&story_script.parameters.cursors.choice)?story_script.parameters.cursors.choice[1]:0)+"' type='text'></td><td>Y</td><td><input style='width:38px;' class='cur_y input_text' value='"+((story_script.parameters.cursors&&story_script.parameters.cursors.choice)?story_script.parameters.cursors.choice[2]:0)+"' type='text'></td>"+
        "</tr></tbody></table>"+add_gamepad()+"</div>"+
        //
        "</td></tr>"+
        "<tr><td id='set_1' onclick='set_menu(1)' align='right' class='set_button'>Languages</td></tr>"+
        "<tr><td id='set_2' onclick='set_menu(2)' align='right' class='set_button'>Characters</td></tr>"+
        "<tr><td id='set_3' onclick='set_menu(3)' align='right' class='set_button'>Keyboard</td></tr>"+
        "<tr><td id='set_4' onclick='set_menu(4)' align='right' class='set_button'>Variables</td></tr>"+
        "<tr><td id='set_5' onclick='set_menu(5)' align='right' class='set_button'>Cursors</td></tr>"+
        "<tr><td id='set_6' onclick='set_menu(6)' align='right' class='set_button'>Sounds</td></tr>"+
        "<tr><td id='set_7' onclick='set_menu(7)' align='right' class='set_button'>Add-on</td></tr>"+
        "<tr><td id='set_8' onclick='set_menu(8)' align='right' class='set_button'>Fonts</td></tr>"+
        "<tr><td id='set_9' onclick='set_menu(9)' align='right' class='set_button' style='border-radius:0 0 0 16px;padding-left:20px;'>Editor</td></tr>"+
        "<tr><td style='border-right:1px solid var(--cb);'></td></tr></tbody></table><br><table class='big_button' width='256px' onclick='apply_setup()'><tbody><tr><td width='42px' class='icon icon_ok'></td><td align='center'>Apply</td><td width='42px'></td></tr></tbody></table></div>"
    modal_window("open",html);
}
function chars_list(){
    var chars_list='';
    if(!story_script.parameters.characters){story_script.parameters.characters={}}
    if(story_script.parameters.characters){
        var arr_s=story_script.parameters.characters
        for(var i=0;i<Object.keys(arr_s).length;i++){
            chars_list+="<table class='ui_buttons dialog' style='width:calc(100% - 16px);margin:8px;border-spacing:4px;border-collapse:separate;'><tbody>"
            +"<tr><td colspan='3' align='center'><table style='height:22px;width:100%;'><tbody><tr>"
                +"<td width='20px'></td>"
                +"<td width='24px'></td>"
                +"<td></td>"
                +"<td width='32px' class='icon_m icon_copu' title='duplicate' onclick='story_script.parameters.characters."+Object.keys(arr_s)[i]+"_copu=JSON.parse(JSON.stringify(story_script.parameters.characters."+Object.keys(arr_s)[i]+"));chars_list_update();'></td>"
                +"<td width='32px' class='icon icon_del' title='delete' style='cursor:pointer;' onclick='delete story_script.parameters.characters."+Object.keys(arr_s)[i]+";chars_list_update();'></td>"
            +"</tr></tbody></table></td></tr>"
            for(var l=0;l<story_script.parameters.languares.length;l++){chars_list+="<tr><td align='right' style='white-space:nowrap;width:30px;'>Name "+story_script.parameters.languares[l].toUpperCase()+"</td><td><input class='input_text' onchange='story_script.parameters.characters."+Object.keys(arr_s)[i]+"."+story_script.parameters.languares[l]+"=this.value' value='"+((arr_s[Object.keys(arr_s)[i]][story_script.parameters.languares[l]])?arr_s[Object.keys(arr_s)[i]][story_script.parameters.languares[l]]:"")+"' type='text'></td><td width='20px'></td></tr>"}
            chars_list+="<tr><td align='right' style='white-space:nowrap;'>Color panel</td><td><input id='color_panel"+Object.keys(arr_s)[i]+"' class='input_text' onchange='story_script.parameters.characters."+Object.keys(arr_s)[i]+".color=this.value' value='"+((arr_s[Object.keys(arr_s)[i]].color)?arr_s[Object.keys(arr_s)[i]].color:"")+"' type='text'></td><td style='width:40px;cursor:pointer;' class='icon icon_color' onclick='edit_color(\"color_panel"+Object.keys(arr_s)[i]+"\",color_panel"+Object.keys(arr_s)[i]+".value)'></td></tr>"
            +"<tr><td align='right' style='white-space:nowrap;'>Color text</td><td><input id='color_text"+Object.keys(arr_s)[i]+"' class='input_text' onchange='story_script.parameters.characters."+Object.keys(arr_s)[i]+".color_text=this.value' value='"+((arr_s[Object.keys(arr_s)[i]].color_text)?arr_s[Object.keys(arr_s)[i]].color_text:"")+"' type='text'></td><td style='width:40px;cursor:pointer;' class='icon icon_color' onclick='edit_color(\"color_text"+Object.keys(arr_s)[i]+"\",color_text"+Object.keys(arr_s)[i]+".value)'></td></tr>"
            +"<tr><td align='right' style='white-space:nowrap;'>Art panel</td><td><input id='art_panel"+Object.keys(arr_s)[i]+"' class='input_text' onchange='story_script.parameters.characters."+Object.keys(arr_s)[i]+".art=this.value' value='"+((arr_s[Object.keys(arr_s)[i]].art)?arr_s[Object.keys(arr_s)[i]].art:"")+"' type='text'></td><td style=''width:40px;cursor:pointer;' class='icon icon_load' onclick=\"file_catalog('','img','art_panel"+Object.keys(arr_s)[i]+"','','story_script.parameters.characters."+Object.keys(arr_s)[i]+".art')\"></td></tr>"
            +"<tr><td align='right' style='white-space:nowrap;'>Style panel</td><td><input class='input_text' onchange='story_script.parameters.characters."+Object.keys(arr_s)[i]+".style=this.value' value='"+((arr_s[Object.keys(arr_s)[i]].style)?arr_s[Object.keys(arr_s)[i]].style:"")+"' type='text'></td><td width='20px'></td></tr>"
            +"<tr><td align='right' style='white-space:nowrap;'>Class name</td><td><input class='input_text' onchange='story_script.parameters.characters."+Object.keys(arr_s)[i]+".className=this.value' value='"+((arr_s[Object.keys(arr_s)[i]].className)?arr_s[Object.keys(arr_s)[i]].className:"")+"' type='text'></td><td width='20px'></td></tr>"
            +"</tbody></table>"
        }
    } return chars_list+"<div onclick='story_script.parameters.characters.char"+Object.keys(story_script.parameters.characters).length+"={};chars_list_update();' class='icon icon_add' style='margin:16px 0 0 45%;height:26px;width:26px;cursor:pointer;'></div>";
}
function chars_list_update(){blank_2.innerHTML=chars_list();}
function set_menu(name){
    var li=document.getElementsByClassName("set_button");
    for(var i=0;i<li.length;i++){
        if(i==name){
            li[i].className='set_button set_select'
            document.getElementById('blank_'+i).style.visibility='visible';
        }else{
            li[i].className='set_button'
            document.getElementById('blank_'+i).style.visibility='hidden';
        }
    }
}
function add_tr(id){
    var tbody=document.getElementById(id).getElementsByTagName('tbody')[0];
    var row=document.createElement("tr"),td1=document.createElement("td"),td2=document.createElement("td"),td3=document.createElement("td"),td4=document.createElement("td");
    if(id=='var_title'||id=='new_title'){
        td1.innerHTML="<select class='title_lang'>"+big_languares()+"</select>";
        td1.style="padding-right:8px;border-right:1px solid var(--cb);width:40%;padding-top:10px;";
        td2.innerHTML="<input class='title_name input_text' value='"+languare_data(story_script.parameters.title)+"' style='padding-top:10px;' type='text' placeholder='translated title'>";
    }else if(id=='var_tablet'){
        td1.innerHTML="<input class='var_name input_text' value='variable"+(tbody.getElementsByTagName('tr').length+1)+"' placeholder='name variable' onchange='this.value=correct_name(this.value)' style='padding-top:10px;' type='text'>";
        td1.style="padding-right:8px;border-right:1px solid var(--cb);width:40%;";
        td2.innerHTML="<input class='var_vol input_text' style='padding-top:10px;' type='text' placeholder='value'>";
    }else if(id=='var_sounds'){
        td1.innerHTML="<input class='sound_name input_text' value='Sound"+(tbody.getElementsByTagName('tr').length+1)+"' placeholder='name sound' style='padding-top:10px;' type='text'>";
        td1.style="padding-right:8px;border-right:1px solid var(--cb);width:40%;";
        td2.innerHTML="<input id='sound"+(tbody.getElementsByTagName('tr').length+1)+"' class='sound_path input_text' style='padding-top:10px;' type='text' placeholder='path to audio file'>";
    }else if(id=='var_fonts'){
        td1.innerHTML="<input class='font_name input_text' value='NameFont"+(tbody.getElementsByTagName('tr').length+1)+"' placeholder='name font' style='padding-top:10px;' type='text'>";
        td1.style="padding-right:8px;border-right:1px solid var(--cb);width:40%;";
        td2.innerHTML="<input id='font"+(tbody.getElementsByTagName('tr').length+1)+"' class='font_path input_text' style='padding-top:10px;' type='text' placeholder='path to font file'>";
        td4.style="width:32px;cursor:pointer;";
        td4.className="icon icon_load";
        td4.setAttribute("onclick","file_catalog('',\"font\",\"font"+(tbody.getElementsByTagName('tr').length+1)+"\",0)");
    }
    td3.style="width:40px;cursor:pointer;";
    td3.title="delet";
    td3.className="icon icon_del";
    td3.setAttribute("onclick","var a=this.closest('tr');a.parentElement.removeChild(a);");
    row.appendChild(td1);
    row.appendChild(td2);
    if(id=='var_fonts'){row.appendChild(td4);}
    row.appendChild(td3);
    tbody.appendChild(row);
}
function add_addon(){
    var tbody=document.getElementById('var_addon').getElementsByTagName('tbody')[0];
    var row_lenght=document.getElementById('var_addon').getElementsByTagName('tbody')[0].getElementsByTagName('tr').length;
    var row=document.createElement("tr"),td1=document.createElement("td"),td3=document.createElement("td"),td4=document.createElement("td");
    td1.innerHTML="<input id='plugin"+row_lenght+"' class='addon_path input_text' placeholder='path to plugin js file' type='text'>";
    td1.style="padding-right:8px;padding-left:8px;width:calc(100% - 14px);padding-top:10px;";
    td3.style="width:32px;cursor:pointer;";
    td3.className="icon icon_load";
    td3.setAttribute("onclick","file_catalog(this.id,\"js\",\"plugin"+row_lenght+"\",0)");
    td4.style="width:32px;cursor:pointer;";
    td4.title="delet";
    td4.className="icon icon_del";
    td4.setAttribute("onclick","var a=this.closest('tr');a.parentElement.removeChild(a);");
    row.appendChild(td1);
    row.appendChild(td3);
    row.appendChild(td4);
    tbody.appendChild(row);
}
function apply_setup(){
    var i,li_n,li_v,forms;
    story_script.parameters.launch_story=launch_story.value
    story_script.parameters.style_file=style_file.value
    story_script.parameters.icon=icon.value
    story_script.parameters.autosave=autosave.checked
    if(set_aspect_ratio.selectedIndex==1){story_script.parameters.resolutions=[parseInt(screen_w.value),parseInt(screen_h.value),screen_color.value,screen_image.value]}else{delete story_script.parameters.resolutions}
    if(pixelmode.checked){story_script.parameters.pixelmode=true}else{delete story_script.parameters.pixelmode}
    if(mobile_scale.value!="1"){story_script.parameters.scale=mobile_scale.value}else{delete story_script.parameters.scale}
    if(key_next.value.length>0){story_script.parameters.key.next=key_next.value}else{delete story_script.parameters.key.next}
    if(key_back.value.length>0){story_script.parameters.key.back=key_back.value}else{delete story_script.parameters.key.back}
    if(key_save.value.length>0){story_script.parameters.key.save=key_save.value}else{delete story_script.parameters.key.save}
    if(key_load.value.length>0){story_script.parameters.key.load=key_load.value}else{delete story_script.parameters.key.load}
    if(key_full_screen.value.length>0){story_script.parameters.key.full_screen=key_full_screen.value}else{delete story_script.parameters.key.full_screen}
    if(key_fast_rewind.value.length>0){story_script.parameters.key.fast_rewind=key_fast_rewind.value}else{delete story_script.parameters.key.fast_rewind}
    if(key_launch_story.value.length>0){story_script.parameters.key.launch_story=key_launch_story.value}else{delete story_script.parameters.key.launch_story}
    if(key_load_autosave.value.length>0){story_script.parameters.key.load_autosave=key_load_autosave.value}else{delete story_script.parameters.key.load_autosave}
    if(story_script.parameters.gamepad){
        story_script.parameters.gamepad.cursor[0]=gamepad_image.value;
        story_script.parameters.gamepad.cursor[3]=gamepad_width.value;
        story_script.parameters.gamepad.cursor[4]=gamepad_height.value;
        story_script.parameters.gamepad.cursor[2]=gamepad_left.value;
        story_script.parameters.gamepad.cursor[1]=gamepad_top.value;
        story_script.parameters.gamepad.cursor[5]=gamepad_style.value;
        story_script.parameters.gamepad.cursor[6]=gamepad_class.value;
    }
    story_script.parameters.font=font.value
    story_script.parameters.font_size=correct_value(font_size.value)
    story_script.parameters.text_panel.dialog_speed=dialog_speed_s.value
    if(story_script.parameters.telegram){story_script.parameters.telegram=telegram_token.value}
    //
    forms=document.forms.devices;
    setup_editor.wheel=(forms[0].checked)?true:false;
    setup_editor.lines=all_lines.checked;
    setup_editor.lines_anim=ani_lines.checked;
    setup_editor.pvw=[pv_v.value,pv_h.value];
    forms=document.forms.bg_edit;
    for(i=0;i<forms.length;i++){if(forms[i].checked){setup_editor.fon=forms[i].value;break;}}
    forms=document.forms.ui_color;
    for(i=0;i<forms.length;i++){if(forms[i].checked){setup_editor.ui=forms[i].value;if(setup_editor.ui==0){set_ui(0)};break;}}
    editor_setup();
    localStorage.setItem("editor_setup",JSON.stringify(setup_editor));
    //
    li_n=document.getElementsByClassName("var_name");
    li_v=document.getElementsByClassName("var_vol");
    story_script.parameters.variables={};
    for(i=0;i<li_n.length;i++){
        if(li_n[i].value!=""){
            if(parseFloat(li_v[i].value)==li_v[i].value){story_script.parameters.variables[correct_name(li_n[i].value)]=parseFloat(li_v[i].value)}
            else{story_script.parameters.variables[correct_name(li_n[i].value)]=li_v[i].value}
        }
    }
    li_n=document.getElementsByClassName("font_name");
    li_v=document.getElementsByClassName("font_path");
    story_script.parameters.font_files={};
    for(i=0;i<li_n.length;i++){if(li_n[i].value!=""){ story_script.parameters.font_files[li_n[i].value]=li_v[i].value}}
    li_n=document.getElementsByClassName("sound_name");
    li_v=document.getElementsByClassName("sound_path");
    story_script.parameters.sounds={};
    for(i=0;i<li_n.length;i++){if(li_n[i].value!=""){ story_script.parameters.sounds[li_n[i].value]=li_v[i].value}}
    li_n=document.getElementsByClassName("cur_y");
    li_v=document.getElementsByClassName("cur_x");
    forms=document.getElementsByClassName("cur_i");
    story_script.parameters.cursors={};
    if(forms[0].value!=''){story_script.parameters.cursors.main  =[forms[0].value,li_v[0].value,li_n[0].value];}
    if(forms[1].value!=''){story_script.parameters.cursors.button=[forms[1].value,li_v[1].value,li_n[1].value];}
    if(forms[2].value!=''){story_script.parameters.cursors.choice=[forms[2].value,li_v[2].value,li_n[2].value];}
    if(Object.keys(story_script.parameters.cursors).length==0){delete story_script.parameters.cursors}
    li_n=document.getElementsByClassName("title_lang");
    li_v=document.getElementsByClassName("title_name");
    story_script.parameters.title={};story_script.parameters.languares=[];languare=li_n[0].value;
    for(i=0;i<li_n.length;i++){
        var dl=document.getElementById('default_language');
        story_script.parameters.title[li_n[i].value]=li_v[i].value;
        if(dl&&dl.value==li_n[i].value){story_script.parameters.languares.unshift(li_n[i].value)}
        else {story_script.parameters.languares.push(li_n[i].value);}
    }
    data_only(story_script.parameters,'title');
    li_v=document.getElementsByClassName("chec_plugin");
    story_script.parameters.plugins=[];
    for(i=0;i<li_v.length;i++){
        if(li_v[i].checked&&plugins_list[li_v[i].id] ){
            story_script.parameters.plugins.push(li_v[i].id);
            if(li_v[i].id=="game_pad"&&!story_script.parameters.gamepad){story_script.parameters.gamepad = {"cursor": ["","50%","-24px","24px","24px","border-radius:50%;background-color:#000;",""]}}
            else if(li_v[i].id=="tue_aspect_ratio"&&!story_script.parameters.resolutions){story_script.parameters.resolutions = [800,600,"#000",""]}
        }
    }
    li_v=document.getElementsByClassName("addon_path");
    for(i=0;i<li_v.length;i++){if(li_v[i].value!=""){story_script.parameters.plugins.push(li_v[i].value);}}
    lang_select();
    update_novel();
    modal_window('close');
    toast("Parameters updated");
}
var scale=1;
var scale_scene=1;
document.addEventListener('keydown',function(event){
    let elem=document.getElementsByClassName("code_text")[0];
    if(elem&&event.key=='Tab'){
        event.preventDefault()
        let start=elem.selectionStart,end=elem.selectionEnd;
        elem.value=elem.value.substring(0,start)+"\t"+elem.value.substring(end);
        elem.selectionStart=elem.selectionEnd=start+1;
        code_edit(elem,elem.previousElementSibling,last_code);
    }
    if(event.altKey){
        if(!scroll_block||scene_screen){
            if(event.code=='Equal'){world_scale(2)}
            else if(event.code=='Minus'){world_scale(false)}
            else if(event.code=='Digit0'){world_scale(1)}
            else if(scene_screen&&event.code=='Comma'){scen_editor(scen_data[0],scen_data[1],scen_data[2]-1)}
            else if(scene_screen&&event.code=='Period'){scen_editor(scen_data[0],scen_data[1],scen_data[2]+1)}
        }
        if(event.code=='KeyR'){play_novel();}
    }else if(document.activeElement.tagName!="TEXTAREA"&&document.activeElement.tagName!="PRE"&&event.code=='Enter'&&!(event.altKey||event.shiftKey)){
        if(document.activeElement.tagName=="BODY"){
            if(add_element.style.visibility=="visible"){let b=add_element.getElementsByClassName("big_button");b[b.length-1].click();}
            else if(window_zone.style.visibility=="visible"){let b=window_zone.getElementsByClassName("big_button");b[b.length-1].click();}
        }else{document.activeElement.blur();}
    }else if(event.code=='Escape'){
        if(add_element.style.visibility=="visible"){menu_add.style.visibility='hidden';}
        else if(window_zone.style.visibility=="visible"){modal_window("close");synth.cancel();}
    }
});
var scene_screen=false
var scroll_xs=null;
var scroll_ys=null;
function scene_z(){
    scroll_xs=((scene_view.scrollTop+(scene_view.clientHeight/2))/scale_scene)-(scene_view.clientHeight/2);
    scroll_ys=((scene_view.scrollLeft+(scene_view.clientWidth/2))/scale_scene)-(scene_view.clientWidth/2);
}
function world_scale(s){
    if(scene_screen){
        scene_z();
        if(s==1){
            scale_scene=1;
            screen_preview.style.transform='scale(1)';
            scene_canvas.style.transform='scale(1)'
            screen_preview.style.width=(screen_size.value*2.5)+"px";
            screen_preview.style.height=(screen_size.value*2.5)+"px";
            screen_preview.style.backgroundSize="64px";
            scene_view.scrollTop=((scroll_xs+(scene_view.clientHeight/2))*scale_scene)-(scene_view.clientHeight/2);
            scene_view.scrollLeft=((scroll_ys+(scene_view.clientWidth/2))*scale_scene)-(scene_view.clientWidth/2);
        }else if(screen_size.value!=0){
            if(s==2){scale_scene=Math.min(2,scale_scene+0.05);scene_canvas.style.transform='scale('+scale_scene+')';}
            else{scale_scene=Math.max(0.25,scale_scene-0.05);scene_canvas.style.transform='scale('+scale_scene+')';}
            scene_view.scrollTop=((scroll_xs+(scene_view.clientHeight/2))*scale_scene)-(scene_view.clientHeight/2);
            scene_view.scrollLeft=((scroll_ys+(scene_view.clientWidth/2))*scale_scene)-(scene_view.clientWidth/2);
            screen_preview.style.width=(screen_size.value*2.5)*scale_scene+"px";
            screen_preview.style.height=(screen_size.value*2.5)*scale_scene+"px";
            screen_preview.style.backgroundSize=64*scale_scene+"px"
        }else{
            if(s==2){scale_scene=Math.min(2,scale_scene+0.05);screen_preview.style.transform='scale('+scale_scene+')';}
            else{scale_scene=Math.max(1,scale_scene-0.05);screen_preview.style.transform='scale('+scale_scene+')';}
            scene_view.scrollTop=((scroll_xs+(scene_view.clientHeight/2))*scale_scene)-(scene_view.clientHeight/2);
            scene_view.scrollLeft=((scroll_ys+(scene_view.clientWidth/2))*scale_scene)-(scene_view.clientWidth/2);
        }
    }else{
        scroll_z();
        menu_add.style.visibility='hidden';
        if(s==1){scale=1;world.style.transform='scale(1)';}
     else if(s==2){scale=Math.min(2,scale+0.05);world.style.transform='scale('+scale+')';}
        else{scale=Math.max(0.25,scale-0.05);world.style.transform='scale('+scale+')';}
        html.scrollTop=((scroll_xz+(html.clientHeight/2))*scale)-(html.clientHeight/2);
        html.scrollLeft=((scroll_yz+(html.clientWidth/2))*scale)-(html.clientWidth/2);
    }
}
function global_scripts(){
    var html="<div class='window' style='padding:0px;'><div class='win_head'>Project scripts<div class='window_close icon icon_close' onclick='modal_window(\"close\")'></div></div><hr style='margin:0px;'>"
        +'<table class="button" style="width:312px;margin:8px 8px;cursor:pointer;" onclick="modal_window(\'close\');jsonedit();"><tbody><tr><td width="48px" height="48px" class="icon icon_json"> </td><td align="left"><div style="width:264px;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;">JSON project</div></td></tr></tbody></table>'
        +'<table class="button" style="width:312px;margin:8px 8px;cursor:pointer;" onclick="modal_window(\'close\');if(!story_script.parameters.js){story_script.parameters.js=\'\'};edit_code(\'script_js\',\'JavaScript\');"><tbody><tr><td width="48px" height="48px" class="icon icon_js"> </td><td align="left"><div style="width:264px;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;">JavaScript code</div></td></tr></tbody></table>'
        +'<table class="button" style="width:312px;margin:8px 8px 9px 8px;cursor:pointer;" onclick="modal_window(\'close\');if(!story_script.parameters.css){story_script.parameters.css=\'\'};edit_code(\'script_css\',\'CSS Class\');"><tbody><tr><td width="48px" height="48px" class="icon icon_css"> </td><td align="left"><div style="width:264px;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;">CSS classes</div></td></tr></tbody></table>'
        +"</div>"
    modal_window("open",html);
}
function text_export(){
    if(!setup_editor.csv){setup_editor.csv=[decodeURI('%09'),decodeURI('%0D')]}
    var html="<div class='window' style='padding:0px;'><div class='win_head'>Dialogues & texts<div class='window_close icon icon_close' onclick='modal_window(\"close\")'></div></div><hr style='margin:0px;'>"
        +'<table class="button" style="width:312px;margin:8px 8px;cursor:pointer;" onclick="modal_window(\'close\');translation_edit();"><tbody><tr><td width="48px" height="48px" class="icon icon_replace"> </td><td align="left"><div style="width:264px;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;">Dialogue translation tool</div></td></tr></tbody></table>'
        +'<div style="margin:24px 0 8px 0;width:100%;">Export text to spreadsheet</div><hr style="margin:0px;">'
        +'<table style="width:312px;border-spacing:10px;border-collapse:separate;"><tbody><tr>'
        +'<td style="width:25%;height:48px;white-space:nowrap;" align="right">Separated:</td><td style="width:25%;">'
        +'<input class="input_text" onchange="if(this.value.length>0){setup_editor.csv[0]=encodeURI(this.value)}else{setup_editor.csv[0]=\'%09\'};localStorage.setItem(\'editor_setup\',JSON.stringify(setup_editor));" type="text" style="width:100%;height:28px" value='+decodeURI(setup_editor.csv[0])+'>'
        +'</td><td style="width:25%;white-space:nowrap;" align="right">Delimiter:</td><td style="width:25%;">'
        +'<input class="input_text" onchange="if(this.value.length>0){setup_editor.csv[1]=encodeURI(this.value)}else{setup_editor.csv[1]=\'%0D\'};localStorage.setItem(\'editor_setup\',JSON.stringify(setup_editor));" type="text" style="width:100%;height:28px" value='+decodeURI(setup_editor.csv[1])+'>'
        +'</td></tr></tbody></table>'
        +'<table class="button" style="width:312px;margin:8px 8px;cursor:pointer;" onclick="modal_window(\'close\');csv_export(\'csv\');"><tbody><tr><td width="48px" height="48px" class="icon icon_new"> </td><td align="left"><div style="width:264px;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;">'+texts.tutorials[11].en+'</div></td></tr></tbody></table>'
        +'<table class="button" style="width:312px;margin:8px 8px 9px 8px;cursor:pointer;" onclick="modal_window(\'close\');csv_export(\'tsv\');"><tbody><tr><td width="48px" height="48px" class="icon icon_new"> </td><td align="left"><div style="width:264px;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;">'+texts.tutorials[12].en+'</div></td></tr></tbody></table>'
        +"</div>"
    modal_window("open",html);
}
function csv_export(f){
    var n,i,d,l,r;
    var CSV='name'+setup_editor.csv[0];
    if(f=='csv'){
        setup_editor.csv[0]=decodeURI(setup_editor.csv[0]);
        setup_editor.csv[1]=decodeURI(setup_editor.csv[1]);
    }
    else if(f=='tsv'||f=='xls'){
        setup_editor.csv[0]='\t';
        setup_editor.csv[1]='\n';
    }
	for(i=0;i<story_script.parameters.languares.length;i++){CSV+=story_script.parameters.languares[i]+setup_editor.csv[0];}
	CSV+=setup_editor.csv[1]+'title'+setup_editor.csv[0];
	if(story_script.parameters.title[languare]){for(i=0;i<story_script.parameters.languares.length;i++){CSV+=story_script.parameters.title[story_script.parameters.languares[i]]+setup_editor.csv[0];}}
    else{CSV+=story_script.parameters.title}
	CSV+=setup_editor.csv[1];
    if(story_script.parameters.characters){ CSV+="characters"+setup_editor.csv[1];
        for(d=0;d<Object.keys(story_script.parameters.characters).length;d++){
            var k=Object.keys(story_script.parameters.characters)[d];CSV+=k+setup_editor.csv[0];
            for(i=0;i<story_script.parameters.languares.length;i++){
                CSV+=story_script.parameters.characters[k][story_script.parameters.languares[i]]+setup_editor.csv[0];
            }CSV+=setup_editor.csv[1];
        }CSV+=setup_editor.csv[1];
    }
    all_blocks=0;
    while(Object.keys(story_script)[all_blocks]){
		var k=Object.keys(story_script)[all_blocks]
		if(k!="parameters"&&k!="blocks"){
			CSV+=k+setup_editor.csv[1];
			for(var i=0;i<story_script[k].length;i++){
				if(story_script[k][i].dialogs){
					for(d=0;d<story_script[k][i].dialogs.length;d++){
						if(story_script[k][i].dialogs[d].text){
							CSV+=languare_data(story_script[k][i].dialogs[d].name)+setup_editor.csv[0];
							if(story_script[k][i].dialogs[d].text[languare]){for(let l=0;l<story_script.parameters.languares.length;l++){
                                if(typeof story_script[k][i].dialogs[d].text[story_script.parameters.languares[l]]==='string'){CSV+='"'+story_script[k][i].dialogs[d].text[story_script.parameters.languares[l]].replaceAll(setup_editor.csv[0],'').replaceAll('"','ˮ')+'"'+setup_editor.csv[0];}
                                else{CSV+=setup_editor.csv[0];}
                                }
                            }
                            else if(typeof story_script[k][i].dialogs[d].text==='string'){CSV+='"'+story_script[k][i].dialogs[d].text.replaceAll(setup_editor.csv[0],'').replaceAll('"','ˮ')+'"'+setup_editor.csv[0];}
							CSV+=setup_editor.csv[1];
						}else if(story_script[k][i].dialogs[d].text_add){
							CSV+=languare_data(story_script[k][i].dialogs[d].name)+setup_editor.csv[0];
							if(story_script[k][i].dialogs[d].text_add[languare]){for(let l=0;l<story_script.parameters.languares.length;l++){
                                if(typeof story_script[k][i].dialogs[d].text_add[story_script.parameters.languares[l]]==='string'){CSV+='"'+story_script[k][i].dialogs[d].text_add[story_script.parameters.languares[l]].replaceAll(setup_editor.csv[0],'').replaceAll('"','ˮ')+'"'+setup_editor.csv[0];}
                                else{CSV+=setup_editor.csv[0];}
                                }
                            }
							else if(typeof story_script[k][i].dialogs[d].text_add==='string'){CSV+='"'+story_script[k][i].dialogs[d].text_add.replaceAll(setup_editor.csv[0],'').replaceAll('"','ˮ')+'"'+setup_editor.csv[0];}
                            CSV+=setup_editor.csv[1];
						}if(story_script[k][i].dialogs[d].choice){
							for(r=0;r<story_script[k][i].dialogs[d].choice.length;r++){
								if(story_script[k][i].dialogs[d].choice[r].text){
									if(story_script[k][i].dialogs[d].choice[r].text[languare]){CSV+='choice '+setup_editor.csv[0];for(let l=0;l<story_script.parameters.languares.length;l++){
										if(story_script[k][i].dialogs[d].choice[r].text[story_script.parameters.languares[l]]){CSV+='"'+story_script[k][i].dialogs[d].choice[r].text[story_script.parameters.languares[l]].replaceAll(setup_editor.csv[0],'').replaceAll('"','ˮ')+'"'+setup_editor.csv[0];}
										else{CSV+=setup_editor.csv[1]}
									}CSV+=setup_editor.csv[1];}else if(typeof story_script[k][i].dialogs[d].choice[r].text==='string'){CSV+='choice '+setup_editor.csv[0]+story_script[k][i].dialogs[d].choice[r].text.replaceAll(setup_editor.csv[0],'')+setup_editor.csv[0];}else{CSV+=setup_editor.csv[1]}
								}
							};CSV+=setup_editor.csv[1];
						}
					}
				}
			}
		};all_blocks++;
    }
    if(story_script.parameters.title){n="translate_kit_"+((story_script.parameters.title.en)?story_script.parameters.title.en :story_script.parameters.title)}
    else{n="translate_kit";}
    var uri='data:text/csv;charset=utf-8,'+encodeURIComponent(CSV);
    download_files(n+"."+f,uri)
}
function project_statist(){
    if(!setup_editor.csv){setup_editor.csv=[decodeURI('%09'),decodeURI('%0D')]}
    var html="<div class='window' style='padding:0px;'><div class='win_head'>Project metadata<div class='window_close icon icon_close' onclick='modal_window(\"close\")'></div></div><hr style='margin:0px;'>"
        +'<table style="border-spacing:10px;border-collapse:separate;"><tbody><tr>'
        +'<td style="white-space:nowrap;min-width:100px;height:20px;" align="right">Count files: </td><td align="left" style="width:60px;">'+project_files.length+'</td>'
        +'<td style="white-space:nowrap;min-width:100px;height:20px;" align="right">Size files: </td><td align="left" style="width:60px;white-space:nowrap;">'+fileSize(countBytes)+'</td></tr>'
        +'<td style="white-space:nowrap;height:20px;" align="right">Words '+languare+': </td><td align="left">'+countWords+'</td>'
        +'<td style="white-space:nowrap;height:20px;" align="right">Symbols '+languare+': </td><td align="left">'+countSymbols+'</td></tr>'
        +'<td style="white-space:nowrap;height:20px;" align="right">Blocks: </td><td align="left">'+all_blocks.length+'</td>'
        +'<td style="white-space:nowrap;height:20px;" align="right">Characters: </td><td align="left">'+Object.keys(story_script.parameters.characters).length+'</td></tr>'
        +'</tbody></table></div>'
    modal_window("open",html);
}
function fileSize(b){
      if(b>=1000000000){b=(b/1000000000).toFixed(2)+' GB';}
      else if(b>=1000000){b=(b/1000000).toFixed(2)+' MB';}
      else if(b>=1000){b=(b/1000).toFixed(2)+' KB';}
      else if(b>=1){b=b+' bytes';}
      else{b='0 byte';}
      return b;
}
var objFocus,moveSize=true,angle=0,trans="0,0",arr_e,moveSave=false;
function droppFocus(r){
    if(objFocus){
        objFocus.style.width=r.style.width;
        objFocus.style.height=r.style.height;
        objFocus.style.top=r.style.top;
        objFocus.style.left=r.style.left;
        objFocus.style.zIndex=r.style.zIndex;
        objFocus.style.transform=r.style.transform;
        objFocus.style.pointerEvents=null;
        var j=document.getElementById('b_'+objFocus.id);
        if(j){
            j.style.animation="false";
            j.style.WebkitAnimation="false";
            j.style.backgroundColor='var(--cw)'
        }
        r.parentNode.appendChild(objFocus);
        r.style.visibility="hidden";
        objFocus=false;
    }
}
function objSelect(id,r){
    if(r){r=document.getElementById(r+"_sizer")}else{r=document.getElementById('resizers')}
    droppFocus(r);moveSave=false;
    objFocus=document.getElementById(id);
    r.style.transform="";
    r.style.height=objFocus.offsetHeight+"px";
    r.style.width=objFocus.offsetWidth+"px";
    r.style.top=objFocus.offsetTop+"px";
    r.style.left=objFocus.offsetLeft+"px";
    r.style.visibility="visible";
    r.style.zIndex=objFocus.style.zIndex;
    r.style.transform=objFocus.style.transform;
    trans=(r.style.transform.includes('translate('))?r.style.transform.split('translate(')[1].split(')')[0]:'0,0';
    objFocus.style.transform="";
    objFocus.style.boxSizing='border-box';
    objFocus.style.width='100%';
    objFocus.style.height='100%';
    objFocus.style.top='0px';
    objFocus.style.left='0px';
    objFocus.style.bottom='none';
    objFocus.style.right='none';
    objFocus.style.pointerEvents='none';
    var j=document.getElementById('b_'+id);
    if(j){
        j.style.animation="flash2 2s 1";
        j.style.WebkitAnimation="flash2 2s 1";
        j.style.backgroundColor='var(--cb)'
    }
    r.appendChild(objFocus);
    var c,e=r.parentNode.getElementsByClassName("objSelect");
    for(c=0;c<e.length;c++){if(e[c]){e[c].style.pointerEvents="none"}}
    tue_text_block.style.pointerEvents="none";
}
function make_resizable(s,f){
    const resizers=s.getElementsByClassName("resizer");
    const minSize=26;
    let original_width=0,original_height=0,original_x=0,original_y=0,original_mouse_x=0,original_mouse_y=0,size=0,z_scale=0,rotate_o,rotate_x,rotate_y;
    let box_x,box_y,box_width,box_height;
    document.onkeydown=function(e){
        e=e||window.event;
        if(e.keyCode == '27'){if(add_element.style.visibility=="visible"){menu_add.style.visibility='hidden';}else if(window_zone.style.visibility=="visible"){modal_window("close")}}
        else if(e.keyCode == '13'){{if(objFocus){if(!f){scene_scroll=false;saveResize();}else{eval(f)};}}}
        else if(e.keyCode == '38'){if(objFocus){scene_view.style.overflow='hidden';s.style.top=(s.offsetTop-((e.shiftKey)?10:1))+'px';moveSave=true;}}
        else if(e.keyCode == '40'){if(objFocus){scene_view.style.overflow='hidden';s.style.top=(s.offsetTop+((e.shiftKey)?10:1))+'px';moveSave=true;}}
        else if(e.keyCode == '37'){if(objFocus){scene_view.style.overflow='hidden';s.style.left=(s.offsetLeft-((e.shiftKey)?10:1))+'px';moveSave=true;}}
        else if(e.keyCode == '39'){if(objFocus){scene_view.style.overflow='hidden';s.style.left=(s.offsetLeft+((e.shiftKey)?10:1))+'px';moveSave=true;}}
    }
    document.onkeyup=function(e){
        e=e||window.event;
        if(e.keyCode == '38'){if(objFocus){scene_view.style.overflow='scroll';}}
        else if(e.keyCode == '40'){if(objFocus){scene_view.style.overflow='scroll'}}
        else if(e.keyCode == '37'){if(objFocus){scene_view.style.overflow='scroll'}}
        else if(e.keyCode == '39'){if(objFocus){scene_view.style.overflow='scroll'}}
    }
    s.onmousedown=function(e){
        if(moveSize){
            e=e||window.event;
            e.preventDefault();
            original_x=e.clientX;
            original_y=e.clientY;
            scene_scroll=false
            document.onmouseup=closeDragElement;
            document.onmousemove=elementDrag;
        }
    }
    function elementDrag(e){
        e=e||window.event;
        e.preventDefault();
        original_mouse_x=original_x-e.clientX;
        original_mouse_y=original_y-e.clientY;
        original_x=e.clientX;
        original_y=e.clientY;
        z_scale=(tool_update)?tool_scale:scale_scene;
        s.style.top=(s.offsetTop-original_mouse_y/z_scale)+"px";
        s.style.left=(s.offsetLeft-original_mouse_x/z_scale)+"px";
    }
    s.ontouchstart=function(e){
        if(moveSize){
            e=e||window.event;
            e.preventDefault();
            original_x=e.touches[0].clientX;
            original_y=e.touches[0].clientY;
            scene_scroll=false
            document.ontouchend=closeDragElement;
            document.ontouchmove=elementDragTouch;
        }
    }
    function elementDragTouch(e){
        e=e||window.event;
        e.preventDefault();
        original_mouse_x=original_x-e.touches[0].clientX;
        original_mouse_y=original_y-e.touches[0].clientY;
        original_x=e.touches[0].clientX;
        original_y=e.touches[0].clientY;
        z_scale=(tool_update)?tool_scale:scale_scene;
        s.style.top=(s.offsetTop-original_mouse_y/z_scale)+"px";
        s.style.left=(s.offsetLeft-original_mouse_x/z_scale)+"px";
    }
    function closeDragElement(){if(!f){moveSave=true;saveResize();}else{eval(f)};}
    for (let i=0;i<resizers.length;i++){
        const sizer=resizers[i];
        sizer.addEventListener('mousedown',function(e){
            moveSize=false
            scene_scroll=false
            e.preventDefault()
            var r=getComputedStyle(s,null)
            original_width=parseFloat(r.getPropertyValue('width').replace('px', ''));
            original_height=parseFloat(r.getPropertyValue('height').replace('px', ''));
            original_x=parseFloat(r.getPropertyValue('left').replace('px', ''));
            original_y=parseFloat(r.getPropertyValue('top').replace('px', ''));
            original_mouse_x=e.pageX;
            original_mouse_y=e.pageY;
            size=1;z_scale=(tool_update)?tool_scale:scale_scene;
            if(r.getPropertyValue("transform")!="none"){
                var v=r.getPropertyValue("transform").split('(')[1].split(')')[0].split(',');
                var a=Math.round(Math.atan2(v[1],v[0])*(180/Math.PI));
                rotate_o=(a<0?a+360:a);
            }else{rotate_o=0;}
            box_x=s.offsetLeft;
            box_y=s.offsetTop;
            box_width=s.offsetWidth;
            box_height=s.offsetHeight;
            rotate_x=s.getBoundingClientRect().left+(s.getBoundingClientRect().width/2);
            rotate_y=s.getBoundingClientRect().top+(s.getBoundingClientRect().height/2);
            window.addEventListener('mousemove',resize);
            window.addEventListener('mouseup',stopResize);
        })
        function resize(e){
            var initRadians=rotate_o*Math.PI/180;
            var cosFraction=Math.cos(initRadians);
            var sinFraction=Math.sin(initRadians);
            var wDiff=(e.pageX-original_mouse_x)/((!tool_update)?scale_scene :tool_scale);
            var hDiff=(e.pageY-original_mouse_y)/((!tool_update)?scale_scene :tool_scale);
            var rotatedWDiff=cosFraction*wDiff+sinFraction*hDiff;
            var rotatedHDiff=cosFraction*hDiff-sinFraction*wDiff;
            var newW=box_width,newH=box_height,newX=box_x,newY=box_y;
            var cx=box_x+((original_width/2)*Math.cos(initRadians)-(original_height/2)*Math.sin(initRadians));
            var cy=box_y+((original_width/2)*Math.sin(initRadians)+(original_height/2)*Math.cos(initRadians));
            if(sizer.classList.contains('bottom-right')){
                newW=original_width+rotatedWDiff;
                if(newW<minSize){newW=minSize;rotatedWDiff=minSize+original_width;}
                newH=original_height+rotatedHDiff;
                if(newH<minSize){newH=minSize;rotatedHDiff=minSize+original_height;}
            }else if(sizer.classList.contains('bottom-left')){
                newH=original_height+rotatedHDiff;
                if(newH<minSize){newH=minSize;rotatedHDiff=minSize+original_height;}
                newW=original_width-rotatedWDiff;
                if(newW<minSize){newW=minSize;rotatedWDiff=original_width-minSize;}
                newX+=rotatedWDiff*cosFraction;
                newY+=rotatedWDiff*sinFraction;
            }else if(sizer.classList.contains('top-right')){
                newW=original_width+rotatedWDiff;
                if(newW<minSize){newW=minSize;rotatedWDiff=minSize+original_width;}
                newH=original_height-rotatedHDiff;
                if(newH<minSize){newH=minSize;rotatedHDiff=original_height-minSize;}
                newX-=rotatedHDiff*sinFraction;
                newY+=rotatedHDiff*cosFraction;
            }else if(sizer.classList.contains('top-left')){
                newW=original_width-rotatedWDiff;
                if(newW<minSize){newW=minSize;rotatedWDiff=original_width-minSize;}
                newX+=rotatedWDiff*cosFraction;
                newY+=rotatedWDiff*sinFraction;
                newH=original_height-rotatedHDiff;
                if(newH<minSize){newH=minSize;rotatedHDiff=original_height-minSize;}
                newX-=rotatedHDiff*sinFraction;
                newY+=rotatedHDiff*cosFraction;
            }else if(sizer.classList.contains('size-top')){
                newH=original_height-rotatedHDiff;
                if(newH<minSize){newH=minSize;rotatedHDiff=original_height-minSize;}
                newX-=rotatedHDiff*sinFraction;
                newY+=rotatedHDiff*cosFraction;
            }else if(sizer.classList.contains('size-bottom')){
                newH=original_height+rotatedHDiff;
                if(newH<minSize){newH=minSize;rotatedHDiff=minSize+original_height;}
            }else if(sizer.classList.contains('size-left')){
                newW=original_width-rotatedWDiff;
                if(newW<minSize){newW=minSize;rotatedWDiff=original_width-minSize;}
                newX+=rotatedWDiff*cosFraction;
                newY+=rotatedWDiff*sinFraction;
            }else if(sizer.classList.contains('size-right')){
                newW=original_width+rotatedWDiff;
                if(newW<minSize){newW=minSize;rotatedWDiff=minSize+original_width;}
            }else if(sizer.classList.contains('rotate')){
                angle=Math.atan2((e.pageX-html.scrollLeft)-rotate_x,-((e.pageY-html.scrollTop)-rotate_y))*(180/Math.PI);
                let radians=(Math.PI/-180)*angle;
                newX=cx-((original_width/2)*Math.cos(radians)+(original_height/2)*Math.sin(radians));
                newY=cy+((original_width/2)*Math.sin(radians)-(original_height/2)*Math.cos(radians));
                s.style.transform='translate('+trans+') rotate('+angle+'deg)';
            };
            s.style.left=newX+'px';
            s.style.top=newY+'px';
            s.style.width=newW+'px';
            s.style.height=newH+'px';
        };
        function stopResize(){
            if(!scene_scroll){if(!f){moveSave=true;saveResize(size,angle);}else{eval(f);}}
            window.removeEventListener('mousemove',resize);
            window.removeEventListener('mouseup',stopResize);
            moveSize=true;angle=0;size=0;
        }
        sizer.addEventListener('touchstart',function(e){
            moveSize=false
            scene_scroll=false
            e.preventDefault()
            var r=getComputedStyle(s,null)
            original_width=parseFloat(r.getPropertyValue('width').replace('px', ''));
            original_height=parseFloat(r.getPropertyValue('height').replace('px', ''));
            original_x=parseFloat(r.getPropertyValue('left').replace('px', ''));
            original_y=parseFloat(r.getPropertyValue('top').replace('px', ''));
            original_mouse_x=e.touches[0].pageX;
            original_mouse_y=e.touches[0].pageY;
            size=1;z_scale=(tool_update)?tool_scale:scale_scene;
            if(r.getPropertyValue("transform")!="none"){
                var v=r.getPropertyValue("transform").split('(')[1].split(')')[0].split(',');
                var a=Math.round(Math.atan2(v[1],v[0])*(180/Math.PI));
                rotate_o=(a<0?a+360:a);
            }else{rotate_o=0;}
            box_x=s.offsetLeft;
            box_y=s.offsetTop;
            box_width=s.offsetWidth;
            box_height=s.offsetHeight;
            rotate_x=s.getBoundingClientRect().left+(s.getBoundingClientRect().width/2);
            rotate_y=s.getBoundingClientRect().top+(s.getBoundingClientRect().height/2);
            window.addEventListener('touchmove',resizeTouch)
            s.parentNode.addEventListener('touchend',stopResizeTouch)
        })
        function resizeTouch(e){
            var initRadians=rotate_o*Math.PI/180;
            var cosFraction=Math.cos(initRadians);
            var sinFraction=Math.sin(initRadians);
            var wDiff=(e.touches[0].pageX-original_mouse_x)/((!tool_update)?scale_scene :tool_scale);
            var hDiff=(e.touches[0].pageY-original_mouse_y)/((!tool_update)?scale_scene :tool_scale);
            var rotatedWDiff=cosFraction*wDiff+sinFraction*hDiff;
            var rotatedHDiff=cosFraction*hDiff-sinFraction*wDiff;
            var newW=box_width,newH=box_height,newX=box_x,newY=box_y;
            var cx=box_x+((original_width/2)*Math.cos(initRadians)-(original_height/2)*Math.sin(initRadians));
            var cy=box_y+((original_width/2)*Math.sin(initRadians)+(original_height/2)*Math.cos(initRadians));
            if(sizer.classList.contains('bottom-right')){
                newW=original_width+rotatedWDiff;
                if(newW<minSize){newW=minSize;rotatedWDiff=minSize+original_width;}
                newH=original_height+rotatedHDiff;
                if(newH<minSize){newH=minSize;rotatedHDiff=minSize+original_height;}
            }else if(sizer.classList.contains('bottom-left')){
                newH=original_height+rotatedHDiff;
                if(newH<minSize){newH=minSize;rotatedHDiff=minSize+original_height;}
                newW=original_width-rotatedWDiff;
                if(newW<minSize){newW=minSize;rotatedWDiff=original_width-minSize;}
                newX+=rotatedWDiff*cosFraction;
                newY+=rotatedWDiff*sinFraction;
            }else if(sizer.classList.contains('top-right')){
                newW=original_width+rotatedWDiff;
                if(newW<minSize){newW=minSize;rotatedWDiff=minSize+original_width;}
                newH=original_height-rotatedHDiff;
                if(newH<minSize){newH=minSize;rotatedHDiff=original_height-minSize;}
                newX-=rotatedHDiff*sinFraction;
                newY+=rotatedHDiff*cosFraction;
            }else if(sizer.classList.contains('top-left')){
                newW=original_width-rotatedWDiff;
                if(newW<minSize){newW=minSize;rotatedWDiff=original_width-minSize;}
                newX+=rotatedWDiff*cosFraction;
                newY+=rotatedWDiff*sinFraction;
                newH=original_height-rotatedHDiff;
                if(newH<minSize){newH=minSize;rotatedHDiff=original_height-minSize;}
                newX-=rotatedHDiff*sinFraction;
                newY+=rotatedHDiff*cosFraction;
            }else if(sizer.classList.contains('size-top')){
                newH=original_height-rotatedHDiff;
                if(newH<minSize){newH=minSize;rotatedHDiff=original_height-minSize;}
                newX-=rotatedHDiff*sinFraction;
                newY+=rotatedHDiff*cosFraction;
            }else if(sizer.classList.contains('size-bottom')){
                newH=original_height+rotatedHDiff;
                if(newH<minSize){newH=minSize;rotatedHDiff=minSize+original_height;}
            }else if(sizer.classList.contains('size-left')){
                newW=original_width-rotatedWDiff;
                if(newW<minSize){newW=minSize;rotatedWDiff=original_width-minSize;}
                newX+=rotatedWDiff*cosFraction;
                newY+=rotatedWDiff*sinFraction;
            }else if(sizer.classList.contains('size-right')){
                newW=original_width+rotatedWDiff;
                if(newW<minSize){newW=minSize;rotatedWDiff=minSize+original_width;}
            }else if(sizer.classList.contains('rotate')){
                angle=Math.atan2((e.touches[0].pageX-html.scrollLeft)-rotate_x,-((e.touches[0].pageY-html.scrollTop)-rotate_y))*(180/Math.PI);
                let radians=(Math.PI/-180)*angle;
                newX=cx-((original_width/2)*Math.cos(radians)+(original_height/2)*Math.sin(radians));
                newY=cy+((original_width/2)*Math.sin(radians)-(original_height/2)*Math.cos(radians));
                s.style.transform='translate('+trans+') rotate('+angle+'deg)';
            };
            s.style.left=newX+'px';
            s.style.top=newY+'px';
            s.style.width=newW+'px';
            s.style.height=newH+'px';
        };
        function stopResizeTouch(){
            if(!scene_scroll){if(!f){moveSave=true;saveResize(size,angle);}else{eval(f)}};
            window.removeEventListener('touchmove',resizeTouch);
            moveSize=true;angle=0;size=0;
        }
    }
}
function saveResize(s,a){
    if(moveSave&&!scene_scroll){
        var layout_width=parseFloat(getComputedStyle(scene_layout,null).getPropertyValue('width').replace('px',''));
        var layout_height=parseFloat(getComputedStyle(scene_layout,null).getPropertyValue('height').replace('px',''));
        var z=resizers.style.left.replace('px','');
        var b=((objFocus.style.paddingTop.replace('px',''))*2)+((objFocus.style.borderTopWidth)?parseFloat(objFocus.style.borderTopWidth):0)+((objFocus.style.borderBottomWidth)?parseFloat(objFocus.style.borderBottomWidth):0);
        var r=((objFocus.style.paddingLeft.replace('px',''))*2)+((objFocus.style.borderRightWidth)?parseFloat(objFocus.style.borderRightWidth):0)+((objFocus.style.borderLeftWidth)?parseFloat(objFocus.style.borderLeftWidth):0);
        arr_e.position[0]=0;arr_e.position[2]=0;arr_e.position[1]=0;arr_e.position[3]=0
        if((layout_width/2)>=z){arr_e.position[0]=(z/layout_width*100).toFixed(2)+'%';}
        else{z=parseFloat(getComputedStyle(resizers,null).getPropertyValue('right').replace('px',''));arr_e.position[1]=(z/layout_width*100).toFixed(2)+'%';}
        z=resizers.style.top.replace('px','')
        if((layout_height/2)>=z){arr_e.position[2]=(z/layout_height*100).toFixed(2)+'%';}
        else{z=parseFloat(getComputedStyle(resizers,null).getPropertyValue('bottom').replace('px',''));arr_e.position[3]=(z/layout_height*100).toFixed(2)+'%';}
        if(!a==0){arr_e.angle=parseFloat(a.toFixed(2));}
        else if(!s==0){
            if(arr_e.url){
                arr_e.size[0]=parseFloat(((resizers.style.width.replace('px','')-r)/layout_width*100).toFixed(2))+'%';
                arr_e.size[1]=parseFloat(((resizers.style.height.replace('px','')-b)/layout_height*100).toFixed(2))+'%';
            }else{
                arr_e.size[0]=parseFloat((resizers.style.width.replace('px','')-r).toFixed(2))+'px';
                arr_e.size[1]=parseFloat((resizers.style.height.replace('px','')-b).toFixed(2))+'px';
            }
        }
        if(document.getElementById("scen_video")){scen_video.style.pointerEvents=null;}
    }else{
        var c,e=scene_layout.getElementsByClassName("objSelect");
        for(c=0;c<e.length;c++){if(e[c]){e[c].style.pointerEvents=null}}
        tue_text_block.style.pointerEvents=null;
    }droppFocus(document.getElementById("resizers"));off_drag();state_save();scen_edit_update(true);
}
function off_drag(){
    document.onmouseup=null;
    document.onmousedown=null;
    document.onmousemove=null;
    document.ontouchend=null;
    document.ontouchmove=null;
    scene_scroll=true;
}
function edit_color(n,c){
    var code='<div class="window" style="position:fixed;padding:8px;width:380px;"><div><div class="window_close icon icon_close" onclick="menu_add.style.visibility=\'hidden\';" ></div></div><p>Color</p><hr style="margin-top:10px;">'
    +'<form id="type_color"><table style="margin-top:16px;"><tbody><tr>'
        +'<td align="right" height="32px" style="padding-right:8px;"><input class="checkbox_a" type="radio" name="type_color" checked></td>'
        +'<td>HEX:</td>'
        +'<td><input id="hex_color" onchange="color_rgb(this.value);color_hsl(color_red.value,color_green.value,color_blue.value);" class="input_text" type="text" '+((c.includes('#'))?'value="'+c+'"':'')+'></td>'
        +'<td rowspan="3"><div style="position:relative;width:140px;height:100px;">'
            +'<div id="old_color" style="width:84px;height:84px;border-radius:50%;border:1px solid var(--cb);position:absolute;top:0px;right:0px;background-color:'+c+';"></div>'
            +'<div id="box_color" style="width:100px;height:100px;border-radius:50%;border:1px solid var(--cb);position:absolute;left:8px;bottom:0px;"></div>'
    +'</div></td><td style="height:10px;" colspan="4"></td>'
    +'</tr><tr>'
        +'<td align="right" height="32px" style="padding-right:8px;"><input id="rgba_color" class="checkbox_a" type="radio" name="type_color" '+((c.includes('rgb'))?'checked':'')+'></td>'
        +'<td style="width:32px;">RGB:</td>'
        +'<td><input id="rgb_color" onchange="color_rgb_parse()" class="input_text" type="text" '+((c.includes('rgb'))?'value="'+c+'"':'')+'></td>'
    +'</tr><tr>'
        +'<td align="right" height="32px" style="padding-right:8px;"><input class="checkbox_a" type="radio" name="type_color" '+((c.includes('hsl'))?'checked':'')+'></td>'
        +'<td>HSL:</td>'
        +'<td><input id="hsl_color" onchange="color_hsl_parse(this.value)" class="input_text" type="text" '+((c.includes('hsl'))?'value="'+c+'"':'')+'></td>'
    +'</tr><tr><td style="height:10px;" colspan="4"></td></tr><tr>'
        +'<td align="right" style="height:40px;padding-right:8px;">Saturation</td>'
        +'<td><input id="text_satu" onchange="this.value=correct_value(this.value,true);color_satu.value=this.value;show_hsl(false,text_satu.value,this.value);" class="input_text" type="text"></td>'
        +'<td colspan="4"><input class="input_slider input_slider_progress" oninput="show_hsl(false,this.value,text_ligh.value);text_satu.value=this.value" type="range" value="100" min="0" max="100" step="1" style="width:100%;" id="color_satu"></td>'
    +'</tr><tr>'
        +'<td align="right" style="height:40px;padding-right:8px;">Lightness</td>'
        +'<td><input id="text_ligh" onchange="this.value=correct_value(this.value,true);color_ligh.value=this.value;show_hsl(false,text_satu.value,this.value);" class="input_text" type="text"></td>'
        +'<td colspan="4"><input class="input_slider input_slider_grey" oninput="show_hsl(false,text_satu.value,this.value);text_ligh.value=this.value" type="range" value="50" min="0" max="100" step="1" style="width:100%;" id="color_ligh"></td>'
    +'</tr><tr>'
        +'<td align="right" style="height:40px;padding-right:8px;">Red</td>'
        +'<td><input id="text_red" onchange="this.value=correct_value(this.value,true);color_red.value=this.value;color_hex();" class="input_text" type="text"></td>'
        +'<td colspan="4"><input class="input_slider input_slider_red" oninput="color_hex();" type="range" value="126" min="0" max="255" step="1" style="width:100%;" id="color_red"></td>'
    +'</tr><tr>'
        +'<td align="right" style="height:40px;padding-right:8px;">Green</td>'
        +'<td><input id="text_green" onchange="this.value=correct_value(this.value,true);color_green.value=this.value;color_hex();" class="input_text" type="text"></td>'
        +'<td colspan="4"><input class="input_slider input_slider_green" oninput="color_hex();" type="range" value="126" min="0" max="255" step="1" style="width:100%;" id="color_green"></td>'
    +'</tr><tr>'
        +'<td align="right" style="height:40px;padding-right:8px;">Blue</td>'
        +'<td><input id="text_blue" onchange="this.value=correct_value(this.value,true);color_blue.value=this.value;color_hex();" class="input_text" type="text"></td>'
        +'<td colspan="4"><input class="input_slider input_slider_blue" oninput="color_hex();" type="range" value="126" min="0" max="255" step="1" style="width:100%;" id="color_blue"></td>'
    +'</tr><tr>'
        +'<td align="right" style="height:40px;padding-right:8px;">Alpha</td>'
        +'<td><input id="text_alpha" onchange="this.value=correct_value(this.value,true);color_alpha.value=this.value;color_hex();" class="input_text" type="text"></td>'
        +'<td colspan="4"><input class="input_slider input_slider_progress" oninput="color_hex();" type="range" value="126" min="0" max="1" step="0.01" style="width:100%;" id="color_alpha"></td>'
    +'</tr></tbody></table></form><br><table class="big_button" width="256px" onclick="apply_color(\''+n+'\');menu_add.style.visibility=\'hidden\';"><tbody><tr><td width="42px" class="icon icon_ok"></td><td align="center">Apply</td><td width="42px"></td></tr></tbody></table></div>'
    menu_add.innerHTML=code
    menu_add.style.visibility='visible';
    if(c.includes('#')){color_rgb(c);}else if(c.includes('hsl')){color_hsl_parse(c);}else{color_rgb_parse()}
}
function apply_color(n){
    var forms=document.forms.type_color;
    var c=forms[0].checked?hex_color.value:forms[2].checked?rgb_color.value:hsl_color.value;
    if(n=='button'){arr_l[arr_n]=c;button_panel_update();}
    else if(n=='choice'){arr_l[arr_n[0]]=c;choice_panel_update(arr_n[1],arr_n[2],arr_n[3]);}
    else{
        document.getElementById(n).value=c;
        document.getElementById(n).onchange();
        if(n=='scene_color'){scene_bg_preview.style.backgroundColor=c}
        else {var e=document.getElementById(n);e.value=c;}
    }
}
function color_rgb_parse() {
    var regExp = /\(([^)]+)\)/;
    var matches = regExp.exec((rgb_color.value)?rgb_color.value:'rgb(255,255,255)');
    color_red.value=matches[1].split(",")[0];
    color_blue.value=matches[1].split(",")[2];
    color_green.value=matches[1].split(",")[1];
    if(matches[1].split(",")[3]){color_alpha.value=matches[1].split(",")[3]}else{color_alpha.value=1};
    color_hex();
}
function color_hex(r,g,b) {
    r=parseInt(color_red.value).toString(16);r=r.length<2?"0"+r:r
    g=parseInt(color_green.value).toString(16);g=g.length<2?"0"+g:g
    b=parseInt(color_blue.value).toString(16);b=b.length<2?"0"+b:b
    hex_color.value="#"+r+g+b;
    if(color_alpha.value<1){
        rgb_color.value="rgba("+color_red.value+","+color_green.value+","+color_blue.value+","+color_alpha.value+")";
        rgba_color.checked=true
    }
    else{rgb_color.value="rgb("+color_red.value+","+color_green.value+","+color_blue.value+")";}
    text_red.value=color_red.value;
    text_blue.value=color_blue.value;
    text_green.value=color_green.value;
    text_alpha.value=color_alpha.value;
    box_color.style.backgroundColor=rgb_color.value
    color_hsl(color_red.value,color_green.value,color_blue.value);
}
function color_rgb(h) {
    if(h.length==4){h="#"+h.slice(1,2)+h.slice(1,2)+h.slice(2,3)+h.slice(2,3)+h.slice(3,4)+h.slice(3,4)}
    color_red.value=parseInt(h.slice(1,3),16);
    color_blue.value=parseInt(h.slice(5,7),16);
    color_green.value=parseInt(h.slice(3,5),16);
    color_alpha.value=1;
    rgb_color.value="rgb("+color_red.value+","+color_green.value+","+color_blue.value+")";
    box_color.style.background=rgb_color.value
    text_red.value=color_red.value;
    text_blue.value=color_blue.value;
    text_green.value=color_green.value;
    text_alpha.value=1;
    color_hsl(color_red.value,color_green.value,color_blue.value);
}
function color_hsl_parse(n){
    var regExp=/\(([^)]+)\)/;
    var matches=regExp.exec(n);
    box_color.style.backgroundColor=n
    var h=parseInt(matches[1].split(",")[0]),s=parseInt(matches[1].split(",")[1]),l=parseInt(matches[1].split(",")[2]),t=(matches[1].split(",")[3])?matches[1].split(",")[3]:false
    text_satu.value=s
    color_satu.value=s
    text_ligh.value=l
    color_ligh.value=l
    l=l/100;
    const a=s*Math.min(l,1-l)/100;
    const f=function(n){
        const k=(n+h/30)%12;
        const color=l-a*Math.max(Math.min(k-3,9-k,1),-1);
        return Math.round(255*color);
    };
    var c=[f(0),f(8),f(4)]
    color_red.value=c[0];
    color_blue.value=c[2];
    color_green.value=c[1];
    text_red.value=c[0];
    text_blue.value=c[2];
    text_green.value=c[1];
    text_alpha.value=1;
    if(t){color_alpha.value=t;rgb_color.value="rgba("+c[0]+","+c[1]+","+c[2]+","+t+")";}else{color_alpha.value=1;rgb_color.value="rgb("+c[0]+","+c[1]+","+c[2]+")";}
    text_alpha.value=color_alpha.value;
    hex_color.value="#"+c[0].toString(16).padStart(2,'0')+c[1].toString(16).padStart(2,'0')+c[2].toString(16).padStart(2,'0');
}
function color_hsl(r,g,b){
    r/=255,g/=255,b/=255;
    var v=Math.max(r,g,b),c=Math.min(r,g,b);
    var h,s,l=(v+c)/2;
    if(v==c){h=s=0;}else{
        var d=v-c;
        s=l>0.5?d/(2-v-c):d/(v+c);
        switch(v){
            case r:h=(g-b)/d+(g<b?6:0);break;
            case g:h=(b-r)/d+2;break;
            case b:h=(r-g)/d+4;break;
        }h/=6;
    }
    s=Math.floor(s*100);
    l=Math.floor(l*100);
    text_satu.value=s;
    color_satu.value=s;
    text_ligh.value=l;
    color_ligh.value=l;
    show_hsl(Math.floor(h*360),s,l,1);
}
function show_hsl(h,s,l,n){
    if(!h&&hsl_color.value.length>0){
        var regExp=/\(([^)]+)\)/;
        var matches=regExp.exec(hsl_color.value);
        h=parseInt(matches[1].split(",")[0]);
    }
    if(color_alpha.value!=1){hsl_color.value="hsla("+h+","+s+"%,"+l+"%,"+color_alpha.value+")";}else{hsl_color.value="hsl("+h+","+s+"%,"+l+"%)";}
    if(!n){color_hsl_parse(hsl_color.value)}
}
function colorLuminance(hex,lum){hex=hex.replace('#','');return '#'+((Number(`0x1${hex}`)+lum).toString(16).substr(1))}
function translation_edit(){
    if(tools_zone.style.visibility=="visible"){
        tool_update=false;
        tools_zone.style.visibility="hidden";
        html.style.overflow='scroll';
        menu_panel.style.zIndex=null;
        tools_zone.innerHTML="";
        scroll_block=false;scene_screen=false;
    }
    var tool="<table id='translation_edit' style='width:100%;height:100vh;background-color:var(--wn);'><tbody><tr><td colspan='3' style='border-bottom:1px solid var(--cb);height:48px;'></td></tr><tr><td style='height:40px;width:58px;' id='translation_id'></td>"
    +"<td id='translation_left'><div class='translation_data'><select id='language_a' class='input_text' style='height:40px;width:64px;border-right:1px solid var(--cb);border-left:1px solid var(--cb);border-bottom:0;' oninput='translation_texts();'>"+project_languares(languare)+"</select><span id='update_texts_a'><span></div></td>"
    +"<td><div class='translation_data'><select id='language_b' class='input_text' style='height:40px;width:64px;border-right:1px solid var(--cb);border-left:1px solid var(--cb);border-bottom:0;' oninput='translation_texts();'>"+project_languares((story_script.parameters.languares[1]!=languare)?story_script.parameters.languares[1]:story_script.parameters.languares[0])+"</select><span id='update_texts_b'><span></div></td>"
    +"</tr><tr><td colspan='3'><div style='width:100%;height:calc(100vh - 138px);overflow:auto;box-sizing:border-box;border-bottom:1px solid var(--cb);border-top:1px solid var(--cb);position:relative;'>"
    +"<table id='translation_input'><tbody></tbody></table><div id='translation_slider'></div>"
    +"</div></td></tr><tr><td colspan='3' style='height:40px;'><table style='width:100%'><tbody><tr><td>"
    +"<input type='text' oninput='translation_search(this.value.toUpperCase());' class='search' style='max-width:256px;width:50%;padding-left:8px;border-left:0;' placeholder='Search text'></td><td align='right'>"
    +"<table class='big_button' style='max-width:256px;width:100%;margin:4px;' onclick=\"document.removeEventListener('touchend', slideFinish, false);document.removeEventListener('mouseup', slideFinish, false);open_tool();update_novel();\"><tbody><tr><td width='42px' class='icon icon_undo'></td><td align='center'>Back</td><td width='42px'></td></tr></tbody></table></td></tr></tbody></table>"
    +"</td></tr></tbody></table>"
    open_tool(tool,"");translation_texts();scene_screen=false;
}
var left_block;
function timeline_edit(n,u){
    copy_arr=n;
    var html="<div class='window' style='width:320px;'><div class='win_head'>Timeline<div class='window_close icon icon_close' onclick='modal_window(\"close\")'></div></div><hr style='margin:0;'><p class='text_tutorials_a select_tutorials'>"+texts.tutorials[16].en+"</p>"
    +"<table width='100%'><tbody><tr>"
    +"<td height='40px' width='64px' align='right' style='padding-right:8px;' oninput='timeline_edit(0)'>Block</td><td><select id='tl_block' style='width:100%;' oninput='timeline_update(0),timeline_update(1)'>"+option_block(n.go_to[0],0)+"</select></td>"
    +"</tr><tr>"
    +"<td height='40px' width='64px' align='right' style='padding-right:8px;' oninput='timeline_edit(1)'>Scene</td><td><select id='tl_scene' style='width:100%;' oninput='timeline_update(1)'></select></td>"
    +"</tr><tr>"
    +"<td height='40px' width='64px' align='right' style='padding-right:8px;'>Dialog</td><td><select id='tl_dialog' style='width:100%;'></select></td>"
    +"</tr></tbody></table>"
    +"<br><table class='big_button' width='256px' onclick='copy_arr.go_to=[tl_block.value,tl_scene.value,tl_dialog.value];"+((!scene_screen)?"update_novel()":u+".innerHTML=tl_block.value+\" / \"+tl_scene.value+\" / \"+tl_dialog.value")+";modal_window(\"close\")'><tbody><tr><td width='42px' class='icon icon_ok'></td><td align='center'>Apply</td><td width='42px'></td></tr></tbody></table></div>"
	modal_window("open",html);
    tl_block.getElementsByTagName('optgroup')[0].getElementsByTagName('option')[1].remove();
    tl_block.getElementsByTagName('optgroup')[0].getElementsByTagName('option')[0].remove();
    timeline_update(0,n.go_to[1])
    timeline_update(1,n.go_to[2])
}
function timeline_update(n,i){
	var scene_list="",l;
    if(n==0){for(let l=0;l<story_script[tl_block.value].length;l++){
        scene_list+="<option value="+l+" "+((i==l)?"selected":"")+">"+l+"</option>";
    };tl_scene.innerHTML=scene_list;}
    else if(n==1){for(let l=0;l<story_script[tl_block.value][tl_scene.value].dialogs.length;l++){
        if(story_script[tl_block.value][tl_scene.value].dialogs[l].text){scene_list+="<option value="+l+" "+((i==l)?"selected":"")+">"+l+" "+((story_script[tl_block.value][tl_scene.value].dialogs[l].text[languare])?story_script[tl_block.value][tl_scene.value].dialogs[l].text[languare]:story_script[tl_block.value][tl_scene.value].dialogs[l].text).slice(0,36)+"</option>";}
    };tl_dialog.innerHTML=scene_list;}
}
function translation_texts(){
    var a=0,lb=0,la=0,u,i,k,all_blocks=0,tab=document.getElementById('translation_input').getElementsByTagName('tbody')[0];
    tab.innerHTML="";
    add_string(story_script.parameters.title[language_a.value],"story_script.parameters.title['"+language_a.value+"']",story_script.parameters.title[language_b.value],"story_script.parameters.title['"+language_b.value+"']","Title","");
    if(story_script.parameters.characters){
        for(i=0;i<Object.keys(story_script.parameters.characters).length;i++){
            k=Object.keys(story_script.parameters.characters)[i];
            var x=story_script.parameters.characters[k][language_b.value];
            la+=(x&&x.length>0)?1:0;lb+=(x&&x.length>0)?1:0;a++;
            add_string(story_script.parameters.characters[k][language_a.value],"story_script.parameters.characters['"+k+"']['"+language_a.value+"']",x,"story_script.parameters.characters['"+k+"']['"+language_b.value+"']",k,"icon_char");
        }
    }
    while(Object.keys(story_script)[all_blocks]){
        k=Object.keys(story_script)[all_blocks]
        if(k!="parameters"&&k!="blocks"){
            for(var i=0;i<story_script[k].length;i++){
                if(story_script[k][i].dialogs){
                    for(d=0;d<story_script[k][i].dialogs.length;d++){
                        if(story_script[k][i].dialogs[d].text){
                            u="<span style='line-height:28px;white-space:nowrap;padding-left:0;user-select:text;'>"+k+((story_script[k][i].dialogs[d].name)?" "+((story_script.parameters.characters[story_script[k][i].dialogs[d].name][language_a.value])?story_script.parameters.characters[story_script[k][i].dialogs[d].name][language_a.value]:story_script[k][i].dialogs[d].name):"")+"</span>"
                            if(typeof story_script[k][i].dialogs[d].text==='string'){
                                if(story_script[k][i].dialogs[d].text.length>0){la++;lb++;a++;}
                                add_string(story_script[k][i].dialogs[d].text,"data_la(story_script['"+k+"']['"+i+"'].dialogs['"+d+"'],'text');story_script['"+k+"']['"+i+"'].dialogs['"+d+"'].text['"+language_a.value+"']",story_script[k][i].dialogs[d].text,"data_la(story_script['"+k+"']['"+i+"'].dialogs['"+d+"'],'text');story_script['"+k+"']['"+i+"'].dialogs['"+d+"'].text['"+language_b.value+"']",k,"icon_text",i,d,u);
                            }else{
                                if(!story_script[k][i].dialogs[d].text[language_a.value]){story_script[k][i].dialogs[d].text[language_a.value]=""}
                                if(!story_script[k][i].dialogs[d].text[language_b.value]){story_script[k][i].dialogs[d].text[language_b.value]=""}
                                la+=story_script[k][i].dialogs[d].text[language_a.value].length>0?1:0;
                                lb+=story_script[k][i].dialogs[d].text[language_b.value].length>0?1:0;a++;
                                add_string(story_script[k][i].dialogs[d].text[language_a.value],"story_script['"+k+"']['"+i+"'].dialogs['"+d+"'].text['"+language_a.value+"']",story_script[k][i].dialogs[d].text[language_b.value],"story_script['"+k+"']['"+i+"'].dialogs['"+d+"'].text['"+language_b.value+"']",k,"icon_text",i,d,u);
                            }
                        }else if(story_script[k][i].dialogs[d].text_add){
                            if(typeof story_script[k][i].dialogs[d].text_add==='string'){
                                if(story_script[k][i].dialogs[d].text_add.length>0){la++;lb++;a++;}
                                add_string(story_script[k][i].dialogs[d].text_add,"data_la(story_script['"+k+"']['"+i+"'].dialogs['"+d+"'],'text_add');story_script['"+k+"']['"+i+"'].dialogs['"+d+"'].text_add['"+language_a.value+"']",story_script[k][i].dialogs[d].text_add,"data_la(story_script['"+k+"']['"+i+"'].dialogs['"+d+"'],'text_add');story_script['"+k+"']['"+i+"'].dialogs['"+d+"'].text_add['"+language_b.value+"']",k,"icon_textadd",i,d,u);
                            }else{
                                if(!story_script[k][i].dialogs[d].text_add[language_a.value]){story_script[k][i].dialogs[d].text_add[language_a.value]=""}
                                if(!story_script[k][i].dialogs[d].text_add[language_b.value]){story_script[k][i].dialogs[d].text_add[language_b.value]=""}
                                la+=story_script[k][i].dialogs[d].text_add[language_a.value].length>0?1:0;
                                lb+=story_script[k][i].dialogs[d].text_add[language_b.value].length>0?1:0;a++;
                                add_string(story_script[k][i].dialogs[d].text_add[language_a.value],"story_script['"+k+"']['"+i+"'].dialogs['"+d+"'].text_add['"+language_a.value+"']",story_script[k][i].dialogs[d].text_add[language_b.value],"story_script['"+k+"']['"+i+"'].dialogs['"+d+"'].text_add['"+language_b.value+"']",k,"icon_textadd",i,d,u);
                            }
                        }if(story_script[k][i].dialogs[d].choice){
                            for(r=0;r<story_script[k][i].dialogs[d].choice.length;r++){
                                var c=story_script[k][i].dialogs[d].choice[r];
                                if(typeof c.text==='string'){
                                    if(c.text.length>0){la++;lb++;a++;}
                                    add_string(c.text,"data_la(story_script['"+k+"']['"+i+"'].dialogs['"+d+"'].choice['"+r+"'],'text');story_script['"+k+"']['"+i+"'].dialogs['"+d+"'].choice['"+r+"'].text['"+language_a.value+"']",c.text,"data_la(story_script['"+k+"']['"+i+"'].dialogs['"+d+"'].choice['"+r+"'],'text');story_script['"+k+"']['"+i+"'].dialogs['"+d+"'].choice['"+r+"'].text['"+language_b.value+"']",k,"icon_choice",i,d,u);
                                }else{
                                    if(!c.text[language_a.value]){c.text[language_a.value]=""}
                                    if(!c.text[language_b.value]){c.text[language_b.value]=""}
                                    if(c.text[language_a.value].length>0||c.text[language_b.value].length>0){
                                        la+=c.text[language_a.value].length>0?1:0;
                                        lb+=c.text[language_b.value].length>0?1:0;a++;
                                        add_string(c.text[language_a.value],"story_script['"+k+"']['"+i+"'].dialogs['"+d+"'].choice['"+r+"'].text['"+language_a.value+"']",c.text[language_b.value],"story_script['"+k+"']['"+i+"'].dialogs['"+d+"'].choice['"+r+"'].text['"+language_b.value+"']",k,"icon_choice",i,d);
                                    }
                                }
                            }
                        }if(story_script[k][i].dialogs[d].toast){
                            var c=story_script[k][i].dialogs[d].toast;
                            if(typeof c==='string'){
                                if(c.length>0){la++;lb++;a++;}
                                add_string(c,"data_la(story_script['"+k+"']['"+i+"'].dialogs['"+d+"'],'toast');story_script['"+k+"']['"+i+"'].dialogs['"+d+"'].toast['"+language_a.value+"']",c,"data_la(story_script['"+k+"']['"+i+"'].dialogs['"+d+"'],'toast');story_script['"+k+"']['"+i+"'].dialogs['"+d+"'].toast['"+language_b.value+"']",k,"icon_toast",i,d);
                            }else{
                                if(!c[language_a.value]){c[language_a.value]=""}
                                if(!c[language_b.value]){c[language_b.value]=""}
                                if(c[language_a.value].length>0||c[language_b.value].length>0){
                                    la+=c[language_a.value].length>0?1:0;
                                    lb+=c[language_b.value].length>0?1:0;a++;
                                    add_string(c[language_a.value],"story_script['"+k+"']['"+i+"'].dialogs['"+d+"'].toast['"+language_a.value+"']",c[language_b.value],"story_script['"+k+"']['"+i+"'].dialogs['"+d+"'].toast['"+language_b.value+"']",k,"icon_toast",i,d);
                                }
                            }
                        }
                    }
                }else if(story_script[k][i].terrain_map){
                    for(var d=0;d<story_script[k][i].terrain_map.objects.length;d++){
                        if(typeof story_script[k][i].terrain_map.objects[d].name==='string'){
                            if(story_script[k][i].terrain_map.objects[d].name.length>0){la++;lb++;a++;}
                            add_string(story_script[k][i].terrain_map.objects[d].name,"data_la(story_script['"+k+"']['"+i+"'].terrain_map.objects['"+d+"'],'name');story_script['"+k+"']['"+i+"'].terrain_map.objects['"+d+"'].name['"+language_a.value+"']",story_script[k][i].terrain_map.objects[d].name,"data_la(story_script['"+k+"']['"+i+"'].terrain_map.objects['"+d+"'],'name');story_script['"+k+"']['"+i+"'].terrain_map.objects['"+d+"'].name['"+language_b.value+"']",k,"icon_map",i);
                        }else{
                            if(!story_script[k][i].terrain_map.objects[d].name[language_a.value]){story_script[k][i].terrain_map.objects[d].name[language_a.value]=""}
                            if(!story_script[k][i].terrain_map.objects[d].name[language_b.value]){story_script[k][i].terrain_map.objects[d].name[language_b.value]=""}
                            la+=story_script[k][i].terrain_map.objects[d].name[language_a.value].length>0?1:0;
                            lb+=story_script[k][i].terrain_map.objects[d].name[language_b.value].length>0?1:0;a++;
                            add_string(story_script[k][i].terrain_map.objects[d].name[language_a.value],"story_script['"+k+"']['"+i+"'].terrain_map.objects['"+d+"'].name['"+language_a.value+"']",story_script[k][i].terrain_map.objects[d].name[language_b.value],"story_script['"+k+"']['"+i+"'].terrain_map.objects['"+language_b.value+"']",k,"icon_map",i);
                        }
                    }
                }else if(story_script[k][i].hidden_objects){
                    for(var d=0;d<story_script[k][i].hidden_objects.objects.length;d++){
                        if(typeof story_script[k][i].hidden_objects.objects[d].name==='string'){
                            if(story_script[k][i].hidden_objects.objects[d].name.length>0){la++;lb++;a++;}
                            add_string(story_script[k][i].hidden_objects.objects[d].name,"data_la(story_script['"+k+"']['"+i+"'].hidden_objects.objects['"+d+"'],'name');story_script['"+k+"']['"+i+"'].hidden_objects.objects['"+d+"'].name['"+language_a.value+"']",story_script[k][i].hidden_objects.objects[d].name,"data_la(story_script['"+k+"']['"+i+"'].hidden_objects.objects['"+d+"'],'name');story_script['"+k+"']['"+i+"'].hidden_objects.objects['"+d+"'].name['"+language_b.value+"']",k,"icon_search",i);
                        }else{
                            if(!story_script[k][i].hidden_objects.objects[d].name[language_a.value]){story_script[k][i].hidden_objects.objects[d].name[language_a.value]=""}
                            if(!story_script[k][i].hidden_objects.objects[d].name[language_b.value]){story_script[k][i].hidden_objects.objects[d].name[language_b.value]=""}
                            la+=story_script[k][i].hidden_objects.objects[d].name[language_a.value].length>0?1:0;
                            lb+=story_script[k][i].hidden_objects.objects[d].name[language_b.value].length>0?1:0;a++;
                            add_string(story_script[k][i].hidden_objects.objects[d].name[language_a.value],"story_script['"+k+"']['"+i+"'].hidden_objects.objects['"+d+"'].name['"+language_a.value+"']",story_script[k][i].hidden_objects.objects[d].name[language_b.value],"story_script['"+k+"']['"+i+"'].hidden_objects.objects['"+language_b.value+"']",k,"icon_search",i);
                        }
                    }
                }
            }
        };all_blocks++;
    }
    function add_string(sa,aa,sb,ab,k,i,f,r,u){
        var c,row=document.createElement("tr"),td0=document.createElement("td"),td1=document.createElement("td"),td2=document.createElement("td"),td3=document.createElement("td"),imp=document.createElement("input");
        td1.innerHTML="<span class='icon_m "+i+"' style='margin-bottom:-4px;display:inline-block;width:26px;height:18px;'"+((f>=0)?" onclick='scen_data[1]="+f+";scen_data[2]="+(r+1)+";play_novel(\""+k+"\",true);'":"")+"></span>"+(u?u:k);
        td1.style="white-space:nowrap;padding-right:8px;width:48px;user-select:text;";
        td1.style.borderRight="1px solid var(--cb)";
        imp.value=sa?sa:"";
        imp.type='text';
        imp.setAttribute("onchange",aa+"=this.value");
        td2.style="border-right:1px solid var(--cb);width:calc(50% - 48px);";
        td2.appendChild(imp);
        imp=document.createElement("input");
        imp.value=sb?sb:"";
        imp.type='text';
        imp.setAttribute("onchange",ab+"=this.value;");
        td3.appendChild(imp);
        if(story_script.blocks[k]&&story_script.blocks[k][3]){
            c=!(tab.getElementsByTagName('tr').length%2)?colorLuminance(story_script.blocks[k][3],-0x111111):story_script.blocks[k][3]
            td1.style.backgroundColor=c
            td2.style.backgroundColor=c
            td3.style.backgroundColor=c
        }
        row.appendChild(td1);
        row.appendChild(td2);
        row.appendChild(td3);
        tab.appendChild(row);
    }
    translation_id.style.width=Math.ceil(tab.getElementsByTagName('tr')[0].getElementsByTagName('td')[0].offsetWidth)+"px";
    translation_left.style.width=Math.ceil(tab.getElementsByTagName('tr')[0].getElementsByTagName('td')[1].offsetWidth)+"px";
    left_block=tab.getElementsByTagName('tr')[0].getElementsByTagName('td')[1];
    translation_slider.style.height=translation_input.offsetHeight+"px";
    translation_slider.style.left=translation_left.offsetWidth+(translation_id.offsetWidth-5)+"px";
    left_block.style.width=translation_left.offsetWidth+"px";
    update_texts_a.innerHTML=la+" ("+(la/a*100).toFixed(2)+"%)";
    update_texts_b.innerHTML=lb+" ("+(lb/a*100).toFixed(2)+"%)";
    translation_slider.addEventListener("mousedown",slideReady);
    document.addEventListener("mouseup",slideFinish);
    translation_slider.addEventListener("touchstart",slideReady);
    document.addEventListener("touchend",slideFinish);
}
function translation_search(txt){
    var txt1,txt2,i,id_block,li=document.getElementById('translation_input').getElementsByTagName('tbody')[0].getElementsByTagName('tr');
    for(i=0;i<li.length;i++){
        txt0=li[i].getElementsByTagName('td')[0].textContent
        txt1=li[i].getElementsByTagName('td')[1].getElementsByTagName('input')[0].value
        txt2=li[i].getElementsByTagName('td')[2].getElementsByTagName('input')[0].value
        if(txt0.toUpperCase().includes(txt)||txt1.toUpperCase().includes(txt)||txt2.toUpperCase().includes(txt)){li[i].style.display="table-row";left_block=li[i].getElementsByTagName('td')[1];}
        else{li[i].style.display="none";}
    }
    translation_slider.style.height=translation_input.offsetHeight+"px";
    translation_slider.style.left=translation_left.offsetWidth+(translation_id.offsetWidth-5)+"px";
    left_block.style.width=translation_left.offsetWidth+"px";
}
function slideReady(e){
    e.preventDefault();clicked=1;
    document.addEventListener("mousemove",slideMove);
    document.addEventListener("touchmove",slideMove);
}
function slideFinish(){clicked=0;var a=left_block.getBoundingClientRect();translation_slider.style.left=a.right-6+"px";}
function slideMove(e){
    var pos,a;
    if(clicked==0) return false;
    e=(e.changedTouches)?e.changedTouches[0]:e;
    a=left_block.getBoundingClientRect();
    pos=html.scrollLeft+e.clientX-a.left-window.pageXOffset;
    if(pos<0){pos=0;}else if(pos>(body.offsetWidth-128)){pos=(body.offsetWidth-128);}
    translation_left.style.width=pos+"px";
    translation_slider.style.left=pos+(translation_id.offsetWidth-5)+"px";
    left_block.style.width=pos+"px";
}
var state_num=0;
function state_save(){
    if(state_num>0){back_up.splice(0,state_num);state_num=0;}
    back_up.unshift(JSON.stringify(story_script));
    if(back_up.length>10){back_up.pop();}
}
function state_back(n){
    state_num+=n
    if(state_num<0){state_num=0}else if(state_num>=back_up.length-1){state_num=back_up.length-1};
    story_script=JSON.parse(back_up[state_num]);
    if(scene_screen){if(!tool_update){scen_edit_update(true)}else{eval(tool_update)}}else{update_novel();}
}
let last_code;
function code_edit(edit,show,code){
    if(code=="js"){show.innerHTML=syntax_javascipt(edit.value)}
    else if(code=="json"){show.innerHTML=syntax_json(edit.value)}
    else {show.innerHTML=edit.value}
    let e=show.getBoundingClientRect();
    edit.style.width =(e.width+100)+'px';
    edit.style.height=(e.height+100)+'px';
    if(code){last_code=code}
}
function syntax_json(code){
    code=code.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
    return code.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,function(data){
        var style="null";
        if (/^"/.test(data)){if(/:$/.test(data)){style="code_elem_5'";}else{style="code_elem_2";}}
        else if(/true|false|null/.test(data)){style="code_elem_3";}
        else if(/[0-9]/.test(data)){style="code_elem_4";}
        return "<span class='"+style+"' style='filter:none;'>"+data+"</span>";
    }
)}
function syntax_javascipt(code){
    function isAlphaNumericChar(char){return char&&/[0-9a-z_\$]/i.test(char);}
    const states={NONE:0,SINGLE_QUOTE:1,DOUBLE_QUOTE:2,ML_QUOTE:3,REGEX_LITERAL:4,SL_COMMENT:5,ML_COMMENT:6,NUMBER_LITERAL:7,KEYWORD:8,SPECIAL:9,ELEMENT:10};
    const keywords=["async","await","break","case","class","const","continue","debugger","default","delete","do","else","enum","export","extends","for","from","function","get","if","implements","import","in","instanceof","interface","let","new","of","package","private","protected","public","return","set","static","super","switch","throw","try","typeof","var","void","while","with","yield","catch","finally"];
    const specials=["this","null","true","false","undefined","NaN","Infinity"]
    const elements=["window","document","addEventListener","removeEventListener","tuesday"];
    let output='',state=states.NONE;
    for (let i=0;i<code.length;i++){
        let char=code[i],prev=code[i-1],next=code[i+1];
        if(state==states.NONE&&char=='/'&&next=='/'){state=states.SL_COMMENT;output+="<span class='code_elem_1'>"+char;continue;}
        if(state==states.SL_COMMENT&&char=='\n'){state=states.NONE;output+=char+'</span>';continue;}
        if(state==states.NONE&&char=='/'&&next=='*'){state=states.ML_COMMENT;output+="<span class='code_elem_1'>"+char;continue;}
        if(state==states.ML_COMMENT&&char=='/'&&prev=='*'){state=states.NONE;output+=char+'</span>';continue;}
        const closingCharNotEscaped=prev!='\\'||prev=='\\'&&code[i-2]=='\\';
        if(state==states.NONE&&char=='\''){state=states.SINGLE_QUOTE;output+="<span class='code_elem_2'>"+char;continue;}
        if(state==states.SINGLE_QUOTE&&char=='\''&&closingCharNotEscaped){state=states.NONE;output+=char+'</span>';continue;}
        if(state==states.NONE&&char=='"'){state=states.DOUBLE_QUOTE;output+="<span class='code_elem_2'>"+char;continue;}
        if(state==states.DOUBLE_QUOTE&&char=='"'&&closingCharNotEscaped){state=states.NONE;output+=char+'</span>';continue;}
        if(state==states.NONE&&char=='`'){state=states.ML_QUOTE;output+="<span class='code_elem_2'>"+char;continue;}
        if(state==states.ML_QUOTE&&char=='`'&&closingCharNotEscaped){state=states.NONE;output+=char+'</span>';continue;}
        if(state==states.NONE&&char=='/'){
            let word='',j=0,isRegex=true;
            while(i+j>=0){j--;
                if('+/-*=|&<>%,({[?:;'.indexOf(code[i+j])!=-1)break;
                if(!isAlphaNumericChar(code[i+j])&&word.length>0)break;
                if(isAlphaNumericChar(code[i+j]))word=code[i+j]+word;
                if(')]}'.indexOf(code[i+j])!=-1){isRegex=false;break;}
            }
            if(word.length>0&&!keywords.includes(word))isRegex=false;
            if(isRegex){state=states.REGEX_LITERAL;output+="<span class='code_elem_2'>"+char;continue;}
        }
        if(state==states.REGEX_LITERAL&&char=='/'&&closingCharNotEscaped){state=states.NONE;output+=char+'</span>';continue;}
        if(state==states.NONE&&/[0-9]/.test(char)&&!isAlphaNumericChar(prev)){state=states.NUMBER_LITERAL;output+="<span class='code_elem_4'>"+char;continue;}
        if(state==states.NUMBER_LITERAL&&!isAlphaNumericChar(char)){state=states.NONE;output+='</span>'}
        if(state==states.NONE&&!isAlphaNumericChar(prev)){
            let word='', j=0;
            while(code[i+j]&&isAlphaNumericChar(code[i+j])){word+=code[i+j];j++;}
            if(keywords.includes(word)){state=states.KEYWORD;output+="<span class='code_elem_3'>";}
            if(specials.includes(word)){state=states.SPECIAL;output+="<span class='code_elem_3'>";}
            if(elements.includes(word)){state=states.ELEMENT;output+="<span class='code_elem_2'>";}
        }
        if((state==states.KEYWORD||state==states.SPECIAL||state==states.ELEMENT)&&!isAlphaNumericChar(char)){state=states.NONE;output+='</span>';}
        if(state==states.NONE&&'+-/*=&|%!<>?:'.indexOf(char)!=-1){output+="<span class='code_elem_5'>"+char+'</span>';continue;}
        output+=char.replace('<', '&lt;');
    }
    return output.replace(/\n/gm,'<br>').replace(/\t/g,'&Tab;').replace(/^\s+|\s{2,}/g,(a)=>new Array(a.length+1).join('&nbsp;')); //let symbol_tab=Array(4).join('\u00a0'); //.replace(/\t/g,document.createTextNode('\u00a0'))
}
