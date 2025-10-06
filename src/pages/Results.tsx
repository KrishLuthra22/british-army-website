import { useState } from "react";
import { PageHeader } from "@/components/ui/page-header";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import {
  ExternalLink,
  Trophy,
  Medal,
  Target,
  Upload,
  File,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import teamVictoryImage from "@/assets/Images/DSC_0229-r.jpg";

const Results = () => {
  const { isLoggedIn } = useAuth();
  const [selectedYear, setSelectedYear] = useState("2024");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const results = [
    {
      date: "2024-09-15",
      event: "AOA Southern League Event 5",
      location: "Aldershot Training Area",
      category: "Southern League",
      year: "2024",
      winner: "Sgt J. Smith (REME)",
      results: "Full Results PDF",
    },
    {
      date: "2024-08-22",
      event: "AOA Championships 2024",
      location: "Catterick Training Area",
      category: "Championship",
      year: "2024",
      winner: "Capt A. Johnson (RE)",
      results: "Championship Results PDF",
    },
    {
      date: "2024-07-18",
      event: "Inter-Services Championship",
      location: "Brecon Beacons",
      category: "Inter-Services",
      year: "2024",
      winner: "Army Team Victory",
      results: "Inter-Services Results PDF",
    },
    {
      date: "2024-06-14",
      event: "AOA Northern League Event 3",
      location: "Yorkshire Dales",
      category: "Northern League",
      year: "2024",
      winner: "Cpl M. Wilson (PWRR)",
      results: "League Results PDF",
    },
    {
      date: "2023-11-12",
      event: "AOA Championships 2023",
      location: "Salisbury Plain",
      category: "Championship",
      year: "2023",
      winner: "Lt K. Brown (AAC)",
      results: "2023 Championship Results PDF",
    },
    {
      date: "2023-09-08",
      event: "National Military Championships",
      location: "Scottish Highlands",
      category: "National",
      year: "2023",
      winner: "Maj R. Taylor (RLC)",
      results: "National Results PDF", // <-- HERE
    },
  ];

  const yearOptions = [
    { value: "2024", label: "2024" },
    { value: "2023", label: "2023" },
    { value: "2022", label: "2022" },
    { value: "2021", label: "2021" },
  ];

  const categoryOptions = [
    { value: "all", label: "All Categories" },
    { value: "championship", label: "Championships" },
    { value: "southern-league", label: "Southern League" },
    { value: "northern-league", label: "Northern League" },
    { value: "inter-services", label: "Inter-Services" },
    { value: "national", label: "National Events" },
  ];

  const filteredResults = results.filter((result) => {
    const yearMatch = selectedYear === "all" || result.year === selectedYear;
    const categoryMatch =
      selectedCategory === "all" ||
      (selectedCategory === "championship" &&
        result.category === "Championship") ||
      (selectedCategory === "southern-league" &&
        result.category === "Southern League") ||
      (selectedCategory === "northern-league" &&
        result.category === "Northern League") ||
      (selectedCategory === "inter-services" &&
        result.category === "Inter-Services") ||
      (selectedCategory === "national" && result.category === "National");

    return yearMatch && categoryMatch;
  });

  const columns = [
    { key: "date", header: "Date", className: "font-medium" },
    { key: "event", header: "Event", className: "min-w-[200px]" },
    { key: "location", header: "Location" },
    { key: "category", header: "Category" },
    { key: "winner", header: "Winner" },
    // { key: "results", header: "Results" }
  ];

  const getIconForCategory = (category: string) => {
    switch (category) {
      case "Championship":
        return <Trophy className="h-4 w-4 text-yellow-600" />;
      case "Inter-Services":
        return <Medal className="h-4 w-4 text-blue-600" />;
      default:
        return <Target className="h-4 w-4 text-green-600" />;
    }
  };

  const tableData = filteredResults.map((result) => ({
    date: new Date(result.date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
    event: (
      <div className="flex items-center space-x-2">
        {getIconForCategory(result.category)}
        <span className="font-medium">{result.event}</span>
      </div>
    ),
    location: result.location,
    category: (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          result.category === "Championship"
            ? "bg-yellow-100 text-yellow-800"
            : result.category === "Inter-Services"
            ? "bg-blue-100 text-blue-800"
            : result.category === "Southern League"
            ? "bg-red-100 text-red-800"
            : result.category === "Northern League"
            ? "bg-green-100 text-green-800"
            : "bg-gray-100 text-gray-800"
        }`}
      >
        {result.category}
      </span>
    ),
    winner: <div className="font-medium text-primary">{result.winner}</div>,
    // results: (
    //   <Button variant="ghost" size="sm">
    //     <ExternalLink className="h-3 w-3 mr-1" />
    //     View PDF
    //   </Button>
    // )
  }));

  const handleUploadClick = () => {
    if (!isLoggedIn) {
      alert("Please login to upload documents");
      return;
    }
    setShowUploadModal(true);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setUploadedFile(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setUploadedFile(files[0]);
    }
  };

  const handleUpload = () => {
    if (uploadedFile) {
      // Here you would typically send the file to your server
      console.log("Uploading file:", uploadedFile.name);
      // For now, just close the modal
      setShowUploadModal(false);
      setUploadedFile(null);
    }
  };

  return (
    <div>
      <PageHeader
        title="Competition Results"
        description="Historical results from orienteering competitions and championships"
        backgroundImage={teamVictoryImage}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-2xl font-bold text-foreground">
              Competition Results
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-full sm:w-[150px]">
                  <SelectValue placeholder="Select year..." />
                </SelectTrigger>
                <SelectContent>
                  {yearOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="Filter category..." />
                </SelectTrigger>
                <SelectContent>
                  {categoryOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Upload Button */}
              <Button onClick={handleUploadClick} className="whitespace-nowrap">
                <Upload className="h-4 w-4 mr-2" />
                Upload File
              </Button>
            </div>
          </div>
        </div>

        {/* Results Table */}
        <DataTable columns={columns} data={tableData} />

        {filteredResults.length === 0 && (
          <div className="text-center py-12">
            <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg text-muted-foreground">
              No results found for the selected filters.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Try adjusting your search criteria.
            </p>
          </div>
        )}

        {/* Upload Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-xl font-semibold mb-4">Upload Result File</h3>

              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
                  isDragOver
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => {
                  const fileInput = document.getElementById("file-upload");
                  if (fileInput) {
                    fileInput.click();
                  }
                }}
              >
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-900 mb-2">
                  {uploadedFile
                    ? uploadedFile.name
                    : "Drag and drop your file here"}
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  or click to select a file like
                  .pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.gif, etc
                </p>
                <input
                  type="file"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload"
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.gif,.mp4,.avi,.mov,.wmv"
                />
                <label htmlFor="file-upload">
                  <Button
                    type="button"
                    variant="outline"
                    className="cursor-pointer"
                  >
                    <File className="h-4 w-4 mr-2" />
                    Choose File
                  </Button>
                </label>
              </div>

              {uploadedFile && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
                  <p className="text-sm text-green-800">
                    File selected: {uploadedFile.name}
                  </p>
                </div>
              )}

              <div className="flex justify-end space-x-2 mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowUploadModal(false);
                    setUploadedFile(null);
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={handleUpload} disabled={!uploadedFile}>
                  Upload
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Results;
