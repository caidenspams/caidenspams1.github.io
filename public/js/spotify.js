function readTextFile(file) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                var allText = rawFile.responseText;
                console.log(allText)
                currentlyPlaying(allText);
                setInterval(() => {
                    currentlyPlaying(allText);
                }, 3000);
            }
        }
    }
    rawFile.send(null);
}

readTextFile("./js/access.txt");

async function currentlyPlaying(token) {
    await axios.get("https://api.spotify.com/v1/me/player/currently-playing", {
        headers: {
            Accept: 'application/json',
            "Authorization": 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
    }).then(response => {
        const songFormat = response.data.item.name + " - " + response.data.item.artists[0].name;
        document.getElementById("MusicIcon").style.visibility = "visible";
        if (songFormat.length > 26) {
			document.getElementById("spotify-txt").innerHTML = songFormat.slice(0, 26);
			return document.getElementById("spotify-txt").innerHTML += '...';
		} else {
            return document.getElementById("spotify-txt").innerHTML = songFormat;
        }
    }).catch(err => {
        console.log(err);
        document.getElementById("MusicIcon").style.visibility = "hidden";
    });
}


