<template>
    <component :is="type" :href="href" class="items-center w-50 bg-gray-100 text-gray-700 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-semibold focus:outline-none">
      <slot/>
    </component>
</template>

<script>
  export default {
    props: {
      href: {
        type: String,
        default: null
      },
      to: {
        type: String,
        default: null
      }
    },
    computed: {
      type() {
        if (this.href) {
          return 'a'
        } else {
          return 'button'
        }
      }
    }
  }
</script>