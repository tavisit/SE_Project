<script lang="ts">
export default defineComponent({
  setup() {
    const user = useAuth();
    const mobileMenuToggle = ref(true);

    return {
      mobileMenuToggle,
      user,
    };
  },
});
</script>

<template>
  <header class="shadow-sm border border-gray-200 bg-gray-100">
    <div class="max-w-screen-xl p-4 mx-auto">
      <div class="flex items-center justify-between space-x-4 lg:space-x-10">
        <div class="flex lg:w-0 lg:flex-1">
          <NuxtLink to="/"><IconApp /></NuxtLink>
        </div>

        <nav class="hidden space-x-8 text-sm font-medium md:flex">
          <NavLinks
            v-if="user.isAuthenticated"
            styling="text-gray-700 hover:(bg-gray-700 text-white transform translate-y-1) px-3 py-2 rounded-md text-sm font-semibold"
            active="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-semibold transform translate-y-1 underline underline-gray-400"
          />
        </nav>

        <div
          v-if="!user.isAuthenticated"
          class="items-center justify-end flex-1 hidden space-x-4 sm:flex"
        >
          <NuxtLink to="/login">
            <SuccessButton> Login </SuccessButton>
          </NuxtLink>
          <NuxtLink to="/register">
            <WarnButton> Register </WarnButton>
          </NuxtLink>
        </div>

        <div class="lg:hidden">
          <button
            class="p-2 text-gray-600 bg-gray-100 rounded-lg"
            type="button"
          >
            <span class="sr-only">Open menu</span>
            <svg
              aria-hidden="true"
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewbox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 6h16M4 12h16M4 18h16"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>
