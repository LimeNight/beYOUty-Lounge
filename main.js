var menuContainer = document.createElement('div')
var serviceInnerContainer = document.createElement('div')
menuContainer.classList = 'services__container-menu'
serviceInnerContainer.classList ='services__container-content'

var serviceContainer
var initialServiceId = 1
var actialService

const init = () => {
    serviceContainer = document.getElementById('serviceContainer')
    serviceContainer.append(...[menuContainer, serviceInnerContainer])
    getService(initialServiceId)
    createServiceInner(initialServiceId)
}

const updateMenu = (menu) => {
    menuContainer.innerHTML = ''
    menuContainer.append(...menu)
}

const updateContent = (content) => {
    serviceInnerContainer.innerHTML = ''
    serviceInnerContainer.append(content)
}
 
const getService = (id) => {
    actialService = services.find(serv => serv.id === id)
    let content = createServiceOption(actialService)
    updateMenu(content)
}

const createServiceOption = (service) => {
    const size = service.serv.length
    let menuLabel = document.createElement('label')
    let menuSelect = document.createElement('select')
    
    menuLabel.textContent = service.serviceType
    menuLabel.classList = 'services__container-menu-label'
    menuSelect.classList = 'services__container-menu-select'
    menuSelect.onchange = function() {
        createServiceInner(+this.value)
    }

    for (let index = 0; index < size; index++) {
        let serviceitem = service?.serv[index]
        let menuItem = document.createElement('option')
        menuItem.classList = 'services__container-menu-select-option'
        menuItem.value = serviceitem.id
        menuItem.text = serviceitem.title
        menuSelect.append(menuItem)
    }

    return [menuLabel, menuSelect]
}

const createServiceInner = (id) => {
    let innerService = actialService.serv.find(s => s.id === id)
    console.log(innerService)
    let size = innerService.services.length
    let serviceList = document.createElement('ul')

    serviceList.classList = 'services__container-content-list'

    for (let index = 0; index < size; index++) {
        const item = innerService.services[index]
        let serviceListItem = document.createElement('li')
        let titleSpan = document.createElement('span')
        let priceSpan = document.createElement('span')

        serviceListItem.classList = 'row services__container-content-list-item'
        titleSpan.classList = 'col-12 col-sm-10 title'
        priceSpan.classList = 'col-12 col-sm-2 price'

        titleSpan.append(item?.title)
        priceSpan.append(`${item?.price} Ft.-`)
        serviceListItem.append(titleSpan, priceSpan)
        serviceList.append(serviceListItem)
    }

    updateContent(serviceList)
}


let beautician = {
    id: 1,
    serviceType: 'Kozmetika',
    name: 'Rita',
    phone: '+36704567890',
    serv: [
        {
            id: 1,
            title: 'Arckezelések',
            discription: null,
            services: [
                {
                    id: 1,
                    title: 'Tini kezelés (18 éves korig)',
                    price: 6500,
                    discription:'Letisztítás, peeling, gőzőlés, nyomkodás/pórusok kitisztítása, fertőtlenítés, összehúzó, nyugtató pakolás, befejező krém.',
                    extras: []
                },
                {
                    id: 2,
                    title: 'Nagykezelés',
                    price: 9000,
                    discription:'Letisztítás, peeling, gőzőlés, nyomkodás/pórusok kitisztítása, fertőtlenítés, összehúzó, nyugtató pakolás, befejező krém.',
                    extras: [
                        {
                            id: 1,
                            title: 'UH/lontoforézis hatóanyag bevitel',
                            price: 2000
                        },
                        {
                            id: 2,
                            title: '15 perc arc, nyak és dekoltázsmasszázs',
                            price: 2000
                        },
                        {
                            id: 3,
                            title: 'Aranymaszk',
                            price: 2000
                        },
                        {
                            id: 4,
                            title: 'Peptides szemkörnyék feltöltő',
                            price: 4500
                        }
                    ]
                },
                {
                    id: 3,
                    title: 'Intenzív tápláló mélyhidratáló kezelés',
                    price: 7900,
                    discription: null,
                    extras: []
                },
                {
                    id: 4,
                    title: 'Arc, nyak és dekoltázsmasszázs',
                    price: 4900,
                    discription: null,
                    extras: []
                },
                {
                    id: 5,
                    title: 'Kiskezelés',
                    price: 7500,
                    discription: 'Letisztítás, peeling, masszázs, tápláló pakolás, befejező krém.',
                    extras: []
                },
                {
                    id: 6,
                    title: 'Hidroabrázió',
                    price: 2500,
                    discription: null,
                    extras: []
                },
                {
                    id: 7,
                    title: 'Microdermabrázió',
                    price: 4500,
                    discription: 'Gyémántfejes bőr csiszolás.',
                    extras: []
                }
            ]
        },
        {
            id: 2,
            title: 'Prémium anti-aging kezelések',
            discription: null,
            services: {
    
            }
        }
    ]
} 


let services = [beautician]