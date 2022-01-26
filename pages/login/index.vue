<script lang="ts">
definePageMeta({
  layout: "form",
});

export default defineComponent({
  setup() {
    const email = ref('');
    const password = ref('');
    return { email, password };
  },
});
</script>

<template>
  <form
    class="relative w-screen max-w-lg mx-auto overflow-auto bg-white divide-y divide-gray-100 rounded-lg shadow-2xl"
    role="dialog"
    aria-label="Login Credentials"
  >
    <header class="p-6 text-center">
      <p class="text-3xl font-semibold">Login</p>
    </header>

    <main class="flow-root p-6 overflow-y-auto h-96">
      <div class="-my-8 divide-y divide-gray-100">
        <div class="py-8">
          <fieldset>
            <legend class="text-xl font-medium">Credentials</legend>

            <PrimaryInput v-model="email">
              <template #label>
                Email
              </template>
            </PrimaryInput>
            <PrimaryInput v-model="password" type="password">
              <template #label>
                Password
              </template>
            </PrimaryInput>
          </fieldset>
        </div>
      </div>
    </main>

    <footer class="flex items-center justify-between p-6">
      <div class="flex flex-row gap-4">
        <AltLink
          @click.prevent="email=''; password=''"
        >
          Clear all
        </AltLink>
        <NuxtLink to="/register">
          <AltLink>
            No account?
          </AltLink>
        </NuxtLink>
      </div>
      <PrimaryButton class="float-right">
        Submit
      </PrimaryButton>
    </footer>
  </form>
</template>