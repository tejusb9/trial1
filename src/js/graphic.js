/* global d3 */
import * as d3 from 'd3';

function createVisualization() {
  // Select the container and get its width
  const container = d3.select('#my-svg-container');
  const containerWidth = container.node().getBoundingClientRect().width;

  // Create SVG element with responsive settings
  const svg = container.append('svg')
    .attr('width', '100%') // Use 100% for full-width
    .attr('height', 400) // Set a fixed height or use a dynamic value
    .attr('viewBox', `0 0 ${containerWidth} 400`);

  // Data for circles
  const data = [10, 20, 30, 40, 50]; // Sample data

  // Calculate spacing between circles
  const spacing = containerWidth / (data.length + 1);

  // Example: Adding circles to the SVG
  svg.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', (d, i) => spacing * (i + 1)) // Position based on calculated spacing
    .attr('cy', 200) // Center vertically
    .attr('r', d => d) // Radius based on data
    .attr('fill', 'blue');
}

function resize() {
  // Clear the existing SVG
  d3.select('#my-svg-container').select('svg').remove();

  // Recreate the visualization
  createVisualization();
}

function init() {
  createVisualization();
  console.log('Visualization created!');

  // Add resize event listener
  window.addEventListener('resize', resize);
}

export default { init, resize };
