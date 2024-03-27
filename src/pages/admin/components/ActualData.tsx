import { useEffect, useState } from "react";
import ManagementTable, { RowData } from "../../../components/common/ManagementTable/ManagementTable";
import BarChart from "./BarChart";

const ActualData = () => {
    const [data, setData] = useState<RowData[]>([]);
    const [currentItem, setCurrentItem] = useState<RowData | null>(null);
    const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);
    const [chartWidth, setChartWidth] = useState<number>(500);
    const [chartHeight, setChartHeight] = useState<number>(500);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/data/actual-data.json")
                const jsonData = await response.json();
                setData(jsonData);
                setCurrentItem(jsonData[0]);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        }
        fetchData();
    }, [])

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 1024);
            if (window.innerWidth < 900) {
                setChartWidth(600);
                setChartHeight(550);
            } else {
                setChartWidth(700);
                setChartHeight(500);
            }
        };

        handleResize();

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div style={{ display: "flex", width: "calc(100%-10px)", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "10px", marginLeft: "60px" }}>
            {currentItem && (
                <div id="here" style={{ display: "flex", flexDirection: isSmallScreen ? "column" : "row" }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <BarChart data={Object.entries(currentItem.Rev).map(([name, quantity]) => ({
                            name,
                            quantity
                        }))}
                            xKey="name" yKey="quantity" height={chartHeight} width={chartWidth} color="orange"
                        />
                        <span style={{ fontStyle: "italic", fontWeight: "bold" }}>{currentItem.Property}: Rev BarChart</span>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <BarChart data={Object.entries(currentItem.RV).map(([name, quantity]) => ({
                            name,
                            quantity
                        }))}
                            xKey="name" yKey="quantity" height={chartHeight} width={chartWidth} color="blue"
                        />
                        <span style={{ fontStyle: "italic", fontWeight: "bold" }}>{currentItem.Property}: RV BarChart</span>
                    </div>
                </div>
            )}
            <div style={{ marginTop: "30px",display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "15px", width: "70vw" }}>
                <ManagementTable data={data} setData={setData} currentItem={currentItem as RowData} setCurrentItem={setCurrentItem} />
            </div>
        </div>
    );
}

export default ActualData;
