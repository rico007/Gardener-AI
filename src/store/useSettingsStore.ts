import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface SettingsState {
  location: string;
  coordinates: { lat: number; lon: number } | null;
  openWeatherKey: string;
  openAIKey: string;
  setLocation: (location: string, coordinates: { lat: number; lon: number }) => void;
  setOpenWeatherKey: (key: string) => void;
  setOpenAIKey: (key: string) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      location: '',
      coordinates: null,
      openWeatherKey: '',
      openAIKey: '',
      setLocation: (location, coordinates) => set({ location, coordinates }),
      setOpenWeatherKey: (key) => set({ openWeatherKey: key }),
      setOpenAIKey: (key) => set({ openAIKey: key }),
    }),
    {
      name: 'settings-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        location: state.location,
        coordinates: state.coordinates,
        openWeatherKey: state.openWeatherKey,
        openAIKey: state.openAIKey,
      }),
    }
  )
);