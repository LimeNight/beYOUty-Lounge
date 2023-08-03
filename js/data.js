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
};

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
};

/*
      Data array (services)
  */
export const _services = [beautician, hairdresser];