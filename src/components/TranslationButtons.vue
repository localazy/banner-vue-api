<template>
  <div>
    <button
      @click="$emit('save')"
      class="mt-8 mr-4"
    >
      Save
    </button>

    <button @click="$emit('reset')">
      Reset keys for current language
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  emits: ['save', 'reset'],
});
</script>
