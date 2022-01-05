<template>
  <div>
    Select language:
    <select
      v-model="computedLanguageCode"
      @change="$emit('change-language')"
    >
      <option
        v-for="language in languages"
        :key="language.id"
        :value="language.code"
      >
        {{ language.name }}
      </option>
    </select>
    or add new <input
      class="new-language-input"
      v-model="computedNewLanguageCode"
      placeholder="new language code"
    >
  </div>
</template>

<script lang="ts">
import Language from '@localazy/ts-api/dist/models/responses/language';
import { defineComponent, computed, PropType } from 'vue';

export default defineComponent({
  emits: ['change-language', 'update:languageCode', 'update:newLanguageCode'],
  props: {
    languages: {
      type: Array as PropType<Language[]>,
      required: true,
    },
    languageCode: {
      type: String,
      required: true,
    },
    newLanguageCode: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    const computedLanguageCode = computed({
      get(): string {
        return props.languageCode;
      },
      set(value: string): void {
        emit('update:languageCode', value);
      },
    });
    const computedNewLanguageCode = computed({
      get(): string {
        return props.newLanguageCode;
      },
      set(value: string): void {
        emit('update:newLanguageCode', value);
      },
    });

    return {
      computedLanguageCode,
      computedNewLanguageCode,
    };
  },
});
</script>

<style scoped>
.new-language-input {
    width: 120px;
}
</style>
