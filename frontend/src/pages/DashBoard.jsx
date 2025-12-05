import React, { useEffect, useState } from "react";
import { getLinks, deleteLink } from "../api/links";
import LinkCard from "../components/LinkCard";

export default function Dashboard() {
  const [links, setLinks] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      const data = await getLinks();
      setLinks(data);
      setFiltered(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }

  function handleSearch(e) {
    const value = e.target.value;
    setSearch(value);

    const res = links.filter((l) =>
      l.code.toLowerCase().includes(value.toLowerCase()) ||
      l.url.toLowerCase().includes(value.toLowerCase())
    );

    applySort(res, sortBy);
  }

  function handleSort(e) {
    const value = e.target.value;
    setSortBy(value);
    applySort(filtered, value);
  }

  function applySort(data, type) {
    let sorted = [...data];

    if (type === "newest") sorted.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    if (type === "oldest") sorted.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    if (type === "most_clicks") sorted.sort((a, b) => b.clicks - a.clicks);
    if (type === "least_clicks") sorted.sort((a, b) => a.clicks - b.clicks);

    setFiltered(sorted);
  }

  async function handleDelete(code) {
    if (!confirm("Delete this link?")) return;
    await deleteLink(code);
    const updated = links.filter((l) => l.code !== code);
    setLinks(updated);
    applySort(updated, sortBy);
  }

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-6 text-gray-900">Your Links</h2>

      <div className="flex gap-4 mb-6">
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search by code or URL..."
          className="px-4 py-2 border rounded-xl w-full"
        />

        <select
          value={sortBy}
          onChange={handleSort}
          className="px-4 py-2 border rounded-xl"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="most_clicks">Most Clicks</option>
          <option value="least_clicks">Least Clicks</option>
        </select>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid gap-4">
          {filtered.length === 0 && (
            <div className="text-gray-500">No links found.</div>
          )}

          {filtered.map((link) => (
            <LinkCard key={link._id} link={link} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}


