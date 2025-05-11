export default function RootWrapper({ children, color }) {
  return (
    <div
      className={`w-full h-screen flex flex-col gap-38 ${color === 'secondary' ? 'body-color-background-secondary' : ''}`}
    >
      {children}
    </div>
  );
}
