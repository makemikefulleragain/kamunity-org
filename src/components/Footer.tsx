export default function Footer() {
  return (
    <footer className="text-center py-10 px-8 bg-ink text-parchment-dark">
      <div className="font-sans text-base font-bold mb-1">
        🔥 kamunity<span className="text-ku-light">.</span>
      </div>
      <p className="italic text-[0.85rem] text-fire-amber mb-1">
        Built with care, by the community, for the community.
      </p>
      <p className="font-sans text-[0.58rem] text-ink-faint">
        Perth, Western Australia · 2026
      </p>
      <div className="mt-4 flex gap-4 justify-center flex-wrap">
        {[
          { href: '#values', label: 'Values' },
          { href: '#showcase', label: 'Showcase' },
          { href: '/llms.txt', label: 'llms.txt' },
          { href: 'https://kamunityconsulting.com', label: 'Consulting' },
          { href: 'https://github.com/kamunity', label: 'GitHub' },
        ].map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="font-sans text-[0.55rem] text-parchment-edge no-underline uppercase tracking-[1px] hover:text-fire-amber transition-colors"
            {...(link.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            {link.label}
          </a>
        ))}
      </div>
    </footer>
  )
}
