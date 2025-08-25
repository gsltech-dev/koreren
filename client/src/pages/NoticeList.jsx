import { useEffect, useState } from "react";
import { getNotices } from "../lib/api";
// (선택) HTML 본문 렌더 시 XSS 방지하려면 DOMPurify 사용 권장

export default function NoticeList() {
  const [data, setData] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(() => {
    const ac = new AbortController();
    getNotices(ac.signal).then(setData).catch(setErr);
    return () => ac.abort();
  }, []);

  if (err) return <div className="p-4 text-red-600">에러: {err.message}</div>;
  if (!data) return <div className="p-4">로딩…</div>;

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-semibold">공지사항</h1>
      <ul className="space-y-3">
        {data.map((n) => (
          <li key={n.id} className="rounded-xl border p-4">
            <h2 className="text-lg font-medium">{n.title}</h2>
            <div className="text-sm text-gray-500">
              {new Date(n.created_at).toLocaleString()}
            </div>
            <p className="mt-2 whitespace-pre-wrap">{n.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
