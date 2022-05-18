import { Component, OnInit } from "@angular/core";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

@Component({
    selector: 'ventasSemanales-component',
    templateUrl: './ventasSemanales.component.html',
    styleUrls: ['./ventasSemanales.component.css'],
})
export class VentasSemanalesComponent implements OnInit {
    public chart:any = null;

    ngOnInit(): void {
        this.chart = new Chart('donutChart', {
            type: 'doughnut',
            data: {
                labels: ["Moda", "Electrónica", "Informática", "Juguetes y Bebé", "Alimentación y bebidas", "Videojuegos", "Hogar y Jardín", "Deportes"],
                datasets: [{
                    label: "Ventas Semanales",
                    data: [12, 19, 5, 5, 2, 3, 20, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 0, 255, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 0, 255, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                    ],
                    borderWidth: 1,
                }]
            },
            options: {
                plugins: {
                    legend: {
                        display: true,
                    },
                    title: {
                        display: true,
                        text: 'Ventas por categorías',
                    }
                },
            }
        });
    }
}