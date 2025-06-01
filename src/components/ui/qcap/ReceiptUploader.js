import { useState, useRef } from 'react';
import ReceiptOverlay from './ReceiptOverlay';

export default function ReceiptUploader() {
  const [showOverlay, setShowOverlay] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [receiptDescription, setReceiptDescription] = useState('');
  const [payment, setPayment] = useState('Kredit');
  const [language, setLanguage] = useState('ID');

  const fileInputRef = useRef(null);

  const handleTakePhoto = () => {
    setShowOverlay(true);
  };

  const handleRetake = () => {
    setShowOverlay(true);
    setImagePreview(null);
    handleTakePhoto();
  };

  const handleContinue = () => {
    alert('Lanjutkan dengan proses upload atau analisis');
  };

  const handleCloseOverlay = () => {
    setShowOverlay(false);
  };

  // Handler tambahan untuk drag and drop
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      if (file.size > 10 * 1024 * 1024) {
        alert('Ukuran gambar melebihi 10MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setShowOverlay(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Handler untuk tombol Upload: buka file dialog
  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Handler saat user memilih file lewat dialog Upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      if (file.size > 10 * 1024 * 1024) {
        alert('Ukuran gambar melebihi 10MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setShowOverlay(true);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#dcfaf8] flex flex-col items-center px-4 py-10">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-xl font-bold text-black">
          Hallo! This is <span className="font-extrabold">QCap</span>
        </h1>
        <h2 className="text-3xl font-extrabold mt-2 text-black">What is Your New Receipt?</h2>
        <p className="text-sm text-gray-700 mt-1">
          Upload your media or choose take a photo. The first photo will be
          <br className="hidden sm:block" />
          thumbnail in your history. Drag or snap up to 3 image to create multiple
          <br className="hidden sm:block" />
          receipt in one history
        </p>
      </div>

      {/* Upload + Basic Info */}
      <div className="w-full max-w-5xl flex flex-col md:flex-row gap-8 md:gap-16">
        {/* Left Upload Box */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="flex-[2] bg-[#e6f3fe] border-2 border-dashed border-[#2b91ec] rounded-xl px-6 py-10 flex flex-col items-center justify-center text-center space-y-2 shadow-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-black"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1M12 12v9m0 0l-3-3m3 3l3-3M12 3v9"
            />
          </svg>
          <p className="text-base font-semibold text-black">Drop file here</p>
          <p className="text-sm text-gray-600">OR</p>
          <div className="flex gap-4">
            <button
              onClick={handleTakePhoto}
              className="w-30 bg-[#22d3aa] text-white py-2 rounded-md text-sm font-semibold hover:bg-[#1fb39a] transition"
            >
              Take a photo
            </button>
            <button
              onClick={handleUploadClick}
              className="w-30 bg-[var(--secondary)] text-white py-2 rounded-md text-sm font-semibold hover:bg-blue-700 transition"
            >
              Upload
            </button>
          </div>
          <p className="text-xs text-gray-500">
            Photos must be less than <b>10 MB</b> in size
          </p>

          {/* Hidden file input */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </div>

        {/* Right Info Form */}
        <div className="flex-1 space-y-3">
          <h3 className="text-2xl font-bold text-black mt-2 mb-2">Basic Info</h3>

          <div>
            <label className="text-sm font-semibold block mb-1">
              Description <span className="text-gray-400">(Optional)</span>
            </label>
            <input
              type="text"
              placeholder="Add details"
              value={receiptDescription}
              onChange={(e) => setReceiptDescription(e.target.value)}
              className="w-full mt-1 px-4 py-3.5 rounded-md border border-gray-300 bg-white text-center focus:outline-none focus:ring-2 focus:ring-secondary text-sm"
            />
          </div>

          <div className="flex gap-6">
            {/* Payment */}
            <div>
              <label className="text-sm font-semibold block mb-1">Payment</label>
              <div className="flex w-60 rounded-md border border-gray-400 overflow-hidden">
                {['Kredit', 'Debit'].map((method) => (
                  <button
                    key={method}
                    onClick={() => setPayment(method)}
                    className={`flex-1 py-2 font-semibold text-sm transition ${
                      payment === method
                        ? 'bg-[var(--secondary)] text-white'
                        : 'bg-white text-black'
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>

            {/* Language */}
            <div>
              <label className="text-sm font-semibold block mb-1">Language on Receipt</label>
              <div className="flex w-60 rounded-md border border-gray-400 overflow-hidden">
                {['ID', 'EN'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`flex-1 py-2 font-semibold text-sm transition ${
                      language === lang
                        ? 'bg-[var(--secondary)] text-white'
                        : 'bg-white text-black'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-2">
            <button className="flex-1 bg-[#22d3aa] text-white py-2 rounded-md text-sm font-semibold hover:bg-[#1fb39a] transition">
              Cancel
            </button>
            <button className="flex-[2] bg-[var(--secondary)] text-white py-2 rounded-md text-sm font-semibold hover:bg-[#3a5cd6] transition">
              Send for QRep
            </button>
          </div>
        </div>
      </div>

      {/* Overlay Modal */}
      {showOverlay && (
        <ReceiptOverlay
          imagePreview={imagePreview}
          onRetake={handleRetake}
          onContinue={handleContinue}
          onClose={handleCloseOverlay}
        />
      )}
    </div>
  );
}
