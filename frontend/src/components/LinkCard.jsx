import React, { useState } from "react";
import {
  ClipboardDocumentCheckIcon,
  TrashIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

export default function LinkCard({ link, onDelete }) {
  const [copied, setCopied] = useState(false);
  const shortUrl = `http://localhost:3000/${link.code}`;

  function handleCopy() {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 flex justify-between items-center">

      <div className="w-[70%]">
        <a
          href={shortUrl}
          target="_blank"
          rel="noreferrer"
          className="text-xl font-semibold text-[#007AFF] hover:underline"
        >
          {link.code}
        </a>

        <p className="text-gray-600 text-sm mt-1 break-all">{link.url}</p>
      </div>

      <div className="flex flex-col items-end space-y-3">

        <p className="text-gray-800">
          Clicks: <strong>{link.clicks ?? 0}</strong>
        </p>

        <a
          href={`/link/${link.code}`}
          className="flex items-center gap-2 px-3 py-1 border border-gray-300 rounded-xl hover:bg-gray-100 transition"
        >
          <InformationCircleIcon className="h-5 w-5" />
          View
        </a>

        <button
          onClick={handleCopy}
          className={`flex items-center gap-2 px-3 py-1 rounded-xl border transition
            ${
              copied
                ? "border-green-400 text-green-700 bg-green-50"
                : "border-gray-300 hover:bg-gray-100"
            }`}
        >
          <ClipboardDocumentCheckIcon className="h-5 w-5" />
          {copied ? "Copied!" : "Copy"}
        </button>

        <button
          onClick={() => onDelete(link.code)}
          className="flex items-center gap-2 px-3 py-1 border border-red-300 text-red-600 rounded-xl hover:bg-red-50 transition"
        >
          <TrashIcon className="h-5 w-5" />
          Delete
        </button>
      </div>

    </div>
  );
}


