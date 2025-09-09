// client/src/components/partners/PartnerItem.jsx
import InlineMap from "../kakaomap/InlineMap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function PartnerItem({
  item,
  open,
  onToggle,
  onDelete,
  // 글자 크기/스타일 조절용 클래스 (원하면 페이지에서 덮어쓰기)
  nameClass = "text-base md:text-[20px]",
  tagClass = "text-[11px]",
  addrClass = "text-[15px]",
}) {
  return (
    <div
      className="py-4 cursor-pointer hover:bg-gray-50 transition"
      onClick={onToggle} // 박스 전체 클릭으로 토글
    >
      <div className="flex flex-row items-start md:items-center justify-between gap-3">
        {/* 좌측 정보 */}
        <div className="min-w-0">
          {/* 이름 + 태그 (간격/패딩 적용) */}
          <div className="px-5 mb-3">
            <div className={`font-semibold truncate ${nameClass}`}>
              {item.name}
              {item.tag && (
                <span
                  className={`ml-2 px-2 py-0.5 rounded bg-[#2f63b8] text-white align-middle ${tagClass}`}
                >
                  {item.tag}
                </span>
              )}
            </div>
          </div>

          {/* 주소/연락처 */}
          <div
            className={`px-5 space-y-0.5 text-gray-600 truncate ${addrClass}`}
          >
            {item.address}
            {item.detail_address ? `, ${item.detail_address}` : ""}
          </div>
          {item.phone && (
            <div className={`px-5 text-gray-600 ${addrClass}`}>
              {item.phone}
            </div>
          )}
          {/* 수정 버튼 */}
          <div className="px-5 mt-2 flex gap-2">
            <Link
              to={`/partners/${item.id}/edit`}
              onClick={(e) => e.stopPropagation()}
              className="inline-block text-xs text-gray-600 hover:underline"
            >
              수정
            </Link>
            <button
              className="inline-block text-xs text-red-600 hover:underline"
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.(item.id);
              }}
            >
              삭제
            </button>
          </div>
        </div>

        {/* 아이콘 (보조 표시용) */}
        <div className="w-10 h-10 flex items-center justify-center">
          <FontAwesomeIcon
            icon={faLocationDot}
            size="2xl"
            className={`w-8 h-8 ${open ? "text-yellow-300" : "text-gray-200"}`}
          />
        </div>
      </div>

      {/* 인라인 맵 */}
      <div className="mt-3">
        <InlineMap item={item} open={open} />
      </div>
    </div>
  );
}
