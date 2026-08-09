'use client';

import { CheckCircle, Gauge, Ruler, Settings, Zap } from 'lucide-react';
import Link from 'next/link';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const specifications = [
  {
    size: '12"',
    diameter: '30.5 cm',
    airflow: '850 - 1,200 CFM',
    motor: 'Monofásico / Trifásico',
    voltage: '110V / 220V',
    transmission: 'Directa / Correas',
    recommended: false,
  },
  {
    size: '16"',
    diameter: '40.6 cm',
    airflow: '1,500 - 2,000 CFM',
    motor: 'Monofásico / Trifásico',
    voltage: '110V / 220V',
    transmission: 'Directa / Correas',
    recommended: false,
  },
  {
    size: '20"',
    diameter: '50.8 cm',
    airflow: '2,500 - 3,200 CFM',
    motor: 'Monofásico / Trifásico',
    voltage: '110V / 220V',
    transmission: 'Directa / Correas',
    recommended: true,
  },
  {
    size: '24"',
    diameter: '61 cm',
    airflow: '3,500 - 4,500 CFM',
    motor: 'Monofásico / Trifásico',
    voltage: '110V / 220V',
    transmission: 'Directa / Correas',
    recommended: false,
  },
  {
    size: '30"',
    diameter: '76.2 cm',
    airflow: '5,000 - 6,500 CFM',
    motor: 'Trifásico',
    voltage: '220V / 380V',
    transmission: 'Correas',
    recommended: false,
  },
  {
    size: '38"',
    diameter: '96.5 cm',
    airflow: '8,000 - 10,000 CFM',
    motor: 'Trifásico',
    voltage: '220V / 380V',
    transmission: 'Correas',
    recommended: false,
  },
];

const materials = [
  'Aluminio moldeado de alta calidad',
  'Acero galvanizado G-90',
  'Pintura epóxica resistente a la corrosión',
  'Componentes de acero inoxidable',
];

const warranty = {
  title: 'Garantía y Soporte',
  items: [
    '5 años de garantía en materiales y mano de obra',
    'Soporte técnico especializado',
    'Servicio de mantenimiento preventivo',
    'Asesoría en instalación y diseño',
  ],
};

export default function EspecificacionesExtractoresTipoHongo() {
  return (
    <section
      id="especificaciones"
      className="w-full bg-background py-12 md:py-16"
    >
      <MaxWidthWrapper>
        <div className="space-y-16">
          <div className="text-center">
            <h2 className="mb-4 text-2xl font-bold text-foreground md:text-3xl">
              Especificaciones Técnicas
            </h2>
            <p className="mx-auto max-w-2xl text-sm font-medium text-muted-foreground sm:text-base">
              Modelos disponibles y características técnicas para cada necesidad
            </p>
          </div>

          <Card className="overflow-hidden p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-primary hover:bg-primary">
                    <TableHead className="font-bold text-primary-foreground">
                      <span className="flex items-center gap-2">
                        <Ruler className="h-4 w-4" />
                        Tamaño
                      </span>
                    </TableHead>
                    <TableHead className="font-bold text-primary-foreground">
                      Diámetro
                    </TableHead>
                    <TableHead className="font-bold text-primary-foreground">
                      <span className="flex items-center gap-2">
                        <Gauge className="h-4 w-4" />
                        Flujo de Aire
                      </span>
                    </TableHead>
                    <TableHead className="font-bold text-primary-foreground">
                      <span className="flex items-center gap-2">
                        <Zap className="h-4 w-4" />
                        Motor
                      </span>
                    </TableHead>
                    <TableHead className="font-bold text-primary-foreground">
                      Voltaje
                    </TableHead>
                    <TableHead className="font-bold text-primary-foreground">
                      <span className="flex items-center gap-2">
                        <Settings className="h-4 w-4" />
                        Transmisión
                      </span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {specifications.map(spec => (
                    <TableRow
                      key={spec.size}
                      className={spec.recommended ? 'bg-accent/50' : ''}
                    >
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="text-base font-bold">
                            {spec.size}
                          </span>
                          {spec.recommended && <Badge>Popular</Badge>}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        {spec.diameter}
                      </TableCell>
                      <TableCell className="font-medium">
                        {spec.airflow}
                      </TableCell>
                      <TableCell className="font-medium">
                        {spec.motor}
                      </TableCell>
                      <TableCell className="font-medium">
                        {spec.voltage}
                      </TableCell>
                      <TableCell className="font-medium">
                        {spec.transmission}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <Card className="bg-muted/50 p-8">
              <h3 className="mb-4 text-base font-bold text-foreground sm:text-lg">
                Materiales de Construcción
              </h3>
              <ul className="space-y-3">
                {materials.map(material => (
                  <li
                    key={material}
                    className="flex items-start gap-3 text-sm font-medium text-muted-foreground"
                  >
                    <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                    <span>{material}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="bg-accent/30 p-8">
              <h3 className="mb-4 text-base font-bold text-foreground sm:text-lg">
                {warranty.title}
              </h3>
              <ul className="space-y-3">
                {warranty.items.map(item => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm font-medium text-muted-foreground"
                  >
                    <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          <Card className="bg-primary p-8 text-center">
            <h3 className="mb-4 text-lg font-bold text-primary-foreground sm:text-xl">
              ¿Necesitas asesoría personalizada?
            </h3>
            <p className="mb-6 text-sm font-medium text-primary-foreground/80 sm:text-base">
              Nuestro equipo de expertos te ayudará a elegir el modelo ideal
              para tu proyecto
            </p>
            <Button asChild variant="secondary" size="lg">
              <Link
                href="https://wa.me/573177525559?text=Hola,%20necesito%20asesoría%20sobre%20Extractores%20Tipo%20Hongo"
                target="_blank"
              >
                Solicitar Asesoría Gratuita
              </Link>
            </Button>
          </Card>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
