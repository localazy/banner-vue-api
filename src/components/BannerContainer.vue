<template>
  <form @submit.prevent="submitHandler">
    <label>Name
      <input v-model="name" type="text" />
    </label>
    <button>Submit</button>
  </form>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import LocalazyService from '../services/localazy-service';

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})
const emit = defineEmits(['update:modelValue', 'submit']);

const name = computed({
  get () {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val);
  }
})

const localazyService = LocalazyService({
    projectToken: "18388854163874116234d25d2dc44cbe35d9f5195dc84255e3a60bdfaa3d6274a226c22ae1e8919a0d80"
})

const projects = await localazyService.listProjects({
    languages: true
});
const formats = await localazyService.listFormats();
const files = await localazyService.listFiles({
    "projectId": "_a8388854798791208508"
});
const english = await localazyService.listKeysInFileForLanguage({
    projectId: "_a8388854798791208508",
    fileId: "_e1140840109999",
    lang: "en"
})
console.log(projects);
console.log(formats)
console.log(files)
console.log(english)

// console.log( await localazyService.listProjects({
//     organization: true,
//     languages: true
// }));
// console.log(await localazyService.import(
//     {
//     projectId: "_a8388854798791208508",
//   "importAsNew": false,
//   "forceCurrent": false,
//   "filterSource": true,
//   "files": [
//     {
//       "name": "file.json",
//       "path": "path/to/file",
//       "module": "",
//       "library": "",
//       "buildType": "",
//       "productFlavors": [],
//       "content": {
//         "type": "json",
//         "plural": "plural_postfix_br",
//         "array": "array",
//         "keyTransformer": "dot",
//         "params": {
//           "paramKey": "Param Value"
//         },
//         "features": [
//           "filter_untranslated"
//         ],
//         "en": {
//           "key": "text"
//         },
//         "cs": {
//           "key": "text"
//         }
//       }
//     }
//   ]
// }))

function submitHandler() {
  emit('submit')
}
</script>
