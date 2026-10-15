import { Eyebrow } from "@/components/ui/eyebrow";
import { Icon } from "@/components/ui/icon";

const questions = [
  {
    question: "Can I order these products right now?",
    answer:
      "This is a first look at the M&T storefront. The products and photography are illustrative. Actual inventory, prices, and ordering contact details are still to be added. You can explore and prepare a shortlist, but this site does not take orders or payments.",
  },
  {
    question: "How will I know the final price?",
    answer:
      "Ask M&T to confirm the product price in Sri Lankan rupees (LKR), any delivery charge, and the total before agreeing to an order. No prices or delivery fees have been set in this sample collection.",
  },
  {
    question: "What about delivery and returns?",
    answer:
      "Delivery areas, timelines, payment methods, and the returns policy will be confirmed by M&T. Check these details before placing an order; they are not yet published here.",
  },
];

export function Faq() {
  return (
    <section
      className="page-wrap grid grid-cols-[0.85fr_1.15fr] gap-22.5 border-t border-line pt-10.5 pb-16.25 max-lg:gap-16.25 max-md:gap-10.5 max-md:pt-9.5 max-md:pb-13 max-sm:grid-cols-1 max-sm:gap-4.5 max-sm:pt-8.25 max-sm:pb-10.5"
      aria-labelledby="faq-title"
    >
      <div>
        <Eyebrow>THE LITTLE DETAILS</Eyebrow>
        <h2
          id="faq-title"
          className="mt-3 text-[41px] max-md:text-[38px] max-sm:text-[39px]"
        >
          Good questions.
        </h2>
      </div>
      <div>
        {questions.map((item) => (
          <details
            key={item.question}
            className="group border-b border-line text-[12px]"
          >
            <summary className="flex cursor-pointer list-none justify-between gap-3.5 py-4.5 max-md:text-[11px] [&::-webkit-details-marker]:hidden">
              {item.question}
              <Icon
                name="plus"
                className="mt-0.5 size-3.75 text-wine transition-transform duration-200 group-open:rotate-45"
              />
            </summary>
            <p className="pr-6.75 pb-5 text-[12px] leading-[1.85] text-muted max-sm:text-[11px]">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
