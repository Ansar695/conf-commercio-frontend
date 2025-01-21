import { ProcessAudioResultData } from '@/typing/api';
import { create } from 'zustand';

type State = {
  data?: ProcessAudioResultData;
};

type Actions = {
  setData: (newData: ProcessAudioResultData) => void;
};

// Create the store
const useStore = create<State & Actions>((set) => ({
  // data: ,
  setData: (newData) => set({ data: newData }),
}));

export default useStore;
