<template>
    <div>
        <h1 align="Center"> {{items.name}} </h1>
        <p align="Center">{{ items.username }}</p>
        
    </div>
</template>

<script setup>
import {ref} from 'vue'
const routes = useRoute()
const items = ref({})
const id = routes.params.id

//console.log(routes.params.id)
fetch('http://localhost:3001/users/'+id)
    .then(res => res.json())
    .then((result) =>{
        items.value = result[0]
    })
</script>