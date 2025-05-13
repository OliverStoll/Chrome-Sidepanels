    //  ##################     SIDE PANEL - QUERY PARAMETER     #################
function addSidePanelQueryParam() {
    let url = window.location.href;
    if (!url.includes("side_panel=")) {
        if (url.includes("?")) {
            window.history.pushState({}, '', `${window.location.href}&side_panel=1`);
        } else {
            window.history.pushState({}, '', `${window.location.href}?side_panel=1`);
        }
    }
}
window.onpopstate = function(event) {
  console.log("URL changed:", window.location.href);
  addSidePanelQueryParam()
};