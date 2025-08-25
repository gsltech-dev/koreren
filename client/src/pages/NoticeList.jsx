import { useEffect, useState } from "react";
import { getNotices } from "../lib/api"; // 별칭 안 쓴다면 상대경로

export default function NoticeList() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const data = await getNotices();
        setNotices(data);
      } catch (e) {
        console.error(e);
        setError(String(e.message || e));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div>로딩...</div>;
  if (error) return <div style={{ color: "red" }}>에러: {error}</div>;

  return (
    <ul>
      {notices.map((n) => (
        <li key={n.id}>
          <strong>{n.title}</strong> — {n.name}
        </li>
      ))}
    </ul>
  );
}
