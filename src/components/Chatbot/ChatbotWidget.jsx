import React, { useEffect, useMemo, useRef, useState } from 'react';
import { chatSend, chatReset } from '../../api/chatbot';
import ImageUploader from './ImageUploader';
import ChatHeader from './ChatHeader';
import ChatMessageList from './ChatMessageList';
import ChatInputBar from './ChatInputBar';
import FloatingButton from './FloatingButton';
import { FaTimes } from 'react-icons/fa';

const CHATBOT_API = import.meta.env.VITE_AI_API_URL;
export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
        role: 'assistant', 
        content: `Xin chào! Mình là chatbot y tế da liễu. Mình có thể giúp bạn:
      - Chẩn đoán sơ bộ từ ảnh anh/ chị tải lên
      - Tra cứu bệnh: triệu chứng / nguyên nhân / điều trị / phòng ngừa
      - Gợi ý bệnh theo mô tả triệu chứng
      - Đặt lịch khám với bác sĩ da liễu`
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [unread, setUnread] = useState(false);
  const [scrollRef, setScrollRef] = useState(null);

  // Ảnh đã chọn (nhiều ảnh) cho thumbnail trước khi gửi
  const uploaderRef = useRef(null);
  const [pickedImages, setPickedImages] = useState([]); // [{id, file, url}] - url là URL thumbnail
  const [uploadingImage, setUploadingImage] = useState(false);

  // ==== Map 7 nhãn -> tên tiếng Việt ====
  const LABEL_VI_MAP = {
    MEL:  'Ung thư hắc tố',
    NV:   'Nốt ruồi',
    BCC:  'Ung thư biểu mô tế bào đáy',
    AKIEC:'Dày sừng quang hóa',
    BKL:  'Dày sừng tiết bã',
    DF:   'U xơ da',
    VASC: 'Tổn thương mạch máu',
  };
  const toVi = (label) => {
    if (!label) return '—';
    const key = String(label).trim().toUpperCase();
    return LABEL_VI_MAP[key] || label;
  };
  const fmtPct = (x) => {
    const n = isFinite(x) ? Math.max(0, Math.min(1, x)) : 0;
    return (n * 100).toFixed(1) + '%';
  };

  const sessionId = useMemo(function () {
    const key = 'hc_session_id';
    var exist = typeof window !== 'undefined' ? localStorage.getItem(key) : null;
    if (exist) return exist;
    var id = (typeof crypto !== 'undefined' && crypto.randomUUID) ? crypto.randomUUID() : String(Date.now());
    if (typeof window !== 'undefined') localStorage.setItem(key, id);
    return id;
  }, []);

  useEffect(function () {
    if (open) {
      setUnread(false);
      if (scrollRef && scrollRef.current) {
        scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
      }
    }
  }, [open, messages, loading, scrollRef]);

  async function sendMessage() {
    const trimmed = String(input || '').trim();
    const hasImages = pickedImages.length > 0;
    if (!trimmed && !hasImages) return;

    // 1) Thêm text vào đoạn chat ngay (nếu có)
    if (trimmed) {
      setMessages((v) => v.concat({ role: 'user', content: trimmed }));
    }

    // 2) Nếu có ảnh: thêm ảnh vào chat ngay bằng URL MỚI, clear thumbnail NGAY, rồi upload
    if (hasImages) {
      const textForImage = trimmed || 'Ảnh này bị bệnh gì?';
      const imagesToSend = pickedImages.slice(); // copy để upload sau khi clear

      // Tạo URL MỚI cho mỗi ảnh trong "lịch sử chat", không bị ảnh hưởng khi clear thumbnail
      const chatImageMessages = imagesToSend.map((it) => {
        const chatUrl = URL.createObjectURL(it.file); // URL riêng cho chat
        // auto revoke sau 10 phút để tránh leak (tùy chỉnh được)
        setTimeout(() => { try { URL.revokeObjectURL(chatUrl); } catch {} }, 10 * 60 * 1000);
        return {
          role: 'user',
          imageUrl: chatUrl,
          imageAlt: it.file?.name || 'image',
          content: textForImage,
        };
      });

      // Đưa ảnh vào khung chat ngay lập tức
      setMessages((v) => v.concat(chatImageMessages));

      // Clear UI ngay
      setInput('');
      clearAllPicked(); // revoke URL thumbnail ngay lập tức
      setUploadingImage(true);

      // Upload lần lượt
      try {
        for (const it of imagesToSend) {
          const form = new FormData();
          form.append('image', it.file, it.file.name);
          form.append('top_k', '3');
          form.append('segment', 'false');
          if (sessionId) form.append('session_id', sessionId);

          const res = await fetch(`${CHATBOT_API}/api/diagnose-image`, { method: 'POST', body: form });
          if (!res.ok) {
            const text = await res.text();
            throw new Error(text || res.statusText);
          }
          const data = await res.json();
          handleImageResult(data); // format TV + gợi ý hỏi tiếp
        }
      } catch (e) {
        console.error(e);
        setMessages((v) => v.concat({ role: 'assistant', content: 'Lỗi upload ảnh: ' + e.message }));
      } finally {
        setUploadingImage(false);
      }
      // có ảnh thì return để không gọi chatSend
      return;
    }

    // 3) Nếu chỉ có text (không ảnh): gọi backend như cũ
    setInput(''); // clear ngay
    setLoading(true);
    try {
      const result = await chatSend(trimmed, sessionId);
      const reply = result && result.reply ? result.reply : '';
      if (!open) setUnread(true);
      setMessages((v) => v.concat({ role: 'assistant', content: reply }));
    } catch (e) {
      console.error(e);
      setMessages((v) => v.concat({ role: 'assistant', content: 'Xin lỗi, có lỗi xảy ra. Vui lòng thử lại!' }));
    } finally {
      setLoading(false);
    }
  }

  async function resetSession() {
    try { await chatReset(sessionId); } catch (e) { console.warn('reset error', e); }
    setMessages([{ role: 'assistant', content: 'Phiên chat đã đặt lại. Tôi có thể giúp gì cho bạn?' }]);
  }

  // Kết quả ảnh -> tiếng Việt + gợi ý hỏi tiếp (không article)
  function handleImageResult(data) {
    try {
      const preds = data && Array.isArray(data.predictions) ? data.predictions : [];
      const lines = ['Kết quả chẩn đoán hình ảnh:'];

      if (preds.length) {
        const top = preds[0];
        if (top && top.label) lines.push(`- ${toVi(top.label)} (độ tin cậy ${fmtPct(top.score)})`);

        if (preds.length > 1) {
          lines.push('Các khả năng khác:');
          for (let i = 1; i < preds.length; i++) {
            const p = preds[i];
            if (p && p.label) lines.push(`- ${toVi(p.label)} (${fmtPct(p.score)})`);
          }
        }

        const diseaseName = toVi(top?.label);
        lines.push('');
        lines.push(`Bạn có thể hỏi thêm về "${diseaseName}":`);
        lines.push('• Triệu chứng là gì?');
        lines.push('• Nguyên nhân do đâu?');
        lines.push('• Cách điều trị như thế nào?');
        lines.push('• Phòng ngừa ra sao?');
      } else {
        lines.push('- Không có kết quả phù hợp.');
      }

      const text = lines.join('\n');
      setMessages((v) => v.concat({ role: 'assistant', content: text }));
    } catch (e) {
      console.error('handleImageResult error', e);
      setMessages((v) => v.concat({ role: 'assistant', content: 'Không thể xử lý kết quả ảnh. Vui lòng thử lại.' }));
    }
  }

  // Mở picker từ icon camera trong ChatInputBar
  function onPickImage() {
    if (uploaderRef.current && uploaderRef.current.openPicker) {
      uploaderRef.current.openPicker();
    }
  }

  // Nhận danh sách ảnh đã chọn (thumbnail)
  function onPicked(list) {
    const withIds = list.map((it) => ({
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      file: it.file,
      url: it.url, // URL của thumbnail
    }));
    setPickedImages((prev) => prev.concat(withIds));
  }

  // Xóa 1 ảnh (thumbnail)
  function removePicked(id) {
    setPickedImages((prev) => {
      const found = prev.find((x) => x.id === id);
      if (found) { try { URL.revokeObjectURL(found.url); } catch {} } // revoke URL thumbnail
      return prev.filter((x) => x.id !== id);
    });
  }

  // Xóa toàn bộ thumbnail
  function clearAllPicked() {
    setPickedImages((prev) => {
      prev.forEach((it) => { try { URL.revokeObjectURL(it.url); } catch {} }); // revoke URL thumbnail
      return [];
    });
    if (uploaderRef.current && uploaderRef.current.clear) uploaderRef.current.clear();
  }

  return (
    <div className="fixed bottom-5 right-5 z-[2147483647] pointer-events-none">
      {open && (
        <div className="pointer-events-auto w-[360px] h-[520px] bg-white rounded-xl shadow-2xl border border-green-100 flex flex-col overflow-hidden mb-3">
          <ChatHeader onReset={resetSession} onClose={() => setOpen(false)} />

          <ChatMessageList
            messages={messages}
            loading={loading || uploadingImage}
            onMountScroll={(ref) => setScrollRef(ref)}
          />

          {/* Hàng thumbnail (nếu có ảnh đã chọn) */}
          {pickedImages.length > 0 && (
            <div className="px-3 pb-2">
              <div className="flex items-center gap-2 flex-wrap">
                {pickedImages.map((it) => (
                  <div key={it.id} className="relative">
                    <img
                      src={it.url}
                      alt={it.file?.name || 'preview'}
                      className="w-12 h-12 rounded-md object-cover border border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={() => removePicked(it.id)}
                      className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-white border border-gray-300 flex items-center justify-center text-gray-700 hover:bg-gray-100 shadow"
                      title="Xóa"
                      aria-label="Xóa ảnh này"
                    >
                      <FaTimes size={10} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Input ẩn để mở thư viện ảnh */}
          <ImageUploader ref={uploaderRef} onPicked={onPicked} />

          {/* Thanh nhập: bấm Gửi sẽ gửi text + toàn bộ ảnh đã chọn */}
          <ChatInputBar
            input={input}
            setInput={setInput}
            loading={loading || uploadingImage}  // disable nút gửi khi đang upload
            onSend={sendMessage}
            onPickImage={onPickImage}
          />
        </div>
      )}

      <div className="pointer-events-auto">
        <FloatingButton hidden={open} unread={unread} onOpen={() => setOpen(true)} />
      </div>
    </div>
  );
}
