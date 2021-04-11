<template>
  <AppPlaylistCard :playlist="playlist" :playlistItems="playlistItems" />
</template>

<script>
import { getPlaylist, getPlaylistItems } from '@/lib/ytapi'

import AppPlaylistCard from '@/components/AppPlaylistCard.vue'

export default {
  components: {
    AppPlaylistCard
  },
  async asyncData({ params, payload, isDev, $config }) {
    const playlist      = isDev ? (await getPlaylist($config.apiKey)(params.id)).items[0]   : payload.playlist
    const playlistItems = isDev ? (await getPlaylistItems($config.apiKey)(params.id)).items : payload.playlistItems

    return { playlist, playlistItems }
  },
  computed: {
    title () {
      return this.playlist.snippet.title
    },
    description () {
      return this.playlist.snippet.description
    }
  }
}
</script>