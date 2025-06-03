import React, { useState } from 'react';
import Image from 'next/image';

const receiptData = {
  storeName: "CAFE JJM - KOPI JJM TEGALLUAR",
  address: "Jl. Raya Bojongsoang No.99, Tegalluar",
  items: [
    { name: "Kopi Susu Gula Aren", category: "Minuman", price: 18000, discount: 0 },
    { name: "Es Kopi Hitam", category: "Minuman", price: 15000, discount: 0 },
    { name: "Roti Bakar Coklat", category: "Makanan", price: 12000, discount: 0 },
  ],
  subtotal: 45000,
  discount: 0,
  total: 45000,
  payment: 50000,
  change: 5000,
  datetime: "29/05/2025 19:32:45",
};

const formatRupiah = (number) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number);

const CATEGORY_OPTIONS = [
  "Makanan & Minuman",
  "ATK",
  "Transportasi",
  "Kesehatan",
  "Hiburan",
];

export default function ReceiptDisplay({ image, onBack }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editableItems, setEditableItems] = useState(receiptData.items);

  const calculateSubtotal = () => {
    return editableItems.reduce((sum, item) => sum + Number(item.price || 0), 0);
  };

  const handleNameChange = (index, value) => {
    const newItems = [...editableItems];
    newItems[index].name = value;
    setEditableItems(newItems);
  };
  const handleCategoryChange = (index, value) => {
    const newItems = [...editableItems];
    newItems[index].category = value;
    setEditableItems(newItems);
  };
  const handlePriceChange = (index, value) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    const newItems = [...editableItems];
    newItems[index].price = numericValue === '' ? 0 : parseInt(numericValue, 10);
    setEditableItems(newItems);
  };
  const handleDiscountChange = (index, value) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    const newItems = [...editableItems];
    newItems[index].discount = numericValue === '' ? 0 : parseInt(numericValue, 10);
    setEditableItems(newItems);
  };

  const handleSave = () => {
    const newSubtotal = calculateSubtotal();
    receiptData.items = editableItems;
    receiptData.subtotal = newSubtotal;
    receiptData.total = newSubtotal;
    receiptData.change = receiptData.payment - newSubtotal;
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditableItems(receiptData.items);
    setIsEditing(false);
  };

  const handleAddItem = () => {
    const newItems = [...editableItems, { name: "", category: "", price: 0, discount: 0 }];
    setEditableItems(newItems);
  };

  return (
    <div className="min-h-screen bg-[#E6FFFA] py-10 px-4 flex justify-center">
      <div className="w-full max-w-6xl">

        {/* Judul */}
        <h1 className="text-xl font-bold text-gray-800 mb-4">Receipt Text Extraction</h1>

        {/* Dua kotak sejajar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-mono">

          {/* Kotak kiri - gambar */}
          <div className="bg-white shadow border w-full max-w-[380px] h-[480px] flex justify-center items-center overflow-hidden">
            {image ? (
              <Image
                src={image}
                alt="Receipt"
                width={250}
                height={400}
                className="mx-auto object-contain"
              />
            ) : (
              <span className="text-gray-500">No Image Uploaded</span>
            )}
          </div>

          {/* Kotak kanan - info */}
          <div className="bg-white shadow border p-4 flex flex-col justify-between max-w-[380px]">
            <div>
              <h2 className="text-base font-bold mb-1">{receiptData.storeName}</h2>
              <p className="text-xs text-gray-700 mb-1">
                <strong>Address :</strong> {receiptData.address}
              </p>

              <div className="flex justify-end text-xs mb-2">
                <span>{receiptData.datetime}</span>
              </div>

              <div className="grid grid-cols-4 gap-2 border-t border-b py-1 text-xs font-semibold text-gray-600">
                <div>Kategori</div>
                <div>Menu</div>
                <div className="text-right">Harga</div>
                <div className="text-right">Diskon</div>
              </div>

              <div className="border-b py-2 space-y-1 text-sm">
                {editableItems.map((item, index) => (
                  <div key={index} className="grid grid-cols-4 gap-2 items-center">
                    {isEditing ? (
                      <>
                        <select
                          value={item.category}
                          onChange={(e) => handleCategoryChange(index, e.target.value)}
                          className="border px-1 py-0.5 w-full text-xs"
                        >
                          <option value="">Pilih Kategori</option>
                          {CATEGORY_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>

                        <input
                          type="text"
                          value={item.name}
                          onChange={(e) => handleNameChange(index, e.target.value)}
                          className="border px-1 py-0.5 w-full text-xs"
                          placeholder="Nama menu"
                        />
                        <input
                          type="text"
                          value={item.price}
                          onChange={(e) => handlePriceChange(index, e.target.value)}
                          className="border px-1 py-0.5 w-full text-xs text-right"
                          placeholder="Harga"
                        />
                        <input
                          type="text"
                          value={item.discount}
                          onChange={(e) => handleDiscountChange(index, e.target.value)}
                          className="border px-1 py-0.5 w-full text-xs text-right"
                          placeholder="Diskon"
                        />
                      </>
                    ) : (
                      <>
                        <div>{item.category}</div>
                        <div>{item.name}</div>
                        <div className="text-right">{formatRupiah(item.price)}</div>
                        <div className="text-right">{formatRupiah(item.discount)}</div>
                      </>
                    )}
                  </div>
                ))}
              </div>

              {isEditing && (
                <div className="mt-2">
                  <button
                    onClick={handleAddItem}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs"
                  >
                    + Add Item
                  </button>
                </div>
              )}

              <div className="mt-3 space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Diskon</span>
                  <span>{formatRupiah(receiptData.discount)}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>{formatRupiah(calculateSubtotal())}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-center gap-4">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded"
                >
                  Edit Bill
                </button>
              ) : (
                <>
                  <button
                    onClick={handleSave}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                </>
              )}

              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded">
                Confirm
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
