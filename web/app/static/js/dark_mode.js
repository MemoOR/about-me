// Dark Mode
function setDarkMode() {
    $("#DarkLightToggle").text("Dark Mode");
    $(".page").addClass("bg-dark light-content")
    $(".page-loader").addClass("dark")
    $(".main-nav").removeClass("light-after-scroll")
    $(".divider").addClass("white")
    $(".page-section").addClass("bg-dark light-content")
    $(".home-section").toggleClass("bg-dark-alfa-50 bg-dark-alfa-70")
    $("#work-grid").removeClass("hover-white")
    $(".small-section").removeClass("bg-gray")
    $(".small-section").addClass("bg-dark-lighter light-content")
    $(".call-action-btn").addClass("btn-w")
    $(".submit_btn").addClass("btn-w")
    $(".main-footer").removeClass("bg-gray-lighter")
    $(".main-footer").addClass("bg-dark-lighter light-content")
}

// Light Mode
function setLightMode() {
    $("#DarkLightToggle").text("Light Mode");
    $(".page").removeClass("bg-dark light-content")
    $(".page-loader").removeClass("dark")
    $(".main-nav").addClass("light-after-scroll")
    $(".divider").removeClass("white")
    $(".page-section").removeClass("bg-dark light-content")
    $(".home-section").toggleClass("bg-dark-alfa-50 bg-dark-alfa-70")
    $("#work-grid").addClass("hover-white")
    $(".small-section").addClass("bg-gray")
    $(".small-section").removeClass("bg-dark-lighter light-content")
    $(".call-action-btn").removeClass("btn-w")
    $(".submit_btn").removeClass("btn-w")
    $(".main-footer").addClass("bg-gray-lighter")
    $(".main-footer").removeClass("bg-dark-lighter light-content")
}

function DarkLightToggle() {
    if ($("#DarkLightToggle").text() === "Dark Mode") {
        localStorage.setItem("mode", "light");
        location.reload();
    } else {
        localStorage.removeItem("mode");
        location.reload();
    }
}