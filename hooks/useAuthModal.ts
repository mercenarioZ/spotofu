import { create } from "zustand";

interface AuthModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

/**
 * Explanation:
 * Zustand is a state management library that is similar to Redux.
 * `useAuthModal` is a hook that returns an object with the following properties:
 * - `isOpen`: boolean
 * - `onOpen`: () => void
 * - `onClose`: () => void
 * 
 * How to use:
 * ```
 * const { isOpen, onOpen, onClose } = useAuthModal();
 * ```
 */
const useAuthModal = create<AuthModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useAuthModal;
