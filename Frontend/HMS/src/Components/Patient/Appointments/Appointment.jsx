import React, { useState, useEffect, useRef } from "react";
import { FilterMatchMode } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { useForm } from "react-hook-form";
import { getAllDoctors } from "../../../services/operations/doctorProfileAPI";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Edit from "../../../assets/icons/edit2.png";
import Delete from "../../../assets/icons/delete.png";
import { ConfirmDialog } from "primereact/confirmdialog";
import {
  FaTimes,
  FaCalendarDay,
  FaClock,
  FaHistory,
  FaList,
} from "react-icons/fa";
import "../../../App.css";
import {
  cancelAppointment,
  getAllAppointments,
  scheduleAppointment,
} from "../../../services/operations/appointmentAPI";
import Loader from "../../Loader";

const Appointment = () => {
  const user = useSelector((state) => state.user.user);
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [selectedAppointments, setSelectedAppointments] = useState([]);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [buttonRect, setButtonRect] = useState(null);
  const buttonRef = useRef();
  const [selectedRow, setSelectedRow] = useState(null);
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [viewMode, setViewMode] = useState("all");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      // Fetch in parallel
      const [allAppointments, allDoctors] = await Promise.all([
        getAllAppointments(user.profileId),
        getAllDoctors(),
      ]);

      // Create a lookup for doctors by ID
      const doctorMap = allDoctors.reduce((map, doc) => {
        map[doc.id] = doc;
        return map;
      }, {});

      // Map appointments with specialization & hospital
      const mappedAppointments = allAppointments.map((appt) => {
        const dateObj = new Date(appt.appointmentTime);
        const doctorInfo = doctorMap[appt.doctorId] || {};

        return {
          ...appt,
          specialization: doctorInfo.specialization || "—",
          hospital: doctorInfo.hospital || "—",
          date: dateObj.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
          time: dateObj.toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
      });

      setAppointments(mappedAppointments);
      setDoctors(allDoctors);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching appointments/doctors:", error);
      setLoading(false);
    }
    setLoading(false);
  };
  // Fetch Appointments & format data
  useEffect(() => {
    const fetchAppointmentsAndDoctors = async () => {
      setLoading(true);
      try {
        // Fetch in parallel
        const [allAppointments, allDoctors] = await Promise.all([
          getAllAppointments(user.profileId),
          getAllDoctors(),
        ]);

        // Create a lookup for doctors by ID
        const doctorMap = allDoctors.reduce((map, doc) => {
          map[doc.id] = doc;
          return map;
        }, {});

        // Map appointments with specialization & hospital
        const mappedAppointments = allAppointments.map((appt) => {
          const dateObj = new Date(appt.appointmentTime);
          const doctorInfo = doctorMap[appt.doctorId] || {};

          return {
            ...appt,
            specialization: doctorInfo.specialization || "—",
            hospital: doctorInfo.hospital || "—",
            date: dateObj.toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            }),
            time: dateObj.toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
            }),
          };
        });

        setAppointments(mappedAppointments);
        setDoctors(allDoctors);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching appointments/doctors:", error);
        setLoading(false);
      }
      setLoading(false);
    };

    fetchAppointmentsAndDoctors();
  }, [user.profileId]);

  // const filteredAppointments = appointments.filter((appt) => {
  //   const today = new Date();
  //   const apptDate = new Date(appt.appointmentTime);

  //   if (viewMode === "today") {
  //     return apptDate.toDateString() === today.toDateString();
  //   }
  //   if (viewMode === "upcoming") {
  //     return apptDate > today;
  //   }
  //   if (viewMode === "past") {
  //     return apptDate < today;
  //   }
  //   return true;
  // });

  const filteredAppointments =
    viewMode === "all"
      ? appointments
      : appointments
          .filter((appt) => {
            const today = new Date();
            const apptDate = new Date(appt.appointmentTime);

            if (viewMode === "today") {
              return apptDate.toDateString() === today.toDateString();
            }
            if (viewMode === "upcoming") {
              return apptDate > today;
            }
            if (viewMode === "past") {
              return apptDate < today;
            }
            return true;
          })
          .sort((a, b) => {
            const dateA = new Date(a.appointmentTime);
            const dateB = new Date(b.appointmentTime);

            if (viewMode === "past") {
              // latest past first
              return dateB - dateA;
            } else {
              // today, upcoming → earliest first
              return dateA - dateB;
            }
          });

  const submitProfileForm = async (data) => {
    setLoading(true);
    const appointmentTime = `${data.date}T${data.time}:00`;

    const payload = {
      patientId: user.profileId,
      doctorId: Number(data.doctorId),
      appointmentTime,
      status: "SCHEDULED",
      mode: data.mode,
      reason: data.reason,
      notes: data.notes || "",
    };

    try {
      await scheduleAppointment(payload);
      setIsOpen(false);
      toast.success("Appointment Scheduled");
      fetchAppointments();
      reset();
    } catch (error) {
      toast.error("Failed to schedule appointment");
    } finally {
      setLoading(false);
    }
  };

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    doctorName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    specialization: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    date: { value: null, matchMode: FilterMatchMode.DATE_IS },
    status: { value: null, matchMode: FilterMatchMode.EQUALS },
    mode: { value: null, matchMode: FilterMatchMode.EQUALS },
  });

  const modes = ["IN_PERSON", "ONLINE", "PHONE"];
  const statuses = ["SCHEDULED", "COMPLETED", "CANCELLED"];

  const handleOpen = () => {
    const rect = buttonRef.current.getBoundingClientRect();
    setButtonRect(rect);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const getSeverity = (status) => {
    switch (status) {
      case "SCHEDULED":
        return "info";
      case "COMPLETED":
        return "success";
      case "CANCELLED":
        return "danger";
      default:
        return null;
    }
  };

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters["global"].value = value;
    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const renderHeader = () => (
    <div className="flex flex-wrap justify-between items-center mb-4">
      <h2 className="text-xl font-semibold text-blue-700">
        📅 My Appointments
      </h2>
      <IconField iconPosition="left">
        <InputIcon className="pi pi-search" />
        <InputText
          value={globalFilterValue}
          onChange={onGlobalFilterChange}
          placeholder="Search appointments"
          className="p-inputtext-sm"
        />
      </IconField>
    </div>
  );

  const statusBodyTemplate = (rowData) => (
    <Tag
      value={rowData.status}
      severity={getSeverity(rowData.status)}
      rounded
    />
  );

  const dropdownFilterTemplate = (options, items) => (
    <Dropdown
      value={options.value}
      options={items}
      onChange={(e) => options.filterCallback(e.value, options.index)}
      placeholder="Select"
      className="p-column-filter w-full"
      showClear
    />
  );

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex gap-8">
        <img
          src={Edit}
          alt="edit"
          className="w-5 h-5 cursor-pointer hover:opacity-80"
          onClick={() => handleEdit(rowData)}
        />

        <img
          src={Delete}
          alt="edit"
          className="w-5 h-5 cursor-pointer hover:opacity-80"
          onClick={() => handleDelete(rowData)}
        />
      </div>
    );
  };

  const handleDelete = (rowData) => {
    if (rowData.status == "CANCELLED") {
      toast.error("Appointment already cancelled");
    } else {
      setSelectedRow(rowData);
      setDeleteDialogVisible(true);
    }
  };

  const confirmDelete = async () => {
    setLoading(true);
    try {
      await cancelAppointment(selectedRow.id);

      const [allAppointments, allDoctors] = await Promise.all([
        getAllAppointments(user.profileId),
        getAllDoctors(),
      ]);

      // Create a lookup for doctors by ID
      const doctorMap = allDoctors.reduce((map, doc) => {
        map[doc.id] = doc;
        return map;
      }, {});

      // Map appointments with specialization & hospital
      const mappedAppointments = allAppointments.map((appt) => {
        const dateObj = new Date(appt.appointmentTime);
        const doctorInfo = doctorMap[appt.doctorId] || {};

        return {
          ...appt,
          specialization: doctorInfo.specialization || "—",
          hospital: doctorInfo.hospital || "—",
          date: dateObj.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
          time: dateObj.toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
      });

      setAppointments(mappedAppointments);
      setDoctors(allDoctors);

      toast.success("Appointment Cancelled Successfully!");
    } catch (error) {
      toast.error("Failed to cancel appointment");
    } finally {
      setLoading(false);
      setDeleteDialogVisible(false);
      setSelectedRow(null);
    }
  };

  const cancelDelete = () => {
    setDeleteDialogVisible(false);
    setSelectedRow(null);
  };

  const handleEdit = (appointment) => {
    console.log("Edit clicked:", appointment);
  };

  const header = renderHeader();

  if (isLoading) {
    return (
      <div className="text-center py-10">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <ConfirmDialog
        visible={deleteDialogVisible}
        onHide={() => setDeleteDialogVisible(false)}
        message={
          selectedRow && (
            <>
              Are you sure you want to{" "}
              <span className="text-red-300 text-lg font-extrabold">
                Cancel
              </span>{" "}
              the appointment with Dr. {selectedRow.doctorName}?
            </>
          )
        }
        header="Delete Confirmation"
        icon="pi pi-exclamation-triangle"
        footer={
          <div className="flex justify-end gap-4 mt-4">
            <Button
              label="Cancel"
              className="p-button-secondary bg-caribbeangreen-50 text-white p-2"
              onClick={cancelDelete}
            />
            <Button
              label="Confirm"
              className="p-button-danger bg-red-300 p-2 text-richblack-25"
              onClick={confirmDelete}
            />
          </div>
        }
      />
      {/* Appointment Table */}
      <div className="flex flex-wrap justify-between gap-6 mb-10 sticky-btn">
        {/* Schedule Button */}
        <button
          ref={buttonRef}
          onClick={handleOpen}
          className="bg-red-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-red-600 transition"
        >
          Schedule Appointment
        </button>

        {/* Filter Toolbar */}
        <div className="flex gap-3 bg-white shadow-md rounded-lg px-4 py-2 border border-gray-200">
          <button
            onClick={() => setViewMode("today")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition 
              ${
                viewMode === "today"
                  ? "bg-blue-500 text-white shadow"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
          >
            <FaCalendarDay /> Today
          </button>
          <button
            onClick={() => setViewMode("upcoming")}
            className={`flex items-center gap-2  px-4 py-2 rounded-lg transition 
              ${
                viewMode === "upcoming"
                  ? "bg-richblack-300 text-white shadow"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
          >
            <FaClock /> Upcoming
          </button>
          <button
            onClick={() => setViewMode("past")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition 
              ${
                viewMode === "past"
                  ? "bg-pink-500 text-white shadow"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
          >
            <FaHistory /> Past
          </button>
          <button
            onClick={() => setViewMode("all")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition 
              ${
                viewMode === "all"
                  ? "bg-caribbeangreen-200 text-white shadow"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
          >
            <FaList /> All
          </button>
        </div>
      </div>
      <div className="card shadow-md rounded-xl p-4 border border-gray-200 bg-white">
        <DataTable
          value={filteredAppointments}
          paginator
          header={header}
          rows={10}
          scrollable
          scrollHeight="flex"
          className="rounded-md shadow-sm"
          rowsPerPageOptions={[10, 25, 50]}
          dataKey="id"
          selectionMode="checkbox"
          selection={selectedAppointments}
          onSelectionChange={(e) => setSelectedAppointments(e.value)}
          filters={filters}
          filterDisplay="menu"
          globalFilterFields={[
            "doctorName",
            "specialization",
            "status",
            "mode",
            "hospital",
          ]}
          emptyMessage="No appointments found."
        >
          <Column field="doctorName" header="Doctor" sortable />
          <Column field="specialization" header="Specialization" sortable />
          <Column field="date" header="Date" sortable />
          <Column field="time" header="Time" />
          <Column
            field="status"
            header="Status"
            sortable
            body={statusBodyTemplate}
            filterElement={(options) =>
              dropdownFilterTemplate(options, statuses)
            }
          />
          <Column
            field="mode"
            header="Mode"
            sortable
            filterElement={(options) => dropdownFilterTemplate(options, modes)}
          />
          <Column
            header="Actions"
            body={actionBodyTemplate}
            style={{ width: "8rem" }}
          />
        </DataTable>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && buttonRect && (
          <>
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
            />
            <motion.div
              className="bg-white rounded-xl shadow-2xl fixed z-50 overflow-hidden"
              initial={{
                top: buttonRect.top,
                left: buttonRect.left,
                width: buttonRect.width,
                height: buttonRect.height,
              }}
              animate={{
                top: "50%",
                left: "50%",
                width: "40vw",
                height: "80vh",
                x: "-50%",
                y: "-50%",
                transition: { duration: 0.5, ease: "easeInOut" },
              }}
              exit={{
                top: buttonRect.top,
                left: buttonRect.left,
                width: buttonRect.width,
                height: buttonRect.height,
                x: 0,
                y: 0,
                transition: { duration: 0.4, ease: "easeInOut" },
              }}
            >
              <div className="flex flex-col h-full w-full p-6 bg-white rounded-2xl shadow-2xl">
                <div className="flex justify-between items-center border-b pb-4">
                  <h2 className="text-2xl font-bold text-red-600 tracking-wide">
                    Schedule Appointment
                  </h2>
                  <button
                    onClick={handleClose}
                    className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                  >
                    <FaTimes size={22} />
                  </button>
                </div>

                <form
                  onSubmit={handleSubmit(submitProfileForm)}
                  className="flex flex-col gap-5 mt-6 overflow-y-auto hide-scrollbar"
                >
                  <div className="flex flex-col">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Select Doctor <span className="text-red-500">*</span>
                    </label>
                    <select
                      {...register("doctorId", { required: "Select Doctor" })}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                    >
                      <option value="">-- Choose a Doctor --</option>
                      {doctors.map((doc) => (
                        <option key={doc.id} value={doc.id}>
                          {doc.name} — {doc.specialization}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-row justify-between">
                    <div className="flex flex-col w-[250px]">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        {...register("date", { required: "Select Date" })}
                        className="w-full p-3 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div className="flex flex-col w-[250px]">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Time <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="time"
                        {...register("time", { required: "Select Time" })}
                        className="w-full p-3 border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-medium text-gray-700 mb-1">
                      Appointment Mode
                    </label>
                    <select
                      {...register("mode", { required: "Select Mode" })}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                    >
                      <option value="">-- Choose Appointment Mode --</option>
                      <option value="IN_PERSON">In Person</option>
                      <option value="ONLINE">Online</option>
                      <option value="PHONE">Phone</option>
                    </select>
                  </div>

                  <div className="flex flex-col">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Reason for Visit <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows="3"
                      {...register("reason", {
                        required: "Please add reason for appointment",
                      })}
                      placeholder="Briefly describe your symptoms..."
                      className="w-full p-3 border border-gray-300 rounded-lg resize-none"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-gray-700 mb-1">
                      Additional Notes
                    </label>
                    <textarea
                      rows="2"
                      {...register("notes")}
                      placeholder="Any extra information..."
                      className="w-full p-3 border border-gray-300 rounded-lg resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="mt-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 
                 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition-all duration-300"
                  >
                    Book Appointment
                  </button>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Appointment;
