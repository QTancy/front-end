import { useState } from 'react';
import ReceiptOverlay from './ReceiptOverlay';

export default function ReceiptUploader() {
  const [showOverlay, setShowOverlay] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [receiptDescription, setReceiptDescription] = useState('');
  const [payment, setPayment] = useState('Kredit');
  const [language, setLanguage] = useState('ID');

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
    <div className="w-full min-h-screen bg-[var(--background)] flex justify-center items-center px-4 py-10">
      <div className="w-full max-w-5xl flex flex-col md:flex-row gap-8">
        {/* LEFT SIDE: Upload Box */}
        <div className="flex-1 border-2 border-blue-300 border-dashed rounded-xl bg-white p-8 flex flex-col items-center justify-center text-center space-y-4 shadow-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-14 w-14 text-gray-600"
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
          <p className="text-xl font-bold text-gray-700">Drop file here</p>
          <p className="text-sm text-gray-500">OR</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
  onClick={handleTakePhoto}
  className="bg-[var(--primary)] text-white px-6 py-2 hover:bg-green-700 transition rounded-xl"
>
  Take a photo
</button>
            <button
  className="bg-[var(--secondary)] text-white px-6 py-2 hover:bg-blue-700 transition rounded-xl"
>
  Upload
</button>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Photos must be less than <span className="font-bold">10 MB</span> in size
          </p>
        </div>

        {/* RIGHT SIDE: Basic Info */}
        <div className="flex-1">
          <div className="mb-6 space-y-2">
            <h1 className="text-2xl font-extrabold text-[var(--primary)]">Hallo! This is QCap</h1>
            <h2 className="text-xl font-bold text-gray-800">What is Your New Receipt?</h2>
            <p className="text-sm text-gray-500">
              Upload your media or choose take a photo. The first photo will be thumbnail in your
              history. Drag or snap up to 3 images to create multiple receipt in one history.
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="text-sm font-semibold block mb-1">Description (Optional)</label>
              <input
                type="text"
                placeholder="Add details"
                value={receiptDescription}
                onChange={(e) => setReceiptDescription(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition"
              />
            </div>

            {/* Payment & Language Toggle in One Row */}
<div className="flex gap-6">
  {/* Payment */}
  <div>
    <label className="text-sm font-bold block mb-1">Payment</label>
    <div className="flex w-60 rounded-xl border border-gray-400 overflow-hidden">
      {['Kredit', 'Debit'].map((method) => (
        <button
          key={method}
          onClick={() => setPayment(method)}
          className={`flex-1 py-2 font-bold transition ${
            payment === method
              ? 'bg-blue-600 text-white'
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
    <label className="text-sm font-bold block mb-1">Language on Receipt</label>
    <div className="flex w-60 rounded-xl border border-gray-400 overflow-hidden">
      {['ID', 'EN'].map((lang) => (
        <button
          key={lang}
          onClick={() => setLanguage(lang)}
          className={`flex-1 py-2 font-bold transition ${
            language === lang
              ? 'bg-blue-600 text-white'
              : 'bg-white text-black'
          }`}
        >
          {lang}
        </button>
      ))}
    </div>
  </div>
</div>


            <div className="flex gap-4 pt-4">
              <button className="flex-1 bg-gray-300 text-gray-700 py-2 hover:bg-gray-400 transition rounded-xl">
                Cancel
              </button>
              <button className="flex-1 bg-[var(--secondary)] text-white py-2 hover:bg-blue-700 transition rounded-xl">
                Send for QRep
              </button>
            </div>
          </div>
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
  );
}
