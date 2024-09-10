<template>
  <div class="flex flex-col w-full min-h-screen px-10 pt-10">
    <div class="flex justify-end">
      <button>
        Add
      </button>
      <button>
        Save
      </button>
      <button>
        Back
      </button>
    </div>
    <div class="grid grid-cols-5 border-x border-t border-solid border-gray-500" :class="{ 'border-b': !users }">
      <div class="border-b border-solid border-gray-500 font-bold">
        First Name
      </div>
      <div class="border-b border-solid border-gray-500 font-bold">
        Last Name
      </div>
      <div class="border-b border-solid border-gray-500 font-bold">
        Position
      </div>
      <div class="border-b border-solid border-gray-500 font-bold">
        Phone
      </div>
      <div class="border-b border-solid border-gray-500 font-bold">
        Email
      </div>
    </div>
    <div v-if="users" v-for="(user, index) in users" :key="`user-${user.id}`" class="grid grid-cols-5 border-x border-solid border-gray-500">
      <div class="border-b border-solid border-gray-500" :class="{ 'border-b-cyan-400' : editFieldArray[index].firstName }">
        <span v-if="!editFieldArray[index].firstName" @click="() => toggleEdit(editFieldArray[index], 'firstName', true, `inputFirstName${user.id}`)">
          {{ user.firstName }}
        </span>
        <input v-else :id="`inputFirstName${user.id}`" type="text" :value="user.firstName" class="outline-none"
          @focusout="() => toggleEdit(editFieldArray[index], 'firstName', false, `input${user.id}`)"
          @change="event => user.firstName = (event.target as HTMLInputElement).value ">
      </div>
      <div class="border-b border-solid border-gray-500"  :class="{ 'border-b-cyan-400' : editFieldArray[index].lastName }">
        <span v-if="!editFieldArray[index].lastName" @click="() => toggleEdit(editFieldArray[index], 'lastName', true, `inputLastName${user.id}`)">
          {{ user.lastName }}
        </span>
        <input v-else :id="`inputLastName${user.id}`" type="text" :value="user.lastName" class="outline-none"
          @focusout="() => toggleEdit(editFieldArray[index], 'lastName', false, `input${user.id}`)"
          @change="event => user.lastName = (event.target as HTMLInputElement).value ">
      </div>
      <div class="border-b border-solid border-gray-500" :class="{ 'border-b-cyan-400' : editFieldArray[index].position }">
        <span v-if="!editFieldArray[index].position" @click="() => toggleEdit(editFieldArray[index], 'position', true, `inputPosition${user.id}`)">
          {{ user.position }}
        </span>
        <input v-else :id="`inputPosition${user.id}`" type="text" :value="user.position" class="outline-none"
          @focusout="() => toggleEdit(editFieldArray[index], 'position', false, `input${user.id}`)"
          @change="event => user.position = (event.target as HTMLInputElement).value ">
      </div>
      <div class="border-b border-solid border-gray-500"  :class="{ 'border-b-cyan-400' : editFieldArray[index].phone }">
        <span v-if="!editFieldArray[index].phone" @click="() => toggleEdit(editFieldArray[index], 'phone', true, `inputPhone${user.id}`)">
          {{ user.phone }}
        </span>
        <input v-else :id="`inputPhone${user.id}`" type="text" :value="user.phone" class="outline-none"
          @focusout="() => toggleEdit(editFieldArray[index], 'phone', false, `input${user.id}`)"
          @change="event => user.phone = (event.target as HTMLInputElement).value ">
      </div>
      <div class="border-b border-solid border-gray-500"  :class="{ 'border-b-cyan-400' : editFieldArray[index].email }">
        <span v-if="!editFieldArray[index].email" @click="() => toggleEdit(editFieldArray[index], 'email', true, `inputEmail${user.id}`)">
          {{ user.email }}
        </span>
        <input v-else :id="`inputEmail${user.id}`" type="text" :value="user.email" class="outline-none"
          @focusout="() => toggleEdit(editFieldArray[index], 'email', false, `input${user.id}`)"
          @change="event => user.email = (event.target as HTMLInputElement).value ">
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  interface User {
    id: string;
    firstName: string;
    lastName: string;
    position: string;
    phone: string;
    email: string;
  }

  const url = 'http://localhost:5000/users'
  const { data: users } = await useFetch<User[]>(url, {
    method: 'GET'
  });
  
  interface EditField {
    firstName: boolean;
    lastName: boolean;
    position: boolean;
    phone: boolean;
    email: boolean;
  }

  const editFieldArray = ref<EditField[]>([]);

  watchEffect(() => {
    if (users.value) {
      users.value.forEach(user => {
        editFieldArray.value.push({
          firstName: false,
          lastName: false,
          position: false,
          phone: false,
          email: false
        })
      })
    }
  })

  const toggleEdit = (object: EditField, key: string, value: boolean, inputId: string) => {
    if (value) {
      if (key==='firstName') object.firstName = true;
      if (key==='lastName') object.lastName = true;
      if (key==='position') object.position = true;
      if (key==='phone') object.phone = true;
      if (key==='email') object.email = true;
      document.getElementById(inputId)?.focus();
    }
    else {
      if (key==='firstName') object.firstName = false;
      if (key==='lastName') object.lastName = false;
      if (key==='position') object.position = false;
      if (key==='phone') object.phone = false;
      if (key==='email') object.email = false;
    }
  } 
</script>