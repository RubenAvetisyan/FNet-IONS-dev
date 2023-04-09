type Field = 'country' | 'region' | 'city' | 'quarter' | 'street';

type ExtraFields = {
  [key in Field]?: string;
};

type DefaultQuery = {
  dateFrom: string;
  dateTo: string;
  country: 'Հայաստան';
  tabKey: Field
} & ExtraFields;

const { isAdmin } = useAdminAuthStore()
const { getUser } = useAuthStore()

type Roadmap = {
  country: boolean;
  region: boolean;
  city: boolean;
  quarter: boolean;
  street: boolean;
}

type KeyofRoadmap = keyof Roadmap

const roadMap = ref<Roadmap>({
  country: false,
  region: false,
  city: false,
  quarter: false,
  street: false
})


const q = ref<DefaultQuery>({
  dateFrom: dateFrom.value,
  dateTo: dateTo.value,
  country: 'Հայաստան',
  ...(!isAdmin && { regoin: getUser('region') }),
  tabKey: 'country'
})

export const query = computed({
  get() {
    return q.value
  },
  set(value: { [key: string]: string | number }) {
    return { ...q.value, value }
  }
})


export const useTransformClientTotalsData = <T>(options: {
  curTab: globalThis.Ref<string>,
  prevTable: globalThis.Ref<string>
  radMap: globalThis.Ref<Record<string, boolean>>
}) => {
  const fn = async (e: MouseEvent, header: { nextTabKey: string; text: string; tabKey: string; }) => {

    options.prevTable.value = options.curTab.value + ''
    options.curTab.value = header.nextTabKey || 'country'

    const radMapKey = options.curTab.value as keyof typeof options.radMap.value

    options.radMap.value[radMapKey] = true
    if (!header.nextTabKey) query.value = {}
    query.value[header.tabKey] = header.text

    q.value.tabKey = header.nextTabKey
    q.value['text'] = header.text

    await refresh()

    if (!data.value) return

    data.value[currentTable.value].body.forEach(item => {
      if (!data.value) return
      const bodyFirstKey = data.value[currentTable.value].header[0] as string
      item[bodyFirstKey] = { ...item[bodyFirstKey], fn }
    })

    if (currentTable.value === 'region') regionsTable.value = elseData.value[currentTable.value]
    if (currentTable.value === 'city') citiesTable.value = elseData.value[currentTable.value]
    if (currentTable.value === 'quarter') quarterTable.value = elseData.value[currentTable.value]
    if (currentTable.value === 'street') streetTable.value = elseData.value[currentTable.value]
  }

  if (typeof data.header[0] !== 'string')
    data.header[0] = { ...data.header[0], fn }

  if (typeof data.header[0] === 'string')
    data.body.forEach(body => {
      const bodyFirstKey = data.header[0]
      body[bodyFirstKey] = { ...body[bodyFirstKey], fn }
    })
  return {
    header: [
      data.header[0],
      data.header[1],
      data.header[2],
      data.header[3],
    ],
    body: data.body,
  }
}
