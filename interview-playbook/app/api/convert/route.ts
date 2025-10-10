/* eslint-disable @typescript-eslint/no-explicit-any */

import type { NextRequest } from "next/server";
import { toRawGithubUrl, makePdfFileName } from "@/lib/github";
import { markdownToPdf } from "@/lib/pdf";

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();
    if (!url || typeof url !== "string") {
      return responseJson({ error: "Missing 'url' in body" }, 400);
    }

    let rawUrl: string;
    let mdName: string;
    try {
      const { rawUrl: r, filename } = toRawGithubUrl(url);
      rawUrl = r;
      mdName = filename;
    } catch (e: any) {
      return responseJson({ error: e?.message || "Invalid GitHub URL" }, 400);
    }

    // Fetch markdown content
    const res = await fetch(rawUrl, {
      headers: {
        Accept: "text/plain",
        "User-Agent": "v0-github-md-to-pdf",
      },
      // no-cache to avoid stale content
      cache: "no-store",
    });

    if (!res.ok) {
      return responseJson(
        { error: `Failed to fetch markdown: ${res.status} ${res.statusText}` },
        502
      );
    }

    const markdown = await res.text();
    if (!markdown || markdown.trim().length === 0) {
      return responseJson({ error: "Fetched file is empty" }, 422);
    }

    const title = mdName.replace(/\.md$/i, "");
    const pdfBytes = await markdownToPdf(markdown, title);
    const filename = makePdfFileName(mdName);

    return new Response(Buffer.from(pdfBytes), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": contentDisposition(filename),
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return responseJson({ error: "Unexpected server error" }, 500);
  }
}

function responseJson(data: any, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function contentDisposition(filename: string) {
  // RFC 5987 encoding for non-ASCII
  return `attachment; filename="${sanitizeAscii(
    filename
  )}"; filename*=UTF-8''${encodeURIComponent(filename)}`;
}

function sanitizeAscii(name: string) {
  return name.replace(/[^\x20-\x7E]+/g, "_");
}
