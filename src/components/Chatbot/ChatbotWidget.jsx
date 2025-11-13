import React, { useEffect, useMemo, useRef, useState } from 'react';
import { chatSend, chatReset } from '../../api/chatbot';
import ImageUploader from './ImageUploader';
import ChatHeader from './ChatHeader';
import ChatMessageList from './ChatMessageList';
import ChatInputBar from './ChatInputBar';
import FloatingButton from './FloatingButton';

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Xin chào! Tôi là chatbot y tế. Bạn cần tư vấn gì?' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [unread, setUnread] = useState(false);
  const [scrollRef, setScrollRef] = useState(null);

  // ⬇⬇ Quản lý ảnh đã chọn (để hiện thumbnail và upload)
  const uploaderRef = useRef(null);
  const [pickedFile, setPickedFile] = useState(null);
  const [pickedPreviewUrl, setPickedPreviewUrl] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);

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
    var text = String(input || '').trim();
    if (!text || loading) return;
    setMessages(function (v) { return v.concat({ role: 'user', content: text }); });
    setInput('');
    setLoading(true);
    try {
      const result = await chatSend(text, sessionId);
      const reply = result && result.reply ? result.reply : '';
      if (!open) setUnread(true);
      setMessages(function (v) { return v.concat({ role: 'assistant', content: reply }); });
    } catch (e) {
      console.error(e);
      setMessages(function (v) { return v.concat({ role: 'assistant', content: 'Xin lỗi, có lỗi xảy ra. Vui lòng thử lại!' }); });
    } finally {
      setLoading(false);
    }
  }

  async function resetSession() {
    try { await chatReset(sessionId); } catch (e) { console.warn('reset error', e); }
    setMessages([{ role: 'assistant', content: 'Phiên chat đã đặt lại. Tôi có thể giúp gì cho bạn?' }]);
  }

  function handleImageResult(data) {
    try {
      var preds = data && Array.isArray(data.predictions) ? data.predictions : [];
      function fmtPct(x) { var n = isFinite(x) ? Math.max(0, Math.min(1, x)) : 0; return (n * 100).toFixed(1) + '%'; }
      var lines = ['Kết quả chẩn đoán hình ảnh:'];
      if (preds.length) {
        var top = preds[0];
        if (top && top.label) lines.push('- ' + top.label + ' (độ tin cậy ' + fmtPct(top.score) + ')');
        if (preds.length > 1) {
          lines.push('Các khả năng khác:');
          for (var i = 1; i < preds.length; i++) {
            var p = preds[i]; if (p && p.label) lines.push('- ' + p.label + ' (' + fmtPct(p.score) + ')');
          }
        }
      } else { lines.push('- Không có kết quả phù hợp.'); }
      var article = data && data.article ? data.article : null;
      if (article) {
        function getField(key, fallback) {
          if (article && typeof article.get === 'function') return article.get(key, fallback);
          return article && article[key] != null ? article[key] : (fallback || '');
        }
        var title = getField('title', '—'); var url = getField('url', '');
        lines.push(''); lines.push(url ? 'Bài viết liên quan: ' + title + ' (' + url + ')' : 'Bài viết liên quan: ' + title);
      }
      var text = lines.join('\n');
      setMessages(function (v) { return v.concat({ role: 'assistant', content: text }); });
    } catch (e) {
      console.error('handleImageResult error', e);
      setMessages(function (v) { return v.concat({ role: 'assistant', content: 'Không thể xử lý kết quả ảnh. Vui lòng thử lại.' }); });
    }
  }

  // ⬇⬇ Bấm icon camera ở ChatInputBar -> mở picker
  function onPickImage() {
    if (uploaderRef.current && uploaderRef.current.openPicker) {
      uploaderRef.current.openPicker();
    }
  }

  // Nhận ảnh đã chọn từ ImageUploader để hiện thumbnail
  function onPicked(file, url) {
    setPickedFile(file);
    setPickedPreviewUrl(url);
  }

  // Upload thủ công từ thumbnail (nếu muốn)
  async function uploadPicked() {
    if (!pickedFile) return;
    setUploadingImage(true);
    try {
      const form = new FormData();
      form.append('image', pickedFile, pickedFile.name);
      form.append('top_k', '3');
      form.append('segment', 'false');
      if (sessionId) form.append('session_id', sessionId);

      const res = await fetch('/api/diagnose-image', { method: 'POST', body: form });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || res.statusText);
      }
      const data = await res.json();
      handleImageResult(data);
      // Tuỳ chọn: clear sau upload
      // setPickedFile(null); setPickedPreviewUrl(null);
    } catch (e) {
      console.error(e);
      alert('Lỗi upload: ' + e.message);
    } finally {
      setUploadingImage(false);
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-[2147483647] pointer-events-none">
      {open && (
        <div className="pointer-events-auto w-[360px] h-[520px] bg-white rounded-xl shadow-2xl border border-green-100 flex flex-col overflow-hidden mb-3">
          <ChatHeader
            onReset={resetSession}
            onClose={function () { setOpen(false); }}
          />

          <ChatMessageList
            messages={messages}
            loading={loading}
            onMountScroll={function (ref) { setScrollRef(ref); }}
          />

          {/* ImageUploader ẩn: chỉ để mở picker và trả preview */}
          <ImageUploader
            ref={uploaderRef}
            sessionId={sessionId}
            onResult={function (data) { handleImageResult(data); }}
            onPicked={onPicked}
          />

          {/* Thumbnail (nếu đã chọn) */}
          {pickedPreviewUrl && (
            <div className="px-3 pb-2">
              <div className="flex items-center gap-2">
                <img
                  src={pickedPreviewUrl}
                  alt="preview"
                  className="w-12 h-12 rounded-md object-cover border border-gray-200"
                />
                <button
                  type="button"
                  className="text-xs px-2 py-1 rounded border border-gray-300 hover:bg-gray-50"
                  onClick={function () { setPickedFile(null); setPickedPreviewUrl(null); if (uploaderRef.current && uploaderRef.current.clear) uploaderRef.current.clear(); }}
                >
                  Xóa
                </button>
                <button
                  type="button"
                  className="text-xs px-2 py-1 rounded bg-green-900 text-white hover:bg-green-700 disabled:opacity-60"
                  disabled={uploadingImage}
                  onClick={uploadPicked}
                >
                  {uploadingImage ? 'Đang gửi…' : 'Gửi ảnh'}
                </button>
              </div>
            </div>
          )}

          <ChatInputBar
            input={input}
            setInput={setInput}
            loading={loading}
            onSend={sendMessage}
            onPickImage={onPickImage}  // bấm camera => mở picker
          />
        </div>
      )}

      <div className="pointer-events-auto">
        <FloatingButton hidden={open} unread={unread} onOpen={function () { setOpen(true); }} />
      </div>
    </div>
  );
}
