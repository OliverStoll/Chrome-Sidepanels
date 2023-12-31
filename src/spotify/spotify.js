const client_id = 'f80a4d34d449473ca701fdf0a25fd483';
const redirect_uri = 'http://localhost:7787/oauth';


async function getAccessTokenByCredentials(callback) {
  const state = "teststate";
  const scope = 'user-read-private user-read-email user-read-playback-state user-modify-playback-state user-read-currently-playing streaming user-library-read';
  let url = 'https://accounts.spotify.com/authorize';
  url += '?response_type=token';
  url += '&client_id=' + encodeURIComponent(client_id);
  url += '&scope=' + encodeURIComponent(scope);
  url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
  url += '&state=' + encodeURIComponent(state);

  chrome.tabs.create({ url: url }, (tab) => {
    chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo, updatedTab) {
      if (updatedTab.url.startsWith(redirect_uri) && changeInfo.status === 'complete' && tabId === tab.id) {
        let urlFragment = new URL(updatedTab.url).hash.substring(1); // Remove the "#" symbol
        let urlParams = new URLSearchParams(urlFragment);
        let accessToken = urlParams.get('access_token');
        chrome.storage.local.set({ accessToken })
        chrome.tabs.remove(tabId);
        chrome.tabs.onUpdated.removeListener(listener);
        callback(accessToken);
      }
    });
  });
}


function getAccessToken(callback) {
  chrome.storage.local.get('accessToken', function (result) {
    if (chrome.runtime.lastError) {
      console.error('Error loading access token:', chrome.runtime.lastError);
      callback(null);
    } else {
      const accessToken = result.accessToken;
      if (accessToken) {
        callback(accessToken);
      } else {
        getAccessTokenByCredentials(callback);
      }
    }
  });
}


async function fetch_spotify(accessToken, method, url) {
    const response = await fetch(url, {
        method: method,
        headers: { Authorization: 'Bearer ' + accessToken }
    });
    console.log(response)
    return await response.json();
}






// get current playing song
async function getCurrentSong(token) {
  let data = await fetch_spotify(token, "GET", 'https://api.spotify.com/v1/me/player/currently-playing');
  let song = data.item.name;
  let artists = data.item.artists.map(artist => artist.name).join(', ');
  let image = data.item.album.images[0].url;
  return { song, artists, image };
}

// switch to next song
async function nextSong(token) {
  await fetch_spotify(token, "PUT", 'https://api.spotify.com/v1/me/player/next');
}



document.addEventListener('DOMContentLoaded', function () {
  getAccessToken(async function (token)  {
    let data = await getCurrentSong(token)
    console.log(data)
    let resp = await nextSong(token)
    console.log(resp)
  });
});