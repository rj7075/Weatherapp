import ReactECharts from "echarts-for-react";
import dayjs from "dayjs";

const Chart = ({ title, data, labels, series }) => {
  if (!data && !series)
    return (
      <p className="text-center text-gray-500 py-10">
        No data available
      </p>
    );

  const option = {
    backgroundColor: "transparent",

    title: {
      text: title,
      left: "left",
      textStyle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#1f2937",
      },
    },

    tooltip: {
      trigger: "axis",
      backgroundColor: "#111827",
      borderWidth: 0,
      textStyle: { color: "#fff" },
      padding: 10,
      formatter: (params) => {
        return params
          .map(
            (p) =>
              `<strong>${p.seriesName}</strong>: ${p.value}`
          )
          .join("<br/>");
      },
    },

    legend: series
      ? {
          top: 30,
          textStyle: { color: "#374151" },
        }
      : undefined,

    grid: {
      left: "3%",
      right: "3%",
      bottom: "10%",
      top: series ? "20%" : "15%",
      containLabel: true,
    },

    xAxis: {
      type: "category",
      data: labels.map((t) => dayjs(t).format("HH:mm")),
      boundaryGap: false,
      axisLine: { lineStyle: { color: "#9ca3af" } },
      axisLabel: {
        color: "#6b7280",
        fontSize: 12,
      },
    },

    yAxis: {
      type: "value",
      axisLine: { show: false },
      splitLine: {
        lineStyle: {
          color: "#e5e7eb",
          type: "dashed",
        },
      },
      axisLabel: {
        color: "#6b7280",
      },
    },

    dataZoom: [
      {
        type: "inside",
      },
      {
        type: "slider",
        height: 20,
        bottom: 0,
      },
    ],

    series: series
      ? series.map((s) => ({
          ...s,
          smooth: true,
          symbol: "circle",
          symbolSize: 6,
          lineStyle: { width: 3 },
        }))
      : [
          {
            name: title,
            data: data,
            type: "line",
            smooth: true,
            symbol: "circle",
            symbolSize: 6,

            lineStyle: {
              width: 3,
              color: "#3b82f6",
            },

            areaStyle: {
              opacity: 0.15,
            },
          },
        ],
  };

  return (
    <div className="w-full h-[260px] sm:h-[300px] md:h-[350px]">
      <ReactECharts
        option={option}
        notMerge={true}
        lazyUpdate={true}
        style={{ height: "100%", width: "100%" }}
      />
    </div>
  );
};

export default Chart;