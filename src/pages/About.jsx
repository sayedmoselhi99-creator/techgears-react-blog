import React from "react";

export default function About() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-10 text-gray-800 dark:text-gray-200">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">
        About
      </h1>

      <div className="space-y-8 leading-relaxed">
        <section className="text-center">
          <p className="text-xl font-semibold">
            <strong>Welcome to Tech Gears Finds4You!</strong>
          </p>
          <p className="mt-3">
            Hi there! 👋 I'm <strong>Sayed Moselhi</strong>, and I created this
            blog to help everyday people find{" "}
            <strong>affordable, reliable, and trending tech gadgets</strong> on
            Amazon.
          </p>
          <p className="mt-2">
            Whether you're looking for the best wireless earbuds, smart home
            tools, or accessories for your phone or laptop, you're in the right
            place.
          </p>
        </section>

        <hr className="border-gray-300 dark:border-gray-700" />

        <section>
          <h2 className="text-2xl font-semibold mb-3">💡 Why This Blog?</h2>
          <p>
            I love discovering cool and useful gadgets — especially when they
            don’t cost a fortune! I test, review, and recommend{" "}
            <strong>budget-friendly tech</strong> to help you make better buying
            decisions without wasting time or money.
          </p>
        </section>

        <hr className="border-gray-300 dark:border-gray-700" />

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            🔍 What You'll Find Here
          </h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>✅ Honest product reviews</li>
            <li>✅ Top 5 or Top 10 gadget lists</li>
            <li>✅ Buying guides and comparisons</li>
            <li>✅ Links to Amazon deals and discounts</li>
          </ul>
        </section>

        <hr className="border-gray-300 dark:border-gray-700" />

        <section>
          <h2 className="text-2xl font-semibold mb-3">🛒 Affiliate Disclosure</h2>
          <p>
            Some of the links on this blog are{" "}
            <strong>Amazon affiliate links</strong>, which means I may earn a
            small commission if you make a purchase — at{" "}
            <strong>no extra cost to you</strong>. This helps me keep the blog
            running and free for you.
          </p>
        </section>

        <hr className="border-gray-300 dark:border-gray-700" />

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            🙌 Thank You for Visiting!
          </h2>
          <p>
            I’m always open to suggestions and feedback. Feel free to{" "}
            <a
              href="/contact"
              className="text-blue-600 dark:text-blue-400 underline"
            >
              contact me
            </a>{" "}
            if you have any questions or product requests!
          </p>
          <p>Let’s discover amazing tech gear together!</p>
        </section>

        <hr className="border-gray-300 dark:border-gray-700" />

        <section className="text-center space-y-2">
          <p>
            <strong>Your friend in gadgets,</strong>
          </p>
          <p className="font-medium">Sayed Moselhi</p>
          <p>Tech Gears Finds4You</p>
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
