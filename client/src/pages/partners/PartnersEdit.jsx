import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddressSearchModal from "../../components/partners/AddressSearchModal";
import { getPartner, updatePartner } from "../../lib/partners/api";

// 숫자만 유지하는 인풋 헬퍼
const onlyDigits = (s) => s.replace(/\D/g, "");

export default function PartnersEdit() {
  const nav = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // 폼 상태
  const [name, setName] = useState("");
  const [tag, setTag] = useState("");
  const [phone, setPhone] = useState("");
  const [postal, setPostal] = useState("");
  const [address, setAddress] = useState("");
  const [detail, setDetail] = useState("");

  // 원본(디프용)
  const [orig, setOrig] = useState(null);

  const [addrOpen, setAddrOpen] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await getPartner(id);
        setOrig(data);
        setName(data.name || "");
        setTag(data.tag || "");
        setPhone((data.phone || "").replace(/\D/g, "")); // 숫자만
        setPostal(data.postal_code || "");
        setAddress(data.address || "");
        setDetail(data.detail_address || "");
      } catch (e) {
        alert(e.message || "상세 불러오기 실패");
        nav("/partners");
      } finally {
        setLoading(false);
      }
    })();
  }, [id, nav]);

  const handlePickAddress = ({ address, postal_code }) => {
    setAddress(address || "");
    setPostal(postal_code || "");
  };

  // 변경분 추출
  const payload = useMemo(() => {
    if (!orig) return null;
    const next = {
      name: name.trim(),
      tag: tag.trim() || null,
      phone: phone ? onlyDigits(phone) : null,
      postal_code: postal.trim() || null,
      address: address.trim(),
      detail_address: detail.trim() || null,
    };
    const diff = {};
    Object.entries(next).forEach(([k, v]) => {
      const ov =
        k === "postal_code"
          ? orig.postal_code ?? null
          : k === "detail_address"
          ? orig.detail_address ?? null
          : k === "phone"
          ? onlyDigits(orig.phone || "") || null
          : orig[k] ?? null;

      if ((v || null) !== (ov || null)) diff[k] = v;
    });
    return diff;
  }, [orig, name, tag, phone, postal, address, detail]);

  async function onSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return alert("매장명을 입력하세요.");
    if (!address.trim() || !postal.trim()) {
      if (!confirm("주소/우편번호 변경 없이 저장할까요?")) return;
    }
    if (!payload || Object.keys(payload).length === 0) {
      alert("변경된 내용이 없습니다.");
      return;
    }

    try {
      setSaving(true);
      await updatePartner(id, payload);
      alert("수정 완료!");
      nav("/partners");
    } catch (err) {
      alert(err.message || "수정 실패");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="container max-w-3xl mx-auto px-4 py-10">불러오는 중…</div>
    );
  }

  return (
    <div className="container max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl md:text-3xl font-semibold">파트너 수정</h1>

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

        {/* 전화번호(숫자만) */}
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
            onChange={(e) => setPhone(onlyDigits(e.target.value))}
          />
        </div>

        {/* 우편번호 + 주소 찾기 */}
        <div className="grid grid-cols-[1fr_auto] gap-2">
          <div>
            <label className="block text-sm font-medium mb-1">우편번호</label>
            <input
              className="w-full border rounded px-3 py-2 bg-gray-50"
              value={postal}
              readOnly
              placeholder="주소 찾기 버튼으로 선택"
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
          <label className="block text-sm font-medium mb-1">주소</label>
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

        <div className="pt-3 flex gap-2">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 rounded bg-black text-white disabled:opacity-50"
          >
            {saving ? "수정중..." : "수정하기"}
          </button>
          <button
            type="button"
            className="px-6 py-3 rounded border"
            onClick={() => nav(-1)}
            disabled={saving}
          >
            취소
          </button>
        </div>
      </form>

      <AddressSearchModal
        open={addrOpen}
        onClose={() => setAddrOpen(false)}
        onSelect={handlePickAddress}
      />
    </div>
  );
}
