// Dark Mode
function setDarkMode() {
    $("#DarkLightToggle").text("Light Mode");
    $(".page").addClass("bg-dark light-content")
    $(".main-nav").removeClass("light-after-scroll")
    $(".divider").addClass("white")
    $(".page-section").addClass("bg-dark light-content")
    $(".home-section").toggleClass("bg-dark-alfa-50 bg-dark-alfa-70")
    $("#work-grid").removeClass("hover-white")
    $(".small-section").toggleClass("bg-dark-alfa-50 bg-dark-alfa-70")
    $(".call-action-btn").addClass("btn-w")
    $(".submit_btn").addClass("btn-w")
    $(".main-footer-div").toggleClass("bg-dark-alfa-50 bg-dark-alfa-70")
}

// Light Mode
function setLightMode() {
    $("#DarkLightToggle").text("Dark Mode");
    $(".page").removeClass("bg-dark light-content")
    $(".main-nav").addClass("light-after-scroll")
    $(".divider").removeClass("white")
    $(".page-section").removeClass("bg-dark light-content")
    $(".home-section").toggleClass("bg-dark-alfa-50 bg-dark-alfa-70")
    $("#work-grid").addClass("hover-white")
    $(".small-section").toggleClass("bg-dark-alfa-50 bg-dark-alfa-70")
    $(".call-action-btn").removeClass("btn-w")
    $(".submit_btn").removeClass("btn-w")
    $(".main-footer-div").toggleClass("bg-dark-alfa-50 bg-dark-alfa-70")
}

function DarkLightToggle() {
    if ($("#DarkLightToggle").text() === "Light Mode") {
        localStorage.setItem("theme", "light");
        location.reload();
    } else {
        localStorage.removeItem("theme");
        location.reload();
    }
}