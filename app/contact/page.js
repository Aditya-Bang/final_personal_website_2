import ContactForm from "@/components/ContactForm";
import Navbar from "@/components/Navbar";

const Contact = () => {

  return (
    <div className="flex flex-col h-screen items-center p-5 gap-5 pr-20 pl-20">
      <Navbar />
      <div className="flex flex-row bg-green-500 w-full h-full rounded-lg">
        <div className="rounded-lg basis-4/12">
          <ContactForm />
        </div>
      </div>
    </div>
  )
}

export default Contact