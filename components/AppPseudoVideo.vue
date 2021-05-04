<template>
  <div class="video">
      <img class="video__thumb" @click="showVideo" :src="thumbnailUrl" :alt="videoTitle" >
      <iframe v-if="videoVisible" class="video__player" :src="videoURL" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  </div>
</template>

<script>
export default {
  props: {
    video: {
      type: Object,
      required: true
    }
  },
  data () {
     return {
        id: String(Math.random()).slice(2),
        videoVisible: false
     }
  },
  computed: {
    thumbnailUrl () {
      return   this.video.snippet.thumbnails.maxres?.url
            || this.video.snippet.thumbnails.high?.url
            || this.video.snippet.thumbnails.default?.url
    },
    videoId () {
      return this.video.snippet.resourceId.videoId
    },
    videoURL () {
       // `https://www.youtube.com/embed/${videoId}?autoplay=1`
       return `https://www.youtube.com/embed/${this.videoId}?autoplay=1`
    },
    videoTitle () {
      return this.video.snippet.title
    }
  },
  methods: {
    showVideo () {
      this.videoVisible = true
    }
  }
}
</script>

<style lang="postcss" scoped>
.video {
   position: relative;
   margin: 0;
   height: min(90vh, 1080px);

   &__thumb {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;

    cursor: pointer;

    line-height: 1.3;
    color: #949494;

    /* Gives a nice consisstent sepia-like look but performance suffers */
    /* filter: sepia(1) hue-rotate(-19deg) contrast(1.3); */
    transition: filter .2s linear;
    filter: none;

    &:hover {
      filter: contrast(1.1) brightness(1.2);
    }
  }

  &__player {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
  }
}
</style>