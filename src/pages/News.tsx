import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import BAOC_vertical_logo from "@/assets/BAOC_vertical_logo.png";
import { useAuth } from "@/contexts/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  getCollectionData,
  addDocument,
  updateDocument,
  deleteDocument,
} from "@/Firebase";

interface NewsItem {
  id: string;
  title: string;
  description: string;
  type: "urgent" | "routine" | "british-orienteering";
  date: string;
  expiryDate?: string;
  priority: number;
  category?: string;
}

const News: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const [activeFilter, setActiveFilter] = useState<
    "all" | "urgent" | "routine" | "british-orienteering"
  >("all");
  const [showAddForm, setShowAddForm] = useState(false);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<NewsItem | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "routine" as "urgent" | "routine" | "british-orienteering",
    date: "",
    expiryDate: "",
    priority: 1,
    category: "",
  });

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const data = await getCollectionData("news");
      setNews(data);
    } catch (err) {
      setError("Failed to load news");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const allNews = news;
  const filteredNews = allNews.filter((item) => {
    if (activeFilter === "all") return true;
    return item.type === activeFilter;
  });

  const handleAddNewsClick = () => {
    if (!isLoggedIn) {
      alert("Please login");
      return;
    }
    setShowAddForm(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await updateDocument("news", editingItem.id, formData);
        setNews(
          news.map((item) =>
            item.id === editingItem.id ? { ...item, ...formData } : item
          )
        );
      } else {
        await addDocument("news", formData);
        await fetchNews(); // Refresh the list
      }
      setFormData({
        title: "",
        description: "",
        type: "routine",
        date: "",
        expiryDate: "",
        priority: 1,
        category: "",
      });
      setShowAddForm(false);
      setEditingItem(null);
    } catch (err) {
      console.error("Error saving news:", err);
      alert("Failed to save news");
    }
  };

  const handleEdit = (item: NewsItem) => {
    if (!isLoggedIn) {
      alert("Please login");
      return;
    }
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description,
      type: item.type,
      date: item.date,
      expiryDate: item.expiryDate || "",
      priority: item.priority,
      category: item.category || "",
    });
    setShowAddForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!isLoggedIn) {
      alert("Please login");
      return;
    }
    if (window.confirm("Are you sure you want to delete this news item?")) {
      try {
        await deleteDocument("news", id);
        setNews(news.filter((item) => item.id !== id));
      } catch (err) {
        console.error("Error deleting news:", err);
        alert("Failed to delete news");
      }
    }
  };

  // Military-inspired color scheme based on the screenshot
  const getTypeStyles = (type: string) => {
    switch (type) {
      case "urgent":
        return "border-l-4 border-red-600 bg-gradient-to-r from-red-50 to-white hover:from-red-100 hover:to-white shadow-md hover:shadow-xl";
      case "routine":
        return "border-l-4 border-blue-700 bg-gradient-to-r from-blue-50 to-white hover:from-blue-100 hover:to-white shadow-sm hover:shadow-lg";
      case "british-orienteering":
        return "border-l-4 border-green-700 bg-gradient-to-r from-green-50 to-white hover:from-green-100 hover:to-white shadow-sm hover:shadow-lg";
      default:
        return "border-l-4 border-gray-400 bg-gradient-to-r from-gray-50 to-white hover:from-gray-100 hover:to-white";
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "urgent":
        return (
          <span className="bg-red-500 text-white px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wide border border-red-700">
            ⚠️ Urgent Alert
          </span>
        );
      case "routine":
        return (
          <span className="bg-[#4796f0] text-white px-3 py-1 border rounded-lg text-xs font-bold uppercase tracking-wide border border-blue-800">
            Routine Update
          </span>
        );
      case "british-orienteering":
        return (
          <span className="bg-green-600 text-white px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wide border border-green-800">
            British Orienteering
          </span>
        );
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#a11827]/10 via-[#162e5e]/10 to-[#1f7a3a]/10 py-12 px-4">
      {/* Section Header */}
      <div className="text-center mb-12 max-w-4xl mx-auto">
        <div className="inline-flex items-center justify-center mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-[#a11827] via-[#162e5e] to-[#1f7a3a] rounded-lg mr-4 shadow-lg">
            <img className="rounded-lg" src={BAOC_vertical_logo} alt="" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 bg-gradient-to-r from-[#a11827] via-[#162e5e] to-[#1f7a3a] bg-clip-text text-transparent">
            Army Orienteering News
          </h2>
        </div>
        <p className="text-gray-700 text-lg max-w-2xl mx-auto leading-relaxed">
          Latest updates, event changes, and important announcements for the
          orienteering community
        </p>
        <div className="mt-6">
          <button
            onClick={handleAddNewsClick}
            className="bg-gradient-to-r from-[#162e5e] to-[#a11827] text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            Add News
          </button>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-12 max-w-4xl mx-auto">
        {[
          { key: "all" as const, label: "All News", count: allNews.length },
          {
            key: "urgent" as const,
            label: "Urgent Alerts",
            count: allNews.filter((n) => n.type === "urgent").length,
          },
          {
            key: "routine" as const,
            label: "Routine Updates",
            count: allNews.filter((n) => n.type === "routine").length,
          },
          {
            key: "british-orienteering" as const,
            label: "British Orienteering",
            count: allNews.filter((n) => n.type === "british-orienteering")
              .length,
          },
        ].map((filter) => (
          <button
            key={filter.key}
            onClick={() => setActiveFilter(filter.key)}
            className={`
           px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform
           hover:scale-105 border-2 flex items-center gap-2 min-w-[140px] justify-center
           shadow-sm hover:shadow-md
           ${
             activeFilter === filter.key
               ? "bg-gradient-to-r from-[#162e5e] to-[#a11827] text-white border-[#162e5e] shadow-lg"
               : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-500"
           }
         `}
          >
            <span className="font-semibold">{filter.label}</span>
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                activeFilter === filter.key
                  ? "bg-white text-[#162e5e]"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {filter.count}
            </span>
          </button>
        ))}
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center py-16">
          <div className="text-gray-400 text-2xl mb-4">⏳</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-3">
            Loading News...
          </h3>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="text-center py-16">
          <div className="text-red-400 text-2xl mb-4">❌</div>
          <h3 className="text-xl font-semibold text-red-600 mb-3">
            Error Loading News
          </h3>
          <p className="text-gray-500">{error}</p>
        </div>
      )}

      {/* News Grid */}
      {!loading && !error && (
        <div className="max-w-7xl mx-auto rounded-xl grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredNews.map((item) => (
            <div
              key={item.id}
              className="
          rounded-lg p-6 transition-all duration-500 
          transform hover:-translate-y-2
          cursor-pointer group relative overflow-hidden
          border border-gray-300 shadow-sm hover:shadow-md bg-white
        "
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div>{getTypeBadge(item.type)}</div>
                <div className="flex items-center gap-2">
                  {isLoggedIn && (
                    <>
                      <div className="flex items-center gap-2">
                        {/* Edit Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(item);
                          }}
                          className="
      flex items-center justify-center
      w-8 h-8 rounded-full
      bg-blue-50 text-blue-600
      hover:bg-blue-100 hover:text-blue-800
      shadow-sm hover:shadow-md
      transition-all duration-300
    "
                          title="Edit"
                        >
                          <FaEdit className="w-4 h-4" />
                        </button>

                        {/* Delete Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(item.id);
                          }}
                          className="
      flex items-center justify-center
      w-8 h-8 rounded-full
      bg-red-50 text-red-600
      hover:bg-red-100 hover:text-red-800
      shadow-sm hover:shadow-md
      transition-all duration-300
    "
                          title="Delete"
                        >
                          <FaTrash className="w-4 h-4" />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Category */}
              {item.category && (
                <div className="mb-3">
                  <span className="inline-block bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold border border-gray-300">
                    {item.category}
                  </span>
                </div>
              )}

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#162e5e] transition-colors leading-tight line-clamp-2">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-gray-700 group-hover:text-gray-800 transition-colors leading-relaxed line-clamp-3 mb-4">
                {item.description}
              </p>
              <div className="flex flex-row items-center justify-center gap-4">
                {/* Created At */}
                <div className="mt-4 pt-3 border-t border-gray-200  ">
                  <span className="text-xs text-[#2457a8] font-semibold bg-[#94b1e0]/10 px-2 py-1 rounded border border-[#2457a8]/40">
                    📅 Created at: {formatDate(item.date)}
                  </span>
                </div>

                {/* Expiry Date */}
                {item.expiryDate && (
                  <div className="mt-4 pt-3 border-t border-gray-200">
                    <p className="text-xs text-[#a11827] font-semibold bg-[#a11827]/10 px-2 py-1 rounded border border-[#a11827]/40">
                      📅 Valid until: {formatDate(item.expiryDate)}
                    </p>
                  </div>
                )}
              </div>
              {/* Hover Read More Indicator */}
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-gradient-to-r from-[#162e5e] to-[#a11827] text-white p-2 rounded-lg transform group-hover:scale-110 transition-transform shadow-md">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No Results */}
      {filteredNews.length === 0 && (
        <div className="text-center py-16 max-w-2xl mx-auto">
          <div className="text-gray-400 text-6xl mb-4">🎯</div>
          <h3 className="text-2xl font-bold text-gray-600 mb-3">
            No News Found
          </h3>
          <p className="text-gray-500 mb-6">
            Try selecting a different category filter
          </p>
          <button
            onClick={() => setActiveFilter("all")}
            className="bg-gradient-to-r from-[#162e5e] to-[#a11827] text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            Show All News
          </button>
        </div>
      )}

      {/* Add News Dialog */}
      <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingItem ? "Edit News" : "Add News"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="type">Type *</Label>
              <Select
                value={formData.type}
                onValueChange={(
                  value: "urgent" | "routine" | "british-orienteering"
                ) => setFormData({ ...formData, type: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="urgent">Urgent</SelectItem>
                  <SelectItem value="routine">Routine</SelectItem>
                  <SelectItem value="british-orienteering">
                    British Orienteering
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="date">Date *</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="expiryDate">Expiry Date</Label>
              <Input
                id="expiryDate"
                type="date"
                value={formData.expiryDate}
                onChange={(e) =>
                  setFormData({ ...formData, expiryDate: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="priority">Priority *</Label>
              <Input
                id="priority"
                type="number"
                value={formData.priority}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    priority: parseInt(e.target.value) || 1,
                  })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              />
            </div>
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default News;
