// features/experiences/ExperienceTimeline.tsx
'use client';
import { Experience } from "./api";

type Period = { start: Date; end: Date | null };

interface ExperienceTimelineProps {
  experiences: Experience[];
  careerStartDate: Date;
  selectedPeriod: Period | null;
  onSelectPeriod: (period: Period, experienceId?: string) => void;
}

export function ExperienceTimeline({ selectedPeriod }: ExperienceTimelineProps) {
  return (
    <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-900">
      <h3 className="font-semibold mb-2">Experience Timeline (Placeholder)</h3>
      <div className="h-12 bg-gray-200 dark:bg-gray-800 rounded flex items-center justify-center">
        <p className="text-sm text-gray-500">
          Selected: {selectedPeriod ? `${selectedPeriod.start.toLocaleDateString()} - ${selectedPeriod.end?.toLocaleDateString() ?? 'Today'}` : 'None'}
        </p>
      </div>
    </div>
  );
}