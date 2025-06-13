// import { useState, useRef } from 'react';
// import ReceiptOverlay from './ReceiptOverlay';
// import ReceiptDisplay from './ReceiptDisplay';
// import { UploadIcon } from '@/icons';
// import Image from 'next/image';
// import Button from '../buttons/buttons';
// import Swal from 'sweetalert2';

// export default function ReceiptUploader() {
//   const [showOverlay, setShowOverlay] = useState(false);
//   const [imagePreview, setImagePreview] = useState(null);
//   const [confirmedImage, setConfirmedImage] = useState(null);  // <-- state baru
//   const [receiptDescription, setReceiptDescription] = useState('');
//   const [payment, setPayment] = useState('Kredit');
//   const [language, setLanguage] = useState('ID');
//   const [showError, setShowError] = useState(false);

//   const [isUploading, setIsUploading] = useState(false);
//   const [uploadError, setUploadError] = useState(null);

//   const fileInputRef = useRef(null);

//   const isSelectionValid = () => payment && language;
  
//   const BASE_URL = "https://qtancy-model-295865298963.asia-southeast2.run.app"
  
//   const resetUploadState = () => {
//     setShowOverlay(false);
//     setImagePreview(null);
//     setConfirmedImage(null);
//     setReceiptDescription('');
//     setPayment('Kredit');
//     setLanguage('ID');
//     setShowError(false);
//     setIsUploading(false);
//     setUploadError(null);
//   };

//   const handleTakePhoto = () => {
//     if (!isSelectionValid()) {
//       setShowError(true);
//       return;
//     }
//     setShowOverlay(true);
//     setShowError(false);
//   };

//   const handleRetake = () => {
//     if (!isSelectionValid()) {
//       setShowError(true);
//       return;
//     }
//     setShowOverlay(true);
//     setImagePreview(null);
//     // handleTakePhoto();
//   };

//   // Di sini kita terima image dari ReceiptOverlay dan simpan ke confirmedImage
//   const handleContinue = async (imageDataUrl) => {
//     setConfirmedImage(imageDataUrl);
//     setShowOverlay(false);
//     setIsUploading(true); 
//     setUploadError(null);

//     try {
//       if (!isSelectionValid()) {
//         throw new Error("Silakan pilih Payment dan Language.");
//       }

//       const token = localStorage.getItem('token'); 
//       if (!token) {
//         throw new Error("Tidak terautentikasi. Silakan login kembali.");
//       }

//       // Konversi dataURL menjadi Blob (File-like object)
//       const response = await fetch(imageDataUrl);
//       const blob = await response.blob();
//       const file = new File([blob], "receipt_image.jpeg", { type: blob.type });

//       // Buat FormData untuk mengirim file dan data lainnya
//       const formData = new FormData();
//       formData.append('file', file); // 'file' adalah nama field yang diharapkan API untuk gambar
//       formData.append('metode_pembayaran', payment); // Pastikan nama field sesuai API Anda
//       formData.append('bahasa', language);     // Pastikan nama field sesuai API Anda

//       const uploadResponse = await fetch(`${BASE_URL}/qcap/upload_and_process_all`, {
//         method: "POST",
//         headers: {
//           'Content-Type': 'multipart/form-data', 
//           'Authorization': `Bearer ${token}`,
//         },
//         body: formData, // Kirim FormData sebagai body
//       });

//       if (uploadResponse.ok) {
//         const result = await uploadResponse.json();
//         console.log("Upload dan Proses Berhasil:", result);
//         Swal.fire({
//           title: "Struk Berhasil Diupload!",
//           text: "Data struk Anda sedang diproses.",
//           icon: "success",
//         });
//         resetUploadState(); // Reset semua state setelah sukses
//       } else {
//         const errorResult = await uploadResponse.json();
//         console.error("Upload Gagal:", errorResult);
//         throw new Error(errorResult.message || "Gagal mengupload dan memproses struk.");
//       }
//     } catch (err) {
//       console.error('Error saat upload:', err);
//       setUploadError(err.message);
//       Swal.fire({
//         title: "Gagal Upload Struk",
//         text: err.message,
//         icon: "error",
//       });
//       setIsUploading(false); 
//     }
//   }

//   const handleCloseOverlay = () => {
//     setImagePreview(null);
//     setShowOverlay(false);
//   };

//   const handleContinueFromOverlay = (imageDataUrl) => {
//     // Panggil fungsi pengiriman API dengan gambar yang dikonfirmasi
//     handleSendToApi(imageDataUrl);

//     // Anda bisa memilih untuk tidak menutup overlay langsung di sini
//     // atau menutupnya dan menampilkan loading spinner di komponen utama.
//     // Saat ini, saya akan tetap menutup overlay segera.
//     setShowOverlay(false);
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     if (!isSelectionValid()) {
//       setShowError(true);
//       return;
//     }
//     const file = e.dataTransfer.files[0];
//     if (file && file.type.startsWith('image/')) {
//       if (file.size > 10 * 1024 * 1024) {
//         alert('Ukuran gambar melebihi 10MB');
//         return;
//       }
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//         setShowOverlay(true);
//         setShowError(false);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleDragOver = (e) => e.preventDefault();

//   const handleUploadClick = () => {
//     if (!isSelectionValid()) {
//       setShowError(true);
//       return;
//     }
//     fileInputRef.current?.click();
//   };

//   const handleFileChange = (e) => {
//     if (!isSelectionValid()) {
//       setShowError(true);
//       return;
//     }
//     const file = e.target.files[0];
//     if (file && file.type.startsWith('image/')) {
//       if (file.size > 10 * 1024 * 1024) {
//         alert('Ukuran gambar melebihi 10MB');
//         return;
//       }
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//         setShowOverlay(true);
//         setShowError(false);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   // Kalau sudah ada gambar konfirmasi, tampilkan ReceiptDisplay
//   if (confirmedImage) {
//     return (
//       <ReceiptDisplay
//         image={confirmedImage}
//         onBack={() => setConfirmedImage(null)} // Kembali ke uploader
//       />
//     );
//   }

//   // Kalau belum ada gambar konfirmasi, tampilkan uploader
//   return (
//     <div className="w-full min-h-screen flex flex-col items-center px-4 py-10">
//       <div className="text-center mb-10">
//         <h1 className="text-xl font-bold text-black">
//           Hallo! This is <span className="font-extrabold">QCap</span>
//         </h1>
//         <h2 className="text-3xl font-extrabold mt-2 text-black">What is Your New Receipt?</h2>
//         <p className="text-sm text-gray-700 mt-1">
//           Upload your media or choose take a photo. The first photo will be
//           <br className="hidden sm:block" />
//           thumbnail in your history. Drag or snap up to 3 image to create multiple
//           <br className="hidden sm:block" />
//           receipt in one history
//         </p>
//       </div>

//       <div className="w-full max-w-5xl flex flex-col md:flex-row gap-8 md:gap-16">
//         <div
//           onDrop={handleDrop}
//           onDragOver={handleDragOver}
//           className="flex-[2] bg-[#e6f3fe] border-2 border-dashed border-[#2b91ec] rounded-xl px-6 py-10 flex flex-col items-center justify-center text-center space-y-2 shadow-sm"
//         >
//           <Image 
//             src = {UploadIcon}
//             alt='Upload Icon'
//           />
//           <p className="text-base font-semibold text-black">Drop file here</p>
//           <p className="text-sm text-gray-600">OR</p>
//           <div className="flex gap-4">
//             <button
//               onClick={handleTakePhoto}
//               className="w-30 bg-[#22d3aa] text-white py-2 rounded-md text-sm font-semibold hover:bg-[#1fb39a] transition"
//             >
//               Take a photo
//             </button>
//             <button
//               onClick={handleUploadClick}
//               className="w-30 bg-[var(--secondary)] text-white py-2 rounded-md text-sm font-semibold hover:bg-blue-700 transition"
//             >
//               Upload
//             </button>
//           </div>
//           <p className="text-xs text-gray-500">Photos must be less than <b>10 MB</b> in size</p>
//           <input
//             type="file"
//             accept="image/*"
//             ref={fileInputRef}
//             onChange={handleFileChange}
//             style={{ display: 'none' }}
//           />
//         </div>

//         <div className="flex-1 space-y-3">
//           <h3 className="text-2xl font-bold text-black mt-2 mb-2">Basic Info</h3>

//           <div>
//             <label className="text-sm font-semibold block mb-1">
//               Description <span className="text-gray-400">(Optional)</span>
//             </label>
//             <input
//               type="text"
//               placeholder="Add details"
//               value={receiptDescription}
//               onChange={(e) => setReceiptDescription(e.target.value)}
//               className="w-full mt-1 px-4 py-3.5 rounded-md border border-gray-300 bg-white text-center focus:outline-none focus:ring-2 focus:ring-secondary text-sm"
//             />
//           </div>

//           <div className="flex gap-6">
//             <div>
//               <label className="text-sm font-semibold block mb-1">Payment</label>
//               <div className="flex w-60 rounded-md border border-gray-400 overflow-hidden">
//                 {['Kredit', 'Debit'].map((method) => (
//                   <button
//                     key={method}
//                     onClick={() => {
//                       setPayment(method);
//                       setShowError(false);
//                     }}
//                     className={`flex-1 py-2 font-semibold text-sm transition ${
//                       payment === method ? 'bg-[var(--secondary)] text-white' : 'bg-white text-black'
//                     }`}
//                   >
//                     {method}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             <div>
//               <label className="text-sm font-semibold block mb-1">Language on Receipt</label>
//               <div className="flex w-60 rounded-md border border-gray-400 overflow-hidden">
//                 {['ID', 'EN'].map((lang) => (
//                   <button
//                     key={lang}
//                     onClick={() => {
//                       setLanguage(lang);
//                       setShowError(false);
//                     }}
//                     className={`flex-1 py-2 font-semibold text-sm transition ${
//                       language === lang ? 'bg-[var(--secondary)] text-white' : 'bg-white text-black'
//                     }`}
//                   >
//                     {lang}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>

//           <div className="flex gap-4 pt-2">
//             <button
//               onClick={() => {
//                 resetUploadState()
//               }}
//               className="flex-1 bg-[#22d3aa] text-white py-2 rounded-md text-sm font-semibold hover:bg-[#1fb39a] transition"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={() => {
//                 if (!isSelectionValid()) {
//                   setShowError(true);
//                   return;
//                 }
//                 if(confirmedImage) { 
//                   handleContinue(confirmedImage);
//                 } else {
//                   Swal.fire({
//                     icon:"error",
//                     confirmButtonText:"Oke"
//                   })
//                 }
                
//               }}
//               className="flex-[2] bg-[var(--secondary)] text-white py-2 rounded-md text-sm font-semibold hover:bg-[#3a5cd6] transition"
//             >
//               {isUploading ? 'Mengirim' : 'Send for QRep'}
//             </button>
//           </div>

//           {showError && (
//             <p className="text-red-600 text-sm font-medium mt-1">
//               Anda belum memilih bahasa dan payment
//             </p>
//           )}
//         </div>
//       </div>

//       {showOverlay && (
//         <ReceiptOverlay
//           imagePreview={imagePreview}
//           onRetake={handleRetake}
//           onContinue={() => handleContinue(imagePreview)}  // Kirim imagePreview ke handleContinue
//           onClose={handleCloseOverlay}
//         />
//       )}
//     </div>
//   );
// }


// ReceiptUploader.js

import { useState, useRef } from 'react';
import ReceiptOverlay from './ReceiptOverlay';
// Hapus ReceiptDisplay karena kita tidak akan menampilkannya langsung dari sini lagi
// import ReceiptDisplay from './ReceiptDisplay'; 
import { UploadIcon } from '@/icons';
import Image from 'next/image';
import Button from '../buttons/buttons'; // Pastikan path ini benar
import Swal from 'sweetalert2';

export default function ReceiptUploader() {
  const [showOverlay, setShowOverlay] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  // Hapus state confirmedImage karena tidak digunakan lagi
  // const [confirmedImage, setConfirmedImage] = useState(null);
  const [receiptDescription, setReceiptDescription] = useState('');
  const [payment, setPayment] = useState('Kredit');
  const [language, setLanguage] = useState('ID');
  const [showError, setShowError] = useState(false);

  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const fileInputRef = useRef(null);

  const isSelectionValid = () => payment && language;
  
  const BASE_URL = "https://qtancy-model-295865298963.asia-southeast2.run.app"
  
  const resetUploadState = () => {
    setShowOverlay(false);
    setImagePreview(null);
    // setConfirmedImage(null); // Hapus ini
    setReceiptDescription('');
    setPayment('Kredit');
    setLanguage('ID');
    setShowError(false);
    setIsUploading(false);
    setUploadError(null);
  };

  const handleTakePhoto = () => {
    if (!isSelectionValid()) {
      setShowError(true);
      return;
    }
    setImagePreview(null); // Pastikan preview kosong saat memulai foto baru
    setShowOverlay(true);
    setShowError(false);
  };

  const handleRetake = () => {
    if (!isSelectionValid()) {
      setShowError(true);
      return;
    }
    // Tidak perlu setShowOverlay(true) lagi karena sudah diatur dari ReceiptOverlay
    setImagePreview(null); // Reset image preview agar ReceiptOverlay bisa memulai dari kamera
    // onRetake di ReceiptOverlay akan menangani pembukaan kamera
    // Ini dipanggil oleh ReceiptOverlay's handleInternalRetake
  };

  // Ini adalah fungsi utama yang akan dipanggil dari ReceiptOverlay
  const handleContinueFromOverlay = async (imageDataUrl) => {
    setShowOverlay(false); // Tutup overlay segera
    setIsUploading(true); // Mulai loading
    setUploadError(null);

    Swal.fire({
      title: "Mengupload Struk...",
      text: "Mohon tunggu sebentar.",
      icon: "info",
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    try {
      if (!isSelectionValid()) {
        throw new Error("Silakan pilih Payment dan Language sebelum mengupload.");
      }

      const token = localStorage.getItem('token'); 
      if (!token) {
        throw new Error("Tidak terautentikasi. Silakan login kembali.");
      }

      // Konversi dataURL menjadi Blob (File-like object)
      const response = await fetch(imageDataUrl);
      const blob = await response.blob();
      const file = new File([blob], "receipt_image.jpeg", { type: blob.type });

      // Buat FormData untuk mengirim file dan data lainnya
      const formData = new FormData();
      formData.append('file', file);
      formData.append('metode_pembayaran', payment);
      formData.append('bahasa', language);

      const uploadResponse = await fetch(`${BASE_URL}/qcap/upload_and_process_all`, {
        method: "POST",
        headers: {
          // Penting: Ketika mengirim FormData dengan file, JANGAN set 'Content-Type': 'multipart/form-data'
          // Browser akan secara otomatis mengatur Content-Type dengan boundary yang benar.
          // Jika Anda mengaturnya secara manual, seringkali akan menyebabkan masalah.
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (uploadResponse.ok) {
        const result = await uploadResponse.json();
        console.log("Upload dan Proses Berhasil:", result);
        Swal.fire({
          title: "Struk Berhasil Diupload!",
          text: "Data struk Anda sedang diproses dan akan segera muncul.",
          icon: "success",
          confirmButtonText: "Oke"
        });
        resetUploadState(); // Reset semua state setelah sukses
      } else {
        const errorResult = await uploadResponse.json();
        console.error("Upload Gagal:", errorResult);
        throw new Error(errorResult.message || "Gagal mengupload dan memproses struk.");
      }
    } catch (err) {
      console.error('Error saat upload:', err);
      setUploadError(err.message);
      Swal.fire({
        title: "Gagal Upload Struk",
        text: err.message || "Terjadi kesalahan yang tidak diketahui.",
        icon: "error",
        confirmButtonText: "Oke"
      });
    } finally {
      setIsUploading(false); // Selesai loading
    }
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
    } else {
        alert('File yang diunggah harus berupa gambar.');
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
    } else {
        alert('File yang diunggah harus berupa gambar.');
    }
    e.target.value = ''; // Reset input file agar event change terpicu lagi jika file yang sama dipilih
  };

  // Hapus blok kondisional untuk confirmedImage karena tidak digunakan lagi
  // if (confirmedImage) {
  //   return (
  //     <ReceiptDisplay
  //       image={confirmedImage}
  //       onBack={() => setConfirmedImage(null)}
  //     />
  //   );
  // }

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
              onClick={resetUploadState} // Panggil resetUploadState langsung
              className="flex-1 bg-[#22d3aa] text-white py-2 rounded-md text-sm font-semibold hover:bg-[#1fb39a] transition"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                // Tombol "Send for QRep" sekarang hanya akan berfungsi jika ada gambar yang sudah terkonfirmasi
                // dan semua seleksi valid.
                // Jika tidak ada gambar preview, atau jika masih ada overlay, tombol ini tidak relevan
                // dalam alur baru ini.
                if (imagePreview) { // Cek apakah ada gambar yang sudah di-preview/siap di-upload
                    handleContinueFromOverlay(imagePreview); // Langsung kirim gambar
                } else {
                    Swal.fire({
                        icon: "info",
                        title: "Belum Ada Gambar",
                        text: "Silakan ambil foto atau upload gambar struk terlebih dahulu."
                    });
                }
              }}
              disabled={isUploading || !imagePreview} // Disable tombol saat mengupload atau tidak ada gambar
              className={`flex-[2] py-2 rounded-md text-sm font-semibold transition ${
                isUploading || !imagePreview
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-[var(--secondary)] hover:bg-[#3a5cd6] text-white'
              }`}
            >
              {isUploading ? 'Mengirim...' : 'Send for QRep'}
            </button>
          </div>

          {showError && (
            <p className="text-red-600 text-sm font-medium mt-1">
              Anda belum memilih Payment dan Language
            </p>
          )}

          {uploadError && (
            <p className="text-red-600 text-sm font-medium mt-1">
              Error Upload: {uploadError}
            </p>
          )}
        </div>
      </div>

      {showOverlay && (
        <ReceiptOverlay
          imagePreview={imagePreview}
          onRetake={handleRetake} // onRetake sekarang tidak perlu mengoper apa-apa, ReceiptOverlay akan mengurusnya
          onContinue={handleContinueFromOverlay} // Ini adalah fungsi yang akan menerima dataURL dari ReceiptOverlay
          onClose={handleCloseOverlay}
        />
      )}
    </div>
  );
}