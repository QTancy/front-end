// import Image from 'next/image';
// import { useState, useEffect, useCallback, useRef } from 'react';
// import Webcam from 'react-webcam';
// import Tesseract from 'tesseract.js';
// import ReceiptDisplay from './ReceiptDisplay'; 

// export default function ReceiptOverlay({ imagePreview, onRetake, onContinue, onClose }) {
//   const [isVisible, setIsVisible] = useState(false);
//   const [isCameraOpen, setIsCameraOpen] = useState(false);
//   const [capturedImage, setCapturedImage] = useState(null);
//   const [isWebcamReady, setIsWebcamReady] = useState(false);
//   const [checkingReceipt, setCheckingReceipt] = useState(false);
//   const [isReceiptReadable, setIsReceiptReadable] = useState(false);
//   const [showReceiptDisplay, setShowReceiptDisplay] = useState(false);
//   const [imageToDisplay, setImageToDisplay] = useState(null);

//   const webcamRef = useRef(null);

//   const videoConstraints = {
//     width: 1280,
//     height: 720,
//     facingMode: 'environment',
//   };

//   const resetCaptureState = useCallback(() => {
//     setCapturedImage(null);
//     setIsReceiptReadable(false);
//   }, []);

//   const checkIfReceipt = useCallback(async (image) => {
//     setCheckingReceipt(true);
//     setIsReceiptReadable(false);
//     try {
//       const { data: { text, confidence } } = await Tesseract.recognize(
//         image,
//         'eng+ind',
//         { logger: m => console.log(m) }
//       );

//       const receiptKeywordsRegex = new RegExp(
//         'total|amount|change|invoice|cash|harga|kembalian|subtotal|sub\\s*total|grandtotal|pajak|service|tax|discount|pb1|svc\\s*chrg|tunai|due|kembali|rp\\s*\\d+|qty|jumlah',
//         'i' // 'i' untuk case-insensitive
//     );

//       const isReceiptLike = receiptKeywordsRegex.test(text);
//       const isReadable = confidence > 30;
//       console.log("isReceiptLike",isReceiptLike);
//       console.log("isReadable",isReadable);
//       console.log("Confidence",confidence);

//       if (isReceiptLike && isReadable) {
//         setIsReceiptReadable(true);
//       } else {
//         alert("Gambar tidak dikenali sebagai struk atau kurang terbaca. Silakan ambil ulang.");
//         resetCaptureState();
//       }
//     } catch (error) {
//       console.error('OCR Error:', error);
//       alert("Terjadi kesalahan saat memproses gambar. Silakan coba lagi.");
//       resetCaptureState();
//     } finally {
//       setCheckingReceipt(false);
//     }
//   }, [resetCaptureState]);

//   useEffect(() => {
//     setIsVisible(true);
//   }, []);

//   useEffect(() => {
//     if (imagePreview && !capturedImage) {
//       checkIfReceipt(imagePreview);
//     }
//   }, [imagePreview, capturedImage, checkIfReceipt]);

//   const openCamera = () => {
//     resetCaptureState();
//     setIsWebcamReady(false);
//     setIsCameraOpen(true);
//   };

//   const closeCamera = () => {
//     setIsCameraOpen(false);
//     setIsWebcamReady(false);
//     resetCaptureState();
//   };

//   const handleUserMedia = () => {
//     setIsWebcamReady(true);
//   };

//   const handleUserMediaError = (error) => {
//     console.error('Webcam: User media error', error);
//     setIsWebcamReady(false);
//     alert('Tidak dapat mengakses kamera: ' + error.name + '. Pastikan izin diberikan.');
//     setIsCameraOpen(false);
//   };

//   const downloadImage = (imageSrc, filename = 'receipt-photo.jpeg') => {
//     if (!imageSrc) {
//       alert('Tidak ada gambar untuk diunduh.');
//       return;
//     }
//     const link = document.createElement('a');
//     link.href = imageSrc;
//     link.download = filename;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   const capture = useCallback(async () => {
//     if (webcamRef.current && isWebcamReady) {
//       const imageSrc = webcamRef.current.getScreenshot();
//       if (imageSrc) {
//         setCapturedImage(imageSrc);
//         await checkIfReceipt(imageSrc);
//       } else {
//         alert('Gagal mengambil foto. Coba lagi.');
//       }
//     } else {
//       alert('Kamera belum siap atau referensi tidak tersedia.');
//     }
//   }, [isWebcamReady, checkIfReceipt]);

//   const handleInternalRetake = () => {
//     resetCaptureState();
//     if (!isCameraOpen) {
//       openCamera();
//     }
//     if (typeof onRetake === 'function') {
//       onRetake();
//     }
//   };

//   const handleCloseOverlay = () => {
//     resetCaptureState();
//     if (isCameraOpen) {
//       closeCamera();
//     }
//     if (typeof onClose === 'function') {
//       onClose();
//     }
//   };

//   const handleInternalContinue = () => {
//     const image = capturedImage || imagePreview;
//     if (image) {
//       setImageToDisplay(image);
//       setShowReceiptDisplay(true);
//       if (typeof onContinue === 'function') {
//         onContinue(image);
//       }
//     } else {
//       alert('Tidak ada foto untuk dilanjutkan.');
//     }
//   };

//   if (showReceiptDisplay) {
//     return (
//       <ReceiptDisplay
//         image={imageToDisplay}
//         onBack={() => setShowReceiptDisplay(false)}
//       />
//     );
//   }
  
//   return (
//     <>
//       <div
//         className="fixed inset-0 z-40 bg-black bg-opacity-40 backdrop-blur-sm"
//         onClick={handleCloseOverlay}
//       />
//       <div
//         className={`fixed bottom-0 left-0 right-0 z-50 max-h-[90vh] bg-[var(--background)] rounded-t-3xl p-6 shadow-2xl overflow-auto transform transition-transform duration-1000 ${
//           isVisible ? 'translate-y-0' : 'translate-y-full'
//         }`}
//         style={{ maxWidth: '1000px' , margin: '0 auto' }}
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* Tombol silang close */}
//         <button
//           onClick={handleCloseOverlay}
//           aria-label="Close"
//           className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
//           style={{ fontSize: '1.5rem', lineHeight: 1, background: 'transparent', border: 'none', cursor: 'pointer' }}
//         >
//           &#x2715;
//         </button>

//         {/* Garis kecil atas */}
//         <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-4" />

//         {/* Area preview gambar / kamera */}
//         <div className="flex justify-center mb-4 bg-gray-200 dark:bg-gray-800 rounded-lg h-full items-center relative">
//           {capturedImage || imagePreview ? (
//             <Image
//               src={capturedImage || imagePreview}
//               width={720}
//               height={1280}
//               alt="Preview foto yang diambil"
//               className="w-full h-full object-contain rounded-lg"
//             />
//           ) : isCameraOpen ? (
//             <div className="relative w-full h-full object-contain">
//               <Webcam
//                 audio={false}
//                 ref={webcamRef}
//                 screenshotFormat="image/jpeg"
//                 videoConstraints={videoConstraints}
//                 className="w-full h-full object-contain rounded-lg"
//                 onUserMedia={handleUserMedia}
//                 onUserMediaError={handleUserMediaError}
//               />
//               {/* Garis bantu kamera */}
//               <div className="absolute inset-0 pointer-events-none">
//                 <div className="absolute border-2 border-dashed border-white top-[10%] left-[10%] w-[80%] h-[80%] rounded-md" />
//               </div>
//             </div>
//           ) : (
//             <div className="w-full h-64 flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
//               </svg>
//               Preview Kamera
//             </div>
//           )}
//         </div>

//         {/* Status kamera */}
//         {isCameraOpen && !capturedImage && (
//           <p className="text-center text-xs text-gray-500 dark:text-gray-400 mb-2">
//             {isWebcamReady ? "Kamera siap." : "Menunggu izin kamera..."}
//           </p>
//         )}

//         {/* Status pengecekan OCR */}
//         {checkingReceipt && (
//           <p className="text-center text-xs text-yellow-500 dark:text-yellow-400 mb-2 animate-pulse">
//             Mengecek apakah ini struk dan bisa dibaca...
//           </p>
//         )}

//         {/* Status struk terbaca */}
//         {!checkingReceipt && isReceiptReadable && (
//           <p className="text-center text-xs text-green-600 dark:text-green-400 mb-2 animate-pulse">
//             Struk terbaca dengan baik ✅
//           </p>
//         )}

//         <div className="mt-6 space-y-4">
//           <div className="flex flex-wrap justify-center gap-4">
//             {/* Tombol open/close kamera */}
//             {!capturedImage && !imagePreview && (
//               <button
//                 onClick={isCameraOpen ? closeCamera : openCamera}
//                 className="text-sm cursor-pointer rounded bg-[#22d3aa] px-5 py-2 text-white hover:bg-[#1fb39a] active:bg-[#1fb39a] transition-colors duration-300"
//               >
//                 {isCameraOpen ? 'Close Camera' : 'Open Camera'}
//               </button>
//             )}

//             {/* Tombol ambil foto */}
//             {isCameraOpen && !capturedImage && (
//               <button
//                 onClick={() => {
//                   resetCaptureState();
//                   capture();
//                 }}
//                 disabled={!isWebcamReady}
//                 className="text-sm cursor-pointer rounded bg-blue-500 px-5 py-2 text-white hover:bg-blue-600 active:bg-blue-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 Take photo
//               </button>
//             )}

//             {/* Tombol unduh */}
//             {capturedImage && (
//               <button
//                 onClick={() => downloadImage(capturedImage, `receipt-${Date.now()}.jpeg`)}
//                 className="text-sm cursor-pointer rounded bg-yellow-500 px-5 py-2 text-white hover:bg-yellow-600 active:bg-yellow-700 transition-colors duration-300"
//               >
//                 Unduh
//               </button>
//             )}
//           </div>

//           <div className="flex justify-between items-center">
//             {/* Tombol ambil ulang */}
//             <button
//               onClick={handleInternalRetake}
//               className="text-sm rounded bg-gray-300 dark:bg-gray-700 px-4 py-2 hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors duration-300"
//             >
//               Ambil Ulang
//             </button>
//             {/* Tombol lanjutkan */}
//             <button
//               onClick={handleInternalContinue}
//               disabled={!isReceiptReadable || checkingReceipt}
//               className={`text-sm rounded px-4 py-2 text-white transition-colors duration-300 ${
//                 !isReceiptReadable || checkingReceipt
//                   ? 'bg-gray-400 cursor-not-allowed'
//                   : 'bg-green-600 hover:bg-green-700 active:bg-green-800'
//               }`}
//             >
//               Lanjutkan
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }


// ReceiptOverlay.js

import Image from 'next/image';
import { useState, useEffect, useCallback, useRef } from 'react';
import Webcam from 'react-webcam';
import Tesseract from 'tesseract.js';
// Hapus import ReceiptDisplay karena kita tidak akan menampilkannya dari sini lagi
// import ReceiptDisplay from './ReceiptDisplay'; 

export default function ReceiptOverlay({ imagePreview, onRetake, onContinue, onClose }) { // onContinue akan menerima image sebagai argumen
  const [isVisible, setIsVisible] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isWebcamReady, setIsWebcamReady] = useState(false);
  const [checkingReceipt, setCheckingReceipt] = useState(false);
  const [isReceiptReadable, setIsReceiptReadable] = useState(false);
  // Hapus state berikut karena tidak digunakan lagi di sini
  // const [showReceiptDisplay, setShowReceiptDisplay] = useState(false); 
  // const [imageToDisplay, setImageToDisplay] = useState(null); 

  const webcamRef = useRef(null);

  const videoConstraints = {
    width: 1280,
    height: 720,
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
      console.log("Starting OCR for image:", image ? "Image data available" : "No image data"); // Debugging
      const { data: { text, confidence, words } } = await Tesseract.recognize( // Ambil 'words' juga untuk debugging
        image,
        'eng+ind',
        { logger: m => console.log(m) }
      );

      console.log("OCR Raw Text Output:"); // Ini sangat penting untuk debugging
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
        'harga', 'price', 'qty', 'jumlah', 'unit', 'x', // 'x' untuk kuantitas 1x, 2x
        'rp\\s*\\d+', // Untuk mendeteksi angka dengan 'Rp' di depannya
        'idr\\s*\\d+', // Untuk mendeteksi angka dengan 'IDR' di depannya
        'terima kasih', 'thank you', // Kata penutup umum
        'resto', 'restaurant', 'cafe', 'toko', 'store', // Indikasi jenis tempat
        'tanggal', 'date', 'waktu', 'time', // Indikasi tanggal/waktu
        'item', 'menu', 'produk', // Indikasi daftar item
    ];

    const receiptKeywordsRegex = new RegExp(
      '\\b(?:' + commonReceiptKeywords.join('|') + ')\\b|sub\\s*total|grand\\s*total|svc\\s*chrg|harga\\s*total|jumlah\\s*total|biaya\\s*layanan|terima\\s*kasih|thank\\s*you|rp\\s*\\d+|idr\\s*\\d+',
      'i' // Case-insensitive
    );

    const moneyFormatRegex = /\b\d{1,3}(?:[.,\s]?\d{3})*(?:[.,]\d{1,2})?\b/g; // Contoh: 1.000,00 atau 1,000.00 atau 1000

      // Logika Penentuan isReceiptLike yang Lebih Baik
      // Kita butuh setidaknya beberapa kata kunci struk DAN angka yang mirip uang.
    const hasReceiptKeywords = receiptKeywordsRegex.test(lowerCaseText);
    const hasMoneyFormats = moneyFormatRegex.test(lowerCaseText);

      // Anda juga bisa memeriksa jumlah baris atau panjang teks sebagai indikator
      const lines = text.split('\n').filter(line => line.trim().length > 0);
      const isLongEnough = lines.length > 5; // Minimal 5 baris non-kosong// Minimal 5 baris non-kosong

      // Logika utama:
      let isReceiptLike = (hasReceiptKeywords && hasMoneyFormats) || (hasMoneyFormats && isLongEnough && confidence > 30);
      // Opsional: Jika confidence sangat tinggi, mungkin tidak terlalu ketat pada kata kunci lain
      if (confidence > 30 && hasMoneyFormats) { // Jika OCR sangat yakin dan ada angka uang
          isReceiptLike = true;
      }
      

      const isReadable = confidence > 30; // Tetap gunakan threshold ini untuk keterbacaan dasar
      
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
      // Jika ada imagePreview dari luar, langsung cek OCR
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
        await checkIfReceipt(imageSrc); // Langsung cek OCR setelah capture
      } else {
        alert('Gagal mengambil foto. Coba lagi.');
      }
    } else {
      alert('Kamera belum siap atau referensi tidak tersedia.');
    }
  }, [isWebcamReady, checkIfReceipt]);

  const handleInternalRetake = () => {
    resetCaptureState();
    if (!isCameraOpen && !imagePreview) { // Jika belum ada gambar dan kamera belum terbuka, buka kamera
      openCamera();
    }
    if (typeof onRetake === 'function') {
      onRetake(); // Panggil onRetake dari parent (ReceiptUploader)
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
    const image = capturedImage || imagePreview; // Gunakan capturedImage jika ada, atau imagePreview
    if (image) {
      // Panggil prop onContinue yang datang dari parent (ReceiptUploader)
      // dan kirimkan image dataURL ke sana.
      if (typeof onContinue === 'function') {
        onContinue(image); 
      }
      handleCloseOverlay(); // Tutup overlay setelah melanjutkan
    } else {
      alert('Tidak ada foto untuk dilanjutkan.');
    }
  };

  // Hapus blok kondisional untuk showReceiptDisplay
  // if (showReceiptDisplay) {
  //   return (
  //     <ReceiptDisplay
  //       image={imageToDisplay}
  //       onBack={() => setShowReceiptDisplay(false)}
  //     />
  //   );
  // }
  
  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black bg-opacity-40 backdrop-blur-sm"
        onClick={handleCloseOverlay}
      />
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 max-h-[90vh] bg-[var(--background)] rounded-t-3xl p-6 shadow-2xl overflow-auto transform transition-transform duration-1000 ${
          isVisible ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ maxWidth: '1000px' , margin: '0 auto' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Tombol silang close */}
        <button
          onClick={handleCloseOverlay}
          aria-label="Close"
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          style={{ fontSize: '1.5rem', lineHeight: 1, background: 'transparent', border: 'none', cursor: 'pointer' }}
        >
          &#x2715;
        </button>

        {/* Garis kecil atas */}
        <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-4" />

        {/* Area preview gambar / kamera */}
        <div className="flex justify-center mb-4 bg-gray-200 dark:bg-gray-800 rounded-lg h-full items-center relative">
          {capturedImage || imagePreview ? (
            <Image
              src={capturedImage || imagePreview}
              width={720}
              height={1280}
              alt="Preview foto yang diambil"
              className="w-full h-full object-contain rounded-lg"
            />
          ) : isCameraOpen ? (
            <div className="relative w-full h-full object-contain">
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
                className="w-full h-full object-contain rounded-lg"
                onUserMedia={handleUserMedia}
                onUserMediaError={handleUserMediaError}
              />
              {/* Garis bantu kamera */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute border-2 border-dashed border-white top-[10%] left-[10%] w-[80%] h-[80%] rounded-md" />
              </div>
            </div>
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

        {/* Status kamera */}
        {isCameraOpen && !capturedImage && (
          <p className="text-center text-xs text-gray-500 dark:text-gray-400 mb-2">
            {isWebcamReady ? "Kamera siap." : "Menunggu izin kamera..."}
          </p>
        )}

        {/* Status pengecekan OCR */}
        {checkingReceipt && (
          <p className="text-center text-xs text-yellow-500 dark:text-yellow-400 mb-2 animate-pulse">
            Mengecek apakah ini struk dan bisa dibaca...
          </p>
        )}

        {/* Status struk terbaca */}
        {!checkingReceipt && isReceiptReadable && (
          <p className="text-center text-xs text-green-600 dark:text-green-400 mb-2 animate-pulse">
            Struk terbaca dengan baik ✅
          </p>
        )}

        <div className="mt-6 space-y-4">
          <div className="flex flex-wrap justify-center gap-4">
            {/* Tombol open/close kamera */}
            {/* Hanya tampilkan tombol ini jika tidak ada gambar yang diambil/preview */}
            {!capturedImage && !imagePreview && (
              <button
                onClick={isCameraOpen ? closeCamera : openCamera}
                className="text-sm cursor-pointer rounded bg-[#22d3aa] px-5 py-2 text-white hover:bg-[#1fb39a] active:bg-[#1fb39a] transition-colors duration-300"
              >
                {isCameraOpen ? 'Close Camera' : 'Open Camera'}
              </button>
            )}

            {/* Tombol ambil foto */}
            {isCameraOpen && !capturedImage && (
              <button
                onClick={capture} // Panggil langsung capture, tidak perlu resetCaptureState di sini
                disabled={!isWebcamReady}
                className="text-sm cursor-pointer rounded bg-blue-500 px-5 py-2 text-white hover:bg-blue-600 active:bg-blue-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Take photo
              </button>
            )}

            {/* Tombol unduh */}
            {capturedImage && (
              <button
                onClick={() => downloadImage(capturedImage, `receipt-${Date.now()}.jpeg`)}
                className="text-sm cursor-pointer rounded bg-yellow-500 px-5 py-2 text-white hover:bg-yellow-600 active:bg-yellow-700 transition-colors duration-300"
              >
                Unduh
              </button>
            )}
          </div>

          <div className="flex justify-between items-center">
            {/* Tombol ambil ulang */}
            <button
              onClick={handleInternalRetake}
              className="text-sm rounded bg-gray-300 dark:bg-gray-700 px-4 py-2 hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors duration-300"
            >
              Ambil Ulang
            </button>
            {/* Tombol lanjutkan */}
            <button
              onClick={handleInternalContinue}
              disabled={!isReceiptReadable || checkingReceipt}
              className={`text-sm rounded px-4 py-2 text-white transition-colors duration-300 ${
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