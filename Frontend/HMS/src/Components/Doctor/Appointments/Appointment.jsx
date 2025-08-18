import React, { useState, useEffect } from "react";
import { FilterMatchMode } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import Edit from "../../../assets/icons/edit2.png";
import Delete from "../../../assets/icons/delete.png";
import { ConfirmDialog } from "primereact/confirmdialog";
import { Dialog } from "primereact/dialog";
import { FiCalendar, FiClock, FiMonitor } from "react-icons/fi";
import { MdDescription } from "react-icons/md";
import {
  FaCalendarDay,
  FaClock,
  FaHistory,
  FaList,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaHospital,
} from "react-icons/fa";
import "../../../App.css";
import {
  cancelAppointment,
  getAllAppointmentsOfDoctor,
} from "../../../services/operations/appointmentAPI";
import Loader from "../../Loader";

const DoctorAppointments = () => {
  const user = useSelector((state) => state.user.user);
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [selectedAppointments, setSelectedAppointments] = useState([]);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [viewMode, setViewMode] = useState("all");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // ✅ Fetch Appointments & format data
  useEffect(() => {
    const fetchAppointmentsOfDoctor = async () => {
      setLoading(true);
      try {
        const allAppointments = await getAllAppointmentsOfDoctor(
          user.profileId
        );
        console.log("Fetched Appointments:", allAppointments);

        const formattedAppointments = allAppointments.map((appt) => {
          const dateObj = new Date(appt.appointmentTime);
          return {
            ...appt,
            date: dateObj.toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            }),
            time: dateObj.toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
            }),
            hospital: appt.hospital || "—",
          };
        });

        setAppointments(formattedAppointments);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointmentsOfDoctor();
  }, [user.profileId]);

  // ✅ Filtering logic
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
              return dateB - dateA; // latest past first
            } else {
              return dateA - dateB; // earliest upcoming first
            }
          });

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    patientName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    date: { value: null, matchMode: FilterMatchMode.DATE_IS },
    reason: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    status: { value: null, matchMode: FilterMatchMode.EQUALS },
    mode: { value: null, matchMode: FilterMatchMode.EQUALS },
  });

  const modes = ["IN_PERSON", "ONLINE", "PHONE"];
  const statuses = ["SCHEDULED", "COMPLETED", "CANCELLED"];

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
      <div className="">
        <img
          src={Delete}
          alt="delete"
          className="w-5 h-5 cursor-pointer hover:opacity-80"
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(rowData);
          }}
        />
      </div>
    );
  };

  const handleDelete = (rowData) => {
    if (rowData.status === "CANCELLED") {
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

      const allAppointments = await getAllAppointmentsOfDoctor(user.profileId);
      const formattedAppointments = allAppointments.map((appt) => {
        const dateObj = new Date(appt.appointmentTime);
        return {
          ...appt,
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

      setAppointments(formattedAppointments);
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
      <Dialog
        visible={modalVisible}
        style={{ width: "40vw" }}
        modal
        onHide={() => setModalVisible(false)}
      >
        {selectedAppointment ? (
          <div className="p-6 rounded-2xl shadow-lg bg-gradient-to-br from-white to-gray-50 border border-gray-200 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between border-b pb-3">
              <h2 className="text-xl font-semibold text-gray-800">
                Patient Details
              </h2>
              <Tag
                value={selectedAppointment.status}
                severity={getSeverity(selectedAppointment.status)}
                rounded
              />
            </div>

            {/* Patient Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex items-center gap-3">
                <FaUser className="text-blue-500" />
                <span className="font-medium text-gray-700">
                  {selectedAppointment.patientName}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-purple-500" />
                <span className="text-gray-600">
                  {selectedAppointment.patientEmail}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <FaPhone className="text-green-500" />
                <span className="text-gray-600">
                  {selectedAppointment.patientPhone}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <label>Notes:</label>
                <span className="text-gray-700">
                  {selectedAppointment.notes}
                </span>
              </div>
            </div>

            {/* Appointment Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex items-center gap-3">
                <FiCalendar className="text-pink-500" />
                <span className="text-gray-700">
                  {selectedAppointment.date}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <FiClock className="text-indigo-500" />
                <span className="text-gray-700">
                  {selectedAppointment.time}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <FiMonitor className="text-teal-500" />
                <span className="text-gray-700">
                  {selectedAppointment.mode}
                </span>
              </div>
            </div>

            {/* Reason */}
            <div className="flex items-start gap-3">
              <MdDescription className="text-red-500 mt-1" />
              <p className="text-gray-600 leading-relaxed">
                {selectedAppointment.reason}
              </p>
            </div>
          </div>
        ) : (
          <div className="p-6 rounded-xl shadow-md text-center text-gray-500 bg-white">
            No details available.
          </div>
        )}
      </Dialog>
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
              the appointment with patient {selectedRow.patientName}?
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

      {/* Filter Toolbar */}
      <div className="flex flex-wrap justify-center gap-6 mb-10 sticky-btn">
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

      {/* Appointment Table */}
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
            "patientName",
            "status",
            "reason",
            "mode",
            "hospital",
          ]}
          emptyMessage="No appointments found."
          onRowClick={(e) => {
            setSelectedAppointment(e.data);
            setModalVisible(true);
          }}
        >
          <Column field="patientName" header="Patient" sortable />
          <Column field="date" header="Date" sortable />
          <Column field="time" header="Time" />
          <Column field="reason" header="Reason" />
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
    </>
  );
};

export default DoctorAppointments;
