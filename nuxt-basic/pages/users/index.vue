<template>
    <div>
        <h1 align="center"> All Users </h1>
        <p>{{ items.length }}</p>
        <ul>
            <li v-for="i in items">
                <p> {{ i.id }} {{ i.username }} {{ i.name }}</p>
                <nuxt-link :to="'/users/'+i.id"> <button> check this </button> </nuxt-link> 
                <button @click="delUser(i.id)">DELETE IT!!</button>
            </li>
        </ul>
        <!--p>{{ items }}</p-->
        <form @submit="addUser">
            <input type="number" v-model="formData.id"><br>
            <label for="fname">username:</label><br>
            <input type="text" v-model="formData.username" ><br>
            <label >name:</label><br>
            <input type="text" v-model="formData.name"><br><br>
            <input type="submit">
        </form> 
    </div>
    <div>
        <h1> {{ formData }} </h1>
    </div>
</template>

<script setup>
    import {ref} from 'vue';
    const items = ref([])
    const formData = ref({
        id:0 ,
        username: '',
        name: '',
    })
        
    async function addUser() {
        const sending = await $fetch('http://localhost:3001/users', {
            method: 'POST',
            body: {
                id:formData.value.id,
                username:formData.value.username,
                name:formData.value.name
            }
        })
        console.log(sending)
    }

    async function delUser(id) {
        const sending = await $fetch('http://localhost:3001/users/'+id, {
            method: 'DELETE'
        })
        console.log(sending)
    }

    fetch('http://localhost:3001/users')
        .then(res => res.json())
        .then((result) =>{
            items.value = result
            //console.log(result)
        })


</script>