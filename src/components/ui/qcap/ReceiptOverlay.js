import Image from 'next/image';
import { useState, useEffect, useCallback, useRef } from 'react';
import Webcam from 'react-webcam';

export default function ReceiptOverlay({ imagePreview, onRetake, onContinue, onClose }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isWebcamReady, setIsWebcamReady] = useState(false);

  const webcamRef = useRef(null);

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "environment"
  };

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const openCamera = () => {
    setCapturedImage(null);
    setIsWebcamReady(false);
    setIsCameraOpen(true);
  };

  const closeCamera = () => {
    setIsCameraOpen(false);
    setIsWebcamReady(false);
  };

  const handleUserMedia = () => {
    setIsWebcamReady(true);
  };

  const handleUserMediaError = (error) => {
    console.error("Webcam: User media error", error);
    setIsWebcamReady(false);
    alert("Tidak dapat mengakses kamera: " + error.name + ". Pastikan izin diberikan.");
    setIsCameraOpen(false);
  };

  const downloadImage = (imageSrc, filename = 'receipt-photo.jpeg') => {
    if (!imageSrc) {
      alert("Tidak ada gambar untuk diunduh.");
      return;
    }
    const link = document.createElement('a');
    link.href = imageSrc;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); 
    console.log("Download :", filename);
  };

  const capture = useCallback(() => {
    if (webcamRef.current && isWebcamReady) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        setCapturedImage(imageSrc);
      } else {
        alert("Gagal mengambil foto. Coba lagi.");
      }
    } else {
      alert("Kamera belum siap atau referensi tidak tersedia.");
    }
  }, [webcamRef, isWebcamReady]);

  const handleInternalRetake = () => {
    setCapturedImage(null);
    if (!isCameraOpen) {
      openCamera();
    }
    if (typeof onRetake === 'function') {
      onRetake();
    }
  };

  const handleInternalContinue = () => {
    if (capturedImage) {
      onContinue(capturedImage);
    } else if (imagePreview) {
      onContinue(imagePreview);
    } else {
      alert("Tidak ada foto untuk dilanjutkan.");
    }
  };

  return (
   <>
      <div
        className="fixed inset-0 z-40 bg-black bg-opacity-40 backdrop-blur-sm"
        onClick={() => {
          if (isCameraOpen) closeCamera();
          onClose();
        }}
      />
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 max-h-[90vh] bg-[var(--background)] rounded-t-3xl p-6 shadow-2xl overflow-auto transform transition-transform duration-1000 ${
          isVisible ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ maxWidth: '600px', margin: '0 auto' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-4"></div>

        <div className="flex justify-center mb-4 bg-gray-200 dark:bg-gray-800 rounded-lg min-h-[250px] items-center">
          {capturedImage ? (
            <Image
              src={capturedImage}
              width={720}
              height={1280}
              alt="Preview foto yang diambil"
              className="w-full max-h-[60vh] object-contain rounded-lg"
            />
          ) : isCameraOpen ? (
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              className="w-full max-h-[60vh] object-contain"
              onUserMedia={handleUserMedia}
              onUserMediaError={handleUserMediaError}
              mirrored={videoConstraints.facingMode === "user"}
            />
          ) : (
            <div className="w-full h-64 flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Preview Kamera
            </div>
          )}
        </div>

        {isCameraOpen && !capturedImage && (
            <p className="text-center text-xs text-gray-500 dark:text-gray-400 mb-2">
                {isWebcamReady ? "Kamera siap." : "Menunggu izin kamera..."}
            </p>
        )}

        <div className="mt-6 flex justify-between items-center"> 
          <button
            onClick={capturedImage ? handleInternalRetake : closeCamera }
            className="cursor-pointer rounded bg-[var(--primary)] px-6 py-2 text-white hover:bg-green-600 active:bg-green-800 transition-colors duration-300"
          >
            {capturedImage ? 'Retake' : (isCameraOpen ? 'Cancel' : 'Retake')}
          </button>

          {/* Tombol Download hanya jika ada gambar yang diambil */}
          {capturedImage && (
            <button
              onClick={() => downloadImage(capturedImage, `receipt-${Date.now()}.jpeg`)}
              className="cursor-pointer rounded bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600 active:bg-yellow-700 transition-colors duration-300 mx-2"
            >
              Unduh
            </button>
          )}

          <button
            onClick={handleInternalContinue}
            className="cursor-pointer rounded bg-[var(--secondary)] px-6 py-2 text-white hover:bg-blue-700 active:bg-blue-900 transition-colors duration-300"
            disabled={!capturedImage && !imagePreview}
          >
            Lanjutkan
          </button>
        </div>

        <div className="flex justify-center mt-4 space-x-4">
          {!capturedImage && (
            <button
              onClick={isCameraOpen ? closeCamera : openCamera}
              className="cursor-pointer rounded bg-green-500 px-6 py-2 text-white hover:bg-green-600 active:bg-green-700 transition-colors duration-300"
            >
              {isCameraOpen ? 'Close Camera' : 'Open Camera'}
            </button>
          )}

          {isCameraOpen && !capturedImage && (
            <button
              onClick={capture}
              disabled={!isWebcamReady}
              className="cursor-pointer rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 active:bg-blue-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Ambil Foto
            </button>
          )}
        </div>
      </div>
    </>
  );
}