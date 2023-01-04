<script setup>
definePageMeta({
    requiresAuth: true,
    layout: 'user'
})

const route = useRoute()

const setPath = (str) => route.path + '/' + str

const links = [
    {
        text: 'վճարման ենթակա միացումների ցուցակ',
        path: setPath('11-need-to-pay'),
        query: {
            query: {}
        }
    },
    {
        text: 'Միացումների ցուցակ ըստ հասցեների և ամսաթվերի',
        path: setPath('connections-by-address-and-creationdate'),
        query: {
            query: {
                component: [encodeURIComponent(JSON.stringify({
                    name: 'f-input',
                    type: 'input',
                    props: {
                        label: 'mtInput',
                        vModel: ''
                    }
                }))]
            }
        }
    }
]
</script>

<template>
    <div w="full" h="full">
        <h2 m="t-4 b-8" text="4xl dark:white" font-extrabold>Հաշվետվություններ</h2>
        <!-- <ClientOnly> -->
        <div container m="4 x-auto" grid grid-cols-4 gap-4 gap-y-2>
            <card p-0 v-for="link in links">
                <nuxt-link :to="{
                    path: link.path, ...link.query
                }" :page-key="link.text" cursor="pointer" block w-full h-full px-5 py-10>
                    {{ link.text }}
                </nuxt-link>
            </card>
        </div>
    </div>
</template>