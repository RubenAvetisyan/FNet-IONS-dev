import { $enum } from 'ts-enum-util';
import format from "date-fns/format"
import { admins, deafultRuels } from "./system/rules";

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
  rules: RouteRule<P, T>['rules']
}

class Route {
  private _routes: Map<string, RouteValue<string, AccessTypes>>
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
              userIds: admins,
            }
          }
        }).rules

      })
    })
    console.log(this._routes.entries())
  }

  setRoute(key: string, value: any) {
    this._routes.set(key, value)
  }

  get routes() {
    return this._routes
  }

  get routesEntries() {
    return this._routes.entries()
  }

  getRoute(key: string) {
    return this._routes.get(key)
  }
}

interface SingleLink<Path extends string> {
  text: string;
  path: string;
  rules?: RouteRule<Path, AccessTypes>['rules'];
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
    text: 'AIM_PON',
    path: '/user/statements/Special/pon',
    rules: new RouteRule({
      '/user/statements/Special/pon': {
        access: {
          groupIds: [],
          userIds: [...admins, '47', '76', '122', '126', '131', '143', '144', '180']
        }
      }
    }).rules
  },
  {
    text: 'վճարման ենթակա միացումների ցուցակ',
    path: '/user/statements/mustPay',
    rules: new RouteRule({
      '/user/statements/mustPay': {
        access: {
          groupIds: [],
          userIds: [...admins, ...Object.keys(deafultRuels)]
        }
      }
    }).rules
  },
  {
    text: 'Միացումների ցուցակ ըստ հասցեների և ամսաթվերի',
    path: '/user/statements/connectionsMadeByEmployees',
    rules: new RouteRule({
      '/user/statements/connectionsMadeByEmployees': {
        access: {
          groupIds: [],
          userIds: [...admins, '224']
        }
      }
    }).rules,
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
    path: '/user/statements/original/passivecustomers',
    rules: new RouteRule({
      '/user/statements/original/passivecustomers': {
        access: {
          groupIds: [],
          userIds: admins
        }
      }
    }).rules
  },
  {
    text: format(Date.now(), 'MM.yyyy') + ' միացված բաժանորդներ',
    path: '/user/statements/newConnections',
    rules: new RouteRule({
      '/user/statements/newConnections': {
        access: {
          groupIds: [],
          userIds: [...admins, '224']
        }
      }
    }).rules,
    permissuions: []
  },
  {
    text: 'B2B Հավաքագրված գումարներ ըստ սակագնի',
    path: '/user/statements/B2B/payments',
    rules: new RouteRule({
      '/user/statements/B2B/payments': {
        access: {
          groupIds: [],
          userIds: [...admins, '145']
        }
      }
    }).rules,
    permissuions: []
  },
  {
    text: 'Հաճախորդներ',
    path: '/user/statements/totalClients',
    rules: new RouteRule({
      '/user/statements/totalClients': {
        access: {
          groupIds: [],
          userIds: [...admins, ...Object.keys(deafultRuels)]
        }
      }
    }).rules,
    permissuions: []
  },
]

export class Link {
  links: SingleLink<string>[]
  routes: Route
  // routes: Route
  constructor(public route?: any, uid?: string) {
    console.log('userInfo.value?.uid: ', uid);
    this.links = []
    defaultLinks.forEach(defaultLink => {
      if (uid && defaultLink.rules && defaultLink.rules[defaultLink.path].access.userIds.includes(uid))
        this.links.push(defaultLink)
    })
    this.routes = new Route()
    console.log('this.routes: ', this.routes);
  }

  setPath = (str: string) => `${this.route.path}/${str}`
  getWithRestricted(uid: string) {
    const result: RouteValue<string, AccessTypes>[] = []
    this.routes.routes.forEach(v => {
      if (v.rules[v.path].access.userIds.includes(uid))
        result.push(v)
    })

    return result
  }

  setBaseUrl(baseUrl: string) { }
}
