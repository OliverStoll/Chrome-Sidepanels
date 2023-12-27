(function () {
    var scriptUrl = 'https://embed-cdn.spotifycdn.com/_next/static/iframe_api.83be6a4253944a20d119.js';
    var host = 'https://open.spotify.com';
    try {
      var ttPolicy = window.trustedTypes.createPolicy('spotify-embed-api', {
        createScriptURL: function (x) {
          return x;
        },
      });
      scriptUrl = ttPolicy.createScriptURL(scriptUrl);
    } catch (e) {}

    if (!window.SpotifyIframeConfig) {
      window.SpotifyIframeConfig = {};
    }
    SpotifyIframeConfig.host = host;


    if (SpotifyIframeConfig.loading) {
      console.warn('The Spotify Iframe API has already been initialized.');
      return;
    }
    SpotifyIframeConfig.loading = 1;

    var a = document.createElement('script');
    a.type = 'text/javascript';
    a.id = 'spotify-iframeapi-script';
    a.src = scriptUrl;
    a.async = true;
    var c = document.currentScript;
    if (c) {
      var n = c.nonce || c.getAttribute('nonce');
      if (n) a.setAttribute('nonce', n);
    }
    var b = document.getElementsByTagName('script')[0];
    b.parentNode.insertBefore(a, b);

})();


window.onSpotifyIframeApiReady = (IFrameAPI) => {
  const element = document.getElementById('embed-iframe');
  const options = {
    width: '100%',
    height: '160',
    uri: 'spotify:episode:7makk4oTQel546B0PZlDM5'
  };
  const callback = (EmbedController) => {
    document.querySelectorAll('.episode').forEach(
      episode => {
        episode.addEventListener('click', () => {
          EmbedController.loadUri(episode.dataset.spotifyId)
        });
      })
  };
  IFrameAPI.createController(element, options, callback);
};
