<script lang="ts">
export default defineComponent({
  // custom attribute inheritance, directly to input, instead of the <div> root
  inheritAttrs: false,
  props: {
    modelValue: {
      type: Number,
      default: () => null,
    },
  },
  emits: ['update:modelValue'],
  setup(props, context) {
    // Reactive props
    const { modelValue } = toRefs(props);

    const inputHandle = (evt: Event) => {
      const target = evt.target as HTMLInputElement;
      const { value } = target;

      context.emit('update:modelValue', parseFloat(value));
    };

    return {
      modelValue,
      inputHandle,
    };
  },
});
</script>

<template>
  <div class="relative mt-6 text-center">
    <label
      class="absolute text-gray-400 left-[13px] top-[7px] transition pointer-events-none transform -translate-y-7 scale-80 text-gray-600"
    >
      <slot />
      <span class="mx-1">{{ modelValue }}</span>
    </label>
    <input
      v-bind="$attrs"
      class="form-range appearance-none w-full h-3 p-0 rounded-full bg-gray-200 focus:(outline-none ring-0 shadow-none) transition border shadow cursor-pointer"
      type="range"
      :value="modelValue"
      @input="inputHandle"
    />
  </div>
</template>
