import { useState, createElement as h } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import {
  AllLogo,
  FoodLogo,
  HiburanLogo,
  OthersLogo,
  MedicalLogo,
  HouseLogo,
  CarLogo,
  Bill,
  TotalExpenses,
} from '@/icons';
import Image from 'next/image';
import style from './style.css';

export default function ReceiptAnalyse() {
  const [paymentType, setPaymentType] = useState('All Payment');
  const [timeRange, setTimeRange] = useState('Mingguan');
  const [selectedKategori, setSelectedKategori] = useState(['Semua']);

  const dataTransaksi = [
    {
      tanggal: '2025-04-26',
      jumlah: 120000,
      kategori: 'Makanan & Minuman',
      tipe: 'Debit',
    },
    {
      tanggal: '2025-04-25',
      jumlah: 95000,
      kategori: 'Hiburan',
      tipe: 'Credit',
    },
    {
      tanggal: '2025-04-24',
      jumlah: 200000,
      kategori: 'Transportasi',
      tipe: 'Debit',
    },
  ];

  const kategoriList = [
    { nama: 'Semua', icon: AllLogo },
    { nama: 'Makanan & Minuman', icon: FoodLogo },
    { nama: 'Transportasi', icon: CarLogo },
    { nama: 'ATK', icon: HouseLogo },
    { nama: 'Kesehatan', icon: MedicalLogo },
    { nama: 'Hiburan', icon: HiburanLogo },
    { nama: 'Lainnya', icon: OthersLogo },
  ];

  const toggleKategori = (nama) => {
    if (nama === 'Semua') {
      setSelectedKategori(['Semua']);
    } else {
      const newSelected = selectedKategori.includes(nama)
        ? selectedKategori.filter((item) => item !== nama)
        : [...selectedKategori.filter((item) => item !== 'Semua'), nama];

      setSelectedKategori(newSelected.length ? newSelected : ['Semua']);
    }
  };

  const filteredData = selectedKategori.includes('Semua')
    ? dataTransaksi
    : dataTransaksi.filter((t) => selectedKategori.includes(t.kategori));

  const kategoriTotals = filteredData.reduce((acc, curr) => {
    if (!acc[curr.kategori]) {
      acc[curr.kategori] = 0;
    }
    acc[curr.kategori] += curr.jumlah;
    return acc;
  }, {});

  const totalExpenses = filteredData.reduce((sum, t) => sum + t.jumlah, 0);
  const totalReceipts = filteredData.length;

  const barData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Pengeluaran',
        data: [150000, 190000, 160000, 130000, 110000, 170000, 140000],
        backgroundColor: '#4F80E2',
      },
    ],
  };

  const pieData = {
    labels: Object.keys(kategoriTotals),
    datasets: [
      {
        data: Object.values(kategoriTotals),
        backgroundColor: [
          '#4F80E2',
          '#15CDCA',
          '#81F0D1',
          '#FFB347',
          '#FF6961',
          '#6A5ACD',
          '#FAD02E',
        ],
      },
    ],
  };

  const pieOptions = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const value = context.raw;
            const percentage = ((value / total) * 100).toFixed(1);
            return `${context.label}: ${percentage}%`;
          },
        },
        backgroundColor: 'rgba(255, 255, 255, 0.55)', // 35% opacity white
        titleColor: '#0F172A',
        bodyColor: '#0F172A',
        borderColor: 'gray',
        borderWidth: 1,
        titleFont: {
          weight: 'bold',
          size: 14,
        },
        bodyFont: {
          weight: 'normal',
          size: 14,
        },
        padding: 12,
        displayColors: false,
      },
    },
  };

  const barOptions = {
    plugins: {
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.55)', // 40% opacity white
        titleColor: '#0F172A',
        bodyColor: '#0F172A',
        borderColor: 'gray',
        borderWidth: 1,
        titleFont: {
          weight: 'bold',
          size: 14,
        },
        bodyFont: {
          weight: 'normal',
          size: 14,
        },
        padding: 12,
        displayColors: false,
      },
    },
  };

  return h('main', { className: 'w-full max-w-6xl p-6 space-y-6 mx-auto' }, [
    // BOX PERTAMA
    h(
      'div',
      {
        className:
          'bg-white p-6 rounded shadow-md border-[4px] border-[#D9D9D9]',
      },
      [
        h(
          'h1',
          {
            className: 'text-2xl font-extrabold text-[var(--primary)]',
          },
          'Hello, Jeno! This is Qrep'
        ),

        h(
          'p',
          {
            className: 'text-[#0F172A] mt-1',
          },
          'Lihat pengeluaran berdasarkan kategori, tipe payment, atau jangka waktu'
        ),

        h('div', { className: 'flex justify-between items-center mt-6' }, [
          h('div', { className: 'font-bold text-xl' }, 'Ringkasan Pengeluaran'),

          h('div', { className: 'flex gap-2' }, [
            h(
              'select',
              {
                className:
                  'bg-[#EFEFEF] px-4 py-2 rounded shadow-md text-[#0F172A]',
                value: paymentType,
                onChange: (e) => setPaymentType(e.target.value),
              },
              ['Semua Payment', 'Debit', 'Credit'].map((opt) =>
                h('option', { key: opt, value: opt }, opt)
              )
            ),
            h(
              'select',
              {
                className:
                  'bg-[#EFEFEF] px-4 py-2 rounded shadow-md text-[#0F172A]',
                value: timeRange,
                onChange: (e) => setTimeRange(e.target.value),
              },
              ['Bulanan', 'Mingguan', 'Harian'].map((opt) =>
                h('option', { key: opt, value: opt }, opt)
              )
            ),
          ]),
        ]),

        h(
          'div',
          {
            className: 'mt-5 bg-[#BDF6F1] p-4 rounded-[12px] h-[345px]',
          },
          [
            h(
              'div',
              {
                className: 'grid grid-cols-1 md:grid-cols-3 gap-4 mb-4',
              },
              [
                h(
                  'h2',
                  {
                    className: 'font-bold text-lg text-[#0F172A] md:col-span-1',
                  },
                  'Total Pengeluaran'
                ),
                h(
                  'h2',
                  {
                    className: 'font-bold text-lg text-[#0F172A] md:col-span-2',
                  },
                  'Statistics'
                ),
              ]
            ),

            h(
              'div',
              {
                className: 'grid grid-cols-1 md:grid-cols-3 gap-4 items-start',
              },
              [
                // KIRI
                h(
                  'div',
                  {
                    className:
                      'md:col-span-1 bg-white p-4 rounded-lg shadow flex gap-4 h-[260px]',
                  },
                  [
                    h(
                      'div',
                      {
                        className:
                          'bg-[#4F80E2] text-white rounded-[15px] p-4 flex flex-col items-center justify-center w-3/5',
                      },
                      [
                        h(Image, {
                          src: TotalExpenses.src,
                          alt: 'Total Expenses',
                          width: 75,
                          height: 75,
                        }),
                        h(
                          'p',
                          { className: 'text-lg mt-2' },
                          `Rp. ${totalExpenses.toLocaleString()}`
                        ),
                      ]
                    ),
                    h(
                      'div',
                      {
                        className:
                          'bg-[#4F80E2] text-white rounded-[15px] p-4 flex flex-col items-center justify-center w-2/5',
                      },
                      [
                        h(Image, {
                          src: Bill.src,
                          alt: 'Bill',
                          width: 55,
                          height: 55,
                        }),
                        h(
                          'p',
                          { className: 'text-lg mt-2' },
                          `${totalReceipts}`
                        ),
                      ]
                    ),
                  ]
                ),

                // KANAN
                h(
                  'div',
                  {
                    className:
                      'md:col-span-2 bg-white p-4 rounded-lg shadow h-[260px] flex flex-col justify-between',
                  },
                  [
                    h(
                      'div',
                      {
                        className: 'grid grid-cols-2 gap-4 items-center h-full',
                      },
                      [
                        h(
                          'div',
                          {
                            className: 'flex justify-center',
                            style: { width: '200px', height: '220px' },
                          },
                          [h(Pie, { data: pieData, options: pieOptions })]
                        ),

                        h('div', {}, [
                          h(
                            'p',
                            {
                              className:
                                'text-sm text-right mb-1 text-gray-500',
                            },
                            '20 - 26 April, 2025'
                          ),
                          h(Bar, { data: barData, options: barOptions }),
                        ]),
                      ]
                    ),
                  ]
                ),
              ]
            ),
          ]
        ),
      ]
    ),

    // KATEGORI
    h(
      'div',
      { className: 'flex flex-wrap justify-center gap-3 mt-4' },
      kategoriList.map((item, idx) =>
        h(
          'button',
          {
            key: idx,
            className: `flex items-center gap-2 px-4 py-2 rounded-[13px] border-[2px] border-[#B9B9B9] font-medium ${
              selectedKategori.includes(item.nama)
                ? 'bg-[#15CDCA] border-[#0A918E] text-white [text-shadow:0px_0px_5px_rgba(0,0,0,0.3)] drop-shadow-md'
                : 'bg-white border-gray-300 hover:bg-teal-100 text-gray-700'
            }`,
            onClick: () => toggleKategori(item.nama),
          },
          [
            h(Image, {
              src: item.icon.src,
              alt: item.nama,
              width: 20,
              height: 20,
              className: selectedKategori.includes(item.nama)
                ? 'filter brightness-0 invert'
                : '',
            }),
            item.nama,
          ]
        )
      )
    ),

    // HISTORI TRANSAKSI
    h(
      'div',
      {
        className:
          'bg-white p-6 rounded shadow-md border-[4px] border-[#D9D9D9] mt-4',
      },
      [
        h(
          'h3',
          {
            className: 'font-bold text-xl mb-5',
          },
          'Histori Transaksi'
        ),

        h(
          'div',
          { className: 'overflow-auto' }, // dibungkus agar table scroll tetap terjaga
          [
            h(
              'table',
              {
                className: 'w-full text-left border-collapse text-[#0F172A]',
              },
              [
                h('thead', {}, [
                  h(
                    'tr',
                    {
                      className: 'bg-[#4FE0B6] border-b border-[#CBD5E1]',
                    },
                    [
                      h('th', { className: 'py-2' }, 'Tanggal'),
                      h('th', {}, 'Jumlah'),
                      h('th', {}, 'Kategori'),
                      h('th', {}, 'Tipe'),
                    ]
                  ),
                ]),
                h(
                  'tbody',
                  {},
                  filteredData.map((t, i) =>
                    h(
                      'tr',
                      {
                        key: i,
                        className:
                          'border-b border-[#CBD5E1] hover:bg-[#F1F5F9]',
                      },
                      [
                        h('td', { className: 'py-2' }, t.tanggal),
                        h('td', {}, `Rp. ${t.jumlah.toLocaleString()}`),
                        h('td', {}, t.kategori),
                        h('td', {}, t.tipe),
                      ]
                    )
                  )
                ),
              ]
            ),
          ]
        ),
      ]
    ),
  ]);
}
