// src/lib/partners/index.js
import * as api from "./api";

export const listPartners = api.listPartners;
export const createPartner = api.createPartner;
export const getPartner = api.getPartner;
export const updatePartner = api.updatePartner;
export const deletePartner = api.deletePartner;

// regions helper (서버에서 가져옴)
export * from "./regions";
