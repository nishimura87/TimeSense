import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode; 
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  // モーダルの外側をクリックしたときにモーダルを閉じる
  const handleBackdropClick = () => {
    onClose();
  };

  // モーダルの内部でのクリックイベントを止める（バブリング防止）
  const handleModalClick = (event: any) => {
    event.stopPropagation();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex justify-center items-center" onClick={handleBackdropClick}>
      <div className="bg-white p-4 rounded-lg shadow-lg w-1/2 max-w-1/2 mx-auto" onClick={handleModalClick}>
        {children}
        <div className="flex justify-end">
          <button onClick={onClose} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;