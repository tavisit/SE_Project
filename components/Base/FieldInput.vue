<template>
    <label class="sm:px-6 lg:px-8">
      <div class="rounded-md text-base font-semibold  ">{{label}}</div>
      <input 
        v-bind="$attrs" 
        v-on="$listeners" 
        :value="value" 
        @input="$emit('update', $event.target.value)"
        class="rounded-md text-base font-semibold text-gray-700"
        >
    </label>
  </template>

  <script>
  export default {
    /**
      Useful properties:
        - type
        - label
        - placeholder
     */
    inheritAttrs: false,
    props: ["value", "label"],
    model: {
      prop: "value",
      event: "update"
    }
  };
  </script>