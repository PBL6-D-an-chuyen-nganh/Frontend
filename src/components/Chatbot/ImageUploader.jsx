import React, { useRef, forwardRef, useImperativeHandle } from 'react';

function ImageUploaderImpl({ onPicked }, ref) {
  const inputRef = useRef(null);

  useImperativeHandle(ref, () => ({
    openPicker: () => { if (inputRef.current) inputRef.current.click(); },
    clear: () => { if (inputRef.current) inputRef.current.value = ''; },
  }));

  function onFileChange(e) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const valid = files.filter((f) => f.type && f.type.startsWith('image/'));
    if (!valid.length) {
      alert('Vui lòng chọn file ảnh hợp lệ');
      return;
    }
    const picked = valid.map((f) => ({ file: f, url: URL.createObjectURL(f) })); // URL cho thumbnail
    if (typeof onPicked === 'function') onPicked(picked);
  }

  return (
    <div style={{ display: 'none' }}>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={onFileChange}
      />
    </div>
  );
}

export default forwardRef(ImageUploaderImpl);
