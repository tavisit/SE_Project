<script lang="ts">
export default defineComponent({
  props: {
    // Button and Anchor specific props
    href: {
      type: String,
      default: null
    },
    // Styling specific props
    isTiny: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    // Reactive props
    const { href, isTiny } = toRefs(props);

    // Computed props
    const componentType = computed(() => {
      /**
       ** There is also an <input type="submit" /> which acts like a button
        * However it is shadowed by <button type="submit" /> which does the same thing
        *  and also accepts content
        */
      return href.value ? 'a' : 'button';
    });
    const padding = computed(() => {
      return isTiny.value ? 'px-1' : 'px-4 py-2';
    });

    // Return reactive props
    return { href, isTiny, componentType, padding };
  },
})
</script>

<template>
  <component
    :is="componentType"
    :href="href"
    class="transition select-none rounded-md text-xs font-semibold tracking-widest border shadow"
    :class="`${padding}`"
  >
    <slot/>
  </component>
</template>