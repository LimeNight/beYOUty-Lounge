import { _services } from "./data.js";
import { ServiceManager } from "./service.js";

/*
**************************
      GET SERVICE
**************************
*/
let menu = document.getElementsByClassName("dropdown-item");
for (let index = 0; index < menu.length; index++) {
  const menuitem = menu[index];

  menuitem.addEventListener("click", (event) => {
    let id = +event.target.dataset.id;
    contentManager.update(id)
  })
}

class ContentCreator {
  #createExtraItem(extra) {
    let li = document.createElement("li");
    li.textContent = `${extra?.title} - ${extra?.price} Ft.-`;
    return li;
  }
  #createServiceItem(services) {
    let extrasHTML = document.createElement("ul");
    let li = document.createElement("li");
    let h4 = document.createElement("h4");
    let p1 = document.createElement("p");
    let p2 = document.createElement("p");

    if (services.extras.length > 0) {
      services.extras.map((extra) =>
        extrasHTML.appendChild(this.#createExtraItem(extra))
      );
    }

    h4.textContent = services.title;
    p1.textContent = services.price != null ? `${services.price} Ft.-` : "";
    p2.textContent = services.discription;
    li.appendChild(h4);
    li.appendChild(p1);
    li.appendChild(p2);
    li.appendChild(extrasHTML);
    return li;
  }
  createServicesList(serviceType) {
    let ul = document.createElement("ul");
    serviceType.services.map((service) =>
      ul.appendChild(this.#createServiceItem(service))
    );
    return ul;
  }
}

class SelectMenuCreator extends ContentCreator {
  #createTitle(text) {
    const h3 = document.createElement("h3");
    h3.classList = "services__content-header__title";
    h3.innerText = text;
    return h3;
  }
  createSelectMenu(serviceInfo) {
    let div = document.createElement("div");
    let title = this.#createTitle(serviceInfo.industryName);

    div.classList = "services__container-header__container";
    div.appendChild(title);

    if (serviceInfo.serviceTypes.length > 1) {
      const selectElement = document.createElement("select");
      selectElement.setAttribute("name", "services");
      selectElement.classList = "services__container-header__select";

      serviceInfo.serviceTypes.forEach((serviceTypes) => {
        const optionElement = document.createElement("option");
        optionElement.setAttribute("value", serviceTypes.id);
        optionElement.classList = "services__container-header__option";
        optionElement.textContent = serviceTypes.title;
        selectElement.appendChild(optionElement);
      });

      selectElement.onchange = (el) => {
        let serviceID = +el.target.value;
        contentManager.updateSelectedService(serviceID);
      };

      div.appendChild(selectElement);
    }
    return div;
  }
}

class ContentManager extends SelectMenuCreator {
  #initialServiceID = 1;
  headerContainer = document.createElement("div");
  bodyContainer = document.createElement("div");

  constructor(elementId) {
    super();
    // Add services to manager
    ServiceManager.add(_services)
    this.container = document.getElementById(elementId);
    this.initialServiceInfo = ServiceManager.getServiceInfoById(
      this.#initialServiceID
    );
    this.headerContainer.classList = "services__container-header";
    this.bodyContainer.classList = "services__container-body";
  }
  init() {
    let selectMenu = this.createSelectMenu(this.initialServiceInfo);
    let content = this.createServicesList(
      this.initialServiceInfo.serviceTypes[0]
    )

    this.headerContainer.appendChild(selectMenu);
    this.bodyContainer.appendChild(content);

    this.container.appendChild(this.headerContainer);
    this.container.appendChild(this.bodyContainer);
  }
  update(serviceInfoID) {
    this.headerContainer.innerHTML = "";
    this.bodyContainer.innerHTML = "";
    let service = ServiceManager.getServiceInfoById(serviceInfoID);

    if (service !== null) {
      let selectMenu = this.createSelectMenu(service);
      let content = this.createServicesList(service.serviceTypes[0]);

      this.headerContainer.appendChild(selectMenu);
      this.bodyContainer.appendChild(content);

      this.container.appendChild(this.headerContainer);
      this.container.appendChild(this.bodyContainer);
    }
  }
  updateSelectedService(serviceTypesID) {
    this.bodyContainer.innerHTML = "";
    let service = ServiceManager.getServiceTypesById(serviceTypesID);

    if (service !== null) {
      let content = this.createServicesList(service);
      this.bodyContainer.appendChild(content);
    }
  }
}

export let contentManager = new ContentManager('serviceContent')