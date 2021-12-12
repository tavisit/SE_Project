<script lang="ts">
export default defineComponent({

});
</script>

<template>
  <BaseInput
    class="text-gray-700 focus:(outline-none ring ring-gray-100) bg-white border-gray-200 hover:bg-gray-50 active:bg-gray-100"
  >
    <!-- Take all scoped slots, and pass them to the BaseInput -->
    <template
      v-for="(_, slot) in $slots"
      v-slot:[slot]="scope"
    >
      <slot :name="slot" v-bind="scope || {}" />
    </template>
  </BaseInput>
</template>