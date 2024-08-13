import { CreateProductData, ImageField } from "../../types";

export const makeFormData = (data: CreateProductData) => {
  const formData = new FormData();
  console.log("heres the data - ", data);
  Object.entries(data).forEach(([key, value]) => {
    if (key === "image") {
      formData.append(key, (value as ImageField).file);
    } else if (key === "priceConfiguration" || key === "attributes") {
      formData.append(key, JSON.stringify(value));
    } else {
      formData.append(key, value as string);
    }
  });
  return formData;
};
