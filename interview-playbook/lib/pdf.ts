/* eslint-disable @typescript-eslint/no-explicit-any */

import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

type DrawCtx = {
  pageWidth: number;
  pageHeight: number;
  margin: number;
  x: number;
  y: number;
  contentWidth: number;
  lineGap: number;
};

function decodeEntities(input: string): string {
  return input
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&#x27;/g, "'");
}

function stripHtmlKeepText(input: string): string {
  // Remove span tags but keep inner text
  let out = input.replace(/<span\b[^>]*>(.*?)<\/span>/gis, "$1");
  // Remove any remaining HTML tags
  out = out.replace(/<\/?[^>]+>/g, "");
  return decodeEntities(out);
}

function sanitizeForPdf(input: string): string {
  if (!input) return "";
  let s = input;

  // Normalize common smart punctuation to ASCII
  s = s
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/[–—]/g, "-")
    .replace(/…/g, "...")
    .replace(/\u00A0/g, " "); // non-breaking space to regular space

  // Remove emojis and symbols outside BMP common ranges (emoticons, pictographs, flags, etc.)
  s = s.replace(
    /[\u{1F000}-\u{1FAFF}\u{1F300}-\u{1F9FF}\u{1F1E6}-\u{1F1FF}\u{2600}-\u{27BF}]/gu,
    ""
  );

  // Drop any remaining characters outside ISO-8859-1/WinAnsi range that StandardFonts typically cover
  s = Array.from(s)
    .map((ch) => (ch.codePointAt(0)! <= 0xff ? ch : "?"))
    .join("");

  return s;
}

export async function markdownToPdf(
  markdown: string,
  title?: string
): Promise<Uint8Array> {
  const pdf = await PDFDocument.create();
  let page = pdf.addPage(); // Changed from const to let
  const { width, height } = page.getSize();

  const helv = await pdf.embedFont(StandardFonts.Helvetica);
  const helvBold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const courier = await pdf.embedFont(StandardFonts.Courier);

  const ctx: DrawCtx = {
    pageWidth: width,
    pageHeight: height,
    margin: 50,
    x: 50,
    y: height - 50,
    contentWidth: width - 100,
    lineGap: 4,
  };

  const drawWrapped = (
    text: string,
    font: any,
    size: number,
    color = rgb(0, 0, 0)
  ) => {
    const safe = sanitizeForPdf(text);
    const words = safe.split(/\s+/);
    let line = "";
    const lines: string[] = [];

    for (const w of words) {
      const testLine = line.length ? line + " " + w : w;
      const testWidth = font.widthOfTextAtSize(testLine, size);
      if (testWidth > ctx.contentWidth) {
        if (line.length) {
          lines.push(line);
          line = w;
        } else {
          // single long word fallback: hard break
          lines.push(w);
          line = "";
        }
      } else {
        line = testLine;
      }
    }
    if (line.length) lines.push(line);

    for (const l of lines) {
      if (ctx.y < 60) newPage();
      page.drawText(l, {
        x: ctx.x,
        y: ctx.y,
        size,
        font,
        color,
      });
      ctx.y -= size + ctx.lineGap;
    }
  };

  const newPage = () => {
    const p = pdf.addPage([ctx.pageWidth, ctx.pageHeight]);
    page = p;
    ctx.x = ctx.margin;
    ctx.y = ctx.pageHeight - ctx.margin;
  };

  const codePaddingX = 8;
  const codePaddingY = 6;
  const codeFontSize = 9;
  const codeLineGap = 2;

  function wrapMonoLine(
    src: string,
    font: any,
    size: number,
    maxWidth: number
  ): string[] {
    const s = sanitizeForPdf((src ?? "").replace(/\t/g, "  "));
    if (s.length === 0) return [" "];

    const lines: string[] = [];
    let line = "";
    let width = 0;

    for (const ch of s) {
      const w = font.widthOfTextAtSize(ch, size);
      if (width + w > maxWidth) {
        if (line.length) {
          lines.push(line);
          line = ch;
          width = w;
        } else {
          // single overlong char fallback
          lines.push(ch);
          line = "";
          width = 0;
        }
      } else {
        line += ch;
        width += w;
      }
    }
    if (line.length) lines.push(line);
    return lines.length ? lines : [" "];
  }

  function wrapMonoLinesForBlock(
    srcLines: string[],
    font: any,
    size: number,
    maxWidth: number
  ): string[] {
    const out: string[] = [];
    for (const ln of srcLines) {
      const wrapped = wrapMonoLine(ln, font, size, maxWidth);
      if (wrapped.length === 0) out.push(" ");
      else out.push(...wrapped);
    }
    return out;
  }

  function renderCodeBlock(buffer: string[]) {
    const maxTextWidth = ctx.contentWidth - codePaddingX * 2;
    const wrapped = wrapMonoLinesForBlock(
      buffer,
      courier,
      codeFontSize,
      maxTextWidth
    );

    let i = 0;
    while (i < wrapped.length) {
      const available = ctx.y - 60;
      const maxLines = Math.floor(
        (available - 2 * codePaddingY) / (codeFontSize + codeLineGap)
      );
      if (maxLines < 1) {
        newPage();
        continue;
      }

      const end = Math.min(i + maxLines, wrapped.length);
      const chunk = wrapped.slice(i, end);

      const innerHeight =
        chunk.length * codeFontSize + (chunk.length - 1) * codeLineGap;
      const totalHeight = innerHeight + 2 * codePaddingY;

      // background rectangle for the code block chunk
      page.drawRectangle({
        x: ctx.x,
        y: ctx.y - totalHeight,
        width: ctx.contentWidth,
        height: totalHeight,
        color: rgb(0.96, 0.96, 0.96),
        borderColor: rgb(0.85, 0.85, 0.85),
        borderWidth: 1,
      });

      // draw the code lines
      let y = ctx.y - codePaddingY - codeFontSize;
      for (const l of chunk) {
        page.drawText(l, {
          x: ctx.x + codePaddingX,
          y,
          size: codeFontSize,
          font: courier,
          color: rgb(0.15, 0.15, 0.15),
        });
        y -= codeFontSize + codeLineGap;
      }

      // move cursor below the block plus a small gap
      ctx.y -= totalHeight + ctx.lineGap;
      i = end;
    }
  }

  let inCode = false;
  let codeBuffer: string[] = [];

  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  for (const raw of lines) {
    if (raw.trim().startsWith("```")) {
      if (!inCode) {
        inCode = true;
        codeBuffer = [];
      } else {
        renderCodeBlock(codeBuffer);
        inCode = false;
      }
      continue;
    }

    if (inCode) {
      codeBuffer.push(raw);
      continue;
    }

    const clean = sanitizeForPdf(stripHtmlKeepText(raw));

    // Headings
    const headingMatch = /^(#{1,6})\s+(.*)$/.exec(clean);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const text = headingMatch[2];
      const size = level === 1 ? 16 : level === 2 ? 14 : level === 3 ? 12 : 11;
      ctx.y -= level <= 2 ? 2 : 0;
      drawWrapped(text, helvBold, size);
      ctx.y -= level <= 2 ? 6 : 4;
      continue;
    }

    // Bullets
    const bulletMatch = /^\s*[-*]\s+(.*)$/.exec(clean);
    if (bulletMatch) {
      const text = bulletMatch[1];
      const bullet = "• ";
      const bulletWidth = helv.widthOfTextAtSize(bullet, 10);
      if (ctx.y < 60) newPage();
      page.drawText(bullet, { x: ctx.x, y: ctx.y, size: 10, font: helv });
      ctx.x += bulletWidth;
      drawWrapped(text, helv, 10);
      ctx.x -= bulletWidth;
      continue;
    }

    const orderedMatch = /^\s*(\d+)\.\s+(.*)$/.exec(clean);
    if (orderedMatch) {
      const num = orderedMatch[1] + ". ";
      const text = orderedMatch[2];
      const numW = helv.widthOfTextAtSize(num, 10);
      if (ctx.y < 60) newPage();
      page.drawText(num, { x: ctx.x, y: ctx.y, size: 10, font: helv });
      ctx.x += numW;
      drawWrapped(text, helv, 10);
      ctx.x -= numW;
      continue;
    }

    // Paragraph or blank line
    if (clean.trim().length === 0) {
      ctx.y -= 6;
    } else {
      drawWrapped(clean, helv, 10);
    }
  }

  if (inCode && codeBuffer.length) {
    renderCodeBlock(codeBuffer);
  }

  const bytes = await pdf.save();
  return bytes;
}
