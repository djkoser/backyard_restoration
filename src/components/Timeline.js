import React, { useRef, useEffect, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
// @ts-ignore
import * as d3 from 'd3';


// From store userMethods[], gSeasonLength, firstGDD35

const Timeline = (props) => {

  // Create chart viewbox width and height variables
  const { width, height, first_gdd35, last_gdd35, margin, userMethods } = props;
  // @ts-ignore

  const avgSDateToMs = (dateString) => {
    let output = new Date()
    output.setDate(dateString.substring(3, 5))
    const zIndexedMonth = Number.parseInt(dateString.substring(0, 2))
    output.setMonth(zIndexedMonth)
    return output.getTime()
  }

  const colorGenerator = () => {
    let output = []
    let incr = 1 / userMethods.length

    for (let i = (1 / userMethods.length); i < 1; i += incr) {
      output.push(d3.interpolateTurbo(i))
    }
    return output
  }
  var colors = colorGenerator()

  const xPosVal = (ind, j) => {
    // xPosition is the sum of the previous elements' widths
    let output = margin.left;
    for (let i = 0; i < ind; i++) {
      output += Number.parseInt(j[i].getAttribute('width'))
    }
    return output;
  }

  // function to store management method text as legend descriptions
  const extractText = () => {
    return userMethods.map(el => `Weed: ${el.common_name}: ${el.name} - ${el.description}`)
  }

  const legendText = extractText()

  // Bind D3 data to svg reference object, 

  let d3Container = useRef()
  // initialize empty reference object for the d3Container -> The reference object has persistent  state, it will be assigned to SVG element manipulated by D3 in return

  let currentDate;
  let yrEndDate;
  let yrStartDate;
  let yr2ms;
  let msBetweenGDD35;
  let notGDD35ms;
  let GDD35Prop;
  let notGDD35Prop;

  if (first_gdd35 && last_gdd35) {
    // Calculates a year as January 1st through December 31st, this will the be axis display range
    currentDate = new Date()
    yrEndDate = new Date(currentDate.getFullYear(), 11, 31)
    yrStartDate = new Date(currentDate.getFullYear(), 0, 1)
    // Needed in order to calculate the bar width for certain months which is the  proportion of the year that is within the user's GDD35 growing window 
    yr2ms = yrEndDate.getTime() - yrStartDate.getTime()
    msBetweenGDD35 = avgSDateToMs(last_gdd35) - avgSDateToMs(first_gdd35);
    notGDD35ms = yr2ms - msBetweenGDD35;
    // The proportion of the year in which GDD35, divided by 6 to yield the fraction of this fraction that one month spans between hypothetical May through October multiplied by the viewbox width minus chart margins
    GDD35Prop = ((msBetweenGDD35 / yr2ms) / 6) * (width - margin.left - margin.right)
    // The proportion of the year in which not GDD35, divided by 6 to yield the fraction of this fraction that one month spans between hypothetical November through April multipleid by the viewbox width minus chart margins
    notGDD35Prop = ((notGDD35ms / yr2ms) / 6) * (width - margin.left - margin.right);

    // Assign height and width values, border and add axis
  }

  useEffect(() => {

    // Associate reference object with SVG varable to be manipulated by D3
    const svg = d3.select(d3Container.current)
      .attr("class", "timelineSVG")

      // Add Axis
      .append('g')
      // move the g element that will host the x axis to the bottom of the chart
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .attr("class", "timelineAxis")
      .call(d3.axisBottom(xAxis))
      // Select the xAxis Text and rotate labels for readibility. 
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-65)")
      .append('g')
      .attr("transform", `translate(200,275)`)
      .attr("height", "25")
      .attr("width", "50")
      .append('text')
      .attr("font-size", "14")
      .attr("font-family", "raleway")
      .text('Month')
  }, [])

  const timelineUpdater = () => {

    // Group chart update tasks that will be contingent upon data changes to a different useEffect that will re-render on change.
    const svg = d3.select(d3Container.current)
    // Create new g elements within the SVG element,  one for each piece of data given by userMethods from store
    const gSelect = svg
      .selectAll('g')
      .data(userMethods)
      .enter()
      .append('g')
      .attr("y", (d, i) => `${((height - margin.bottom) / userMethods.length) * i}`)
      .attr("fill", (d, i) => colors[i])

    // Create new rect elements within g elements, one for each management timeframe
    const rSelect = gSelect
      .selectAll('rect')
      .data((d) =>
        [{ visibility: d.january, width: notGDD35Prop },
        { visibility: d.february, width: notGDD35Prop },
        { visibility: d.march, width: notGDD35Prop },
        { visibility: d.april, width: notGDD35Prop },
        { visibility: d.may, width: GDD35Prop },
        { visibility: d.june, width: GDD35Prop },
        { visibility: d.july, width: GDD35Prop },
        { visibility: d.august, width: GDD35Prop },
        { visibility: d.september, width: GDD35Prop },
        { visibility: d.october, width: GDD35Prop },
        { visibility: d.november, width: notGDD35Prop },
        { visibility: d.december, width: notGDD35Prop }], d => d)

    rSelect
      .enter()
      .append('rect')
      .attr("width", (d) => d.width)
      .attr("height", (d) => userMethods.length > 6 ? `${(250 - margin.bottom - margin.top - 50) / userMethods.length}` : "25")
      .attr("x", (d, ind, j) => xPosVal(ind, j))
      .attr("y", (d, i, j) => j[i].parentElement.getAttribute('y'))
      .style("fill", (d, i, j) => j[i].parentElement.getAttribute("color"))
      .attr("visibility", (d) => Number.parseInt(d.visibility) ? "visible" : "hidden")

    gSelect
      .exit()
      .remove()

    rSelect
      .exit()
      .remove()
  }

  useEffect(() => {


    console.log("useEffect1")
    timelineUpdater()

  }, [userMethods, d3Container.current])


  // INitialize x-axis object
  const xAxis = d3.scaleTime()
    .domain([yrStartDate, yrEndDate])
    // Rather than extending from 0 to the full width and height of the chart, the starts and ends of the ranges are moved inward by the corresponding margins.
    .range([margin.left, width - margin.right])


  return (
    <>
      {/* associates empty reference object d3Container with the SVG element manipulated by D3 */}
      <svg
        ref={d3Container}
        preserveAspectRatio="xMinYMin meet"
        viewBox={`0 0 ${width} ${height}`}
      ></svg>
    </>
  );
}

export default withRouter(Timeline)