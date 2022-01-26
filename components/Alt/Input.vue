<script lang="ts">
export default defineComponent({

});
</script>

<template>
  <BaseInput
    class="text-indigo-700 focus:(outline-none ring ring-indigo-100) bg-white border-indigo-200 hover:bg-indigo-50 active:bg-indigo-100"
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