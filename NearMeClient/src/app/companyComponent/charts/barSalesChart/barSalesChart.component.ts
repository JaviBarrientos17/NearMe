import { Component, OnInit } from "@angular/core";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

@Component({
    selector: 'barSalesChart-component',
    templateUrl: './barSalesChart.component.html',
    styleUrls: ['./barSalesChart.component.css'],
})

export class BarSalesChartComponent implements OnInit {
    public chart:any = null;

    ngOnInit(): void {
        this.chart = new Chart('barChart', {
            type: 'bar',
            data: {
                labels: ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"],
                datasets: [{
                    label: "Ventas Semanales",
                    data: [5, 7, 9, 5, 4, 6, 10],
                    backgroundColor: [
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(54, 162, 235, 0.2)",
                        "rgba(255, 206, 86, 0.2)",
                        "rgba(75, 192, 192, 0.2)",
                        "rgba(153, 102, 255, 0.2)",
                        "rgba(255, 159, 64, 0.2)"
                    ],
                    borderColor: [
                        "rgba(255,99,132,1)",
                        "rgba(54, 162, 235, 1)",
                        "rgba(255, 206, 86, 1)",
                        "rgba(75, 192, 192, 1)",
                        "rgba(153, 102, 255, 1)",
                        "rgba(255, 159, 64, 1)"
                    ],
                    borderWidth: 1,
                }]
            },
            options: {
                plugins: {
                    legend: {
                        display: false,
                    },
                    title: {
                        display: true,
                        text: 'Ventas semanales',
                    }
                },
            }
        });
    }
}