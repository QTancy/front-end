import React from 'react';
import Image from 'next/image';

const receiptData = {
  storeName: "CAFE JJM - KOPI JJM TEGALLUAR",
  address: "Jl. Raya Bojongsoang No.99, Tegalluar",
  phone: "0896-xxxx-xxxx",
  cashier: "Admin",
  datetime: "29/05/2025 19:32:45",
  items: [
    { name: "Kopi Susu Gula Aren", price: 18000 },
    { name: "Es Kopi Hitam", price: 15000 },
    { name: "Roti Bakar Coklat", price: 12000 },
  ],
  subtotal: 45000,
  discount: 0,
  total: 45000,
  payment: 50000,
  change: 5000,
};

const formatRupiah = (number) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number);

export default function ReceiptDisplay({ image, onBack }) {
  const {
    storeName,
    address,
    phone,
    cashier,
    datetime,
    items,
    subtotal,
    discount,
    total,
    payment,
    change,
  } = receiptData;

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-xl rounded-2xl text-sm font-mono">
      <button
        onClick={onBack}
        className="mb-4 px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
      >
        Back
      </button>

      {image && (
        <div className="mb-4 flex justify-center relative w-full h-64">
          <Image
            src={image}
            alt="Receipt"
            layout="fill"
            objectFit="contain"
            className="rounded-lg shadow"
            priority={false}
          />
        </div>
      )}

      <div className="text-center border-b pb-2">
        <h2 className="font-bold text-lg">{storeName}</h2>
        <p>{address}</p>
        <p>Telp: {phone}</p>
      </div>

      <div className="my-2 flex justify-between text-xs border-b pb-1">
        <span>Kasir: {cashier}</span>
        <span>{datetime}</span>
      </div>

      <div className="mb-2">
        {items.map((item, index) => (
          <div key={index} className="flex justify-between">
            <span>1x {item.name}</span>
            <span>{formatRupiah(item.price)}</span>
          </div>
        ))}
      </div>

      <div className="border-t pt-2 space-y-1">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>{formatRupiah(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span>Diskon</span>
          <span>{formatRupiah(discount)}</span>
        </div>
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>{formatRupiah(total)}</span>
        </div>
        <div className="flex justify-between">
          <span>Tunai</span>
          <span>{formatRupiah(payment)}</span>
        </div>
        <div className="flex justify-between">
          <span>Kembalian</span>
          <span>{formatRupiah(change)}</span>
        </div>
      </div>

      <p className="mt-4 text-center text-xs">Terima Kasih Atas Kunjungannya</p>
    </div>
  );
}
