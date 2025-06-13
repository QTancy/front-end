'use client';

import HeaderApps from '@/components/ui/headerapps/HeaderApps';
import RegistrationForm from '@/components/ui/settings/SettingForm';

export default function SettingsPage() {
  return (
    <>
      <HeaderApps />
      <main className="bg-[var(--primary)] min-h-screen p-6">
        <RegistrationForm />
      </main>
    </>
  );
}

