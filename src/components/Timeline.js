import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
// @ts-ignore
import * as d3 from 'd3';

// import { swatches } from '@d3/color-legend';

// From store userMethods[], gSeasonLength, firstGDD35
// @ts-ignore
const Timeline = (props) => {

  // Create chart viewbox width and height variables
  const width = 400;
  const height = 300;
  // @ts-ignore
  const userMethods = useSelector(state => state.mgmtMethodReducer.userMethods);
  // @ts-ignore
  const first_gdd35 = useSelector(state => state.userInfoReducer.first_gdd35);
  // @ts-ignore
  const last_gdd35 = useSelector(state => state.userInfoReducer.last_gdd35);


  const avgSDateToMs = (dateString) => {
    console.log(dateString)
    let output = new Date()
    output.setDate(dateString.substring(3, 5))
    const zIndexedMonth = Number.parseInt(dateString.substring(0, 2))
    output.setMonth(zIndexedMonth)
    return output.getTime()
  }

  const d3Container = useRef(null);
  useEffect(
    () => {
      // create the chart's margin to accomdate scales
      const margin = ({ top: 20, right: 0, bottom: 90, left: 40 })
      if (userMethods?.length && d3Container.current) {
        // Calculates a year as January 1st through December 31st, this will the be axis display range
        const currentDate = new Date()
        const yrEndDate = new Date(currentDate.getFullYear(), 11, 31)
        const yrStartDate = new Date(currentDate.getFullYear(), 0, 1)
        // Needed in order to calculate the bar width for certain months which is the  proportion of the year that is within the user's GDD35 growing window 
        const yr2ms = yrEndDate.getTime() - yrStartDate.getTime()
        const msBetweenGDD35 = avgSDateToMs(last_gdd35) - avgSDateToMs(first_gdd35);
        const notGDD35ms = yr2ms - msBetweenGDD35;
        // The proportion of the year in which GDD35, divided by 6 to yield the fraction of this fraction that one month spans between hypothetical May through October multiplied by the viewbox width minus chart margins
        const GDD35Prop = ((msBetweenGDD35 / yr2ms) / 6) * (width - margin.left - margin.right)
        // The proportion of the year in which not GDD35, divided by 6 to yield the fraction of this fraction that one month spans between hypothetical November through April multipleid by the viewbox width minus chart margins
        const notGDD35Prop = ((notGDD35ms / yr2ms) / 6) * (width - margin.left - margin.right);
        const svg = d3.select(d3Container.current);

        // Bind D3 data to svg reference object, g elements are children of svg elements, create on for every method
        // Create new g elements within the SVG element,  one for each piece of data given by userMethods from store

        // Use color-legeend and built-in pallettes to define colors for legend based upon management methods selected

        // function to store management method text as legend descriptions
        const extractText = () => {
          return userMethods.map(el => `Weed: ${el.common_name}: ${el.name} - ${el.description}`)
        }
        const legendText = extractText()
        // swatches({
        //   color: d3.scaleOrdinal(legendText, d3.schemeTableau10),
        // })

        const update = svg
          .selectAll('g')
          .data(userMethods)
          .enter()
          .append('g')
          .attr("y", (d, i) => `${((height - margin.bottom) / userMethods.length) * i}`)
          .attr("color", "blue")

        const xPosVal = (ind, j) => {
          // xPosition is the sum of the previous elements' widths
          let output = margin.left;
          for (let i = 0; i < ind; i++) {
            output += Number.parseInt(j[i].getAttribute('width'))
          }
          return output;
        }

        // Create new rectangles within each g element representing a month of potential treatment

        update
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
            { visibility: d.december, width: notGDD35Prop }])
          .enter()
          .append('rect')
          .attr("width", (d) => d.width)
          .attr("height", (d) => userMethods.length > 6 ? `${(250 - margin.bottom - margin.top - 50) / userMethods.length}` : "25")
          .attr("x", (d, ind, j) => xPosVal(ind, j))
          .attr("y", (d, i, j) => j[i].parentElement.getAttribute('y'))
          .style("fill", (d, i, j) => j[i].parentElement.getAttribute("color"))
          .attr("visibility", (d) => Number.parseInt(d.visibility) ? "visible" : "hidden")

        const xAxis = d3.scaleTime()
          .domain([yrStartDate, yrEndDate])
          // Rather than extending from 0 to the full width and height of the chart, the starts and ends of the ranges are moved inward by the corresponding margins.
          .range([margin.left, width - margin.right])

        // Map time format to tickmarks

        // x-Axis - Time format constant

        update.append('g')
          // move the g element that will host the axis to the bottom of the chart
          .attr("transform", `translate(0,${height - margin.bottom})`)
          .attr("class", "timelineAxis")
          .call(d3.axisBottom(xAxis))

          // Select the xAxis Text and rotate labels for readibility. 
          .selectAll("text")
          .style("text-anchor", "end")
          .attr("dx", "-.8em")
          .attr("dy", ".15em")
          .attr("transform", "rotate(-65)");
        // apply the timeFormat declared above



        update.append('g')
          .attr("font-family", "raleway")
          .attr("font-size", 14)
          .attr("y", 10)
          .text("Month")

        // Remove old D3 elements
        update.exit()
          .remove();

      }
    }, [first_gdd35, last_gdd35, userMethods])

  return (
    <main className="d3Container">
      <svg
        ref={d3Container}
        preserveAspectRatio="xMinYMin meet"
        viewBox={`0 0 ${width} ${height}`}
      />
    </main>
  );
}

export default Timeline