// Dark Mode
function setDarkMode() {
    $("#DarkLightToggle").text("Light Mode");
    $(".page").addClass("bg-dark light-content")
    $(".home-section, .small-section, .main-footer-div").removeClass("bg-dark-alfa-50")
    $(".home-section, .small-section, .main-footer-div").addClass("bg-dark-alfa-70")
    $(".main-nav").removeClass("light-after-scroll")
    $(".divider").addClass("white")
    $(".page-section").addClass("bg-dark light-content")
    $("#work-grid").removeClass("hover-white")
    $(".call-action-btn").addClass("btn-w")
    $(".submit_btn").addClass("btn-w")
}

// Light Mode
function setLightMode() {
    $("#DarkLightToggle").text("Dark Mode");
    $(".page").removeClass("bg-dark light-content")
    $(".home-section, .small-section, .main-footer-div").removeClass("bg-dark-alfa-70")
    $(".home-section, .small-section, .main-footer-div").addClass("bg-dark-alfa-50")
    $(".main-nav").addClass("light-after-scroll")
    $(".divider").removeClass("white")
    $(".page-section").removeClass("bg-dark light-content")
    $("#work-grid").addClass("hover-white")
    $(".call-action-btn").removeClass("btn-w")
    $(".submit_btn").removeClass("btn-w")
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