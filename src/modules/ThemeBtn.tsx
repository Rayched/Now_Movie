import { useRecoilState } from "recoil";
import { isDark } from "../atoms";
import styled from "styled-components";

const ToggleBtn = styled.button`
    width: 50px;
    height: 50px;
    border: 2px solid ${(props) => props.theme.textColor};
    border-radius: 35px;
    background-color: ${(props) => props.theme.itemColor};
    color: inherit;
    font-weight: bold;
`;

function ThemeBtn(){
    const [Mode, setMode] = useRecoilState(isDark);

    const onClick = () => setMode(!Mode);

    return (
        <div>
            <ToggleBtn onClick={onClick}>{Mode ? "Dark" : "Light"}</ToggleBtn>
        </div>
    );
};

export default ThemeBtn;