'use client';

import HeaderApps from '@/components/ui/headerapps/HeaderApps';
import ReceiptUploader from '@/components/ui/qcap/ReceiptUploader';

export default function UploadPage() {
  return (
    <>
      <HeaderApps />
      <main className="body-color-background min-h-screen flex justify-center items-center px-4 py-8">
        <ReceiptUploader />
      </main>
    </>
  );
}

