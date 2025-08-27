export function sanitizeFilename(name = "file") {
  return String(name).replace(/[^\w.\-]/g, "_");
}

export function nowStamp() {
  return Date.now();
}
