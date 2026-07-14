import * as React from "react";
import { useRouter, isRedirect } from "@tanstack/react-router";
import { T as TSS_SERVER_FUNCTION, g as getServerFnById, c as createServerFn } from "../server.js";
import { z } from "zod";
function useServerFn(serverFn) {
  const router = useRouter();
  return React.useCallback(async (...args) => {
    try {
      const res = await serverFn(...args);
      if (isRedirect(res)) throw res;
      return res;
    } catch (err) {
      if (isRedirect(err)) {
        err.options._fromLocation = router.stores.location.get();
        return router.navigate(router.resolveRedirect(err).options);
      }
      throw err;
    }
  }, [router, serverFn]);
}
var createSsrRpc = (functionId) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    return (await getServerFnById(functionId))(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const BookingSchema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email(),
  phone: z.string().max(40).optional(),
  service: z.enum(["pilates", "bodyweight-training", "mobility"]),
  preferredDate: z.string().min(1),
  preferredTime: z.string().min(1),
  message: z.string().max(1e3).optional()
});
const createBooking = createServerFn({
  method: "POST"
}).inputValidator(BookingSchema).handler(createSsrRpc("d4dcf1107b01f198d2c3062f92c1306e7a8c4af80ac2593280df60d6c8f01b0e"));
const listBookings = createServerFn({
  method: "GET"
}).inputValidator((data) => data).handler(createSsrRpc("e3d4e9275e454df7b7d69f5e0fdcdec509bcf137174afd0fd8f0b64751c91b2d"));
const UpdateStatusSchema = z.object({
  adminKey: z.string(),
  id: z.number(),
  status: z.enum(["pending", "accepted", "declined"])
});
const updateBookingStatus = createServerFn({
  method: "POST"
}).inputValidator(UpdateStatusSchema).handler(createSsrRpc("3e73649da33577c3a9d616cdb8c39470d67d05d35cbfca2e0426fdca2c2574d2"));
export {
  updateBookingStatus as a,
  createBooking as c,
  listBookings as l,
  useServerFn as u
};
