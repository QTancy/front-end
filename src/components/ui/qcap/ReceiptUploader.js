import { useState } from 'react';
import ReceiptOverlay from './ReceiptOverlay';

export default function ReceiptUploader() {
  const [showOverlay, setShowOverlay] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [receiptTitle, setReceiptTitle] = useState('');

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

  return (
     <div className="w-full h-full min-h-screen bg-[var(--background-third)] bg-cover bg-center flex justify-center items-center px-4 py-8 overflow-hidden">
    <div className="w-full max-w-3xl flex flex-col gap-5">
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search Your Old Receipt"
        className="w-full rounded-full bg-gray-200 text-sm px-6 py-2 text-gray-700 placeholder:text-gray-500 outline-none"
      />

      {/* Header Row */}
      <div className="flex items-center justify-between">
        <button className="flex items-center space-x-2">
          <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
            <svg
              className="w-4 h-4 text-black"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </div>
          <span className="font-semibold text-[var(--foreground)]">Add New Receipt</span>
        </button>

        <div className="flex space-x-2">
          <button
            className="cursor-pointer px-4 py-2 rounded-md text-sm font-semibold custom-button-primary
            hover:bg-green-600 active:bg-green-800 transition-colors duration-300"
        >
            Cancel
        </button>

        <button
            className="cursor-pointer px-4 py-2 rounded-md text-sm font-semibold custom-button-secondary
            hover:bg-blue-700 active:bg-blue-900 transition-colors duration-300"
        >
            Analyst
        </button>
        </div>
      </div>

      {/* Title Section */}
      <div className="text-center">
        <h1 className="text-xl font-bold">Hallo! This is QCap</h1>
        <h2 className="text-2xl md:text-3xl font-extrabold mt-2">What is Your New Receipt?</h2>
        <p className="text-sm mt-2 color-text-on-background">
          Upload your media or choose take a photo. The first photo will be thumbnail in your
          history. Drag or snap up to 3 image to create multiple receipt in one history
        </p>
      </div>

      {/* Input Title */}
      <input
        type="text"
        placeholder="Write the title of this Receipt"
        value={receiptTitle}
        onChange={(e) => setReceiptTitle(e.target.value)}
        className="w-full border border-gray-400 rounded-xl px-4 py-3 outline-none"
      />

      {/* Upload Box */}
      <div className="border border-gray-400 rounded-xl py-10 flex flex-col items-center space-y-4 text-center bg-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 text-gray-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1M12 12v9m0 0l-3-3m3 3l3-3M12 3v9"
          />
        </svg>
        <p className="font-medium text-lg">Upload Media</p>
        <p className="text-sm text-gray-500">
          Photos must be less than <span className="font-bold">10 MB</span> in size
        </p>

        <div className="flex space-x-4 mt-2">
        <button
            onClick={handleTakePhoto}
            className="cursor-pointer px-4 py-2 rounded-full font-semibold custom-button-primary
            bg-[var(--primary)] text-white hover:bg-green-700 transition-colors duration-300"
        >
            Take a photo
        </button>

        <button
            className="cursor-pointer px-4 py-2 rounded-full font-semibold custom-button-secondary
            hover:bg-blue-700 active:bg-blue-900 transition-colors duration-300"
        >
            Upload
        </button>
        </div>
      </div>

      {/* Overlay modal */}
      {showOverlay && (
        <ReceiptOverlay
          imagePreview={imagePreview}
          onRetake={handleRetake}
          onContinue={handleContinue}
          onClose={handleCloseOverlay}
        />
      )}
    </div>
    </div>
  );
}
