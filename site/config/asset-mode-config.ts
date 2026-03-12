import type { SelectConfigParams, SelectItem } from "cruzo/ui-components/select";

const assetModeDict = [
  { title: "Моментальная покупка", id: "instant" },
];

export const assetModeConfig: SelectConfigParams = {
  placeholder: "Выбрать...",
  multi: false,
  getItems: async (): Promise<SelectItem[]> => {
    return assetModeDict.map((item) => ({
      label: item.title,
      value: item.id,
    }));
  },
};
