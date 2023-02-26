import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
	selector: 'app-example-dialog',
	templateUrl: 'dialog.component.html',
})
export class dialog implements OnInit {
	items: any;
	cartValue: number = 0;
	displayedColumns: string[] = ['demo-position', 'demo-name', 'demo-weight']
	constructor(
		public dialogRef: MatDialogRef<dialog>,
		@Inject(MAT_DIALOG_DATA) public data: any) { }
	ngOnInit(): void {
		this.items = this.data

		this.calculate(this.items)
	}
	onCancel(): void {
		this.dialogRef.close();
	}


	calculate(data: any) {
		console.log(data, 'here');
		console.log(data.length);
		this.cartValue = 0;
		for (let i = 0; i < data.length; i++) {
			this.cartValue = this.cartValue + data[i].value
		}
	}


}

