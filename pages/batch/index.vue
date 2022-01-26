<script lang="ts">
export default defineComponent({
  setup() {
    const previewUrl = ref(null);
    const onFileChange = (e)=> {
      const file = e.target.files[0];
      previewUrl.value = URL.createObjectURL(file);
      
    };
    return{previewUrl,onFileChange};
  }
});
</script>

<template>
 <div class="p-2">
   <PrimaryInput
          type="file"
          accept="image/*"
          @change="onFileChange"
    >
      <template #label>
        File input
      </template>
    </PrimaryInput>
    <div id="preview">
      <img v-if="previewUrl" :src="previewUrl" />
    </div>
    <PrimaryButton
        class="mt-1"
      >
        Upload
      </PrimaryButton>
      
 </div>
</template>