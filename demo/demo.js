/* close overlay */
let overlay = document.getElementById("overlay-icon-preview");
overlay.onclick = function() {
    document.body.className = document.body.className.replace(/overlay-open/g, '');
};

/* do not propagate events - e.g. clicking - to prevent unwanted interactions */
let overlay_container = document.getElementsByClassName("overlay-container");
for(let i = 0; i < overlay_container.length; i++){
    overlay_container[i].onclick = function(e) {
        e.stopPropagation();
    };
}

/* open modal when clicking on an icon container */
let container = document.getElementsByClassName("container");
for(let i = 0; i < container.length; i++){
    container[i].onclick = function(e) {
        e.preventDefault();
        document.body.className += " overlay-open";
        let curr_classes = this.getElementsByClassName("booty-svg")[0].className;
        document.getElementById("icon-preview").className = curr_classes;
        document.getElementById("icon-class-font").innerText = curr_classes;
        document.getElementById("icon-class-svg").innerText = curr_classes.replace(/ font-/g, ' svg-');
        document.getElementById("icon-title").innerText = curr_classes.replace(/booty-svg/g, '').replace(/\ font-/g, '').replace(/\ bsvg-/g, '').replace(/\ /g, '');
    };
}

/* copy html code */
function copy_code(e) {
    e.preventDefault();
    let copy_helper = document.getElementById("icon-copy-helper");
    copy_helper.value = document.getElementById(this.dataset.source).innerText;

    copy_helper.select();
    copy_helper.setSelectionRange(0, 99999); /* for mobile browsers */

    navigator.clipboard.writeText(copy_helper.value);

    let icon_button = this.getElementsByClassName("booty-svg")[0];
    icon_button.className = "booty-svg font-check";
    setTimeout(function() {
        icon_button.className = "booty-svg font-copy";
    }, 600);
}

let buttons_copy = document.getElementsByClassName("icon-copy");
for(let i = 0; i < buttons_copy.length; i++) {
    buttons_copy[i].onclick = copy_code;
}

/* search */
let txt_filter_icons = document.getElementById("txt_filter_icons");

function show_icon(element) {
    element.style = "";
}

function hide_icon(element) {
    element.style = "position:absolute;left:-2000";
}

function filter_match(search, element) {
    if(search.length < 1) {
        return true;
    }
    let subject = element.getElementsByClassName("booty-svg")[0].className.replace(/booty-svg/g, '').replace(/\ font-/g, '').replace(/ bsvg-/g, '').replace(/\ /g, '');
    return subject.toLowerCase().includes(search.toLowerCase());
}

function filter_icons() {
    let demo_container = document.getElementById("conatiner-demo-icons");
    let curr_element = null;
    let search = document.getElementById("txt_filter_icons").value;

    for(let i = 0; i < demo_container.children.length; i++) {
        curr_element = demo_container.children[i];
        if(filter_match(search, curr_element)) {
            show_icon(curr_element);
        }
        else {
            hide_icon(curr_element);
        }
    }
}

document.getElementById("btn_filter_icons_clear").onclick = function() {
    txt_filter_icons.value = "";
    filter_icons();
}

txt_filter_icons.onkeyup = filter_icons;