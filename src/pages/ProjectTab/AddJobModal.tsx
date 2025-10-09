import { RxCross1 } from "react-icons/rx";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { useState, useEffect } from "react";
import {
  pushValuetoArrayInDoc,
  updateDocument,
} from "../../Firebase/CloudFirestore/UpdateData";
import { getDocumentData } from "../../Firebase/CloudFirestore/GetData";
import {
  addDocument,
  updateDocument as updateEventDoc,
} from "../../Firebase/CloudFirestore/SetData";
import { deleteDocument as deleteEventDoc } from "../../Firebase/CloudFirestore/DeleteData";
import { Timestamp } from "firebase/firestore";
import { toast } from "react-toastify";

export const AddJobModal = ({
  isOpen,
  onClose,
  projectId,
  onAdded,
  job,
  jobIndex,
}: any) => {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [league, setLeague] = useState("");
  const [raceSignUp, setRaceSignUp] = useState("");
  const [documents, setDocuments] = useState("");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [project, setProject] = useState<any>(null);

  // validation errors
  const [errors, setErrors] = useState({
    title: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    if (projectId) {
      getDocumentData("projects", projectId)
        .then(setProject)
        .catch(console.error);
    }
    if (job) {
      setTitle(job.jobTitle || job.title || "");
      const sd = job.startDate
        ? job.startDate.toDate
          ? job.startDate.toDate()
          : new Date(job.startDate)
        : null;
      const ed = job.endDate
        ? job.endDate.toDate
          ? job.endDate.toDate()
          : new Date(job.endDate)
        : null;
      setStartDate(sd);
      setEndDate(ed);
      setLocation(job.location || "");
      setType(job.type || "");
      setCategory(job.category || "");
      setLeague(job.league || "");
      setRaceSignUp(job.raceSignUp || "");
      setDocuments(job.documents || "");
    } else {
      setTitle("");
      setStartDate(null);
      setEndDate(null);
      setLocation(project?.name || "");
      setType("Project");
      setCategory(project?.name || "");
      setLeague("");
      setRaceSignUp("");
      setDocuments("");
    }
    setErrors({ title: "", startDate: "", endDate: "" });
  }, [job, projectId, project]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = { title: "", startDate: "", endDate: "" };
    let valid = true;

    if (!title.trim()) {
      newErrors.title = "Job title is required.";
        valid = false;
    }
    if (!startDate) {
      newErrors.startDate = "Start date is required.";
      valid = false;
    }
    if (!endDate) {
      newErrors.endDate = "End date is required.";
      valid = false;
    } else if (startDate && endDate < startDate) {
      newErrors.endDate = "End date cannot be before start date.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSave = async () => {
    if (!projectId) return;
    if (!validate()) return;

    try {
      setSaving(true);
      const payload: any = {
        jobTitle: title.trim(),
        startDate: Timestamp.fromDate(startDate!),
        endDate: Timestamp.fromDate(endDate!),
        location: location.trim(),
        type: type.trim(),
        category: category.trim(),
        league: league.trim(),
        raceSignUp: raceSignUp.trim(),
        documents: documents.trim(),
        updatedAt: Timestamp.now(),
      };

      const eventData = {
        date: startDate!.toISOString().split("T")[0],
        event: title.trim(),
        location: location.trim() || project?.name || "",
        type: type.trim() || "Project",
        category: category.trim() || project?.name || "",
        league: league.trim(),
        raceSignUp: raceSignUp.trim(),
        documents: documents.trim(),
      };

      if (job && typeof jobIndex === "number") {
        // edit mode
        const project: any = await getDocumentData("projects", projectId);
        const calendar = Array.isArray(project?.calendar)
          ? [...project.calendar]
          : [];
        const original = calendar[jobIndex] || {};
        const newEntry = { ...original, ...payload };
        calendar[jobIndex] = newEntry;
        await updateDocument("projects", projectId, { calendar });

        if (job.eventId) {
          await updateEventDoc("events", job.eventId, eventData);
        } else {
          const eventId = await addDocument("events", eventData);
          // update the calendar item with eventId
          const projectData = await getDocumentData("projects", projectId);
          const updatedCalendar = Array.isArray(projectData?.calendar)
            ? [...projectData.calendar]
            : [];
          if (updatedCalendar[jobIndex]) {
            updatedCalendar[jobIndex].eventId = eventId;
            await updateDocument("projects", projectId, {
              calendar: updatedCalendar,
            });
            newEntry.eventId = eventId;
          }
        }

        toast.success("Job updated successfully", {
          position: "top-right",
        });
        if (typeof onAdded === "function") onAdded(newEntry);
      } else {
        // create mode
        const eventId = await addDocument("events", eventData);
        const payloadWithCreated = {
          ...payload,
          eventId,
          createdAt: Timestamp.now(),
        };
        await pushValuetoArrayInDoc(
          "projects",
          projectId,
          "calendar",
          payloadWithCreated
        );
        toast.success("Job added successfully", { position: "top-right" });
        if (typeof onAdded === "function") onAdded(payloadWithCreated);
      }

      setTitle("");
      setStartDate(null);
      setEndDate(null);
      setLocation("");
      setType("");
      setCategory("");
      setLeague("");
      setRaceSignUp("");
      setDocuments("");
      onClose();
    } catch (err) {
      console.error("Failed to add/edit job", err);
      setErrors((prev) => ({
        ...prev,
        title: "Failed to save job. Please try again.",
      }));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!projectId || !job) return;
    try {
      setDeleting(true);
      const project: any = await getDocumentData("projects", projectId);
      const calendar = Array.isArray(project?.calendar)
        ? [...project.calendar]
        : [];
      if (typeof jobIndex === "number") {
        calendar.splice(jobIndex, 1);
      } else {
        const idx = calendar.findIndex(
          (c: any) =>
            c.jobTitle === job.jobTitle &&
            String(c.startDate) === String(job.startDate)
        );
        if (idx > -1) calendar.splice(idx, 1);
      }
      await updateDocument("projects", projectId, { calendar });
      if (job.eventId) {
        await deleteEventDoc("events", job.eventId);
      }
      if (typeof onAdded === "function") onAdded(null);
      onClose();
    } catch (err) {
      console.error("Failed to delete job", err);
      setErrors((prev) => ({
        ...prev,
        title: "Failed to delete job. Please try again.",
      }));
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 modal flex items-center justify-center z-99 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto p-4">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-2 rounded-t-lg">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">
              {job ? "Edit Job" : "Add Job"}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <RxCross1 size={20} />
            </button>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
          className="space-y-5 mt-4 px-2"
        >
          {/* Job Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Job Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              className={`mt-1 block w-full border ${
                errors.title ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500`}
              placeholder="Enter job title"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Start Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <Flatpickr
                value={startDate || undefined}
                options={{
                  dateFormat: "m-d-Y",
                  allowInput: true,
                  disableMobile: true,
                }}
                onChange={([date]) => {
                  setStartDate(date || null);
                  // reset end date if it's before the new start date
                  if (endDate && date && endDate < date) setEndDate(null);
                }}
                className={`w-full px-3 py-2 border cursor-pointer rounded-md focus:outline-none focus:ring-2 ${
                  errors.startDate
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
                placeholder="Select start date..."
              />
              {errors.startDate && (
                <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>
              )}
            </div>

            {/* End Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <Flatpickr
                value={endDate || undefined}
                options={{
                  dateFormat: "m-d-Y",
                  allowInput: true,
                  disableMobile: true,
                  minDate: startDate || undefined,
                }}
                disabled={!startDate}
                onChange={([date]) => setEndDate(date || null)}
                className={`w-full px-3 py-2 border cursor-pointer rounded-md focus:outline-none focus:ring-2 ${
                  errors.endDate
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-blue-500"
                } ${!startDate ? "bg-gray-100 cursor-not-allowed" : ""}`}
                placeholder={
                  startDate ? "Select end date..." : "Select start date first"
                }
              />
              {errors.endDate && (
                <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>
              )}
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter location"
            />
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select type</option>
              <option value="Competition">Competition</option>
              <option value="Training">Training</option>
              <option value="Championship">Championship</option>
              <option value="Project">Project</option>
            </select>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter category"
            />
          </div>

          {/* League */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              League
            </label>
            <select
              value={league}
              onChange={(e) => setLeague(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select league</option>
              <option value="Central">Central</option>
              <option value="NI">NI</option>
              <option value="North">North</option>
              <option value="Scotland">Scotland</option>
              <option value="South">South</option>
            </select>
          </div>

          {/* Race Sign Up */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Race Sign Up
            </label>
            <input
              value={raceSignUp}
              onChange={(e) => setRaceSignUp(e.target.value)}
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter race sign up link"
            />
          </div>

          {/* Documents */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Documents
            </label>
            <input
              value={documents}
              onChange={(e) => setDocuments(e.target.value)}
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter documents link"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
            >
              Cancel
            </button>
            {job && (
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="px-4 py-2 rounded bg-red-500 text-white disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            )}
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 rounded bg-primary-500 text-white disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Job"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
