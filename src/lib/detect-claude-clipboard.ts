/** Rich HTML copied from claude.ai / Claude desktop chat (rendered assistant message). */
export function clipboardHtmlFromClaude(html: string): boolean {
  if (!html.trim()) return false
  return (
    /\b(?:standard-markdown|progressive-markdown)\b/i.test(html) ||
    /\bfont-claude-(?:response|message|sans-text-body)\b/i.test(html) ||
    /data-testid="(?:ai-message|message-assistant|code-block)/i.test(html) ||
    /\bcode-block__\w+/i.test(html) ||
    /class="[^"]*\bgroup\/(?:copy|code)\b/i.test(html)
  )
}
