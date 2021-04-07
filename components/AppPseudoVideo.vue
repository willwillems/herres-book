<template>
  <div class="video">
      <input type='checkbox' style='display: none' :id="id">
      <label :for="id" class="video__thumb"><img @click="showVideo" :src="thumbnailUrl" alt="video preview" ></label>
      <iframe class="video__player" :src="videoURL" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
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
        id: String(Math.random()).slice(2)
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
       return `https://www.youtube.com/embed/${this.videoId}`
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

      img {
         width: 100%;
         height: 100%;
         object-fit: cover;

          /* Gives a nice consisstent look but performance suffers */
         filter: sepia(1) hue-rotate(-19deg) contrast(1.3);

         &:hover {
            filter: none;
         }
      }
  }

  &__player {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;

    display: none;
  }

  input:checked + label + iframe { display: unset !important; }
}
</style>