/* eslint-disable react/no-unescaped-entities */

import * as d3 from 'd3';
import React, { useEffect, useRef, useState } from 'react';
import { TimelineProps, UserManagementMethodStateVersion } from '../types';

// From store userMethods[], gSeasonLength, firstGDD35

export const Timeline: React.FC<TimelineProps> = (props) => {
  // Calculates a year as January 1st through December 31st, this will the be axis display range
  const currentDate = new Date();
  const yrEndDate = new Date(currentDate.getFullYear(), 11, 31);
  const yrStartDate = new Date(currentDate.getFullYear(), 0, 1);
  const [legendOutput, setLegendOutput] = useState([
    <div key="placeholder" className="d3Legend"></div>
  ]);

  const months = [
    'january',
    'february',
    'march',
    'april',
    'may',
    'june',
    'july',
    'august',
    'september',
    'october',
    'november',
    'december'
  ] as const;

  // Create chart view box width and height variables
  const { width, height, firstGdd45, lastGdd45, margin, userMethods } = props;

  const colorGenerator = () => {
    const output = [];
    const incr = 0.8 / userMethods.length;

    for (let i = 1 / userMethods.length; i <= 1; i += incr) {
      output.push(d3.interpolateTurbo(i));
    }
    return output;
  };

  const avgSDateToMs = (dateString: string) => {
    const output = new Date();
    output.setDate(Number.parseInt(dateString.substring(3, 5)));
    const zIndexedMonth = Number.parseInt(dateString.substring(0, 2));
    output.setMonth(zIndexedMonth);
    return output.getTime();
  };

  // function to store management method text as legend descriptions
  const extractText = () =>
    userMethods.map(({ commonName, name }) => `Weed: ${commonName} - ${name}`);

  const createLegend = (colors: string[]) => {
    const legendText = extractText();

    setLegendOutput(
      legendText.map((el, ind) => (
        <div key={`legendBody${ind}`} className="legendBody">
          <div
            style={{ backgroundColor: `${colors[ind]}` }}
            className="colorCode"
          ></div>
          <div className="legendText">{el}</div>
        </div>
      ))
    );
  };

  // Bind D3 data to svg reference object,

  const d3Container = useRef(null);
  // initialize empty reference object for the d3Container -> The reference object has persistent  state, it will be assigned to SVG element manipulated by D3 in return

  // Create x-axis
  useEffect(() => {
    // INitialize x-axis scale object
    const scale = d3
      .scaleTime()
      .domain([yrStartDate, yrEndDate])
      // Rather than extending from 0 to the full width and height of the chart, the starts and ends of the ranges are moved inward by the corresponding margins.
      .range([margin.left, width - margin.right]);

    const tickFormat = d3.timeFormat('%b');

    const xAxis = d3
      .axisBottom(scale)

      .tickFormat((d) => tickFormat(d as Date));

    // Associate reference object with SVG variable to be manipulated by D3
    const svg = d3.select(d3Container.current).attr('class', 'timelineSVG');
    // Add Axis to SVG
    svg
      .append('g')
      // move the g element that will host the x axis to the bottom of the chart
      .attr('transform', `translate(0,${height - 30})`)
      .attr('class', 'timelineAxis')
      .call(xAxis);
    // Select the xAxis Text and rotate labels for readability.

    svg.append('g').attr('class', 'timelineBarContainer');

    const text = svg.selectAll('text');

    text
      .style('text-anchor', 'end')
      .attr('dx', '-.8em')
      .attr('dy', '.15em')
      .attr('transform', 'rotate(-65)')
      .append('g')
      .attr('transform', 'translate(150,275)')
      .attr('height', '25')
      .attr('width', '50');
  }, [height, margin.left, margin.right, width]);

  const rectangleMaker = (
    gSelection: d3.Selection<
      SVGGElement,
      UserManagementMethodStateVersion,
      HTMLElement,
      unknown
    >,
    GDD35Prop: number,
    xPosVal: (index: number) => number,
    ind: number
  ) => {
    return gSelection
      .append('rect')
      .attr('visibility', (d) => (d[months[ind]] ? 'visible' : 'hidden'))
      .attr('width', GDD35Prop + 0.5)
      .attr('x', xPosVal(ind))
      .attr('class', 'monthBoxes');
  };
  // Prep variable for use at end of function -> legend color key and text

  const timelineUpdater = () => {
    if (firstGdd45 && lastGdd45) {
      // Needed  to calculate the bar width for certain months which is the  proportion of the year that is within the user's GDD35 growing window
      const yr2ms = yrEndDate.getTime() - yrStartDate.getTime();
      const msBetweenGDD35 = avgSDateToMs(lastGdd45) - avgSDateToMs(firstGdd45);
      const notGDD35ms = yr2ms - msBetweenGDD35;
      // The proportion of the year in which GDD35, divided by 6 to yield the fraction of this fraction that one month spans between hypothetical May through October multiplied by the view box width minus chart margins
      const GDD35Prop =
        (msBetweenGDD35 / yr2ms / 6) * (width - margin.left - margin.right);
      // The proportion of the year in which not GDD35, divided by 6 to yield the fraction of this fraction that one month spans between hypothetical November through April multiplied by the view box width minus chart margins
      const notGDD35Prop =
        (notGDD35ms / yr2ms / 6) * (width - margin.left - margin.right);

      // Assign height and width values, border and add axis

      // Indicates which months are considered hypothetically within the GDD35 zone and which are not
      const yearlyGDDPattern = [
        notGDD35Prop,
        notGDD35Prop,
        notGDD35Prop,
        notGDD35Prop,
        GDD35Prop,
        GDD35Prop,
        GDD35Prop,
        GDD35Prop,
        GDD35Prop,
        GDD35Prop,
        notGDD35Prop,
        notGDD35Prop
      ];

      // Uses yearlyGDDPattern to determine the position of an element

      const xPosVal = (ind: number) => {
        // xPosition is the sum of the previous elements' widths plus the left margin
        const prevWidths = yearlyGDDPattern.slice(0, ind);
        return ind === 0
          ? margin.left
          : margin.left + prevWidths.reduce((prev, next) => prev + next);
      };

      const colors = colorGenerator();

      // Group chart update tasks that will be contingent upon data changes to a different useEffect that will re-render on change.
      const timelineBarContainer = d3
        .select(d3Container.current)
        .select<HTMLElement>('.timelineBarContainer');

      // Create new g elements within the SVG element,  one for each piece of data given by userMethods from store
      // Selection represents existing data and g elements
      const selection = timelineBarContainer
        .selectAll<SVGElement, UserManagementMethodStateVersion>('g')
        .data(userMethods, (d) => d.methodId);

      // Remove unnecessary boxes;
      selection.exit().remove();

      // Create new g elements along with their selection and append them to timelineBarContainer
      // gSelection represents new data
      // 12 month boxes per g element
      const gSelection = selection
        .enter()
        .append('g')
        .attr('class', 'methodBoxes')
        .attr('id', (d) => d.methodId);

      // merge existing methodBoxes to updated method boxes in order to update existing boxes and new boxes at same time
      gSelection
        .merge(timelineBarContainer.selectAll('.methodBoxes'))
        .transition()
        .attr(
          'transform',
          (_d, i) =>
            `translate(0,${
              ((height - margin.top - margin.bottom - 25) /
                userMethods.length) *
                i +
              margin.top
            })`
        )
        .attr('fill', (_d, i) => colors[i]);

      // Create 12 new rectangle elements within each g element, one for each management time-frame/month

      yearlyGDDPattern.forEach((el, ind) => {
        rectangleMaker(gSelection, el, xPosVal, ind);
      });

      // due to map-based append, needed to isolate height assignment to new selection including new and old month boxes
      const allMonthBoxes = timelineBarContainer
        .selectAll('.methodBoxes')
        .selectAll('.monthBoxes');

      // update all month boxes to include adjust height value.
      // 25 = width of x-axis
      // 60 = cumulative space between bars
      allMonthBoxes
        .transition()
        .attr('height', () =>
          userMethods.length > 6
            ? `${
                (height - margin.bottom - margin.top - 25 - 60) /
                userMethods.length
              } `
            : '25'
        );

      // create legend to reflect each created method box.
      createLegend(colors);
    }
  };

  useEffect(() => {
    timelineUpdater();
  }, [userMethods]);

  return (
    <>
      {/* associates empty reference object d3Container with the SVG element manipulated by D3 */}
      <svg
        ref={d3Container}
        preserveAspectRatio="xMinYMin meet"
        viewBox={`0 0 ${width} ${height} `}
      ></svg>
      <div id="legendContainer">
        <h2 className="hidden" id="legendHeader">
          Legend
        </h2>
        {userMethods.length === 0 ? (
          <h4 id="legendMessage">
            Legend Entries Will Appear Here, Use "Select Management Options" or
            "Weeds Information" to Add Management Methods
          </h4>
        ) : (
          <></>
        )}
        {legendOutput}
      </div>
    </>
  );
};
