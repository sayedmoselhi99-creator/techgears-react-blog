import React from "react";

export default function AffiliateDisclosure() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-10 text-gray-800 dark:text-gray-200">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">
        Affiliate Disclosure
      </h1>

      <div className="space-y-6 leading-relaxed">
        <p>
          <strong>Tech Gears Finds4You</strong> is a participant in the{" "}
          <strong>Amazon Services LLC Associates Program</strong>, an affiliate
          advertising program designed to provide a way for websites to earn
          advertising fees by advertising and linking to{" "}
          <a
            href="https://www.amazon.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 underline"
          >
            Amazon.com
          </a>{" "}
          and other Amazon regional sites.
        </p>

        <p>
          Some links on this blog may be <strong>affiliate links</strong>, which
          means I may earn a small commission at no extra cost to you. I only
          recommend products that I believe provide{" "}
          <strong>real value</strong>.
        </p>

        <p>Thank you for supporting the blog!</p>

        <hr className="border-gray-300 dark:border-gray-700" />

        <section>
          <h2 className="text-xl font-semibold mb-3">
            📌 About Amazon Affiliate Program
          </h2>
          <p>
            As part of this program, we may display product links, banners, or
            widgets that track referrals through cookies. These cookies are used
            by Amazon to confirm sales that originated from our blog. We do not
            have access to any personal or payment information you provide to
            Amazon.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">📌 Transparency Commitment</h2>
          <p>
            Our readers’ trust is our top priority. Any product we recommend has
            been carefully reviewed or selected because it offers value or
            performance worth mentioning — not just for affiliate earnings.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">📌 Your Support Matters</h2>
          <p>
            When you click on affiliate links and make a purchase, you help keep{" "}
            <strong>Tech Gears Finds4You</strong> running. This allows us to
            continue sharing honest reviews, helpful guides, and curated
            recommendations.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">📧 Contact Us</h2>
          <p>
            If you have any questions about this disclosure or our affiliate
            relationships, please reach out at:
          </p>
          <p>
            📧{" "}
            <a
              href="mailto:sayedmoselhi99@gmail.com"
              className="text-blue-600 dark:text-blue-400 underline"
            >
              sayedmoselhi99@gmail.com
            </a>
          </p>
        </section>
      </div>
    </main>
  );
}
