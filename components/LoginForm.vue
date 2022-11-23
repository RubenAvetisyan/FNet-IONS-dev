<script setup lang="ts">

const props = defineProps({
  endpoint: {
    type: String,
    defaulr: '/api/auth',
    required: true
  },
})

const { setAlert } = useAlertStore()

const { login: storeLogin } = useAdminAuthStore()

const endpoint = props.endpoint as string

const router = useRouter()

const name = ref('')

const username = ref('')
const password = ref('')

const response = ref()
const disabled = ref(false)

const isValidated = ref(true)

const authStore = useAuthStore()

const login = async () => {
  if (!unref(username) || !unref(password))
    return createError('Ստուգեք լրացվող տվյալները')

  disabled.value = true

  await storeLogin(username, password, setAlert)

  disabled.value = false
}

watch(() => response.value, (responseValue: AuthResponse) => {
  isValidated.value = Array.isArray(responseValue.groupId) && !!responseValue.groupId.length

  authStore.setAuth('login', responseValue.fullName)
  router.push(`/?login=${isValidated.value}`)

  if (isValidated.value)
    name.value = responseValue.fullName
})
</script>

<template>
  <div class="py-6 px-6 lg:px-8">
    <h3 v-if="!isValidated" class="text-lg font-medium text-red-800 dark:text-red-4">
      Անհաջող փորձ.
    </h3>
    <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
      Խնդրում ենք նույնականացվել համակարգում
    </h3>
    <form class="space-y-6">
      <div>
        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Մուտքանուն</label>
        <input id="email" v-model="username" type="text" name="email"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          placeholder="name@fnet.am կամ ERP համակարգում Ձեր մուտքանունը" required>
      </div>
      <div>
        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Գաղտնաբառ</label>
        <input id="password" v-model="password" type="password" name="password" placeholder="••••••••" autocomplete="true"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          required>
      </div>
      <div class="flex justify-between">
        <div class="flex items-start">
          <div class="flex items-center h-5">
            <input id="remember" type="checkbox" value=""
              class="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
              required>
          </div>
          <label for="remember" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Պահպանել
            տվյալները</label>
        </div>
        <!-- <a href="#" class="text-sm text-blue-700 hover:underline dark:text-blue-500">Lost
                                    Password?</a> -->
      </div>
      <!-- type="submit" -->
      <button :disabled="disabled && 'true'"
        class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        @click="login">
        Մուտք գործել համակարգ
      </button>
    </form>
  </div>
</template>
