import { Component, OnInit } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { ButtonModule } from 'primeng/button';
import { InputIconModule } from 'primeng/inputicon';

interface Establecimiento {
    id: number;
    nombreComercial: { name: string; image: string };
    ubicacionEstablecimiento: { name: string };
    actividad: { name: string; code: string };
    numerosRegistro: string;
    estadoCatastro: string;
    searchableText?: string;
}

@Component({
    selector: 'app-establishments-list',
    templateUrl: './establishments-list.component.html',
    standalone: true,
    imports: [
        TableModule, 
        TagModule,
        CommonModule,
        InputTextModule,
        IconFieldModule,
        InputIconModule,
        ButtonModule
    ]
})
export class EstablishmentsListComponent implements OnInit {
    customers: Establecimiento[] = [];

    ngOnInit() {
        this.customers = [
            {
                id: 1,
                nombreComercial: { name: 'Supermercados La Favorita - Matriz', image: 'amyelsner.png' },
                ubicacionEstablecimiento: { name: 'Av. Amazonas N34-451 y Atahualpa, Quito' },
                actividad: { name: 'Venta al por menor en supermercados', code: 'ec' },
                numerosRegistro: 'EST-001-2024-SF',
                estadoCatastro: 'ACTIVO'
            },
            {
                id: 2,
                nombreComercial: { name: 'Supermercados La Favorita - Matriz', image: 'amyelsner.png' },
                ubicacionEstablecimiento: { name: 'Av. 6 de Diciembre N36-120, Quito' },
                actividad: { name: 'Venta al por menor en supermercados', code: 'ec' },
                numerosRegistro: 'EST-002-2024-SF',
                estadoCatastro: 'ACTIVO'
            },
            {
                id: 3,
                nombreComercial: { name: 'Farmacia Cruz Azul - Matriz', image: 'annafali.png' },
                ubicacionEstablecimiento: { name: 'Calle García Moreno 456, Cuenca' },
                actividad: { name: 'Venta de productos farmacéuticos', code: 'ec' },
                numerosRegistro: 'EST-003-2024-FCA',
                estadoCatastro: 'ACTIVO'
            },
            {
                id: 4,
                nombreComercial: { name: 'Farmacia Cruz Azul - Matriz', image: 'annafali.png' },
                ubicacionEstablecimiento: { name: 'Av. Solano 123, Cuenca' },
                actividad: { name: 'Venta de productos farmacéuticos', code: 'ec' },
                numerosRegistro: 'EST-004-2024-FCA',
                estadoCatastro: 'SUSPENDIDO'
            },
            {
                id: 5,
                nombreComercial: { name: 'Restaurante El Fogón - Principal', image: 'asiyajavayant.png' },
                ubicacionEstablecimiento: { name: 'Av. González Suárez 789, Quito' },
                actividad: { name: 'Servicios de restaurante', code: 'ec' },
                numerosRegistro: 'EST-005-2024-RF',
                estadoCatastro: 'ACTIVO'
            },
            {
                id: 6,
                nombreComercial: { name: 'Restaurante El Fogón - Principal', image: 'asiyajavayant.png' },
                ubicacionEstablecimiento: { name: 'Av. Maldonado 321, Quito' },
                actividad: { name: 'Servicios de restaurante', code: 'ec' },
                numerosRegistro: 'EST-006-2024-RF',
                estadoCatastro: 'INACTIVO'
            },
            {
                id: 7,
                nombreComercial: { name: 'Ferretería Los Andes - Central', image: 'onyamalimba.png' },
                ubicacionEstablecimiento: { name: 'Calle Rocafuerte 567, Ambato' },
                actividad: { name: 'Venta de productos ferreteros', code: 'ec' },
                numerosRegistro: 'EST-007-2024-FLA',
                estadoCatastro: 'ACTIVO'
            }
        ];

        // Preparar texto para búsqueda
        this.customers.forEach(customer => {
            customer.searchableText = [
                customer.nombreComercial.name,
                customer.ubicacionEstablecimiento.name,
                customer.actividad.name,
                customer.numerosRegistro,
                customer.estadoCatastro
            ].join(' ').toLowerCase();
        });
    }

    /**
     * Filtro personalizado para la tabla
     */
    customFilter(event: Event, table: Table) {
        const target = event.target as HTMLInputElement;
        const filterValue = target.value.toLowerCase();

        if (!filterValue) {
            table.reset();
            return;
        }

        const filteredData = this.customers.filter(customer => 
            customer.searchableText?.includes(filterValue)
        );

        table.filteredValue = filteredData;
        table.totalRecords = filteredData.length;
        table.first = 0; // Reset pagination to first page
    }

    /**
     * Determina la severidad del tag según el estado del catastro
     */
    getSeverity(estado: string): "success" | "secondary" | "info" | "warning" | "danger" | "contrast" | undefined {
        switch (estado.toUpperCase()) {
            case 'ACTIVO':
                return 'success';
            case 'SUSPENDIDO':
                return 'warning';
            case 'INACTIVO':
                return 'danger';
            default:
                return 'secondary';
        }
    }

    /**
     * Calcula el total de establecimientos por nombre comercial
     */
    calculateCommercialNameTotal(nombreComercial: string): number {
        return this.customers.filter(customer => 
            customer.nombreComercial.name === nombreComercial
        ).length;
    }

    /**
     * Acciones de los botones
     */
    onAdd(customer: Establecimiento) {
        console.log('Crear Trámite:', customer);
        // Implementar lógica de agregar
    }

    onCalendar(customer: Establecimiento) {
        console.log('Solicitar Primera Inscripción:', customer);
        // Implementar lógica de calendario
    }

    onDownload(customer: Establecimiento) {
        console.log('Descargar Certificado:', customer);
        // Implementar lógica de descarga
    }
}