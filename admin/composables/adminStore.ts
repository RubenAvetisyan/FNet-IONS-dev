import { acceptHMRUpdate, defineStore } from 'pinia'
// import hy from 'date-fns/locale/hy'
import { differenceInMilliseconds, format, parseISO } from 'date-fns'
import { H3Error } from 'h3';

type Log = {
  header: string[];
  body: GetPaymentsResponseBody[];
};

export const formatSimpleDate = (date: Date | number) => format(date, 'yyyy-MM-dd')
const defaultStartDate = formatSimpleDate(Date.now()) as string
export const useAdminStore = defineStore('adminStore', {
  state: () => ({
    basePath: '/admin',
    leftPanel: {
      list: [
        {
          type: 'button',
          name: 'Վճարային համակարգեր',
          icon: 'i-mdi-bank-transfer',
          sub: [
            {
              type: 'link',
              name: 'Lan-Billing',
              icon: 'i-mdi-wallet-outline',
              link: '/',
            },
            {
              type: 'link',
              name: 'ABilling',
              icon: 'i-mdi-wallet-plus',
              link: '/',
            },
            {
              type: 'link',
              name: 'հաշվետվություններ',
              icon: 'i-mdi-chart-box-outline',
              link: '/user/statements',
            },
            {
              type: 'link',
              name: 'Համաժամացումների տեղեկագիր',
              icon: 'i-mdi-database-sync',
              link: '/admin/synclog',
            },
          ],
        },
        {
          type: 'link',
          link: '/admin/administrating',
          name: 'Ադմինիստրավորում',
          icon: 'i-mdi-view-dashboard-edit',
        },
        {
          type: 'link',
          href: 'http://ions.fnet.am/admin',
          name: 'Կցել Telegram',
          icon: 'i-mdi-account-plus',
          direct: true,
        },
      ] as AdminStoreList[],
    },
    log: { header: [], body: [] } as Log,
    logStartDate: '' || defaultStartDate,
  }),

  getters: {
    adminLeftPanel: state => state.leftPanel,
    logTable: (state) => {
      const updatedDataResult = updatedData(state.log);

      return {
        header: updatedDataResult.header,
        body: updatedDataResult.body,
      };
    },
    logDate: (state) => {
      return state.logStartDate;
    },
  },


  actions: {
    async setLog(date: QueryDate) {
      const dates = { ...date };

      dates.dateFrom = setDateFrom(date.dateFrom);
      dates.dateTo = setDateTo(date.dateTo);
      const difference = differenceInMilliseconds(parseISO(dates.dateTo), parseISO(dates.dateFrom));

      if (difference < 0) {
        throw new Error('Дата начала должна быть раньше даты окончания');
      }

      try {
        const { data } = await useFetch('/api/get-abilling-payments', {
          key: Date.now() + '',
          method: 'POST',
          body: {
            date: dates,
          },
          pick: ['body', 'header'],
        });

        if (!data.value || data.value instanceof H3Error) {
          console.log('data.value: ', data.value);
          throw new Error(data.value?.message || 'Что-то пошло не так');
        } else {
          this.log.header = Array.isArray(data.value.header) ? data.value.header : [];
          this.log.body = Array.isArray(data.value.body) ? data.value.body as GetPaymentsResponseBody[] : [];
        }

        return 'Завершено';
      } catch (error) {
        console.error('Ошибка при получении данных');
        if (error)
          return createError(error);
      }
    },
    setLogStartDate(dateFrom: Date | string) {
      this.logStartDate = dateFrom instanceof Date ? formatSimpleDate(dateFrom) : formatSimpleDate(parseISO(dateFrom))
    },
  },
  // persist: true
})

function setFormat(d: Date | number) {
  return format(d, 'yyyy-MM-dd')
}

function setDateFrom(d: Date | number | string) {
  return typeof d !== 'string' ? setFormat(d) : setFormat(parseISO(d))
}

function setDateTo(d: Date | number | string | undefined) {
  if (!d)
    return ''
  return typeof d !== 'string' ? setFormat(d) : setFormat(parseISO(d))
}

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAdminStore, import.meta.hot))

function updatedData(data: Log) {
  const header = [
    'Տրանզակցիոն Կոդ',
    'Պայմանագրի №',
    'Անուն ազգանուն',
    'Վճարված գումար',
    'Վճարման եղանակ',
    'Վճարման տեսակ',
    'Տրանզակցիոն №',
    'Վճարման ամսաթիվ'
  ]
  return {
    header,
    body: data.body.map((item) => {
      return {
        'Տրանզակցիոն Կոդ': item['Transaction ID'],
        'Պայմանագրի №': item['Contract ID'],
        'Անուն ազգանուն': item.User,
        'Վճարված գումար': item['Payment sum'],
        'Վճարման եղանակ': item.P_TYPE,
        'Վճարման տեսակ': item.P_SYSTEM,
        'Տրանզակցիոն №': typeof item.Transaction === 'string' && item.Transaction.includes(';') ? item.Transaction.split(';')[1].trim() : item.Transaction,
        'Վճարման ամսաթիվ': typeof item['Syncronization Date'] === 'string' ? item['Syncronization Date'].replace('T', ' ').replace('.000Z', '') : item['Syncronization Date'],
      } as unknown as Log;
    })
  };
}
