<script>
export default defineComponent({
  setup() {
    var loginEmail = ref('')
    var loginPassword = ref('')
    var registerEmail = ref('')
    var registerPassword = ref('')
    var toggleRegisterVariable = ref(false)

    const registerButton = () => {
      fetch(`http://localhost:3000/api/register`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({
        email: registerEmail.value,
        password: registerPassword.value,
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const loginButton = () => {
    fetch(`http://localhost:3000/api/login`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({
        email: loginEmail.value,
        password: loginPassword.value,
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
    return { registerButton, loginButton, toggleRegisterVariable, registerPassword, registerEmail, loginPassword,loginEmail }

  }
})
</script>

<template>
  <div style="width:800px; margin:0 auto; margin-bottom:5%;">
    <div 
    class="w-1/2 flex flex-col" style="margin-bottom:5%;"
    v-if="toggleRegisterVariable === false"
    >
      <span class="text-2xl font-medium">Login</span>
      <PrimaryInput
        v-model="loginEmail"
      >
        <template #label>
        Email
        </template>
      </PrimaryInput>
      <PrimaryInput 
        type="password"
        v-model="loginPassword"
      >
        <template #label>
        Password
        </template>
      </PrimaryInput>
      <PrimaryButton
        class="mt-1"
        @click = "loginButton"
      >
        Login
      </PrimaryButton>
      <PrimaryButton
        class="mt-1"
        v-on:click="toggleRegisterVariable = true"
      >
        To Register
      </PrimaryButton>
    </div>
    <div 
      class="w-1/2 flex flex-col" style="margin-bottom:5%;"
      v-if="toggleRegisterVariable === true"
    >
      <span class="text-2xl font-medium">Register</span>
      <PrimaryInput
        v-model="registerEmail"
      >
        <template #label>
        Register Email
        </template>
      </PrimaryInput>
      <PrimaryInput type="password"
        v-model="registerPassword"
      >
        <template #label>
        Register Password
        </template>
      </PrimaryInput>
      <PrimaryButton
        class="mt-1"
        @click = "registerButton"
      >
        Register
      </PrimaryButton>
      <PrimaryButton
        class="mt-1"
        v-on:click="toggleRegisterVariable = false"
      >
        To Login
      </PrimaryButton>
    </div>
    
  </div>
</template>