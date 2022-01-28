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
  <div class="p-2">
    <span class="text-2xl font-medium">Normal sized buttons</span>
    <div class="p-5 flex flex-row gap-4">
      <PrimaryButton class="mt-1"> Button </PrimaryButton>
      <SecondaryButton class="mt-1"> Button </SecondaryButton>
      <SuccessButton class="mt-1"> Button </SuccessButton>
      <WarnButton class="mt-1"> Button </WarnButton>
      <DangerButton class="mt-1"> Button </DangerButton>
      <AltButton class="mt-1"> Button </AltButton>
    </div>
    <span class="text-2xl font-medium">Tiny buttons</span>
    <div class="p-5 flex flex-row gap-4">
      <PrimaryButton class="mt-1" :isTiny="true"> Tiny </PrimaryButton>
      <SecondaryButton class="mt-1" :isTiny="true"> Tiny </SecondaryButton>
      <SuccessButton class="mt-1" :isTiny="true"> Tiny </SuccessButton>
      <WarnButton class="mt-1" :isTiny="true"> Tiny </WarnButton>
      <DangerButton class="mt-1" :isTiny="true"> Tiny </DangerButton>
    </div>
    <span class="text-2xl font-medium">Inputs</span>
    <div class="p-5 flex flex-row gap-4">
      <div class="w-1/2 flex flex-col">
        <PrimaryInput v-model="inputStr" @input="inputHandle">
          <template #label> String input </template>
        </PrimaryInput>

        <PrimaryInput
          v-model.number="inputNum"
          @input="inputHandle"
          type="number"
        >
          <template #label> Number input </template>
        </PrimaryInput>

        <PrimaryInput v-model="inputDate" @input="inputHandle" type="date">
          <template #label> Date input </template>
        </PrimaryInput>

        <PrimaryInput type="file">
          <template #label> File input </template>
        </PrimaryInput>
      </div>
      <div class="w-1/2 flex flex-col">
        <SuccessInput v-model="inputStr" @input="inputHandle">
          <template #label> String input </template>
        </SuccessInput>

        <WarnInput v-model.number="inputNum" @input="inputHandle" type="number">
          <template #label> Number input </template>
        </WarnInput>

        <DangerInput v-model="inputDate" @input="inputHandle" type="date">
          <template #label> Date input </template>
        </DangerInput>

        <AltInput type="file" v-model="inputFile" multiple>
          <template #label> File input </template>
        </AltInput>
      </div>
    </div>
    <span class="text-2xl font-medium">Checkboxes (inputs under cover)</span>
    <div class="py-5 flex flex-row gap-4">
      <PrimaryInput type="checkbox" @change="logValue" v-model="inputBool">
        <template #label> Check 1 </template>
      </PrimaryInput>
      <SuccessInput type="checkbox">
        <template #label> Check 2 </template>
      </SuccessInput>
      <WarnInput type="checkbox">
        <template #label> Check 3 </template>
      </WarnInput>
      <DangerInput type="checkbox">
        <template #label> Check 4 </template>
      </DangerInput>
      <AltInput type="checkbox">
        <template #label> Check 5 </template>
      </AltInput>
    </div>
    <span class="text-2xl font-medium">Radios (inputs under cover)</span>
    <div class="py-5 flex flex-row gap-4">
      <PrimaryInput
        type="radio"
        name="test"
        @change="logValue"
        v-model="inputBool"
      >
        <template #label> Radio 1 </template>
      </PrimaryInput>
      <SuccessInput type="radio" name="test">
        <template #label> Radio 2 </template>
      </SuccessInput>
      <WarnInput type="radio" name="test">
        <template #label> Radio 3 </template>
      </WarnInput>
      <DangerInput type="radio" name="test">
        <template #label> Radio 4 </template>
      </DangerInput>
      <AltInput type="radio" name="test">
        <template #label> Radio 5 </template>
      </AltInput>
    </div>
  </div>
</template>
