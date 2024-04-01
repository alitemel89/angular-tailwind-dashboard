// sales-category.component.ts

import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-sales-category',
  templateUrl: './sales-category.component.html',
})
export class SalesCategoryComponent implements OnInit {
  categories: string[] = [
    'Electronics',
    'Clothing',
    'Home & Kitchen',
    'Books',
    'Sports',
    'Health & Beauty',
  ];

  constructor() {}

  ngOnInit(): void {
    const salesData = this.generateDummySalesData();

    const pieChart = new Chart('pieChart', {
      type: 'pie',
      data: {
        labels: this.categories,
        datasets: [
          {
            data: salesData,
            backgroundColor: [
              'rgba(255, 99, 132, 0.7)',
              'rgba(54, 162, 235, 0.7)',
              'rgba(75, 192, 192, 0.7)',
              'rgba(255, 205, 86, 0.7)',
              'rgba(153, 102, 255, 0.7)',
              'rgba(255, 159, 64, 0.7)',
            ],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            labels: {
              color: '#14b8a6',
            },
          },
        },
      },
    });
  }

  generateDummySalesData(): number[] {
    // Generating random sales data for the categories
    return Array.from(
      { length: this.categories.length },
      () => Math.floor(Math.random() * 1000) + 100
    );
  }
}
