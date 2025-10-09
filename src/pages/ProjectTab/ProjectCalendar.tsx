import { useEffect, useMemo, useState } from "react";
import { AddJobModal } from "./AddJobModal";
import { MdAdd } from "react-icons/md";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Timestamp } from "firebase/firestore";
import { getDocumentData } from "../../Firebase/CloudFirestore/GetData";

const COLORS = [
  "#ef4444",
  "#f59e0b",
  "#22c55e",
  "#3b82f6",
  "#a855f7",
  "#ec4899",
  "#14b8a6",
  "#eab308",
  "#f97316",
  "#06b6d4",
  "#6366f1",
  "#EA2264",
  "#64748b",
];

const toISODate = (value: any): string => {
  if (!value) return "";
  const date = value instanceof Timestamp ? value.toDate() : new Date(value);
  if (isNaN(date.getTime())) return "";
  return date.toISOString().split("T")[0];
};

export const ProjectCalendar = ({ projectId }: { projectId?: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState<any[]>([]);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [calendarView, setCalendarView] = useState("dayGridMonth");

  // loader moved out so it can be invoked after adding a job
  const loadProjectTasks = async () => {
    if (!projectId) {
      setTasks([]);
      return;
    }
    try {
      setLoading(true);
      const project: any = await getDocumentData("projects", projectId);
      const aggregated: any[] = [];

      // Prefer project.calendar entries (each should have startDate/endDate/jobTitle)
      if (project && Array.isArray(project.calendar)) {
        project.calendar.forEach((entry: any, idx: number) => {
          aggregated.push({
            title: entry.jobTitle || entry.title || "Untitled",
            startDate: entry.startDate || entry.start || entry.date || null,
            dueDate: entry.endDate || entry.end || null,
            raw: entry,
            source: "calendar",
            calendarIndex: idx,
          });
        });
      }

      // Fallback: also include checklist tasks (existing behavior)
      if (project && Array.isArray(project.checklists)) {
        project.checklists.forEach((checklist: any) => {
          if (Array.isArray(checklist.tasks)) {
            checklist.tasks.forEach((t: any) => {
              aggregated.push({
                title: t.title || t.taskName || "Untitled",
                startDate: (t.startDate ?? t.start ?? t.date) || null,
                dueDate: (t.dueDate ?? t.end) || null,
                raw: t,
              });
            });
          }
        });
      }

      setTasks(aggregated);
    } catch (err) {
      console.error("Failed to load project tasks", err);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjectTasks();
  }, [projectId]);

  const events = useMemo(() => {
    return tasks
      .map((t: any, idx: number) => {
        const start = toISODate(t.startDate);
        const end = toISODate(t.dueDate || t.endDate);
        if (!start) return null;
        return {
          id: `task-${idx}`,
          title: t.title || "Untitled",
          start,
          end: end
            ? new Date(new Date(end).setDate(new Date(end).getDate() + 1))
                .toISOString()
                .split("T")[0]
            : undefined,
          allDay: true,
          // Choose color based on title hash so similar titles keep same color
          color:
            COLORS[
              Math.abs(
                (t.title || "")
                  .split("")
                  .reduce(
                    (acc: number, ch: string) => acc + ch.charCodeAt(0),
                    0
                  ) + idx
              ) % COLORS.length
            ],
          extendedProps: {
            raw: t.raw || t,
            source: t.source,
            calendarIndex: t.calendarIndex,
          },
        };
      })
      .filter(Boolean);
  }, [tasks]);

  return (
    <div className="p-2 sm:p-4">
      <div className="flex flex-row justify-between items-center mb-4 gap-2 ">
        <h2 className="text-xl sm:text-2xl font-semibold text-nowrap ">
          Project Calendar
        </h2>

        <button
          onClick={() => {
            setSelectedJob(null);
            setIsModalOpen(true);
          }}
          className="bg-primary-500 hover:bg-primary-400 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-1 w-auto"
          disabled={loading}
        >
          <MdAdd className="text-lg" />
          Add Job
        </button>
      </div>

      <div className="overflow-hidden ">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView={calendarView}
          events={events as any}
          eventClick={(info) => {
            try {
              const props = info.event.extendedProps as any;
              const idx = props?.calendarIndex;
              const raw = props?.raw || info.event;
              setSelectedJob({ raw, idx });
              setIsModalOpen(true);
            } catch (e) {
              console.error("Failed to open event edit modal", e);
            }
          }}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,dayGridWeek,dayGridDay",
          }}
          height="auto"
          contentHeight="auto"
          aspectRatio={window.innerWidth < 640 ? 0.8 : 1.5}
          dayMaxEvents={true}
          eventDisplay="block"
          windowResize={() => {
            try {
              const el = document.querySelector(".fc");
              const width = el
                ? (el as HTMLElement).offsetWidth
                : window.innerWidth;
              if (width < 640) setCalendarView("dayGridWeek");
              else setCalendarView("dayGridMonth");
            } catch (e) {
              if (window.innerWidth < 640) setCalendarView("dayGridWeek");
              else setCalendarView("dayGridMonth");
            }
          }}
        />
      </div>

      <AddJobModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedJob(null);
        }}
        projectId={projectId}
        onAdded={() => loadProjectTasks()}
        job={selectedJob?.raw}
        jobIndex={selectedJob?.idx}
      />
    </div>
  );
};
