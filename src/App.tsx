"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  Upload,
  User,
  Phone,
  MapPin,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

const companyLogos = [
  "https://m.media-amazon.com/images/I/51q9K29gSkS._AC_UF1000,1000_QL80_.jpg",
  "/services/s-1.png",
  "/services/s-2.png",
  "/services/s-3.png",
  "/services/s-4.png",
  "/services/s-5.png",
  "https://5.imimg.com/data5/SELLER/Default/2022/10/GL/ND/JV/151439305/shop-sign-board-500x500.jpg",
  "/services/s-6.png",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-vWkZqii4fC0aErFtdI_i46chEw-rDvg4RS3qS2vrJs37tLxWJXdzX4T9Nmbn0Xjj84o&usqp=CAU",
  "/services/s-7.png",
  "/services/s-8.png",
  "/services/s-9.png",
  "https://img1.exportersindia.com/product_images/bc-full/2023/9/9312251/neon-led-sign-board-1633500148-6024951.jpg",
];

type FormData = {
  name: string;
  contactNumber: string;
  location: string;
  image: File | null;
};

type FormErrors = {
  [K in keyof FormData]?: string;
};

export default function App() {
  const [currentLogo, setCurrentLogo] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    contactNumber: "",
    location: "",
    image: null,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLogo((prev) => (prev + 1) % companyLogos.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === "image" && files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    let newErrors: FormErrors = {};
    if (formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    }
    if (!/^\+?[1-9]\d{1,14}$/.test(formData.contactNumber)) {
      newErrors.contactNumber = "Please enter a valid phone number.";
    }
    if (formData.location.length < 2) {
      newErrors.location = "Location must be at least 2 characters.";
    }
    if (!formData.image) {
      newErrors.image = "Profile image is required.";
    } else if (formData.image.size > 5000000) {
      newErrors.image = "Image must be less than 5MB.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log(formData);
      setIsSubmitted(true);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen  from-primary/5 via-primary/10 to-primary/20 flex items-center justify-center p-4 sm:p-6 md:p-8">
      <TooltipProvider>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-lg"
        >
          <Card className="bg-white/95 backdrop-blur-md shadow-2xl overflow-hidden rounded-2xl">
            <CardHeader className=" text-primary-foreground p-6 sm:p-8 relative overflow-hidden">
              <motion.div
                className="absolute inset-0 "
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                {/* <svg
                  className="absolute bottom-0 left-0 right-0"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 1440 320"
                >
                  <path
                    fill="rgba(255,255,255,0.1)"
                    fillOpacity="1"
                    d="M0,128L48,138.7C96,149,192,171,288,165.3C384,160,480,128,576,128C672,128,768,160,864,181.3C960,203,1056,213,1152,202.7C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                  ></path>
                </svg> */}
              </motion.div>
              <CardTitle className="text-3xl sm:text-4xl font-bold text-center mb-2 relative z-10 flex justify-center items-center">
                <img
                  src="https://invtechnologies.in/img/icon-11.png"
                  alt="INV Logo"
                  className="w-2/2 h-1/2"
                />
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 sm:p-8">
              <div className="w-full max-w-xs mx-auto mb-8">
                <motion.div
                  className="flex justify-center items-center h-[180px] overflow-hidden"
                  animate={{
                    x: `-${currentLogo * (100 / companyLogos.length)}%`,
                  }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  style={{ width: `${companyLogos.length * 200}%` }}
                >
                  {companyLogos.concat(companyLogos).map((logo, index) => (
                    <div
                      className="w-full h-full flex justify-center items-center "
                      key={index}
                    >
                      <img
                        key={index}
                        src={logo}
                        alt={`Company logo ${index + 1}`}
                        className="w-[60%] h-[100%]"
                        style={{
                          flex: "0 0 auto",
                          // width: `${100 / companyLogos.length}%`,
                        }}
                      />
                    </div>
                  ))}
                </motion.div>
              </div>

              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5 }}
                    className="text-center py-8"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        delay: 0.2,
                        type: "spring",
                        stiffness: 200,
                        damping: 10,
                      }}
                    >
                      <CheckCircle className="w-16 sm:w-24 h-16 sm:h-24 text-green-500 mx-auto mb-4 sm:mb-6" />
                    </motion.div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3 sm:mb-4">
                      Thank You for Reaching Out!
                    </h2>
                    <p className="text-lg sm:text-xl text-gray-600 max-w-md mx-auto">
                      We've Get Back You Soon
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <p className="text-center text-lg text-black">
                      Submit your Request
                    </p>
                    <FormField
                      name="name"
                      label="Full Name"
                      icon={<User className="w-4 sm:w-5 h-4 sm:h-5" />}
                      value={formData.name}
                      onChange={handleInputChange}
                      error={errors.name}
                      placeholder="John Doe"
                    />

                    <FormField
                      name="contactNumber"
                      label="Contact Number"
                      icon={<Phone className="w-4 sm:w-5 h-4 sm:h-5" />}
                      value={formData.contactNumber}
                      onChange={handleInputChange}
                      error={errors.contactNumber}
                      placeholder="+1234567890"
                    />

                    <FormField
                      name="location"
                      label="Location"
                      icon={<MapPin className="w-4 sm:w-5 h-4 sm:h-5" />}
                      value={formData.location}
                      onChange={handleInputChange}
                      error={errors.location}
                      placeholder="City, Country"
                    />

                    <div className="space-y-2">
                      <Label
                        htmlFor="image"
                        className="text-sm font-medium text-gray-700 flex items-center"
                      >
                        <Upload className="w-4 sm:w-5 h-4 sm:h-5 inline-block mr-2 text-primary" />
                        Profile Image
                      </Label>
                      <div className="flex items-center space-x-2">
                        <Input
                          id="image"
                          name="image"
                          type="file"
                          accept="image/*"
                          onChange={handleInputChange}
                          className="w-full text-sm sm:text-base transition-all duration-200 focus:ring-2 focus:ring-primary focus:border-transparent file:mr-4 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                        />
                      </div>
                      {errors.image && (
                        <p className="text-red-500 text-sm">{errors.image}</p>
                      )}
                      <p className="text-xs sm:text-sm text-gray-500">
                        Upload a professional profile image (max 5MB). This
                        helps us personalize our communication.
                      </p>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 text-base sm:text-lg py-4 sm:py-6 rounded-full group relative overflow-hidden"
                      disabled={isSubmitting}
                    >
                      <span className="relative z-10 flex items-center justify-center">
                        {isSubmitting ? "Submitting..." : "Submit"}
                        <ArrowRight className="ml-2 w-4 sm:w-5 h-4 sm:h-5 transition-transform duration-300 transform group-hover:translate-x-1" />
                      </span>
                      <span className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </CardContent>
            <CardFooter className="bg-primary/5 text-primary p-4 sm:p-6 text-center">
              <p className="text-xs sm:text-sm">
                For priority response, additional fees may apply. <br />
                INV Technologies © 2014 - {new Date().getFullYear()}
              </p>
            </CardFooter>
          </Card>
        </motion.div>
      </TooltipProvider>
    </div>
  );
}

function FormField({
  name,
  label,
  icon,
  value,
  onChange,
  error,
  placeholder,
}: {
  name: string;
  label: string;
  icon: React.ReactNode;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder: string;
}) {
  return (
    <motion.div
      className="space-y-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Label
        htmlFor={name}
        className="text-sm font-medium text-gray-700 flex items-center"
      >
        <span className="text-primary mr-2">{icon}</span>
        {label}
      </Label>
      <Input
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full text-sm sm:text-base transition-all duration-200 focus:ring-2 focus:ring-primary focus:border-transparent rounded-full"
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${name}-error` : undefined}
      />
      {error && (
        <p
          className="text-red-500 text-xs sm:text-sm"
          id={`${name}-error`}
          role="alert"
        >
          {error}
        </p>
      )}
    </motion.div>
  );
}
