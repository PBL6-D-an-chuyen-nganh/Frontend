import { AiOutlineQuestionCircle } from 'react-icons/ai';
import Btn from '../Button';

export default function ConfirmModal({
  isOpen,
  question,
  label,
  onConfirm,
  onCancel,
  confirmLabel,
  cancelLabel 
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full mx-4">
        <div className="flex items-start gap-3 mb-4">
          <AiOutlineQuestionCircle className="text-green-900 text-2xl mt-0.5" />
          <div>
            <h2 className="text-lg font-semibold text-gray-800">{label}</h2>
            <p className="text-gray-600 text-sm mt-2">{question}</p>
          </div>
        </div>

        <div className="flex gap-3 justify-end mt-6">
          <Btn
            title={cancelLabel}
            onClick={onCancel}
            variant="secondary"
          />
          <Btn
            title={confirmLabel}
            onClick={onConfirm}
            variant="danger"
          />
        </div>
      </div>
    </div>
  );
}
