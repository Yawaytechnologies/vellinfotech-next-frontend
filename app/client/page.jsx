import HiringPartners from "@/components/Client/ClientLogos";
import OurClients from "@/components/Client/Clientour";

export const metadata = {
  title: "Our Clients | Vell InfoTech — Placement Partners",
  description:
    "Vell InfoTech partners with top companies including Accenture, Cognizant, HCL, Freshworks and more to place trained IT professionals.",
  alternates: { canonical: "https://www.vellinfotech.com/client" },
  openGraph: { title: "Our Clients | Vell InfoTech", url: "https://www.vellinfotech.com/client" },
};

function Clientpage() {
  return (
    <>
      <OurClients />
      <div className="">
        <HiringPartners />
      </div>
    </>
  );
}

export default Clientpage;
