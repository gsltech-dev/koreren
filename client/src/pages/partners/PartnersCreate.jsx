// client/src/pages/partners/PartnersCreate.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddressSearchModal from "../../components/partners/AddressSearchModal";
import { createPartner } from "../../lib/partners/api";

export default function PartnersCreate() {
  const nav = useNavigate();

  const [name, setName] = useState("");
  const [tag, setTag] = useState("");
  const [phone, setPhone] = useState("");

  const [postal, setPostal] = useState("");
  const [address, setAddress] = useState("");
  const [detail, setDetail] = useState("");

  const [addrOpen, setAddrOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function handlePickAddress({ address, postal_code }) {
    setAddress(address || "");
    setPostal(postal_code || "");
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return alert("매장명을 입력하세요.");
    if (!postal.trim()) return alert("주소 찾기로 우편번호를 선택하세요.");
    if (!address.trim()) return alert("주소 찾기로 주소를 선택하세요.");

    const payload = {
      name: name.trim(),
      tag: tag.trim() || null,
      phone: phone.trim() || null, // 숫자만 입력 유도(인풋에서 처리)
      address: address.trim(),
      detail_address: detail.trim() || null,
      postal_code: postal.trim() || null,
      // si_do / gu_gun / lat / lng 는 서버에서 카카오 Local REST로 채움
    };

    try {
      setSubmitting(true);
      await createPartner(payload);
      alert("등록 성공!");
      nav("/partners"); // 목록으로 이동
    } catch (err) {
      alert(err.message || "등록 실패");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="container max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl md:text-3xl font-semibold">파트너 등록</h1>

      <form onSubmit={onSubmit} className="mt-6 space-y-5">
        {/* 매장명 */}
        <div>
          <label className="block text-sm font-medium mb-1">매장명 *</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* 분류(태그) */}
        <div>
          <label className="block text-sm font-medium mb-1">분류(태그)</label>
          <input
            className="w-full border rounded px-3 py-2"
            placeholder="예) 본사직영, 가맹점"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          />
        </div>

        {/* 전화번호 (숫자만) */}
        <div>
          <label className="block text-sm font-medium mb-1">
            전화번호 (숫자만)
          </label>
          <input
            className="w-full border rounded px-3 py-2"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="예) 021234567"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
          />
        </div>

        {/* 우편번호 + 주소 찾기 버튼 */}
        <div className="grid grid-cols-[1fr_auto] gap-2">
          <div>
            <label className="block text-sm font-medium mb-1">우편번호 *</label>
            <input
              className="w-full border rounded px-3 py-2 bg-gray-50"
              value={postal}
              readOnly
              placeholder="주소 찾기 버튼을 눌러 선택"
            />
          </div>
          <div className="self-end">
            <button
              type="button"
              className="px-4 py-2 border rounded w-full md:w-auto"
              onClick={() => setAddrOpen(true)}
            >
              주소 찾기
            </button>
          </div>
        </div>

        {/* 주소 */}
        <div>
          <label className="block text-sm font-medium mb-1">주소 *</label>
          <input
            className="w-full border rounded px-3 py-2 bg-gray-50"
            value={address}
            readOnly
          />
        </div>

        {/* 상세주소 */}
        <div>
          <label className="block text-sm font-medium mb-1">상세주소</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
          />
        </div>

        <div className="pt-3">
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-3 rounded bg-black text-white disabled:opacity-50"
          >
            {submitting ? "등록중..." : "등록하기"}
          </button>
        </div>
      </form>

      {/* 주소 검색 모달 */}
      <AddressSearchModal
        open={addrOpen}
        onClose={() => setAddrOpen(false)}
        onSelect={handlePickAddress}
      />
    </div>
  );
}
