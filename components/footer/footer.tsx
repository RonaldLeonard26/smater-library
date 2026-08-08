import Link from 'next/link';
import { SOCIAL_ITEMS } from '../navbar/nav.constants/footer-link';

export default function Footer() {
  return (
    <section className="container mx-auto px-6 py-4 border-t">
      <div className="flex items-start justify-evenly gap-4">
        {/* logo */}
        <h2 className="text-2xl text-teal-500 font-semibold">
          SMATER{' '}
          <span className="font-serif font-medium text-black">-l𝓲brary.</span>
        </h2>
        {/* Customer and office */}
        <div className="flex flex-col gap-4">
          <div>
            <h3 className="text-lg font-semibold ">Customer Service</h3>
            <p className="font-light text-muted-foreground">
              <Link href="mailto:hello@smatermofperpus.id">
                hello@smatermofperpus.id
              </Link>{' '}
              |{' '}
              <Link href="tel:+628223456790" className="text-muted-foreground">
                +62-822-3456-790
              </Link>
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Office</h3>
            <p className="font-light text-muted-foreground">
              Jl. Kimang Buleng 123, Maumere, Sikka, NTT
            </p>
          </div>
        </div>
        {/* icon-social */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Menu</h3>
          <div className="flex items-center gap-2">
            <div className="flex flex-col gap-5">
              {SOCIAL_ITEMS.map((item) => (
                <Link
                  key={`footer-sociel-${item.label}`}
                  href={`footer-social-${item.href}`}
                >
                  {item.icon}
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              {SOCIAL_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="cursor-pointer font-light "
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <p className="w-full text-center text-gray-600 pt-4">
        Copyright © 2026 Smater-l𝓲brary. All right reserved
      </p>
    </section>
  );
}
