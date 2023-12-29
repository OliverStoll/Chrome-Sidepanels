//  ##################     TABBING     ##################

document.addEventListener('keydown', function(e){
  // SPOTIFY
  let spotify_map = {j: "1", k: "2", l: "3",  n: "4", m: "5", ö: "6"}
  if (e.key in spotify_map) {
    let button = document.querySelector("body > home-assistant").shadowRoot.querySelector("home-assistant-main").shadowRoot.querySelector("ha-drawer > partial-panel-resolver > ha-panel-lovelace").shadowRoot.querySelector("hui-root").shadowRoot.querySelector("#view > hui-view > hui-masonry-view").shadowRoot.querySelector("#columns > div > hui-horizontal-stack-card:nth-child(2)").shadowRoot.querySelector("#root > hui-button-card:nth-child(" + spotify_map[e.key] + ")").shadowRoot.querySelector("ha-card")
    button.click()
  }

  // Playlists
  if (e.key >= 1 && e.key <= 9) {
    let button = document.querySelector("body > home-assistant").shadowRoot.querySelector("home-assistant-main").shadowRoot.querySelector("ha-drawer > partial-panel-resolver > ha-panel-lovelace").shadowRoot.querySelector("hui-root").shadowRoot.querySelector("#view > hui-view > hui-masonry-view").shadowRoot.querySelector("#columns > div > hui-vertical-stack-card").shadowRoot.querySelector("#root > hui-button-card:nth-child(" + e.key + ")").shadowRoot.querySelector("ha-card")
    button.click()
  }

  // Scenes
  let scene_map = {a: "1", s: "2", d: "3", f: "4"}
  if (e.key in scene_map) {
    let button = document.querySelector("body > home-assistant").shadowRoot.querySelector("home-assistant-main").shadowRoot.querySelector("ha-drawer > partial-panel-resolver > ha-panel-lovelace").shadowRoot.querySelector("hui-root").shadowRoot.querySelector("#view > hui-view > hui-masonry-view").shadowRoot.querySelector("#columns > div > hui-horizontal-stack-card:nth-child(4)").shadowRoot.querySelector("#root > hui-button-card:nth-child(" + scene_map[e.key] + ")").shadowRoot.querySelector("ha-card")
    button.click()
  }






})