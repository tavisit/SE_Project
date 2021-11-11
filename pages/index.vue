<script>
export default defineComponent({
  setup() {
    const inputStr = ref('')
    const inputNum = ref(null)
    const inputDate = ref('')

    const inputHandle = () => {
      // console.log(inputStr.value, inputNum.value, inputDate.value)
    }

    return { inputStr, inputNum, inputDate, inputHandle }
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
      <AltButton
        class="mt-1"
      >
        Button
      </AltButton>
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
          type="file"
          multiple
        >
          <template #label>
            File input
          </template>
        </DangerInput>
      </div>
    </div>
    <span class="text-2xl font-medium">Checkboxes (inputs under cover)</span>
    <div class="py-5 flex flex-row gap-4">
      <PrimaryInput
        type="checkbox"
      >
        <template #label>
          Check 1
        </template>
      </PrimaryInput>
      <SuccessInput
        type="checkbox"
      >
        <template #label>
          Check 2
        </template>
      </SuccessInput>
      <WarnInput
        type="checkbox"
      >
        <template #label>
          Check 3
        </template>
      </WarnInput>
      <DangerInput
        type="checkbox"
      >
        <template #label>
          Check 4
        </template>
      </DangerInput>
    </div>
    <span class="text-2xl font-medium">Radios (inputs under cover)</span>
    <div class="py-5 flex flex-row gap-4">
      <PrimaryInput
        type="radio"
        name="test"
      >
        <template #label>
          Radio 1
        </template>
      </PrimaryInput>
      <SuccessInput
        type="radio"
        name="test"
      >
        <template #label>
          Radio 2
        </template>
      </SuccessInput>
      <WarnInput
        type="radio"
        name="test"
      >
        <template #label>
          Radio 3
        </template>
      </WarnInput>
      <DangerInput
        type="radio"
        name="test"
      >
        <template #label>
          Radio 4
        </template>
      </DangerInput>
    </div>
  </div>
</template>