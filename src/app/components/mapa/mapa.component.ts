import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Marcador } from 'src/app/classes/marcador.class';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MapaEditarComponent } from './mapa-editar.component';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  marcadores: Marcador[] = [];

  lat: number = -24.695752;
  lng: number = -65.402136;

  constructor(  private _snackBar: MatSnackBar,
                public dialog: MatDialog ) {

    if ( localStorage.getItem('marcadores')) {

      this.marcadores = JSON.parse(localStorage.getItem('marcadores') || "")
    }
  }

  ngOnInit(): void {}

  agregarMarcador( evento:any ) {

    const coords: {lat: number, lng: number} = evento.coords

    const nuevoMarcador = new Marcador(coords.lat, coords.lng)

    this.marcadores.push( nuevoMarcador )

    this.guardarMarcadores()
    this._snackBar.open('Marcador agregado', 'Cerrar', { duration: 3000});
  }

  guardarMarcadores() {

    localStorage.setItem('marcadores', JSON.stringify( this.marcadores) )
  }

  borrarMarcador(i: number) {

    this.marcadores.splice(i, 1),
    this.guardarMarcadores()
    this._snackBar.open('Marcador borrado', 'Cerrar',  { duration: 3000});
  }

  editarMarcador( marcador: Marcador ) {

    const dialogRef = this.dialog.open( MapaEditarComponent , {
      width: '250px',
      data: {titulo: marcador.titulo , descripcion: marcador.desc},
    });
    dialogRef.afterClosed().subscribe(result => {

      if( !result ) {
        return;
      };
      marcador.desc = result.desc
      marcador.titulo = result.titulo

      this.guardarMarcadores();
      this._snackBar.open('Marcador actualizado', 'Cerrar', { duration: 3000});
    });
  }
}
