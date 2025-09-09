// client/src/components/partners/PartnerItem.jsx
import InlineMap from "../kakaomap/InlineMap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

export default function PartnerItem({
  item,
  open,
  onToggle,
  // 글자 크기/스타일 조절용 클래스 (원하면 페이지에서 덮어쓰기)
  nameClass = "text-base md:text-[20px]",
  tagClass = "text-[11px]",
  addrClass = "text-[15px]",
}) {
  return (
    <div className="py-4">
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
        </div>

        {/* 지도 토글 버튼 */}
        <button
          onClick={onToggle}
          aria-label={open ? "close" : "open"}
          className="w-10 h-10 flex items-center justify-center self-start md:self-auto"
        >
          <FontAwesomeIcon
            icon={faLocationDot}
            size="2xl"
            className={`w-8 h-8 ${open ? "text-yellow-300" : "text-gray-300"}`}
          />
        </button>
      </div>

      {/* 인라인 맵 */}
      <div className="mt-3">
        <InlineMap item={item} open={open} />
      </div>
    </div>
  );
}
