<script lang="ts">
export default defineComponent({

});
</script>

<template>
  <BaseInput
    class="text-blue-700 focus:(outline-none ring ring-blue-100) bg-white border-blue-200 hover:bg-blue-50 active:bg-blue-100"
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