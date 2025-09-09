// client/src/pages/partners/PartnersList.jsx
import { useEffect, useMemo, useState, useCallback } from "react";
import { getRegions, toSidoQuery } from "../../lib/partners/regions";
import { listPartners } from "../../lib/partners/api";
import PartnerItem from "../../components/partners/PartnerItem";
import { Link } from "react-router-dom";
import { deletePartner } from "../../lib/partners";
import useMe from "../../hooks/useMe";

const PAGE_SIZE = 3;

export default function PartnersList() {
  const [siDoList, setSiDoList] = useState([]);
  const [guGunList, setGuGunList] = useState([]);

  const [siDo, setSiDo] = useState(""); // 라벨 그대로 유지 (예: 서울특별시)
  const [guGun, setGuGun] = useState(""); // 라벨 그대로 유지 (예: 강남구)
  const [q, setQ] = useState("");

  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [expandedId, setExpandedId] = useState(null);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(total / PAGE_SIZE)),
    [total]
  );

  const me = useMe();

  // 시/도 목록
  useEffect(() => {
    getRegions().then((m) => setSiDoList(m.si_do || []));
  }, []);

  // 시/도 변경 → 구/군 목록
  useEffect(() => {
    setGuGun("");
    if (!siDo) return setGuGunList([]);
    getRegions(siDo).then((m) => setGuGunList(m.gu_gun || []));
  }, [siDo]);

  const search = useCallback(
    async (nextPage = 1) => {
      setLoading(true);
      try {
        const params = {
          si_do: toSidoQuery(siDo), // ← 라벨 → DB값 변환 (서울특별시 → 서울)
          gu_gun: guGun || "", // ← 접미사 제거 (강남구 → 강남)
          q: q || "",
          page: nextPage,
          pageSize: PAGE_SIZE,
        };
        const { rows, total } = await listPartners(params);
        setRows(rows);
        setTotal(total);
        setPage(nextPage);
        setExpandedId(null);
      } catch (e) {
        alert(e.message || "검색 실패");
      } finally {
        setLoading(false);
      }
    },
    [siDo, guGun, q]
  );

  const handleDelete = useCallback(
    async (id) => {
      if (!id) return;
      if (!window.confirm("정말 삭제하시겠습니까?")) return;

      try {
        setLoading(true);
        await deletePartner(id);

        // 현재 페이지에서 마지막 1건을 지웠다면 이전 페이지로 이동
        const isLastItemOnPage = rows.length === 1 && page > 1;
        const nextPage = isLastItemOnPage ? page - 1 : page;
        await search(nextPage);
      } catch (e) {
        alert(e.message || "삭제 실패");
      } finally {
        setLoading(false);
      }
    },
    [rows.length, page, search]
  );

  useEffect(() => {
    search(1);
  }, [siDo, guGun, search]);

  // 최초 전체 조회
  useEffect(() => {
    if (!siDo && !guGun) search(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 페이지네이션
  const pageCount = totalPages; // 전체 페이지 수
  const pages = useMemo(() => {
    const count = pageCount; // 전체 페이지 수
    const len = Math.min(5, count); // 버튼은 최대 5개까지만 보여줌
    const start = Math.max(
      1, // 최소 1페이지부터
      Math.min(page - 2, count - len + 1) // 현재 페이지를 기준으로 앞뒤로 배치
    );
    return Array.from({ length: len }, (_, i) => start + i);
  }, [page, pageCount]);

  return (
    <div className="container max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-2xl md:text-3xl lg:text-5xl font-semibold text-center md:text-left">
        PARTBERS
      </h1>
      <p className="mt-2 text-[14px] md:text-base lg:text-[23px] text-gray-600 text-center md:text-left">
        코어렌의 가치를 함께 전하는 매장들을 소개해드리겠습니다.
      </p>
      <hr className="mt-8 md:mt-15 border-t-2 border-gray-700" />

      {/* 필터 */}
      <div className="md:pl-50 mt-6 grid grid-cols-1 md:grid-cols-[1fr_1fr_2fr_auto] gap-3 text-gray-500">
        <select
          className="border border-gray-300 rounded px-3 py-2"
          value={siDo}
          onChange={(e) => setSiDo(e.target.value)}
        >
          <option value="">시/도 선택</option>
          {siDoList.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <select
          className="border border-gray-300 rounded px-3 py-2"
          value={guGun}
          onChange={(e) => setGuGun(e.target.value)}
          disabled={!siDo || !guGunList.length}
        >
          <option value="">{siDo ? "구/군" : "구/군"}</option>
          {guGunList.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>

        <input
          className="border border-gray-300 rounded px-3 py-2"
          placeholder="지역명/주소/매장명 검색"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && search(1)}
        />

        <button
          className="rounded bg-black text-white px-5 py-2 disabled:opacity-50"
          onClick={() => search(1)}
          disabled={loading}
        >
          {loading ? "검색중..." : "검색"}
        </button>
      </div>

      {/* 리스트 + 인라인 지도 */}
      <div className="mt-6 border-y border-gray-300 divide-y divide-gray-300">
        {rows.map((it) => (
          <PartnerItem
            key={it.id}
            item={it}
            open={expandedId === it.id}
            onToggle={() => setExpandedId(expandedId === it.id ? null : it.id)}
            onDelete={handleDelete}
            isAdmin={me?.isAdmin}
            loading={loading}
          />
        ))}
        {!rows.length && (
          <div className="py-10 text-center text-gray-500">
            결과가 없습니다.
          </div>
        )}
      </div>

      {/* 파트너스 등록 버튼 */}
      {me.isAdmin && (
        <div className="mt-6 flex justify-end">
          <Link
            to="/partners/create"
            className="rounded px-3 py-2 border cursor-pointer"
          >
            파트너스 등록
          </Link>
        </div>
      )}

      {/* 페이지네이션 */}
      <nav className="mt-6 md:mt-8" aria-label="페이지네이션">
        <ol className="flex items-center justify-center gap-1 md:gap-2 text-xs md:text-sm text-gray-600">
          <li>
            <button
              className="px-2 py-1 disabled:opacity-40"
              disabled={page <= 1 || loading}
              onClick={() => search(page - 1)}
            >
              «
            </button>
          </li>

          {rows.length > 0 &&
            pages.map((p) => (
              <li key={p}>
                <button
                  onClick={() => search(p)}
                  className={`px-2 py-1 ${
                    p === page
                      ? "font-semibold text-gray-900"
                      : "hover:underline"
                  }`}
                  aria-current={p === page ? "page" : undefined}
                  disabled={loading}
                >
                  {p}
                </button>
              </li>
            ))}

          <li>
            <button
              className="px-2 py-1 disabled:opacity-40"
              disabled={page >= pageCount || loading}
              onClick={() => search(page + 1)}
            >
              »
            </button>
          </li>
        </ol>
      </nav>
    </div>
  );
}
