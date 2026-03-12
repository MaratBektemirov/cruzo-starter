import type { SelectConfigParams, SelectItem } from "cruzo/ui-components/select";

const assetTypeDict = [
  { title: "Логотип", id: "logo" },
  { title: "Иконка", id: "icon" },
  { title: "Аватар", id: "avatar" },
];

export const assetTypeConfig: SelectConfigParams = {
  placeholder: "Выбрать...",
  multi: false,
  getItems: async (): Promise<SelectItem[]> => {
    return assetTypeDict.map((item) => ({
      label: item.title,
      value: item.id,
    }));
  },
};
