import React from "react";

export default function Notice() {
  const rows = [
    {
      no: 46,
      title: "[공지] 티르티르 8월 리프레시 데이 공지 안내",
      href: "#",
      author: "KOREREN",
    },
    {
      no: 45,
      title: "[공지] 티르티르 8월 택배없는날 공지 안내",
      href: "#",
      author: "KOREREN",
    },
    {
      no: 44,
      title: "[공지] 티르티르 베스트 리뷰어 당첨자 발표 (2025년 7월)",
      href: "#",
      author: "KOREREN",
    },
    {
      no: 43,
      title: "[공지] 2025 7월 재고 실사 배송 지연 공지 안내",
      href: "#",
      author: "KOREREN",
    },
    {
      no: 42,
      title: "[공지] 티르티르 7월 리프레시 데이 공지 안내",
      href: "#",
      author: "KOREREN",
    },
    {
      no: 41,
      title: "[공지] 구매적립금 일괄 발급 예정 안내",
      href: "#",
      author: "KOREREN",
    },
    {
      no: 40,
      title: "[공지] 이전 쇼핑몰 회원정보 확인 안내 공지",
      href: "#",
      author: "KOREREN",
    },
    {
      no: 39,
      title: "[공지] 티르티르 베스트 리뷰어 당첨자 발표 (2025년 6월)",
      href: "#",
      author: "KOREREN",
    },
    {
      no: 38,
      title: "[공지] 적립금/예치금/쿠폰 사용 및 회원등급 확인 가능 안내 공지",
      href: "#",
      author: "KOREREN",
    },
    {
      no: 37,
      title: "[공지] 2025 6월 재고 실사 배송 지연 공지 안내",
      href: "#",
      author: "KOREREN",
    },
    {
      no: 36,
      title: "[공지] 적립금/예치금/쿠폰 사용 및 회원등급 확인 불가 안내 공지",
      href: "#",
      author: "KOREREN",
    },
    {
      no: 35,
      title: "[공지] 티르티르 쇼핑몰 이전에 따른 비밀번호 재설정 방법 공지",
      href: "#",
      author: "KOREREN",
    },
    {
      no: 34,
      title:
        "[공지] 티르티르 공식몰 고정형 영상정보처리기기 운영방침 개정 공지",
      href: "#",
      author: "KOREREN",
    },
    {
      no: 33,
      title: "[공지] 티르티르 공식몰 개인정보처리방침 개정 공지",
      href: "#",
      author: "KOREREN",
    },
    {
      no: 32,
      title: "[공지] 티르티르 6월 리프레시 데이 공지 안내",
      href: "#",
      author: "KOREREN",
    },
  ];

  const pages = [1, 2, 3, 4];
  const current = 1;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      {/* 타이틀 */}
      <div className="p-6">
        <h1 className="text-center text-3xl font-semibold tracking-tight">
          NOTICE
        </h1>
      </div>
      {/* 리스트 테이블 */}
      <section className="mt-8" aria-labelledby="notice-list-caption">
        <table className="w-full table-fixed border-separate border-spacing-0">
          <caption id="notice-list-caption" className="sr-only">
            게시판 목록
          </caption>
          <thead>
            <tr className="bg-gray-50 text-gray-600 text-sm">
              <th scope="col" className="w-20 px-4 py-6 text-center font-bold">
                번호
              </th>
              <th scope="col" className="px-4 py-6 text-center font-bold">
                제목
              </th>
              <th scope="col" className="w-32 px-4 py-6 text-center font-bold">
                작성자
              </th>
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

      {/* 검색 영역 */}
      <form className="mt-8" method="get" action="/board/notice/1">
        <fieldset className="flex flex-wrap items-center gap-3">
          <legend className="sr-only">게시물 검색</legend>
          <select
            name="search_date"
            defaultValue="week"
            className="h-10 rounded border border-gray-300 px-3 text-sm"
          >
            <option value="week">일주일</option>
            <option value="month">한달</option>
            <option value="month3">세달</option>
            <option value="all">전체</option>
          </select>
          <select
            name="search_key"
            defaultValue="subject"
            className="h-10 rounded border border-gray-300 px-3 text-sm"
          >
            <option value="subject">제목</option>
            <option value="content">내용</option>
            <option value="writer_name">글쓴이</option>
            <option value="member_id">아이디</option>
            <option value="nick_name">별명</option>
          </select>
          <input
            name="search"
            type="text"
            placeholder="검색어"
            className="h-10 min-w-[200px] rounded border border-gray-300 px-3 text-sm"
          />
          <button
            type="submit"
            className="h-10 rounded border border-gray-400 px-4 text-sm"
          >
            찾기
          </button>
        </fieldset>
      </form>

      {/* 페이지 네비게이션 */}
      <nav className="mt-8 py-15" aria-label="페이지네이션">
        <ol className="flex items-center justify-center gap-2 text-sm text-gray-600">
          <li>
            <a href="#" aria-label="이전 페이지" className="px-2 py-1">
              «
            </a>
          </li>
          {pages.map((p) => (
            <li key={p}>
              {p === current ? (
                <a
                  href={`?board_no=1&page=${p}`}
                  aria-current="page"
                  className="px-2 py-1 font-semibold text-gray-900"
                >
                  {p}
                </a>
              ) : (
                <a
                  href={`?board_no=1&page=${p}`}
                  className="px-2 py-1 hover:underline"
                >
                  {p}
                </a>
              )}
            </li>
          ))}
          <li>
            <a href="#" aria-label="다음 페이지" className="px-2 py-1">
              »
            </a>
          </li>
        </ol>
      </nav>
    </div>
  );
}
