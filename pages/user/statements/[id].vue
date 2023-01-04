

<template>
    <div flex-row grid="flow-row-dense ~" scroll-block scrollbar scrollbar-rounded items-center w="full" h="full"
        mx-auto>
        <h2 m="t-4 b-8" text="4xl dark:white" font-extrabold>Ադմինիստրավորում</h2>
        <!-- <ClientOnly> -->
        <div mx-auto flex inline-flex items="center">

        </div>
        <div mx-auto flex inline-flex items="center">
            <NuxtLink flex w-36 btn m-3 text-sm align-middle justify-between items-center to="/">
                <span i-twemoji:waving-hand text-3xl inline-block animate-shake-x animate-count-infinite
                    animate-duration-5000 />
                Back
            </NuxtLink>
            <div flex btn h-11 m-3 text-sm align-middle justify-between items-center @click.stop="newRequest">
                Թարմացնել տվյալները
            </div>
        </div>
        <div mx-auto flex inline-flex items="center">
            <div v-for="(component, i) in components" :key="component.name + '-' + i">
                <component :is="component.component" v-if="component.component.props.modelValue"
                    v-model="component.vModel" :label="component.label" :id="component.name + '-' + i" mx-2>
                </component>
                <component v-else :is="component.value.component" mx-2>
                </component>
            </div>
        </div>
        <div container m="4 x-auto">
            <FTable v-if="statement" :src="statement" mt-8 />
        </div>
    </div>
</template>
