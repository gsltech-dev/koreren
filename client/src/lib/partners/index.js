// src/lib/partners/index.js
import * as api from "./api";

export const listPartners = api.listPartners;
export const createPartner = api.createPartner;

// regions helper (서버에서 가져옴)
export * from "./regions";
