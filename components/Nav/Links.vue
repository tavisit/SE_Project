<script lang="ts">
type NavLinksProps = {
  styling: String,
  active: String,
};

export default {
  props: {
    styling: {
      type: String,
      required: true,
    },
    active: {
      type: String,
      required: true,
    },
  },

  setup(props: NavLinksProps) {
    const { styling, active } = toRefs(props);

    return {
      styling,
      active,
    }
  },
}
</script>

<template>
  <NuxtLink
    to="/history"
    class="transition"
    :class="styling + ($route.path == '/history' ? active : '')"
  >
    History
  </NuxtLink>
  <NuxtLink
    to="/batch"
     class="transition"
    :class="styling + ($route.path == '/batch' ? active : '')"
  >
    Batch
  </NuxtLink>
</template>