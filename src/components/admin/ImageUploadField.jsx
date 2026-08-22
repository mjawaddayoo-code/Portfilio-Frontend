import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { UploadCloud, Loader2, ImageOff } from 'lucide-react';
import { uploadImage, getErrorMessage } from '../../services/api';

/**
 * A small image field that supports either pasting a URL directly or
 * uploading a file (which is sent to /api/upload → Cloudinary). Falls back
 * gracefully with a clear message if Cloudinary isn't configured on the
 * backend — the URL field always keeps working either way.
 */
const ImageUploadField = ({ label, value, onChange, rounded = 'rounded-xl', aspect = 'aspect-square', helpText }) => {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadImage(file);
      onChange(url);
      toast.success('Image uploaded');
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  return (
    <div>
      {label && <label className="label-field">{label}</label>}
      <div className="flex items-start gap-4">
        <div className={`relative flex ${aspect} w-24 shrink-0 items-center justify-center overflow-hidden ${rounded} border border-line bg-gradient-brand-soft`}>
          {value ? (
            <img src={value} alt="" className="h-full w-full object-cover" />
          ) : (
            <ImageOff className="h-6 w-6 text-indigo-300" />
          )}
          {uploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/70">
              <Loader2 className="h-5 w-5 animate-spin text-indigo-500" />
            </div>
          )}
        </div>
        <div className="flex-1 space-y-2">
          <input
            className="input-field"
            placeholder="https://…"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
          />
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              className="btn-secondary !py-1.5 text-xs"
            >
              <UploadCloud className="h-3.5 w-3.5" /> {uploading ? 'Uploading…' : 'Upload image'}
            </button>
            <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
          </div>
          {helpText && <p className="text-xs text-muted">{helpText}</p>}
        </div>
      </div>
    </div>
  );
};

export default ImageUploadField;
