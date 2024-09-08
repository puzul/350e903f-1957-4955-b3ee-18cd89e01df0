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
      <tbody class="border border-solid border-gray-500">
        <tr v-for="user in users">
          <td class="border border-solid border-gray-500">
            {{ user.firstName }}
          </td>
          <td class="border border-solid border-gray-500">
            {{ user.lastName }}
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
  const users = [
    {
      firstName: 'Robert',
      lastName: 'Raegan',
      position: 'CEO',
      phone: '(818) 555-2387',
      email: 'robert@dx-email.id'
    },
    {
      firstName: 'Jackson',
      lastName: 'Hansen',
      position: 'CEO',
      phone: '(818) 555-2387',
      email: 'robert@dx-email.my'
    },
  ]
</script>