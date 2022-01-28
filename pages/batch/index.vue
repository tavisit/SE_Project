<script lang="ts">
definePageMeta({
  layout: 'form',
});

export default defineComponent({
  setup() {
    const fref = ref(null);
    const files = ref<File[]>([]);
    const highThresh = ref(60);
    const lowThresh = ref(50);
    const skipCanny = ref(false);
    const precision = ref(0.5);
    const command = ref('');

    const edgesImage = ref('');
    const debugImage = ref('');

    const previewUrl = ref(null);
    const onFileChange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files.length) {
        previewUrl.value = URL.createObjectURL(target.files[0]);
      } else {
        previewUrl.value = null;
      }
    };

    const submit = () => {
      const fileInput = fref.value.$el.querySelector('input[type="file"]');
      const formData = new FormData();
      formData.append('highThresh', highThresh.value.toString());
      formData.append('lowThresh', lowThresh.value.toString());
      formData.append('skipCanny', skipCanny.value ? '1' : '0');
      formData.append('precision', precision.value.toString());
      formData.append('file', fileInput?.files[0] ?? null); // file or null

      fetch('/api/batch', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((raw) => {
          const { conversionCommand, edges, debug } = raw.data;
          setTimeout(() => {
            //! HORRIBLE
            edgesImage.value = edges;
            debugImage.value = debug;
            command.value = conversionCommand;
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    return {
      fref,
      files,
      previewUrl,
      onFileChange,
      submit,
      highThresh,
      lowThresh,
      skipCanny,
      precision,
      command,
      edgesImage,
      debugImage,
    };
  },
});
</script>

<template>
  <div class="flex flex-col gap-4">
    <details
      open
      class="overflow-hidden border border-gray-200 rounded shadow-xl sm:rounded-lg"
    >
      <summary class="flex items-center justify-between px-5 py-3 bg-gray-100">
        <span class="text-sm font-medium"> Input </span>

        <svg
          class="w-5 h-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </summary>

      <div class="block">
        <AltInput
          ref="fref"
          class="m-4 max-w-60 inline-block"
          type="file"
          accept="image/*"
          @change="onFileChange"
          v-model="files"
        >
          <template #label> File input </template>
        </AltInput>
        <div class="w-60 h-60 m-4 inline-block shadow border border-gray-200">
          <img
            v-if="previewUrl"
            :src="previewUrl"
            class="object-cover w-60 h-60"
          />
          <span v-else class="text-gray-500 m-4"> preview... </span>
        </div>
      </div>
    </details>

    <details
      open
      class="overflow-hidden border border-gray-200 rounded shadow-xl sm:rounded-lg"
    >
      <summary class="flex items-center justify-between px-5 py-3 bg-gray-100">
        <span class="text-sm font-medium"> Configuration </span>

        <svg
          class="w-5 h-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </summary>

      <div class="border-t border-gray-200 lg:border-t-0">
        <fieldset>
          <legend class="block w-full px-5 py-3 text-xs font-medium bg-gray-50">
            Thresholds
          </legend>

          <div class="m-4">
            <PrimaryRange
              v-model.number="highThresh"
              :min="0"
              :max="1140.39"
              step="0.05"
            >
              High Threshold
            </PrimaryRange>
            <PrimaryRange
              v-model.number="lowThresh"
              :min="0"
              :max="1140.39"
              step="0.05"
            >
              Low Threshold
            </PrimaryRange>
          </div>
        </fieldset>

        <fieldset>
          <legend class="block w-full px-5 py-3 text-xs font-medium bg-gray-50">
            Tracing precision
          </legend>

          <div class="m-4">
            <PrimaryRange
              v-model.number="precision"
              :min="0"
              :max="1"
              step="0.01"
            >
              Precision
            </PrimaryRange>
          </div>
        </fieldset>

        <fieldset>
          <legend class="block w-full px-5 py-3 text-xs font-medium bg-gray-50">
            Edge Detection
          </legend>

          <div class="m-4 flex">
            <WarnInput type="checkbox" v-model="skipCanny">
              <template #label> Skip Canny </template>
            </WarnInput>
          </div>
        </fieldset>
      </div>
    </details>

    <PrimaryButton class="m-4" @click="submit"> Submit </PrimaryButton>

    <details
      class="overflow-hidden border border-gray-200 rounded shadow-xl sm:rounded-lg"
      :open="command ? true : false"
    >
      <summary class="flex items-center justify-between px-5 py-3 bg-gray-100">
        <span class="text-sm font-medium"> Results </span>

        <svg
          class="w-5 h-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </summary>

      <div class="m-4 border-t border-gray-200 lg:border-t-0">
        <div v-if="command">
          <p>Success by running the following command:</p>
          <code>{{ command }}</code>

          <img :src="edgesImage" />
          <img :src="debugImage" />
        </div>
        <div v-else>N/A</div>
      </div>
    </details>
  </div>
</template>
