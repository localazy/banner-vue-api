<template>
  <div
    class="banner"
    :style="{width: `${width}px`, height: `${height}px`}"
  >
    <div class="box">
      <div class="title">
        {{ title }}
      </div>
      <div class="label">
        {{ label }}
      </div>
    </div>
    <div class="dimensions">
      {{ width }} x {{ height }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
  },
});
</script>

<style>
.banner {
    display: flex;
    flex-direction: column;
    background-color: white;
    border: 1px solid black;
}

.box {
    flex: 1 0 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: lightgray;
    padding: 24px;
}

.dimensions {
    margin: 8px;
}

.title {
    text-align: center;
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 8px;
}
</style>
