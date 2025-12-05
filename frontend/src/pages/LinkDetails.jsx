import React, { useEffect, useState } from "react";
import { getLink } from "../api/links.js";
import { useParams } from "react-router-dom";
import {
  ClipboardDocumentCheckIcon,
  CalendarDaysIcon,
  ClockIcon,
  CursorArrowRaysIcon,
  ArrowTopRightOnSquareIcon
} from "@heroicons/react/24/outline";

export default function LinkDetails() {
  const { code } = useParams();
  const [link, setLink] = useState(null);
  const [copied, setCopied] = useState(false);

  const BASE = "https://tinylink-1-263w.onrender.com";

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const data = await getLink(code);
    setLink(data);
  }

  if (!link)
    return <div className="p-10 text-center text-gray-600">Loading...</div>;

  const shortUrl = `${BASE}/${link.code}`;

  function handleCopy() {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="min-h-screen bg-[#F2F2F7] flex justify-center pt-20 px-4">
      <div className="w-full max-w-2xl bg-white border border-gray-200 rounded-2xl shadow-md p-8">

        <h1 className="text-3xl font-semibold text-gray-900 mb-6 tracking-tight">
          Link Details
        </h1>

        <div className="space-y-6 text-gray-700">

          <div>
            <p className="text-sm font-medium text-gray-500">Original URL</p>
            <a
              href={link.url}
              target="_blank"
              className="text-lg text-[#007AFF] underline break-all"
            >
              {link.url}
            </a>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">Short URL</p>
            <a
              href={shortUrl}
              target="_blank"
              className="text-lg text-[#007AFF] underline break-all"
            >
              {shortUrl}
            </a>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">Short Code</p>
            <a
              href={shortUrl}
              target="_blank"
              className="text-xl font-semibold text-[#007AFF] hover:underline"
            >
              {link.code}
            </a>
          </div>

          <div className="flex items-center gap-2">
            <CalendarDaysIcon className="h-6 w-6 text-gray-500" />
            <div>
              <p className="text-sm font-medium text-gray-500">Created At</p>
              <p className="text-lg">
                {new Date(link.created_at).toLocaleString()}
              </p>
            </div>
          </div>

          {link.last_clicked && (
            <div className="flex items-center gap-2">
              <ClockIcon className="h-6 w-6 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-500">Last Clicked</p>
                <p className="text-lg">
                  {new Date(link.last_clicked).toLocaleString()}
                </p>
              </div>
            </div>
          )}

          <div className="flex items-center gap-2">
            <CursorArrowRaysIcon className="h-6 w-6 text-gray-500" />
            <div>
              <p className="text-sm font-medium text-gray-500">Total Clicks</p>
              <p className="text-lg font-semibold">{link.clicks}</p>
            </div>
          </div>
        </div>

        <button
          onClick={handleCopy}
          className={`mt-6 w-full py-3 rounded-xl text-lg font-medium transition
            ${
              copied
                ? "bg-green-100 text-green-700 border border-green-400"
                : "bg-[#007AFF] text-white hover:bg-[#0A84FF]"
            }`}
        >
          {copied ? "Copied!" : "Copy Short URL"}
        </button>

      </div>
    </div>
  );
}

