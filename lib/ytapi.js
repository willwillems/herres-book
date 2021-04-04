import fetch from 'node-fetch'

export const channelID = 'UCIfE0xC0WPJmxOaRl70Zheg'

export const getPlaylist      = (key) => (playlistID) => fetch(`https://youtube.googleapis.com/youtube/v3/playlists?part=snippet&id=${playlistID}&maxResults=50&key=${key}`).then(r => r.json())
export const getPlaylistItems = (key) => (playlistID) => fetch(`https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistID}&maxResults=20&key=${key}`).then(r => r.json())
export const getPlaylists     = (key) => (channelID)  => fetch(`https://youtube.googleapis.com/youtube/v3/playlists?part=snippet&channelId=${channelID}&maxResults=50&key=${key}`).then(r => r.json())

export const getAllPlayListItems = (key) => (ids) => Promise.all(ids.map(getPlaylistItems(key)))