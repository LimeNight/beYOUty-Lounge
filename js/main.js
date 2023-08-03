/*
    Global Variables
      -contentServiceManager
*/
var contentManager;
/*
    Page loaded
      -initialize
*/
const init = () => {
  // Add services to manager
  ServiceManager.add(_data)
  // Init contatent manager
  contentManager = new ContentManager('serviceContent')
  contentManager.init()
}
/*
**************************
      GET SERVICE
**************************
*/
const getService = (id) => {
  contentManager.update(id)
}

class ContentCreator {
  #createExtraItem(extra){
    let li = document.createElement('li')
    li.textContent = `${extra?.title} - ${extra?.price} Ft.-` 
    return li
  }
  
  #createServiceItem(services){
    let extrasHTML = document.createElement('ul')
    let li = document.createElement('li')
    let h4 = document.createElement('h4')
    let p1 = document.createElement('p')
    let p2 = document.createElement('p')

    if (services.extras.length > 0) {
      services.extras.map((extra) => extrasHTML.appendChild(this.#createExtraItem(extra)))
    }
  
    h4.textContent = services.title
    p1.textContent = services.price != null ? `${services.price} Ft.-` : ''
    p2.textContent = services.discription
    li.appendChild(h4)
    li.appendChild(p1)
    li.appendChild(p2)
    li.appendChild(extrasHTML)
    return li
  }
  
  createServicesList(serviceType){
    let ul = document.createElement('ul')
    console.log(serviceType)
    serviceType.services.map((service) => ul.appendChild(this.#createServiceItem(service)))
    return ul
  }
}

class SelectMenuCreator extends ContentCreator {
  #createTitle(text) {
    const h3 = document.createElement('h3')
    h3.innerText = text
    return h3
  }

  createSelectMenu(serviceInfo) {
    let title = this.#createTitle(serviceInfo.industryName)

    if (serviceInfo.serviceTypes.length > 1){
      const selectElement = document.createElement("select")
      selectElement.setAttribute("name", "services")
      serviceInfo.serviceTypes.forEach((serviceTypes) => {
        const optionElement = document.createElement("option")
        optionElement.setAttribute("value", serviceTypes.id)
        optionElement.textContent = serviceTypes.title
        selectElement.appendChild(optionElement)
      })

      selectElement.onchange = (el) => {
        let serviceID = +el.target.value
        contentManager.updateSelectedService(serviceID)
      }

      return title, selectElement
    }
    return title
  }
}

class Creator {

}

class ContentManager extends SelectMenuCreator {
  #initialServiceID = 1
  headerContainer  = document.createElement('div')
  bodyContainer = document.createElement('div')

  constructor(elementId){
    super()
    this.container = document.getElementById(elementId)
    this.initialServiceInfo = ServiceManager.getServiceInfoById(this.#initialServiceID)
    this.headerContainer .classList = 'services__content-select'
    this.bodyContainer.classList = 'services__content-container'
  }

  init() {
    let selectMenu = this.createSelectMenu(this.initialServiceInfo)
    let content = this.createServicesList(this.initialServiceInfo.serviceTypes[0])

    this.headerContainer .appendChild(selectMenu)
    this.bodyContainer.appendChild(content)

    this.container.appendChild(this.headerContainer )
    this.container.appendChild(this.bodyContainer)
  }

  update(serviceInfoID) {
    this.#clear()
    let service = ServiceManager.getServiceInfoById(serviceInfoID)
    let selectMenu = this.createSelectMenu(service)
    let content = this.createServicesList(service.serviceTypes[0])

    this.headerContainer .appendChild(selectMenu)
    this.bodyContainer.appendChild(content)

    this.container.appendChild(this.headerContainer )
    this.container.appendChild(this.bodyContainer)
  }

  updateSelectedService(serviceTypesID) {
    this.bodyContainer.innerHTML = ""
    let service = ServiceManager.getServiceTypesById(serviceTypesID)

    if (service !== null) {
      let content = this.createServicesList(service)
      this.bodyContainer.appendChild(content)
    }
  }

  #clear() {
    this.headerContainer .innerHTML = ''
    this.bodyContainer.innerHTML = ''
  }
}
/*
************************************
          DATA STRUCT
************************************  
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
    serviceTypes
  ){
    this.id = id
    this.industryName = industryName
    this.name = name
    this.phone = phone
    this.serviceTypes = Array.isArray(serviceTypes) ?  serviceTypes?.map(service => new ServiceTypes(service.id, service.title, service.discription, service.services)) : []
  }
}
/*
**************************************
        SERVICE MANAGER STATIC CLASS
        - add services
        - getServiceInfoById
        - getAll
**************************************
*/
class ServiceManager {
  static #collection = []
  static #actualService = {}

  //Add all service and store
  static add(services){
    this.#collection = services.length > 0 ?  services?.map(service => new ServiceInfo(service.id, service.industryName, service.name, service.phone, service.serviceTypes)) : []
  }

  //Get ServiceInfo By ID
  static getServiceInfoById(id) {
    return this.#actualService = this.#collection?.find(service => service.id === id) ?? null
  }

  //Get ServiceType By ID
  static getServiceTypesById(id) {
    return this.#actualService.serviceTypes.find(service => service.id === id) ?? null
  }

  //Get the whole list of services
  static getAll() {
    return this.#collection ?? null
  }

}

/*
  DATA
*/
let beautician = {
  /* SERVICEINFO*/
  id: 1,
  industryName: "Kozmetika",
  name: "Pálvölgyi Rita",
  phone: "+36704567890",
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
      services: {},
    },
  ],
}
let hairdresser = {
  id: 3,
  industryName: "Fodrászat",
  name: "Birinyi Tünde",
  phone: "+36305088783",
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
/*
    DATA ARRAY (services)
*/
let _data = [beautician, hairdresser]