import { create } from "zustand";

interface UploadModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

/**
 * Explanation:
 * Zustand is a state management library that is similar to Redux.
 * `useUploadModal` is a hook that returns an object with:
 * - `isOpen`: boolean
 * - `onOpen`: () => void
 * - `onClose`: () => void
 *
 * How to use:
 * ```
 * const { isOpen, onOpen, onClose } = useAuthModal();
 * ```
 */
const useUploadModal = create<UploadModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useUploadModal;
