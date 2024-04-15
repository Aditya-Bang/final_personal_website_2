import ContactForm from "@/components/ContactForm";
import Navbar from "@/components/Navbar";
import MyLinks from "@/components/MyLinks";

const Contact = () => {

  return (
    <div className="flex flex-col h-screen items-center p-5 gap-5">
      <Navbar />
      <div className="flex flex-row justify-center w-full h-full rounded-lg">
        <div className="rounded-lg basis-4/12">
          <ContactForm />
        </div>
      </div>
    </div>
  )
}

export default Contact