import { getPlaylists, getPlaylistItems } from './lib/ytapi'

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  generate: {
    async routes() {
      const playlists = (await getPlaylists('UCIfE0xC0WPJmxOaRl70Zheg')).items

      const playlistItems = await Promise.all(playlists.map(pl => getPlaylistItems(pl.id)))

      console.log([
        {
          route: '/',
          payload: { playlists },
        },
        ...playlists.map((playlist, i) => ({
          route: `/pl/${playlist.id}`,
          payload: {
            playlist,
            playlistItems: playlistItems[i]
          },
        }))
      ])

      return [
        {
          route: '/',
          payload: { playlists },
        },
        ...playlists.map((playlist, i) => ({
          route: `/pl/${playlist.id}`,
          payload: {
            playlist,
            playlistItems: playlistItems[i].items
          },
        }))
      ]
    }
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'herres-book',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
