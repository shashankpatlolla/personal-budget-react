import React , {useEffect} from 'react';
//import axios from 'axios';
import { Chart } from 'chart.js/auto';
import * as d3 from 'd3';

function HomePage({ budgetData }) {

  useEffect(()=>{
    if (budgetData.length > 0) {
      createChart(budgetData);
      getD3JSChart(budgetData);
    }
  }, [budgetData]);
    
  function createChart(data) {
        
    const ctx = document.getElementById('myChart');
    if (ctx && Chart.getChart(ctx)?.destroy) {
      Chart.getChart(ctx)?.destroy();
    }
    new Chart(ctx, {
      type: 'pie',
      data: {
        datasets: [
          {
            data: data.map((item) => item.budget),
            backgroundColor: [
              '#FF5733',
              '#3498DB',
              '#27AE60',
              '#9B59B6',
              '#F1C40F',
              '#34495E',
              '#E74C3C',
            ],
          },
        ],
        labels: data.map((item) => item.title),
      },
    });
  }

  async function getD3JSChart(data){
    var width = 400;
    var height = 400;
    var radius = 150;

    // Append an SVG element to the chart-container div
    const ele = document.getElementById('chart-container');
    if (ele.hasChildNodes()) {
      return; // If it's not empty, return without creating a new chart
    }
    var svg = d3.select(ele)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    try{
    //const response = await axios.get("http://localhost:3005/budget");
    //const data = response.data.myBudget;
    const pie = d3.pie().value(function (d) {
        return d.budget;
      });

    const arc = d3.arc().innerRadius(0).outerRadius(radius);

    const arcs = svg
      .selectAll('.arc')
      .data(pie(data))
      .enter()
      .append('g')
      .attr('class', 'arc');

      const colorScale = d3
      .scaleOrdinal()
      .domain(data.map(function (d) {
        return d.title;
      }))
      .range(['#FF5733', '#3498DB', '#27AE60', '#9B59B6', '#F1C40F', '#34495E', '#E74C3C']);

    arcs
      .append('path')
      .attr('d', arc)
      .attr('fill', function (d) {
        return colorScale(d.data.title);
      });

    arcs
      .append('polyline')
      .attr('opacity', 0.2)
      .attr('stroke', 'black') // Line color
      .attr('stroke-width', 2) // Line width
      .attr('fill', 'none') // No fill
      .attr('points', function (d) {
        const centroid = arc.centroid(d);
        const labelX = centroid[0]; // X-coordinate of the label
        const labelY = centroid[1]; // Y-coordinate of the label
        const midAngle = Math.atan2(labelY, labelX);

        const startX = 0;
        const startY = 0;
        const endX = Math.cos(midAngle) * (radius + 30);
        const endY = Math.sin(midAngle) * (radius + 30);
        return [startX, startY, endX, endY];
      });

    arcs
      .append('text')
      .attr('transform', function (d) {
        const centroid = arc.centroid(d);

        const labelX = centroid[0]; // X-coordinate of the label
        const labelY = centroid[1]; // Y-coordinate of the label
        const midAngle = Math.atan2(labelY, labelX);
        const endX = Math.cos(midAngle) * (radius + 20);
        const endY = Math.sin(midAngle) * (radius + 20);

        const labelPositionX = endX;
        const labelPositionY = endY;
        return 'translate(' + labelPositionX + ',' + labelPositionY + ')';
      })
      .attr('dy', '-0.5em')
      .attr('text-anchor', function (d) {
        return 'end';
      })
      .text(function (d) {
        return d.data.title;
      });
    } catch (error) {
      console.error('Error fetching or processing data:', error);
    }
  }
  /* useEffect(()=>{ */

  /* async function getBudget() {
      try {
        const response = await axios.get('http://localhost:3005/budget');
        //console.log(response.data.myBudget);
        const data = response.data.myBudget;
        createChart(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    } */      
          
  //  },[]);
  return (
    <main className="center" id="main">

        <div className="page-area">

            <article>
                <h1>Stay on track</h1>
                <p>
                    Do you know where you are spending your money? If you really stop to track it down,
                    you would get surprised! Proper budget management depends on real data... and this
                    app will help you with that!
                </p>
            </article>
    
            <article>
                <h1>Alerts</h1>
                <p>
                    What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.
                </p>
            </article>
    
            <article>
                <h1>Results</h1>
                <p>
                    People who stick to a financial plan, budgeting every expense, get out of debt faster!
                    Also, they to live happier lives... since they expend without guilt or fear... 
                    because they know it is all good and accounted for.
                </p>
            </article>
    
            <article>
                <h1>Free</h1>
                <p>
                    This app is free!!! And you are the only one holding your data!
                </p>
            </article>
    
            <article>
                <h1>Stay on track</h1>
                <p>
                    Do you know where you are spending your money? If you really stop to track it down,
                    you would get surprised! Proper budget management depends on real data... and this
                    app will help you with that!
                </p>
            </article>
    
            <article>
                <h1>Alerts</h1>
                <p>
                    What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.
                </p>
            </article>
    
            <article>
                <h1>Results</h1>
                <p>
                    People who stick to a financial plan, budgeting every expense, get out of debt faster!
                    Also, they to live happier lives... since they expend without guilt or fear... 
                    because they know it is all good and accounted for.
                </p>
            </article>
    
            <article>
                <h1>Chart</h1>
                <p>
                    <canvas id="myChart" width="400" height="400"></canvas>
                </p>
            </article>
            <article>
                <h1>D3JS Pie Chart</h1>
                <div id="chart-container"></div>
            </article>
        </div>

    </main>
  );
}

export default HomePage;
