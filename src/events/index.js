import { createEvent } from "react-event-hook";

export const { useSuccesfulRegListener, emitSuccesfulReg } = createEvent("SuccesfulReg")();