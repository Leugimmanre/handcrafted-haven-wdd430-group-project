
export default function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="text-4xl font-bold my-10 sm:text-center">
        {children}
    </h1>
  )
}
