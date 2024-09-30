//테마 상태를 확인하는 atom

import { atom } from "recoil";

export const isDark = atom({
    key: "isDark",
    default: false
})