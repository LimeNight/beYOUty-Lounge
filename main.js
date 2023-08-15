/**
 * GLOBAL VARIABLES
 * -contentManager
*/
let contentManager, main, expanderBtn, expandedMenu;
/**
 * PAGE LOADED
 * -initialize
*/
const init = () => {
  main = document.getElementById('MainSection')
  expanderBtn = document.querySelector('.navbar-toggler')
  expandedMenu = document.getElementById('navbarNav')

  main.addEventListener('click', () => {
    let isExpanded = expanderBtn.getAttribute('aria-expanded'); 
    if (isExpanded === 'true') {
      expanderBtn.setAttribute('aria-expanded', false);
      expanderBtn.classList = 'navbar-toggler collapsed'
      expandedMenu.classList.toggle('show')
    }
  })
  // Add datas to controller
  ServiceController.add(_data)
  // Init contatent manager
  contentManager = new ContentManager('serviceContent')
  contentManager.init()

  let serviceInfos = ServiceController.getAll()
  ContactManager.draw(serviceInfos)

}

const titleText = 'beYOUty Lounge Szépségszalon'
const titleDelay = 200; // Delay between each character change (in milliseconds)

let currentIndex = 0;
let intervalId;

const animateTitle = () => {
    if (!isPageVisible()) {
        clearInterval(intervalId)
        return
    }

    document.title = titleText.substring(0, currentIndex);
    currentIndex = (currentIndex + 1) % (titleText.length + 1)
    if (currentIndex === 0) {
        clearInterval(intervalId);
        setTimeout(() => {
            intervalId = setInterval(animateTitle, titleDelay)
        }, 2000)
    }
}
document.addEventListener("visibilitychange", () => {
    if (isPageVisible()) {
        intervalId = setInterval(animateTitle, titleDelay);
    } else {
        clearInterval(intervalId);
    }
});

const isPageVisible = () => {
    return !document.hidden
}
intervalId = setInterval(animateTitle, titleDelay);

class LStorage {
  static set(key = '', data = ''){
    window.localStorage.setItem(key, data)
  }

  static get(key = ''){
    return +window.localStorage.getItem(key)
  }

  static clear(){
    window.localStorage.clear()
  }
}
/**
 * GET SERVICE
*/
const getService = (id = 1) => {
  contentManager.update(id)
}
/**
 * CREATE CONTENT
 */
class ContentCreator {
  #extraContent = (extra = new Extras()) => {
    let {title, price} = extra

    if (title && price) {
      let titleP = document.createElement('p')
      let priceP = document.createElement('p')
      titleP.innerHTML = `${title}`
      priceP.innerHTML = `${price} Ft.-`
      return {titleP, priceP}
    }
    else if(title) {
      let titleP = document.createElement('p')
      titleP.innerHTML = `${title}`
      return {titleP}
    }
    else {
      let priceP = document.createElement('p')
      priceP.innerHTML = `${price} Ft.-`
      return {priceP} 
    }
  }

  #createExtraListItem = (extra = new Extras()) =>{
    let {titleP, priceP} = this.#extraContent(extra)
    if (titleP || priceP) {
      let li = document.createElement('li')
      li.classList = 'services__content-body__list-item__extras-item'
      if (titleP) li.appendChild(titleP)
      if (priceP) li.appendChild(priceP)
      return li
    }

    return null
  }
  #createListItem = (service = new Services()) =>{
    const {title, price, discription, extras} = service

    let extrasHTML = document.createElement('ul')
    let li = document.createElement('li')
    let h4 = document.createElement('h4')
    let p1 = document.createElement('p')
    let p2 = document.createElement('p')

    extrasHTML.classList = 'services__content-body__list-item__extras'
    li.classList = 'services__content-body__list-item'
    h4.classList = 'services__content-body__list-item-title'
    p1.classList = 'services__content-body__list-item-price'
    p2.classList = 'services__content-body__list-item-discription'
  
    h4.textContent = title
    p1.textContent = price != null ? `${price} Ft.-` : ''
    p2.textContent = discription
    if (title) li.appendChild(h4)
    if (price) li.appendChild(p1)
    if (discription) li.appendChild(p2)
    if (extras.length > 0) {
      extras.map((extra) => extrasHTML.appendChild(this.#createExtraListItem(extra)))
      li.appendChild(extrasHTML)
    }
    return li
  }
  createList = (serviceArr = [new Services()]) => {
    let ul = document.createElement('ul')
    ul.classList = 'services__content-body__list'
    serviceArr.map((service) => ul.appendChild(this.#createListItem(service)))
    return ul
  }
}
/**
 * CREATE SELECT MENU
 */
class SelectMenuCreator {
  #createTitle = (text = '') => {
    const h3 = document.createElement('h3')
    h3.classList = 'services__content-header-title'
    h3.innerText = text
    return h3
  }
  createSelectMenu = (serviceInfo = new ServiceInfo()) => {
    if (serviceInfo) {
      let {industryName, name, phone, serviceTypes } = serviceInfo
      let title = this.#createTitle(industryName)
  
      if (serviceTypes.length > 1){
        const selectElement = document.createElement("select")
        selectElement.classList = 'services__content-header__select'
        selectElement.setAttribute("name", "services")
  
        serviceTypes.forEach((serviceTypes) => {
          const optionElement = document.createElement("option")
          optionElement.classList = 'services__content-header__select-option'
          optionElement.setAttribute("value", serviceTypes?.id)
          optionElement.textContent = serviceTypes?.title
          selectElement.appendChild(optionElement)
        })
  
        selectElement.onchange = (el) => {
          let serviceID = +el.target.value
          contentManager.updateContent(serviceID)
        }
        return [title, selectElement]
      }
      return [title]
    }
    return [null]
  }
}
/**
 * INSTANTIATION CLASSES
 * -ContentCreator
 * -SelectMenuCreator
 */
class Creator {
  contentCreator = new ContentCreator()
  selectMenuCreator = new SelectMenuCreator()
}

class ContentManager extends Creator {
  localStore = LStorage.get('localServ')
  #initialServiceID = 1
  headerContainer  = document.createElement('div')
  bodyContainer = document.createElement('div')

  constructor(elementId){
    super()
    this.#initialServiceID = ServiceController.isExist(this.localStore) ? this.localStore : this.#initialServiceID
    this.container = document.getElementById(elementId)
    this.initialServiceInfo = ServiceController.getServiceInfoById(this.#initialServiceID)
    this.headerContainer.classList = 'services__content-header'
    this.bodyContainer.classList = 'services__content-body'
  }

  init = () => {
    LStorage.set('localServ', this.#initialServiceID)
    let [title,selectMenu] = this.selectMenuCreator.createSelectMenu(this.initialServiceInfo)
    let content = this.contentCreator.createList(this.initialServiceInfo.serviceTypes[0].services)

    this.headerContainer.appendChild(title)
    if (selectMenu){
      this.headerContainer.appendChild(selectMenu)
    }
    this.bodyContainer.appendChild(content)

    this.container.appendChild(this.headerContainer )
    this.container.appendChild(this.bodyContainer)

  }
  update = (serviceInfoID = 0) => {
    LStorage.set('localServ', serviceInfoID)
    this.#clear()
    let service = ServiceController.getServiceInfoById(serviceInfoID)
    if (service) {
      let [title, selectMenu] = this.selectMenuCreator.createSelectMenu(service)
      let content = this.contentCreator.createList(service.serviceTypes[0].services)
  
      this.headerContainer.appendChild(title)
      if (selectMenu) {
        this.headerContainer.appendChild(selectMenu)
      }
      this.bodyContainer.appendChild(content)
  
      this.container.appendChild(this.headerContainer )
      this.container.appendChild(this.bodyContainer)
    }
  }
  updateContent = (serviceTypesID = 0) => {
    this.bodyContainer.innerHTML = ""
    let service = ServiceController.getServiceTypesById(serviceTypesID)

    if (service !== null) {
      let content = this.contentCreator.createList(service.services)
      this.bodyContainer.appendChild(content)
    }
  }
  #clear = () => {
    this.headerContainer .innerHTML = ''
    this.bodyContainer.innerHTML = ''
  }
}
/**
 * DATA STRUCT
*/
class Extras {
  constructor(
    id, 
    title, 
    price
  ) {
    this.id = id;
    this.title = title;
    this.price = price;
  }
}
class Services extends Extras {
  constructor(
    id,
    title,
    price,
    discription,
    extras
  ) {
    super(id, title, price)
    this.discription = discription
    this.extras = extras.length > 0 ? extras.map(extra => new Extras(extra.id, extra.title, extra.price)) : []
  }
}
class ServiceTypes {
  constructor(
    id,
    title,
    discription,
    services
  ) {
    this.id = id;
    this.title = title;
    this.discription = discription;
    this.services = services.length > 0 ? services?.map(service => new Services(service.id, service.title, service.price, service.discription, service.extras)) : []
  }
}
class ServiceInfo {
  constructor(
    id,
    industryName,
    name,
    phone,
    social,
    serviceTypes
  ){
    this.id = id
    this.industryName = industryName
    this.name = name
    this.phone = phone
    this.social = social
    this.serviceTypes = serviceTypes.length > 0 ? serviceTypes?.map(service => new ServiceTypes(service.id, service.title, service.discription, service.services)) : []
  }
}
/**
 * SERVICE MANAGER STATIC CLASS
 * - add services
 * - getServiceInfoById
 * - getAll
*/
class ServiceController {
  static #collection = []
  static #actualService = {}

  //Add all service and store
  static add = (services = [new ServiceInfo()]) => {
    this.#collection = services.length > 0 ?  services?.map(service => new ServiceInfo(service.id, service.industryName, service.name, service.phone, service.social, service.serviceTypes)) : []
  }
  //Get ServiceInfo By ID
  static getServiceInfoById = (id = 0) => {
    return this.#actualService = this.#collection?.find(service => service.id === id) ?? null
  }
  //Get ServiceType By ID
  static getServiceTypesById = (id = 0) => {
    return this.#actualService.serviceTypes.find(service => service.id === id) ?? null
  }
  //Get the whole list of services
  static getAll = () => {
    return this.#collection ?? null
  }
  static isExist = (id = 0) => {
    return this.#collection.find(service => service.id === id) ? true : false
  }
}

class ContactManager {
  static draw(serviceInfo = [new ServiceInfo()]) {
    let size = serviceInfo.length

    if (size > 0) {
      let container = document.getElementById('contact')
      let row = document.createElement('div')
      row.classList = 'contact__row row'

      for (let i = 0; i < size; i++) {
        const {id, industryName, name, phone, social} = serviceInfo[i];
        let card = this.#createCard(id, industryName, name, phone, social)
        row.appendChild(card)
      }
      container.appendChild(row)
    }
  }

  static #createCard = (id, industryName, name, phone, social) => {
    let imgPath = 'img/' + id + '.jpg'
    let col = document.createElement('div')
    let card = document.createElement('div')
    let cardHeader = document.createElement('div')
    let cardBody = document.createElement('div')
    let cardTextName = document.createElement('p')
    let cardTextPhone = document.createElement('p')
    let cardTextPLink = document.createElement('a')
    let cardTextSocial = document.createElement('p')
    let cardTextSLink = document.createElement('a')

    col.classList = 'contact__row__col col-sm-6 col-lg-4'
    card.classList = 'contact__row__col-card card'
    cardHeader.classList = 'contact__row__col-card-header card-header'
    cardBody.classList = 'contact__row__col-card-body card-body'
    cardTextName.classList = 'contact__row__col-card-body__name card-text'
    cardTextPhone.classList = 'contact__row__col-card-body__phone card-text'
    cardTextSocial.classList = 'contact__row__col-card-body__social card-text'

    cardHeader.textContent = industryName
    cardTextName.textContent = name
    cardTextPLink.textContent = `tel: ${phone}`
    cardTextSLink.textContent = `${social[0].platform}`

    cardTextPLink.href = `tel:${phone}`
    cardTextSLink.href = social[0].link
    cardTextSLink.target = '_blank'

    card.style.background = `url('${imgPath}') no-repeat center`
    card.style.backgroundSize = 'cover'
    card.style.position = 'relative'

    cardTextPhone.appendChild(cardTextPLink)
    cardTextSocial.appendChild(cardTextSLink)
    cardBody.appendChild(cardTextName)
    cardBody.appendChild(cardTextPhone)
    cardBody.appendChild(cardTextSocial)

    card.setAttribute('data-id', id)
    card.appendChild(cardHeader)
    card.appendChild(cardBody)

    col.appendChild(card)
    return col
  }
}

/**
 * DATA
*/
let beautician = {
  /* SERVICEINFO*/
  id: 1,
  industryName: "Kozmetika",
  name: "Pálvölgyi Rita",
  phone: "+36 70/456-7890",
  social: [
    {
      id: 1,
      platform: 'facebook',
      link: 'https://www.facebook.com/profile.php?id=100057421302366'
    }
  ],
  /* SERVICE TYPE*/
  serviceTypes: [
    {
      id: 1,
      title: "Arckezelések",
      discription: null,
      /* SERVICES*/
      services: [
        {
          id: 1,
          title: "Tini kezelés (18 éves korig)",
          price: 6500,
          discription:
            "Letisztítás, peeling, gőzőlés, nyomkodás/pórusok kitisztítása, fertőtlenítés, összehúzó, nyugtató pakolás, befejező krém.",
          extras: [],
        },
        {
          id: 2,
          title: "Nagykezelés",
          price: 9000,
          discription:
            "Letisztítás, peeling, gőzőlés, nyomkodás/pórusok kitisztítása, fertőtlenítés, összehúzó, nyugtató pakolás, befejező krém.",
          extras: [
            /* EXTRAS */
            {
              id: 1,
              title: "UH/lontoforézis hatóanyag bevitel",
              price: 2000,
            },
            {
              id: 2,
              title: "15 perc arc, nyak és dekoltázsmasszázs",
              price: 2000,
            },
            {
              id: 3,
              title: "Aranymaszk",
              price: 2000,
            },
            {
              id: 4,
              title: "Peptides szemkörnyék feltöltő",
              price: 4500,
            },
          ],
        },
        {
          id: 3,
          title: "Intenzív tápláló mélyhidratáló kezelés",
          price: 7900,
          discription: null,
          extras: [],
        },
        {
          id: 4,
          title: "Arc, nyak és dekoltázsmasszázs",
          price: 4900,
          discription: null,
          extras: [],
        },
        {
          id: 5,
          title: "Kiskezelés",
          price: 7500,
          discription:
            "Letisztítás, peeling, masszázs, tápláló pakolás, befejező krém.",
          extras: [],
        },
        {
          id: 6,
          title: "Hidroabrázió",
          price: 2500,
          discription: null,
          extras: [],
        },
        {
          id: 7,
          title: "Microdermabrázió",
          price: 4500,
          discription: "Gyémántfejes bőr csiszolás.",
          extras: [],
        },
      ],
    },
    {
      id: 2,
      title: "Prémium anti-aging kezelések",
      discription: null,
      services: [
        {
          id: 1,
          title: "5 alga hatóanyagú, botox hatásó 5 csillagos, regeneráló & feltöltő Bioplasma kezelés",
          price: 11900,
          discription: null,
          extras: [],
        },
        {
          id: 2,
          title: "5 alga hatóanyagú, botox hatásó 5 csillagos, gyorsfeltöltő Bioplasma kezelés",
          price: 9900,
          discription: null,
          extras: [],
        },
        {
          id: 3,
          title: "Kozmetikai drónos fiatalító, Nutri-Peptide aktív hidratáló, tápláló, vitalizáló kezelés gazdag aranymaszkkal",
          price: 11900,
          discription: null,
          extras: [],
        },
        {
          id: 4,
          title: "Kozmetikai drónos fiatalító, Nutri-Peptide aktív hidratáló, vitalizáló, fehérítő kezelés gazdag aranymaszkkal",
          price: 11900,
          discription: null,
          extras: [],
        },
        {
          id: 5,
          title: "Kozmetikai drónos fiatalító, Nutri-Peptide aktív hidratáló, vitalizáló, faggyúműködést csökkentő kezelés tisztító agyagmaszkkal és gazdag aranymaszkkal",
          price: 12500,
          discription: null,
          extras: [],
        },
        {
          id: 6,
          title: "G4 Feltöltő, ragyogást fokozó, ránctalanító luxus kezelés",
          price: 13900,
          discription: null,
          extras: [
            {
              id: 1,
              title: "Extra rádiófrekvenciás kezelés",
              price: 3500
            }
          ],
        },
        {
          id: 7,
          title: "C vitaminos tápláló kezelés",
          price: 9900,
          discription: null,
          extras: [],
        },
        {
          id: 8,
          title: "Carboxy terápia",
          price: 10900,
          discription: null,
          extras: [],
        },
        {
          id: 9,
          title: "Hiarulonsavas (orvosi tisztaságú) gyorsfeltöltő kezelés",
          price: 10900,
          discription: null,
          extras: [],
        },
        {
          id: 10,
          title: "AHA savas, C vitaminos hámlasztó kezelés",
          price: 9900,
          discription: "(5 alkalmas bérlet vásárlása esetén a 6. alkalom ingyenes)",
          extras: [
            {
              id: 1,
              title: "Hámlasztó kezelés (ősztől tavaszig végezhető)",
              price: null
            }
          ],
        },
      ]
    },
    {
      id: 3,
      title: "Orvosi kozmetikai fiatalító kezelések",
      discription: "Termikus Ionizáció (Orvosi szike helyett, lógó felesleges bőr eltávolítására)",
      services: [
        {
          id: 1,
          title: "Szemhéj emelés első alkalom (mindkét szem)",
          price: 45000,
          discription: 'Homlok kezeléssel együtt',
          extras: [],
        },
        {
          id: 2,
          title: "Szemhéj emelés korrekció (mindkét szem)",
          price: 20000,
          discription: null,
          extras: [],
        },
        {
          id: 3,
          title: "Toka emelés",
          price: 18000,
          discription: null,
          extras: [],
        },
        {
          id: 4,
          title: "Orca mindkét oldala szájtól felfelé + homlok",
          price: 45000,
          discription: null,
          extras: [],
        },
        {
          id: 5,
          title: "Homlok, mérges ránc",
          price: 9000,
          discription: null,
          extras: [],
        },
        {
          id: 6,
          title: "Nyak korrekció",
          price: '15000 - 50000',
          discription: null,
          extras: [],
        },
        {
          id: 7,
          title: "Fül előtti rész",
          price: 18000,
          discription: null,
          extras: [],
        },
        {
          id: 8,
          title: "Fül alatti rész",
          price: 18000,
          discription: null,
          extras: [],
        },
        {
          id: 9,
          title: "Fül előtti és alatti rész együtt",
          price: 32000,
          discription: null,
          extras: [],
        },
        {
          id: 10,
          title: "Szarkalábak",
          price: 15000,
          discription: null,
          extras: [],
        },
        {
          id: 11,
          title: "Orr-ajak barázda",
          price: 18000,
          discription: "(Minden korrekciós ár egyéni, eredménytől függően alakul)",
          extras: [],
        },
        {
          id: 12,
          title: "Tű nélküli mezoterápia",
          price: 12500,
          discription: "Orvosi tisztaságú anyagokkal",
          extras: [
            {
              id: 1,
              title: "3 alkalmas bérlet",
              price: 35000
            },
            {
              id: 2,
              title: "5 alkalmas bérlet",
              price: 56000
            }
          ],
        },
        {
          id: 13,
          title: "Nanosoft NCTF 135 HA Polirevitalizációs, mikrotűs kezelés ",
          price: 12500,
          discription: "59 hatóanyaggal",
          extras: [
            {
              id: 1,
              title: "Szemkörnyéki ráncok, karikás szem",
              price: 28000
            },
            {
              id: 2,
              title: "Ajak környéki ráncok",
              price: 25000
            },
            {
              id: 3,
              title: "Mérges ránc",
              price: 25000
            },
            {
              id: 4,
              title: "Nyak",
              price: 30000
            },
            {
              id: 5,
              title: "Homlok ráncai",
              price: 30000
            },
            {
              id: 6,
              title: "Teljes arc",
              price: 43000
            }
          ],
        },
        {
          id: 14,
          title: "Rádiófrekvenciás kollagén szintézis, fiatalító kezelés",
          price: 7900,
          discription: "5 alkalmas bérlet vásárlása esetén a 6. alkalom ingyenes",
          extras: [],
        },
      ]
    },
    {
      id: 4,
      title: "Gyanták",
      discription: null,
      services: [
        {
          id: 1,
          title: "Bajusz",
          price: 900,
          discription: null,
          extras: [],
        },
        {
          id: 2,
          title: "Áll",
          price: 1000,
          discription: null,
          extras: [],
        },
        {
          id: 3,
          title: "Szemöldök",
          price: 1000,
          discription: null,
          extras: [],
        },
        {
          id: 4,
          title: "Orr",
          price: 1200,
          discription: null,
          extras: [],
        },
        {
          id: 5,
          title: "Hónalj",
          price: 1800,
          discription: null,
          extras: [],
        },
        {
          id: 6,
          title: "Bikini",
          price: 2000,
          discription: null,
          extras: [],
        },
        {
          id: 7,
          title: "Teljes fazon",
          price: 4600,
          discription: null,
          extras: [],
        },
        {
          id: 8,
          title: "Lábszár",
          price: 1800,
          discription: null,
          extras: [],
        },
        {
          id: 9,
          title: "Comb",
          price: 2100,
          discription: null,
          extras: [],
        },
        {
          id: 10,
          title: "Férfi mellkas",
          price: 4800,
          discription: null,
          extras: [],
        },
        {
          id: 11,
          title: "Férfi hát",
          price: 4800,
          discription: null,
          extras: [],
        },
        {
          id: 12,
          title: "Férfi hónalj",
          price: 2000,
          discription: null,
          extras: [],
        }
      ]
    },
    {
      id: 5,
      title: "Smink",
      discription: null,
      services: [
        {
          id: 1,
          title: "Alkalmi smink",
          price: 5000,
          discription: null,
          extras: [],
        },
        {
          id: 2,
          title: "Menyasszonyi smink",
          price: 6000,
          discription: null,
          extras: [],
        },
        {
          id: 3,
          title: "Próba smink",
          price: 6000,
          discription: null,
          extras: [],
        },
        {
          id: 4,
          title: "Soros szempilla",
          price: 2000,
          discription: null,
          extras: [],
        },
        {
          id: 5,
          title: "Tincses szempilla",
          price: 1500,
          discription: null,
          extras: [],
        },
      ]
    },
    {
      id: 6,
      title: "Testkezelés",
      discription: "fogyasztó, alakformáló",
      services: [
        {
          id: 1,
          title: "Vákum/rádiófrekvencia",
          price: null,
          discription: null,
          extras: [
            {
              id: 1,
              title: "Fenék/has/hát/karok",
              price: 2900
            },
            {
              id: 2,
              title: "Combok",
              price: 5900
            }
          ],
        },
        {
          id: 2,
          title: "Ingeráramos izomstimulálás",
          price: null,
          discription: null,
          extras: [
            {
              id: 1,
              title: "Testrészenként 50 perc",
              price: 4500
            },
            {
              id: 2,
              title: "5 alkalmas bérlet",
              price: 21000
            }
          ],
        },
        {
          id: 3,
          title: "Mély-Meleg terápia",
          price: null,
          discription: "test tekercselés",
          extras: [
            {
              id: 1,
              title: "1 alkalom (25perc)",
              price: 3900
            },
            {
              id: 2,
              title: "5 alkalmas bérlet",
              price: 17000
            }
          ],
        },
      ]
    },
    {
      id: 7,
      title: "Szemöldök, szempilla festés & lifting",
      discription: null,
      services: [
        {
          id: 1,
          title: "Szemöldök formázása",
          price: 900,
          discription: null,
          extras: []
        },
        {
          id: 2,
          title: "Szemöldök festés",
          price: 1300,
          discription: null,
          extras: []
        },
        {
          id: 3,
          title: "Szemöldök festés hennával",
          price: 4500,
          discription: null,
          extras: []
        },
        {
          id: 4,
          title: "Szempilla festés",
          price: 1500,
          discription: null,
          extras: []
        },
        {
          id: 5,
          title: "Szempilla lifting",
          price: 6900,
          discription: null,
          extras: []
        },
        {
          id: 6,
          title: "Szempilla lifting festéssel",
          price: 8000,
          discription: null,
          extras: []
        }
      ]
    },
    {
      id: 8,
      title: "Szemöldök tetoválás",
      discription: null,
      services: [
        {
          id: 1,
          title: "Microblading",
          price: "25000 Ft + korrekció 10000",
          discription: null,
          extras: []
        },
        {
          id: 2,
          title: "Soft & Hard powder",
          price: "35000 Ft + korrekció 10000",
          discription: null,
          extras: []
        },
      ]
    },
    {
      id: 9,
      title: "Műszempilla",
      discription: null,
      services: [
        {
          id: 1,
          title: "1D",
          price: 8500,
          discription: "(8500 Ft első szett) (töltés: 3 hét 6000 Ft, 4 hét 7000Ft)",
          extras: []
        },
        {
          id: 2,
          title: "2D",
          price: 10500,
          discription: "(10500 Ft első szett) (töltés: 3 hét 8000 Ft, 4 hét 9000Ft)",
          extras: []
        },
      ]
    },
    {
      id: 10,
      title: "Halpedikűr",
      discription: "Garra Rufa halakkal",
      services: [
        {
          id: 1,
          title: "30 perc",
          price: 2000,
          discription: null,
          extras: []
        },
        {
          id: 2,
          title: "60 perc",
          price: 3500,
          discription: null,
          extras: []
        },
      ]
    }
  ],
}
let hairdresser = {
  id: 3,
  industryName: "Fodrászat",
  name: "Birinyi Tünde",
  phone: "+36 30/508-8783",
  social: [
    {
      id: 1,
      platform: 'facebook',
      link: 'https://www.facebook.com/profile.php?id=100095109576951'
    }
  ],
  serviceTypes: [
    {
      id: 1,
      title: "Fodrászat",
      discription: null,
      services: [
        {
          id: 1,
          title: "Mosás + szárítás",
          price: null,
          discription: null,
          extras: [
            {
              id: 1,
              title: "Rövid",
              price: 2000,
            },
            {
              id: 2,
              title: "Félhosszú",
              price: 2500,
            },
            {
              id: 3,
              title: "Hosszú",
              price: 3000,
            },
          ],
        },
        {
          id: 2,
          title: "Mosás + vágás + szárítás",
          price: null,
          discription: null,
          extras: [
            {
              id: 1,
              title: "Rövid",
              price: 3500,
            },
            {
              id: 2,
              title: "Félhosszú",
              price: 4000,
            },
            {
              id: 3,
              title: "Hosszú",
              price: 4500,
            },
          ],
        },
        {
          id: 3,
          title: "Tőfestés",
          price: null,
          discription: null,
          extras: [
            {
              id: 1,
              title: "Rövid",
              price: 6000,
            },
            {
              id: 2,
              title: "Félhosszú",
              price: 6000,
            },
            {
              id: 3,
              title: "Hosszú",
              price: 6000,
            },
          ],
        },
        {
          id: 4,
          title: "Teljes festés",
          price: null,
          discription: null,
          extras: [
            {
              id: 1,
              title: "Rövid",
              price: 7700,
            },
            {
              id: 2,
              title: "Félhosszú",
              price: 9200,
            },
            {
              id: 3,
              title: "Hosszú",
              price: 10700,
            },
          ],
        },
        {
          id: 5,
          title: "Tőszőkítés + festés",
          price: null,
          discription: null,
          extras: [
            {
              id: 1,
              title: "Rövid",
              price: 7200,
            },
            {
              id: 2,
              title: "Félhosszú",
              price: 8500,
            },
            {
              id: 3,
              title: "Hosszú",
              price: 9500,
            },
          ],
        },
        {
          id: 6,
          title: "Teljes haj szőkítés + festés",
          price: null,
          discription: null,
          extras: [
            {
              id: 1,
              title: "Rövid",
              price: 11000,
            },
            {
              id: 2,
              title: "Félhosszú",
              price: 12700,
            },
            {
              id: 3,
              title: "Hosszú",
              price: 14500,
            },
          ],
        },
        {
          id: 7,
          title: "Foliás melír + árnyalás",
          price: null,
          discription: null,
          extras: [
            {
              id: 1,
              title: "Rövid",
              price: "250Ft/db + 1500",
            },
            {
              id: 2,
              title: "Félhosszú",
              price: "300Ft/db + 2000",
            },
            {
              id: 3,
              title: "Hosszú",
              price: "350Ft/db + 2500",
            },
          ],
        },
        {
          id: 8,
          title: "Balayage",
          price: null,
          discription: null,
          extras: [
            {
              id: 1,
              title: "Rövid",
              price: 10000,
            },
            {
              id: 2,
              title: "Félhosszú",
              price: 15000,
            },
            {
              id: 3,
              title: "Hosszú",
              price: 20000,
            },
          ],
        },
        {
          id: 9,
          title: "Hajvasalás / hajsütés",
          price: null,
          discription: null,
          extras: [
            {
              id: 1,
              title: "Rövid",
              price: 1300,
            },
            {
              id: 2,
              title: "Félhosszú",
              price: 1800,
            },
            {
              id: 3,
              title: "Hosszú",
              price: 2300,
            },
          ],
        },
      ],
    },
  ],
}
let nail = {
  id: 2,
  industryName: "Műköröm",
  name: "Varga Kata",
  phone: "+36 30/798-5774",
  social: [
    {
      id: 1,
      platform: 'facebook',
      link: 'https://www.facebook.com/nails.katart'
    }
  ],
  serviceTypes: [
    {
      id: 1,
      title: "Manikűr",
      discription: null,
      services: [
        {
          id: 1,
          title: "Manikűr",
          price: 2500,
          discription: null,
          extras: [
            {
              id: 1,
              title: "Japán manikűr",
              price: 3000
            }
          ]
        },
        {
          id: 2,
          title: "Géllak",
          price: 4800,
          discription: null,
          extras: [
            {
              id: 1,
              title: "Erősített géllak",
              price: 5300
            }
          ]
        },
        {
          id: 3,
          title: "Műköröm-Szalon formák",
          price: null,
          discription: "Az árak egy-egy köröm egyszerú díszítését vagy max 3db kő árát tartalmazzák",
          extras: [
            {
              id: 1,
              title: "XS-S méret",
              price: "Töltés 6000 Ft - Építés 6500"
            },
            {
              id: 2,
              title: "M méret",
              price: "Töltés 6500 Ft - Építés 7000"
            },
            {
              id: 1,
              title: "L méret",
              price: "Töltés 7000 Ft - Építés 7500"
            }
          ]
        },
        {
          id: 4,
          title: "Műköröm pótlás",
          price: null,
          discription: null,
          extras: [
            {
              id: 1,
              title: "1 héten belül",
              price: "INGYENES"
            },
            {
              id: 2,
              title: "1 hét után",
              price: "300"
            },
          ]
        },
        {
          id: 5,
          title: "Műköröm eltávolítás manikűrrel",
          price: 3000,
          discription: null,
          extras: []
        },
        // {
        //   id: 6,
        //   title: "Díszítés",
        //   price: null,
        //   discription: null,
        //   extras: []
        // },
      ]
    }
  ]
}
/**
 * DATA ARRAY (services)
*/
let _data = [beautician, nail, hairdresser]