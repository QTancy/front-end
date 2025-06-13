'use client'
import { useState, useEffect, createElement as h } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import {
  AllLogo, FoodLogo, HiburanLogo, OthersLogo, MedicalLogo, HouseLogo, CarLogo,
  Bill, TotalExpenses, 
} from '@/icons';
import Image from 'next/image';

export default function ReceiptAnalyse() {
  const [dataTransaksi, setDataTransaksi] = useState([]);
  const [paymentType, setPaymentType] = useState('Semua Payment');
  const [timeRange, setTimeRange] = useState('Harian');
  const [selectedKategori, setSelectedKategori] = useState(['Semua']);

  const [barData, setBarData] = useState({ labels: [], datasets: [] });
  const [pieData, setPieData] = useState({ labels: [], datasets: [] });

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

  useEffect(() => {
    const mapApiCategoryToFrontend = (apiCategory) => {
      const categoryLower = apiCategory.toLowerCase();
      switch (categoryLower) {
        case 'makanan': case 'minuman': return 'Makanan & Minuman';
        case 'transportasi': return 'Transportasi';
        case 'atk': return 'ATK';
        case 'kesehatan': return 'Kesehatan';
        case 'hiburan': return 'Hiburan';
        default: return 'Lainnya';
      }
    };

    const mapApiPaymentType = (apiPayment) => {
      const paymentLower = apiPayment.toLowerCase();
      return paymentLower === 'kredit' ? 'Credit' : 'Debit';
    };

    const fetchReceipts = async () => {
      setLoading(true);
      setError(null);
      try {
        const BASE_URL = "https://qtancy-model-295865298963.asia-southeast2.run.app";
        const token = localStorage.getItem("token");
        const response = await fetch(`${BASE_URL}/receipts/my_receipts`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        const apiReceipts = await response.json();
        if (!response.ok) {
          throw new Error(apiReceipts.detail || 'Gagal mengambil data struk.');
        }
        if (!apiReceipts || apiReceipts.length === 0) {
          setDataTransaksi([]);
          setLoading(false);
          return;
        }

        const transformedData = apiReceipts.flatMap((receipt) => {
          if (!receipt.items || receipt.items.length === 0) {
            return [];
          }

          const transactionDate = receipt.tanggal_transaksi;
          const paymentType = mapApiPaymentType(receipt.metode_pembayaran);

          return receipt.items
            .filter((item) => item.harga > 0)
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
  }, []);

  useEffect(() => {
    if (!dataTransaksi || (dataTransaksi.length === 0 && !loading)) return;

    const processData = () => {
      let filtered = dataTransaksi;
      if (paymentType !== 'Semua Payment') {
        filtered = filtered.filter((t) => t.tipe === paymentType);
      }

      const getMonthName = (dateString) => {
        const date = new Date(dateString);
        if (isNaN(date)) return 'Invalid Date';
        const monthNames = [
          'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
          'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des',
        ];
        return monthNames[date.getMonth()];
      };

      if (timeRange === 'Harian') {
        const dailyData = filtered.reduce((acc, curr) => {
          const day = curr.tanggal.split('T')[0];
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
        const monthlyData = filtered.reduce((acc, curr) => {
          const month = getMonthName(curr.tanggal);
          if (!acc[month]) acc[month] = 0;
          acc[month] += curr.jumlah;
          return acc;
        }, {});
        const orderedMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
        const sortedLabels = orderedMonths.filter(month => Object.keys(monthlyData).includes(month));

        setBarData({
          labels: sortedLabels,
          datasets: [
            {
              label: 'Pengeluaran Bulanan',
              data: sortedLabels.map(month => monthlyData[month]),
              backgroundColor: '#4F80E2',
            },
          ],
        });
      }

      updatePieData(filtered);
    };

    processData();
  }, [dataTransaksi, timeRange, paymentType, loading]);

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
            '#4F80E2', '#15CDCA', '#81F0D1', '#FFB347',
            '#FF6961', '#6A5ACD', '#FAD02E',
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
          (t) => t.tanggal.startsWith(clickedLabel)
        );
      } else {
        const monthNames = [
          'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
          'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des',
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

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
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
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        titleColor: '#0F172A', bodyColor: '#0F172A',
        borderColor: 'gray', borderWidth: 1,
        titleFont: { weight: 'bold', size: 14 },
        bodyFont: { weight: 'normal', size: 14 },
        padding: 12, displayColors: false,
      },
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          font: {
            size: 10,
          },
        },
      },
    },
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        titleColor: '#0F172A', bodyColor: '#0F172A',
        borderColor: 'gray', borderWidth: 1,
        titleFont: { weight: 'bold', size: 14 },
        bodyFont: { weight: 'normal', size: 14 },
        padding: 12, displayColors: false,
      },
      legend: { display: false },
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 10,
          },
        },
      },
      y: {
        ticks: {
          font: {
            size: 10,
          },
        },
      },
    },
  };

  if (loading) {
    return h(
      'div',
      { className: 'flex justify-center items-center h-screen' },
      'Memuat data transaksi...'
    );
  }

  if (!loading && !error && dataTransaksi.length === 0) {
    return h(
      'div',
      { className: 'flex flex-col justify-center items-center h-screen text-gray-500 text-center p-4' },
      [
        h('svg', { className: 'h-16 w-16 mb-4', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', strokeWidth: 2 },
          h('path', { strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' })
        ),
        h('p', {}, 'Belum ada data transaksi yang ditemukan.'),
        h('p', {}, 'Upload struk pertama Anda di Qcap untuk memulai analisis!')
      ]
    );
  }

  if (error) {
    return h(
      'div',
      { className: 'flex justify-center items-center h-screen text-red-500 text-center p-4' },
      `Error: ${error}`
    );
  }

  return h('main', { className: 'w-full max-w-6xl p-4 sm:p-6 space-y-4 sm:space-y-6 mx-auto' }, [
    h(
      'div',
      {
        className:
          'bg-white p-4 sm:p-6 rounded shadow-md border-[4px] border-[#D9D9D9]',
      },
      [
        // Header
        h(
          'h1',
          {
            className: 'text-xl sm:text-2xl font-extrabold text-black',
          },
          'Hello! This is QRep'
        ),

        h(
          'p',
          {
            className: 'text-sm sm:text-base text-[#0F172A] mt-1 sm:mt-2 mb-4',
          },
          'Lihat pengeluaran berdasarkan kategori, tipe payment, atau jangka waktu'
        ),

        // Filter & Summary Header
        h('div', { className: 'flex flex-col sm:flex-row justify-between items-center mt-4 sm:mt-6 gap-3 sm:gap-2' }, [
          h('div', { className: 'font-bold text-lg sm:text-xl text-black w-full sm:w-auto text-center sm:text-left' }, 'Ringkasan Pengeluaran'),

          h('div', { className: 'flex flex-row justify-center sm:justify-end gap-2 w-full sm:w-auto' }, [
            h(
              'select',
              {
                className:
                  'bg-[#EFEFEF] px-3 py-1.5 sm:px-4 sm:py-2 rounded shadow-md text-[#0F172A] text-sm sm:text-base flex-1',
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
                  'bg-[#EFEFEF] px-3 py-1.5 sm:px-4 sm:py-2 rounded shadow-md text-[#0F172A] text-sm sm:text-base flex-1',
                value: timeRange,
                onChange: (e) => setTimeRange(e.target.value),
              },
              ['Bulanan', 'Harian'].map((opt) =>
                h('option', { key: opt, value: opt }, opt)
              )
            ),
          ]),
        ]),

        // Summary Boxes & Charts
        h(
          'div',
          {
            className: 'mt-4 sm:mt-5 bg-[#BDF6F1] p-4 sm:p-6 rounded-[12px] flex flex-col',
          },
          [
            // Title for summary boxes
            h(
              'div',
              {
                className: 'grid grid-cols-1 md:grid-cols-3 gap-4 mb-4',
              },
              [
                h(
                  'h2',
                  {
                    className: 'font-bold text-lg sm:text-xl text-[#0F172A] md:col-span-1 text-center md:text-left',
                  },
                  'Total Pengeluaran'
                ),
                h(
                  'h2',
                  {
                    className: 'font-bold text-lg sm:text-xl text-[#0F172A] md:col-span-2 text-center md:text-left',
                  },
                  'Statistics'
                ),
              ]
            ),

            // Actual Summary Boxes & Charts Grid
            h(
              'div',
              {
                className: 'grid grid-cols-1 md:grid-cols-3 gap-4 items-start flex-grow',
              },
              [
                // KIRI (Total Expenses & Total Receipts) - Stacked vertically in mobile, horizontal on sm:
                h(
                  'div',
                  {
                    className:
                      'md:col-span-1 bg-white p-3 sm:p-4 rounded-lg shadow flex flex-col sm:flex-row md:flex-col gap-2 sm:gap-4 h-full min-h-[120px] sm:min-h-[160px] md:min-h-[260px] flex-wrap justify-center items-center',
                  },
                  [
                    h(
                      'div',
                      {
                        className:
                          'bg-[#4F80E2] text-white rounded-[15px] p-3 sm:p-4 flex flex-col items-center justify-center w-full sm:w-1/2 md:w-full text-center flex-1',
                      },
                      [
                        h(Image, {
                          src: TotalExpenses.src,
                          alt: 'Total Expenses',
                          width: 50, height: 50,
                          className: "sm:w-[75px] sm:h-[75px]"
                        }),
                        h(
                          'p',
                          { className: 'font-bold text-lg sm:text-xl mt-1 sm:mt-2' },
                          `Rp. ${totalExpenses.toLocaleString()}`
                        ),
                      ]
                    ),
                    h(
                      'div',
                      {
                        className:
                          'bg-[#4F80E2] text-white rounded-[15px] p-3 sm:p-4 flex flex-col items-center justify-center w-full sm:w-1/2 md:w-full text-center flex-1',
                      },
                      [
                        h(Image, {
                          src: Bill.src,
                          alt: 'Bill',
                          width: 40, height: 40,
                          className: "sm:w-[55px] sm:h-[55px]"
                        }),
                        h(
                          'p',
                          { className: 'font-bold text-xl sm:text-2xl mt-1 sm:mt-2' },
                          `${totalReceipts}`
                        ),
                      ]
                    ),
                  ]
                ),

                // KANAN (Charts) - Stacked vertically in mobile (until md), then horizontal in md:
                h(
                  'div',
                  {
                    className:
                      'md:col-span-2 bg-white p-3 sm:p-4 rounded-lg shadow flex flex-col md:flex-row justify-around items-center relative h-[350px] md:h-full',
                  },
                  [
                    // Pie Chart Section
                    h(
                      'div',
                      {
                        className: 'relative w-full h-1/2 md:h-full flex flex-col justify-center items-center pb-4 md:pb-0',
                      },
                      [
                        h('h4', { className: 'text-sm font-semibold text-black mb-1 sm:mb-2 text-center' }, 'Pengeluaran Berdasarkan Kategori'), // Tambahan: text-center
                        h('div', { className: 'relative w-40 h-40 sm:w-48 sm:h-48 max-w-[200px] md:max-w-none' }, [
                          h(Pie, { data: pieData, options: pieOptions }),
                        ]),
                      ]
                    ),

                    // Bar Chart Section
                    h(
                      'div',
                      {
                        className: 'relative w-full h-1/2 md:h-full flex flex-col justify-center items-center pt-4 md:pt-0',
                      },
                      [
                        h('h4', { className: 'text-sm font-semibold text-black mb-1 sm:mb-2 text-center' }, `Pengeluaran ${timeRange}`), // Tambahan: text-center
                        h('div', { className: 'relative w-full h-40 sm:h-48 max-w-[250px] md:max-w-none' }, [
                          h(Bar, { data: barData, options: barOptions, onClick: handleBarClick }),
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

    // KATEGORI Filter Buttons
    h(
      'div',
      { className: 'flex flex-wrap justify-center gap-2 sm:gap-3 mt-4 sm:mt-6' },
      kategoriList.map((item, idx) =>
        h(
          'button',
          {
            key: item.nama,
            className: `flex items-center justify-center gap-1 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-[13px] border-[2px] border-[#B9B9B9] font-medium text-xs sm:text-sm ${
              selectedKategori.includes(item.nama)
                ? 'bg-[#15CDCA] border-[#0A918E] text-white [text-shadow:0px_0px_5px_rgba(0,0,0,0.3)] drop-shadow-md'
                : 'bg-white border-gray-300 hover:bg-teal-100 text-gray-700'
            } w-full xs:w-auto flex-grow sm:flex-grow-0`,
            onClick: () => toggleKategori(item.nama),
          },
          [
            h(Image, {
              src: item.icon.src,
              alt: item.nama,
              width: 16, height: 16,
              className: `sm:w-[20px] sm:h-[20px] ${selectedKategori.includes(item.nama) ? 'filter brightness-0 invert' : ''}`,
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
          'bg-white p-4 sm:p-6 rounded shadow-md border-[4px] border-[#D9D9D9] mt-4 sm:mt-6',
      },
      [
        h(
          'h3',
          {
            className: 'font-bold text-xl sm:text-2xl mb-4 sm:mb-5 text-black',
          },
          'Histori Transaksi'
        ),

        h('div', { className: 'overflow-x-auto overflow-y-hidden' }, [
          h(
            'table',
            {
              className: 'min-w-full text-left border-collapse text-[#0F172A] text-sm sm:text-base',
            },
            [
              h('thead', {}, [
                h(
                  'tr',
                  {
                    className: 'bg-[#4FE0B6] border-b border-[#CBD5E1]',
                  },
                  [
                    h('th', { className: 'py-2 px-2 sm:px-4 whitespace-nowrap' }, 'Tanggal'),
                    h('th', { className: 'py-2 px-2 sm:px-4 whitespace-nowrap' }, 'Item'),
                    h('th', { className: 'py-2 px-2 sm:px-4 whitespace-nowrap' }, 'Jumlah'),
                    h('th', { className: 'py-2 px-2 sm:px-4 whitespace-nowrap' }, 'Kategori'),
                    h('th', { className: 'py-2 px-2 sm:px-4 whitespace-nowrap' }, 'Tipe'),
                  ]
                ),
              ]),
              h(
                'tbody',
                {},
                filteredDataForTable.length > 0 ? (
                  filteredDataForTable.map((t, i) =>
                    h(
                      'tr',
                      {
                        key: `${t.tanggal}-${t.nama}-${t.jumlah}-${i}`,
                        className: 'border-b border-[#CBD5E1] hover:bg-[#F1F5F9]',
                      },
                      [
                        h('td', { className: 'py-2 px-2 sm:px-4 text-xs sm:text-sm whitespace-nowrap' }, t.tanggal),
                        h('td', { className: 'py-2 px-2 sm:px-4 text-xs sm:text-sm whitespace-nowrap' }, t.nama),
                        h('td', { className: 'py-2 px-2 sm:px-4 text-xs sm:text-sm whitespace-nowrap' }, `Rp. ${t.jumlah.toLocaleString()}`),
                        h('td', { className: 'py-2 px-2 sm:px-4 text-xs sm:text-sm whitespace-nowrap' }, t.kategori),
                        h('td', { className: 'py-2 px-2 sm:px-4 text-xs sm:text-sm whitespace-nowrap' }, t.tipe),
                      ]
                    )
                  )
                ) : (
                  h(
                    'tr',
                    {},
                    h('td', { colSpan: 5, className: 'py-4 text-center text-gray-500' }, 'Tidak ada data transaksi ditemukan.')
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