import { useState } from "react";
import { UploadCloud, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getCloudinaryAltText, getCloudinaryImageUrl } from "../../utils/cloudinary";

const UploadForm = ({ images, setImages }) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = function(e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = function(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFiles = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith("image/"));
      setImages(prev => [...prev, ...droppedFiles].slice(0, 7)); 
    }
  };

  const handleChange = function(e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const selectedFiles = Array.from(e.target.files).filter(f => f.type.startsWith("image/"));
      setImages(prev => [...prev, ...selectedFiles].slice(0, 7));
    }
  };

  const removeImage = (i) => {
    setImages(images.filter((_, index) => index !== i));
  };

  return (
    <div className="w-full">
      <div 
        className={`relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-3xl transition-all duration-300 ${
          dragActive 
            ? "border-emerald-400 bg-emerald-50/50 scale-[1.02]" 
            : "border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-gray-400"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input 
          id="file-upload" 
          type="file" 
          multiple 
          accept="image/*" 
          onChange={handleChange} 
          className="hidden" 
        />
        <label 
          htmlFor="file-upload" 
          className="flex flex-col items-center justify-center w-full h-full cursor-pointer p-6 text-center"
        >
          <UploadCloud className={`w-12 h-12 mb-3 ${dragActive ? "text-emerald-500" : "text-gray-400"}`} />
          <p className="mb-2 text-sm text-gray-700 font-medium tracking-wide">
            <span className="font-bold text-emerald-600">Click to browse</span> or drag & drop files
          </p>
          <p className="text-xs text-gray-500 font-medium">
            High-res JPG, PNG, WEBP (Max 7 files)
          </p>
        </label>
      </div>

      {images.length > 0 && (
        <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-3">
          <AnimatePresence>
            {images.map((file, i) => {
              const cloudinaryUrl = getCloudinaryImageUrl(file);
              const previewUrl = cloudinaryUrl || URL.createObjectURL(file);
              return (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  key={i} 
                  className="relative aspect-square rounded-2xl overflow-hidden border border-gray-200 group shadow-sm"
                >
                  <img 
                    src={previewUrl} 
                    alt={getCloudinaryAltText(file, "Preview")}
                    className="w-full h-full object-cover" 
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute top-1.5 right-1.5 bg-white text-gray-700 shadow-sm p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-600 hover:bg-red-50"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default UploadForm;
