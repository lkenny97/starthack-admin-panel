"use client";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    Tooltip,
    PointElement,
    LineElement,
} from "chart.js";
import styles from './LineChart.module.scss'
import {Line} from "react-chartjs-2";

// Register ChartJS components using ChartJS.register
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip
);

const LineChart = ({graphData}: {graphData: { x: any[], y: any[] }}) => {
  console.log("asdasd", graphData)
    if (graphData.x.length === 0 || graphData.y.length === 0)
      return null

    return (
        <div className={styles.chart}>
            <Line
                data={{
                    labels: graphData.x,
                    datasets: [
                        {
                            data: graphData.y,
                            backgroundColor: "black",
                        },
                    ],
                }}
            />
        </div>
    );
};
export default LineChart;