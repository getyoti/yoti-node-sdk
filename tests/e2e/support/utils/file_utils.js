const dateStamp = () => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}_${month}_${year}`;
};

export const getJsonFilePath = () => {
    return `./report/test_results_${dateStamp()}.json`;
};

export const getHtmlReportFilePath = () => {
    return `./report/test_report_${dateStamp()}.html`;
};
