<script>

</script>

<template>
  <div class="flex flex-col">
    <BaseNavBar />
    <div class="py-12">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="bg-white overflow-hidden shadow-xl sm:rounded-lg">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>