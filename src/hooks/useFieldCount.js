import { useState, useEffect } from 'react';

export const useFieldCount = (items, fieldName, minCount) => {
  const [fieldCount, setFieldCount] = useState([]);

  useEffect(() => {
    const fieldCountMap = new Map();
    items.forEach(item => {
      const field = item[fieldName];
      fieldCountMap.set(field, (fieldCountMap.get(field) || 0) + 1);
    });

    const uniqueFields = [...new Set(items.map(item => item[fieldName]))]
      .map(field => ({
        id: field.toLowerCase(),
        label: field,
        count: fieldCountMap.get(field)
      }))
      .filter(field => field.count > minCount);

    setFieldCount(uniqueFields);
  }, [items, fieldName, minCount]);

  return fieldCount;
};