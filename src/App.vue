<template>
  <h1 class="text-blue-600 font-bold text-8xl">hello world</h1>
  <router-view></router-view>
</template>

<script setup lang="ts">
import {onMounted} from "vue";
import securityServ from "@/service/securityServ";

onMounted(async () => {
  console.log("start")
  const [error, data] = await securityServ.authGet("/login")
  console.log(data)
})
</script>
