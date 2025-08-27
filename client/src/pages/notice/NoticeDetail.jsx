// src/pages/notice/NoticeDetail.jsx
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getNotice } from "../../lib/api";

export default function NoticeDetail() {
  const { id } = useParams();
  const numId = Number.parseInt(id, 10);
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (!Number.isFinite(numId)) {
      navigate("/notices", { replace: true });
      return;
    }
    (async () => {
      try {
        const data = await getNotice(numId);
        setItem(data);
      } catch (e) {
        setErr(e.message || "불러오기 실패");
      } finally {
        setLoading(false);
      }
    })();
  }, [numId, navigate]);

  if (loading) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-14">
        <div className="animate-pulse space-y-6">
          <div className="h-7 bg-gray-200 rounded w-28 mx-auto" />
          <div className="h-px bg-gray-200" />
          <div className="h-6 bg-gray-200 rounded w-2/3" />
          <div className="h-4 bg-gray-200 rounded w-24" />
          <div className="h-64 bg-gray-200 rounded" />
        </div>
      </div>
    );
  }
  if (err) return <div className="p-6 text-red-500">{err}</div>;
  if (!item) return null;

  return (
    <div className="container max-w-7xl mx-auto px-4 py-12">
      <div>
        <div className="p-6 border-b border-gray-900">
          <h1 className="text-center text-3xl tracking-tight font-semibold">
            NOTICE
          </h1>
        </div>

        <div className="py-8 border-b border-gray-200">
          <h2 className="text-lg md:text-xl font-medium text-gray-900">
            {item.title}
          </h2>
          <div className="mt-5 text-xs text-gray-500">{item.name}</div>
        </div>

        <article
          className="
    min-h-[280px] py-10
    prose prose-neutral max-w-none
    [&_*]:max-w-full
    prose-img:block prose-img:mx-auto prose-img:h-auto prose-img:w-auto
    prose-table:w-full prose-table:overflow-x-auto
  "
          dangerouslySetInnerHTML={{ __html: item.body || "" }}
        />

        <div className="mt-10 flex justify-end">
          <Link
            to={`/notices/${item.id}/update`}
            className="inline-flex items-center justify-center border border-gray-300 px-12 h-10 rounded text-sm hover:bg-gray-50"
          >
            수정
          </Link>
          <Link
            to="/notices"
            className="inline-flex items-center justify-center border border-gray-300 px-12 h-10 rounded text-sm hover:bg-gray-50"
          >
            목록
          </Link>
        </div>
      </div>

      <div className="mt-12 text-sm">
        {item.prev && (
          <div
            className={`flex items-center justify-start py-3 ${
              item.next ? "border-b border-gray-200" : ""
            }`}
          >
            <span className="text-gray-500">이전</span>
            <Link
              to={`/notices/${item.prev.id}`}
              className="ml-4 truncate text-gray-700 hover:underline"
            >
              {item.prev.title}
            </Link>
          </div>
        )}
        {item.next && (
          <div className="flex items-center justify-start py-3">
            <span className="text-gray-500">다음</span>
            <Link
              to={`/notices/${item.next.id}`}
              className="ml-4 truncate text-gray-700 hover:underline"
            >
              {item.next.title}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
