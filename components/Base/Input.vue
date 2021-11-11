<script lang="ts">
import { PropType } from 'vue'

export default defineComponent({
  // custom attribute inheritance, directly to input, instead of the <div> root
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      default: null
    },
    modelValue: {
      type: [String, Number] as PropType<String | Number | null>,
      default: () => null,
    },
  },
  emits: ['update:modelValue'],
  setup(props, context) {
    // Reactive props
    const { label, modelValue } = toRefs(props)
    const activeInput = ref(false)

    const toggleActiveInput = () => {
      activeInput.value = !activeInput.value
    }

    const inputHandle = (evt: any) => {
      const val = evt.target.value ?? modelValue.value
      context.emit('update:modelValue', val)
    }

    const isPlaceholder = computed(() => {
      return (modelValue.value || modelValue.value === 0) || activeInput.value
    })

    return { label, activeInput, modelValue, toggleActiveInput, inputHandle, isPlaceholder }
  },
})
</script>

<template>
  <div class="relative mt-6">
    <label
      class="absolute text-gray-400 left-[13px] top-[7px] transition pointer-events-none"
      :class="{
        'transform -translate-y-10 scale-75 text-gray-900': isPlaceholder,
      }"
    >
      <slot name="label" />
    </label>
    <input
      @input="inputHandle"
      :value="modelValue"
      class="w-full py-2 px-3 transition appearance-none border shadow rounded leading-tight"
      @focusin="toggleActiveInput"
      @focusout="toggleActiveInput"
      v-bind="$attrs"
    />
  </div>
</template>