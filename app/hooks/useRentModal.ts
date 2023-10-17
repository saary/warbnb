import { create } from 'zustand';

interface RentModalStore {
  isOpen: boolean;
  onOpen: (isHost: boolean) => void;
  onClose: () => void;
  isHost: boolean;
}

const useRentModal = create<RentModalStore>((set) => ({
  isOpen: false,
  onOpen: (isHost) => set({ isOpen: true, isHost }),
  onClose: () => set({ isOpen: false }),
  isHost: false,
}));


export default useRentModal;
