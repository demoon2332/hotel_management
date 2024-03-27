import { useMemo, TouchEvent, MouseEvent, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { scaleBand, scaleLinear } from "@visx/scale";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { localPoint } from "@visx/event";
import { Group } from "@visx/group";
import { TooltipWithBounds, useTooltip, defaultStyles } from "@visx/tooltip";




const Bar = styled.rect`
  fill: #2dcf7b;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;
const tooltipStyles = {
  ...defaultStyles,
  borderRadius: 4,
  background: "black",
  color: "white",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
};

interface BarChartProps {
  data: any[];
  xKey: string;
  yKey: string;
  width: number;
  height: number;
  color: string;
}

const BarChart: React.FC<BarChartProps> = ({ data, xKey, yKey, width, height, color }) => {
  // set the dimensions and margins of the graph
  const margin = { top: 20, right: 20, bottom: 30, left: 60 };
  const svgWidth = width * 0.7 - margin.left - margin.right;
  const svgHeight = height * 0.6 - margin.top - margin.bottom;
  const xScale = useMemo(
    () =>
      scaleBand<string>({
        range: [0, svgWidth],
        round: true,
        domain: data.map((d) => d[xKey]),
        padding: 0.4
      }),
    [data, xKey]
  );

  const yScale = useMemo(
    () =>
      scaleLinear<number>({
        range: [svgHeight, 0],
        round: true,
        domain: [0, Math.max(...data.map((d) => d[yKey]))]
      }),
    [data, yKey]
  );

  const {
    showTooltip,
    hideTooltip,
    tooltipData,
    tooltipLeft = 0,
    tooltipTop = 0,
  } = useTooltip<any>();

  return (
    <Container>
      <svg
        width={svgWidth + margin.left + margin.right}
        height={svgHeight + margin.top + margin.bottom}
      >
        <Group transform={`translate(${margin.left},${margin.top})`}>
          <AxisBottom
            scale={xScale}
            top={svgHeight}
            stroke={"#222"}
            tickStroke={"#222"}
            tickLabelProps={(d) => ({
              fill: "#222",
              fontSize: 11,
              textAnchor: "end",
              // angle: -25
            })}
          />
          <AxisLeft
            scale={yScale}
            stroke="#222"
            tickStroke="#222"
            tickLabelProps={() => ({
              fill: "#222",
              fontSize: 11,
              textAnchor: "end",
              dy: "0.33em"
            })}
          />
          <Group>
            {data.map((d) => {
              const x = xScale(d[xKey]);
              const y = yScale(d[yKey]);
              const width = xScale.bandwidth();
              const height = svgHeight - y;
              return (
                // <Bar key={d[xKey]} x={x} y={y} width={width} height={height} />
                <Bar
                  key={`bar-${d[xKey]}`}
                  x={x}
                  y={y}
                  width={width}
                  height={height}
                  fill={color}
                  onMouseMove={(
                    event:
                      | TouchEvent<SVGRectElement>
                      | MouseEvent<SVGRectElement>
                  ) => {
                    const point = localPoint(event);

                    if (!point) return;

                    showTooltip({
                      tooltipData: d,
                      tooltipTop: point.y,
                      tooltipLeft: point.x,
                    });
                  }}
                  onMouseLeave={() => hideTooltip()}
                />
              );
            })}
          </Group>
        </Group>
      </svg>
      {tooltipData ? (
        <TooltipWithBounds
          key={Math.random()}
          top={tooltipTop}
          left={tooltipLeft}
        style={tooltipStyles}
        >
          <b>{tooltipData[xKey]}</b>
          : ${tooltipData[yKey]}
        </TooltipWithBounds>
      ) : null}
    </Container>
  );
};

export default BarChart;
