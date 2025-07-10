// features/experiences/ExperienceForm.tsx
'use client';
import { Experience } from "./api";

type Period = { start: Date; end: Date | null };

interface ExperienceFormProps {
  period: Period | null;
  selectedExperience?: Experience;
  onSubmit: (data: Experience) => void;
  isSubmitting: boolean;
}

export function ExperienceForm({ selectedExperience, period, isSubmitting }: ExperienceFormProps) {
  const mode = selectedExperience ? 'Editing' : 'Creating New';
  return (
    <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-900 mt-6">
      <h3 className="font-semibold mb-2">Experience Form (Placeholder)</h3>
      <div className="p-4 bg-gray-200 dark:bg-gray-800 rounded">
        <p>Mode: <span className="font-bold">{mode}</span></p>
        <p>Period Start: <span className="font-mono">{period?.start.toLocaleDateString()}</span></p>
        <p>Period End: <span className="font-mono">{period?.end?.toLocaleDateString() ?? 'Today'}</span></p>
        {selectedExperience && <p>Editing: <span className="font-mono">{selectedExperience.jobTitle}</span></p>}
        <button disabled={isSubmitting} className="mt-4 p-2 bg-blue-500 text-white rounded">
          {isSubmitting ? 'Saving...' : 'Submit (Placeholder)'}
        </button>
      </div>
    </div>
  );
}