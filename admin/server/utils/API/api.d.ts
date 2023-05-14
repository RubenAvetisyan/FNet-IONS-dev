export { };

declare global {
  interface HttpClient {
    post: (url: string, body: any, options?: any) => Promise<any>;
  }

  /**
   * @typedef {Object} UserGroupData
   * @property {number} unloadtosorm - Отправлять ли данные пользователя в СОРМ. 1 - да, 0 - нет.
   * @property {number} sormid - Идентификатор СОРМ (SORM ID).
   * @property {number} groupid - Идентификатор группы пользователей.
   * @property {number} promiseallow - Максимальное количество обещанных платежей, которое может быть создано пользователем.
   * @property {number} promiseallowmanager - Максимальное количество обещанных платежей, которое может быть создано менеджером.
   * @property {number} promiserent - Сумма аренды, заданная пользователем.
   * @property {number} promisetill - Крайний срок оплаты обещанного платежа (в секундах с 1970-01-01).
   * @property {number} promiseondays - Количество дней, на которые блокируется возможность внести обещанный платеж.
   * @property {number} promiseblockdays - Количество дней, на которые блокируется возможность внести обещанный платеж при превышении задолженности.
   * @property {number} promisemax - Максимальная сумма обещанного платежа.
   * @property {number} promisemin - Минимальная сумма обещанного платежа.
   * @property {number} promiselimit - Максимальный лимит обещанных платежей.
   * @property {string} name - Наименование группы пользователей.
   * @property {string} description - Описание группы пользователей.
   * @property {string} vendorsormname - Наименование СОРМ (SORM).
   * @property {number[]} roleids - Массив идентификаторов ролей, присвоенных группе пользователей.
   * @property {boolean} isInsert - Определяет, создается новая группа или изменяется существующая. true - создается новая группа, false - изменяется существующая.
   */
  interface UserGroupData {
    unloadtosorm: number;
    sormid: number;
    groupid: number;
    promiseallow: number;
    promiseallowmanager: number;
    promiserent: number;
    promisetill: number;
    promiseondays: number;
    promiseblockdays: number;
    promisemax: number;
    promisemin: number;
    promiselimit: number;
    name: string;
    description: string;
    vendorsormname: string;
    roleids: number[];
    isInsert: boolean;
  }

  /**
 * @typedef {Object} SoapAccount
 * @property {number} uid - Уникальный идентификатор аккаунта.
 * @property {number} [doctype] - Идентификатор типа документа.
 * @property {number} [ipaccess] - Доступ к аккаунту по IP-адресу. 1 - разрешен, 0 - запрещен.
 * @property {number} [billdelivery] - Способ доставки счета. 0 - почтой, 1 - электронной почтой.
 * @property {number} [category] - Идентификатор категории аккаунта.
 * @property {number} type - Идентификатор типа аккаунта.
 * @property {number} [oksm] - Код страны по ОКСМ.
 * @property {number} [templ] - Идентификатор шаблона аккаунта.
 * @property {number} [wrongactive] - Статус аккаунта с ошибками. 1 - активен с ошибками, 0 - активен без ошибок.
 * @property {number} [archive] - Статус архивации аккаунта. 1 - в архиве, 0 - не в архиве.
 * @property {number} [ownership] - Идентификатор формы собственности аккаунта.
 * @property {boolean} [mobileisconfirmed] - Подтверждение мобильного телефона. true - подтверждено, false - не подтверждено.
 * @property {boolean} [emailisconfirmed] - Подтверждение электронной почты. true - подтверждено, false - не подтверждено.
 * @property {boolean} [offerisaccepted] - Принятие оферты. true - оферта принята, false - оферта не принята.
 * @property {boolean} [soleproprietor] - Является ли аккаунт индивидуальным предпринимателем. true - является, false - не является.
 * @property {string} login - Логин аккаунта.
 * @property {string} [pass] - Пароль аккаунта.
 * @property {string} [descr] - Описание аккаунта.
 * @property {string} [name] - Наименование аккаунта.
 * @property {string} [phone] - Телефон аккаунта.
 * @property {string} [fax] - Факс аккаунта.
 * @property {string} [email] - Электронная почта аккаунта.
 * @property {string} [mobile] - Мобильный телефон аккаунта.
 * @property {string} [bankname] - Наименование банка аккаунта.
 * @property {string} [branchbankname] - Наименование филиала банка аккаунта.
 * @property {string} [treasuryname] - Наименование казначейства аккаунта.
 * @property {string} [treasuryaccount] - Расчетный счет казначейства аккаунта.
 * @property {string} [bik] - БИК банка аккаунта.
 * @property {string} [settl] - Корреспондентский счет банка аккаунта.
 * @property {string} [corr] - Корреспондентский счет казначейства аккаунта.
 * @property {string} [kpp] - КПП аккаунта.
 * @property {string} [inn] - ИНН аккаунта.
 * @property {string} [ogrn] - ОГРН аккаунта.
 * @property {string} [okpo] - ОКПО аккаунта.
 * @property {string} [okved] - ОКВЭД аккаунта.
 * @property {string} [gendiru] - Руководитель аккаунта.
 * @property {string} [glbuhgu] - Главный бухгалтер аккаунта.
 * @property {string} [kontperson] - Контактное лицо аккаунта.
 * @property {string} [actonwhat] - Действует на основании аккаунта.
 * @property {string} [passsernum] - Серия и номер паспорта аккаунта.
 * @property {string} [passno] - Номер паспорта аккаунта.
 * @property {string} [passissuedate] - Дата выдачи паспорта аккаунта.
 * @property {string} [passissuedep] - Орган, выдавший паспорт аккаунта.
 * @property {string} [passissueplace] - Место выдачи паспорта аккаунта.
 * @property {string} [birthdate] - Дата рождения аккаунта.
 * @property {string} [birthplace] - Место рождения аккаунта.
 * @property {string} [lastmoddate] - Дата последнего изменения аккаунта.
 * @property {string} [wrongdate] - Дата ошибочного аккаунта.
 * @property {string} [okato] - ОКАТО аккаунта.
 * @property {string} [uuid] - Уникальный идентификатор аккаунта.
 * @property {string} [abonentname] - Имя абонента аккаунта.
 * @property {string} [abonentsurname] - Фамилия абонента аккаунта.
 * @property {string} [abonentpatronymic] - Отчество абонента аккаунта.
 * @property {number} [managerid] - Идентификатор менеджера аккаунта
 * @property {string} [managername] - Имя менеджера аккаунта.
 * @property {string} [managerlogin] - Логин менеджера аккаунта.
 * @property {string} [swift] - SWIFT-код банка аккаунта.
 * @property {string} [kio] - КИО аккаунта.
 * @property {string} [bicbei] - BIC/BEI аккаунта.
 * @property {string} [iban] - IBAN аккаунта.
 * @property {string} [bankcorr] - Корреспондентский счет банка аккаунта.
 * @property {string} [bankcorrcode] - Корреспондентский код банка аккаунта.
 * @property {string} [bankcorraccount] - Расчетный счет корреспондента банка аккаунта.
 * @property {string} [currency] - Валюта аккаунта.
 * @property {number} [resident] - Резидентность аккаунта. 1 - резидент, 0 - нерезидент.
 */
  type SoapAccount = {
    uid: number;
    doctype?: number;
    ipaccess?: number;
    billdelivery?: number;
    category?: number;
    type: number;
    oksm?: number;
    templ?: number;
    wrongactive?: number;
    archive?: number;
    ownership?: number;
    mobileisconfirmed?: boolean;
    emailisconfirmed?: boolean;
    offerisaccepted?: boolean;
    soleproprietor?: boolean;
    login: string;
    pass?: string;
    descr?: string;
    name?: string;
    phone?: string;
    fax?: string;
    email?: string;
    mobile?: string;
    bankname?: string;
    branchbankname?: string;
    treasuryname?: string;
    treasuryaccount?: string;
    bik?: string;
    settl?: string;
    corr?: string;
    kpp?: string;
    inn?: string;
    ogrn?: string;
    okpo?: string;
    okved?: string;
    gendiru?: string;
    glbuhgu?: string;
    kontperson?: string;
    actonwhat?: string;
    passsernum?: string;
    passno?: string;
    passissuedate?: string;
    passissuedep?: string;
    passissueplace?: string;
    birthdate?: string;
    birthplace?: string;
    lastmoddate?: string;
    wrongdate?: string;
    okato?: string;
    uuid?: string;
    abonentname?: string;
    abonentsurname?: string;
    abonentpatronymic?: string;
    managerid?: number;
    managername?: string;
    managerlogin?: string;
    swift?: string;
    kio?: string;
    bicbei?: string;
    iban?: string;
    bankcorr?: string;
    bankcorrcode?: string;
    bankcorraccount?: string;
    currency?: string;
    resident?: number;
  }

  /**
 * @typedef {Object} SoapFilter
 * @property {string} name - Наименование поля фильтрации.
 * @property {string} [cond] - Условие фильтрации. Допустимые значения: 'eq' (равно), 'neq' (не равно), 'like' (содержит), 'notlike' (не содержит), 'gt' (больше), 'lt' (меньше), 'geq' (больше или равно), 'leq' (меньше или равно), 'in' (в списке), 'notin' (не в списке), 'isnull' (пустое значение), 'isnotnull' (не пустое значение).
 * @property {string} [value] - Значение фильтра.
 * @property {string} [field] - Поле, по которому применяется фильтрация.
 * @property {string} [rangecond] - Условие фильтрации для диапазона. Допустимые значения: 'between' (между), 'from' (от), 'to' (до).
 * @property {string} [rangevalue] - Значение фильтра для диапазона.
 * @property {boolean} [exactmatch] - Строгое соответствие значения фильтрации.
 * @property {boolean} [trim] - Удаление пробелов в значении фильтрации.
 * @property {boolean} [isnull] - Флаг, указывающий на пустое значение фильтрации.
 * @property {string} [from] - Значение фильтра для диапазона (от).
 * @property {string} [to] - Значение фильтра для диапазона (до).
 * @property {string} [prefix] - Префикс фильтрации.
 * @property {boolean} [not] - Флаг, указывающий на инверсию фильтрации.
 * @property {string} [between] - Значение фильтра для диапазона (между).
 * @property {boolean} [usedefault] - Флаг, указывающий на использование значения по умолчанию для фильтрации.
 * @property {number} [rowsperpage] - Количество записей на странице.
 * @property {number} [pagenum] - Номер страницы.
 * @property {string} [sortfield] - Поле сортировки.
 * @property {string} [sortorder] - Порядок сортировки.
 * @property {string} [notequal] - Значение фильтра для операции "не равно".
 * @property {boolean} [timestamp] - Флаг, указывающий на использование метки времени для фильтрации.
 * @property {boolean} [autotrim] - Флаг, указывающий на автоматическое удаление пробелов в значении фильтрации.
 * @property {string} [custom] - Пользовательское условие фильтрации.
 * @property {string} [condition] - Дополнительное условие фильтрации.
 * @property {boolean} [ignorecase] - Флаг, указывающий на игнорирование регистра при фильтрации.
 * @property {boolean} [ignorews] - Флаг, указывающий на игнорирование пробелов при фильтрации.
 * @property {string} [op] - Оператор фильтрации.
 * @property {string[]} [values] - Массив значений фильтрации.
 * @property {boolean} [dynamic] - Флаг, указывающий на динамическую фильтрацию.
 * @property {string} [table] - Таблица, на которую применяется фильтрация.
 * @property {string} [targetfield] - Целевое поле для фильтрации.
 * @property {boolean} [caseinsensitivesearch] - Флаг, указывающий на поиск без учета регистра.
 * @property {boolean} [usealternatedb] - Флаг, указывающий на использование альтернативной базы данных для фильтрации.
 * @property {boolean} [loadtofilter] - Флаг, указывающий на загрузку данных для фильтрации.
 * @property {boolean} [allowinlist] - Флаг, указывающий на разрешение использования фильтрации в списке.
 * @property {string} [filterlabel] - Метка фильтрации.
 * @property {string} [filtervaluetype] - Тип значения фильтрации.
 * @property {boolean} [translate] - Флаг, указывающий на перевод значения фильтрации.
 * @property {boolean} [fixedvalue] - Флаг, указывающий на использование фиксированного значения фильтрации.
 * @property {string} [linktype] - Тип связи для фильтрации.
 * @property {boolean} [hierarchic] - Флаг, указывающий на иерархическую фильтрацию.
 * @property {boolean} [useonlylinked] - Флаг, указывающий на использование только связанных записей при фильтрации.
 * @property {boolean} [fulltext] - Флаг, указывающий на полнотекстовый поиск.
 * @property {boolean} [orderindex] - Флаг, указывающий на сортировку по индексу.
 * @property {boolean} [rowcount] - Флаг, указывающий на получение количества строк в результирующем наборе.
 * @property {boolean} [multilist] - Флаг, указывающий на использование множественного списка для фильтрации.
 * @property {string} [filtertype] - Тип фильтрации.
 * @property {boolean} [emptytoall] - Флаг, указывающий на применение фильтрации "Пусто - Все".
 * @property {boolean} [ignoremetadata] - Флаг, указывающий на игнорирование метаданных при фильтрации.
 * @property {boolean} [allowempty] - Флаг, указывающий на разрешение пустых значений фильтрации.
 * @property {boolean} [distinct] - Флаг, указывающий на получение уникальных значений при фильтрации.
 * @property {boolean} [reverselogic] - Флаг, указывающий на инверсию логики фильтрации.
 * @property {boolean} [noimplicitsearch] - Флаг, указывающий на отключение неявного поиска при фильтрации.
 * @property {boolean} [dynamicdepend] - Флаг, указывающий на динамическую зависимость фильтрации.
 * @property {string} [dependsonfield] - Поле, от которого зависит фильтрация.
 * @property {boolean} [dependhide] - Флаг, указывающий на скрытие фильтрации при зависимости.
 * @property {boolean} [dependdisable] - Флаг, указывающий на отключение фильтрации при зависимости.
 * @property {boolean} [predefined] - Флаг, указывающий на использование предопределенных значений фильтрации.
 * @property {string[]} [predefinedvalues] - Массив предопределенных значений фильтрации.
 * @property {boolean} [hide] - Флаг, указывающий на скрытие фильтра.
 * @property {boolean} [disable] - Флаг, указывающий на отключение фильтра.
 * @property {boolean} [showaslabel] - Флаг, указывающий на отображение фильтра как метку.
 * @property {string} [conditionalshow] - Условное отображение фильтра.
 * @property {string} [conditionalhide] - Условное скрытие фильтра.
 * @property {boolean} [hidevalue] - Флаг, указывающий на скрытие значения фильтрации.
 * @property {boolean} [unavailable] - Флаг, указывающий на недоступность фильтра.
 * @property {boolean} [validate] - Флаг, указывающий на валидацию фильтра.
 * @property {string} [validationmessage] - Сообщение об ошибке при валидации фильтра.
 * @property {boolean} [round] - Флаг, указывающий на округление значений фильтрации.
 * @property {boolean} [hasoptions] - Флаг, указывающий на наличие опций для фильтрации.
 * @property {string} [fieldtype] - Тип поля фильтрации.
 * @property {string} [optionid] - Идентификатор опции фильтрации.
 * @property {string} [optionvalue] - Значение опции фильтрации.
 * @property {string} [optiontype] - Тип опции фильтрации.
 * @property {boolean} [notshowempty] - Флаг, указывающий на неотображение пустых значений.
 * @property {boolean} [filterbyoptions] - Флаг, указывающий на фильтрацию по опциям.
 * @property {string} [param] - Параметр фильтрации.
 * @property {boolean} [normalize] - Флаг, указывающий на нормализацию значений фильтрации.
 * @property {string} [normalizedtype] - Тип нормализации значений фильтрации.
 * @property {string} [normalizedvalue] - Значение нормализации фильтрации.
 * @property {string} [normalizedfield] - Поле нормализации фильтрации.
 * @property {string} [oper] - Операция фильтрации.
 * @property {boolean} [utf] - Флаг, указывающий на использование UTF-кодировки.
 * @property {boolean} [ignore] - Флаг, указывающий на игнорирование фильтрации.
 * @property {string} [charfilter] - Фильтр символов фильтрации.
 * @property {boolean} [onlyone] - Флаг, указывающий на использование только одного значения фильтрации.
 * @property {boolean} [allowinterval] - Флаг, указывающий на разрешение интервальной фильтрации.
 * @property {string} [interval] - Интервал фильтрации.
 * @property {boolean} [multifilter] - Флаг, указывающий на использование множественной фильтрации.
 * @property {string} [multicond] - Условие множественной фильтрации.
 * @property {SoapFilter[]} [multifilters] - Массив вложенных фильтров.
 */
  type SoapFilter = {
    name: string;
    cond?: 'eq' | 'neq' | 'like' | 'notlike' | 'gt' | 'lt' | 'geq' | 'leq' | 'in' | 'notin' | 'isnull' | 'isnotnull';
    value?: string;
    field?: string;
    rangecond?: 'between' | 'from' | 'to';
    rangevalue?: string;
    exactmatch?: boolean;
    trim?: boolean;
    isnull?: boolean;
    from?: string;
    to?: string;
    prefix?: string;
    not?: boolean;
    between?: string;
    usedefault?: boolean;
    rowsperpage?: number;
    pagenum?: number;
    sortfield?: string;
    sortorder?: string;
    notequal?: string;
    timestamp?: boolean;
    autotrim?: boolean;
    custom?: string;
    condition?: string;
    ignorecase?: boolean;
    ignorews?: boolean;
    op?: string;
    values?: string[];
    dynamic?: boolean;
    table?: string;
    targetfield?: string;
    caseinsensitivesearch?: boolean;
    usealternatedb?: boolean;
    loadtofilter?: boolean;
    allowinlist?: boolean;
    filterlabel?: string;
    filtervaluetype?: string;
    translate?: boolean;
    fixedvalue?: boolean;
    linktype?: string;
    hierarchic?: boolean;
    useonlylinked?: boolean;
    fulltext?: boolean;
    orderindex?: boolean;
    rowcount?: boolean;
    multilist?: boolean;
    filtertype?: string;
    emptytoall?: boolean;
    ignoremetadata?: boolean;
    allowempty?: boolean;
    distinct?: boolean;
    reverselogic?: boolean;
    noimplicitsearch?: boolean;
    dynamicdepend?: boolean;
    dependsonfield?: string;
    dependhide?: boolean;
    dependdisable?: boolean;
    predefined?: boolean;
    predefinedvalues?: string[];
    hide?: boolean;
    disable?: boolean;
    showaslabel?: boolean;
    conditionalshow?: string;
    conditionalhide?: string;
    hidevalue?: boolean;
    unavailable?: boolean;
    validate?: boolean;
    validationmessage?: string;
    round?: boolean;
    hasoptions?: boolean;
    fieldtype?: string;
    optionid?: string;
    optionvalue?: string;
    optiontype?: string;
    notshowempty?: boolean;
    filterbyoptions?: boolean;
    param?: string;
    normalize?: boolean;
    normalizedtype?: string;
    normalizedvalue?: string;
    normalizedfield?: string;
    oper?: string;
    utf?: boolean;
    ignore?: boolean;
    charfilter?: string;
    onlyone?: boolean;
    allowinterval?: boolean;
    interval?: string;
    multifilter?: boolean;
    multicond?: string;
    multifilters?: SoapFilter[];
  };

  /**
   * @typedef {Object} SoapOrderBy
   * @property {string} name - Наименование поля сортировки.
   * @property {string} [sort] - Порядок сортировки. Допустимые значения: 'asc' (по возрастанию), 'desc' (по убыванию).
   */
  type SoapOrderBy = {
    name: string;
    sort?: 'asc' | 'desc';
  };

}
