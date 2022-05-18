
const fs = require('fs')
const axios = require('axios');
require('dotenv').config()

const refreshToken = process.env.REFRESH_TOKEN;
const ClientInfo = `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`;

const encodeToBase64 = () => {
    return Buffer.from(ClientInfo).toString("base64");
};

const getAccessToken = async () => {
    try {
        const response = await axios({
            url: "https://accounts.spotify.com/api/token",
            method: "post",
            params: {
                grant_type: "refresh_token",
                refresh_token: refreshToken,
            },
            headers: {
                Accept: "application/json",
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Basic ${encodeToBase64()}`,
            },
        });

        const newAccessToken = response.data.access_token;
        fs.writeFile("./public/js/access.txt", newAccessToken, (err) => {
            if (err) {
                console.log(err);
            }
        });

        return newAccessToken;
    } catch (err) {
        console.log(err);
    }
};

getAccessToken();
setInterval(() => {
    getAccessToken();
}, 3600000);