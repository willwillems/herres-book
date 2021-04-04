import { getPlaylists, getPlaylistItems, getAllPlayListItems } from './lib/ytapi'

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  generate: {
    async routes() {
      const playlists = (await getPlaylists(process.env.API_KEY)('UCIfE0xC0WPJmxOaRl70Zheg')).items

      const allPlaylistItems = await getAllPlayListItems(process.env.API_KEY)(playlists.map(pl => pl.id))

      return [
        {
          route: '/',
          payload: { playlists, allPlaylistItems },
        },
        ...playlists.map((playlist, i) => ({
          route: `/pl/${playlist.id}`,
          payload: {
            playlist,
            playlistItems: allPlaylistItems[i].items
          },
        }))
      ]
    }
  },

  privateRuntimeConfig: {
    apiKey: process.env.API_KEY
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'HERRES LOOKBOOK',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'msapplication-TileColor', content: '#000000' },
      { name: 'theme-color', content: '#000000' },
      { property: 'og:title', content: 'HERRES LOOKBOOK' },
      { property: 'og:description', content: '' },
      { property: 'og:image', content: 'https://i.imgur.com/MfgsvIw.png' },
      { property: 'og:url', content: 'https://lookbook.herres.haus' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' }
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
