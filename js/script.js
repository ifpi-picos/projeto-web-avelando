document.addEventListener("scroll", function() {
    var header = document.querySelector("header");
    var section2 = document.querySelector(".second-section").offsetTop;
    var headerHeight = header.offsetHeight;

    if (window.pageYOffset >= section2 - headerHeight) {
        header.classList.add("hide-header");
    } else {
        header.classList.remove("hide-header");
    }
});
