import { Separator } from "@/components/ui/separator";
import { Camera, Code2, Mail, MapPin, MessageSquare, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const LOGO_BANNER =
  "https://res.cloudinary.com/dvq3pcykn/image/upload/v1777486297/logo_with_banner_flogey.jpg";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Collections", href: "/collections" },
  { label: "About", href: "/about" },
];

const CATEGORIES = [
  { label: "Electronics", href: "/products?category=Electronics" },
  { label: "Fashion", href: "/products?category=Fashion" },
  { label: "Home & Living", href: "/products?category=Home" },
  { label: "Sports", href: "/products?category=Sports" },
  { label: "Books", href: "/products?category=Books" },
];

const SERVICES = [
  { label: "LMS Development", href: "/about" },
  { label: "Custom Software", href: "/about" },
  { label: "Web Applications", href: "/about" },
  { label: "API Development", href: "/about" },
  { label: "UI/UX Design", href: "/about" },
];

const SOCIALS = [
  { Icon: Code2, label: "GitHub", href: "https://github.com" },
  { Icon: MessageSquare, label: "Twitter", href: "https://twitter.com" },
  { Icon: Camera, label: "Instagram", href: "https://instagram.com" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 pt-14 pb-8 sm:px-6 lg:px-8">

        {/* ── Top grid ── */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">

          {/* Brand — spans 2 cols on lg */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block">
              <div className="relative h-14 w-60">
                <Image
                  src={LOGO_BANNER}
                  alt="Nexist"
                  fill
                  sizes="220px"
                  className="object-contain object-left"
                  priority
                />
              </div>
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Scalable LMS &amp; Cutting-Edge Software. We empower businesses
              and educators through innovative digital platforms and custom
              software solutions.
            </p>

            {/* Contact blurbs */}
            <ul className="mt-5 space-y-2">
              <li className="flex items-center gap-2 text-xs text-muted-foreground">
                <Mail className="h-3.5 w-3.5 shrink-0 text-primary" />
                <a href="mailto:hello@nexist.info" className="hover:text-foreground transition-colors">
                  hello@nexist.info
                </a>
              </li>
              <li className="flex items-center gap-2 text-xs text-muted-foreground">
                <Phone className="h-3.5 w-3.5 shrink-0 text-primary" />
                <a href="tel:+1234567890" className="hover:text-foreground transition-colors">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-start gap-2 text-xs text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 shrink-0 mt-0.5 text-primary" />
                <span>San Francisco, CA, USA</span>
              </li>
            </ul>

            {/* Socials */}
            <div className="mt-6 flex items-center gap-2.5">
              {SOCIALS.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground transition-all hover:border-primary hover:bg-primary/8 hover:text-primary"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground hover:translate-x-0.5 inline-block"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Categories
            </h4>
            <ul className="space-y-2.5">
              {CATEGORIES.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground inline-block"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Services
            </h4>
            <ul className="space-y-2.5">
              {SERVICES.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground inline-block"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        {/* ── Bottom bar ── */}
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Nexist. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <Link href="/about" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/about" className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
            <span>Built with Next.js &amp; TypeScript</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
