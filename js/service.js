/*
  **************************************
          SERVICE MANAGER STATIC CLASS
          - add services
          - getServiceInfoById
          - getAll
  **************************************
  */
export class ServiceManager {
  static #collection = [];
  static #actualService = {};

  //Add all service and store
  static add(services) {
    this.#collection =
      services.length > 0
        ? services?.map(
            (service) =>
              new ServiceInfo(
                service.id,
                service.industryName,
                service.name,
                service.phone,
                service.serviceTypes
              )
          )
        : [];
  }
  //Get ServiceInfo By ID
  static getServiceInfoById(id) {
    return (this.#actualService =
      this.#collection?.find((service) => service.id === id) ?? null);
  }
  //Get ServiceType By ID
  static getServiceTypesById(id) {
    return (
      this.#actualService.serviceTypes.find((service) => service.id === id) ??
      null
    );
  }
  //Get the whole list of services
  static getAll() {
    return this.#collection ?? null;
  }
}

/*
************************************
          DATA STRUCT
************************************  
*/
class Extras {
  constructor(id, title, price) {
    this.id = id;
    this.title = title;
    this.price = price;
  }
}
class Services extends Extras {
  constructor(id, title, price, discription, extras) {
    super(id, title, price);
    this.discription = discription;
    this.extras =
      extras.length > 0
        ? extras.map((extra) => new Extras(extra.id, extra.title, extra.price))
        : [];
  }
}
class ServiceTypes {
  constructor(id, title, discription, services) {
    this.id = id;
    this.title = title;
    this.discription = discription;
    this.services =
      services.length > 0
        ? services?.map(
            (service) =>
              new Services(
                service.id,
                service.title,
                service.price,
                service.discription,
                service.extras
              )
          )
        : [];
  }
}
class ServiceInfo {
  constructor(id, industryName, name, phone, serviceTypes) {
    this.id = id;
    this.industryName = industryName;
    this.name = name;
    this.phone = phone;
    this.serviceTypes = Array.isArray(serviceTypes)
      ? serviceTypes?.map(
          (service) =>
            new ServiceTypes(
              service.id,
              service.title,
              service.discription,
              service.services
            )
        )
      : [];
  }
}
