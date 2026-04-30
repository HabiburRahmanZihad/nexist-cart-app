import { Separator } from "@/components/ui/separator";
import { Camera, Code2, MessageSquare } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const LOGO_BANNER = "https://res.cloudinary.com/dvq3pcykn/image/upload/v1777486297/logo_with_banner_flogey.jpg";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Collections", href: "/collections" },
  { label: "About", href: "/about" },
];

const SERVICES = [
  { label: "LMS Development", href: "/about" },
  { label: "Custom Software", href: "/about" },
  { label: "Web Applications", href: "/about" },
  { label: "API Development", href: "/about" },
  { label: "UI/UX Design", href: "/about" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-block">
              <div className="relative h-9 w-36">
                <Image
                  src={LOGO_BANNER}
                  alt="Nexist"
                  fill
                  sizes="144px"
                  className="object-contain object-left w-full h-full"
                />
              </div>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Scalable LMS &amp; Cutting-Edge Software. We empower businesses
              and educators through innovative digital platforms and custom
              software solutions.
            </p>
            <div className="mt-5 flex items-center gap-3">
              {[
                { Icon: Code2, label: "GitHub" },
                { Icon: MessageSquare, label: "Twitter" },
                { Icon: Camera, label: "Instagram" },
              ].map(({ Icon, label }) => (
                <button
                  key={label}
                  type="button"
                  aria-label={label}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <Icon className="h-4 w-4" />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Our Services
            </h4>
            <ul className="space-y-2.5">
              {SERVICES.map((s) => (
                <li key={s.label}>
                  <Link
                    href={s.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Get in Touch
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="https://www.nexist.info"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  nexist.info
                </a>
              </li>
              {["Support", "Partnerships", "Careers", "Blog"].map((item) => (
                <li key={item}>
                  <span className="cursor-pointer text-sm text-muted-foreground transition-colors hover:text-foreground">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Nexist. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Scalable LMS &amp; Cutting-Edge Software &mdash; Built with
            Next.js, TypeScript &amp; Redux Toolkit
          </p>
        </div>
      </div>
    </footer>
  );
}
