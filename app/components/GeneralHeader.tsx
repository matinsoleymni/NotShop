interface HeaderProps {
  title: string;
  icons: React.ComponentType<React.SVGProps<SVGSVGElement>>[];
}

export default function GeneralHeader({ title, icons: IconComponent }: HeaderProps) {
  return (
    <header className="flex z-50 p-4 sticky top-0 w-full bg-white/50 dark:bg-black/50 backdrop-blur-3xl items-center justify-between mb-2 dark:text-white text-black">
        <h1>{title}</h1>
        <div className='flex items-center gap-2'>
            {IconComponent.map((Icon, index) => (
                <Icon key={index} className="fill-black dark:fill-white" />
            ))}
        </div>
    </header>
  );
}
