<script lang="ts">import { useAuth } from "~~/composables/user";


definePageMeta({
  layout: "form",
});

export default defineComponent({
  setup() {
    const user = useAuth();
    const email = ref('');
    const password = ref('');

    const submit = (evt: Event) => {
      fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.value,
          password: password.value,
        }),
      })
      .then(response => response.json())
      .then(d => d.user.user)
      .then(data => {
        const { email, uid, stsTokenManager, providerData } = data;
        const { displayName } = providerData[0];
        const { accessToken } = stsTokenManager;
        user.value.email = email;
        user.value.name = displayName ?? '';
        user.value.id = uid;
        user.value.token = accessToken;
        user.value.save();
      });
    };

    return { email, password, submit };
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
      <PrimaryButton @click.prevent="submit">
        Submit
      </PrimaryButton>
    </footer>
  </form>
</template>