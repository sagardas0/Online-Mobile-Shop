import HomeHeroSection from "@/components/home/HomeHeroSection"; 
 
export default function Home() {
  return (
    <main  className="min-h-screen flex items-center justify-center w-full p-5">
      <div className="lg:w-[90%] ">
        < HomeHeroSection/>
      </div> 
    </main>
  );
}
