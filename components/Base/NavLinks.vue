<script lang="ts">
import { toRefs } from 'vue';

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
    :class="styling + ($route.path == '/history' ? active : '')"
  >
    History
  </NuxtLink>
  <NuxtLink
    to="/batch"
    :class="styling + ($route.path == '/batch' ? active : '')"
  >
    Batch
  </NuxtLink>
</template>