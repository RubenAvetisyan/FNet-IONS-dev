import format from "date-fns/format"
import { admins } from "./system/rules";

type AccessRules = (string | number);
type GroupID = AccessRules[];
type UserID = AccessRules[];

enum AccessTypes {
  GroupIDs = 'groupIds',
  UserIDs = 'userIds'
}

type Access<T extends AccessTypes> = {
  [key in T]: GroupID | UserID;
};

type RouteRules<P extends string, T extends AccessTypes> = {
  [path in P]: {
    access: Access<T>;
    block?: {
      redirectPath: string;
    };
  };
};

class RouteRule<P extends string, T extends AccessTypes>{
  rules
  constructor(rule: RouteRules<P, T>) {
    this.rules = rule
  }
}

type RouteValue<P extends string, T extends AccessTypes> = {
  path: T;
  rules: RouteRule<P, T>
}

class Route {
  _routes: Map<string, RouteValue<string>>
  constructor() {
    this._routes = new Map()
    const routes = useRouter().getRoutes()
    routes.forEach(route => {
      const name = route?.name?.toString()
      const path = route.path.toString().replace('/', '')
      this._routes.set(name || path, {
        path,
        rules: new RouteRule({
          [path]: {
            access: {
              groupIds: [],
              userIds: [],
            }
          }
        })

      })
    })
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

interface SingleLink<Path extends string> {
  text: string;
  path: string;
  rules?: RouteRule<Path, AccessTypes>;
  query?: { query: {} };
  components?: Component[];
  permissuions?: string[];
}

interface Component {
  name: string;
  type: string;
  props: {
    [key: string]: any;
  };
}

const defaultLinks: SingleLink<string>[] = [
  {
    text: 'վճարման ենթակա միացումների ցուցակ',
    path: '/user/statements/mustPay',
    query: {
      query: {},
    },
    rules: new RouteRule({
      '/user/statements/mustPay': {
        access: {
          groupIds: [],
          userIds: admins
        }
      }
    })
  },
  {
    text: 'Միացումների ցուցակ ըստ հասցեների և ամսաթվերի',
    path: '/user/statements/connectionsMadeByEmployees',
    components: [{
      name: 'FInput',
      type: 'input',
      props: {
        label: 'myInput',
        vModel: '',
        id: 'myInput',
      },
    }],
  },
  {
    text: 'Պասիվ Հաճախորդներ',
    path: '/user/statements/original/passivecustomers'
  },
  {
    text: 'Հաճախորդներ',
    path: '/user/statements/totalClients',
    permissuions: []
  },
]

export class Link {
  links: SingleLink<string>[]
  routes: Route
  // routes: Route
  constructor(public route?: any) {
    this.links = defaultLinks
    //     .map(defaultLink => {
    //     defaultLink.path = route.path ? this.setPath(defaultLink.path) : defaultLink.path
    //     return defaultLink
    // })
    this.routes = new Route()
    // console.log('this.routes: ', this.routes);
  }

  setPath = (str: string) => `${this.route.path}/${str}`

  setBaseUrl(baseUrl: string) { }
}
