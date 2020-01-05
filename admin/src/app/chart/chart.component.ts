// Angular
import { Component, OnInit } from '@angular/core';
// Chartjs
import { Chart } from 'chart.js';
// Socket.io-client
import io from 'socket.io-client';
// URL server
const socket = io('http://localhost:3000');

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  private chart: any;
  private pie: any;

  constructor() { }

  ngOnInit() {
    // Setup chart
    this.initChart();

    // Socket get data form server
    socket.on('data2', (res) => {
      this.updateChartData(this.chart, res, 0);
      this.updateChartData(this.pie, res.slice(0, 5), 0);
    })
  }

  public initChart(): void {
    this.chart = new Chart('bar', {
      type: 'bar',
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Combo Bar and line Chart'
        },
      },
      data: {
        labels: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
        datasets: [
          {
            type: 'bar',
            label: 'My First dataset',
            data: [243, 156, 365, 30, 156, 265, 356, 543],
            backgroundColor: 'rgba(255,0,255,0.4)',
            borderColor: 'rgba(255,0,255,0.4)',
            fill: false,
          },
          {
            type: 'bar',
            label: 'My Second dataset',
            data: [243, 156, 365, 30, 156, 265, 356, 543].reverse(),
            backgroundColor: 'rgba(0,0,255,0.4)',
            borderColor: 'rgba(0,0,255,0.4)',
            fill: false,
          }
        ]
      }
    });

    this.pie = new Chart('pie', {
      type: 'doughnut',
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Pie Chart'
        }, legend: {
          position: 'top',
        }, animation: {
          animateScale: true,
          animateRotate: true
        }
      },
      data: {
        datasets: [{
          data: [45, 10, 5, 25, 15],
          backgroundColor: ["red", "orange", "yellow", "green", "blue"],
          label: 'Dataset 1'
        }],
        labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue']
      }
    })
  }

  public updateChartData(chart, data, dataSetIndex): void {
    chart.data.datasets[dataSetIndex].data = data;
    chart.update();
  }

}
