import { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: ReactNode;
  backgroundImage?: string;
}

export function PageHeader({ title, description, children, backgroundImage }: PageHeaderProps) {
  return (
    <div 
      className={`relative py-[20rem] px-4 sm:px-6 lg:px-8 ${
        backgroundImage 
          ? "bg-cover bg-center bg-no-repeat" 
          : "bg-gradient-hero"
      }`}
      style={backgroundImage ? { backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${backgroundImage})` } : {}}
    >
      <div className="relative mx-auto max-w-7xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="mx-auto mt-6 max-w-3xl text-xl text-white/90">
            {description}
          </p>
        )}
        {children && (
          <div className="mt-8">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}