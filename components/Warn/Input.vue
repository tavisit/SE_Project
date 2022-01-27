<script lang="ts">
export default defineComponent({});
</script>

<template>
  <BaseInput
    class="text-yellow-700 focus:(outline-none ring ring-yellow-100) bg-white border-yellow-200 hover:bg-yellow-50 active:bg-yellow-100"
  >
    <!-- Take all scoped slots, and pass them to the BaseInput -->
    <template v-for="(_, slot) in $slots" v-slot:[slot]="scope">
      <slot :name="slot" v-bind="scope || {}" />
    </template>
  </BaseInput>
</template>
