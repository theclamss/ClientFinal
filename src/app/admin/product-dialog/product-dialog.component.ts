import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Product} from '../../core/model/product';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ProductService} from '../../core/services/productService/product.service';
import {Category} from '../../core/model/category';
import {CategoryService} from '../../core/services/categoryService/category.service';
import { User } from 'src/app/core/model/user';
import {TokenStorageService} from '../../core/services/tokenService/token-storage.service';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss']
})
export class ProductDialogComponent implements OnInit {

  public product: Product;
  public productForm: FormGroup;
  currentFileUpload: File;
  alreadyExists: boolean;
  public category: Category;
  categories: Category[];

  constructor(private tokenStorageService: TokenStorageService,public categoryService: CategoryService,private dialogRef: MatDialogRef<ProductDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private data: any,
              private productService: ProductService, private formBuilder: FormBuilder) {
    this.product = data.product;
    this.category = data.category;
    console.log(this.product)
  }
  getCategories(): void{
    this.categoryService.findAllCategories().subscribe(data => this.categories = data);
  }
  ngOnInit(): void {

    this.getCategories();

    this.productForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      fileName: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required])
    });
    this.productForm.get('name').setValue(this.product?.name);
    this.productForm.get('description').setValue(this.product?.description);
    this.productForm.get('price').setValue(this.product?.price);
    this.productForm.get('fileName').setValue(this.product?.fileName);
    this.productForm.get('category').setValue(this.product?.category);

    
    
  }
  


  close(): void{
    console.log("test" + this.category);
    console.log(this.product)
    this.dialogRef.close();

  }
  selectFile(file): void{
    this.currentFileUpload = file.target.files[0];
  }

  save() : void{
    
    this.getCategories();
    const formData = new FormData();
    const user = this.tokenStorageService.getUser();
    const product: any = {
      id: this.product?.id,
      name : this.productForm.controls.name.value,
      description: this.productForm.controls.description.value,
      category:this.productForm.controls.category.value,
      //category_id: this.productForm.controls.category.value.id, 
     
      fileName: this.currentFileUpload?.name,
      price: this.productForm.controls.price.value,
    };
  
    if (this.product != null && this.currentFileUpload == null){
      product.fileName = this.product.fileName;
    }
      console.log(this.category);
    console.log(this.product?.category),
    console.log(this.product?.name),
    formData.append('product', JSON.stringify(product));

    formData.append('user',JSON.stringify(user));
    
    
    if (this.currentFileUpload != null){
      formData.append('file', this.currentFileUpload, this.currentFileUpload.name);
    }

    if (this.product === undefined){
      this.productService.findProductByName(product.name).subscribe(isExist => {
        if (isExist === false && this.currentFileUpload != null) {
          this.productService.postProduct(formData).subscribe(response => {
            this.dialogRef.close(response);
            this.productService.findAllProducts();
          });
          this.dialogRef.close();
        }
        else{
          this.alreadyExists = true;
        }
      });
    } else{

      product.id = this.product.id;

      this.productService.updateProductById(this.product.id, formData).subscribe(response =>
        this.dialogRef.close(response));
    }
  }

}
