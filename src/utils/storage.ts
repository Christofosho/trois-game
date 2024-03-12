import AsyncStorage from "@react-native-async-storage/async-storage";

export const store = async (key: string, value: Object): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  }
  catch (error) {
    console.error(error);
  }
};

export const get = async (key: string): Promise<Object | null> => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
  }
  catch (error) {
    console.error(error);
  }

  return null;
};
