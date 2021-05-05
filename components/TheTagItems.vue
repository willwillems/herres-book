<template>
   <div class="items">
      <img id="gold" src="img/gold.webp" draggable="true" @dragstart="handleDragStart">
   </div>
</template>

<script>
export default {
   name: "TagItems",
   methods: {
      handleDragStart (ev) {
         ev.dataTransfer.setData("text", ev.target.id)
      }
   }
}
</script>

<style lang="postcss" scoped>
.items {
   position: fixed;
   bottom: 12px;
   right: 24px;

   height: 48px;

   display: grid;
   grid-auto-flow: row;

   opacity: 0;
   transition: opacity .3s ease-out;

   &:hover {
      opacity: 1;
   }

   & > * {
      height: 100%;
      width: 48px;

      object-fit: contain;
      cursor: pointer;
   }
}
</style>