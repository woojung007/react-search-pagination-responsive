import { atom } from "recoil";

export const totalState = atom({ key: "totalState", default: 0 });

export const currentPage = atom({ key: "currentPage", default: 1 });

export const countState = atom({ key: "countState", default: 6 });

export const filterIdState = atom({ key: "filterIdState", default: 6 });
