const toDec = (val: number | string, dec: number | string = 0) =>
    Number.isNaN(+val) ? val : (+val).toFixed(+dec!)

const defaultKeyToDec = 'price,balance,add_service,action_price,real_price'

export const useTransformReponseData = (response: any[], keyToDec: string[] | string = defaultKeyToDec) => {

    const header = Object.keys(response[0])

    const decIndexes: number[] = []

    let i = 0
    for (let key in response[0]) {
        if (keyToDec.includes(key)) decIndexes.push(i)
        i += 1
    }
    const body = response.map(item => {
        const result: any[] = Object.values(item)
        decIndexes.forEach(index => result[index] = toDec(result[index]))
        return result
    })

    return {
        header,
        body
    }
}