<script setup lang="ts">
const disabled = ref(false)

const props = defineProps({
    components: {
        type: [Object],
        defaulr: []
    },
    submit: {
        type: Function,
        default: (e: MouseEvent) => { }
    }
})

const isValidated = ref(true)

const username = ref('')
const password = ref('')
</script>

<template>
    <div>
        <h3 v-if="!isValidated" class="text-lg font-medium text-red-800 dark:text-red-4">
            <span>Անհաջող փորձ.</span>
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
                <input id="password" v-model="password" type="password" name="password" placeholder="••••••••"
                    autocomplete="true"
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
            <button :disabled="disabled"
                class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                @click.stop="(e) => submit(e)">
                Մուտք գործել համակարգ
            </button>
        </form>
    </div>
</template>