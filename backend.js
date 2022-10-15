//Spotify API

var client_id = ""; //Enter your client Id from spotify API
var redirect_uri = ""; //Enter your redirect uri from Spotify API
var items = [];
var music = [];
var videos_url = [];
var videos_url1 = [];
let output = "";
//playlist id
var playlists_id = document.getElementById("playlist");
//youtube id
var yt_link = document.getElementById("yt_link");

//Will be from input
var playlist_id = "";
//playlist url from user
let play_url = "";

// let player = "";
//for state
const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function generateString(length) {
  let result = " ";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}
var state = generateString(16);
//specify scope
var scope = "playlist-read-public"; //maybe add playlist-read-private

//on click of the button it redirects to authorization page

document.getElementById("auth").onclick = function () {
  location.href = auth();
};

document.getElementById("check").onclick = function () {
  var pla;
  play_url = document.getElementById("input_playlist").value;
  if (play_url === "") {
    alert("Please enter playlist url");
  } else if (play_url.includes("https://open.spotify.com/playlist/") == false) {
    alert("Please enter a valid playlist url");
  } else if (play_url.includes("https://open.spotify.com/playlist/")) {
    pla = play_url.split("?");
    pla = pla[0];
    let player = pla.replace("https://open.spotify.com/playlist/", "");
    playlist_id = player;
    console.log(playlist_id);
    localStorage.setItem("playlist id", playlist_id);
    alert("Connect!");
  }
};
console.log(localStorage.getItem("playlist id", playlist_id));

//authorization function
function auth() {
  var url = "https://accounts.spotify.com/authorize";
  url += "?response_type=token";
  url += "&client_id=" + encodeURIComponent(client_id);
  url += "&scopes=" + encodeURIComponent(scope);
  url += "&redirect_uri=" + encodeURIComponent(redirect_uri);
  url += "&state=" + encodeURIComponent(state);
  console.log(url);
  return url;
}
auth();

//get the current tab to check if it has been redirected
let currentTab = window.location.href;

//To get the access token from the redirected page
function accessToken() {
  currentTab = currentTab.toString();
  let accessToken = currentTab.split("&");
  accessToken = accessToken[0];
  let require = redirect_uri + "#access_token=";
  let final = accessToken.replace(require, "");
  return final;
}
//The Access token with which we can access API endpoints
var token = "Bearer " + accessToken();

//Function to get songs

var idplay = localStorage.getItem("playlist id", playlist_id);
const getSongs = async () => {
  var playlists_url = `https://api.spotify.com/v1/playlists/${idplay}/tracks`;
  const result = await fetch(playlists_url, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  });

  //the resultant json is stored into the data
  const data = await result.json();

  //loggs out music and stores it into music list
  // console.log(data.items);
  data.items.forEach((ele) => {
    // console.log(ele.track.album.images[0].url);

    //Youtube API
    let api_key = ""; //API key for youtube api get it from google console.

    let youtube_search = `https://www.googleapis.com/youtube/v3/search?key=${api_key}&q= ${ele.track.name} by ${ele.track.artists[0].name} &type=video&part=snippet&maxResults=1`;

    const getSearch = async () => {
      const result = await fetch(youtube_search, {
        method: "GET",
      });

      const ytdata = await result.json();
      items = ytdata.items;

      items.forEach((el) => {
        //download API link: https://rapidapi.com/ytjar/api/youtube-mp3-download1/
        let youtube_download =
          "https://youtube-mp3-download1.p.rapidapi.com/dl?id=" + el.id.videoId; //rapid api for downloading mp3

        const getDown = async () => {
          const res = await fetch(youtube_download, {
            method: "GET",
            headers: {
              "X-RapidAPI-Key": "", //Rapid Api key
              "X-RapidAPI-Host": "youtube-mp3-download1.p.rapidapi.com",
            },
          });

          const ytdown = await res.json();
          let download = ytdown.link;

          let ytlink = el.id.videoId;
          console.log("https://www.youtube.com/watch?v=" + el.id.videoId);

          //The card component
          output += `
    <div class="card-component-div">
    <div class="card-div">
    <div class="frame-div4">
      <img class="image-4-icon" alt="" src="${ele.track.album.images[1].url}" />
      <div class="frame-div5">
        <b class="title-of-song" >${ele.track.name}</b
        ><b class="artist-b">${ele.track.artists[0].name}</b>
        <div class="frame-div6">
          <a class="frame-button" href="${download}">
            <img
              class="icons8-music-144-1"
              alt=""
              src="public/icons8music144-1.svg"
            /></a>
          <a class="frame-button1" autofocus href="https://www.youtube.com/watch?v=${ytlink}">
            <img class="polygon-icon" alt="" src="public/polygon-1.svg" />
          </a>
        </div>
      </div>
    </div>
  </div>
  </div>
    `;
        };
        getDown();
      });
    };

    getSearch();

    music.push(
      (ele.track.name + " by " + ele.track.artists[0].name).toString()
    );
  });
  //logs out the array of music names
  console.log(music);
  return music;
};

//function which process the data
const loadGenres = async () => {
  const music_names = await getSongs();

  //for every song that is processed youtube API finds the youtube video and spits the link
  music_names.forEach((el) => {
    console.log(el);
  });

  music_names.forEach(() => {
    //video music names
    // playlists_id.textContent += " " + el + "," + "\n";
    console.log(output);
  });

  return music_names;
};

if (currentTab.includes(redirect_uri + "#access_token=")) {
  loadGenres();
  document.getElementById("input_playlist").value = idplay;

  setTimeout(function () {
    playlists_id.innerHTML = output;
  }, 3000);
}
