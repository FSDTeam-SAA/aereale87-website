import Image from "next/image";

export function AboutStory() {
  return (
    <section className="bg-[var(--home-surface)] px-5 py-14 sm:px-8 lg:px-[120px] lg:py-16">
      <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center xl:gap-20">
        <div>
          <h2 className="text-[34px] font-bold leading-[1.15] text-[var(--home-green-deep)] sm:text-[42px]">
            Our Story
          </h2>
          <div className="mt-6 max-w-[690px] space-y-5 text-[16px] leading-[1.6] text-[var(--home-muted)] sm:text-[17px]">
            <p>
              The Wonder Emporium was founded on a conviction: that some of the
              most powerful stories being written today are being written by
              authors the industry has overlooked.
            </p>
            <p>
              Seasoned. Skilled. Self-published. Authors who have spent years
              honing their craft, only to find the traditional gates closed and
              the algorithms indifferent. We built this platform because their
              voices deserved more than a slush pile — they deserved a stage.
            </p>
            <p>
              So we started with the author, not the algorithm. Every tool,
              every feature, every decision on this platform exists to answer
              one question first: does this serve the person who wrote the book?
            </p>
            <p>
              Because we believe that when authors are championed genuinely,
              structurally, readers are the ones who benefit. The stories get
              bolder. The voices get clearer. The public gets access to work
              that might otherwise have gone unheard.
            </p>
            <p>
              What began as a conviction has grown into a platform where books,
              audiobooks, education, and mentorship converge — built to give
              indie authors the audience, the tools, and the respect their work
              has always deserved.
            </p>
          </div>
        </div>

        <div className="relative min-h-[280px] self-stretch overflow-hidden bg-[var(--home-paper)] sm:min-h-[380px] lg:min-h-[480px]">
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
