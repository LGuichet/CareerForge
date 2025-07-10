import { TimelineElement } from "../../types/timelineType";
import { TimelineLayout } from "../ui/timeline-layout";

export function ExperienceDataVue() {
  const experience: TimelineElement[] = [
    {
      id: 2,
      dateStart: '2025-06',
      dateEnd: '2025-07',
      title: 'exp2',
      description: 'je suis une exp de lv2',
      color: 'destructive',
    },
    {
      id: 1,
      dateStart: '2025-07',
      dateEnd: '2025-08',
      title: 'exp1',
      description: 'je suis une exp de lv1',
      color: 'primary',
    }];

  return (
    <TimelineLayout items={experience} size="md" />
  )
}