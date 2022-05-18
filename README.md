- **WEB-TO-USER**: 

The website runs through [express](https://www.npmjs.com/package/express).<br>
Simply run `npm i` after cloning this project. You can modify everything in the `index.js` file as desired (the port for instance). <br>


- **SPOTIFY-API**: 

Now that we got the basic stuff out of the way, We're going to talk about the Spotify Integration.

Spotify API uses access token and refresh token. The access token is what **WE** want because that token will allow us to access our currently playing song through spotify.
There is one downside though. Access token ONLY can be used for 1h and then you have to get a new one. Refresh token on the other hand is lifetime, meaning
we won't ever need to get a new token although we CANNOT pull our currently playing song with it or etc. 

The idea and secure way to implument a feature that automatically regenrates our access token every hour is by just hosting a local node server
that connects to our Spotify Application and gets the the access token every single hour, saves it inside of a txt file in our website and on the 
web, we can use axios and javascript to read that file and pull the currently playing music data.

Now that the explanation is done, The file to run on a seperate node process is `SpotifyTokenRegen.js`. Before running,
you'll need to configure some stuff. First, create a `.env` file in the root directory. Once created, the content should look like this:
```
CLIENT_ID=PUT_YOUR_CLIENT_ID_HERE
CLIENT_SECRET=PUT_YOUR_CLIENT_SECRET_HERE
REFRESH_TOKEN=PUT_UR_REFRESH_TOKEN_HERE
```

To get the Client ID and secret, head over to https://developer.spotify.com/dashboard/ and login.
<br>Create yourself an application and once you have, you will see a page like this:<br>
![2022-05-12_22-01](https://user-images.githubusercontent.com/59381835/168214406-dbd44b23-1d74-4d36-8f98-0881d05ccc3d.png)
<br><br>
Copy the client id and client secret and replace them with the `PUT_YOUR_CLIENT_ID_HERE` and `PUT_YOUR_CLIENT_SECRET_HERE`.

For getting the Refresh Token, visit https://getyourspotifyrefreshtoken.herokuapp.com/<br>
**NOTE:** Remember to add https://getyourspotifyrefreshtoken.herokuapp.com/callback as a **redirect uri** in your app by hitting the ``EDIT SETTINGS`` button in your spotify dashboard.

Fill the info:<br>
![image](https://user-images.githubusercontent.com/59381835/168215027-b355d8bb-9be4-44a8-ab5e-eb7ff25c29a2.png)

Once done, you should see your **refresh token** showing up at the bottom of the alongside other infos. Copy the refresh token and replace it with the 
``PUT_UR_REFRESH_TOKEN_HERE`` in the `.env` file.


**You are done!** Run the `SpotifyTokenRegen.js` with `node SpotifyTokenRegen.js` and the website by `node index.js`. Be sure to keep the `SpotifyTokenRegen.js` process running so it regenerates the access token automatically.

Go ahead and try out the website and the Integration that I developed. Open an issue in case you have any problems. 

