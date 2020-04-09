
function insertLoadingElement() {
    var loading = document.createElement("div");
    loading.id="loadingContainer";

    var subHtml = "<div id=\"loader\">"+
        "<div class=\"loader-cover\"></div>"+
        "<div class=\"wrap go\">" +
        "<div class=\"load-wrapper\">" +
        "<div class=\"orbit\">" +
        "<div class=\"ball\"></div>" +
        "<div class=\"ball\"></div>" +
        "<div class=\"ball\"></div>" +
        "<div class=\"ball\"></div>" +
        "</div>" +
        "<div class=\"loading\">" +
        "<span class=\"letter\">--</span>" +
        "<span class=\"letter\"> </span>" +
        "<span class=\"letter\">L</span>" +
        "<span class=\"letter\">O</span>" +
        "<span class=\"letter\">A</span>" +
        "<span class=\"letter\">D</span>" +
        "<span class=\"letter\">I</span>" +
        "<span class=\"letter\">N</span>" +
        "<span class=\"letter\">G</span>" +
        "<span class=\"letter\"></span>" +
        "<span class=\"letter\">--</span>" +
        "</div>" +
        "</div>" +
        "</div>"+
        "</div>" +
        "</div>";

    loading.innerHTML = subHtml;
    document.body.appendChild(loading);
}

function showLoading() {
    insertLoadingElement();
}

function hideLoading() {
    $("#loadingContainer").remove();
}
