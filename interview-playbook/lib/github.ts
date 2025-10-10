export function toRawGithubUrl(input: string): { rawUrl: string; filename: string } {
  let url: URL
  try {
    url = new URL(input)
  } catch {
    throw new Error("Invalid URL")
  }

  const hostname = url.hostname.toLowerCase()
  const pathname = url.pathname

  // If already raw.githubusercontent.com
  if (hostname === "raw.githubusercontent.com") {
    const filename = inferFileName(pathname) || "document.md"
    ensureMarkdown(filename)
    return { rawUrl: url.toString(), filename }
  }

  // Handle classic github.com blob URLs
  // e.g. https://github.com/user/repo/blob/branch/dir/file.md
  if (hostname === "github.com") {
    const parts = pathname.split("/").filter(Boolean) // ["user","repo","blob","branch","dir","file.md"]
    const blobIndex = parts.indexOf("blob")
    if (blobIndex !== -1 && parts.length >= blobIndex + 2) {
      const user = parts[0]
      const repo = parts[1]
      const branch = parts[blobIndex + 1]
      const pathAfter = parts.slice(blobIndex + 2).join("/")
      const filename = inferFileName(pathAfter) || "document.md"
      ensureMarkdown(filename)
      const raw = `https://raw.githubusercontent.com/${user}/${repo}/${branch}/${pathAfter}`
      return { rawUrl: raw, filename }
    }
  }

  throw new Error("Unsupported GitHub URL. Use a link like https://github.com/user/repo/blob/branch/path/file.md")
}

function inferFileName(path: string): string | null {
  const last = path.split("/").filter(Boolean).pop()
  return last || null
}

function ensureMarkdown(filename: string) {
  if (!/\.md$/i.test(filename)) {
    throw new Error("The provided link does not point to a .md file")
  }
}

export function makePdfFileName(mdFileName: string): string {
  const base = mdFileName.replace(/\.md$/i, "")
  // Sanitize filename
  const safe = base.replace(/[^A-Za-z0-9._-]+/g, "_").slice(0, 128) || "document"
  return `${safe}.pdf`
}
