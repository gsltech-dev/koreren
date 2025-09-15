// src/pages/contact/ContactUs.jsx
import { useState } from "react";
import SelectBasic from "../../components/SelectBasic";

const API = import.meta.env.VITE_API_BASE || "http://localhost:8080";

const TYPES = ["문의유형", "제품 문의", "A/S 문의", "제휴/협업", "기타"];
const TYPE_OPTIONS = TYPES.map((t) => ({ label: t, value: t }));

const ALLOW_TYPES = ["image/jpeg", "image/jpg", "image/png", "application/zip"];
const MAX_PER_FILE = 10 * 1024 * 1024; // 10MB

export default function ContactUs() {
  const [type, setType] = useState(TYPE_OPTIONS[0].value);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [files, setFiles] = useState([]);
  const [agree, setAgree] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function onPick(e) {
    const list = Array.from(e.target.files || []);
    const bad = list.find(
      (f) => !ALLOW_TYPES.includes(f.type) || f.size > MAX_PER_FILE
    );
    if (bad) {
      alert("허용 파일: JPG, JPEG, PNG, ZIP. 파일당 최대 10MB.");
      e.target.value = "";
      return;
    }
    setFiles(list);
  }

  function validate() {
    if (type === TYPES[0]) return "문의유형을 선택하세요.";
    if (!name.trim()) return "이름을 입력하세요.";
    if (!phone.trim()) return "연락처를 입력하세요.";
    if (!email.trim()) return "이메일을 입력하세요.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return "이메일 형식이 올바르지 않습니다.";
    if (!title.trim()) return "제목을 입력하세요.";
    if (!body.trim()) return "내용을 입력하세요.";
    if (!agree) return "개인정보 수집·이용에 동의가 필요합니다.";
    return null;
  }

  async function onSubmit(e) {
    e.preventDefault();
    const msg = validate();
    if (msg) return alert(msg);

    const fd = new FormData();
    fd.append("type", type);
    fd.append("name", name.trim());
    fd.append("phone", phone.trim());
    fd.append("email", email.trim());
    fd.append("title", title.trim());
    fd.append("body", body.trim());
    files.forEach((f) => fd.append("files[]", f, f.name));
    fd.append("agree", String(agree));

    setSubmitting(true);
    try {
      const r = await fetch(`${API}/contact`, { method: "POST", body: fd });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(j.error?.message || "전송 실패");
      alert("등록 완료되었습니다.");
      // 초기화
      setType(TYPE_OPTIONS[0].value);
      setName("");
      setPhone("");
      setEmail("");
      setTitle("");
      setBody("");
      setFiles([]);
      setAgree(false);
    } catch (err) {
      alert(err.message || "전송 실패");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="container max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-2xl md:text-3xl lg:text-5xl font-semibold">
        1:1 문의하기
      </h1>
      <p className="mt-2 text-[15px] md:text-[20px]">
        궁금한 사항을 문의주시면 성실하게 답변드리겠습니다.
      </p>
      <hr className="mt-5 md:mt-10 mb-5 border-t-2" />

      <form onSubmit={onSubmit} className="space-y-6">
        {/* 표 형태 레이아웃 */}
        <div className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-y-3 md:gap-y-4 md:gap-x-6">
          {/* 문의유형 */}
          <label className="text-sm md:self-center md:text-lg">문의유형</label>
          <SelectBasic
            value={type}
            onChange={setType}
            options={TYPE_OPTIONS}
            className="w-full"
          />

          {/* 이름 */}
          <label className="self-center text-sm md:text-lg">이름</label>
          <input
            className="w-full border h-10 border-gray-300 rounded px-3 py-2 text-sm md:text-base"
            placeholder="이름을 입력해주세요."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* 연락처 */}
          <label className="self-center text-sm lg:text-lg">연락처</label>
          <input
            className="w-full border h-10 border-gray-300 rounded px-3 py-2 text-sm md:text-base"
            placeholder="연락처를 입력해주세요."
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          {/* 이메일 */}
          <label className="self-center text-sm lg:text-lg">이메일</label>
          <input
            className="w-full border h-10 border-gray-300 rounded px-3 py-2 text-sm md:text-base"
            placeholder="이메일을 입력해주세요."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* 제목 */}
          <label className="self-center text-sm lg:text-lg">제목</label>
          <input
            className="w-full border h-10 border-gray-300 rounded px-3 py-2 text-sm md:text-base"
            placeholder="제목을 입력해주세요."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* 내용 */}
          <label className="self-start text-sm lg:text-lg mt-2">내용</label>
          <textarea
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm md:text-base h-80 md:h-150"
            placeholder="내용을 입력해주세요."
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />

          {/* 첨부파일 */}
          <label className="self-start text-sm md:text-lg mt-3">첨부파일</label>
          <div>
            <label className="block">
              <input
                type="file"
                multiple
                accept=".jpg,.jpeg,.png,.zip"
                onChange={onPick}
                className="hidden"
              />
              <div className="flex space-x-2">
                <input
                  readOnly
                  value={files.map((f) => f.name).join(", ")}
                  className="flex-1 border border-none rounded px-3 py-2 bg-gray-100"
                  placeholder=""
                />
                <span className="px-10 py-3 border rounded bg-black text-white cursor-pointer select-none text-[10px] md:text-[14px]">
                  파일선택
                </span>
              </div>
            </label>
            <p className="text-[12px] md:text-[15px] text-gray-500 mt-3">
              JPG, JPEG, PNG, ZIP 형식의 파일만 첨부 가능합니다.<br></br>
              첨부파일 용량은 파일 10MB를 초과하실 수 없습니다.<br></br>
              여러 개의 파일을 올려야 할 경우 압축하여 올려주시길 바랍니다.
            </p>
          </div>
        </div>
        <hr className="my-6 border-t-2 border-gray-300" />

        {/* 동의 영역 */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-[140px_1fr] md:gap-x-6">
          <div className="md:col-start-2">
            {/* ← 라벨 컬럼 건너뛰고 우측 컬럼 전체 사용 */}
            <div className="flex justify-between gap-3 mb-5">
              <span className="font-medium text-[15px] md:text-[18px]">
                개인정보 수집, 이용 동의
                <span className="text-blue-500">(필수)</span>
              </span>
              <label className="flex gap-2">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                />
                <span className="text-[15px] md:text-[18px]">동의합니다</span>
              </label>
            </div>
            <div className="border border-gray-300 rounded p-3 md:p-4 text-xs md:text-sm text-gray-700">
              <p className="mb-3 text-gray-400">
                코어렌은 귀하의 문의에 대한 처리 및 회신을 위하여 아래와 같이
                귀하의 개인정보를 수집 및 처리하고자 합니다.<br></br> 개인정보
                수집 및 이용에 동의하지 않을 권리가 있으며, 동의를 거부하는 경우
                문의내용을 등록할 수 없습니다.
              </p>

              <table className="w-full table-fixed text-center">
                <thead>
                  <tr className="border-t-2 border-t-black border-b border-gray-300">
                    <th className="w-1/3 py-2 border-r border-gray-300 text-xs md:text-sm">
                      처리 목적
                    </th>
                    <th className="w-1/3 py-2 border-r border-gray-300 text-xs md:text-sm">
                      수집 항목
                    </th>
                    <th className="w-1/3 py-2 text-xs md:text-sm">
                      보유 및 이용기간
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-300">
                    <td className="py-2 border-r border-gray-300 text-[12px] md:text-sm">
                      1:1 문의 대응
                    </td>
                    <td className="py-2 border-r border-gray-300 text-xs md:text-sm">
                      성명, 연락처, 내용
                    </td>
                    <td className="py-2 text-[10px] md:text-sm">
                      등록일로부터 1년 보관 후 지체없이 파기
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* 버튼 */}
        <div className="flex justify-center py-10">
          <button
            type="submit"
            className="h-15 px-30 w-full md:w-auto rounded bg-black text-white disabled:opacity-50"
            disabled={submitting}
          >
            등록하기
          </button>
        </div>
      </form>
    </div>
  );
}
