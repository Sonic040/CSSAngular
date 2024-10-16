import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { WarehouseService } from '../../warhouse.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms'; // Import this
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-warehouse',
  templateUrl: './add-warehouse.component.html',
  styleUrls: ['./add-warehouse.component.css'],
  standalone:true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],

})
export class AddWarehouseComponent {
  warehouseForm: FormGroup;

  constructor(private fb: FormBuilder, private warehouseService: WarehouseService, private router: Router) {
    this.warehouseForm = this.fb.group({
      warehouseName: ['', Validators.required],
      warehouseDescription: [''],
      items: this.fb.array([])
    });
  }

  get items() : FormArray {
    return this.warehouseForm.get("items") as FormArray;
  }

  addItem() {
    this.items.push(this.fb.group({
      itemName: ['', Validators.required],
      itemDescription: [''],
      quantity: [0, [Validators.required, Validators.min(1)]]
    }));
  }

  removeItem(index: number) {
    this.items.removeAt(index);
  }

  onSubmit() {
    if(this.warehouseForm.valid) {
      this.warehouseService.addWarehouse(this.warehouseForm.value).subscribe(() => {
        this.router.navigate(['/warehouses']);
      });
    }
  }
}