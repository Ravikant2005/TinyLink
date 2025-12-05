import React, { useState } from "react";
import { createShortLink } from "../api/links.js";
import {
  ClipboardDocumentCheckIcon,
  ArrowTopRightOnSquareIcon
} from "@heroicons/react/24/outline";
import { LinkIcon } from "@heroicons/react/24/solid";

export default function Home() {
  const [original, setOriginal] = useState("");
  const [slug, setSlug] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  async function handleCreate(e) {
    e.preventDefault();
    setLoading(true);
    const data = { url: original, code: slug || undefined };
    try {
      const response = await createShortLink(data);
      setResult(response);
      setCopied(false);
      setOriginal("");
      setSlug("");
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.error || "Something went wrong");
    }
    setLoading(false);
  }

  async function handleCopyShortUrl(code) {
    const short = `http://localhost:3000/${code}`;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(short);
      } else {
        const ta = document.createElement("textarea");
        ta.value = short;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("copy failed", err);
      alert("Copy failed. You can manually copy the short URL.");
    }
  }

  return (
    <div className="min-h-screen bg-[#F2F2F7] flex justify-center pt-20 px-4">
      <div className="w-full max-w-xl bg-white border border-gray-200 rounded-2xl shadow-md p-8">
        <h1 className="text-3xl font-semibold text-gray-900 mb-8 tracking-tight">
          Create a Short Link
        </h1>

        <form onSubmit={handleCreate} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium">Original URL</label>
            <input
              value={original}
              onChange={(e) => setOriginal(e.target.value)}
              placeholder="https://example.com"
              className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-[#007AFF] focus:border-[#007AFF] transition"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Custom Code (optional)</label>
            <input
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="my-custom-code"
              className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-[#007AFF] focus:border-[#007AFF] transition"
            />
          </div>

          <button
            disabled={loading}
            className="w-full py-3 bg-[#007AFF] hover:bg-[#0A84FF] text-white rounded-xl shadow-lg transition-all duration-200 font-medium text-lg"
          >
            {loading ? "Creating..." : "Shorten URL"}
          </button>
        </form>

       {result && (
  <div className="mt-8 p-6 bg-white border border-gray-200 rounded-2xl shadow-sm">
    <h2 className="text-xl font-semibold mb-2 text-gray-900">
      Short Link Created!
    </h2>

    <p className="text-gray-700 text-lg">
      <strong>Code:</strong>{" "}
      <a
        href={`http://localhost:3000/${result.code}`}
        target="_blank"
        rel="noreferrer"
        className="text-[#007AFF] font-semibold hover:underline"
      >
        {result.code}
      </a>
    </p>

    <p className="text-gray-700 mt-1 break-all">
      <strong>Original URL:</strong> {result.url}
    </p>

    <div className="mt-4 flex items-center gap-3">

      {/* COPY BUTTON */}
      <button
        onClick={() => {
          navigator.clipboard.writeText(`http://localhost:3000/${result.code}`);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        }}
        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-lg font-medium transition
        ${
          copied
            ? "bg-green-100 text-green-700 border border-green-400"
            : "bg-[#007AFF] text-white hover:bg-[#0A84FF]"
        }`}
      >
        <ClipboardDocumentCheckIcon className="h-5 w-5" />
        {copied ? "Copied!" : "Copy"}
      </button>

      {/* OPEN BUTTON */}
      <a
        href={`http://localhost:3000/${result.code}`}
        target="_blank"
        className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-100 transition text-lg"
      >
        <ArrowTopRightOnSquareIcon className="h-5 w-5" />
        Open
      </a>

    </div>
  </div>
)}

      </div>
    </div>
  );
}


