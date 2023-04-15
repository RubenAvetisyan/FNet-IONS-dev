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

const { $isLoading, $startLoading, $finishLoading } = useNuxtApp()

const mySignInHandler = async () => {
    $startLoading()
    const { error, url, status } = await signIn('credentials', {
        username: username.value,
        password: password.value,
        redirect: true,
        callbackUrl: `/user/statements/totalClients`
    })
    $finishLoading()
    console.log('url: ', url);
    console.log('status: ', status.value);
    window.alert('url: ' + url)
    if (error) {
        console.log('error: ', error);
        // Do your custom error handling here
        return null
    } else {
        window.alert('url: ' + url)
        // No error, continue with the sign in, e.g., by following the returned redirect:
        return navigateTo(url || '/user/statements/totalClients', { external: true })
    }
}

const generateUniqueId = useGenerateUniqueId
const login = () => {
    if (username.value && password.value) {
        console.log('username.value: ', username.value);
        mySignInHandler()
        //     const response = useFetch('/api/auth/:credentails', {
        //         method: 'post',
        //         body: {
        //             username: username.value,
        //             password: password.value
        //         }
        //     })
        //     console.log('useFetch response: ', response);
    }
}
</script>

<template>
            <div>
                    <h3 v-if="!isValidated" class="text-lg font-medium text-brand-pink dark:text-brand-pink dark:text-opacity-75">
                        <span>Անհաջող փորձ.</span>
                    </h3>
                    <form class="space-y-6">
                        <div>
                            <label :for="generateUniqueId('username')" block mb-2 text-sm font-medium text-brand-media
                                dark:text-white>Մուտքանուն</label>
                            <input :id="generateUniqueId('username')" v-model="username" type="text" name="username" bg-gray-50 border
                                border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full
                                p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white
                                placeholder="ERP համակարգում Ձեր մուտքանունը" required @keydown.enter="login">
                        </div>
                        <div>
                            <label :for="generateUniqueId('password')" block mb-2 text-sm font-medium text-brand-media
                                dark:text-white>Գաղտնաբառ</label>
                            <input :id="generateUniqueId('password')" v-model="password" type="password" name="password"
                                placeholder="••••••••" autocomplete="true" bg-gray-50 border border-gray-300 text-gray-900 text-sm
                                rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600
                                dark:border-gray-500 dark:placeholder-gray-400 dark:text-white required @keydown.enter="login">
                        </div>
                        <div v-if="false" class="flex justify-between">
                            <div class="flex items-start">
                                <div class="flex items-center h-5">
                                    <input :id="generateUniqueId('remember')" type="checkbox" value="" w-4 h-4 bg-gray-50 rounded border
                                        border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500
                                        dark:focus:ring-blue-600 dark:ring-offset-gray-800 required>
                                </div>
                                <label :for="generateUniqueId('remember')" ml-2 text-sm font-medium text-gray-900
                                    dark:text-gray-300>Պահպանել
                                    տվյալները</label>
                            </div>
                            <a href="#" v-if="false" text-sm text-blue-700 hover:underline dark:text-blue-500>Lost
                                Password?</a>
                        </div>
                        <!-- type="submit" -->
                        <button :disabled="disabled" w-full f-btn keydown.enter="login" @click="login">
                    Մուտք գործել համակարգ
                </button>
        </form>
    </div>
</template>
