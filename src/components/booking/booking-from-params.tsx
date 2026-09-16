"use client";

import { useSearchParams } from "next/navigation";
import { BookingWizard, type BookingWizardProps } from "./booking-wizard";

/** Pre-selects the course / branch from `?course=` and `?branch=` links. */
export function BookingFromParams(props: BookingWizardProps) {
  const params = useSearchParams();
  const course = params.get("course");
  const branch = params.get("branch");

  return <BookingWizard key={`${course}-${branch}`} {...props} initialCourse={course} initialBranch={branch} />;
}
