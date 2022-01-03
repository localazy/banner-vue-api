<template>
  <div class="wrapper">
    <div class="banners">
      <Banner
        :width="300"
        :height="250"
        :title="currentData.title"
        :label="currentData.label"
      />

      <Banner
        :width="700"
        :height="300"
        :title="currentData.title"
        :label="currentData.label"
      />

      <Banner
        :width="160"
        :height="600"
        :title="currentData.title"
        :label="currentData.label"
      />
    </div>

    <div class="language-menu">
      <div v-if="languageKeys.status === 'file_does_not_exist'">
        File does not exist yet.
        <button @click="generateFile">
          Generate
        </button>
      </div>
      <div v-else>
        Select language:
        <select
          v-model="currentData.languageCode"
          @change="onChangeLanguage"
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
          v-model="newLanguageCode"
          placeholder="new language code"
        >

        <br>

        <div class="mt-8">
          <div
            v-for="data in languageKeys.keys"
            :key=" data.key.join('.')"
            class="mt-4"
          >
            <span class="mr-4">{{ data.key.join('.') }}</span>
            <input
              v-model="currentData[data.key.join('.')]"
            >
          </div>
        </div>

        <button
          @click="onSave"
          class="mt-8 mr-4"
        >
          Save
        </button>

        <button @click="resetForKeysCurrent">
          Reset keys for current language
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Banner from './Banner.vue';
import LocalazyService from '../services/localazy-service';
import KeysInFileForLanguage from '../models/keys-in-file-for-language';

export default defineComponent({
  async setup() {
    const languageKeys = ref<KeysInFileForLanguage>({ status: '', keys: [] });
    const newLanguageCode = ref('');
    const currentData = ref({
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

    async function resetForKeysCurrent() {
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
      resetForKeysCurrent,
      newLanguageCode,
      onSave,
      onChangeLanguage,
    };
  },
  components: { Banner },
});
</script>

<style>
.wrapper {
    width: 1200px;
    margin: auto;
}

.banners {
    display: flex;
    padding: 16px;
    gap: 24px;
}

.mt-4 {
    margin-top: 4px;
}

.mt-8 {
    margin-top: 8px;
}

.mb-8 {
    margin-bottom: 8px;
}

.mr-4 {
    margin-right: 4px;
}

.language-menu {

}
</style>
