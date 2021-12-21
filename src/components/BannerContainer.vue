<template>
  <div class="wrapper">
    <Banner
      :width="300"
      :height="250"
    />

    <Banner
      :width="700"
      :height="300"
    />

    <Banner
      :width="160"
      :height="600"
    />
  </div>

  <div class="language-menu">
    <div v-if="english.status === 'file_does_not_exist'">
      File does not exist yet.
      <button @click="generateFile">
        Generate
      </button>
    </div>
    <div v-else>
      English
      {{ english.keys }}
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import Banner from './Banner.vue';
import LocalazyService from '../services/localazy-service';

export default defineComponent({
  emits: ['update:modelValue', 'submit'],
  props: {
    modelValue: {
      type: String,
      default: '',
    },
  },
  async setup() {
    const languages = await LocalazyService.listProjectLanguages();
    const english = ref(await LocalazyService.listKeysInFileForLanguage('en'));

    async function generateFile() {
      await LocalazyService.generateFile();
      window.location.reload();
    }

    return {
      english,
      generateFile,
    };
  },
  components: { Banner },
});
</script>

<style>
.wrapper {
    display: flex;
    padding: 16px;
    gap: 24px;
}

.language-menu {

}
</style>
