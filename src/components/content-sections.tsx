import Image from "next/image";
import { ShortlistButton } from "./shortlist-button";

export function Hero() {
  return (
    <section className="hero wrap" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow">
          <span className="tiny-line"></span> FROM INDIA, WITH LOVE
        </p>
        <h1 id="hero-title">
          Little finds.
          <br />
          <em>Lovely</em> living.
        </h1>
        <p className="hero-description">
          A touch of colour. A little everyday joy.
          <br />
          Discover lovely finds from India, brought closer to home in Sri Lanka.
        </p>
        <div className="hero-actions">
          <a className="button button-primary" href="#collection">
            Explore the collection{" "}
            <svg>
              <use href="#i-diagonal" />
            </svg>
          </a>
          <a className="text-link" href="#story">
            Meet M&T <span aria-hidden="true">→</span>
          </a>
        </div>
        <div className="hero-footnote">
          <span className="small-flower" aria-hidden="true">
            ✳
          </span>
          <span>
            For your wardrobe, your home,
            <br />
            and all the little moments in between.
          </span>
        </div>
      </div>
      <div className="hero-visual">
        <div className="hero-arch-outline" aria-hidden="true"></div>
        <div className="hero-photo">
          <Image
            src="/assets/hero.webp"
            alt="Illustrative boutique campaign: a woman wearing a sage floral kurta in a sunlit Indian courtyard"
            width={1536}
            height={1024}
            priority
            sizes="(max-width: 600px) 100vw, 50vw"
          />
          <div className="photo-caption">
            <div>
              <span>THE EVERYDAY EDIT</span>
              <p>
                A little colour.
                <br />A lot of character.
              </p>
            </div>
            <a
              href="#collection"
              className="circle-link"
              aria-label="Discover the everyday edit"
            >
              <svg>
                <use href="#i-diagonal" />
              </svg>
            </a>
          </div>
        </div>
        <div className="hero-seal" aria-label="The M and T edit">
          <span>THE M&T EDIT</span>
          <svg>
            <use href="#i-flower" />
          </svg>
          <em>lovely little finds</em>
        </div>
        <div className="image-note">
          A mood, a moment, a little inspiration.{" "}
          <span>01 / THE EVERYDAY EDIT</span>
        </div>
      </div>
    </section>
  );
}

export function ValuesBand() {
  return (
    <section className="values-band" aria-label="The M and T approach">
      <div className="wrap values-grid">
        <div>
          <svg>
            <use href="#i-box" />
          </svg>
          <p>
            <strong>Sourced in India</strong>
            <span>Brought closer to Sri Lanka</span>
          </p>
        </div>
        <div>
          <svg>
            <use href="#i-flower" />
          </svg>
          <p>
            <strong>Little things, lovely living</strong>
            <span>Style for you and your space</span>
          </p>
        </div>
        <div>
          <svg>
            <use href="#i-heart" />
          </svg>
          <p>
            <strong>A personal way to shop</strong>
            <span>Find it. Save it. Ask us about it.</span>
          </p>
        </div>
      </div>
    </section>
  );
}

export function Story() {
  return (
    <section className="story-section" id="story" aria-labelledby="story-title">
      <div className="story-inner wrap">
        <div className="story-title">
          <p className="eyebrow">TWO PLACES. ONE LITTLE STORE.</p>
          <h2 id="story-title">
            From India,
            <br />
            <em>with love.</em>
            <span className="story-flower" aria-hidden="true">
              ✳
            </span>
          </h2>
          <div className="origin-line">
            <span>INDIA</span>
            <span className="origin-route" aria-hidden="true">
              ✧ <i></i> →
            </span>
            <span>SRI LANKA</span>
          </div>
        </div>
        <div className="story-copy">
          <h3>
            Good finds have a way
            <br />
            of making a day feel better.
          </h3>
          <p>
            A favourite outfit. A finishing touch. Something lovely for your
            home. We believe the little things deserve a little attention.
          </p>
          <p>
            M&T brings goods sourced in India to shoppers in Sri Lanka. A small
            store with a simple idea: bring the things you love a little closer.
          </p>
          <a className="text-link" href="#how-to-order">
            A little about how we work{" "}
            <svg>
              <use href="#i-arrow" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

export function HowToOrder() {
  return (
    <section
      className="how-section wrap"
      id="how-to-order"
      aria-labelledby="how-title"
    >
      <div className="how-intro">
        <p className="eyebrow">FROM FINDING TO FAVOURITE</p>
        <h2 id="how-title">
          Shopping, with
          <br />a <em>personal touch.</em>
        </h2>
        <p>
          Start with what catches your eye.
          <br />
          We’ll take it one little step at a time.
        </p>
        <ShortlistButton className="text-link">
          Make your little list{" "}
          <svg>
            <use href="#i-arrow" />
          </svg>
        </ShortlistButton>
      </div>
      <div className="steps">
        <article>
          <span className="step-number">01</span>
          <div>
            <h3>Find something you love</h3>
            <p>
              Explore the collection and add your favourites to an enquiry
              shortlist. Your list stays saved in this browser.
            </p>
          </div>
          <svg>
            <use href="#i-heart" />
          </svg>
        </article>
        <article>
          <span className="step-number">02</span>
          <div>
            <h3>Let’s talk about the details</h3>
            <p>
              Prepare a message with your list. Ask M&T to confirm the actual
              product, price in LKR, size, and availability.
            </p>
          </div>
          <svg>
            <use href="#i-sun" />
          </svg>
        </article>
        <article>
          <span className="step-number">03</span>
          <div>
            <h3>Make it yours</h3>
            <p>
              Confirm payment and delivery arrangements with M&T before
              ordering. Adding to your list does not place an order.
            </p>
          </div>
          <svg>
            <use href="#i-bag" />
          </svg>
        </article>
      </div>
    </section>
  );
}

export function FrequentlyAskedQuestions() {
  return (
    <section className="faq-section wrap" aria-labelledby="faq-title">
      <div>
        <p className="eyebrow">THE LITTLE DETAILS</p>
        <h2 id="faq-title">Good questions.</h2>
      </div>
      <div className="faqs">
        <details>
          <summary>
            Can I order these products right now?
            <svg>
              <use href="#i-plus" />
            </svg>
          </summary>
          <p>
            This is a first look at the M&T storefront. The products and
            photography are illustrative. Actual inventory, prices, and ordering
            contact details are still to be added. You can explore and prepare a
            shortlist, but this site does not take orders or payments.
          </p>
        </details>
        <details>
          <summary>
            How will I know the final price?
            <svg>
              <use href="#i-plus" />
            </svg>
          </summary>
          <p>
            Ask M&T to confirm the product price in Sri Lankan rupees (LKR), any
            delivery charge, and the total before agreeing to an order. No
            prices or delivery fees have been set in this sample collection.
          </p>
        </details>
        <details>
          <summary>
            What about delivery and returns?
            <svg>
              <use href="#i-plus" />
            </svg>
          </summary>
          <p>
            Delivery areas, timelines, payment methods, and the returns policy
            will be confirmed by M&T. Check these details before placing an
            order; they are not yet published here.
          </p>
        </details>
      </div>
    </section>
  );
}

export function ClosingBanner() {
  return (
    <section className="closing-banner">
      <div className="wrap">
        <span className="closing-flower" aria-hidden="true">
          ✳
        </span>
        <div>
          <p className="eyebrow">SOMETHING CAUGHT YOUR EYE?</p>
          <h2>Start a lovely little list.</h2>
        </div>
        <ShortlistButton className="button button-primary">
          Open my shortlist{" "}
          <svg>
            <use href="#i-diagonal" />
          </svg>
        </ShortlistButton>
      </div>
    </section>
  );
}
