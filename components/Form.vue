<script setup lang="ts">
const disabled = ref(false)

// const props = defineProps({
//     components: {
//         type: [Object],
//         defaulr: []
//     }
// })

const { signIn } = useAuth()

// const { login: storeLogin } = useAdminAuthStore()

const isValidated = ref(true)

const username = ref('')
const password = ref('')

const { baseUrl } = useRuntimeConfig()

const mySignInHandler = async () => {
    const { error, url, status } = await signIn('credentials', { username: username.value, password: password.value, redirect: false })
    console.log('url: ', url);
    console.log('status: ', status);
    if (error) {
        // Do your custom error handling here
        createError('You have made a terrible mistake while entering your credentials')
    } else {
        // No error, continue with the sign in, e.g., by following the returned redirect:
        return navigateTo(url || '/user/statements/totalClients', { external: true })
    }
}

const generateUniqueId = useGenerateUniqueId
</script>

<template>
    <div>
        <h3 v-if="!isValidated" class="text-lg font-medium text-red-800 dark:text-red-4">
            <span>Անհաջող փորձ.</span>
        </h3>
        <form class="space-y-6">
            <div>
                    <label :for="generateUniqueId('email')" block mb-2 text-sm font-medium text-gray-900
                        dark:text-white>Մուտքանուն</label>
                    <input :id="generateUniqueId('email')" v-model="username" type="text" name="email" bg-gray-50 border
                        border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full
                        p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white
                        placeholder="ERP համակարգում Ձեր մուտքանունը" required>
                </div>
                <div>
                    <label :for="generateUniqueId('password')" block mb-2 text-sm font-medium text-gray-900
                        dark:text-white>Գաղտնաբառ</label>
                    <input :id="generateUniqueId('password')" v-model="password" type="password" name="password"
                        placeholder="••••••••" autocomplete="true" bg-gray-50 border border-gray-300 text-gray-900 text-sm
                        rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600
                        dark:border-gray-500 dark:placeholder-gray-400 dark:text-white required>
                </div>
                <div class="flex justify-between">
                    <!-- <div class="flex items-start">
        <div class="flex items-center h-5">
        <input :id="generateUniqueId('remember')" type="checkbox" value="" w-4 h-4 bg-gray-50 rounded border
        border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500
        dark:focus:ring-blue-600 dark:ring-offset-gray-800 required>
        </div>
        <label :for="generateUniqueId('remember')" ml-2 text-sm font-medium text-gray-900
        dark:text-gray-300>Պահպանել
        տվյալները</label>
        </div> -->
                    <!-- <a href="#" text-sm text-blue-700 hover:underline dark:text-blue-500>Lost
                                                                                                                                                                                Password?</a> -->
                </div>
                <!-- type="submit" -->
                <div :disabled="disabled" w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none
                    focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600
                    dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer @click="() => mySignInHandler()">
                    Մուտք գործել համակարգ
                </div>
        </form>
    </div>
</template>
