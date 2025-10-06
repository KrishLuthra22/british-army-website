import React, { useState, useEffect } from "react";
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

interface NewsItem {
  id: number;
  title: string;
  description: string;
  type: "urgent" | "routine" | "british-orienteering";
  date: string;
  expiryDate?: string;
  priority: number;
  category?: string;
}

const newsData: NewsItem[] = [
  // Urgent News
  {
    id: 1,
    title: "Event Cancellation: Tomorrow's Central League",
    description:
      "Due to severe weather warnings, tomorrow's Central League event at Salisbury Plain has been cancelled. All entries will be automatically transferred to the rescheduled date.",
    type: "urgent",
    date: "2024-01-15",
    expiryDate: "2024-01-16",
    priority: 1,
    category: "Cancellation",
  },
  {
    id: 2,
    title: "Road Closure: Access Route A",
    description:
      "Major roadworks on Access Route A will affect travel to the Northern League event. Please use alternative routes and allow extra journey time.",
    type: "urgent",
    date: "2024-01-14",
    expiryDate: "2024-01-20",
    priority: 2,
    category: "Travel Alert",
  },
  {
    id: 3,
    title: "Venue Change: Scotland League Event",
    description:
      "This weekend's Scotland League event has moved to alternative venue due to forestry work. New location details available online.",
    type: "urgent",
    date: "2024-01-13",
    expiryDate: "2024-01-17",
    priority: 1,
    category: "Venue Change",
  },

  // Routine News
  {
    id: 4,
    title: "2024 Inter-Services Championship Details",
    description:
      "Advanced information and preliminary courses for the upcoming Inter-Services Championship are now available. Registration opens next week.",
    type: "routine",
    date: "2024-01-12",
    priority: 1,
    category: "Championship",
  },
  {
    id: 5,
    title: "Military Success at National Championships",
    description:
      "Congratulations to Capt. Sarah Jenkins on her gold medal performance at the UK National Orienteering Championships last weekend.",
    type: "routine",
    date: "2024-01-10",
    priority: 2,
    category: "Achievement",
  },
  {
    id: 6,
    title: "Winter Training Schedule Released",
    description:
      "New winter training sessions now available across all regions. Focus on navigation skills and night orienteering techniques.",
    type: "routine",
    date: "2024-01-08",
    priority: 3,
    category: "Training",
  },

  // British Orienteering News
  {
    id: 7,
    title: "British Orienteering: New Coaching Framework",
    description:
      "Updated coaching qualifications and development pathways announced for 2024 season.",
    type: "british-orienteering",
    date: "2024-01-13",
    priority: 1,
    category: "Coaching",
  },
  {
    id: 8,
    title: "National Event Calendar Update",
    description:
      "Major national events schedule revised with new venues and dates confirmed.",
    type: "british-orienteering",
    date: "2024-01-09",
    priority: 2,
    category: "Events",
  },
];

const News: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const [activeFilter, setActiveFilter] = useState<
    "all" | "urgent" | "routine" | "british-orienteering"
  >("all");
  const [showAddForm, setShowAddForm] = useState(false);
  const [dynamicNews, setDynamicNews] = useState<NewsItem[]>([]);
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
    const stored = sessionStorage.getItem('news');
    if (stored) {
      setDynamicNews(JSON.parse(stored));
    }
  }, []);

  const allNews = [...newsData, ...dynamicNews];
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

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: NewsItem = {
      id: Date.now(),
      ...formData,
    };
    const updatedNews = [...dynamicNews, newItem];
    setDynamicNews(updatedNews);
    sessionStorage.setItem('news', JSON.stringify(updatedNews));
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
        {([
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
        ]).map((filter) => (
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

      {/* News Grid */}
      <div className="max-w-7xl mx-auto rounded-xl grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredNews.map((item) => (
          <div
            key={item.id}
            className={`
           rounded-lg p-6 transition-all duration-500 
           transform hover:-translate-y-2
           cursor-pointer group relative overflow-hidden
           border border-gray-300 shadow-sm hover:shadow-md bg-white
         `}
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
              <div>{getTypeBadge(item.type)}</div>
              <span className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors font-medium bg-white/80 px-2 py-1 rounded">
                {formatDate(item.date)}
              </span>
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

            {/* Expiry Date */}
            {item.expiryDate && (
              <div className="mt-4 pt-3 border-t border-gray-200">
                <p className="text-xs text-[#a11827] font-semibold bg-[#a11827]/10 px-2 py-1 rounded border border-[#a11827]/40">
                  📅 Valid until: {formatDate(item.expiryDate)}
                </p>
              </div>
            )}

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
            <DialogTitle>Add News</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="type">Type *</Label>
              <Select
                value={formData.type}
                onValueChange={(value: "urgent" | "routine" | "british-orienteering") =>
                  setFormData({ ...formData, type: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="urgent">Urgent</SelectItem>
                  <SelectItem value="routine">Routine</SelectItem>
                  <SelectItem value="british-orienteering">British Orienteering</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="date">Date *</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="expiryDate">Expiry Date</Label>
              <Input
                id="expiryDate"
                type="date"
                value={formData.expiryDate}
                onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="priority">Priority *</Label>
              <Input
                id="priority"
                type="number"
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: parseInt(e.target.value) || 1 })}
                required
              />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
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
