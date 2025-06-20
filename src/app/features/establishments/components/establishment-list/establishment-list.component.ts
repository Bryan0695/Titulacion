import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule, Table } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { Establishment } from '../../../../core/interfaces/establishment.interface';
import { EstablishmentService } from '../../services/establishment.service';

@Component({
  selector: 'app-establishment-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    TagModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    ButtonModule,
    TooltipModule
  ],
  templateUrl: './establishment-list.component.html',
  styleUrls: ['./establishment-list.component.scss']
})
export class EstablishmentListComponent implements OnInit {
  establishments: Establishment[] = [];
  loading = true;
  searchValue = '';

  constructor(private establishmentService: EstablishmentService) {}

  ngOnInit() {
    this.loadEstablishments();
  }

  loadEstablishments() {
    this.loading = true;
    this.establishmentService.getEstablishmentsGrouped().subscribe({
      next: (data) => {
        this.establishments = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading establishments:', error);
        this.loading = false;
      }
    });
  }

  calculateEstablishmentTotal(nombreComercial: string): number {
    return this.establishments.filter(est => est.nombreComercial === nombreComercial).length;
  }

  getSeverity(estadoCatastro: string): string {
    switch (estadoCatastro) {
      case 'Registro PENDIENTE DE INSPECCION':
        return 'warn';
      case 'Revisar en "Ver Registros"':
        return 'info';
      case 'Sin Registro':
        return 'danger';
      default:
        return 'secondary';
    }
  }

  crearTramite(establishment: Establishment) {
    console.log('Crear trámite para:', establishment);
    // Aquí iría la lógica para crear un trámite
  }

  solicitarInspeccion(establishment: Establishment) {
    console.log('Solicitar primera inspección para:', establishment);
    // Aquí iría la lógica para solicitar inspección
  }

  descargarCertificado(establishment: Establishment) {
    console.log('Descargar certificado para:', establishment);
    // Aquí iría la lógica para descargar certificado
  }

  verRegistros(establishment: Establishment) {
    console.log('Ver registros para:', establishment);
    // Aquí iría la lógica para ver registros
  }

  onGlobalFilter(event: Event, table: Table) {
    const target = event.target as HTMLInputElement;
    if (target) {
      table.filterGlobal(target.value, 'contains');
    }
  }

  clearSearch(table: Table) {
    table.clear();
    this.searchValue = '';
  }
}