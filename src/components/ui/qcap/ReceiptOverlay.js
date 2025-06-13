import Image from 'next/image';
import { useState, useEffect, useCallback, useRef } from 'react';
import Webcam from 'react-webcam';
import Tesseract from 'tesseract.js';

export default function ReceiptOverlay({ imagePreview, onRetake, onContinue, onClose }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isWebcamReady, setIsWebcamReady] = useState(false);
  const [checkingReceipt, setCheckingReceipt] = useState(false);
  const [isReceiptReadable, setIsReceiptReadable] = useState(false);

  const webcamRef = useRef(null);

  const videoConstraints = {
    width: { ideal: 1280 },
    height: { ideal: 720 },
    facingMode: 'environment',
  };

  const resetCaptureState = useCallback(() => {
    setCapturedImage(null);
    setIsReceiptReadable(false);
  }, []);

  const checkIfReceipt = useCallback(async (image) => {
    setCheckingReceipt(true);
    setIsReceiptReadable(false);
    try {
      console.log("Starting OCR for image:", image ? "Image data available" : "No image data");
      const { data: { text, confidence, words } } = await Tesseract.recognize(
        image,
        'eng+ind',
        { logger: m => console.log(m) }
      );

      console.log("OCR Raw Text Output:");
      console.log(text);
      console.log("OCR Confidence:", confidence);

      const lowerCaseText = text.toLowerCase();

      const commonReceiptKeywords = [
        'total', 'subtotal', 'grandtotal', 'nettotal', 'gtotal',
        'amount', 'total harga', 'harga total', 'jumlah total',
        'cash', 'change', 'kembalian', 'kembali', 'tunai', 'bayar', 'paid', 'due',
        'invoice', 'bill', 'receipt', 'struk', 'faktur',
        'pajak', 'tax', 'ppn', 'pb1',
        'service', 'svc', 'charge', 'svc chrg', 'layanan', 'biaya layanan',
        'discount', 'diskon', 'potongan',
        'harga', 'price', 'qty', 'jumlah', 'unit', 'x',
        'rp\\s*\\d+',
        'idr\\s*\\d+',
        'terima kasih', 'thank you',
        'resto', 'restaurant', 'cafe', 'toko', 'store',
        'tanggal', 'date', 'waktu', 'time',
        'item', 'menu', 'produk',
      ];

      const receiptKeywordsRegex = new RegExp(
        '\\b(?:' + commonReceiptKeywords.join('|') + ')\\b|sub\\s*total|grand\\s*total|svc\\s*chrg|harga\\s*total|jumlah\\s*total|biaya\\s*layanan|terima\\s*kasih|thank\\s*you|rp\\s*\\d+|idr\\s*\\d+',
        'i'
      );

      const moneyFormatRegex = /\b\d{1,3}(?:[.,\s]?\d{3})*(?:[.,]\d{1,2})?\b/g;

      const hasReceiptKeywords = receiptKeywordsRegex.test(lowerCaseText);
      const hasMoneyFormats = moneyFormatRegex.test(lowerCaseText);

      const lines = text.split('\n').filter(line => line.trim().length > 0);
      const isLongEnough = lines.length > 5;

      let isReceiptLike = (hasReceiptKeywords && hasMoneyFormats) || (hasMoneyFormats && isLongEnough && confidence > 30);
      if (confidence > 30 && hasMoneyFormats) {
        isReceiptLike = true;
      }

      const isReadable = confidence > 30;

      console.log("hasReceiptKeywords:", hasReceiptKeywords);
      console.log("hasMoneyFormats:", hasMoneyFormats);
      console.log("isLongEnough:", isLongEnough);
      console.log("Final isReceiptLike:", isReceiptLike);
      console.log("isReadable:", isReadable);
      console.log("Confidence:", confidence);

      if (isReceiptLike && isReadable) {
        setIsReceiptReadable(true);
      } else {
        alert("Gambar tidak dikenali sebagai struk atau kurang terbaca. Silakan ambil ulang.");
        resetCaptureState();
      }
    } catch (error) {
      console.error('OCR Error:', error);
      alert("Terjadi kesalahan saat memproses gambar. Silakan coba lagi.");
      resetCaptureState();
    } finally {
      setCheckingReceipt(false);
    }
  }, [resetCaptureState]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (imagePreview && !capturedImage) {
      checkIfReceipt(imagePreview);
    }
  }, [imagePreview, capturedImage, checkIfReceipt]);

  const openCamera = () => {
    resetCaptureState();
    setIsWebcamReady(false);
    setIsCameraOpen(true);
  };

  const closeCamera = () => {
    setIsCameraOpen(false);
    setIsWebcamReady(false);
    resetCaptureState();
  };

  const handleUserMedia = () => {
    setIsWebcamReady(true);
  };

  const handleUserMediaError = (error) => {
    console.error('Webcam: User media error', error);
    setIsWebcamReady(false);
    alert('Tidak dapat mengakses kamera: ' + error.name + '. Pastikan izin diberikan.');
    setIsCameraOpen(false);
  };

  const downloadImage = (imageSrc, filename = 'receipt-photo.jpeg') => {
    if (!imageSrc) {
      alert('Tidak ada gambar untuk diunduh.');
      return;
    }
    const link = document.createElement('a');
    link.href = imageSrc;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const capture = useCallback(async () => {
    if (webcamRef.current && isWebcamReady) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        setCapturedImage(imageSrc);
        await checkIfReceipt(imageSrc);
      } else {
        alert('Gagal mengambil foto. Coba lagi.');
      }
    } else {
      alert('Kamera belum siap atau referensi tidak tersedia.');
    }
  }, [isWebcamReady, checkIfReceipt]);

  const handleInternalRetake = () => {
    resetCaptureState();
    if (!isCameraOpen && !imagePreview) {
      openCamera();
    }
    if (typeof onRetake === 'function') {
      onRetake();
    }
  };

  const handleCloseOverlay = () => {
    resetCaptureState();
    if (isCameraOpen) {
      closeCamera();
    }
    if (typeof onClose === 'function') {
      onClose();
    }
  };

  const handleInternalContinue = () => {
    const image = capturedImage || imagePreview;
    if (image) {
      if (typeof onContinue === 'function') {
        onContinue(image);
      }
      handleCloseOverlay();
    } else {
      alert('Tidak ada foto untuk dilanjutkan.');
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black bg-opacity-40 backdrop-blur-sm"
        onClick={handleCloseOverlay}
      />
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 bg-[var(--background)] rounded-t-3xl p-4 sm:p-6 shadow-2xl transform transition-transform duration-1000 
          ${isVisible ? 'translate-y-0' : 'translate-y-full'} 
          h-auto max-h-[95vh] w-full max-w-lg mx-auto md:max-w-xl lg:max-w-2xl overflow-y-auto`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Tombol silang close */}
        <button
          onClick={handleCloseOverlay}
          aria-label="Close"
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-2xl sm:text-3xl"
          style={{ lineHeight: 1, background: 'transparent', border: 'none', cursor: 'pointer' }}
        >
          &#x2715;
        </button>

        {/* Garis kecil atas */}
        <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-4 sm:mb-6" />

        {/* Area preview gambar / kamera */}
        <div className="flex justify-center mb-4 sm:mb-6 bg-gray-200 dark:bg-gray-800 rounded-lg h-64 sm:h-80 md:h-96 items-center relative overflow-hidden">
          {capturedImage || imagePreview ? (
            <Image
              src={capturedImage || imagePreview}
              alt="Preview foto yang diambil"
              fill
              className="object-contain rounded-lg"
            />
          ) : isCameraOpen ? (
            <div className="relative w-full h-full">
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
                className="w-full h-full object-cover rounded-lg"
                onUserMedia={handleUserMedia}
                onUserMediaError={handleUserMediaError}
              />
              {/* Garis bantu kamera */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute border-2 border-dashed border-white top-[10%] left-[10%] w-[80%] h-[80%] rounded-md" />
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 text-sm sm:text-base">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 sm:h-12 sm:w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Preview Kamera
            </div>
          )}
        </div>

        {/* Status teks (kamera, OCR) */}
        <p className="text-center text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-2">
          {isCameraOpen && !capturedImage ? "Kamera siap." : !isCameraOpen && !capturedImage && !imagePreview ? "Kamera belum terbuka." : capturedImage || imagePreview ? "" : "Menunggu izin kamera..."}
        </p>

        {checkingReceipt && (
          <p className="text-center text-xs sm:text-sm text-yellow-500 dark:text-yellow-400 mb-2 animate-pulse">
            Mengecek apakah ini struk dan bisa dibaca...
          </p>
        )}
        {!checkingReceipt && isReceiptReadable && (
          <p className="text-center text-xs sm:text-sm text-green-600 dark:text-green-400 mb-2 animate-pulse">
            Struk terbaca dengan baik ✅
          </p>
        )}
        {/* Tambahan: Pesan error jika tidak terbaca */}
        {!checkingReceipt && !isReceiptReadable && (capturedImage || imagePreview) && (
          <p className="text-center text-xs sm:text-sm text-red-500 dark:text-red-400 mb-2">
            Gambar tidak dikenali sebagai struk atau kurang terbaca. Silakan ambil ulang.
          </p>
        )}


        <div className="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
            {/* Tombol open/close kamera */}
            {!capturedImage && !imagePreview && (
              <button
                onClick={isCameraOpen ? closeCamera : openCamera}
                className="text-xs sm:text-sm cursor-pointer rounded bg-[#22d3aa] px-3 py-2 sm:px-5 sm:py-2 text-white hover:bg-[#1fb39a] active:bg-[#1fb39a] transition-colors duration-300 w-full sm:w-auto flex-1"
              >
                {isCameraOpen ? 'Close Camera' : 'Open Camera'}
              </button>
            )}

            {/* Tombol ambil foto */}
            {isCameraOpen && !capturedImage && (
              <button
                onClick={capture}
                disabled={!isWebcamReady}
                className="text-xs sm:text-sm cursor-pointer rounded bg-blue-500 px-3 py-2 sm:px-5 sm:py-2 text-white hover:bg-blue-600 active:bg-blue-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto flex-1"
              >
                Take photo
              </button>
            )}

            {/* Tombol unduh */}
            {capturedImage && (
              <button
                onClick={() => downloadImage(capturedImage, `receipt-${Date.now()}.jpeg`)}
                className="text-xs sm:text-sm cursor-pointer rounded bg-yellow-500 px-3 py-2 sm:px-5 sm:py-2 text-white hover:bg-yellow-600 active:bg-yellow-700 transition-colors duration-300 w-full sm:w-auto flex-1"
              >
                Unduh
              </button>
            )}
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
            {/* Tombol ambil ulang */}
            <button
              onClick={handleInternalRetake}
              className="text-sm rounded bg-gray-300 dark:bg-gray-700 px-4 py-2 hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors duration-300 w-full sm:w-auto flex-1"
            >
              Ambil Ulang
            </button>
            {/* Tombol lanjutkan */}
            <button
              onClick={handleInternalContinue}
              disabled={!isReceiptReadable || checkingReceipt}
              className={`text-sm rounded px-4 py-2 text-white transition-colors duration-300 w-full sm:w-auto flex-1 ${
                !isReceiptReadable || checkingReceipt
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700 active:bg-green-800'
              }`}
            >
              Lanjutkan
            </button>
          </div>
        </div>
      </div>
    </>
  );
}