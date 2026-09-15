
"use client";

import { useEffect, useRef } from "react";

interface ConfirmDeleteDialogProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDeleteDialog({
  isOpen,
  onConfirm,
  onCancel,
}: ConfirmDeleteDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  return (
    <dialog
      ref={dialogRef}
      onClose={onCancel}
          className="backdrop:bg-black/70 backdrop:backdrop-blur-sm p-6 rounded-2xl shadow-2xl bg-surface border border-border text-primary m-auto w-[calc(100%-2rem)] max-w-sm transition-all open:animate-in open:fade-in open:zoom-in-95"
    >
      <h3 className="font-bold text-xl mb-3">Delete Task?</h3>
      <hr className="border-border mb-4" />
      <p className="text-secondary mb-6 text-sm">
        Are you sure you want to delete this task? This action cannot be undone.
      </p>
      <div className="flex justify-end gap-3">
        <button
          onClick={onCancel}
          className="px-4 py-2 rounded-lg font-semibold text-secondary border border-transparent hover:border-secondary/40 hover:bg-secondary/10 hover:text-primary transition-all focus:outline-none"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 rounded-lg font-semibold bg-red-500 text-white hover:bg-red-600 transition-colors shadow-sm focus:outline-none"
        >
          Yes, delete
        </button>
      </div>
    </dialog>
  );
}