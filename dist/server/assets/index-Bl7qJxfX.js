import { jsx, jsxs } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { u as useServerFn, c as createBooking } from "./bookings.functions-D4g99aoH.js";
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
function Header() {
  return /* @__PURE__ */ jsx("header", { className: "sticky top-0 z-40 border-b border-stone-200/70 bg-stone-50/90 backdrop-blur", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto flex max-w-6xl items-center justify-between px-5 py-4", children: [
    /* @__PURE__ */ jsxs(Link, { to: "/", className: "text-lg font-semibold tracking-tight", children: [
      "Alex Rivera ",
      /* @__PURE__ */ jsx("span", { className: "text-emerald-700", children: "Coaching" })
    ] }),
    /* @__PURE__ */ jsxs("nav", { className: "hidden items-center gap-8 text-sm font-medium text-stone-600 sm:flex", children: [
      /* @__PURE__ */ jsx("a", { href: "#journey", className: "hover:text-stone-900", children: "My Journey" }),
      /* @__PURE__ */ jsx("a", { href: "#services", className: "hover:text-stone-900", children: "Services" }),
      /* @__PURE__ */ jsx("a", { href: "#booking", className: "hover:text-stone-900", children: "Book a Session" })
    ] }),
    /* @__PURE__ */ jsx(
      "a",
      {
        href: "#booking",
        className: "rounded-full bg-emerald-800 px-5 py-2 text-sm font-semibold text-stone-50 transition hover:bg-emerald-900",
        children: "Book Now"
      }
    )
  ] }) });
}
const SERVICES$1 = [
  { value: "pilates", label: "Pilates" },
  { value: "bodyweight-training", label: "Bodyweight Training" },
  { value: "mobility", label: "Mobility" }
];
function BookingForm() {
  const submitBooking = useServerFn(createBooking);
  const [status, setStatus] = useState(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");
  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("pending");
    setErrorMessage("");
    const form = new FormData(event.currentTarget);
    try {
      await submitBooking({
        data: {
          name: String(form.get("name") ?? ""),
          email: String(form.get("email") ?? ""),
          phone: String(form.get("phone") ?? "") || void 0,
          service: form.get("service"),
          preferredDate: String(form.get("preferredDate") ?? ""),
          preferredTime: String(form.get("preferredTime") ?? ""),
          message: String(form.get("message") ?? "") || void 0
        }
      });
      setStatus("success");
      event.currentTarget.reset();
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong."
      );
    }
  }
  if (status === "success") {
    return /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold text-emerald-900", children: "Request received!" }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 text-emerald-800", children: "Thanks for reaching out — I'll review your preferred time and confirm by email shortly." }),
      /* @__PURE__ */ jsx(
        "button",
        {
          className: "mt-6 text-sm font-medium text-emerald-700 underline underline-offset-4",
          onClick: () => setStatus("idle"),
          children: "Submit another request"
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsxs(
    "form",
    {
      onSubmit: handleSubmit,
      className: "grid grid-cols-1 gap-5 rounded-2xl border border-stone-200 bg-white p-8 shadow-sm sm:grid-cols-2",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1.5 sm:col-span-1", children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "name", className: "text-sm font-medium text-stone-700", children: "Name" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              id: "name",
              name: "name",
              required: true,
              maxLength: 120,
              className: "rounded-lg border border-stone-300 px-3 py-2 focus:border-emerald-700 focus:outline-none focus:ring-1 focus:ring-emerald-700"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1.5 sm:col-span-1", children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "email", className: "text-sm font-medium text-stone-700", children: "Email" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              id: "email",
              name: "email",
              type: "email",
              required: true,
              className: "rounded-lg border border-stone-300 px-3 py-2 focus:border-emerald-700 focus:outline-none focus:ring-1 focus:ring-emerald-700"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1.5 sm:col-span-1", children: [
          /* @__PURE__ */ jsxs("label", { htmlFor: "phone", className: "text-sm font-medium text-stone-700", children: [
            "Phone ",
            /* @__PURE__ */ jsx("span", { className: "text-stone-400", children: "(optional)" })
          ] }),
          /* @__PURE__ */ jsx(
            "input",
            {
              id: "phone",
              name: "phone",
              maxLength: 40,
              className: "rounded-lg border border-stone-300 px-3 py-2 focus:border-emerald-700 focus:outline-none focus:ring-1 focus:ring-emerald-700"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1.5 sm:col-span-1", children: [
          /* @__PURE__ */ jsx(
            "label",
            {
              htmlFor: "service",
              className: "text-sm font-medium text-stone-700",
              children: "Service"
            }
          ),
          /* @__PURE__ */ jsx(
            "select",
            {
              id: "service",
              name: "service",
              required: true,
              defaultValue: "pilates",
              className: "rounded-lg border border-stone-300 px-3 py-2 focus:border-emerald-700 focus:outline-none focus:ring-1 focus:ring-emerald-700",
              children: SERVICES$1.map((service) => /* @__PURE__ */ jsx("option", { value: service.value, children: service.label }, service.value))
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1.5 sm:col-span-1", children: [
          /* @__PURE__ */ jsx(
            "label",
            {
              htmlFor: "preferredDate",
              className: "text-sm font-medium text-stone-700",
              children: "Preferred date"
            }
          ),
          /* @__PURE__ */ jsx(
            "input",
            {
              id: "preferredDate",
              name: "preferredDate",
              type: "date",
              required: true,
              className: "rounded-lg border border-stone-300 px-3 py-2 focus:border-emerald-700 focus:outline-none focus:ring-1 focus:ring-emerald-700"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1.5 sm:col-span-1", children: [
          /* @__PURE__ */ jsx(
            "label",
            {
              htmlFor: "preferredTime",
              className: "text-sm font-medium text-stone-700",
              children: "Preferred time"
            }
          ),
          /* @__PURE__ */ jsx(
            "input",
            {
              id: "preferredTime",
              name: "preferredTime",
              type: "time",
              required: true,
              className: "rounded-lg border border-stone-300 px-3 py-2 focus:border-emerald-700 focus:outline-none focus:ring-1 focus:ring-emerald-700"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1.5 sm:col-span-2", children: [
          /* @__PURE__ */ jsxs(
            "label",
            {
              htmlFor: "message",
              className: "text-sm font-medium text-stone-700",
              children: [
                "Anything I should know? ",
                /* @__PURE__ */ jsx("span", { className: "text-stone-400", children: "(optional)" })
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              id: "message",
              name: "message",
              rows: 3,
              maxLength: 1e3,
              placeholder: "Injuries, goals, experience level...",
              className: "rounded-lg border border-stone-300 px-3 py-2 focus:border-emerald-700 focus:outline-none focus:ring-1 focus:ring-emerald-700"
            }
          )
        ] }),
        status === "error" && /* @__PURE__ */ jsx("p", { className: "sm:col-span-2 text-sm text-red-600", children: errorMessage }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            disabled: status === "pending",
            className: "sm:col-span-2 mt-2 rounded-full bg-emerald-800 px-6 py-3 text-sm font-semibold text-stone-50 transition hover:bg-emerald-900 disabled:opacity-60",
            children: status === "pending" ? "Sending request..." : "Request a session"
          }
        )
      ]
    }
  );
}
const SERVICES = [{
  name: "Pilates",
  description: "Mat and equipment-based sessions building core strength, control, and posture — suited to every level."
}, {
  name: "Bodyweight Training",
  description: "Strength and conditioning using your own body as the tool. No gym required, big results."
}, {
  name: "Mobility",
  description: "Targeted work to restore range of motion, ease stiffness, and move without pain or restriction."
}];
function Home() {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen", children: [
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsx("section", { className: "mx-auto max-w-6xl px-5 pb-20 pt-16 sm:pt-24", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 items-center gap-12 md:grid-cols-2", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "mb-4 text-sm font-semibold uppercase tracking-widest text-emerald-700", children: "Personal Coaching" }),
        /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold leading-tight text-stone-900 sm:text-5xl", children: "Move stronger. Move freer. Move for life." }),
        /* @__PURE__ */ jsx("p", { className: "mt-6 text-lg leading-relaxed text-stone-600", children: "I'm Alex — a Pilates, bodyweight training, and mobility coach helping people rebuild strength and confidence in their bodies, one session at a time." }),
        /* @__PURE__ */ jsxs("div", { className: "mt-8 flex flex-wrap gap-4", children: [
          /* @__PURE__ */ jsx("a", { href: "#booking", className: "rounded-full bg-emerald-800 px-7 py-3 text-sm font-semibold text-stone-50 transition hover:bg-emerald-900", children: "Book a Session" }),
          /* @__PURE__ */ jsx("a", { href: "#journey", className: "rounded-full border border-stone-300 px-7 py-3 text-sm font-semibold text-stone-700 transition hover:border-stone-400", children: "Read My Story" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "aspect-square w-full overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-100 via-stone-100 to-amber-100 shadow-inner" })
    ] }) }),
    /* @__PURE__ */ jsx("section", { id: "journey", className: "border-y border-stone-200 bg-white", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-4xl px-5 py-20", children: [
      /* @__PURE__ */ jsx("p", { className: "mb-3 text-sm font-semibold uppercase tracking-widest text-emerald-700", children: "My Journey" }),
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-stone-900", children: "From rebuilding my own body to helping others do the same" }),
      /* @__PURE__ */ jsxs("div", { className: "mt-6 space-y-5 text-lg leading-relaxed text-stone-600", children: [
        /* @__PURE__ */ jsx("p", { children: "A few years ago, chronic tightness and a string of nagging injuries pushed me to look for something more sustainable than high-impact workouts. Pilates gave me control over my body for the first time. Bodyweight training gave me strength I could carry anywhere. Mobility work gave me freedom of movement I hadn't felt in years." }),
        /* @__PURE__ */ jsx("p", { children: "That transformation is what led me to become a certified coach. Now I help clients of all backgrounds and fitness levels build the same foundation: a stronger core, better movement patterns, and a body that feels good to live in." }),
        /* @__PURE__ */ jsx("p", { children: "Whether you're recovering from injury, starting from zero, or looking to move better as you age, I'll meet you where you are and build a plan around your goals." })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("section", { id: "services", className: "mx-auto max-w-6xl px-5 py-20", children: [
      /* @__PURE__ */ jsx("p", { className: "mb-3 text-sm font-semibold uppercase tracking-widest text-emerald-700", children: "Services" }),
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-stone-900", children: "Coaching built around how you want to move" }),
      /* @__PURE__ */ jsx("div", { className: "mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3", children: SERVICES.map((service) => /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-stone-200 bg-white p-7", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold text-stone-900", children: service.name }),
        /* @__PURE__ */ jsx("p", { className: "mt-3 leading-relaxed text-stone-600", children: service.description })
      ] }, service.name)) })
    ] }),
    /* @__PURE__ */ jsx("section", { id: "booking", className: "border-t border-stone-200 bg-stone-100/60", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-3xl px-5 py-20", children: [
      /* @__PURE__ */ jsx("p", { className: "mb-3 text-center text-sm font-semibold uppercase tracking-widest text-emerald-700", children: "Book a Session" }),
      /* @__PURE__ */ jsx("h2", { className: "text-center text-3xl font-bold text-stone-900", children: "Ready to get started?" }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-center text-lg text-stone-600", children: "Send over a few details and I'll follow up to confirm your session." }),
      /* @__PURE__ */ jsx("div", { className: "mt-10", children: /* @__PURE__ */ jsx(BookingForm, {}) })
    ] }) }),
    /* @__PURE__ */ jsxs("footer", { className: "border-t border-stone-200 py-10 text-center text-sm text-stone-500", children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      " Alex Rivera Coaching. All rights reserved."
    ] })
  ] });
}
export {
  Home as component
};
