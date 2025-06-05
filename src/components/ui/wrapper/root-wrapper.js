export default function RootWrapper({ children, color }) {
  return (
    <div
      className={`w-full h-auto flex flex-col gap-8 ${color === 'secondary' ? 'body-color-background-secondary' : ''} mx-auto px-12 py-8 max-w-screen-xl`}
    >
      {children}
    </div>
  );
}
