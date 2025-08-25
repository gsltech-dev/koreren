import { useEffect, useState } from "react";
import { getNotices } from "../../lib/api";

export default function NoticeList() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const data = await getNotices();
        const mapped = data.map((n, i) => ({
          no: data.length - i, // 최신이 위로
          title: n.title,
          href: `/notices/${n.id}`,
          author: n.name,
        }));
        setRows(mapped);
      } catch (e) {
        setErr(e.message || "불러오기 실패");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }
  if (err) return <div className="p-6 text-red-500">{err}</div>;

  const pages = [1, 2, 3, 4]; // TODO: 서버 페이지네이션 붙이면 교체
  const current = 1;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="p-6">
        <h1 className="text-center text-3xl font-semibold tracking-tight">
          NOTICE
        </h1>
      </div>

      <section className="mt-8" aria-labelledby="notice-list-caption">
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
                  <a
                    href={row.href}
                    className="block truncate text-gray-800"
                    title={row.title}
                  >
                    {row.title}
                  </a>
                </td>
                <td className="px-4 py-6 text-center text-gray-500 border-b border-gray-200 ">
                  {row.author}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* 검색/페이지네이션은 추후 서버 기능 붙일 때 활성화 */}
      <form className="mt-8" onSubmit={(e) => e.preventDefault()}>
        <fieldset className="flex flex-wrap items-center gap-3">
          <legend className="sr-only">게시물 검색</legend>
          <select
            className="h-10 rounded border border-gray-300 px-3 text-sm"
            defaultValue="week"
          >
            <option value="week">일주일</option>
            <option value="month">한달</option>
            <option value="month3">세달</option>
            <option value="all">전체</option>
          </select>
          <select
            className="h-10 rounded border border-gray-300 px-3 text-sm"
            defaultValue="subject"
          >
            <option value="subject">제목</option>
            <option value="content">내용</option>
            <option value="writer_name">글쓴이</option>
            <option value="member_id">아이디</option>
            <option value="nick_name">별명</option>
          </select>
          <input
            className="h-10 min-w-[200px] rounded border border-gray-300 px-3 text-sm"
            placeholder="검색어"
          />
          <button className="h-10 rounded border border-gray-400 px-4 text-sm">
            찾기
          </button>
        </fieldset>
      </form>

      <nav className="mt-8 py-15" aria-label="페이지네이션">
        <ol className="flex items-center justify-center gap-2 text-sm text-gray-600">
          <li>
            <a href="#" className="px-2 py-1">
              «
            </a>
          </li>
          {pages.map((p) => (
            <li key={p}>
              {p === current ? (
                <a
                  href={`?page=${p}`}
                  aria-current="page"
                  className="px-2 py-1 font-semibold text-gray-900"
                >
                  {p}
                </a>
              ) : (
                <a href={`?page=${p}`} className="px-2 py-1 hover:underline">
                  {p}
                </a>
              )}
            </li>
          ))}
          <li>
            <a href="#" className="px-2 py-1">
              »
            </a>
          </li>
        </ol>
      </nav>
    </div>
  );
}
