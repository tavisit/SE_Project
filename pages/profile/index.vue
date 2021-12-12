<script setup lang="ts">
  fetch(`http://localhost:3000/api/register`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify({
      email: 'teo.virghi@gmail.com',
      password: 'a$<yR//v`#M&uky2g:SpL\"r+4j;t{NUv',
    })
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
</script>

<template>
  <div>
    <!--TODO LOGIN REGSITER FORMS  -->
    <PrimaryButton
      class="mt-1"
    >
      Button
    </PrimaryButton>
  </div>
</template>