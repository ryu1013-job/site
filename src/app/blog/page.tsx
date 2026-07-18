import { StaggerItem, StaggerReveal } from '~/components/motion/stagger-reveal';
import { Links } from '../_components/links';

const BlogPage = () => {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-16 p-8">
      <Links />

      <StaggerReveal className="flex flex-col gap-16">
        <StaggerItem className="flex flex-col gap-6 font-serif">
          <h2 className="text-lg">Blog</h2>
        </StaggerItem>
      </StaggerReveal>
    </div>
  );
};

export default BlogPage;
