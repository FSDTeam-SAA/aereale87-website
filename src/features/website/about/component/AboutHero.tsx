import Image from "next/image";

export function AboutHero() {
  return (
    <section className="relative min-h-[360px] overflow-hidden bg-[var(--home-green-deep)] sm:min-h-[430px] lg:min-h-[500px]">
      <Image
        src="/images/about/about-hero.jpg"
        alt="Books stacked in a warm library setting"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative mx-auto flex min-h-[360px] max-w-[1200px] items-center justify-center px-5 py-20 text-center sm:min-h-[430px] sm:px-8 lg:min-h-[500px]">
        <div className="max-w-[900px]">
          <h1 className="text-balance text-[40px] font-bold leading-[1.08] text-white sm:text-[58px] lg:text-[70px]">
            Where Stories, Wisdom & Creativity Come Together
          </h1>
          <p className="mx-auto mt-5 max-w-[850px] text-[15px] leading-[1.45] text-white sm:text-[18px]">
            The Wonder Emporium is more than a bookstore. It is a publishing
            platform, audiobook marketplace, and storytelling community
            dedicated to inspiring readers and empowering authors.
          </p>
        </div>
      </div>
    </section>
  );
}
