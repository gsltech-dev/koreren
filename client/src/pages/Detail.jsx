export default function Detail() {
  // 임시 데이터 (API 연동 전)
  const breadcrumb = [
    { label: "홈", href: "/" },
    { label: "게시판", href: "/board/index.html" },
    { label: "NOTICE" },
  ];

  const post = {
    id: 213,
    boardNo: 1,
    no: 46,
    title: "[공지] 티르티르 8월 리프레시 데이 공지 안내",
    author: "KOREREN",
    date: "2025-08-18",
    views: 22,
    contentHtml: `
      <div style="text-align:left;">
        <p class="mb-4">안녕하세요 티르티르 입니다 :)</p>
        <p class="mb-2">매월 셋째 주 금요일은 리프레시 데이(휴무)입니다.</p>
        <p class="mb-2"><strong>8.21(목) 오후 1시 이전 주문 ▶ 정상 출고</strong></p>
        <p class="mb-2"><strong>8.21(목) 오후 1시 이후 주문 ▶ 8.25(월) 순차 출고</strong></p>
        <p class="mt-6">주문시 배송 일정 참고 바랍니다. 감사합니다.</p>
      </div>
    `,
    attachments: [
      // { name: "notice.pdf", href: "#" },
    ],
    prev: null,
    next: {
      href: "/article/notice/1/204/page/1/",
      title: "[공지] 8월 택배없는날 공지 안내",
    },
    listHref: "/board/notice/1/?page=1",
    editHref: "/board/free/modify.html?board_act=edit&no=213&board_no=1",
  };

  return (
    <div id="contents" className="mx-auto max-w-7xl px-4 py-10">
      {/* 현재 위치 */}
      <div className="text-sm text-gray-500">
        <span className="sr-only">현재 위치</span>
        <ol className="flex flex-wrap items-center gap-2">
          {breadcrumb.map((b, i) => (
            <li key={i} className="flex items-center gap-2">
              {b.href ? (
                <a href={b.href} className="hover:underline">
                  {b.label}
                </a>
              ) : (
                <strong className="text-gray-800">{b.label}</strong>
              )}
              {i < breadcrumb.length - 1 && <span aria-hidden>›</span>}
            </li>
          ))}
        </ol>
      </div>

      {/* 보드 타이틀 */}
      <div className="mt-4">
        <h2 className="text-2xl font-semibold text-gray-800">NOTICE</h2>
      </div>

      {/* 본문 헤더 */}
      <article className="mt-8 rounded-lg border border-gray-200">
        <header className="border-b border-gray-200 px-5 py-5">
          <h3 className="text-xl font-semibold text-gray-900">{post.title}</h3>
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500">
            <span>작성자 {post.author}</span>
            <span>작성일 {post.date}</span>
            <span>조회 {post.views}</span>
            <span>번호 {post.no}</span>
          </div>
        </header>

        {/* 삭제용 패스워드 영역 자리만 */}
        <div className="hidden px-5 py-4">
          <label htmlFor="password" className="mr-3 text-sm text-gray-600">
            삭제 비밀번호
          </label>
          <input
            id="password"
            type="password"
            autoComplete="new-password"
            className="h-9 w-64 rounded border border-gray-300 px-3 text-sm"
          />
          <p className="mt-2 text-xs text-gray-400">
            삭제하려면 비밀번호를 입력하세요.
          </p>
        </div>

        {/* 첨부 영역 */}
        {post.attachments.length > 0 && (
          <section className="px-5 py-4">
            <h4 className="mb-2 text-sm font-medium text-gray-700">첨부파일</h4>
            <ul className="divide-y divide-gray-200 rounded border border-gray-200">
              {post.attachments.map((f, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between px-4 py-3 text-sm"
                >
                  <span className="text-gray-700">{f.name}</span>
                  <a href={f.href} className="text-gray-600 hover:underline">
                    다운로드
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* 본문 내용 */}
        <section className="prose max-w-none px-5 py-6">
          <div
            className="prose-p:my-2 prose-p:text-gray-800"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />
        </section>
      </article>

      {/* 하단 버튼 */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2">
          {/* 관리자 전용 버튼 자리 */}
          {/* <button className="h-10 rounded border border-gray-300 px-4 text-sm text-gray-700">삭제</button>
          <a href={post.editHref} className="h-10 rounded border border-gray-300 px-4 text-sm text-gray-700">수정</a> */}
        </div>
        <div className="flex gap-2">
          <a
            href={post.listHref}
            className="h-10 rounded border border-gray-300 px-4 text-sm text-gray-700"
          >
            목록
          </a>
          {/* <a href="/board/product/reply.html" className="hidden h-10 rounded border border-gray-300 px-4 text-sm text-gray-700">답변쓰기</a> */}
        </div>
      </div>

      {/* 이전/다음 */}
      <nav className="mt-8">
        <ul className="divide-y divide-gray-200 rounded border border-gray-200 text-sm">
          <li className="flex items-center gap-4 px-4 py-3">
            <strong className="w-14 shrink-0 text-gray-500">이전</strong>
            {post.prev ? (
              <a
                href={post.prev.href}
                className="truncate text-gray-800 hover:underline"
              >
                {post.prev.title}
              </a>
            ) : (
              <span className="text-gray-400">없음</span>
            )}
          </li>
          <li className="flex items-center gap-4 px-4 py-3">
            <strong className="w-14 shrink-0 text-gray-500">다음</strong>
            {post.next ? (
              <a
                href={post.next.href}
                className="truncate text-gray-800 hover:underline"
              >
                {post.next.title}
              </a>
            ) : (
              <span className="text-gray-400">없음</span>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
}
