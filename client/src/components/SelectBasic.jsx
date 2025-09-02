import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

export default function SelectBasic({
  value,
  onChange,
  options,
  className = "",
}) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef(null);
  const listRef = useRef(null);

  // 외부 클릭 닫기
  useEffect(() => {
    const onDocClick = (e) => {
      if (!btnRef.current || !listRef.current) return;
      if (btnRef.current.contains(e.target)) return;
      if (listRef.current.contains(e.target)) return;
      setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  // Esc 닫기
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const current = options.find((o) => o.value === value) || options[0];

  return (
    <div className={`relative ${className}`}>
      <button
        ref={btnRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="h-9 md:h-10 w-full rounded border px-3 text-left text-xs md:text-sm lg:text-sm flex items-center justify-between"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span>{current?.label}</span>
        <FontAwesomeIcon
          icon={faChevronDown}
          className="ml-2 text-gray-500 w-3 h-3"
        />
      </button>

      {open && (
        <ul
          ref={listRef}
          role="listbox"
          className="absolute left-0 right-0 mt-1 z-50 max-h-60 overflow-auto rounded border bg-white shadow-lg"
        >
          {options.map((o) => (
            <li
              key={o.value}
              role="option"
              aria-selected={o.value === value}
              onClick={() => {
                onChange(o.value);
                setOpen(false);
              }}
              className={`px-3 py-2 cursor-pointer text-sm hover:bg-gray-100 ${
                o.value === value ? "bg-gray-50 font-medium" : ""
              }`}
            >
              {o.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
