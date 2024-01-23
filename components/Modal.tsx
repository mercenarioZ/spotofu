import * as Dialog from "@radix-ui/react-dialog";
import { IoMdClose } from "react-icons/io";

interface ModalProps {
  isOpen: boolean;
  children: React.ReactNode;
  title: string;
  description?: string;
  onChange: (open: boolean) => void;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  children,
  title,
  description,
  onChange,
}) => {
  return (
    <Dialog.Root
      open={isOpen}
      defaultOpen={isOpen}
      onOpenChange={onChange}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="bg-neutral-900/90 backdrop-blur-xs fixed inset-0" />
        <Dialog.Content className="fixed drop-shadow-md top-[50%] left-[50%] max-h-[80vh] h-full md:h-auto md:max-h-[70vh] w-[85vw] md:w-[90vw] md:max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-md border border-neutral-600 p-4 bg-neutral-800">
          <Dialog.Title className="font-bold text-xl mb-4">
            {title}
          </Dialog.Title>

          <Dialog.Description className="mb-4 text-sm">
            {description}
          </Dialog.Description>

          <div>{children}</div>

          <Dialog.Close asChild>
            <button className="
              text-neutral-400
              hover:text-white
              transition
              absolute
              top-3
              right-3
              focus:outline-none

            ">
              <IoMdClose size={26} />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
