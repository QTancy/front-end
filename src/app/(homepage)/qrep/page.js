'use client';

import HeaderApps from '@/components/ui/headerapps/HeaderApps';
import ReceiptAnalyse from '@/components/ui/qrep/ReceiptAnalyse';

export default function QrepPage() {
  return (
    <>
      <HeaderApps />
      <main className="bg-[#E6FFF9] min-h-screen p-6">
        <ReceiptAnalyse />
      </main>
    </>
  );
}
