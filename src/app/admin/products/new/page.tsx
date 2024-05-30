import AddProductForm from "@/components/products/AddProductForm";
import ProductForm from "@/components/products/ProductForm";
import Heading from "@/components/ui/Heading";
import ToastNotification from "@/components/ui/ToastNotification";

export default function NewProduct() {
  return (
    <>
      <Heading>Create New Product</Heading>
      <ToastNotification/>
      {/* Composition */}
      <AddProductForm>
        <ProductForm/>
      </AddProductForm>
    </>
  )
}
