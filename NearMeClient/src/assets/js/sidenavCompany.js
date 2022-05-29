let botonToggle = document.getElementById("sidebarCollapse");
(function ($) {
  "use strict";

  var fullHeight = function () {
    console.log("SIDENAV COMPANY1");

    $(".js-fullheight").css("height", $(window).height());
    $(window).resize(function () {
      $(".js-fullheight").css("height", $(window).height());
    });
  };
  fullHeight();

  //   $("#sidebarCollapse").on("click", function () {
  //     console.log("SIDENAV COMPANY2");
  //     $("#sidebar").toggleClass("active");
  //   });
})(jQuery);
function toggleCompany() {
  console.log("SIDENAV COMPANY2");
  $("#sidebar").toggleClass("active");
}
