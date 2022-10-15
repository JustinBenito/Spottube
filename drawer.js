var drawerhomeButton = document.getElementById("drawerhomeButton");
if (drawerhomeButton) {
  drawerhomeButton.addEventListener("click", function (e) {
    window.location.href = "/";
  });
}

var drawerspottubeButton = document.getElementById("drawerspottubeButton");
if (drawerspottubeButton) {
  drawerspottubeButton.addEventListener("click", function (e) {
    window.location.href = "./spottube.html";
  });
}

var drawercontactButton = document.getElementById("drawercontactButton");
if (drawercontactButton) {
  drawercontactButton.addEventListener("click", function (e) {
    window.location.href = "./contact.html";
  });
}

var iconButton = document.getElementById("iconButton");
if (iconButton) {
  iconButton.addEventListener("click", function () {
    var drawerOverlay = document.getElementById("drawer");
    if (!drawerOverlay) return;
    var drawerOverlayStyle = drawerOverlay.style;
    if (drawerOverlayStyle) {
      drawerOverlayStyle.display = "flex";
      drawerOverlayStyle.zIndex = 99;
      drawerOverlayStyle.backgroundColor = "rgba(113, 113, 113, 0.3)";
      drawerOverlayStyle.alignItems = "center";
      drawerOverlayStyle.justifyContent = "";
    }
    drawerOverlay.setAttribute("closable", "");

    var onClick =
      drawerOverlay.onClick ||
      function (e) {
        if (
          e.target === drawerOverlay &&
          drawerOverlay.hasAttribute("closable")
        ) {
          drawerOverlayStyle.display = "none";
        }
      };
    drawerOverlay.addEventListener("click", onClick);
  });
}
//contact
var spottubeButton = document.getElementById("spottubeButton");
if (spottubeButton) {
  spottubeButton.addEventListener("click", function (e) {
    window.location.href = "./spottube.html";
  });
}

var contactButton = document.getElementById("contactButton");
if (contactButton) {
  contactButton.addEventListener("click", function (e) {
    window.location.href = "./contact.html";
  });
}

var letsGoBtn = document.getElementById("letsGoBtn");
if (letsGoBtn) {
  letsGoBtn.addEventListener("click", function (e) {
    window.location.href = "./spottube.html";
  });
}

var homeButton = document.getElementById("homeButton");
if (homeButton) {
  homeButton.addEventListener("click", function (e) {
    window.location.href = "./index.html";
  });
}

var scrollAnimElements = document.querySelectorAll("[data-animate-on-scroll]");
var observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting || entry.intersectionRatio > 0) {
        const targetElement = entry.target;
        targetElement.classList.add("animate");
        observer.unobserve(targetElement);
      }
    }
  },
  {
    threshold: 0.15,
  }
);

for (let i = 0; i < scrollAnimElements.length; i++) {
  observer.observe(scrollAnimElements[i]);
}
