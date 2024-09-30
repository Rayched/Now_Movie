//일일 박스오피스 api, targetDt에 전달될 값을 return하는
//getDateTime function

function ConvertDate(Data: number){
    if (Data < 10){
        return "0" + String(Data);
    } else {
        return String(Data);
    };
};

function getDateTime(){
    const DateObj = new Date();

    const Year = DateObj.getFullYear();
    const Month = ConvertDate(DateObj.getMonth() + 1);
    const date = ConvertDate(DateObj.getDate() - 1);

    const targetDt = String(Year) + Month + date;

    return targetDt;
};

export default getDateTime;