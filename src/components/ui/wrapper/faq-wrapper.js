import FAQItems from '../faq/faq-items';

export default function FAQWrapper() {
  return (
    <div className="flex w-full justify-between flex-row gap-2.5">
      <FAQItems
        question={'Q: What is Qtancy and who is this application for?'}
        answer={
          'A: Qtancy is an AI-based web application specifically designed to help Micro, Small, and Medium Enterprises (MSMEs) in Indonesia. Its purpose is to automate the process of recording transactions and managing business documents (like receipts and invoices) to make it easier, faster, and more accurate.'
        }
      ></FAQItems>
      <FAQItems
        question={'Q: What is Qtancy and who is this application for?'}
        answer={
          'A: Qtancy is an AI-based web application specifically designed to help Micro, Small, and Medium Enterprises (MSMEs) in Indonesia. Its purpose is to automate the process of recording transactions and managing business documents (like receipts and invoices) to make it easier, faster, and more accurate.'
        }
      ></FAQItems>
    </div>
  );
}
