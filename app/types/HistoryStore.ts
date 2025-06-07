import type { HistoryItem } from "./HistoryItem";

export interface HistoryStore {
    history: HistoryItem[];
    displayedHistory: HistoryItem[];
    itemsToDisplay: number;
    loading: boolean;
    error: string | null;
    fetchHistory: () => Promise<void>;
    loadMoreHistory: () => void;
}
