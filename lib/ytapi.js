import fetch from 'node-fetch'
require('dotenv').config()

const key = process.env.API_KEY || ''
const channelID = 'UCIfE0xC0WPJmxOaRl70Zheg'

export const getPlaylist = (playlistID) => fetch(`https://youtube.googleapis.com/youtube/v3/playlists?part=snippet&id=${playlistID}&maxResults=50&key=${key}`).then(r => r.json())
export const getPlaylistItems = (playlistID) => fetch(`https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistID}&key=${key}`).then(r => r.json())
export const getPlaylists = (channelID) => fetch(`https://youtube.googleapis.com/youtube/v3/playlists?part=snippet&channelId=${channelID}&maxResults=50&key=${key}`).then(r => r.json())