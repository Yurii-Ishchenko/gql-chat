import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { statsColors } from "../../utils/statsColors";
import { statsLabels } from "../../utils/statsLabels";
import { IMessageStatisticsInterface } from "../../interfaces/messageStatisticsInterface";

interface IMessageStatisticsProps {
  messageStatistics: IMessageStatisticsInterface[];
}

export default function MessageStatistics({
  messageStatistics,
}: IMessageStatisticsProps) {
  ChartJS.register(CategoryScale, LinearScale, BarElement);
  const data = {
    labels: statsLabels,
    datasets: [
      {
        data: messageStatistics?.map((stat) => stat.count),
        backgroundColor: statsColors,
      },
    ],
  };
  return <Bar data={data} />;
}
