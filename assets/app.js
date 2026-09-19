/* Compatibility loader: the main application script lives at the repository root. */
(function () {
  var script = document.createElement("script");
  script.src = "../app.js";
  script.defer = true;
  document.head.appendChild(script);
})();
