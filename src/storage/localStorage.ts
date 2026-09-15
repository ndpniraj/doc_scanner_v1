import { createMMKV } from 'react-native-mmkv';

// [{id: 'session'}, {id: 'document'}, {id: 'profile info'}]
// 'document:id': Document
// 'group:id': DocumentGroup[]

export const storage = createMMKV({
  id: 'scan-document',
});

export const getJSON = <T>(key: string): T | undefined => {
  const result = storage.getString(key);
  return result ? JSON.parse(result) : undefined;
};

export const setJSON = <T>(key: string, value: T) => {
  storage.set(key, JSON.stringify(value));
};
