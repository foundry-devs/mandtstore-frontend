import { Eyebrow } from "@/components/ui/eyebrow";
import { Icon, type IconName } from "@/components/ui/icon";
import { OpenShortlistButton } from "@/features/shortlist";

const steps: { title: string; text: string; icon: IconName }[] = [
  {
    title: "Find something you love",
    text: "Explore the collection and add your favourites to an enquiry shortlist. Your list stays saved in this browser.",
    icon: "heart",
  },
  {
    title: "Let’s talk about the details",
    text: "Prepare a message with your list. Ask M&T to confirm the actual product, price in LKR, size, and availability.",
    icon: "sun",
  },
  {
    title: "Make it yours",
    text: "Confirm payment and delivery arrangements with M&T before ordering. Adding to your list does not place an order.",
    icon: "bag",
  },
];

export function HowToOrder() {
  return (
    <section
      className="page-wrap grid grid-cols-[0.85fr_1.15fr] gap-22.5 pt-19.75 pb-18.25 max-lg:gap-16.25 max-md:gap-10.5 max-md:py-15 max-sm:grid-cols-1 max-sm:gap-7.5 max-sm:py-11"
      id="how-to-order"
      aria-labelledby="how-title"
    >
      <div>
        <Eyebrow>FROM FINDING TO FAVOURITE</Eyebrow>
        <h2
          id="how-title"
          className="mt-4 mb-5 max-md:text-[43px] max-sm:text-[44px]"
        >
          Shopping, with <br className="max-sm:hidden" />a{" "}
          <em>personal touch.</em>
        </h2>
        <p className="text-[12px] leading-[1.8] text-muted max-sm:text-[11px]">
          Start with what catches your eye.
          <br />
          We’ll take it one little step at a time.
        </p>
        <OpenShortlistButton className="mt-5.75 max-sm:mt-3.25">
          Make your little list <Icon name="arrow" />
        </OpenShortlistButton>
      </div>
      <div>
        {steps.map((step, index) => (
          <article
            key={step.title}
            className="flex items-start gap-5.5 border-b border-line py-6.25 first:pt-1.75 last:border-b-0 last:pb-0 max-md:gap-3.75 max-sm:gap-5.25 max-sm:py-5.5"
          >
            <span className="font-serif text-[30px] leading-[1.2] text-[#a88170]">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="mb-2 font-serif text-[25px] leading-[1.3] max-md:text-[23px] max-sm:text-[24px]">
                {step.title}
              </h3>
              <p className="max-w-89 text-[12px] leading-[1.9] text-muted max-sm:text-[11px]">
                {step.text}
              </p>
            </div>
            <Icon
              name={step.icon}
              className="mt-1.25 ml-auto size-6 stroke-[1.1] text-[#a77e6c] max-md:hidden max-sm:block max-sm:size-4.75"
            />
          </article>
        ))}
      </div>
    </section>
  );
}
