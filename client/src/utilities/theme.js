const pallete = {
    dark: {
        light: "#000000",
        dark: "#FFFFFF",
        primary: "#FFC0CB",
        grey: "#808080",
    },
    light: {
        light: "#FFFFFF",
        dark: "#000000",
        primary: "#800080",
        grey: "#808080",
    },
};

export default function useTheme(mode = "light") {
    const colors = pallete[mode];

    return Color.applyColor({
        primary: colors.primary,
        background: colors.light,
        light: colors.light,
        text: {
            light: colors.grey,
            dark: colors.dark,
        },
        pages: {
            login: {
                card: {
                    background: colors.light,
                    shadow: colors.dark,
                },
                input: {
                    border: colors.grey,
                },
            },
        },
    });
}

class Color extends String {
    opacity(alpha) {
        const r = parseInt(this.slice(1, 3), 16);
        const g = parseInt(this.slice(3, 5), 16);
        const b = parseInt(this.slice(5, 7), 16);

        return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    }

    static applyColor(theme) {
        if (typeof theme === "string") return new Color(theme);

        for (const key in theme) theme[key] = Color.applyColor(theme[key]);

        return theme;
    }
}
