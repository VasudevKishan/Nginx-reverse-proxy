const panels = document.querySelectorAll(".panel");
const tabs = document.querySelectorAll(".tab");
const btn = document.getElementById("menu-btn");
const menu = document.getElementById("menu");
const logo = document.getElementById("logo");

tabs.forEach((tab) =>
    tab.addEventListener("click", (e) => {
        tabs.forEach((tab) => {
            // Deactivate all tabs
            tab.children[0].classList.remove(
                "border-softRed",
                "border-b-4",
                "md:border-b-0"
            );
        });
        // hide all panals
        panels.forEach((panel) => {
            panel.classList.add("hidden");
        });

        // activate new tab and panel based on target
        e.target.classList.add("border-softRed", "border-b-4");
        const classString = e.target.getAttribute("data-target");
        document
            .getElementById("panels")
            .getElementsByClassName(classString)[0]
            .classList.remove("hidden");
    })
);

// Toggle Mobile Menu

btn.addEventListener("click", () => {
    btn.classList.toggle("open");
    menu.classList.toggle("flex");
    menu.classList.toggle("hidden");
    if (menu.classList.contains("flex")) {
        logo.setAttribute("src", "./images/logo-bookmark-footer.svg");
    } else {
        logo.setAttribute("src", "./images/logo-bookmark.svg");
    }
});
