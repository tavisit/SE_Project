<script lang="ts">
export default defineComponent({
  setup() {
    const user = useAuth();
    return {
      user,
    };
  },
});
</script>

<template>
  <article>
    <div class="max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div class="mx-auto space-y-8 max-w-prose">
        <h1 class="text-3xl font-bold leading-tight text-gray-900 sm:text-5xl">
          {{ user.email }}
        </h1>

        <div class="inline-block pb-8 border-b-2 border-blue-500">
          <p class="font-medium text-gray-600">
            {{ user.id }}
          </p>
        </div>
      </div>
    </div>
  </article>
</template>
