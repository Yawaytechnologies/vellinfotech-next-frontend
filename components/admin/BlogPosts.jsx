'use client'
import React, { useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";
import { FaTrash, FaSync, FaPlus, FaEdit, FaImage } from "react-icons/fa";
import { FiX, FiUpload, FiLink } from "react-icons/fi";

const API_BASE = (
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000"
).replace(/\/$/, "");

const EMPTY_FORM = {
  title: "",
  category: "",
  slug: "",
  excerpt: "",
  content: "",
  imageBase64: "",
};

function Modal({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[1000]">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[760px] max-w-[95vw] max-h-[92vh] overflow-y-auto bg-white rounded-xl shadow-2xl border border-gray-200 p-5">
        <div className="flex items-center justify-between mb-4 sticky top-0 bg-white pb-2 border-b z-10">
          <h3 className="text-base font-semibold text-gray-800">{title}</h3>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-gray-100 text-gray-500"
          >
            <FiX size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

const inputCls =
  "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 " +
  "focus:outline-none focus:border-[#5d5cfd] focus:ring-1 focus:ring-[#5d5cfd]/30 bg-white";

function Field({ label, required, hint, children }) {
  return (
    <div className="space-y-1">
      <div className="flex items-baseline gap-2">
        <label className="block text-xs font-medium text-gray-600">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
        {hint && <span className="text-[11px] text-gray-400">{hint}</span>}
      </div>
      {children}
    </div>
  );
}

function ImagePicker({ value, onChange }) {
  const fileRef = useRef();
  const [tab, setTab] = useState("upload"); // "upload" | "url"
  const [urlInput, setUrlInput] = useState("");

  const isDataUrl = value && value.startsWith("data:");
  const isHttpUrl = value && (value.startsWith("http://") || value.startsWith("https://"));
  const hasImage = isDataUrl || isHttpUrl;

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onChange(reader.result);
    reader.readAsDataURL(file);
  };

  const handleUrlApply = () => {
    if (urlInput.trim()) onChange(urlInput.trim());
  };

  return (
    <div className="space-y-2">
      {/* Tab switcher */}
      <div className="flex gap-1 border border-gray-200 rounded-lg p-0.5 w-fit">
        <button
          type="button"
          onClick={() => setTab("upload")}
          className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition ${
            tab === "upload"
              ? "bg-[#5d5cfd] text-white"
              : "text-gray-500 hover:bg-gray-100"
          }`}
        >
          <FiUpload size={12} /> Upload File
        </button>
        <button
          type="button"
          onClick={() => setTab("url")}
          className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition ${
            tab === "url"
              ? "bg-[#5d5cfd] text-white"
              : "text-gray-500 hover:bg-gray-100"
          }`}
        >
          <FiLink size={12} /> Image URL
        </button>
      </div>

      {tab === "upload" && (
        <div
          onClick={() => fileRef.current?.click()}
          className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-lg p-4 cursor-pointer hover:border-[#5d5cfd]/50 hover:bg-indigo-50/30 transition"
        >
          <FaImage className="text-gray-300" size={28} />
          <span className="text-xs text-gray-400">
            Click to choose an image (JPG, PNG, WebP)
          </span>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFile}
          />
        </div>
      )}

      {tab === "url" && (
        <div className="flex gap-2">
          <input
            type="url"
            className={inputCls}
            placeholder="https://example.com/image.jpg"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
          />
          <button
            type="button"
            onClick={handleUrlApply}
            className="px-3 py-2 rounded-lg bg-[#5d5cfd] hover:bg-[#4e4bcc] text-white text-xs font-medium whitespace-nowrap transition"
          >
            Use URL
          </button>
        </div>
      )}

      {/* Preview */}
      {hasImage && (
        <div className="relative w-full h-36 rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
          <img
            src={value}
            alt="Preview"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
          <button
            type="button"
            onClick={() => {
              onChange("");
              setUrlInput("");
            }}
            className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white rounded-full p-1 transition"
            title="Remove image"
          >
            <FiX size={14} />
          </button>
        </div>
      )}

      {!hasImage && value && (
        <p className="text-xs text-gray-400 italic">
          Image will be processed when saved.
        </p>
      )}
    </div>
  );
}

export default function BlogPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState(null);

  const [deletingId, setDeletingId] = useState(null);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(
        `${API_BASE}/api/blogposts?page=0&size=100&sortBy=id&direction=desc`
      );
      const items = Array.isArray(data)
        ? data
        : Array.isArray(data?.content)
        ? data.content
        : [];
      setPosts(items);
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Failed to fetch posts"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const openAdd = () => {
    setEditingPost(null);
    setForm(EMPTY_FORM);
    setFormError(null);
    setShowForm(true);
  };

  const openEdit = (post) => {
    setEditingPost(post);
    setForm({
      title: post.title || "",
      category: post.category || "",
      slug: post.slug || "",
      excerpt: post.excerpt || "",
      content: post.content || "",
      imageBase64: post.imageBase64 || "",
    });
    setFormError(null);
    setShowForm(true);
  };

  const set = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setFormError(null);
    try {
      if (editingPost) {
        const { data } = await axios.put(
          `${API_BASE}/api/blogposts/${editingPost.id}`,
          form
        );
        setPosts((prev) => prev.map((p) => (p.id === data.id ? data : p)));
      } else {
        const { data } = await axios.post(`${API_BASE}/api/blogposts`, form);
        setPosts((prev) => [data, ...prev]);
      }
      setShowForm(false);
    } catch (err) {
      setFormError(
        err.response?.data?.message || err.message || "Failed to save blog post"
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this blog post? This cannot be undone.")) return;
    setDeletingId(id);
    try {
      await axios.delete(`${API_BASE}/api/blogposts/${id}`);
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete blog post");
    } finally {
      setDeletingId(null);
    }
  };

  const truncate = (str, n = 80) =>
    !str ? "—" : str.length > n ? str.slice(0, n) + "…" : str;

  return (
    <div className="px-3 py-4 md:p-6 max-w-screen-lg mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-base sm:text-lg md:text-2xl font-semibold text-[#5d5cfd]">
          Blog Posts
        </h2>
        <div className="flex gap-2">
          <button
            onClick={fetchPosts}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-3 py-2 rounded shadow flex items-center gap-2 text-sm transition"
          >
            <FaSync className={loading ? "animate-spin" : ""} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
          <button
            onClick={openAdd}
            className="bg-[#5d5cfd] hover:bg-[#4e4bcc] text-white font-medium px-3 py-2 rounded shadow flex items-center gap-2 text-sm transition"
          >
            <FaPlus />
            <span className="hidden sm:inline">New Post</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 px-4 py-3 rounded border border-red-200 bg-red-50 text-red-700 text-sm">
          {error}
        </div>
      )}
      {loading && (
        <div className="mb-4 px-4 py-3 rounded border border-blue-200 bg-blue-50 text-blue-700 text-sm">
          Loading blog posts…
        </div>
      )}

      {/* ── Mobile cards ── */}
      <div className="block md:hidden space-y-3">
        {!loading && posts.length === 0 && (
          <div className="py-8 px-4 text-center text-gray-500 bg-white rounded-lg shadow text-sm">
            No blog posts yet. Click{" "}
            <span className="font-medium text-[#5d5cfd]">+ New Post</span> to
            create one.
          </div>
        )}
        {posts.map((post) => (
          <div
            key={post.id}
            className="rounded-xl bg-white shadow border border-gray-200 overflow-hidden"
          >
            {post.imageBase64 && (
              <img
                src={post.imageBase64}
                alt={post.title}
                className="w-full h-32 object-cover"
                onError={(e) => (e.target.style.display = "none")}
              />
            )}
            <div className="p-4">
              <div className="font-semibold text-gray-900 leading-tight">
                {post.title}
              </div>
              {post.excerpt && (
                <div className="text-xs text-gray-500 mt-1">
                  {truncate(post.excerpt, 100)}
                </div>
              )}
              <div className="mt-3 flex items-center gap-2">
                <button
                  onClick={() => openEdit(post)}
                  className="flex-1 px-2 py-1.5 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs flex items-center justify-center gap-1 font-medium transition"
                >
                  <FaEdit size={11} /> Edit
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  disabled={deletingId === post.id}
                  className="flex-1 px-2 py-1.5 rounded-md bg-red-50 hover:bg-red-100 text-red-600 text-xs flex items-center justify-center gap-1 font-medium transition disabled:opacity-50"
                >
                  <FaTrash
                    size={11}
                    className={deletingId === post.id ? "animate-pulse" : ""}
                  />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Desktop table ── */}
      <div className="hidden md:block rounded-lg bg-white shadow overflow-hidden">
        <div className="w-full overflow-x-auto">
          <div className="max-h-[calc(100vh-240px)] overflow-y-auto">
            <table className="w-full text-sm table-auto min-w-[700px]">
              <thead className="bg-[#f7f8fa] text-[#525252] sticky top-0 z-10">
                <tr>
                  <th className="py-3 px-3 font-semibold text-left w-10">
                    Sl
                  </th>
                  <th className="py-3 px-3 font-semibold text-left w-14">
                    Image
                  </th>
                  <th className="py-3 px-3 font-semibold text-left">Title</th>
                  <th className="py-3 px-3 font-semibold text-left">Excerpt</th>
                  <th className="py-3 px-3 font-semibold text-left w-24">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {!loading && posts.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="py-12 text-center text-gray-400 text-sm"
                    >
                      No blog posts yet. Click{" "}
                      <span className="text-[#5d5cfd] font-medium">
                        + New Post
                      </span>{" "}
                      to create one.
                    </td>
                  </tr>
                )}
                {posts.map((post, i) => (
                  <tr
                    key={post.id}
                    className="border-b last:border-0 hover:bg-gray-50 transition"
                  >
                    <td className="py-3 px-3 font-bold text-black/40 text-xs">
                      {String(i + 1).padStart(2, "0")}
                    </td>
                    <td className="py-3 px-3">
                      {post.imageBase64 ? (
                        <img
                          src={post.imageBase64}
                          alt=""
                          className="w-10 h-10 rounded object-cover border border-gray-200"
                          onError={(e) => (e.target.style.display = "none")}
                        />
                      ) : (
                        <div className="w-10 h-10 rounded bg-gray-100 flex items-center justify-center">
                          <FaImage className="text-gray-300" size={16} />
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-3">
                      <div className="font-medium text-gray-900">
                        {post.title}
                      </div>
                    </td>
                    <td className="py-3 px-3 text-gray-400 text-xs">
                      {truncate(post.excerpt)}
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => openEdit(post)}
                          className="text-gray-400 hover:text-[#5d5cfd] p-1.5 rounded hover:bg-gray-100 transition"
                          title="Edit"
                        >
                          <FaEdit size={13} />
                        </button>
                        <button
                          onClick={() => handleDelete(post.id)}
                          disabled={deletingId === post.id}
                          className="text-red-400 hover:text-red-600 p-1.5 rounded hover:bg-red-50 transition disabled:opacity-40"
                          title="Delete"
                        >
                          <FaTrash
                            size={12}
                            className={
                              deletingId === post.id ? "animate-pulse" : ""
                            }
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── Add / Edit Modal ── */}
      <Modal
        open={showForm}
        onClose={() => setShowForm(false)}
        title={editingPost ? "Edit Blog Post" : "New Blog Post"}
      >
        <form onSubmit={handleSave} className="space-y-4">
          {formError && (
            <div className="px-3 py-2 rounded bg-red-50 border border-red-200 text-red-700 text-sm">
              {formError}
            </div>
          )}

          <Field label="Title" required>
            <input
              className={inputCls}
              value={form.title}
              onChange={set("title")}
              required
              maxLength={255}
              placeholder="Blog post title"
            />
          </Field>

          <Field
            label="Category"
            hint="Groups the post in the blog sidebar. Defaults to Articles."
          >
            <input
              className={inputCls}
              value={form.category}
              onChange={set("category")}
              maxLength={60}
              placeholder="Articles"
            />
          </Field>

          <Field
            label="URL slug"
            hint={
              editingPost
                ? "Changing this changes the post's public URL and breaks existing links. Leave it alone unless you mean it."
                : "Leave blank to generate one from the title."
            }
          >
            <input
              className={inputCls}
              value={form.slug}
              onChange={set("slug")}
              maxLength={120}
              placeholder="generated-from-the-title"
            />

            {form.slug && (
              <p className="mt-1 break-all text-[11px] text-gray-500">
                https://www.vellinfotech.com/blog/{form.slug}
              </p>
            )}
          </Field>

          <Field
            label="Excerpt"
            hint="Short summary shown on the blog listing page"
          >
            <textarea
              className={inputCls}
              rows={2}
              value={form.excerpt}
              onChange={set("excerpt")}
              maxLength={500}
              placeholder="A brief summary of the post…"
            />
          </Field>

          <Field
            label="Content"
            required
            hint="HTML or plain text"
          >
            <textarea
              className={inputCls}
              rows={10}
              value={form.content}
              onChange={set("content")}
              required
              placeholder="Write your blog post content here… (HTML is supported)"
            />
          </Field>

          <Field label="Featured Image" hint="Upload a file or paste an image URL">
            <ImagePicker
              value={form.imageBase64}
              onChange={(val) =>
                setForm((prev) => ({ ...prev, imageBase64: val }))
              }
            />
          </Field>

          <div className="flex justify-end gap-3 pt-3 border-t mt-2">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm text-gray-700 font-medium transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 rounded-lg bg-[#5d5cfd] hover:bg-[#4e4bcc] disabled:opacity-60 text-white text-sm font-semibold flex items-center gap-2 transition"
            >
              {saving && (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              )}
              {editingPost ? "Save Changes" : "Publish Post"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
