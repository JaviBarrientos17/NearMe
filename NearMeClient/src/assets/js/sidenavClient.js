$(function () {
  "use strict";

  // click outisde offcanvas
  $(document).mouseup(function (e) {
    var container = $(".sidebar");
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      if ($("body").hasClass("show-sidebar")) {
        $("body").removeClass("show-sidebar");
        $("body").find(".js-menu-toggle").removeClass("active");
      }
    }
  });
});
function toggleClient() {
  var $this = $(this);
  console.log("SIDENAV CLIENT");
  if ($("body").hasClass("show-sidebar")) {
    $("body").removeClass("show-sidebar");
    $this.removeClass("active");
  } else {
    $("body").addClass("show-sidebar");
    $this.addClass("active");
  }
}
