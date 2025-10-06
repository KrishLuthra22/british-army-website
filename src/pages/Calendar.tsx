import { useState } from "react";
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
} from "lucide-react";
import instructorTeachingImage from "@/assets/Images/DSC_0214-r.jpg";
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const Calendar = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedLeague, setSelectedLeague] = useState("all");
  const [selectedEventType, setSelectedEventType] = useState("all");

  // Sample event data
  const events = [
    {
      date: "2024-10-15",
      event: "AOA Southern League Event 1",
      location: "Aldershot Training Area",
      type: "Competition",
      category: "Southern League",
      league: "South",
      raceSignUp: "https://racesignup.co.uk/event123",
      documents: "Event Info PDF",
    },
    {
      date: "2024-10-22",
      event: "Basic Orienteering Skills Course",
      location: "Longmoor Camp, Surrey",
      type: "Training",
      category: "Skills Course",
      league: "South",
      raceSignUp: "https://racesignup.co.uk/event125",
      documents: "Course Details PDF",
    },
    {
      date: "2024-11-05",
      event: "AOA Championships",
      location: "Catterick Training Area",
      type: "Championship",
      category: "National Championship",
      league: "North",
      raceSignUp: "https://racesignup.co.uk/event124",
      documents: "Championship Info PDF",
    },
    {
      date: "2024-11-12",
      event: "Inter-Services Competition",
      location: "Brecon Beacons",
      type: "Competition",
      category: "Inter-Services",
      league: "Central",
      raceSignUp: "https://racesignup.co.uk/event126",
      documents: "Selection Criteria PDF",
    },
    {
      date: "2024-11-19",
      event: "Intermediate Orienteering Skills",
      location: "Longmoor Camp, Surrey",
      type: "Training",
      category: "Skills Course",
      league: "South",
      raceSignUp: "https://racesignup.co.uk/event127",
      documents: "Course Syllabus PDF",
    },
    {
      date: "2024-12-01",
      event: "Scottish League Event 1",
      location: "Glenmore Forest",
      type: "Competition",
      category: "Scottish League",
      league: "Scotland",
      raceSignUp: "https://racesignup.co.uk/event128",
      documents: "Event Info PDF",
    },
    {
      date: "2024-12-10",
      event: "NI Championships",
      location: "Belfast Hills",
      type: "Championship",
      category: "Regional Championship",
      league: "NI",
      raceSignUp: "https://racesignup.co.uk/event129",
      documents: "Championship Info PDF",
    },
  ];

  const localizer = momentLocalizer(moment);

  const calendarEvents = events.map((event) => ({
    title: event.event,
    start: new Date(event.date),
    end: new Date(event.date),
    resource: event,
  }));

  const eventDates = new Set(events.map(event => event.date));

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
    { key: "raceSignUp", header: "Registration" },
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

        {/* MUI Calendar Component */}
        <Card className="mt-8 shadow-card-custom">
          <CardHeader>
            <CardTitle className="text-primary">Calendar View</CardTitle>
            <CardDescription>
              Browse events visually by date using the calendar below.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <BigCalendar
              localizer={localizer}
              events={calendarEvents}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 500 }}
              dayPropGetter={(date) => {
                const dateStr = date.toISOString().split('T')[0];
                if (eventDates.has(dateStr)) {
                  return { style: { backgroundColor: '#e0f7fa', border: '1px solid #00bcd4' } };
                }
                return {};
              }}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Calendar;
