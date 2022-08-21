import { atom } from "recoil";
import { v1 } from "uuid";

export const totalState = atom({ key: "totalState", default: 0 });

export const currentPage = atom({ key: "currentPage", default: 1 });

export const countState = atom({ key: "countState", default: 6 });
