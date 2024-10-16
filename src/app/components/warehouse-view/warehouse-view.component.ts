import { Component, OnInit } from '@angular/core';
import { WarehouseService } from '../../warhouse.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-warehouse-view',
  templateUrl: './warehouse-view.component.html',
  standalone: true,
  styleUrls: ['./warehouse-view.component.css'],
  imports: [CommonModule] // Add CommonModule here
})
export class WarehouseViewComponent implements OnInit {
  warehouses: any[] = []; // Use 'any' or define inline interface as needed
  selectedWarehouseId: number | null = null;

  w: any[] = [
    {
      warehouseId: 1,
      warehouseName: "Warehouse A",
      warehouseDescription: "Description of Warehouse A",
      createdBy: 1,
      createdAt: "2024-10-13T23:26:27.833"
    },
    {
      warehouseId: 2,
      warehouseName: "Warehouse B",
      warehouseDescription: "Description of Warehouse B",
      createdBy: 2,
      createdAt: "2024-10-14T10:00:00.000"
    }
  ];
  constructor(private warehouseService: WarehouseService, private router: Router ,private comn:CommonModule) {}

  ngOnInit(): void {
    this.loadWarehouses();
  }


  loadWarehouses() {
    //this.warehouses = this.w;
    this.warehouseService.getWarehouses().subscribe(data => {
      this.warehouses = data;
    });
  }

  viewItems(warehouseId: number) {
    this.selectedWarehouseId = warehouseId;
  }

  addWarehouse() {
    this.router.navigate(['/warehouses/add']);
  }

  
  supply() {
    this.router.navigate(['/supplydocument']);
  }
  deletewarehouse(id: number) {
    if (confirm('هل أنت متأكد من حذف هذا المستند؟')) {
      this.warehouseService.deleteWarehouse(id).subscribe(
        () => {
          this.loadWarehouses();
        },
        (error) => {
          console.error('خطأ في حذف مستند التوريد', error);
        }
      );
    }
  }


  exportToExcel() {
    this.warehouseService.exportWarehouses().subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'warehouses.xlsx';
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }
}