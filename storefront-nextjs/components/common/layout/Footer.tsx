import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-gray-900 py-10">
      <div className="container mx-auto">
        <div className="flex mb-8">
          <Button type="submit">Sample Data</Button>
        </div>

        <div className="flex flex-wrap justify-between">
          <div className="w-full sm:w-1/2 lg:w-1/4 mb-12">
            <h4 className="text-white mb-8">Categories</h4>
            <Link
              href=""
              className="text-gray-400 hover:text-indigo-600 transition-all duration-300"
            >
              Laptop
            </Link>
          </div>

          <div className="w-full sm:w-1/2 lg:w-1/4 mb-12">
            <h4 className="text-white mb-8">Help</h4>
            <Link
              href=""
              className="text-gray-400 hover:text-indigo-600 transition-all duration-300"
            >
              About
            </Link>
          </div>

          <div className="w-full sm:w-1/2 lg:w-1/4 mb-12">
            <h4 className="text-white mb-8">GET IN TOUCH</h4>
            <p className="text-gray-400">
              Etown 4, 364 Cong Hoa Street, Tan Binh District, Ho Chi Minh City
            </p>

            <div className="flex space-x-4 mt-6">
              <Link
                href="https://github.com/nashtech-garage/yas/"
                target="_blank"
                className="text-gray-400 hover:text-indigo-600 transition-all duration-300"
              >
                <Facebook />
              </Link>

              <Link
                href="https://github.com/nashtech-garage/yas/"
                target="_blank"
                className="text-gray-400 hover:text-indigo-600 transition-all duration-300"
              >
                <Instagram />
              </Link>

              <Link
                href="https://github.com/nashtech-garage/yas/"
                target="_blank"
                className="text-gray-400 hover:text-indigo-600 transition-all duration-300"
              >
                <Github />
              </Link>
            </div>
          </div>

          <div className="w-full sm:w-1/2 lg:w-1/4 mb-12">
            <h4 className="text-white mb-8">Newsletter</h4>

            <form>
              <div className="relative border-b-2 border-gray-200 mb-4">
                <input
                  className="bg-transparent w-full text-gray-400 focus:outline-none"
                  type="text"
                  name="email"
                  placeholder="yas-sample@yas.com"
                />
                <div className="absolute left-0 bottom-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300"></div>
              </div>

              <div className="mt-4">
                <button className="text-white bg-indigo-600 rounded-md hover:bg-white hover:text-indigo-600 transition-all duration-300 px-4 py-2">
                  <Link
                    href="https://github.com/nashtech-garage/yas/"
                    target="_blank"
                    className="text-dark"
                  >
                    Subscribe
                  </Link>
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-10">
          <div className="flex flex-wrap justify-center items-center space-x-4 mb-4">
            <Image
              src={"/icons/icon-pay-01.jpg"}
              alt="ICON_PAY"
              width={50}
              height={30}
            />
            <Image
              src={"/icons/icon-pay-02.jpg"}
              alt="ICON_PAY"
              width={50}
              height={30}
            />
            <Image
              src={"/icons/icon-pay-03.jpg"}
              alt="ICON_PAY"
              width={50}
              height={30}
            />
            <Image
              src={"/icons/icon-pay-04.jpg"}
              alt="ICON_PAY"
              width={50}
              height={30}
            />
          </div>
          <p className="text-center text-gray-400">
            Copyright &copy; {`${new Date().getFullYear()} `}
            All rights reserved | Distributed by
            <Link
              href=""
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              {" "}
              MS Shop
            </Link>{" "}
            with ❤️
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
