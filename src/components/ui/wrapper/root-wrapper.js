export default function RootWrapper({ children, color }) {
  return (
    <div
      className={`flex flex-col ${color === 'secondary' ? 'body-color-background-secondary' : ''} justify-center items-center max-w-screen-xl`}
    >
      {children}
    </div>
  );
}
