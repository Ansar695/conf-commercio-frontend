export default function Spinner() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="110"
      height="111"
      viewBox="0 0 110 111"
      fill="none"
    >
      <circle cx="55" cy="55.7339" r="52" stroke="#EEF1F3" strokeWidth="6" />
      <path
        d="M55 107.734C26.2812 107.734 3 84.4527 3 55.7339"
        stroke="#0F3A56"
        strokeWidth="6"
        strokeLinecap="round"
        className="animate-spin origin-center"
      />
    </svg>
  );
}
