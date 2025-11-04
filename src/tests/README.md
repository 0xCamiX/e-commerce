# Tests

Este directorio contiene todos los tests del proyecto.

## Estructura

```
src/tests/
├── components/     # Tests de componentes React
├── lib/            # Tests de funciones de utilidad
├── integration/    # Tests de integración
└── utils/          # Tests de utilidades y helpers
```

## Ejecutar tests

```bash
bun test
```

## Convenciones

- Los archivos de test deben terminar en `.test.ts` o `.test.tsx`
- Los tests deben estar cerca del código que prueban
- Usar nombres descriptivos para los tests

