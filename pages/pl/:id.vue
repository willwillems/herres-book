<template>
  <main>
    <header>
      <h1>{{ title }}</h1>
      <h3>{{ description }}</h3>
    </header>
    <article v-for="item in playlistItems" :key="item.id">
        <!-- <h2 >{{ item.snippet.title }}</h2> -->
        <iframe :src="`https://www.youtube.com/embed/${item.snippet.resourceId.videoId}`" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </article>
  </main>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  async asyncData({ params, payload }) {
    const playlist = payload.playlist// (await getPlaylist(params.id)).items[0]
    const playlistItems = payload.playlistItems // (await getPlaylistItems(params.id)).items

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

<style lang="postcss" scoped>
main {
  display: grid;
  grid-template-rows: auto 1fr auto;

  font-size: 64px;
}

main header {
  border-bottom: solid 12px white;
  padding: 16rem 4rem;
}

article {
  margin: 4rem 0;
}

iframe {
  width: 100%;
  height: min(80vh, 680px);
}
</style>