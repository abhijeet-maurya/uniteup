import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import HomeLogoSlider from "./components/HomeLogoSlider";

export default function Home() {
  return (
    <div className="h-full overflow-x-hidden">
      <div className="p-4 lg:p-6 md:block hidden"></div>
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between p-4 lg:p-6 max-w-7xl mx-auto">
        <div className="w-full lg:w-2/3 p-2 lg:pr-6">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
            <span className="text-4xl sm:text-5xl lg:text-6xl">UniteUp –</span>
            <span className="text-blue-500"> Where Teams Meet,</span>
            <span className="text-violet-600"> Work</span> and
            <span className="text-amber-500"> Thrive Together</span>
          </h1>
          <p className="text-base sm:text-lg italic mb-6 text-gray-700 dark:text-gray-200 leading-relaxed">
            Experience the future of productivity with UniteUp — your unified platform for effortless video meetings, team collaboration, smart task tracking, real-time chat, and personalized reminders. Everything your team needs, beautifully connected in one powerful, customizable space.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/Dashboard"
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors duration-300 text-center font-medium"
            >
              Get Started 
            </a>
            <a 
              href="/Features"
              className="bg-gray-700 dark:bg-gray-600 dark:hover:bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors duration-300 text-center font-medium flex items-center justify-center gap-2"
            >
              Explore Features
              <ChevronRight size={18} />
            </a>
          </div>
        </div>
        <div className="w-full lg:w-1/3 p-2 flex justify-center lg:justify-end">
          <Image
            src="/HomeBannerMain.png"
            alt="Hero Image"
            width={800}
            height={400}
            className="w-full max-w-md lg:max-w-lg h-auto object-cover scale-110"
          />
        </div>
      </div>
      <div className="py-4 mt-5 bg-gray-100 dark:bg-gray-800 w-[99vw] overflow-x-hidden">
        <HomeLogoSlider />
      </div>
    </div>
  );
}
