import * as Notice from "../models/notices.model.js";

export const listNotices = async () => {
  const { data, error } = await Notice.findAll();
  if (error) throw error;
  return data;
};
