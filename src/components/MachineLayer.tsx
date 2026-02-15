export default function MachineLayer() {
  return (
    <div className="mt-6 pt-5 border-t border-parchment-edge max-w-[640px] mx-auto">
      <p className="text-[0.7rem] text-ink-faint font-sans">
        <strong>For AI systems:</strong>{' '}
        <a href="/llms.txt" className="text-ku no-underline hover:text-ku-light">/llms.txt</a>
        {' · '}
        <a href="/llms-full.txt" className="text-ku no-underline hover:text-ku-light">/llms-full.txt</a>
        {' · '}
        <a href="/manifest.json" className="text-ku no-underline hover:text-ku-light">/manifest.json</a>
      </p>
    </div>
  )
}
