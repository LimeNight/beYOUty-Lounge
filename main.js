var beauticianMenu, beauticianContent
var initialService, initialServiceItemId

const init = () => {
    beauticianMenu = document.getElementById('serviceMenu')
    beauticianContent = document.getElementById('serviceContent')

    initialService = services[0]
    initialServiceItemId = 1

    let menu = createServiceMenu(initialService)
    updateMenu(menu)
    let content = createSelectedServiceList(initialServiceItemId)
    updateContent(content)
}

const updateMenu = (content) => {
    beauticianMenu.append(content)
}

const updateContent = (content) => {
    beauticianContent.append(content)
}
 
const getService = (element) => {
    let serviceIndex = element ? +element?.dataset.index : 0
    initialService = services[serviceIndex]

    let content = createServiceMenu(initialService)
    updateMenu(content)
}

const createServiceMenu = (service) => {
    beauticianMenu.innerHTML = ''

    let menuList = document.createElement('ul')

    menuList.classList = 'services__container-menu-list'

    for (let index = 0; index < service.length; index++) {
        let item = service[index]
        let menuItem = document.createElement('li')
        let menuItemBtn = document.createElement('button')
        menuItem.classList = 'services__container-menu-list-item'
        menuItemBtn.classList = 'services__container-menu-list-item-btn'
        menuItemBtn.append(item?.title)
        menuItemBtn.value = item.id
        menuItemBtn.onclick = function () {
            createSelectedServiceList(+this.value)
        }
        menuItem.append(menuItemBtn)
        menuList.append(menuItem)
    }

    return menuList
}

const createSelectedServiceList = (id) => {
    beauticianContent.innerHTML = ''
    let serviceInner = initialService.find(service => service.id === id).services
    let serviceContent = document.createElement('div')
    serviceContent.classList = 'services__container-content'
    serviceContent.id = 'serviceContent'
    let serviceList = document.createElement('ul')
    serviceList.classList = 'services__container-content-list'

    for (let index = 0; index < serviceInner.length; index++) {
        const item = serviceInner[index]
        let serviceListItem = document.createElement('li')
        serviceListItem.classList = 'services__container-content-list-item'

        let titleSpan = document.createElement('span')
        titleSpan.classList = 'title'
        let priceSpan = document.createElement('span')
        priceSpan.classList = 'price'

        titleSpan.append(item?.title)
        priceSpan.append(item?.price)
        serviceListItem.append(titleSpan, priceSpan)
        serviceList.append(serviceListItem)
    }

    return serviceList
}

let beautician = [
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

let services = [beautician]