// src/pages/notice/NoticeList.jsx
import { useEffect, useState } from "react";
import { getNotices } from "../../lib/api";
import { Link, useSearchParams } from "react-router-dom";

const PAGE_SIZE = 15;

export default function NoticeList() {
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const [sp, setSp] = useSearchParams();
  const page = Number(sp.get("page") || 1);
  const field = sp.get("field") || "title"; // title|body|name
  const q = sp.get("q") || "";
  const range = sp.get("range") || "all"; // all|week|month|month3

  useEffect(() => {
    setLoading(true);
    getNotices({ page, pageSize: PAGE_SIZE, q, field })
      .then(({ rows, total }) => {
        setRows(
          rows.map((n, i) => ({
            no: total - ((page - 1) * PAGE_SIZE + i),
            title: n.title,
            href: `/notices/${n.id}`,
            author: n.name,
          }))
        );
        setTotal(total);
      })
      .catch((e) => setErr(e.message || "불러오기 실패"))
      .finally(() => setLoading(false));
  }, [page, q, field, range]);

  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const onSearch = (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setSp({ page: "1", field: fd.get("field"), q: fd.get("q") ?? "", range });
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-4 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }
  if (err) return <div className="p-6 text-red-500">{err}</div>;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="p-6">
        <h1 className="text-center text-3xl font-semibold tracking-tight">
          NOTICE
        </h1>
      </div>

      {/* 리스트 */}
      <section className="mt-2" aria-labelledby="notice-list-caption">
        <table className="w-full table-fixed border-separate border-spacing-0">
          <caption id="notice-list-caption" className="sr-only">
            게시판 목록
          </caption>
          <thead>
            <tr className="bg-gray-50 text-gray-600 text-sm">
              <th className="w-20 px-4 py-6 text-center font-bold">번호</th>
              <th className="px-4 py-6 text-center font-bold">제목</th>
              <th className="w-32 px-4 py-6 text-center font-bold">작성자</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.no} className="text-sm">
                <td className="px-4 py-6 text-gray-700 border-b border-gray-200 text-center">
                  {row.no}
                </td>
                <td className="px-4 py-6 border-b border-gray-200">
                  <Link
                    to={row.href}
                    className="block truncate text-gray-800"
                    title={row.title}
                  >
                    {row.title}
                  </Link>
                </td>
                <td className="px-4 py-6 text-center text-gray-500 border-b border-gray-200 ">
                  {row.author}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      {/* 검색 */}
      <form
        className="mt-8 mb-6 flex items-center justify-between gap-3"
        onSubmit={onSearch}
      >
        {/* 왼쪽: 검색 */}
        <div className="flex gap-2">
          <select
            value={range}
            onChange={(e) =>
              setSp({ page: "1", field, q, range: e.target.value })
            }
            className="h-10 rounded border px-3 text-sm"
          >
            <option value="all">전체</option>
            <option value="week">일주일</option>
            <option value="month">한달</option>
            <option value="month3">세달</option>
          </select>

          <select
            name="field"
            defaultValue={field}
            className="h-10 rounded border px-3 text-sm"
          >
            <option value="title">제목</option>
            <option value="body">내용</option>
            <option value="name">작성자</option>
          </select>

          <input
            name="q"
            defaultValue={q}
            placeholder="검색어"
            className="h-10 min-w-[220px] rounded border px-3 text-sm"
          />

          <button className="h-10 rounded border px-4 text-sm">찾기</button>
        </div>

        {/* 오른쪽: 글작성 */}
        <a
          href="/notices/write"
          className="h-10 inline-flex items-center rounded border px-4 text-sm"
        >
          글작성
        </a>
      </form>
      {/* 페이지네이션 */}
      <nav className="mt-8" aria-label="페이지네이션">
        <ol className="flex items-center justify-center gap-2 text-sm text-gray-600">
          <li>
            <button
              className="px-2 py-1 disabled:opacity-40"
              disabled={page <= 1}
              onClick={() => setSp({ page: String(page - 1), field, q })}
            >
              «
            </button>
          </li>
          {Array.from({ length: pageCount })
            .slice(0, 5)
            .map((_, idx) => {
              const p = Math.min(pageCount, Math.max(1, page - 2)) + idx;
              if (p > pageCount) return null;
              return (
                <li key={p}>
                  <button
                    onClick={() => setSp({ page: String(p), field, q })}
                    className={`px-2 py-1 ${
                      p === page
                        ? "font-semibold text-gray-900"
                        : "hover:underline"
                    }`}
                    aria-current={p === page ? "page" : undefined}
                  >
                    {p}
                  </button>
                </li>
              );
            })}
          <li>
            <button
              className="px-2 py-1 disabled:opacity-40"
              disabled={page >= pageCount}
              onClick={() => setSp({ page: String(page + 1), field, q })}
            >
              »
            </button>
          </li>
        </ol>
      </nav>
    </div>
  );
}
