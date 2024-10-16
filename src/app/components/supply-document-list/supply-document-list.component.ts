import { Component, OnInit } from '@angular/core';
import { SupplyDocumentService } from '../../supply-document.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-supply-document-list',
  templateUrl: './supply-document-list.component.html',
  styleUrls: ['./supply-document-list.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
})
export class SupplyDocumentListComponent implements OnInit {
  supplyDocuments: any[] = [];
  isManager: any =0; // للتحقق من نوع المستخدم

  constructor(
    private supplyDocumentService: SupplyDocumentService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadSupplyDocuments();
  }

  loadSupplyDocuments() {
    this.supplyDocumentService.getAllSupplyDocuments().subscribe(
      (data) => {
        this.supplyDocuments = data;
      },
      (error) => {
        console.error('خطأ في تحميل مستندات التوريد', error);
      }
    );
  }

  deleteSupplyDocument(id: number) {
    if (confirm('هل أنت متأكد من حذف هذا المستند؟')) {
      this.supplyDocumentService.deleteSupplyDocument(id).subscribe(
        () => {
          this.loadSupplyDocuments();
        },
        (error) => {
          console.error('خطأ في حذف مستند التوريد', error);
        }
      );
    }
  }


  addSupplyDocument() {
    this.router.navigate(['supplydocument/add']);
  }

  exportToExcel() {
    this.supplyDocumentService.exportSupplyDocuments().subscribe(
      (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'supply-documents.xlsx';
        a.click();
        window.URL.revokeObjectURL(url);
      },
      (error) => {
        console.error('خطأ في تصدير البيانات', error);
      }
    );
  }
}