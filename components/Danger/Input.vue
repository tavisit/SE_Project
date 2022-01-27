<script lang="ts">
export default defineComponent({});
</script>

<template>
  <BaseInput
    class="text-red-700 focus:(outline-none ring ring-red-100) bg-white border-red-200 hover:bg-red-50 active:bg-red-100"
  >
    <!-- Take all scoped slots, and pass them to the BaseInput -->
    <template v-for="(_, slot) in $slots" v-slot:[slot]="scope">
      <slot :name="slot" v-bind="scope || {}" />
    </template>
  </BaseInput>
</template>
