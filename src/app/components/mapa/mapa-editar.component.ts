import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Marcador } from 'src/app/classes/marcador.class';

@Component({
  selector: 'app-mapa-editar',
  templateUrl: './mapa-editar.component.html',
  styleUrls: ['./mapa-editar.component.css']
})
export class MapaEditarComponent implements OnInit {

  forma: FormGroup;

  constructor( public fb: FormBuilder,
               public dialogRef: MatDialogRef<MapaEditarComponent>,
               @Inject(MAT_DIALOG_DATA) public data: Marcador) {

     this.forma = fb.group({
       'titulo': data.titulo,
       'desc'  : data.desc
     });
  }

  ngOnInit(): void {
  }

  guardarCambios() {
    this.dialogRef.close(this.forma.value);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
