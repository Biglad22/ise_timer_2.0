import { useCallback } from 'react';
const isBrowser = typeof window !== 'undefined';

/**
 * A small wrapper around the `window.localStorage` API.
 * The hook does not keep any state, it just exposes helpers.
**/

function useLocalStorage() {
    
    const get = useCallback(
        <T extends any> (key: string): T | null => {
            
            if (!isBrowser) return null;
            try {
                const raw = window.localStorage.getItem(key);            
                if (!raw) return null;
                return JSON.parse(raw) as T;
            } catch {
                return null;
            }
        },
        []
    );

    const set = useCallback((key: string, value: any): void => {
            if (!isBrowser) return;
            try {
                const toStore = JSON.stringify(value);
                window.localStorage.setItem(key, toStore);
            } catch {
                // ignore write errors
            }
        },
        []
    );

    const remove = useCallback((key: string): void => {
        if (!isBrowser) return;
        window.localStorage.removeItem(key);
    }, []);

    const clear = useCallback((): void => {
        if (!isBrowser) return;
        window.localStorage.clear();
    }, []);

    return { get, set, remove, clear };
}

export default useLocalStorage;
