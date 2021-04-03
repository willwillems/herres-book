<template>
  <div class="playlist-card">
    <header class="playlist-card__header">
      <h1>{{ title }}</h1>
      <h3>{{ description }}</h3>
    </header>
    <main class="playlist-card__content">
      <article class="video" v-for="item in playlistItems" :key="item.id">
        <h1 class="video__title">{{ item.snippet.title }}</h1>
        <iframe class="video__player" :src="`https://www.youtube.com/embed/${item.snippet.resourceId.videoId}`" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </article>
    </main>
  </div>
</template>

<script>
export default {
  props: {
    playlist: {
      type: Object,
      required: true
    },
    playlistItems: {
      type: Array,
      required: true
    }
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
.playlist-card-wrapper {

}

.playlist-card {
  display: grid;
  grid-template-rows: auto 1fr;

  font-size: 64px;

  &__header {
    border-bottom: solid 12px white;
    padding: 8rem 4rem;
  }
}

@media only screen and (max-width: 560px) {
  .playlist-card__header h1 {
    font-size: 72px;
  }

  .playlist-card__header h3 {
    font-size: 48px;
  }
}

.video {
  margin:0;

  &__title {
    font-size: 64px;
    margin: 0;
    padding: 2rem 3rem;
    background-color: white;
    color: black;
  }

  &__player {
    width: 100%;
    height: min(80vh, 680px);
  }
}
</style>