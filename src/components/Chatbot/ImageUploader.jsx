import React, { useRef, useState, forwardRef, useImperativeHandle } from 'react';

function ImageUploaderImpl({ onResult, onPicked, sessionId }, ref) {
  const inputRef = useRef(null);
  const [fileObj, setFileObj] = useState(null);

  // Expose cho component cha gọi mở picker / clear
  useImperativeHandle(ref, function () {
    return {
      openPicker: function () {
        if (inputRef.current) inputRef.current.click();
      },
      clear: function () {
        if (inputRef.current) inputRef.current.value = '';
        setFileObj(null);
      },
      // Cho phép cha trigger upload thủ công nếu muốn (dùng file đang giữ)
      uploadSelected: async function () {
        if (!fileObj) return null;
        return await uploadImage(fileObj);
      },
    };
  });

  function onFileChange(e) {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    if (!f.type || !f.type.startsWith('image/')) {
      alert('Vui lòng chọn file ảnh hợp lệ');
      return;
    }
    setFileObj(f);
    const url = URL.createObjectURL(f);
    if (typeof onPicked === 'function') onPicked(f, url);
  }

  async function uploadImage(file) {
    // Trả về data để cha có thể handle nếu muốn
    const form = new FormData();
    form.append('image', file, file.name);
    form.append('top_k', '3');
    form.append('segment', 'false');
    if (sessionId) form.append('session_id', sessionId);

    const res = await fetch('/api/diagnose-image', { method: 'POST', body: form });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || res.statusText);
    }
    const data = await res.json();
    if (typeof onResult === 'function') onResult(data);
    return data;
  }

  return (
    <div style={{ display: 'none' }}>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={onFileChange}
      />
    </div>
  );
}

export default forwardRef(ImageUploaderImpl);
