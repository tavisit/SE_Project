<script lang="ts">

type NavLinksProps = {
  styling: String,
  active: String,
};

export default defineComponent({
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
    const user = useAuth();

    return {
      styling,
      active,
      user
    }
  },
})
</script>

<template>
  <NuxtLink
    v-if="user.isAuthenticated()"
    to="/history"
    class="transition"
    :class="styling + ($route.path == '/history' ? active : '')"
  >
    History
  </NuxtLink>
  <NuxtLink
    v-if="user.isAuthenticated()"
    to="/batch"
     class="transition"
    :class="styling + ($route.path == '/batch' ? active : '')"
  >
    Batch
  </NuxtLink>
</template>