import { useState, useRef } from 'react';
import ReceiptOverlay from './ReceiptOverlay';
import { UploadIcon } from '@/icons';
import Image from 'next/image';
import Swal from 'sweetalert2';

export default function ReceiptUploader() {
  const [showOverlay, setShowOverlay] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
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
    setImagePreview(null); // Reset image preview agar ReceiptOverlay bisa memulai dari kamera
  };

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

      const response = await fetch(imageDataUrl);
      const blob = await response.blob();
      const file = new File([blob], "receipt_image.jpeg", { type: blob.type });

      const formData = new FormData();
      formData.append('file', file);
      formData.append('metode_pembayaran', payment);
      formData.append('bahasa', language);

      const uploadResponse = await fetch(`${BASE_URL}/qcap/upload_and_process_all`, {
        method: "POST",
        headers: {
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
        resetUploadState();
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
      setIsUploading(false);
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
    e.target.value = '';
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center px-4 py-8 sm:px-6 sm:py-10"> {/* Sesuaikan padding horizontal dan vertikal */}
      <div className="text-center mb-6 sm:mb-10"> {/* Sesuaikan margin-bottom */}
        <h1 className="text-xl sm:text-2xl font-bold text-black"> {/* Sesuaikan ukuran font */}
          Halo! Ini adalah <span className="font-extrabold">QCap</span>
        </h1>
        <h2 className="text-2xl sm:text-3xl font-extrabold mt-1 sm:mt-2 text-black">Ada Struk Baru Apa Hari Ini?</h2> {/* Sesuaikan ukuran font dan margin-top */}
        <p className="text-sm text-gray-700 mt-1">
          Unggah atau ambil gambar strukmu.
          <br className="hidden sm:block" />
          AI cerdas QCap akan mengubahnya menjadi catatan digital akurat dalam hitungan detik.
        </p>
      </div>

      <div className="w-full max-w-sm sm:max-w-xl md:max-w-5xl flex flex-col md:flex-row gap-6 md:gap-16"> {/* Sesuaikan max-width, gap */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="flex-[2] bg-[#e6f3fe] border-2 border-dashed border-[#2b91ec] rounded-xl px-4 py-8 flex flex-col items-center justify-center text-center space-y-2 shadow-sm" // Sesuaikan padding
        >
          <Image 
            src = {UploadIcon}
            alt='Upload Icon'
            width={60} // Sesuaikan ukuran ikon
            height={60}
          />
          <p className="text-base font-semibold text-black">Unggah gambar disini</p>
          <p className="text-sm text-gray-600">atau</p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full px-4"> {/* Tambahkan flex-col di mobile, flex-row di sm:, w-full, px-4 */}
            <button
              onClick={handleTakePhoto}
              className="w-full sm:w-auto flex-1 bg-[#22d3aa] text-white py-2 rounded-md text-sm font-semibold hover:bg-[#1fb39a] transition" // w-full sm:w-auto, flex-1
            >
              Ambil Gambar
            </button>
            <button
              onClick={handleUploadClick}
              className="w-full sm:w-auto flex-1 bg-[var(--secondary)] text-white py-2 rounded-md text-sm font-semibold hover:bg-blue-700 transition" // w-full sm:w-auto, flex-1
            >
              Unggah Gambar
            </button>
          </div>
          <p className="text-xs text-gray-500">Ukuran gambar harus kurang dari <b>10 MB</b></p>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </div>

        <div className="flex-1 space-y-3">
          <h3 className="text-xl sm:text-2xl font-bold text-black mt-2 mb-2">Informasi Dasar</h3> {/* Sesuaikan ukuran font */}

          <div>
            <label className="text-sm text-black font-semibold block mb-1">
              Deskripsi <span className="text-gray-400">(Opsional)</span>
            </label>
            <input
              type="text"
              placeholder="Tambahkan informasi detail"
              value={receiptDescription}
              onChange={(e) => setReceiptDescription(e.target.value)}
              className="w-full mt-1 text-black px-4 py-2.5 sm:py-3.5 rounded-md border border-gray-300 bg-white text-center focus:outline-none focus:ring-2 focus:ring-secondary text-sm" // Sesuaikan padding
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6"> {/* Tambahkan flex-col di mobile, flex-row di sm:, sesuaikan gap */}
            <div className="w-full sm:flex-1"> {/* w-full di mobile, flex-1 di sm: */}
              <label className="text-sm text-black font-semibold block mb-1">Jenis Pembayaran</label>
              <div className="flex w-full rounded-md border border-gray-400 overflow-hidden"> {/* Ubah w-60 menjadi w-full */}
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

            <div className="w-full sm:flex-1"> {/* w-full di mobile, flex-1 di sm: */}
              <label className="text-sm text-black font-semibold block mb-1">Bahasa Pada Struk</label>
              <div className="flex w-full rounded-md border border-gray-400 overflow-hidden"> {/* Ubah w-60 menjadi w-full */}
                {['ID', 'US'].map((lang) => (
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

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2"> {/* Tambahkan flex-col di mobile, flex-row di sm:, sesuaikan gap */}
            <button
              onClick={resetUploadState}
              className="flex-1 bg-[#22d3aa] text-white py-2 rounded-md text-sm font-semibold hover:bg-[#1fb39a] transition"
            >
              Batal
            </button>
            <button
              onClick={() => {
                if (imagePreview) {
                    handleContinueFromOverlay(imagePreview);
                } else {
                    Swal.fire({
                        icon: "info",
                        title: "Belum Ada Gambar",
                        text: "Silakan ambil foto atau upload gambar struk terlebih dahulu."
                    });
                }
              }}
              disabled={isUploading || !imagePreview}
              className={`flex-[2] py-2 rounded-md text-sm font-semibold transition ${
                isUploading || !imagePreview
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-[var(--secondary)] hover:bg-[#3a5cd6] text-white'
              }`}
            >
              {isUploading ? 'Mengirim...' : 'Proses Permintaan'}
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
          onRetake={handleRetake}
          onContinue={handleContinueFromOverlay}
          onClose={handleCloseOverlay}
        />
      )}
    </div>
  );
}