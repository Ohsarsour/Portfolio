export default function PenMark({ children }) {
  return (
    <span className="pen-mark">
      {children}
      <svg viewBox="0 0 100 6" preserveAspectRatio="none" aria-hidden="true">
        <path d="M1,4.2 C18,2.4 36,5.2 52,3.4 C68,1.8 84,4.6 99,2.8" />
      </svg>
    </span>
  );
}
