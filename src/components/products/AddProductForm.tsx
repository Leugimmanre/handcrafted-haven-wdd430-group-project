"use client"
import { createProduct } from '@/actions/create-product-action';
import { ProductSchema } from '@/schema';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'react-toastify';

export default function AddProductForm({children}: {children : React.ReactNode}) {
    const router = useRouter()

    const handleSubmit = async (formData: FormData) => {
        const data = {
            name: formData.get('name'),
            price: formData.get('price'),
            description: formData.get('description'),
            categoryId: formData.get('categoryId'),
            artisanId: formData.get('artisanId'),
            image: formData.get('image'),
        }
        const result = ProductSchema.safeParse(data);
        if (!result.success) {
            result.error.issues.forEach(issue => {
                toast.error(issue.message)
            })
            return;
        }
        const response = await createProduct(result.data);
        if(response?.errors) {
            response.errors.forEach(issue => {
                toast.error(issue.message)
            })
            return;
        }

        toast.success('Product Created Successfully')
        router.push('/admin/products')

    }
  return (
    <div
        className="bg-white mt-10 px-5 py-10 rounded-md shadow-md max-w-3xl mx-auto"
    >
      <form
        action={handleSubmit}
        className="space-y-5"
    >
        {children}

        <input
            type="submit"
            value="Register Product"
            className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
        />

      </form>
    </div>
  )
}
