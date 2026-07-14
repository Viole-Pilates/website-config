import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { u as useServerFn, l as listBookings, a as updateBookingStatus } from "./bookings.functions-D4g99aoH.js";
import "@tanstack/react-router";
import "../server.js";
import "node:async_hooks";
import "h3-v2";
import "@tanstack/router-core";
import "seroval";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core/ssr/server";
import "@tanstack/react-router/ssr/server";
import "zod";
function AdminPage() {
  const fetchBookings = useServerFn(listBookings);
  const setStatus = useServerFn(updateBookingStatus);
  const [adminKey, setAdminKey] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  async function loadBookings(key) {
    setLoading(true);
    setError("");
    try {
      const result = await fetchBookings({
        data: {
          adminKey: key
        }
      });
      setBookings(result);
      setUnlocked(true);
    } catch {
      setError("Incorrect admin key.");
      setUnlocked(false);
    } finally {
      setLoading(false);
    }
  }
  async function handleStatusChange(id, status) {
    await setStatus({
      data: {
        adminKey,
        id,
        status
      }
    });
    setBookings((current) => current.map((booking) => booking.id === id ? {
      ...booking,
      status
    } : booking));
  }
  if (!unlocked) {
    return /* @__PURE__ */ jsxs("div", { className: "mx-auto flex min-h-screen max-w-sm flex-col justify-center px-5", children: [
      /* @__PURE__ */ jsx("h1", { className: "mb-6 text-2xl font-bold text-stone-900", children: "Admin Access" }),
      /* @__PURE__ */ jsxs("form", { onSubmit: (event) => {
        event.preventDefault();
        loadBookings(adminKey);
      }, className: "flex flex-col gap-4", children: [
        /* @__PURE__ */ jsx("input", { type: "password", placeholder: "Admin key", value: adminKey, onChange: (event) => setAdminKey(event.target.value), className: "rounded-lg border border-stone-300 px-3 py-2 focus:border-emerald-700 focus:outline-none focus:ring-1 focus:ring-emerald-700" }),
        error && /* @__PURE__ */ jsx("p", { className: "text-sm text-red-600", children: error }),
        /* @__PURE__ */ jsx("button", { type: "submit", disabled: loading, className: "rounded-full bg-emerald-800 px-6 py-2 text-sm font-semibold text-stone-50 hover:bg-emerald-900 disabled:opacity-60", children: loading ? "Checking..." : "Enter" })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-5xl px-5 py-16", children: [
    /* @__PURE__ */ jsx("h1", { className: "mb-8 text-3xl font-bold text-stone-900", children: "Booking Requests" }),
    bookings.length === 0 && /* @__PURE__ */ jsx("p", { className: "text-stone-500", children: "No booking requests yet." }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-4", children: bookings.map((booking) => /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-stone-200 bg-white p-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-start justify-between gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-lg font-semibold text-stone-900", children: [
            booking.name,
            " ",
            /* @__PURE__ */ jsxs("span", { className: "font-normal text-stone-500", children: [
              "(",
              booking.email,
              booking.phone ? `, ${booking.phone}` : "",
              ")"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "mt-1 text-sm text-stone-600", children: [
            booking.service,
            " — ",
            booking.preferredDate,
            " at",
            " ",
            booking.preferredTime
          ] }),
          booking.message && /* @__PURE__ */ jsxs("p", { className: "mt-2 text-sm text-stone-500", children: [
            '"',
            booking.message,
            '"'
          ] })
        ] }),
        /* @__PURE__ */ jsx("span", { className: `rounded-full px-3 py-1 text-xs font-semibold capitalize ${booking.status === "accepted" ? "bg-emerald-100 text-emerald-800" : booking.status === "declined" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-800"}`, children: booking.status })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4 flex gap-3", children: [
        /* @__PURE__ */ jsx("button", { onClick: () => handleStatusChange(booking.id, "accepted"), disabled: booking.status === "accepted", className: "rounded-full bg-emerald-800 px-4 py-1.5 text-sm font-semibold text-stone-50 hover:bg-emerald-900 disabled:opacity-40", children: "Accept" }),
        /* @__PURE__ */ jsx("button", { onClick: () => handleStatusChange(booking.id, "declined"), disabled: booking.status === "declined", className: "rounded-full border border-stone-300 px-4 py-1.5 text-sm font-semibold text-stone-700 hover:border-stone-400 disabled:opacity-40", children: "Decline" })
      ] })
    ] }, booking.id)) })
  ] });
}
export {
  AdminPage as component
};
