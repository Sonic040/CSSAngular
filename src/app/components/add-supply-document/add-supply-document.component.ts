import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupplyDocumentService } from '../../supply-document.service';
import { WarehouseService } from '../../warhouse.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; // Import this
@Component({
  selector: 'app-add-supply-document',
  templateUrl: './add-supply-document.component.html',
  styleUrls: ['./add-supply-document.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
})
export class AddSupplyDocumentComponent implements OnInit {
  supplyDocumentForm: FormGroup;
  warehouses: any[] = [];
  items: any[] = [];

  constructor(
    private fb: FormBuilder,
    private supplyDocumentService: SupplyDocumentService,
    private warehouseService: WarehouseService,
    private router: Router
  ) {
    this.supplyDocumentForm = this.fb.group({
      documentname: ['', Validators.required],
      documentsubject: ['', Validators.required],
      warehouseId: ['', Validators.required],
      itemId: [1]
    });
  }

  ngOnInit(): void {
    this.loadWarehouses();
  }

  loadWarehouses() {
    // تأكد من أن لديك WarehouseService جاهز لتحميل المخازن
    this.warehouseService.getWarehouses().subscribe(
      (data) => {
        this.warehouses = data;
      },
      (error) => {
        console.error('خطأ في تحميل المخازن', error);
      }
    );
  }

  onWarehouseChange(event: any) {
    const warehouseId = event.target.value;
    this.loadItems(warehouseId);
  }

  loadItems(warehouseId: number) {
    const selectedWarehouse = this.warehouses.find(w => w.warehouseId === +warehouseId);
    if (selectedWarehouse && selectedWarehouse.items) {
      this.items = selectedWarehouse.items;
    } else {
      this.items = [];
    }
  }

  onSubmit() {
    if (this.supplyDocumentForm.valid) {
      const newDocument = this.supplyDocumentForm.value;
      this.supplyDocumentService.addSupplyDocument(newDocument).subscribe(
        () => {
          this.router.navigate(['/supplydocument']);
        },
        (error) => {
          console.error('خطأ في إضافة مستند التوريد', error);
        }
      );
    }
  }
}
