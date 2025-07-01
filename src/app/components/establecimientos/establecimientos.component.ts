import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

// PrimeNG Imports
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { MenuModule } from 'primeng/menu';
import { CardModule } from 'primeng/card';
import { PaginatorModule } from 'primeng/paginator';
import { TooltipModule } from 'primeng/tooltip';
import { SplitButtonModule } from 'primeng/splitbutton';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ContextMenuModule } from 'primeng/contextmenu';

// Models and Services
import { Establecimiento, TipoTramite } from '@/models/establecimiento.model';
import { EstablecimientoService } from '@/services/establecimiento.service';
import { TipoTramiteEnum } from '@/enums/establecimiento.enums';

// PrimeNG Types
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-establecimientos',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    TagModule,
    MenuModule,
    CardModule,
    PaginatorModule,
    TooltipModule,
    SplitButtonModule,
    InputGroupModule,
    InputGroupAddonModule,
    ContextMenuModule
  ],
  templateUrl: './establecimientos.component.html',
  styleUrls: ['./establecimientos.component.scss']
})
export class EstablecimientosComponent implements OnInit {
  establecimientos: Establecimiento[] = [];
  loading = false;
  
  // Paginación
  totalRecords = 0;
  rows = 10;
  first = 0;
  
  // Búsqueda
  searchValue = '';
  
  // Opciones de menú para tramites (solo registro)
  tramiteItems: MenuItem[] = [];

  // Exponer el enum para usarlo en el template
  TipoTramiteEnum = TipoTramiteEnum;

  constructor(
    private establecimientoService: EstablecimientoService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadEstablecimientos();
    this.initializeTramiteItems();
  }

  loadEstablecimientos() {
    this.loading = true;
    const page = Math.floor(this.first / this.rows);
    
    this.establecimientoService.getEstablecimientos(page, this.rows, this.searchValue)
      .subscribe({
        next: (response) => {
          this.establecimientos = response.content;
          this.totalRecords = response.totalElements;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error cargando establecimientos:', error);
          this.loading = false;
        }
      });
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    this.loadEstablecimientos();
  }

  onSearch() {
    this.first = 0;
    this.loadEstablecimientos();
  }

  clearSearch() {
    this.searchValue = '';
    this.onSearch();
  }

  initializeTramiteItems() {
    this.tramiteItems = [
      {
        label: 'Registro',
        icon: 'pi pi-plus',
        command: (event) => this.crearTramite(TipoTramiteEnum.REGISTRO)
      },
      {
        label: 'Activación',
        icon: 'pi pi-check',
        command: (event) => this.crearTramite(TipoTramiteEnum.ACTIVACION)
      },
      {
        label: 'Inactivación',
        icon: 'pi pi-times',
        command: (event) => this.crearTramite(TipoTramiteEnum.INACTIVACION)
      },
      {
        label: 'Actualización',
        icon: 'pi pi-refresh',
        command: (event) => this.crearTramite(TipoTramiteEnum.ACTUALIZACION)
      }
    ];
  }

  crearTramite(tipoTramite: TipoTramiteEnum, establecimientoId?: number) {
    if (tipoTramite === TipoTramiteEnum.REGISTRO) {
      // Navegar al proceso de acreditación para registro
      this.router.navigate(['/proceso-acreditacion'], {
        queryParams: { 
          tramite: tipoTramite,
          establecimientoId: establecimientoId || 5 // ID por defecto para el ejemplo
        }
      });
    } else {
      // Implementar lógica para otros tipos de trámite
      console.log(`Crear trámite: ${tipoTramite}`, establecimientoId);
    }
  }

  solicitarInspeccion(establecimientoId: number) {
    console.log('Solicitar inspección para:', establecimientoId);
    // Implementar lógica de solicitud de inspección
  }

  descargarCertificado(establecimientoId: number) {
    console.log('Descargar certificado para:', establecimientoId);
    // Implementar lógica de descarga de certificado
  }

  verRegistros(establecimientoId: number) {
    console.log('Ver registros para:', establecimientoId);
    // Implementar lógica para ver registros
  }

  mostrarMenuTramite(event: any, establecimientoId: number) {
    // Crear menú dinámico para este establecimiento específico
    const menuItems: MenuItem[] = [
      {
        label: 'Registro',
        icon: 'pi pi-plus',
        command: () => this.crearTramite(TipoTramiteEnum.REGISTRO, establecimientoId)
      },
      {
        label: 'Activación',
        icon: 'pi pi-check',
        command: () => this.crearTramite(TipoTramiteEnum.ACTIVACION, establecimientoId)
      },
      {
        label: 'Inactivación',
        icon: 'pi pi-times',
        command: () => this.crearTramite(TipoTramiteEnum.INACTIVACION, establecimientoId)
      },
      {
        label: 'Actualización',
        icon: 'pi pi-refresh',
        command: () => this.crearTramite(TipoTramiteEnum.ACTUALIZACION, establecimientoId)
      }
    ];

    // Por ahora solo ejecutamos registro directamente
    this.crearTramite(TipoTramiteEnum.REGISTRO, establecimientoId);
  }

  getSeverity(status: string): "success" | "secondary" | "info" | "warn" | "danger" | "contrast" | undefined {
    return this.establecimientoService.getSeverity(status);
  }

  // Método para calcular el total de establecimientos por nombre comercial
  calculateEstablecimientoTotal(nombreComercial: string): number {
    let total = 0;
    if (this.establecimientos) {
      for (let establecimiento of this.establecimientos) {
        if (establecimiento.nombreComercial === nombreComercial) {
          total++;
        }
      }
    }
    return total;
  }

  // Verificar si es el primer establecimiento con este nombre (para rowspan)
  isFirstInGroup(establecimiento: Establecimiento, index: number): boolean {
    if (index === 0) return true;
    return this.establecimientos[index - 1].nombreComercial !== establecimiento.nombreComercial;
  }

  // Obtener el rowspan para el grupo
  getRowSpan(establecimiento: Establecimiento, index: number): number {
    if (!this.isFirstInGroup(establecimiento, index)) return 0;
    
    let span = 1;
    for (let i = index + 1; i < this.establecimientos.length; i++) {
      if (this.establecimientos[i].nombreComercial === establecimiento.nombreComercial) {
        span++;
      } else {
        break;
      }
    }
    return span;
  }
}