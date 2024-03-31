import React from 'react';

interface ModalProps {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ show, onClose, children }) => {
  if (!show) return null;

  const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  // イベントが発生した要素から最も近い 'modal-content' クラスを持つ親要素を検索
  const isInsideModal = (event.target as HTMLElement).closest('.modal-content');

  // 'modal-content' クラスを持つ親要素がない場合、つまりクリックがモーダルの外側で発生した場合
  if (!isInsideModal) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-40" onClick={handleOutsideClick}>
      <div className="flex items-center justify-center min-h-screen">
        <div className="modal-content bg-white p-5 rounded shadow-lg relative" onClick={e => e.stopPropagation()}>
          <button onClick={onClose} className="absolute bottom-0 right-0 m-2 p-1 border rounded">閉じる</button>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;