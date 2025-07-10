// features/experiences/ExperiencesTab.tsx
'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import { createExperience, Experience, fetchExperiences, RawExperience, updateExperience } from './api';
import { ExperienceForm } from './ExperienceForm';
import { ExperienceTimeline } from './ExperienceTimeline';

// A type for the period selection state
type Period = { start: Date; end: Date | null };

// Helper to parse dates from raw API data. This is crucial for consistency.
const parseExperiences = (rawExperiences: RawExperience[]): Experience[] => {
    return rawExperiences.map(exp => ({
        ...exp,
        startDate: new Date(exp.startDate),
        endDate: new Date(exp.endDate),
    })).sort((a, b) => a.startDate.getTime() - b.startDate.getTime()); // Ensure sorted
};

export function ExperiencesTab() {
  const queryClient = useQueryClient();

  // State for UI interaction
  const [selectedPeriod, setSelectedPeriod] = useState<Period | null>(null);
  const [selectedExperienceId, setSelectedExperienceId] = useState<string | null>(null);

  // Define a default career start date (e.g., 10 years ago)
  // useMemo ensures this value is stable across re-renders
  const careerStartDate = useMemo(() => {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 10);
    return date;
  }, []);

  // 1. Fetching data with TanStack Query
  const { data: rawExperiences, isLoading, isError } = useQuery({
    queryKey: ['experiences'],
    queryFn: fetchExperiences,
  });

  // Memoize the parsed experiences to prevent re-parsing on every render
  const experiences = useMemo(() => {
    return rawExperiences ? parseExperiences(rawExperiences) : [];
  }, [rawExperiences]);
  
  // Effect to set the initial selected period once data is loaded
  useEffect(() => {
    if (isLoading) return; // Wait until data is loaded
    
    // Find the end date of the latest experience
    const lastExperienceEndDate = experiences.length > 0
      ? experiences[experiences.length - 1].endDate
      : careerStartDate;

    const today = new Date();
    // Default to the most recent missing period
    const initialPeriod: Period = {
        start: lastExperienceEndDate,
        end: today,
    };
    
    setSelectedPeriod(initialPeriod);
    setSelectedExperienceId(null);
    
  }, [experiences, isLoading, careerStartDate]); // Reruns if experiences data changes

  // 2. Mutations for CUD operations
  const createMutation = useMutation({
    mutationFn: createExperience,
    onSuccess: () => {
      // Invalidate the query to refetch data and update the UI
      queryClient.invalidateQueries({ queryKey: ['experiences'] });
      // You could also show a success toast here
    },
    onError: (error) => {
      console.error("Failed to create experience:", error);
       // You could show an error toast here
    }
  });

  const updateMutation = useMutation({
    mutationFn: updateExperience,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['experiences'] });
    },
    onError: (error) => {
      console.error("Failed to update experience:", error);
    }
  });

  // 3. Handlers to be passed down to child components
  const handleSelectPeriod = (period: Period, experienceId?: string) => {
    setSelectedPeriod(period);
    setSelectedExperienceId(experienceId || null);
  };

  const handleSubmitExperience = (data: Experience) => {
    if (selectedExperienceId) {
      // Update existing experience
      updateMutation.mutate({ ...data, id: selectedExperienceId });
    } else {
      // Create new experience
      createMutation.mutate(data);
    }
  };
  
  // 4. Derived state for the form
  // Find the full experience object based on the selected ID
  const selectedExperience = useMemo(() => {
    if (!selectedExperienceId) return undefined;
    return experiences.find(exp => exp.id === selectedExperienceId);
  }, [selectedExperienceId, experiences]);
  
  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  // Render loading and error states
  if (isLoading) {
    return (
        <div className="p-6 space-y-6">
            loading...
        </div>
    );
  }

  if (isError) {
    return <div className="p-6 text-red-500">Error loading experiences. Please try again later.</div>;
  }
  
  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">
      <div className="space-y-2 mb-8">
        <h2 className="text-2xl font-bold tracking-tight">Work Experience</h2>
        <p className="text-muted-foreground">
          Fill in your career timeline. Click on grey areas to fill gaps or green areas to edit.
        </p>
      </div>

      <ExperienceTimeline
        experiences={experiences}
        careerStartDate={careerStartDate}
        selectedPeriod={selectedPeriod}
        onSelectPeriod={handleSelectPeriod}
      />
      
      <ExperienceForm
        // A changing key forces React to re-mount the component, resetting its internal state.
        // This is a powerful pattern for resetting forms.
        key={selectedExperienceId || selectedPeriod?.start.toISOString()}
        period={selectedPeriod}
        selectedExperience={selectedExperience}
        onSubmit={handleSubmitExperience}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}   