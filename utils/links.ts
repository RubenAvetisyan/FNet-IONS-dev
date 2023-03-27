import format from "date-fns/format"

const defaultLinks = [
  {
    text: 'վճարման ենթակա միացումների ցուցակ',
    path: '/user/statements/11-need-to-pay',
    query: {
      query: {},
    },
  },
  {
    text: 'Միացումների ցուցակ ըստ հասցեների և ամսաթվերի',
    path: '/user/statements/connections-by-address-and-creationdate',
    components: [{
      name: 'FInput',
      type: 'input',
      props: {
        label: 'mtInput',
        vModel: '',
        id: 'myInput',
      },
    }],
  },
  {
    text: 'Պասիվ Հաճախորդներ',
    path: '/user/statements/passivecustomers',
    components: [
      {
        name: 'FTable',
        type: 'table',
        props: {
          id: 'passivecustomers',
          src: {
            header: [1, 2, 3],
            body: [1, 2, 3],
          },
          rows: 7,
          filename: () => {
            const currentDate = format(Date.now(), 'yyyy-MM-dd - H b', {
              weekStartsOn: 1,
            })

            return 'TPASSIVE CUSTOMERS ' + currentDate
          }
        },
      }
    ]
  },
  {
    text: 'Հաճախորդներ',
    path: '/user/statements/totalClients',
  },
]

class Route {
  _routes: Map<string, any>
  constructor() {
    this._routes = new Map()
    useRouter().getRoutes().forEach(route => this._routes.set(route?.name || route?.path?.join('').replace('/', ''), route))
    console.log(this._routes.entries())
  }

  setRoute(key: string, value: any) {
    this._routes.set(key, value)
  }

  get routes() {
    return this._routes.entries()
  }

  getRoute(key: string) {
    return this._routes.get(key)
  }
}

export class Link {
  links: {}[]
  // routes: Route
  constructor(public route?: any) {
    this.links = defaultLinks
    //     .map(defaultLink => {
    //     defaultLink.path = route.path ? this.setPath(defaultLink.path) : defaultLink.path
    //     return defaultLink
    // })
    // this.routes = new Route()
    // console.log('this.routes: ', this.routes);
  }

  setPath = (str: string) => `${this.route.path}/${str}`

  setBaseUrl(baseUrl: string) { }
}
