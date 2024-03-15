"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { ModeToggle } from "../ModeToggle";

type Props = { title: string; href: string; description: string };

const Internal: Props[] = [
  {
    title: "Geburtstage",
    href: "/Internal/Geburtstage",
    description: "Geburtstagsliste d. Mitarbeiter",
  },
  {
    title: "CE Archiv",
    href: "/Internal/Archive",
    description: "CE Archiv nur halt nicht im INTREXX",
  },
  {
    title: "Signaturen",
    href: "/Internal/Signaturen",
    description: "Signaturen d. Mitarbeiter",
  },
  {
    title: "Zeit",
    href: "/Internal/Zeit",
    description: "Zeitumrechnung von Uhrzeit zu Dezimal",
  },
  {
    title: "RSS",
    href: "/Internal/RSS",
    description: "Aktueller RSS Feed von Heise Sec. und Dr. Datenschutz",
  },
  {
    title: "Kabelwand NYI",
    href: "/",
    description: "Hier könnte mal eine Kabelwand App kommen!",
  },
];

const Telefon: Props[] = [
  {
    title: "Kunden / Lieferanten",
    href: "/Telefon/Sage",
    description: "Eine Sage-Integration für Kunden und Lieferanten",
  },
  {
    title: "Mitarbeiter",
    href: "/Telefon/Mitarbeiter",
    description: "Telefonliste d. Mitarbeiter",
  },
  {
    title: "Lieferanten",
    href: "/Telefon/Lieferanten",
    description: "Lieferanten Liste m. AP oder Essen! ",
  },
];

const Service: Props[] = [
  {
    title: "Inventur",
    href: "/Service/Inventur",
    description: "Inventurdaten der letzten Jahre schick aufgearbeitet.",
  },
  {
    title: "CE SN",
    href: "/Service/Seriennummer",
    description: "Für CE SN - Artikelnamen generieren.",
  },
  {
    title: "Info Mail",
    href: "/Service/Mail",
    description: "Info Mail an Kunde.",
  },
  {
    title: "Warenlieferung",
    href: "/Service/Warenlieferung",
    description: "Generieren und versenden von Warenlieferungen",
  },
];

export function Menu() {
  return (
    <div className="sticky z-50 mx-auto flex h-min w-screen items-center justify-around bg-background">
      <Link href="/" className="text-xl font-semibold xl:text-4xl ">
        LocalHorst
      </Link>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Einkaufen
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Internal</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {Internal.map((component) => (
                  <ListItem key={component.title} {...component} />
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/QR" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                QR
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/Fritz" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Fritz
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Telefon</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {Telefon.map((component) => (
                  <ListItem key={component.title} {...component} />
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Service</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {Service.map((component) => (
                  <ListItem key={component.title} {...component} />
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/Werkstatt" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Werkstatt
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link
              href="http://10.0.0.64:3000"
              target="_blank"
              legacyBehavior
              passHref
            >
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                CMS
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <ModeToggle />
    </div>
  );
}

const ListItem = ({
  title,
  href,
  description,
}: {
  title: string;
  href: string;
  description: string;
}) => {
  return (
    <li key={title}>
      <NavigationMenuLink asChild>
        <Link
          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
          href={href}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {description}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
};
