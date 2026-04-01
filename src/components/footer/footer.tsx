export function Footer() {
  return (
    <footer className="relative z-10 px-8 pb-12 pt-4 md:px-16">
      <div className="h-px w-full bg-subtle" />
      <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <span className="font-body text-xs text-tertiary">
          BuiltBy.pro — 2026
        </span>
        <div className="flex gap-6">
          {/* TODO: Replace "#" with real URLs before launch */}
          {[
            { name: "GitHub", href: "#" },
            { name: "Twitter", href: "#" },
            { name: "LinkedIn", href: "#" },
          ].map((link) => (
            <a
              key={link.name}
              href={link.href}
              rel="noopener noreferrer"
              className="font-body text-xs text-tertiary transition-colors hover:text-accent"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
