// src/services/contact.service.js
import { sendMail } from "../utils/mailer.js";

export async function handleContact({
  type,
  name,
  phone,
  email,
  title,
  body,
  files = [],
}) {
  if (!type || type === "문의유형") throw new Error("문의유형 필요");
  if (!name?.trim()) throw new Error("이름 필요");
  if (!phone?.trim()) throw new Error("연락처 필요");
  if (!email?.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
    throw new Error("이메일 형식 오류");
  if (!title?.trim()) throw new Error("제목 필요");
  if (!body?.trim()) throw new Error("내용 필요");

  const html = `
    <h3>새로운 문의가 접수되었습니다</h3>
    <table border="1" cellspacing="0" cellpadding="6">
      <tr><th>문의유형</th><td>${type}</td></tr>
      <tr><th>이름</th><td>${name}</td></tr>
      <tr><th>연락처</th><td>${phone}</td></tr>
      <tr><th>이메일</th><td>${email}</td></tr>
      <tr><th>제목</th><td>${title}</td></tr>
      <tr><th>내용</th><td style="white-space:pre-wrap">${body}</td></tr>
    </table>
  `;

  const attachments = files.map((f) => ({
    filename: f.originalFilename,
    content: f.buffer,
    contentType: f.mimetype,
  }));

  await sendMail({
    subject: `[문의] ${title} - ${name}`,
    html,
    attachments,
  });

  return { ok: true };
}
