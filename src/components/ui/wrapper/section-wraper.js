export default function SectionWrapper({ children, className }) {
  return (
    <div className="w-full flex justify-center">
      <div className={`max-w-[1273px] w-full ${className}`}>
        {children}
      </div>
    </div>
  );
}
