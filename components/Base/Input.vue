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
      type: [String, Number, Boolean] as PropType<String | Number | Boolean | null>,
      default: () => null,
    },
  },
  emits: ['update:modelValue'],
  setup(props, context) {
    // Slot implementations
    const hasActivator = computed(() => {
      return !!context.slots.activator
    })

    // Component references
    const iref = ref<HTMLInputElement | null>(null)
    const inputClick = () => {
      const input = iref.value;
      if (input == null)
        return;

      input.click()
    }

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

    const inputType = computed(() => {
      //? I don't know if attrs are reactive!! maybe destruct $attrs with toRefs()?
      return context.attrs.type ?? 'text';
    })

    const noPlaceholderInputs = ['date', 'checkbox', 'radio', 'file'];
    const isPlaceholder = computed(() => {
      return (modelValue.value || modelValue.value === 0) || activeInput.value ||
        noPlaceholderInputs.find(itype => itype == inputType.value)
    })

    const inlinedInputs = ['checkbox', 'radio']
    const isInlinedInput = computed(() => {
      return !!inlinedInputs.find(itype => itype == inputType.value)
    })

    const isRadio = computed(() => {
      return inputType.value === 'radio'
    })

    const customDesignInputs = ['file']
    const isCustomDesign = computed(() => {
      return !!customDesignInputs.find(itype => itype == inputType.value)
    })

    const files = ref<FileList | null>(null)
    const fileHandle = () => {
      if (inputType.value != 'file') {
        files.value = null;
        return;
      }
      
      const input = iref.value;
      if (input == null) {
        files.value = null;
        return;
      }

      files.value = input.files;
    }

    const hasFiles = computed(() => {
      switch (inputType.value) {
        case 'file':
          if (!files.value)
            return false;
          let fileList = files.value
          console.log(fileList, fileList.length);

          return fileList.length > 0
        default:
          return false
      }
    })

    const description = computed(() => {
      switch (inputType.value) {
        case 'file':
          if (!files.value)
            return 'No file selected';
          let fileList = files.value
          console.log(fileList, fileList.length);

          if (!fileList.length)
            return 'No file selected';
          else {
            if (fileList.length === 1)
              return fileList[0].name;
            else return `${fileList.length} selected`;
          }
        default:
          return ''
      }
    })

    return {
      iref,
      modelValue,
      label,
      inputClick,
      inputHandle,
      fileHandle,
      toggleActiveInput,
      activeInput,
      inputType,
      isPlaceholder,
      isInlinedInput,
      isRadio,
      isCustomDesign,
      hasActivator,
      description,
      hasFiles,
    }
  },
})
</script>

<template>
  <div class="relative mt-6 text-center">
    <!-- Normal Placeholder/Label for all inputs -->
    <label
      v-if="!isInlinedInput"
      class="absolute text-gray-400 left-[13px] top-[7px] transition pointer-events-none"
      :class="{
        'transform -translate-y-10 scale-75 text-gray-600': isPlaceholder,
      }"
    >
      <slot name="label" />
    </label>
    <!-- The input -->
    <input
      ref="iref"
      @input="inputHandle"
      :value="modelValue"
      class="w-full py-2 px-3 transition appearance-none border shadow rounded leading-tight cursor-pointer"
      :class="{
        'inline-block w-3 h-3': isInlinedInput,
        'rounded-full': isRadio,
        'hidden': isCustomDesign,
      }"
      @change="fileHandle"
      @focusin="toggleActiveInput"
      @focusout="toggleActiveInput"
      v-bind="$attrs"
    />
    <!-- The custom input that puppeteers the input -->
    <div
      v-if="isCustomDesign"
      class="w-full py-2 px-3 flex items-center transition appearance-none border shadow rounded leading-tight cursor-pointer text-left"
      @click.self="inputClick"
      v-bind="$attrs"
    >
      <slot
        name="activator"
        v-bind="{
          inputClick,
          iref,
        }"
      >
        <PrimaryButton
          @click="inputClick"
          class="text-center mr-1"
          :isTiny="true"
        >
          <IconFile class="inline-block w-5 h-5 fill-current text-gray-50" />
        </PrimaryButton>
      </slot>
      {{ description }}
    </div>
    <!-- The label for inlined inputs -->
    <label
      v-if="isInlinedInput"
      class="text-gray-400 left-[13px] top-[7px] transition ml-1 cursor-pointer select-none"
      :class="{
        'transform -translate-y-10 scale-75 text-gray-600': isPlaceholder,
      }"
      @click="inputClick"
    >
      <slot name="label" />
    </label>
  </div>
</template>