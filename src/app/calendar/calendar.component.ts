import { Component, Inject, NgModule, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Moment } from 'moment';
import * as moment from 'moment';




@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})


export class CalendarComponent implements OnInit {
  dateChoisie: Date;
  dateDepart: Date;

  constructor(private dialogRef: MatDialogRef<CalendarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  choisirDate(date: any) {
    this.dateChoisie=new Date(date);
    
    this.dialogRef.close(this.dateChoisie);
   
  }

  fermerDialog() {
    this.dialogRef.close();
  }

  isDateDisponible(date: Moment): boolean {
    // Remplacez ce code par votre propre logique pour déterminer la disponibilité de la date.
    // Par exemple, vous pouvez vérifier si la date est dans un tableau de dates disponibles.
    const dateDisponible = true;
    
    return dateDisponible;
  }
  
  getJourClass(date: Moment): string {
    return this.isDateDisponible(date) ? 'disponible' : 'non-disponible';
  }

}
