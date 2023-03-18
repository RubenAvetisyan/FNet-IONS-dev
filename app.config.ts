export default defineAppConfig({
  title: 'FNet Payment System',
  alerts: {
    login: {
      true: 'Դուք հաջողությամբ նույնականացվեցիք․․․',
      fasle: 'Սխալ տվյալներ',
    },
    logout: 'Դուք դուրս եկակք համակարգից։',
  },
  theme: {
    dark: true,
    colors: {
      primary: '#5723ae',
    },
  },
})
