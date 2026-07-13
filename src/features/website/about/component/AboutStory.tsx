import Image from "next/image";

export function AboutStory() {
  return (
    <section className="bg-[var(--home-surface)] px-5 py-14 sm:px-8 lg:px-[120px] lg:py-16">
      <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center xl:gap-20">
        <div>
          <h2 className="text-[34px] font-bold leading-[1.15] text-[var(--home-green-deep)] sm:text-[42px]">
            Our Story
          </h2>
          <div className="mt-6 max-w-[690px] space-y-5 text-[16px] leading-[1.45] text-[var(--home-muted)] sm:text-[18px]">
            <p>
              The Wonder Emporium was created with a simple vision: to build a
              place where readers discover meaningful books and authors find the
              tools, support, and audience they need to share their stories with
              the world.
            </p>
            <p>
              What began as a passion for storytelling has grown into a platform
              where books, audiobooks, education, leadership, and inspiration
              come together in one experience.
            </p>
          </div>
        </div>

        <div className="relative min-h-[260px] overflow-hidden bg-[var(--home-paper)] sm:min-h-[360px] lg:min-h-[330px] xl:min-h-[390px]">
          <Image
            src="/images/about/about-story.jpg"
            alt="A typewriter and paper on an outdoor table"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
