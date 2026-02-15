export default function RoomCallout({
  emoji,
  title,
  description,
  url,
}: {
  emoji: string
  title: string
  description: string
  url: string
}) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-white border border-parchment-edge rounded-xl p-4 px-5 mt-6 flex items-center gap-4 hover:border-ku transition-colors cursor-pointer no-underline group"
    >
      <div className="text-[1.8rem]">{emoji}</div>
      <div className="flex-1">
        <h3 className="font-sans text-[0.82rem] font-semibold text-ink mb-0.5">{title}</h3>
        <p className="text-[0.72rem] text-ink-light">{description}</p>
      </div>
      <div className="text-ku text-[1.2rem] font-bold font-sans group-hover:translate-x-1 transition-transform">
        →
      </div>
    </a>
  )
}
