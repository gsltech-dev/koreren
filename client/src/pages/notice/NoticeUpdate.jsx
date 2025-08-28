// src/pages/notice/NoticeUpdate.jsx
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useEditor,
  EditorContent,
  EditorContext,
  useCurrentEditor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Highlight from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import { getNotice, updateNotice } from "../../lib/api";

export default function NoticeUpdate() {
  const { id } = useParams();
  const numId = Number.parseInt(id, 10);
  const nav = useNavigate();

  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [pending, setPending] = useState([]); // [{ file, blob, token }]

  const newToken = () =>
    "img-" + Math.random().toString(36).slice(2, 10) + Date.now();

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
      Highlight,
      Placeholder.configure({ placeholder: "내용을 입력하세요..." }),
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph", "image"] }),
      Image.configure({ inline: false, allowBase64: false }),
    ],
    content: "<p></p>",
    immediatelyRender: false,
    autofocus: true,
  });

  // 초기 데이터 로드
  useEffect(() => {
    if (!Number.isFinite(numId)) {
      nav("/notices", { replace: true });
      return;
    }
    (async () => {
      try {
        const data = await getNotice(numId);
        setTitle(data.title ?? "");
        setName(data.name ?? "");
        // 에디터 HTML 주입
        if (editor) editor.commands.setContent(data.body || "<p></p>", false);
      } catch (e) {
        setErr(e.message || "불러오기 실패");
      } finally {
        setLoading(false);
      }
    })();
  }, [numId, nav, editor]);

  const onPick = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!/^image\//.test(f.type)) return alert("이미지 파일만 허용");
    if (f.size > 5 * 1024 * 1024) return alert("최대 5MB");

    const blob = URL.createObjectURL(f);
    const token = newToken();

    editor
      ?.chain()
      .focus()
      .insertContent([
        { type: "image", attrs: { src: blob, alt: f.name } },
        { type: "paragraph" },
      ])
      .focus("end")
      .run();

    setPending((a) => [...a, { file: f, blob, token }]);
    e.target.value = "";
  };

  const providerValue = useMemo(() => ({ editor }), [editor]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!editor) return;

    const html = editor.getHTML();
    const isEmpty =
      editor.state.doc.textContent.trim().length === 0 || html === "<p></p>";
    if (!title.trim()) return alert("제목을 입력하세요.");
    if (!name.trim()) return alert("작성자를 입력하세요.");
    if (isEmpty) return alert("내용을 입력하세요.");

    try {
      const fd = new FormData();
      fd.append(
        "payload",
        JSON.stringify({
          title: title.trim(),
          name: name.trim(),
          bodyHtmlWithBlobUrls: html,
          images: pending.map((p) => ({ blob: p.blob, token: p.token })),
        })
      );
      pending.forEach((p) => fd.append("files[]", p.file, p.token));

      const { id: updatedId } = await updateNotice(numId, fd);
      nav(`/notices/${updatedId}`);
    } catch (error) {
      alert(error.message || "수정 실패");
    }
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-14">
        <div className="animate-pulse space-y-6">
          <div className="h-7 bg-gray-200 rounded w-28 mx-auto" />
          <div className="h-px bg-gray-200" />
          <div className="h-6 bg-gray-200 rounded w-2/3" />
          <div className="h-4 bg-gray-200 rounded w-24" />
          <div className="h-64 bg-gray-200 rounded" />
        </div>
      </div>
    );
  }
  if (err) return <div className="p-6 text-red-500">{err}</div>;
  if (!editor) return null;

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">공지 수정</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border rounded px-3 py-2"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="w-full border rounded px-3 py-2"
          placeholder="작성자"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <EditorContext.Provider value={providerValue}>
          <div className="border rounded">
            <Toolbar onPick={onPick} />
            <div
              className="p-3 h-[40vh] overflow-y-auto cursor-text allow-scroll"
              data-lenis-prevent
              onClick={() => editor?.commands.focus()}
            >
              <EditorContent
                editor={editor}
                className="prose max-w-none tiptap"
              />
            </div>
          </div>
        </EditorContext.Provider>

        <div className="flex gap-2">
          <button
            type="submit"
            className="px-4 py-2 rounded bg-black text-white"
          >
            수정 저장
          </button>
          <button
            type="button"
            onClick={() => nav(-1)}
            className="px-4 py-2 rounded border"
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
}

/* 공통 버튼/툴바 (Write와 동일) */
function Btn({ on, active, disabled, label }) {
  return (
    <button
      type="button"
      onClick={on}
      disabled={disabled}
      className={
        "px-2 py-1 text-sm border rounded " +
        (active ? "bg-gray-900 text-white" : "bg-white") +
        (disabled ? " opacity-40 cursor-not-allowed" : "")
      }
    >
      {label}
    </button>
  );
}

function Toolbar({ onPick }) {
  const { editor } = useCurrentEditor();
  if (!editor) return null;

  return (
    <div className="flex flex-wrap gap-2 p-2 border-b bg-gray-50">
      <HeadingBtn level={1} />
      <HeadingBtn level={2} />

      <Btn
        label="B"
        on={() => editor.chain().focus().toggleBold().run()}
        active={editor.isActive("bold")}
        disabled={!editor.can().chain().focus().toggleBold().run()}
      />
      <Btn
        label="I"
        on={() => editor.chain().focus().toggleItalic().run()}
        active={editor.isActive("italic")}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
      />
      <Btn
        label="S"
        on={() => editor.chain().focus().toggleStrike().run()}
        active={editor.isActive("strike")}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
      />
      <Btn
        label="U"
        on={() => editor.chain().focus().toggleUnderline().run()}
        active={editor.isActive("underline")}
        disabled={!editor.can().chain().focus().toggleUnderline().run()}
      />
      <Btn
        label="UL"
        on={() => editor.chain().focus().toggleBulletList().run()}
        active={editor.isActive("bulletList")}
        disabled={!editor.can().chain().focus().toggleBulletList().run()}
      />
      <Btn
        label="OL"
        on={() => editor.chain().focus().toggleOrderedList().run()}
        active={editor.isActive("orderedList")}
        disabled={!editor.can().chain().focus().toggleOrderedList().run()}
      />
      <Btn
        label="왼쪽"
        on={() => editor.chain().focus().setTextAlign("left").run()}
        active={editor.isActive({ textAlign: "left" })}
      />
      <Btn
        label="가운데"
        on={() => editor.chain().focus().setTextAlign("center").run()}
        active={editor.isActive({ textAlign: "center" })}
      />
      <Btn
        label="오른쪽"
        on={() => editor.chain().focus().setTextAlign("right").run()}
        active={editor.isActive({ textAlign: "right" })}
      />

      <Btn
        label="</>"
        on={() => editor.chain().focus().toggleCodeBlock().run()}
        active={editor.isActive("codeBlock")}
        disabled={!editor.can().chain().focus().toggleCodeBlock().run()}
      />
      <Btn
        label="<"
        on={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
      />
      <Btn
        label=">"
        on={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
      />

      <label className="px-2 py-1 text-sm border rounded cursor-pointer">
        이미지
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onPick}
        />
      </label>
    </div>
  );
}

function HeadingBtn({ level }) {
  const { editor } = useCurrentEditor();
  const active = editor.isActive("heading", { level });
  const disabled = !editor.can().chain().focus().toggleHeading({ level }).run();
  return (
    <Btn
      label={`H${level}`}
      on={() => editor.chain().focus().toggleHeading({ level }).run()}
      active={active}
      disabled={disabled}
    />
  );
}
