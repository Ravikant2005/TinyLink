import React, { useState } from "react";
import {
  ClipboardDocumentCheckIcon,
  ClipboardIcon,
  TrashIcon,
  ArrowTopRightOnSquareIcon
} from "@heroicons/react/24/outline";

export default function LinkCard({ link, onDelete }) {
  const [copied, setCopied] = useState(false);

  const shortUrl = `https://tinylink-1-263w.onrender.com/${link.code}`;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Copy failed", err);
    }
  }

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border flex justify-between items-start">
      <div>
        <a
          href={shortUrl}
          target="_blank"
          className="text-xl font-semibold text-[#007AFF] hover:underline"
        >
          {link.code}
        </a>

        <p className="text-gray-600 text-sm break-all mt-1">{link.url}</p>

        <p className="text-gray-700 text-sm mt-2">
          Clicks: <strong>{link.clicks}</strong>
        </p>
      </div>

      <div className="flex flex-col items-end space-y-2">
        <button
          onClick={handleCopy}
          className={`flex items-center gap-2 px-3 py-1 rounded-lg border transition ${
            copied
              ? "bg-green-100 text-green-700 border-green-400"
              : "hover:bg-gray-100"
          }`}
        >
          {copied ? (
            <ClipboardDocumentCheckIcon className="h-5 w-5" />
          ) : (
            <ClipboardIcon className="h-5 w-5" />
          )}
          {copied ? "Copied" : "Copy"}
        </button>

        <a
          href={`/details/${link.code}`}
          className="flex items-center gap-2 px-3 py-1 border rounded-lg hover:bg-gray-100"
        >
          <ArrowTopRightOnSquareIcon className="h-5 w-5" />
          View
        </a>

        <button
          onClick={() => onDelete(link.code)}
          className="flex items-center gap-2 px-3 py-1 bg-red-50 text-red-600 border border-red-300 rounded-lg hover:bg-red-100"
        >
          <TrashIcon className="h-5 w-5" />
          Delete
        </button>
      </div>
    </div>
  );
}


