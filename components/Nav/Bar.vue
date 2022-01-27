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
  <nav class="bg-gray-800">
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between h-16">
        <!-- Hamburger button -->
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <div class="relative py-3 sm:max-w-xl mx-auto">
            <div
              class="text-gray-500 w-10 h-10 focus:outline-none bg-white rounded-lg"
              @click="mobileMenuToggle = !mobileMenuToggle"
            >
              <span class="sr-only">Open main menu</span>
              <div
                class="block w-5 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
              >
                <span
                  aria-hidden="true"
                  class="block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out"
                  :class="{
                    'rotate-45': mobileMenuToggle === true,
                    '-translate-y-1.5': !mobileMenuToggle,
                  }"
                />
                <span
                  aria-hidden="true"
                  class="block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out"
                  :class="{ 'opacity-0': mobileMenuToggle }"
                />
                <span
                  aria-hidden="true"
                  class="block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out"
                  :class="{
                    '-rotate-45': mobileMenuToggle,
                    ' translate-y-1.5': !mobileMenuToggle,
                  }"
                />
              </div>
            </div>
          </div>
        </div>
        <div
          class="flex-1 flex items-center justify-center sm:(items-stretch justify-start)"
        >
          <div class="flex-shrink-0 flex items-center">
            <!-- ICON -->
            <NuxtLink to="/"><IconApp /></NuxtLink>
          </div>
          <div class="hidden sm:(block ml-6)">
            <!-- LIST -->
            <div class="flex space-x-4 tracking-wider">
              <NavLinks
                styling="text-gray-300 hover:(bg-gray-700 text-white transform translate-y-1) px-3 py-2 rounded-md text-sm font-semibold"
                active="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-semibold transform translate-y-1"
              />
            </div>
          </div>
        </div>
        <div class="flex-grow flex items-end justify-end">
          <NuxtLink
            v-if="user.isAuthenticated"
            to="/profile"
            class="w-10 h-10 rounded-full bg-gray-300 overflow-hidden"
          >
            <img
              src="https://eu.ui-avatars.com/api/?name=John+Doe&background=FCEAD4&color=835927&bold=true"
              class="w-full h-full bg-cover"
            />
          </NuxtLink>
          <div v-else class="flex fler-row gap-4">
            <NuxtLink to="/login">
              <SuccessButton> Login </SuccessButton>
            </NuxtLink>
            <NuxtLink to="/register">
              <WarnButton> Register </WarnButton>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile menu, show/hide based on menu state. -->
    <div class="sm:hidden" id="mobile-menu" v-if="mobileMenuToggle">
      <div class="px-2 pt-2 pb-3 space-y-1 tracking-wider">
        <NavLinks
          styling="text-gray-300 hover:(bg-gray-700 text-white) block px-3 py-2 rounded-md text-base font-semibold"
          active="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-semibold"
        />
      </div>
    </div>
  </nav>
</template>
