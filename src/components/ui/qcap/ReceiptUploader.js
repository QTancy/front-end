import { useState, useRef } from 'react';
import ReceiptOverlay from './ReceiptOverlay';
import ReceiptDisplay from './ReceiptDisplay';
import { UploadIcon } from '@/icons';
import Image from 'next/image';
import Button from '../buttons/buttons';

export default function ReceiptUploader() {
  const [showOverlay, setShowOverlay] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [confirmedImage, setConfirmedImage] = useState(null);  // <-- state baru
  const [receiptDescription, setReceiptDescription] = useState('');
  const [payment, setPayment] = useState('');
  const [language, setLanguage] = useState('');
  const [showError, setShowError] = useState(false);

  const fileInputRef = useRef(null);

  const isSelectionValid = () => payment && language;

  const handleTakePhoto = () => {
    if (!isSelectionValid()) {
      setShowError(true);
      return;
    }
    setShowOverlay(true);
    setShowError(false);
  };

  const handleRetake = () => {
    if (!isSelectionValid()) {
      setShowError(true);
      return;
    }
    setShowOverlay(true);
    setImagePreview(null);
    handleTakePhoto();
  };

  // Di sini kita terima image dari ReceiptOverlay dan simpan ke confirmedImage
  const handleContinue = (img) => {
    setConfirmedImage(img);
    setShowOverlay(false);
  };

  const handleCloseOverlay = () => {
    setImagePreview(null);
    setShowOverlay(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (!isSelectionValid()) {
      setShowError(true);
      return;
    }
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
        setShowError(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleUploadClick = () => {
    if (!isSelectionValid()) {
      setShowError(true);
      return;
    }
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    if (!isSelectionValid()) {
      setShowError(true);
      return;
    }
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
        setShowError(false);
      };
      reader.readAsDataURL(file);
    }
  };

  // Kalau sudah ada gambar konfirmasi, tampilkan ReceiptDisplay
  if (confirmedImage) {
    return (
      <ReceiptDisplay
        image={confirmedImage}
        onBack={() => setConfirmedImage(null)} // Kembali ke uploader
      />
    );
  }

  // Kalau belum ada gambar konfirmasi, tampilkan uploader
  return (
    <div className="w-full min-h-screen flex flex-col items-center px-4 py-10">
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

      <div className="w-full max-w-5xl flex flex-col md:flex-row gap-8 md:gap-16">
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="flex-[2] bg-[#e6f3fe] border-2 border-dashed border-[#2b91ec] rounded-xl px-6 py-10 flex flex-col items-center justify-center text-center space-y-2 shadow-sm"
        >
          <Image 
            src = {UploadIcon}
            alt='Upload Icon'
          />
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
          <p className="text-xs text-gray-500">Photos must be less than <b>10 MB</b> in size</p>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </div>

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
            <div>
              <label className="text-sm font-semibold block mb-1">Payment</label>
              <div className="flex w-60 rounded-md border border-gray-400 overflow-hidden">
                {['Kredit', 'Debit'].map((method) => (
                  <button
                    key={method}
                    onClick={() => {
                      setPayment(method);
                      setShowError(false);
                    }}
                    className={`flex-1 py-2 font-semibold text-sm transition ${
                      payment === method ? 'bg-[var(--secondary)] text-white' : 'bg-white text-black'
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold block mb-1">Language on Receipt</label>
              <div className="flex w-60 rounded-md border border-gray-400 overflow-hidden">
                {['ID', 'EN'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setLanguage(lang);
                      setShowError(false);
                    }}
                    className={`flex-1 py-2 font-semibold text-sm transition ${
                      language === lang ? 'bg-[var(--secondary)] text-white' : 'bg-white text-black'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-2">
            <button
              onClick={() => {
                setReceiptDescription('');
                setPayment('');
                setLanguage('');
                setShowError(false);
                setImagePreview(null);
              }}
              className="flex-1 bg-[#22d3aa] text-white py-2 rounded-md text-sm font-semibold hover:bg-[#1fb39a] transition"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if (!isSelectionValid()) {
                  setShowError(true);
                  return;
                }
                alert('Send for QRep feature not implemented');
              }}
              className="flex-[2] bg-[var(--secondary)] text-white py-2 rounded-md text-sm font-semibold hover:bg-[#3a5cd6] transition"
            >
              Send for QRep
            </button>
          </div>

          {showError && (
            <p className="text-red-600 text-sm font-medium mt-1">
              Anda belum memilih bahasa dan payment
            </p>
          )}
        </div>
      </div>

      {showOverlay && (
        <ReceiptOverlay
          imagePreview={imagePreview}
          onRetake={handleRetake}
          onContinue={() => handleContinue(imagePreview)}  // Kirim imagePreview ke handleContinue
          onClose={handleCloseOverlay}
        />
      )}
    </div>
  );
}
