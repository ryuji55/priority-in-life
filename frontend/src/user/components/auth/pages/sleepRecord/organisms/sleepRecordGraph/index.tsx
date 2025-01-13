import { FC } from "react";
import { useGetSleepRecordsQuery } from "../../../../../../../store/api/sleepRecord";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export const SleepRecordGraph: FC = () => {
  const { data: sleepRecords, isLoading } = useGetSleepRecordsQuery();

  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="h-96">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={sleepRecords}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickFormatter={(value) => new Date(value).toLocaleDateString()}
          />
          <YAxis domain={[0, 12]} />
          <Tooltip
            labelFormatter={(value) => new Date(value).toLocaleDateString()}
          />
          <Line
            type="monotone"
            dataKey="hours"
            stroke="#8884d8"
            name="睡眠時間"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
