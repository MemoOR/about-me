/* Dark / light theme toggle.
 * Ported from the original Flask `includes/dark_mode.html`. The toggle now shows
 * a minimalist icon reflecting the current theme (moon = dark, sun = light)
 * instead of a text label, so it stays static and language-agnostic. */
(function () {
    function setToggleIcon(name) {
        var el = document.getElementById("DarkLightToggle");
        if (el) {
            el.innerHTML =
                '<i class="fa-solid fa-' + name + '" aria-hidden="true"></i>';
        }
    }

    // Dark Mode
    window.setDarkMode = function setDarkMode() {
        setToggleIcon("moon");
        $(".page").addClass("bg-dark light-content");
        $(".home-section, .small-section, .main-footer").removeClass("bg-dark-alfa-50");
        $(".home-section, .small-section, .main-footer").addClass("bg-dark-alfa-70");
        $(".main-nav").removeClass("light-after-scroll").addClass("dark");
        $(".divider").addClass("white");
        $(".page-section").addClass("bg-dark light-content");
        $("#work-grid").removeClass("hover-white");
        $(".call-action-btn").addClass("btn-w");
        $(".submit_btn").addClass("btn-w");
    };

    // Light Mode
    window.setLightMode = function setLightMode() {
        setToggleIcon("sun");
        $(".page").removeClass("bg-dark light-content");
        $(".home-section, .small-section, .main-footer").removeClass("bg-dark-alfa-70");
        $(".home-section, .small-section, .main-footer").addClass("bg-dark-alfa-50");
        $(".main-nav").addClass("light-after-scroll");
        $(".divider").removeClass("white");
        $(".page-section").removeClass("bg-dark light-content");
        $("#work-grid").addClass("hover-white");
        $(".call-action-btn").removeClass("btn-w");
        $(".submit_btn").removeClass("btn-w");
    };

    window.DarkLightToggle = function DarkLightToggle() {
        // localStorage is the source of truth for the theme (light, or absent = dark).
        if (localStorage.getItem("theme") === "light") {
            localStorage.removeItem("theme");
            document.documentElement.dataset.appliedTheme = "dark";
            window.setDarkMode();
        } else {
            localStorage.setItem("theme", "light");
            document.documentElement.dataset.appliedTheme = "light";
            window.setLightMode();
        }
        // The navbar's dark/light state is driven by the scroll handler
        // (init_classic_menu). Re-run it so the topbar updates immediately
        // for the current scroll position instead of waiting for a scroll.
        if (window.jQuery) {
            window.jQuery(window).trigger("scroll");
        }
    };
})();
