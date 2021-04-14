import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMethods } from '../redux/mgmtMethodReducer';
// @ts-ignore
import * as d3 from 'd3';


// From store userMethods[], gSeasonLength, firstGDD35
// @ts-ignore
const Timeline = (props) => {

  // @ts-ignore
  const userMethods = useSelector(state => state.mgmtMethodReducer.userMethods);
  // @ts-ignore
  const growing_season_length = useSelector(state => state.userInfoReducer.growing_season_length);
  // @ts-ignore
  const first_gdd35 = useSelector(state => state.userInfoReducer.first_gdd35);
  // @ts-ignore
  const last_gdd35 = useSelector(state => state.userInfoReducer.last_gdd35);

  const getRandomColor = () => {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getMethods())
  }, [dispatch])

  const d3Container = useRef(null);
  useEffect(
    () => {
      if (userMethods && d3Container.current) {
        const svg = d3.select(d3Container.current);
        // Bind D3 data to svg reference object, g elements are children of svg elements, create on for every method
        // Create new g elements within the SVG element,  one for each piece of data given by userMethods from store
        const gElements = svg
          .selectAll('g')
          .data(userMethods)
          .enter()
          .append('g')
          .text((d) => `${d.common_name} - ${d.name}`)
          .attr("y", (d, i) => `${(250 / userMethods.length) * i}`)
          .attr("color", () => getRandomColor())
        // Create new rectangles within each g element representing a month of potential treatment
        gElements
          .selectAll('rect')
          .data((d, ind) => [{ width: d.april, xPosition: `${(400 / 9) * 0}` }, { width: d.may, xPosition: `${(400 / 9) * 1}` }, { width: d.june, xPosition: `${(400 / 9) * 2}` }, { width: d.july, xPosition: `${(400 / 9) * 3}` }, { width: d.august, xPosition: `${(400 / 9) * 4}` }, { width: d.september, xPosition: `${(400 / 9) * 5}` }, { width: d.october, xPosition: `${(400 / 9) * 6}` }, { width: d.november, xPosition: `${(400 / 9) * 7}` }, { width: d.december_march, xPosition: `${(400 / 9) * 5}` }])
          .enter()
          .append('rect')
          .attr("width", (d) => `${Number.parseInt(d.width) * (400 / 12)}`)
          .attr("height", (d) => `${250 / userMethods.length}`)
          .attr("x", (d) => d.xPosition)
          .attr("y", (d, i, j) => j[i].parentElement.getAttribute("y"))
          .style("margin", "0")
          .style("fill", (d, i, j) => j[i].parentElement.getAttribute("color"))

        // Remove old D3 elements
        gElements.exit()
          .remove();
      }
    },

    [userMethods, growing_season_length, first_gdd35, last_gdd35, d3Container.current])

  return (
    <main className="d3Container">
      <svg
        ref={d3Container}
        preserveAspectRatio="xMinYMin meet"
        viewBox="0 0 400 250 "
      />
    </main>
  );
}

export default Timeline