<template>
  <div class="wrapper">
    <div class="banners">
      <banner
        :width="300"
        :height="250"
        :title="currentData.title"
        :label="currentData.label"
      />

      <banner
        :width="700"
        :height="300"
        :title="currentData.title"
        :label="currentData.label"
      />

      <banner
        :width="160"
        :height="600"
        :title="currentData.title"
        :label="currentData.label"
      />
    </div>

    <div v-if="languageKeys.status === 'file_does_not_exist'">
      File does not exist yet.
      <button @click="generateFile">
        Generate
      </button>
    </div>
    <div v-else>
      <language-options
        :languages="languages"
        v-model:language-code="currentData.languageCode"
        v-model:new-language-code="newLanguageCode"
        @change-language="onChangeLanguage"
      />

      <div class="mt-8">
        <translation-input
          v-for="data in languageKeys.keys"
          class="mt-4"
          :key=" data.key.join('.')"
          v-model="currentData[data.key.join('.')]"
        >
          {{ data.key.join('.') }}
        </translation-input>
      </div>

      <translation-buttons
        @save="onSave"
        @reset="resetKeysForCurrent"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Key } from '@localazy/ts-api/dist/models/responses/keys-in-file';
import Banner from './Banner.vue';
import LocalazyService from '../services/localazy-service';
import KeysInFileForLanguage from '../models/keys-in-file-for-language';
import LanguageOptions from './LanguageOptions.vue';
import TranslationInput from './TranslationInput.vue';
import TranslationButtons from './TranslationButtons.vue';

type CurrentData = {
    languageCode: string;
    title: Key['value'];
    label: Key['value'];
}

export default defineComponent({
  components: {
    Banner, LanguageOptions, TranslationInput, TranslationButtons,
  },
  async setup() {
    const languageKeys = ref<KeysInFileForLanguage>({ status: '', keys: [] });
    const newLanguageCode = ref('');
    const currentData = ref<CurrentData>({
      languageCode: 'en',
      title: '',
      label: '',
    });

    const languages = await LocalazyService.listProjectLanguages();

    async function generateFile() {
      await LocalazyService.generateFile({
        languageCode: 'en',
        title: 'Drink milk',
        label: '5 Proven Health Benefits of Milk',
      });
      window.location.reload();
    }

    async function resetKeysForCurrent() {
      await LocalazyService.generateFile({
        languageCode: currentData.value.languageCode,
        title: '',
        label: '',
      });
      languageKeys.value = await LocalazyService.listKeysInFileForLanguage(currentData.value.languageCode);
      window.location.reload();
    }

    async function onSave() {
      const language = newLanguageCode.value || currentData.value.languageCode;
      await LocalazyService.generateFile({
        languageCode: language,
        title: currentData.value.title,
        label: currentData.value.label,
      });
      window.location.reload();
    }

    async function onChangeLanguage() {
      languageKeys.value = await LocalazyService.listKeysInFileForLanguage(currentData.value.languageCode);
      currentData.value.title = languageKeys.value.keys.find((key) => key.key.includes('title'))?.value || '';
      currentData.value.label = languageKeys.value.keys.find((key) => key.key.includes('label'))?.value || '';
    }

    await onChangeLanguage();

    return {
      languageKeys,
      generateFile,
      languages,
      currentData,
      resetKeysForCurrent,
      newLanguageCode,
      onSave,
      onChangeLanguage,
    };
  },
});
</script>

<style scoped>
.wrapper {
    width: 1200px;
    margin: auto;
}

.banners {
    display: flex;
    padding: 16px;
    gap: 24px;
}
</style>
