import { useState, useEffect } from "react";
import { PageHeader } from "@/components/ui/page-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  Calendar as CalendarIcon,
  MapPin,
  Download,
  Plus,
  Edit,
  Trash2,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar as ShadcnCalendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import instructorTeachingImage from "@/assets/Images/DSC_0214-r.jpg";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { getCollectionData } from "@/Firebase/CloudFirestore/GetData";
import { addDocument, updateDocument } from "@/Firebase/CloudFirestore/SetData";
import { deleteDocument } from "@/Firebase/CloudFirestore/DeleteData";

const Calendar = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedLeague, setSelectedLeague] = useState("all");
  const [selectedEventType, setSelectedEventType] = useState("all");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [dateOpen, setDateOpen] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
    event: "",
    location: "",
    type: "",
    category: "",
    league: "",
    raceSignUp: "",
    documents: "",
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const data = await getCollectionData("events");
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddEvent = () => {
    setEditingEvent(null);
    setFormData({
      date: "",
      event: "",
      location: "",
      type: "",
      category: "",
      league: "",
      raceSignUp: "",
      documents: "",
    });
    setModalOpen(true);
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setFormData({
      date: event.date,
      event: event.event,
      location: event.location,
      type: event.type,
      category: event.category,
      league: event.league,
      raceSignUp: event.raceSignUp,
      documents: event.documents,
    });
    setModalOpen(true);
  };

  const handleDeleteEvent = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await deleteDocument("events", id);
        fetchEvents();
      } catch (error) {
        console.error("Error deleting event:", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingEvent) {
        await updateDocument("events", editingEvent.id, formData);
      } else {
        await addDocument("events", formData);
      }
      setModalOpen(false);
      fetchEvents();
    } catch (error) {
      console.error("Error saving event:", error);
    }
  };

  const localizer = momentLocalizer(moment);

  const calendarEvents = events.map((event) => ({
    title: event.event,
    start: new Date(event.date),
    end: new Date(event.date),
    resource: event,
  }));

  const eventDates = new Set(events.map((event) => event.date));

  const filterOptions = [
    { value: "all", label: "All Events" },
    { value: "competition", label: "Competitions" },
    { value: "training", label: "Training Courses" },
    { value: "championship", label: "Championships" },
    { value: "southern-league", label: "Southern League" },
    { value: "northern-league", label: "Northern League" },
    { value: "skills-course", label: "Skills Courses" },
  ];

  const leagueOptions = [
    { value: "all", label: "All Leagues" },
    { value: "Central", label: "Central" },
    { value: "NI", label: "NI" },
    { value: "North", label: "North" },
    { value: "Scotland", label: "Scotland" },
    { value: "South", label: "South" },
  ];

  const eventTypeOptions = [
    { value: "all", label: "All Event Types" },
    { value: "League", label: "League" },
    { value: "Championships", label: "Championships" },
    { value: "Course", label: "Course" },
  ];

  const filteredEvents = events.filter((event) => {
    // Filter by main category
    let matchesMainFilter = true;
    if (selectedFilter !== "all") {
      if (selectedFilter === "competition")
        matchesMainFilter = event.type === "Competition";
      else if (selectedFilter === "training")
        matchesMainFilter = event.type === "Training";
      else if (selectedFilter === "championship")
        matchesMainFilter = event.type === "Championship";
      else if (selectedFilter === "southern-league")
        matchesMainFilter = event.category === "Southern League";
      else if (selectedFilter === "skills-course")
        matchesMainFilter = event.category === "Skills Course";
    }

    // Filter by league
    let matchesLeague = true;
    if (selectedLeague !== "all") {
      matchesLeague = event.league === selectedLeague;
    }

    // Filter by event type
    let matchesEventType = true;
    if (selectedEventType !== "all") {
      if (selectedEventType === "League")
        matchesEventType = event.category.includes("League");
      else if (selectedEventType === "Championships")
        matchesEventType = event.type === "Championship";
      else if (selectedEventType === "Course")
        matchesEventType = event.type === "Training";
    }

    return matchesMainFilter && matchesLeague && matchesEventType;
  });

  const columns = [
    { key: "date", header: "Date", className: "font-medium" },
    { key: "event", header: "Event", className: "min-w-[200px]" },
    { key: "location", header: "Location" },
    { key: "type", header: "Type" },
    { key: "league", header: "League" },
    { key: "raceSignUp", header: "Registration" },
    { key: "actions", header: "Actions", className: "w-[120px]" },
    // { key: "documents", header: "Documents" }
  ];

  const tableData = filteredEvents.map((event) => ({
    date: new Date(event.date).toLocaleDateString("en-GB", {
      weekday: "short",
      day: "2-digit",
      month: "short",
    }),
    event: (
      <div className="flex items-center space-x-2">
        <CalendarIcon className="h-4 w-4 text-primary" />
        <span className="font-medium">{event.event}</span>
      </div>
    ),
    location: (
      <div className="flex items-center space-x-2">
        <MapPin className="h-4 w-4 text-muted-foreground" />
        <span>{event.location}</span>
      </div>
    ),
    type: (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          event.type === "Competition"
            ? "bg-primary/10 text-primary"
            : event.type === "Training"
            ? "bg-secondary/10 text-secondary"
            : "bg-muted text-muted-foreground"
        }`}
      >
        {event.type}
      </span>
    ),
    league: event.league,
    raceSignUp: event.raceSignUp.startsWith("http") ? (
      <Button variant="outline" size="sm" asChild>
        <a href={event.raceSignUp} target="_blank" rel="noopener noreferrer">
          <ExternalLink className="h-3 w-3 mr-1" />
          Register
        </a>
      </Button>
    ) : (
      <span className="text-sm text-muted-foreground">{event.raceSignUp}</span>
    ),
    actions: (
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleEditEvent(event)}
        >
          <Edit className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleDeleteEvent(event.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    ),
    // documents: (
    //   <Button variant="ghost" size="sm">
    //     <ExternalLink className="h-3 w-3 mr-1" />
    //     View PDF
    //   </Button>
    // )
  }));

  // Function to download filtered events as CSV
  const downloadFilteredEvents = () => {
    const csvHeader = [
      "Date",
      "Event",
      "Location",
      "Type",
      "Category",
      "League",
      "Race Sign Up",
      "Documents",
    ];

    const csvRows = filteredEvents.map((event) => {
      const formattedDate = new Date(event.date).toLocaleDateString("en-GB", {
        weekday: "short",
        day: "2-digit",
        month: "short",
      });
      // Escape quotes and commas in fields for proper CSV format
      const escapeCSV = (field: string) => {
        if (typeof field !== "string") {
          field = String(field);
        }
        if (field.includes('"')) {
          field = field.replace(/"/g, '""');
        }
        if (
          field.includes(",") ||
          field.includes("\n") ||
          field.includes('"')
        ) {
          field = `"${field}"`;
        }
        return field;
      };
      return [
        formattedDate,
        event.event,
        event.location,
        event.type,
        event.category,
        event.league,
        event.raceSignUp,
        event.documents,
      ]
        .map(escapeCSV)
        .join(",");
    });

    const csvContent = [csvHeader.join(","), ...csvRows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "events.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <PageHeader
        title="Event Calendar"
        description="Upcoming orienteering events, competitions, and training courses"
        backgroundImage={instructorTeachingImage}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Profile Requirements */}
        <Card className="mb-8 shadow-card-custom">
          <CardHeader>
            <CardTitle className="text-primary">Profile Requirements</CardTitle>
            <CardDescription>
              Before entering an event, please check that your profile on
              RaceSignUp is correct as below. Also, if you have more than one
              profile, select the one for Military Leagues.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-primary mb-3">
                  Serving Military
                </h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Service number – Rank – Forename – Surname – Unit – Date of
                  Birth
                </p>
                <p className="text-xs text-muted-foreground">
                  If you change Unit during the season, please use the new
                  Organisation from your joining date.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-primary mb-3">
                  MOD Civil Servants
                </h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Staff number – Grade – Forename – Surname – Unit – Date of
                  Birth
                </p>
                <p className="text-xs text-muted-foreground">
                  If you change Unit during the season, please use the new
                  Organisation from your joining date.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-primary mb-3">
                  Military Veterans
                </h4>
                <p className="text-sm text-muted-foreground">
                  BOF number – Rank(retd) - Forename – Surname – Club – Date of
                  Birth
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-primary mb-3">Civilians</h4>
                <p className="text-sm text-muted-foreground">
                  BOF number – Forename – Surname – Club – Date of Birth
                </p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4 italic">
              Your help with this will be greatly appreciated by your league
              results secretary and will make the production of collated results
              through the season more accurate and timely.
            </p>
          </CardContent>
        </Card>

        {/* Filter Section */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-2xl font-bold text-foreground">
              Upcoming Events
            </h2>
            <div className="flex flex-col sm:flex-row gap-4">
              {/* League Filter */}
              <Select value={selectedLeague} onValueChange={setSelectedLeague}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by league..." />
                </SelectTrigger>
                <SelectContent>
                  {leagueOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Event Type Filter */}
              {/* <Select
                value={selectedEventType}
                onValueChange={setSelectedEventType}
              >
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by type..." />
                </SelectTrigger>
                <SelectContent>
                  {eventTypeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select> */}

              {/* Main Event Filter */}
              <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter events..." />
                </SelectTrigger>
                <SelectContent>
                  {filterOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Add Event Button */}
              <Button
                variant="default"
                size="sm"
                onClick={handleAddEvent}
                className="flex items-center gap-1"
              >
                <Plus className="h-4 w-4" />
                Add Event
              </Button>

              {/* Download Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={downloadFilteredEvents}
                className="flex items-center gap-1"
              >
                <Download className="h-4 w-4" />
                Download
              </Button>
            </div>
          </div>
        </div>

        {/* Events Table */}
        <DataTable columns={columns} data={tableData} />

        {/* Calendar View */}
        <Card className="mt-8 shadow-card-custom">
          <CardHeader>
            <CardTitle>Calendar View</CardTitle>
          </CardHeader>
          <CardContent>
            <BigCalendar
              localizer={localizer}
              events={calendarEvents}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 500 }}
              views={["month", "week", "day"]}
              defaultView="month"
            />
          </CardContent>
        </Card>

        {/* Add/Edit Event Modal */}
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden bg-gradient-to-br from-white/90 to-gray-50/70 backdrop-blur-xl border border-gray-200 shadow-2xl rounded-2xl">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#162e5e] to-[#a11827] px-6 py-4">
              <DialogHeader>
                <DialogTitle className="text-white text-lg font-semibold">
                  {editingEvent ? "Edit Event" : "Add New Event"}
                </DialogTitle>
                <DialogDescription className="text-white/80 text-sm">
                  {editingEvent
                    ? "Update the details below to modify this event."
                    : "Provide event details to add it to the schedule."}
                </DialogDescription>
              </DialogHeader>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Date Field */}
              <div className="flex flex-col gap-1">
                <Label htmlFor="date" className="font-medium text-gray-700">
                  Date
                </Label>
                <Popover open={dateOpen} onOpenChange={setDateOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "justify-start text-left font-normal border-gray-300 hover:border-blue-500 transition",
                        !formData.date && "text-gray-500"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 text-gray-500" />
                      {formData.date ? (
                        format(new Date(formData.date), "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <ShadcnCalendar
                      mode="single"
                      selected={
                        formData.date ? new Date(formData.date) : undefined
                      }
                      onSelect={(date) => {
                        setFormData({
                          ...formData,
                          date: date ? date.toISOString().split("T")[0] : "",
                        });
                        setDateOpen(false);
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Text Inputs */}
              {[
                {
                  id: "event",
                  label: "Event",
                  placeholder: "Enter event name",
                  required: true,
                },
                {
                  id: "location",
                  label: "Location",
                  placeholder: "Enter event location",
                  required: true,
                },
                { id: "category", label: "Category", placeholder: "Optional" },
                {
                  id: "raceSignUp",
                  label: "Race Sign Up",
                  placeholder: "Optional",
                },
                {
                  id: "documents",
                  label: "Documents",
                  placeholder: "Link or document name",
                },
              ].map((field) => (
                <div key={field.id} className="flex flex-col gap-1">
                  <Label
                    htmlFor={field.id}
                    className="font-medium text-gray-700"
                  >
                    {field.label}
                  </Label>
                  <Input
                    id={field.id}
                    value={formData[field.id]}
                    onChange={(e) =>
                      setFormData({ ...formData, [field.id]: e.target.value })
                    }
                    className="border-gray-300 focus:border-blue-600 focus:ring-blue-500 transition"
                    placeholder={field.placeholder}
                    required={field.required}
                  />
                </div>
              ))}

              {/* Type */}
              <div className="flex flex-col gap-1">
                <Label htmlFor="type" className="font-medium text-gray-700">
                  Type
                </Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) =>
                    setFormData({ ...formData, type: value })
                  }
                >
                  <SelectTrigger className="border-gray-300 focus:border-blue-600 transition">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Competition">Competition</SelectItem>
                    <SelectItem value="Training">Training</SelectItem>
                    <SelectItem value="Championship">Championship</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* League */}
              <div className="flex flex-col gap-1">
                <Label htmlFor="league" className="font-medium text-gray-700">
                  League
                </Label>
                <Select
                  value={formData.league}
                  onValueChange={(value) =>
                    setFormData({ ...formData, league: value })
                  }
                >
                  <SelectTrigger className="border-gray-300 focus:border-blue-600 transition">
                    <SelectValue placeholder="Select league" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Central">Central</SelectItem>
                    <SelectItem value="NI">NI</SelectItem>
                    <SelectItem value="North">North</SelectItem>
                    <SelectItem value="Scotland">Scotland</SelectItem>
                    <SelectItem value="South">South</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Footer */}
              <DialogFooter className="pt-6 border-t border-gray-200 mt-6">
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#162e5e] to-[#a11827] hover:opacity-90 text-white font-semibold py-2 rounded-lg transition-all duration-300"
                >
                  {editingEvent ? "Update Event" : "Add Event"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Calendar;
