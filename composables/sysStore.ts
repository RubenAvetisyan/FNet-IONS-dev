import { acceptHMRUpdate, defineStore } from 'pinia'
import { Ref } from 'vue'

type LinksKeys = string[]
type LinksValue = {
  href: string;
  link: string;
  isMenuitem: boolean;
  exact: boolean;
  external: boolean;
  name: string;
  icon: string;
  isMini: boolean;
  btn: string[]
}
type Links = Ref<Map<string, LinksValue>>

type LinkItemBtnsValue = {
  parentKey: string;
  isVisible: boolean;
}
type LinkItemBtns = Ref<Map<string, LinkItemBtnsValue>>

interface StateParams {
  linksKeys: LinksKeys;
  links: Links;
  linkItemBtns: LinkItemBtns
}

export const useSysStore = defineStore('sysStore', {
  state: (): StateParams => ({
    linksKeys: [],
    links: ref(new Map<string, LinksValue>()),
    linkItemBtns: ref(new Map<string, LinkItemBtnsValue>())
  }),

  getters: {
    getLinks: (state): (key: string) => LinksValue | undefined => {
      return (key: string) => state.links.get(key)
    },
    getListItemBtnVisiblity() {
      return (storeKey: string) => {
        // console.log('storeKey: ', storeKey);

        // console.log('entries: ', [...this.linkItemBtns.values()].find(({ parentKey }) => parentKey.includes(storeKey)))
        return  //.find((_, v) => v.parentKey === storeKey)
      }
    }
  },

  actions: {
    onInit() {
      const inistial = {
        href: '',
        link: '',
        isMenuitem: false,
        exact: false,
        external: false,
        name: '',
        icon: '',
        isMini: false,
        btn: []
      }

      const key = setKey()

      this.linksKeys.push(key)

      this.links.set(key, inistial)

      return key
    },
    setListItemBtn(parentKey: string) {
      if (!this.links.has(parentKey)) return createError('parentKey is invalid')

      const key = setKey()
      this.linkItemBtns.set(key, {
        parentKey,
        isVisible: false
      })

      this.links.get(parentKey)?.btn.push(key)

      return key
    },
    toggleVisiblity(key: string, parentKey?: string) {
      // const links = parentKey ? this.links.get(parentKey) : null
      const btn = this.linkItemBtns.get(key)
      if (!btn) return

      return btn.isVisible = !btn.isVisible
    },
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useSysStore, import.meta.hot))

function setKey(list?: string | number | (string | number)[]): string {
  if (list === undefined) {
    list = 'abcdefghijklmnopqrstuvwxyz1234567890'.split('')
  } else if (typeof list === 'number' || typeof list === 'string') {
    list = ('' + list).split('')
  }

  return list.map((_, i, arr) => arr[Math.floor(Math.random() * arr.length)]).join('')
}