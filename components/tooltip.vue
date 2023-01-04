<template>
    <div absolute z-100 flex top="-2" right="-3" w-48 p="x-2 y-1" bg="purple-700" rounded="lg" text="sm center white"
        translate-x-full
        border="before:8 before:y-transparent before:y-transparent before:l-transparen before:r-purple-700"
        before="content-[''] block absolute top-1/2 right-[100%] -translate-y-1/2" class="group-hover/tooltip:visible">

        <slot></slot>
    </div>
</template>