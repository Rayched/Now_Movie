interface I_Themes {
    textColor: string;
    bgColor: string;
    itemColor: string;
    acc_textColor: string;
    acc_itemColor: string;
};

export const LightTheme: I_Themes = {
    textColor: "black",
    bgColor: "white",
    itemColor: "#ffcccc",
    acc_textColor: "",
    acc_itemColor: ""
};

export const DarkTheme: I_Themes= {
    textColor: "white",
    bgColor: "#130f40",
    itemColor: "#273c75",
    acc_textColor: "",
    acc_itemColor: ""
};