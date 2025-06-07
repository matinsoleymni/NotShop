import { create } from 'zustand';
import { getHistory } from '../services/api/history';
import type { HistoryItem } from '../types/HistoryItem';
import type { HistoryStore } from '../types/HistoryStore';

export const useHistoryStore = create<HistoryStore>((set, get) => ({
    history: [],
    displayedHistory: [],
    itemsToDisplay: 10,
    loading: true,
    error: null,

    fetchHistory: async () => {
        const { history } = get();
        if (history.length > 0) {
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
