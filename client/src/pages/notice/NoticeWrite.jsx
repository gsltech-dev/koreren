import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEditor, EditorContent, EditorContext } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Highlight from "@tiptap/extension-highlight";
import { createNotice } from "../../lib/api";
import Underline from "@tiptap/extension-underline";

export default function NoticeWrite() {
  const nav = useNavigate();
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
      Highlight,
      Placeholder.configure({ placeholder: "내용을 입력하세요..." }),
      Underline,
    ],
    content: "<p></p>",
    immediatelyRender: false,
    autofocus: true,
  });

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

    setSubmitting(true);
    try {
      const { id } = await createNotice({
        title: title.trim(),
        name: name.trim(),
        body: html,
      });
      nav(`/notices/${id}`);
    } catch (err) {
      alert(err.message || "저장 실패");
    } finally {
      setSubmitting(false);
    }
  }

  if (!editor) return null;

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">공지 작성</h1>

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
            <Toolbar />
            <div className="prose max-w-none p-3 tiptap">
              <EditorContent editor={editor} />
            </div>
          </div>
        </EditorContext.Provider>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={submitting}
            className="px-4 py-2 rounded bg-black text-white disabled:opacity-50"
          >
            저장
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

// 공통 버튼
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

import { useCurrentEditor } from "@tiptap/react";
function Toolbar() {
  const { editor } = useCurrentEditor();
  if (!editor) return null;

  return (
    <div className="flex flex-wrap gap-2 p-2 border-b bg-gray-50">
      <HeadingBtn level={1} />
      <HeadingBtn level={2} />
      <Btn
        label="굵게"
        on={() => editor.chain().focus().toggleBold().run()}
        active={editor.isActive("bold")}
        disabled={!editor.can().chain().focus().toggleBold().run()}
      />
      <Btn
        label="기울임"
        on={() => editor.chain().focus().toggleItalic().run()}
        active={editor.isActive("italic")}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
      />
      <Btn
        label="취소선"
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
        label="코드블록"
        on={() => editor.chain().focus().toggleCodeBlock().run()}
        active={editor.isActive("codeBlock")}
        disabled={!editor.can().chain().focus().toggleCodeBlock().run()}
      />
      <Btn
        label="되돌리기"
        on={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
      />
      <Btn
        label="앞으로"
        on={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
      />
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
