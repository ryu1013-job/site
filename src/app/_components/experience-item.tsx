import { Badge } from '~/components/ui/badge';
import { TECH, type Experience, type TechKey } from '../_data/background';

function TechBadges({ techs }: { techs: TechKey[] }) {
  return (
    <div className="flex flex-wrap gap-2 font-sans">
      {techs.map((key) => {
        const { label, Icon } = TECH[key];
        return (
          <Badge key={key} variant="secondary" className="text-foreground/60">
            <Icon data-icon="inline-start" />
            {label}
          </Badge>
        );
      })}
    </div>
  );
}

export function ExperienceItem({ experience }: { experience: Experience }) {
  const { period, role, active, company, description, techs } = experience;

  return (
    <div className="flex flex-col gap-3 font-serif">
      <div className="flex w-fit gap-2 font-sans text-xs tabular-nums">
        <span>{period}</span>
        {active && (
          <div className="relative pl-0.5 pr-1">
            <span className="absolute top-1/2 right-0 size-2 -translate-y-1/2 animate-ping rounded-full bg-green-500" />
            <span className="absolute top-1/2 right-0 size-2 -translate-y-1/2 rounded-full bg-green-500" />
          </div>
        )}
        <span className="text-foreground/50">{role}</span>
      </div>
      <a
        href={company.href}
        className="underline-dotted"
        target="_blank"
        rel="noopener noreferrer"
      >
        {company.name}
      </a>
      <div className="text-xs/5 text-foreground/90">{description}</div>
      <TechBadges techs={techs} />
    </div>
  );
}
