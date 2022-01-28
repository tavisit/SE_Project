<script lang="ts">
export default defineComponent({});
</script>

<template>
  <BaseRange
    class="text-gray-700 focus:(outline-none ring ring-gray-100) bg-white border-gray-200 hover:bg-gray-50 active:bg-gray-100"
  >
    <slot />
  </BaseRange>
</template>
