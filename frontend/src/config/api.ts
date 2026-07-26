import Constants from 'expo-constants';

const API_PORT = 8080;

function getDevMachineHost(): string | null {
    const hostUri =
        Constants.expoConfig?.hostUri ??
        Constants.expoGoConfig?.debuggerHost;

    if (!hostUri) {
        return null;
    }

    return hostUri.split(':')[0]?.trim() || null;
}

export function getApiUrl(): string {
    const expoApiUrl = (Constants.expoConfig?.extra as { apiUrl?: string } | undefined)?.apiUrl;
    const configuredUrl = expoApiUrl?.trim() || process.env.EXPO_PUBLIC_API_URL?.trim();

    if (configuredUrl) {
        return configuredUrl;
    }

    const host = getDevMachineHost();
    if (host) {
        return `http://${host}:${API_PORT}`;
    }

    return `http://localhost:${API_PORT}`;
}

export const API_URL = getApiUrl();
