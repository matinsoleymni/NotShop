import { create } from 'zustand';
import { getHistory } from '../services/api/history';

interface HistoryItem {
    timestamp: number;
    id: number;
    total: number;
    currency: string;
}

interface HistoryStore {
    history: HistoryItem[];
    displayedHistory: HistoryItem[];
    itemsToDisplay: number;
    loading: boolean;
    error: string | null;
    fetchHistory: () => Promise<void>;
    loadMoreHistory: () => void;
}

export const useHistoryStore = create<HistoryStore>((set, get) => ({
    history: [],
    displayedHistory: [],
    itemsToDisplay: 10,
    loading: true,
    error: null,

    fetchHistory: async () => {
        const { history, loading } = get();
        if (history.length > 0 || loading) {
            return;
        }

        try {
            const data = await getHistory();
            const sortedData = data.sort((a: HistoryItem, b: HistoryItem) => b.timestamp - a.timestamp);
            set({
                history: sortedData,
                displayedHistory: sortedData.slice(0, get().itemsToDisplay),
                loading: false,
                error: null
            });
        } catch (error: any) {
            console.error('Error fetching history:', error);
            set({ error: 'Failed to fetch history', loading: false });
        }
    },

    loadMoreHistory: () => {
        set(state => {
            const nextItemsToDisplay = state.itemsToDisplay + 10;
            return {
                itemsToDisplay: nextItemsToDisplay,
                displayedHistory: state.history.slice(0, nextItemsToDisplay)
            };
        });
    },
}));
