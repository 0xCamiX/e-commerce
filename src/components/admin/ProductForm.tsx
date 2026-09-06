'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import type { StoreProduct } from '@/lib/products';

export function ProductForm({ product }: { product?: StoreProduct }) {
  const router = useRouter();
  const [category, setCategory] = useState(product?.category ?? 'eolico');
  const [pending, setPending] = useState(false);

  async function onSubmit(formData: FormData) {
    setPending(true);
    const payload = {
      slug: String(formData.get('slug')),
      name: String(formData.get('name')),
      category,
      description: String(formData.get('description')),
      shortDescription: String(formData.get('shortDescription')),
      price: Number(formData.get('price')),
      sku: String(formData.get('sku') ?? ''),
      image: String(formData.get('image')),
      gallery: String(formData.get('gallery') ?? '')
        .split(',')
        .map(item => item.trim())
        .filter(Boolean),
      features: String(formData.get('features') ?? '')
        .split('\n')
        .map(item => item.trim())
        .filter(Boolean),
      polarProductId: String(formData.get('polarProductId') ?? '') || null,
      stock: Number(formData.get('stock') ?? 0),
      active: formData.get('active') === 'on',
      sizeInches: formData.get('sizeInches')
        ? Number(formData.get('sizeInches'))
        : null,
      coverageM2: formData.get('coverageM2')
        ? Number(formData.get('coverageM2'))
        : null,
    };

    const response = await fetch(
      product ? `/api/admin/products/${product.id}` : '/api/admin/products',
      {
        method: product ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      },
    );
    setPending(false);
    if (!response.ok) {
      toast.error('No se pudo guardar el producto');
      return;
    }
    toast.success('Producto guardado');
    router.push('/admin/productos');
    router.refresh();
  }

  return (
    <form action={onSubmit} className="max-w-2xl">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="name">Nombre</FieldLabel>
          <Input id="name" name="name" defaultValue={product?.name} required />
        </Field>
        <Field>
          <FieldLabel htmlFor="slug">Slug</FieldLabel>
          <Input id="slug" name="slug" defaultValue={product?.slug} required />
        </Field>
        <Field>
          <FieldLabel>Categoría</FieldLabel>
          <Select
            value={category}
            onValueChange={value => setCategory(value as typeof category)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Categoría" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="eolico">Extractor eólico</SelectItem>
                <SelectItem value="hongo">Tipo hongo</SelectItem>
                <SelectItem value="pintura">Pintura</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>
        <Field>
          <FieldLabel htmlFor="shortDescription">Resumen</FieldLabel>
          <Input
            id="shortDescription"
            name="shortDescription"
            defaultValue={product?.shortDescription}
            required
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="description">Descripción</FieldLabel>
          <Textarea
            id="description"
            name="description"
            defaultValue={product?.description}
            required
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="price">Precio COP</FieldLabel>
          <Input
            id="price"
            name="price"
            type="number"
            defaultValue={product?.price}
            required
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="sku">SKU</FieldLabel>
          <Input id="sku" name="sku" defaultValue={product?.sku} />
        </Field>
        <Field>
          <FieldLabel htmlFor="image">Imagen principal</FieldLabel>
          <Input
            id="image"
            name="image"
            defaultValue={product?.image}
            required
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="gallery">
            Galería (URLs separadas por coma)
          </FieldLabel>
          <Textarea
            id="gallery"
            name="gallery"
            defaultValue={product?.gallery.join(', ')}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="features">
            Características (una por línea)
          </FieldLabel>
          <Textarea
            id="features"
            name="features"
            defaultValue={product?.features.join('\n')}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="polarProductId">Polar product ID</FieldLabel>
          <Input
            id="polarProductId"
            name="polarProductId"
            defaultValue={product?.polarProductId ?? ''}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="stock">Stock</FieldLabel>
          <Input
            id="stock"
            name="stock"
            type="number"
            defaultValue={product?.stock ?? 0}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="sizeInches">Pulgadas</FieldLabel>
          <Input
            id="sizeInches"
            name="sizeInches"
            type="number"
            defaultValue={product?.sizeInches ?? ''}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="coverageM2">Cobertura m²</FieldLabel>
          <Input
            id="coverageM2"
            name="coverageM2"
            type="number"
            defaultValue={product?.coverageM2 ?? ''}
          />
        </Field>
        <Field>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="active"
              defaultChecked={product?.active ?? true}
            />
            Activo en tienda
          </label>
        </Field>
      </FieldGroup>
      <Button className="mt-6" type="submit" disabled={pending}>
        {pending ? 'Guardando…' : 'Guardar'}
      </Button>
    </form>
  );
}
