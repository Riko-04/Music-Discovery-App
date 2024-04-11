// Importing getAccessToken function from spotifyAuth.js
const { getAccessToken } = require('./spotifyAuth');

// Function to fetch songs from Spotify
async function fetchSongs() {
    try {
        // Fetch access token
        const accessToken = await getAccessToken();

        // Make a request to Spotify API to get songs
        const response = await fetch('https://api.spotify.com/v1/browse/new-releases', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        // Check if request was successful
        if (!response.ok) {
            throw new Error(`Failed to fetch songs. Status: ${response.status}`);
        }

        // Parse response JSON
        const data = await response.json();

        // Extract relevant song information
        const songs = data.albums.items.map(album => {
            return {
                name: album.name,
                artists: album.artists.map(artist => artist.name).join(', '),
                genres: album.genres.join(', ')
            };
        });

        return songs;
    } catch (error) {
        console.error('Error fetching songs:', error);
        throw error;
    }
}

// Function to render songs in the app
function renderSongs(songs) {
    const appDiv = document.getElementById('app');
    appDiv.innerHTML = '';

    songs.forEach(song => {
        const songElement = document.createElement('div');
        songElement.classList.add('song');
        songElement.innerHTML = `
            <h3>${song.name}</h3>
            <p><strong>Artists:</strong> ${song.artists}</p>
            <p><strong>Genres:</strong> ${song.genres}</p>
        `;
        appDiv.appendChild(songElement);
    });
}

// Function to update songs in the app
async function updateSongs() {
    try {
        const songs = await fetchSongs();
        renderSongs(songs);
    } catch (error) {
        console.error('Error updating songs:', error);
    }
}

// Function to filter songs by genre
function filterByGenre(songs, genre) {
    return songs.filter(song => song.genres.toLowerCase().includes(genre.toLowerCase()));
}

// Function to handle search
function handleSearch() {
    const genreSearchInput = document.getElementById('genreSearch');
    const genre = genreSearchInput.value.trim();

    if (genre === '') {
        updateSongs();
    } else {
        const filteredSongs = filterByGenre(songs, genre);
        renderSongs(filteredSongs);
    }
}

// Event listener for search input
document.getElementById('genreSearch').addEventListener('input', handleSearch);

// Initial update
updateSongs();
