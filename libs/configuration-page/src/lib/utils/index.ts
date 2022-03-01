export const transformConfigDataToTableData = (data) => {
  if (!data || !data.configs) return [];

  const configKeys = Object.keys(data.configs);

  return configKeys.map((key) => ({
    key,
    value: data.configs[key],
  }));
};

export const transformTableDataToConfigData = (data) => {
  if (!data || data.length === 0) return {};

  return data.reduce(
    (acc, { key, value }) => {
      acc.configs[key] = value;
      return acc;
    },
    { configs: {} }
  );
};
