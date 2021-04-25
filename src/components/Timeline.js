import React, { useRef, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
// @ts-ignore
import * as d3 from 'd3';


// From store userMethods[], gSeasonLength, firstGDD35

const Timeline = (props) => {

  // Calculates a year as January 1st through December 31st, this will the be axis display range
  const currentDate = new Date()
  const yrEndDate = new Date(currentDate.getFullYear(), 11, 31)
  const yrStartDate = new Date(currentDate.getFullYear(), 0, 1)
  const [legendOutput, setLegendOutput] = useState([(
    <div key="placeholder" className="d3Legend">
    </div>)]);

  const months = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december"
  ];

  // Create chart viewbox width and height variables
  const { width, height, first_gdd35, last_gdd35, margin, userMethods } = props;
  // @ts-ignore

  const colorGenerator = () => {
    let output = []
    let incr = 0.8 / userMethods.length

    for (let i = (1 / userMethods.length); i <= 1; i += incr) {
      output.push(d3.interpolateTurbo(i))
    }
    return output
  }

  const avgSDateToMs = (dateString) => {
    let output = new Date()
    output.setDate(dateString.substring(3, 5))
    const zIndexedMonth = Number.parseInt(dateString.substring(0, 2))
    output.setMonth(zIndexedMonth)
    return output.getTime()
  }

  // function to store management method text as legend descriptions
  const extractText = () => userMethods.map(el => `Weed: ${el.common_name} - ${el.name}`)

  const createLegend = (colors) => {
    let legendText = extractText()

    setLegendOutput(legendText.map((el, ind) => (
      <div key={`legendBody${ind}`} className="legendBody">
        <div key={`legendText${ind}`}>
          <div style={{ backgroundColor: `${colors[ind]}` }} className="colorCode"></div>
          {el}
        </div>
      </div>
    )))
  }

  // Bind D3 data to svg reference object, 

  let d3Container = useRef()
  // initialize empty reference object for the d3Container -> The reference object has persistent  state, it will be assigned to SVG element manipulated by D3 in return

  useEffect(() => {

    // INitialize x-axis scale object
    const scale = d3.scaleTime()
      .domain([yrStartDate, yrEndDate])
      // Rather than extending from 0 to the full width and height of the chart, the starts and ends of the ranges are moved inward by the corresponding margins.
      .range([margin.left, width - margin.right])

    const tickFormat = d3.timeFormat("%b")

    const xAxis = d3
      .axisBottom(scale)
      // @ts-ignore
      .tickFormat(d => tickFormat(d));

    // Associate reference object with SVG varable to be manipulated by D3
    const svg = d3.select(d3Container.current)
      .attr("class", "timelineSVG")
    // Add Axis to SVG
    svg
      .append('g')
      // move the g element that will host the x axis to the bottom of the chart
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .attr("class", "timelineAxis")
      .call(xAxis)
    // Select the xAxis Text and rotate labels for readibility. 

    svg
      .append("g")
      .attr("class", "timelineBarContainer")

    const text = svg
      .selectAll("text")

    text
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-65)")
      .append('g')
      .attr("transform", `translate(150,275)`)
      .attr("height", "25")
      .attr("width", "50")

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [height, margin.bottom, margin.left, margin.right, width])

  const rectangleMaker = (gSelection, GDD35Prop, xPosVal, ind) => {
    return gSelection
      .append('rect')
      .attr("visibility", (d) => Number.parseInt(d[months[ind]]) ? "visible" : "hidden")
      .attr("width", GDD35Prop)
      .attr("x", (_d) => xPosVal(ind))
      .attr("class", "monthBoxes")
  }
  // Prep variable for use at end of function -> legend color key and text


  const timelineUpdater = () => {

    if (first_gdd35 && last_gdd35) {
      // Needed  to calculate the bar width for certain months which is the  proportion of the year that is within the user's GDD35 growing window 
      const yr2ms = yrEndDate.getTime() - yrStartDate.getTime()
      const msBetweenGDD35 = avgSDateToMs(last_gdd35) - avgSDateToMs(first_gdd35);
      const notGDD35ms = yr2ms - msBetweenGDD35;
      // The proportion of the year in which GDD35, divided by 6 to yield the fraction of this fraction that one month spans between hypothetical May through October multiplied by the viewbox width minus chart margins
      const GDD35Prop = ((msBetweenGDD35 / yr2ms) / 6) * (width - margin.left - margin.right)
      // The proportion of the year in which not GDD35, divided by 6 to yield the fraction of this fraction that one month spans between hypothetical November through April multipleid by the viewbox width minus chart margins
      const notGDD35Prop = ((notGDD35ms / yr2ms) / 6) * (width - margin.left - margin.right);

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
        notGDD35Prop];

      // Uses yearlyGDDPattern to determine the position of an element

      const xPosVal = (ind) => {
        // xPosition is the sum of the previous elements' widths plus the left margin
        let prevWidths = yearlyGDDPattern.slice(0, ind)
        return ind === 0 ? margin.left : margin.left + prevWidths.reduce((prev, next) => prev + next)
      }

      let colors = colorGenerator()

      // Group chart update tasks that will be contingent upon data changes to a different useEffect that will re-render on change.
      const timelineBarContainer = d3.select(d3Container.current).select(".timelineBarContainer")

      // Create new g elements within the SVG element,  one for each piece of data given by userMethods from store
      // Selection represents existing data and g elements
      const selection = timelineBarContainer
        .selectAll('g')
        .data(userMethods, d => d.method_id)

      // Remove unnecessary boxes;
      selection.exit().remove();

      // Create new g elements along with their selection and append them to timelineBarContainer
      // gSelection represents new data
      // 12 month boxes per g element
      const gSelection = selection
        .enter()
        .append('g')
        .attr("class", "methodBoxes")
        .attr("id", d => d.method_id)

      // merge existing methodBoxes to updated method boxes in order to update existing boxes and new boxes at same time
      gSelection
        .merge(timelineBarContainer.selectAll(".methodBoxes"))
        .transition()
        .attr("transform", (_d, i) => `translate(0,${((height - margin.bottom) / userMethods.length) * i})`)
        .attr("fill", (_d, i) => colors[i])

      // Create 12 new rectangle elements within each g element, one for each management timeframe/month

      yearlyGDDPattern.forEach((el, ind) => {
        rectangleMaker(gSelection, el, xPosVal, ind)
      })

      // due to map-based append, needed to isolate height assignment to new selection including new and old month boxes
      const allMonthBoxes = timelineBarContainer
        .selectAll(".methodBoxes")
        .selectAll(".monthBoxes")

      // update all month boxes to include adjust height value. 
      allMonthBoxes
        .transition()
        .attr("height", (d) => userMethods.length > 6 ? `${(height - margin.bottom - margin.top - 50) / userMethods.length}` : "25")

      // create legned to reflect each created method box. 
      createLegend(colors)
    }

  };

  useEffect(() => {
    timelineUpdater()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userMethods])

  return (
    <>
      {/* associates empty reference object d3Container with the SVG element manipulated by D3 */}
      <svg
        ref={d3Container}
        preserveAspectRatio="xMinYMin meet"
        viewBox={`0 0 ${width} ${height}`}
      ></svg>
      <div id="legendContainer">
        <h2 id="legendHeader">Legend</h2>
        {legendOutput}
      </div>
    </>
  );
}

export default withRouter(Timeline)