export const colors = [
  '#d65b4a',
  '#66b92e',
  '#da932c',
  '#2499f2',
  '#9c6af2',
  '#ccda12',
];

function style(color) {
  return {
    fill: false,
    lineTension: 0.1,
    backgroundColor: color,
    borderColor: color,
    borderCapStyle: 'butt',
    borderDash: [],
    borderDashOffset: 0.0,
    borderJoinStyle: 'miter',
    pointBorderColor: color,
    pointBackgroundColor: '#fff',
    pointBorderWidth: 1,
    pointHoverRadius: 5,
    pointHoverBackgroundColor: color,
    pointHoverBorderColor: color,
    pointHoverBorderWidth: 2,
    pointRadius: 1,
    pointHitRadius: 10,
    spanGaps: false,
  };
}

function generateStyle(index) {
  return style(colors[index % colors.length]);
}

export default generateStyle;
