// client/src/pages/auth/Login.jsx
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { login } from "../../lib/auth";

export default function Login() {
  const nav = useNavigate();
  const { state } = useLocation();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      await login(email, pw);
      nav(state?.from || "/", { replace: true });
    } catch (e) {
      alert(e.message || "로그인 실패");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container max-w-sm mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold">관리자 로그인</h1>
      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <input
          className="w-full border rounded px-3 py-2"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full border rounded px-3 py-2"
          placeholder="비밀번호"
          type="password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
        />
        <button
          className="w-full rounded bg-black text-white py-2 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "로그인중..." : "로그인"}
        </button>
      </form>
    </div>
  );
}
