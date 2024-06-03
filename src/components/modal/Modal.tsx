"use client";
interface ModalProps {
  isOpen: boolean; // Boolean to control visibility
  onClose: () => void; // Function to call on closing the modal
  onConfirm: () => void; // Function to call on confirming an action
  children: React.ReactNode; // Children elements to render inside the modal
}
export default function Modal({ isOpen, onClose, onConfirm, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg p-6">
        <div className="mb-4">{children}</div>
        <div className="flex justify-end gap-4">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={onConfirm}
          >
            Delete
          </button>
          <button
            className="bg-gray-300 text-black px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
