import clsx from "clsx";
import { LucideX } from "lucide-react";
import { FC, ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title: string;
}

export const Modal: FC<ModalProps> = ({ isOpen, children, onClose, title }) => {
  return (
    <div
      className={clsx(
        "fixed inset-0 z-250 duration-700 transition-all flex items-center justify-center px-4",
        {
          "opacity-100": isOpen,
          "opacity-0 pointer-events-none": !isOpen,
        },
      )}
    >
      <div
        className={clsx(
          "absolute inset-0 bg-background/70 duration-700 transition-all",
          { "opacity-100": isOpen, "opacity-0": !isOpen },
        )}
        onClick={onClose}
      />

      <div
        className={clsx(
          "max-w-lg w-full mx-auto border border-border bg-surface rounded-xl p-4 space-y-4 transition-all duration-700 transform",
          { "translate-y-0": isOpen, "translate-y-full": !isOpen },
        )}
      >
        <div className="flex items-center justify-between border-b border-border pb-2">
          <h3>{title}</h3>
          <button
            onClick={onClose}
            className="cursor-pointer text-muted transition-colors duration-300 hover:text-primary"
          >
            <LucideX className="size-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};
