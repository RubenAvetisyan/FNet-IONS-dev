import { useSetAutoSync, useSetSyncStatusMessage } from "../composables/autosync"

enum AutoSync {
    on = 0,
    off = 1
}
let response: unknown = null
const { pause, resume, isActive } = useSetAutoSync(async () => {
    response = await $fetch('/api/payments')
    console.log('response: ', response);
}, 5000)

pause()
export default defineNuxtPlugin(() => {
    let message = 'Autosyncronization is runing'
    pause()
    // addRouteMiddleware('db-syncronization', async () => {
    //     console.log('this global middleware was added in a plugin')
    //     if (isStopped) {

    //     } else {
    //         resume()
    //     }
    // }, { global: true })

    return {
        provide: {
            autoSync: (mode: AutoSync) => {
                if (mode) {
                    console.log('mode: ', mode, pause());
                    
                } else {
                    resume()
                }

                message = useSetSyncStatusMessage(unref(isActive))
                console.log(message);

                return { pause, resume, isActive }
            },
            getResponse: () => response
        }
    }
})