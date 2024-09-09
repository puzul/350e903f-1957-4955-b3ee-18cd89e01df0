<template>
  <div class="flex flex-col w-full min-h-screen">
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
    <table class="border border-solid border-gray-500">
      <thead class="border border-solid border-gray-500">
        <tr>
          <th class="border border-solid border-gray-500">
            First Name
          </th>
          <th class="border border-solid border-gray-500">
            Last Name
          </th>
          <th class="border border-solid border-gray-500">
            Position
          </th>
          <th class="border border-solid border-gray-500">
            Phone
          </th>
          <th class="border border-solid border-gray-500">
            Email
          </th>
        </tr>
      </thead>
      <tbody v-if="users" class="border border-solid border-gray-500">
        <tr v-for="(user, index) in users" :key="`user-${user.id}`">
          <td class="border border-solid border-gray-500" :class="{
            'border-b-cyan-400' : editFieldArray[index].firstName
          }">
            <span v-if="!editFieldArray[index].firstName" @click="() => toggleEdit(editFieldArray[index], 'firstName', true, `inputFirstName${user.id}`)">
              {{ user.firstName }}
            </span>
            <input v-else :id="`inputFirstName${user.id}`" type="text" :value="user.firstName" class="outline-none"
              @focusout="() => toggleEdit(editFieldArray[index], 'firstName', false, `input${user.id}`)"
              @change="event => user.firstName = (event.target as HTMLInputElement).value ">
          </td>
          <td class="border border-solid border-gray-500" :class="{
            'border-b-cyan-400' : editFieldArray[index].lastName
          }">
            <span v-if="!editFieldArray[index].lastName" @click="() => toggleEdit(editFieldArray[index], 'lastName', true, `inputLastName${user.id}`)">
              {{ user.lastName }}
            </span>
            <input v-else :id="`inputLastName${user.id}`" type="text" :value="user.lastName" class="outline-none"
              @focusout="() => toggleEdit(editFieldArray[index], 'lastName', false, `inputLastName${user.id}`)"
              @change="event => user.lastName = (event.target as HTMLInputElement).value ">
          </td>
          <td class="border border-solid border-gray-500">
            {{ user.position }}
          </td>
          <td class="border border-solid border-gray-500">
            {{ user.phone }}
          </td>
          <td class="border border-solid border-gray-500">
            {{ user.email }}
          </td>
        </tr>
      </tbody>
    </table>
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
      console.log(object.lastName);
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