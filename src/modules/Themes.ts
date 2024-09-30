interface I_Themes {
    textColor: string;
    bgColor: string;
    itemColor: string;
    accentColor: string;
};

export const LightTheme: I_Themes = {
    textColor: "black",
    bgColor: "white",
    itemColor: "#ffcccc",
    accentColor: "#ffb8b8"
};

export const DarkTheme: I_Themes= {
    textColor: "white",
    bgColor: "#2f3542",
    itemColor: "#485460",
    accentColor: "#57606f"
};