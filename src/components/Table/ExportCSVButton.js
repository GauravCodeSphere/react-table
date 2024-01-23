import { buttonStyles } from "../../utils/material";

export const ExportCSVButton = ({ data, filename }) => {
  const exportToCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," +
      Object.keys(data[0]).join(",") + "\n" +
      data.map(item => Object.values(item).map(value => `"${value}"`).join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button onClick={exportToCSV} className={buttonStyles} style={{ background: "#0ea5e9", color: "white" }}>Export to CSV</button>
  );
};










