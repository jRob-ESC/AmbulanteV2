import { MD3LightTheme, MD3DarkTheme } from "react-native-paper";

const nunitoFamiliesByWeight: Record<string, string> = {
    "400": "Nunito_400Regular",
    "500": "Nunito_500Medium",
    "700": "Nunito_700Bold",
    "800": "Nunito_800ExtraBold",
};

const withNunitoFonts = (fonts: typeof MD3LightTheme.fonts): typeof MD3LightTheme.fonts => {
    return Object.fromEntries(
        Object.entries(fonts).map(([variant, font]) => {
            const fontWeight = String(font.fontWeight ?? "400");
            const fontFamily = nunitoFamiliesByWeight[fontWeight] ?? nunitoFamiliesByWeight["400"];
            return [variant, { ...font, fontFamily }];
        })
    ) as typeof MD3LightTheme.fonts;
};

    // Extends MD3 types
    declare global {
    namespace ReactNativePaper {
        interface ThemeColors {
            textPrimary: string;
            textSecondary: string;
            border: string;
        }
    }
}

export const lightTheme = {
    ...MD3LightTheme,
    fonts: withNunitoFonts(MD3LightTheme.fonts),
    colors: {
        ...MD3LightTheme.colors,

        primary: "#E1251B", // Main actions
        onPrimary: "#FFFFFF", // Color to use against primary color
        secondary: "#6B7280", // Secondary actions
        error: "#F05545", // Destructive actions like deletion
            
        background: "#F2F2F2", // General background
        surface: "#FFFFFF", // For cards, modals, etc.

        surfaceDisabled: "#D1D5DB", // Disabled components
        onSurfaceDisabled: "#9CA3AF",

        border: "#E5E7EB", // For separators
        textPrimary: "#111827", // Main text
        textSecondary: "#6B7280", // Secondary text

        outline: "#E5E7EB", // Tab bar upper border
        onSurfaceVariant: "#6B7280" // Inactive icons color

    }
};

export const darkTheme = {
    // TODO: Define colors for dark theme
};