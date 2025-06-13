"use client"
import { useState, useEffect, createElement as h } from 'react';
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
  QTancyHeaderLogo,
} from '@/icons';
import Image from 'next/image';
import style from './style.css';
import { fetchData } from '@/api/qrep';

export default function ReceiptAnalyse() {
  // State untuk data dan filter
  const [dataTransaksi, setDataTransaksi] = useState([]);
  const [paymentType, setPaymentType] = useState('Semua Payment');
  const [timeRange, setTimeRange] = useState('Harian');
  const [selectedKategori, setSelectedKategori] = useState(['Semua']);

  // State untuk data chart
  const [barData, setBarData] = useState({ labels: [], datasets: [] });
  const [pieData, setPieData] = useState({ labels: [], datasets: [] });

  // State untuk loading dan error handling
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const kategoriList = [
    { nama: 'Semua', icon: AllLogo },
    { nama: 'Makanan & Minuman', icon: FoodLogo },
    { nama: 'Transportasi', icon: CarLogo },
    { nama: 'ATK', icon: HouseLogo },
    { nama: 'Kesehatan', icon: MedicalLogo },
    { nama: 'Hiburan', icon: HiburanLogo },
    { nama: 'Lainnya', icon: OthersLogo },
  ];

  // --- EFEK 1: Mengambil data dari API saat komponen dimuat (REVISI FINAL) ---
  useEffect(() => {
    // Helper function untuk memetakan kategori dari API ke frontend
    const mapApiCategoryToFrontend = (apiCategory) => {
      const categoryLower = apiCategory.toLowerCase();
      switch (categoryLower) {
        case 'makanan':
        case 'minuman':
          return 'Makanan & Minuman';
        case 'transportasi':
          return 'Transportasi';
        case 'atk':
          return 'ATK';
        case 'kesehatan':
          return 'Kesehatan';
        case 'hiburan':
          return 'Hiburan';
        default:
          return 'Lainnya';
      }
    };

    // Helper function untuk memetakan tipe pembayaran
    const mapApiPaymentType = (apiPayment) => {
      const paymentLower = apiPayment.toLowerCase();
      return paymentLower === 'kredit' ? 'Credit' : 'Debit';
    };

    const fetchReceipts = async () => {
      setLoading(true);
      setError(null);
      try {
          const apiReceipts = await fetchData()
          console.log("Data mentah dari API:", apiReceipts);
          if (!apiReceipts || apiReceipts.length === 0) {
            setLoading(false);
            return;
          }
          
          const transformedData = apiReceipts.flatMap((receipt) => {
            if (!receipt.items || receipt.items.length === 0) {
              return [];
            }


            const transactionDate = receipt.tanggal_transaksi;
            const paymentType = mapApiPaymentType(receipt.metode_pembayaran);

            // Buat objek transaksi baru untuk setiap item di dalam struk
            return receipt.items
              .filter((item) => item.harga > 0) // Abaikan item yang gratis
              .map((item) => ({
                tanggal: transactionDate,
                nama: item.nama,
                jumlah: item.harga,
                kategori: mapApiCategoryToFrontend(item.kategori),
                tipe: paymentType,
              }));
          });

        setDataTransaksi(transformedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReceipts();
  }, []); // Dependency array kosong, agar hanya berjalan sekali saat mount

  // --- EFEK 2: Memproses data untuk chart setiap kali data atau filter berubah ---
  useEffect(() => {
    if (dataTransaksi.length === 0) return;

    const processData = () => {
      let filtered = dataTransaksi;
      if (paymentType !== 'Semua Payment') {
        filtered = filtered.filter((t) => t.tipe === paymentType);
      }

      const getMonthName = (date) => {
        const monthNames = [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'Mei',
          'Jun',
          'Jul',
          'Agu',
          'Sep',
          'Okt',
          'Nov',
          'Des',
        ];
        return monthNames[new Date(date).getMonth()];
      };

      if (timeRange === 'Harian') {
        const dailyData = filtered.reduce((acc, curr) => {
          const day = curr.tanggal;
          if (!acc[day]) acc[day] = 0;
          acc[day] += curr.jumlah;
          return acc;
        }, {});
        setBarData({
          labels: Object.keys(dailyData).sort(),
          datasets: [
            {
              label: 'Pengeluaran Harian',
              data: Object.values(dailyData),
              backgroundColor: '#4F80E2',
            },
          ],
        });
      } else {
        // Bulanan
        const monthlyData = filtered.reduce((acc, curr) => {
          const month = getMonthName(curr.tanggal);
          if (!acc[month]) acc[month] = 0;
          acc[month] += curr.jumlah;
          return acc;
        }, {});
        setBarData({
          labels: Object.keys(monthlyData),
          datasets: [
            {
              label: 'Pengeluaran Bulanan',
              data: Object.values(monthlyData),
              backgroundColor: '#4F80E2',
            },
          ],
        });
      }

      // Initial Pie Chart Data (Total)
      updatePieData(filtered);
    };

    processData();
  }, [dataTransaksi, timeRange, paymentType]);

  const updatePieData = (data) => {
    const kategoriTotals = data.reduce((acc, curr) => {
      if (!acc[curr.kategori]) acc[curr.kategori] = 0;
      acc[curr.kategori] += curr.jumlah;
      return acc;
    }, {});

    setPieData({
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
    });
  };

  const handleBarClick = (event, elements) => {
    if (elements.length > 0) {
      const elementIndex = elements[0].index;
      const clickedLabel = barData.labels[elementIndex];
      let transactionsForLabel;

      if (timeRange === 'Harian') {
        transactionsForLabel = dataTransaksi.filter(
          (t) => t.tanggal === clickedLabel
        );
      } else {
        // Bulanan
        const monthNames = [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'Mei',
          'Jun',
          'Jul',
          'Agu',
          'Sep',
          'Okt',
          'Nov',
          'Des',
        ];
        const monthIndex = monthNames.indexOf(clickedLabel);
        transactionsForLabel = dataTransaksi.filter(
          (t) => new Date(t.tanggal).getMonth() === monthIndex
        );
      }
      updatePieData(transactionsForLabel);
    }
  };

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

  const filteredDataForTable = selectedKategori.includes('Semua')
    ? dataTransaksi
    : dataTransaksi.filter((t) => selectedKategori.includes(t.kategori));

  const totalExpenses = filteredDataForTable.reduce(
    (sum, t) => sum + t.jumlah,
    0
  );
  const totalReceipts = filteredDataForTable.length;

  // --- Opsi untuk Chart ---
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

  // --- Conditional Rendering ---
  if (loading) {
    return h(
      'div',
      { className: 'flex justify-center items-center h-screen' },
      'Memuat data transaksi...'
    );
  }

  if (error) {
    return h(
      'div',
      { className: 'flex justify-center items-center h-screen text-red-500' },
      `Error: ${error}`
    );
  }

  // --- Render Komponen Utama ---
  return h('main', { className: 'w-full max-w-6xl p-6 space-y-6 mx-auto' }, [
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
            className: 'text-2xl font-extrabold text-black',
          },
          'Hello! This is QRep'
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
              ['Bulanan', 'Harian'].map((opt) =>
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
                          { className: 'font-bold text-xl mt-2' },
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
                          { className: 'font-bold text-2xl mt-3' },
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

        h('div', { className: 'overflow-auto' }, [
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
                    h('th', {}, 'Item'),
                    h('th', {}, 'Jumlah'),
                    h('th', {}, 'Kategori'),
                    h('th', {}, 'Tipe'),
                  ]
                ),
              ]),
              h(
                'tbody',
                {},
                filteredDataForTable.map((t, i) =>
                  h(
                    'tr',
                    {
                      key: i,
                      className: 'border-b border-[#CBD5E1] hover:bg-[#F1F5F9]',
                    },
                    [
                      h('td', { className: 'py-2' }, t.tanggal),
                      h('td', {}, t.nama),
                      h('td', {}, `Rp. ${t.jumlah.toLocaleString()}`),
                      h('td', {}, t.kategori),
                      h('td', {}, t.tipe),
                    ]
                  )
                )
              ),
            ]
          ),
        ]),
      ]
    ),
  ]);
}
