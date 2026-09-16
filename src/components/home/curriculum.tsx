import { SectionHeading } from "@/components/ui/section-heading";
import { courses } from "@/data/courses";
import { modules } from "@/data/curriculum";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { href } from "@/lib/utils";
import { CurriculumTabs, type CurriculumItem } from "./curriculum-tabs";

export function Curriculum({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const items: CurriculumItem[] = modules.map((module) => ({
    id: module.id,
    title: module.title[locale],
    summary: module.summary[locale],
    points: module.points[locale],
    courses: courses
      .filter((course) => course.category !== "start" && course.modules.includes(module.id))
      .map((course) => ({ name: course.name[locale], href: href(locale, `/courses/${course.slug}`) })),
  }));

  return (
    <section className="relative overflow-hidden bg-ink-950 py-24 sm:py-32">
      <div aria-hidden className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <div className="container-x relative">
        <SectionHeading
          eyebrow={dict.curriculum.eyebrow}
          title={dict.curriculum.title}
          description={dict.curriculum.description}
        />
        <div data-reveal className="mt-14 lg:mt-20">
          <CurriculumTabs items={items} moduleLabel={dict.curriculum.moduleLabel} includedIn={dict.curriculum.includedIn} />
        </div>
      </div>
    </section>
  );
}
