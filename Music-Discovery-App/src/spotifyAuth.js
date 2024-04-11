const fetch = require('node-fetch');

const CLIENT_ID = '69500c8351f64dd3811b20f2b4f7474a';
const CLIENT_SECRET = '4ca0ea6b5cd849f1a8bd77877cab71f5';
const AUTH_URL = 'https://accounts.spotify.com/api/token';

async function getAccessToken() {
    try {
        const response = await fetch(AUTH_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const accessToken = data['access_token'];
        return accessToken;
    } catch (error) {
        console.error('Error:', error);
        throw error; // Propagate the error to the caller
    }
}

module.exports = {
    getAccessToken
};
