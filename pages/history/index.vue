<script lang="ts">
export default defineComponent({
  setup() {
    const user = useAuth();
    const data = ref<any>(null);

    fetch('/api/current', {
      method: 'POST',
    })
      .then((response) => response.json())
      .then((d) => {
        data.value = d;
      })
      .catch((err) => {
        console.log(err);
      });

    return {
      user,
      data,
    };
  },
});
</script>

<template>
  <div class="flex flex-col gap-4">
    <details
      :open="!!data"
      class="overflow-hidden border border-gray-200 rounded shadow-xl sm:rounded-lg"
    >
      <summary class="flex items-center justify-between px-5 py-3 bg-gray-100">
        <span class="text-sm font-medium"> Last batch </span>

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

      <div v-if="data" class="border-t border-gray-200 lg:border-t-0">
        <fieldset>
          <legend class="block w-full px-5 py-3 text-xs font-medium bg-gray-50">
            Edge detection
          </legend>

          <div class="m-4 flex flex-row gap-2">
            <img :src="data.original" class="object-cover w-1/2" />
            <img :src="data.edges" class="object-cover w-1/2" />
          </div>
        </fieldset>

        <fieldset>
          <legend class="block w-full px-5 py-3 text-xs font-medium bg-gray-50">
            Debug
          </legend>

          <div class="m-4">
            <img :src="data.debug" class="object-cover w-full" />
          </div>
        </fieldset>
      </div>
      <div v-else class="border-t border-gray-200 lg:border-t-0">N/A</div>
    </details>
  </div>
</template>
