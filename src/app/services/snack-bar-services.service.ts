import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SnackBarServicesService {

  constructor(private snackBar: MatSnackBar) { }


  openSnackBar(msg: string) {
    this.snackBar.open(msg, 'close', {
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });
  }
}
