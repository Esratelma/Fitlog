
'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

const FitLogContext = createContext(null);
const STORAGE_KEY = 'fitlog-state-v1';

export function FitLogProvider({ children }) {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [hydrated, setHydrated] = useState(false);
  const [toast, setToast] = useState(null);

  // Load the saved plan and workouts from localStorage.
  useEffect(() => {
    try {
      const storedData = localStorage.getItem(STORAGE_KEY);

      if (storedData) {
        const parsedData = JSON.parse(storedData);

        setPlan(parsedData.plan || []);
        setSaved(parsedData.saved || []);
      }
    } catch (error) {
      console.error('Failed to load FitLog data:', error);
    }

    setHydrated(true);
  }, []);

  // Save changes after the initial data has loaded.
  useEffect(() => {
    if (!hydrated) {
      return;
    }

    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ plan, saved })
      );
    } catch (error) {
      console.error('Failed to save FitLog data:', error);
    }
  }, [plan, saved, hydrated]);

  // Display a notification message.
  const notify = useCallback((message, type = 'success') => {
    const notificationId = Date.now();

    setToast({
      message,
      type,
      id: notificationId,
    });

    setTimeout(() => {
      setToast((currentToast) =>
        currentToast?.id === notificationId ? null : currentToast
      );
    }, 2600);
  }, []);

  // Add a workout to today's plan.
  const addToPlan = useCallback(
    (workout) => {
      if (plan.some((item) => item.id === workout.id)) {
        notify("Already in today's plan", 'info');
        return false;
      }

      if (plan.length >= 5) {
        notify("Today's plan is full — maximum 5 lifts", 'error');
        return false;
      }

      setPlan((currentPlan) => [
        ...currentPlan,
        { ...workout, done: false },
      ]);

      notify("Added to today's plan");
      return true;
    },
    [plan, notify]
  );

  // Remove a workout from today's plan.
  const removeFromPlan = useCallback(
    (id) => {
      setPlan((currentPlan) =>
        currentPlan.filter((workout) => workout.id !== id)
      );

      notify("Removed from today's plan", 'info');
    },
    [notify]
  );

  // Toggle a workout's completion status.
  const markDone = useCallback(
    (id) => {
      setPlan((currentPlan) =>
        currentPlan.map((workout) =>
          workout.id === id
            ? { ...workout, done: !workout.done }
            : workout
        )
      );

      notify('Workout marked as done');
    },
    [notify]
  );

  // Save a workout for later.
  const saveWorkout = useCallback(
    (workout) => {
      if (saved.some((item) => item.id === workout.id)) {
        notify('Already saved', 'info');
        return;
      }

      setSaved((currentSaved) => [...currentSaved, workout]);
      notify('Saved for later');
    },
    [saved, notify]
  );

  // Remove a workout from the saved list.
  const removeSaved = useCallback(
    (id) => {
      setSaved((currentSaved) =>
        currentSaved.filter((workout) => workout.id !== id)
      );

      notify('Removed from saved', 'info');
    },
    [notify]
  );

  // Share state and actions with the rest of the application.
  const value = useMemo(
    () => ({
      plan,
      saved,
      addToPlan,
      removeFromPlan,
      markDone,
      saveWorkout,
      removeSaved,
      toast,
      hydrated,
    }),
    [
      plan,
      saved,
      addToPlan,
      removeFromPlan,
      markDone,
      saveWorkout,
      removeSaved,
      toast,
      hydrated,
    ]
  );

  return (
    <FitLogContext.Provider value={value}>
      {children}
    </FitLogContext.Provider>
  );
}

// Access FitLog state and actions from components.
export function useFitLog() {
  return useContext(FitLogContext);
}