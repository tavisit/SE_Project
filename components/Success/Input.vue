<script lang="ts">
export default defineComponent({});
</script>

<template>
  <BaseInput
    class="text-green-700 focus:(outline-none ring ring-green-100) bg-white border-green-200 hover:bg-green-50 active:bg-green-100"
  >
    <!-- Take all scoped slots, and pass them to the BaseInput -->
    <template v-for="(_, slot) in $slots" v-slot:[slot]="scope">
      <slot :name="slot" v-bind="scope || {}" />
    </template>
  </BaseInput>
</template>
