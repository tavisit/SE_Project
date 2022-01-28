<script lang="ts">
export default defineComponent({
  setup() {
    const user = useAuth();
    const inputFile = ref<FileList | null>(null);
    const inputStr = ref('');
    const inputNum = ref(null);
    const inputDate = ref('');
    const inputBool = ref(false);

    const inputHandle = () => {
      // console.log(inputStr.value, inputNum.value, inputDate.value)
    };

    const logValue = (evt) => {
      console.log(evt.target.checked);
    };

    watch(inputBool, (val) => {
      console.log('user', user);
      console.log('is valid', user.value.isValid);
      console.log('email', user.value.email);
      console.log(val, typeof val);
    });

    watch(inputFile, (val) => {
      console.log(val);
    });

    return {
      inputFile,
      inputStr,
      inputNum,
      inputDate,
      inputHandle,
      logValue,
      inputBool,
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
          Conversion program demonstration
        </h1>

        <div class="inline-block pb-8 border-b-2 border-blue-500">
          <p class="font-medium text-gray-600">
            By Virghileanu Teodor & Octavian Matei
          </p>
        </div>

        <div class="prose prose-lg max-w-none">
          <p>
            This is just a proof of concept demonstration of the standalone
            conversion program.
          </p>

          <h2>Standalone conversion program?</h2>

          <p>
            That's right, the conversion program is a standalone application
            which can be used via an intuitive CLI
          </p>
        </div>
      </div>
    </div>
  </article>
</template>
