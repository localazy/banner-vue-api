<template>
  <div class="translation-rows">
    <span class="mr-4"><slot /></span>
    <input
      v-model="computedModelValue"
      class="input"
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    const computedModelValue = computed({
      get(): string {
        return props.modelValue;
      },
      set(value: string): void {
        emit('update:modelValue', value);
      },
    });

    return {
      computedModelValue,
    };
  },
});
</script>

<style scoped>
.input {
    width: 350px;
}

.translation-rows {
    display: grid;
    grid-template-columns: 50px 1fr;
}
</style>
