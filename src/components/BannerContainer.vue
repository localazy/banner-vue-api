<template>
  <form @submit.prevent="submitHandler">
    <label>Name
      <input
        v-model="name"
        type="text"
      >
    </label>
    <button>Submit</button>
  </form>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import LocalazyService from '../services/localazy-service';

export default defineComponent({
  emits: ['update:modelValue', 'submit'],
  props: {
    modelValue: {
      type: String,
      default: '',
    },
  },
  async setup(props, { emit }) {
    const name = computed({
      get() {
        return props.modelValue;
      },
      set(val) {
        emit('update:modelValue', val);
      },
    });

    function submitHandler() {
      emit('submit');
    }

    const localazyService = LocalazyService({
      projectToken: '18388854163874116234d25d2dc44cbe35d9f5195dc84255e3a60bdfaa3d6274a226c22ae1e8919a0d80',
    });

    const projects = await localazyService.listProjects({
      languages: true,
    });
    const formats = await localazyService.listFormats();
    const files = await localazyService.listFiles({
      projectId: '_a8388854798791208508',
    });
    const english = await localazyService.listKeysInFileForLanguage({
      projectId: '_a8388854798791208508',
      fileId: '_e1140840109999',
      lang: 'en',
    });
    console.log(projects);
    console.log(formats);
    console.log(files);
    console.log(english);

    return {
      name,
      submitHandler,
    };
  },
});
</script>
