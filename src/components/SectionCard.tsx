import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export default function SectionCard({
  title,
  className,
  children,
}: {
  title: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={title} className="mx-auto mb-5 mt-5 w-full max-w-[90%]">
      <Card className={`w-full rounded-lg ${className}`}>
        <CardHeader>
          <CardTitle className="text-2xl font-medium lg:text-3xl">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </section>
  );
}
