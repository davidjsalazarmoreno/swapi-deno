export function escapeHtml(target: string) {
  if (!target) {
    return "";
  }
  return target.replace(/(\r\n|\n|\r)/gm, "<br>").replace(/'/g, "&quot;");
}
