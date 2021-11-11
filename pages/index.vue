<script>
export default defineComponent({
  setup() {
    const inputStr = ref('')
    const inputNum = ref(null)
    const inputDate = ref('')

    const inputHandle = () => {
      console.log(inputStr.value, inputNum.value, inputDate.value)
    }

    const getFile = (evt) => {
      console.log(evt.target.files[0], evt)
    }

    return { inputStr, inputNum, inputDate, inputHandle, getFile }
  }
})
</script>

<template>
  <div class="p-2">
    <span class="text-2xl font-medium">Normal sized buttons</span>
    <div class="p-5 flex flex-row gap-4">
      <PrimaryButton
        class="mt-1"
      >
        Button
      </PrimaryButton>
      <SecondaryButton
        class="mt-1"
      >
        Button
      </SecondaryButton>
      <SuccessButton
        class="mt-1"
      >
        Button
      </SuccessButton>
      <WarnButton
        class="mt-1"
      >
        Button
      </WarnButton>
      <DangerButton
        class="mt-1"
      >
        Button
      </DangerButton>
    </div>
    <span class="text-2xl font-medium">Tiny buttons</span>
    <div class="p-5 flex flex-row gap-4">
      <PrimaryButton
        class="mt-1"
        :isTiny="true"
      >
        Tiny
      </PrimaryButton>
      <SecondaryButton
        class="mt-1"
        :isTiny="true"
      >
        Tiny
      </SecondaryButton>
      <SuccessButton
        class="mt-1"
        :isTiny="true"
      >
        Tiny
      </SuccessButton>
      <WarnButton
        class="mt-1"
        :isTiny="true"
      >
        Tiny
      </WarnButton>
      <DangerButton
        class="mt-1"
        :isTiny="true"
      >
        Tiny
      </DangerButton>
    </div>
    <span class="text-2xl font-medium">Inputs</span>
    <div class="p-5 flex flex-row gap-4">
      <div class="w-1/2 flex flex-col">
        <PrimaryInput
          v-model="inputStr"
          @input="inputHandle"
        >
          <template #label>
            String input
          </template>
        </PrimaryInput>

        <PrimaryInput
          v-model.number="inputNum"
          @input="inputHandle"
          type="number"
        >
          <template #label>
            Number input
          </template>
        </PrimaryInput>

        <PrimaryInput
          v-model="inputDate"
          @input="inputHandle"
          type="date"
        >
          <template #label>
            Date input
          </template>
        </PrimaryInput>

        <PrimaryInput
          @change="getFile"
          type="file"
        >
          <template #label>
            File input
          </template>
        </PrimaryInput>
      </div>
      <div class="w-1/2 flex flex-col">
        <SuccessInput
          v-model="inputStr"
          @input="inputHandle"
        >
          <template #label>
            String input
          </template>
        </SuccessInput>

        <WarnInput
          v-model.number="inputNum"
          @input="inputHandle"
          type="number"
        >
          <template #label>
            Number input
          </template>
        </WarnInput>

        <DangerInput
          v-model="inputDate"
          @input="inputHandle"
          type="date"
        >
          <template #label>
            Date input
          </template>
        </DangerInput>

        <DangerInput
          @change="getFile"
          type="file"
        >
          <template #label>
            File input
          </template>
        </DangerInput>
      </div>
    </div>
    <span class="text-2xl font-medium">Checkboxes (inputs under cover)</span>
    <div class="flex flex-row gap-4">
      <PrimaryInput type="checkbox" />
      <SuccessInput type="checkbox" />
      <WarnInput type="checkbox" />
      <DangerInput type="checkbox" />
    </div>
  </div>
</template>