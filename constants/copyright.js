import {image} from "../utils/data/baseUrl";

export const header = {
  menuList: {
    customMenuItems: [
      {
        index: "1",
        itemsHref: "#",
        itemsText: "Link 1"
      },
      {
        index: "2",
        itemsHref: "#",
        itemsText: "Link 2"
      }
    ]
  }
};


export const panel = [
  {
    image: image("list.svg"),
    action: "list"
  },
  {
    image: image("filter.svg"),
    action: "filter"
  },
  {
    image: image("restart.svg"),
    action: "restart"
  },
  {
    image: image("shuffle.svg"),
    action: "shuffle"
  }
]