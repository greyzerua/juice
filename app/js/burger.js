document.addEventListener("DOMContentLoaded", function () {
  let toggleMenuButton = document.querySelector(".toggle-menu");
  let menu = document.getElementById("menu");

  toggleMenuButton.addEventListener("click", function () {
    if (toggleMenuButton.classList.contains("active")) {
      toggleMenuButton.classList.remove("active");
    } else {
      toggleMenuButton.classList.add("active");
    }

    if (menu.classList.contains("open")) {
      document.body.style.overflow = "";
      menu.classList.remove("open");
    } else {
      document.body.style.overflow = "hidden";
      menu.classList.add("open");
    }
  });
});
