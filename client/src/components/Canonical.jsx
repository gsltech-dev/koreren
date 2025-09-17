// src/components/Canonical.jsx
import { useLocation } from "react-router-dom";

export default function Canonical() {
  const { pathname, search } = useLocation();
  const href = `https://koreren.co.kr${pathname}${search || ""}`;
  return <link rel="canonical" href={href} />;
}
