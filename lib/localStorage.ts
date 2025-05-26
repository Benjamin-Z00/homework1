// Types
export interface ProcrastinationEntry {
  id: string;
  thought: string;
  severity: number;
  responses: string[];
  timestamp: number;
}

// LocalStorage keys
const STORAGE_KEY = 'reject-procrastination-history';

// Save a new entry to localStorage
export const saveEntry = (entry: Omit<ProcrastinationEntry, 'id' | 'timestamp'>) => {
  const id = crypto.randomUUID();
  const timestamp = Date.now();
  
  const newEntry: ProcrastinationEntry = {
    ...entry,
    id,
    timestamp
  };
  
  try {
    // Get existing entries
    const existingEntries = getEntries();
    
    // Add new entry at the beginning
    const updatedEntries = [newEntry, ...existingEntries];
    
    // Only keep the latest 10 entries
    const trimmedEntries = updatedEntries.slice(0, 10);
    
    // Save to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmedEntries));
    
    return newEntry;
  } catch (error) {
    console.error('Error saving to localStorage:', error);
    return newEntry;
  }
};

// Get all entries from localStorage
export const getEntries = (): ProcrastinationEntry[] => {
  try {
    const entriesJson = localStorage.getItem(STORAGE_KEY);
    return entriesJson ? JSON.parse(entriesJson) : [];
  } catch (error) {
    console.error('Error retrieving from localStorage:', error);
    return [];
  }
};

// Clear all entries from localStorage
export const clearEntries = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
};