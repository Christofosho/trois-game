import AsyncStorage from "@react-native-async-storage/async-storage";
import { Statistics } from "../types";

type StoredValue = Statistics;

export const store = async (key: string, value: StoredValue): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  }
  catch (error) {
    console.error(error);
  }
};

export const get = async (key: string): Promise<StoredValue | null> => {
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
