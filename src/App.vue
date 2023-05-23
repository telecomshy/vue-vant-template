<template>
  <h1 class="text-blue-600 font-bold text-8xl">hello world</h1>
  <router-view></router-view>
</template>

<script setup lang="ts">
import {onMounted} from "vue";
import {request} from "@/utils/request"

onMounted(async () => {
  try {
    const data = await request.get("/user")
    console.log("in app try: ", data)
  }catch(error){
    console.log("in app catch: ", error)
  }
})
</script>
