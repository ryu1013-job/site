import { Links } from './_components/links';
import { Log } from './_components/log';
import { ProfileHero } from './_components/profile-hero';
import { Socials } from './_components/socials';

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <div className="pb-10">
        <ProfileHero />
      </div>
      <div className="flex flex-col items-center gap-8">
        <Links />
        <Socials />
      </div>
      <div className="py-12">
        <Log />
      </div>
    </div>
  );
}
