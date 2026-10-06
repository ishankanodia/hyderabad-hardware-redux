import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';

const LAST_UPDATED = '5 October 2026';
const CONTACT_EMAIL = 'hydexcl@gmail.com';

const sections = [
  { id: 'who-we-are', title: 'Who We Are' },
  { id: 'information-we-collect', title: 'Information We Collect' },
  { id: 'how-we-use', title: 'How We Use Your Information' },
  { id: 'third-parties', title: 'Third-Party Services' },
  { id: 'cookies', title: 'Cookies & Tracking' },
  { id: 'retention', title: 'Data Retention' },
  { id: 'security', title: 'Security' },
  { id: 'your-rights', title: 'Your Rights' },
  { id: 'children', title: "Children's Privacy" },
  { id: 'changes', title: 'Changes to This Policy' },
  { id: 'contact', title: 'Contact & Grievances' },
];

const thirdParties = [
  {
    name: 'Formspree',
    purpose: 'Delivers messages submitted through our contact form to our inbox.',
    url: 'https://formspree.io/legal/privacy-policy/',
  },
  {
    name: 'Google Maps',
    purpose: 'Displays the embedded map of our showroom location on the Contact page.',
    url: 'https://policies.google.com/privacy',
  },
  {
    name: 'Google Fonts',
    purpose: 'Serves the typefaces used across this website.',
    url: 'https://policies.google.com/privacy',
  },
  {
    name: 'GitHub Pages',
    purpose: 'Hosts this website and may log technical request data such as IP addresses.',
    url: 'https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement',
  },
  {
    name: 'WhatsApp',
    purpose: 'Opens a chat with us when you tap a WhatsApp button or link.',
    url: 'https://www.whatsapp.com/legal/privacy-policy',
  },
  {
    name: 'Instagram',
    purpose: 'Opens our Instagram profile when you follow a link to it.',
    url: 'https://privacycenter.instagram.com/policy',
  },
];

const Section = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => (
  <section id={id} className="scroll-mt-28 pt-12 first:pt-0">
    <h2 className="text-2xl md:text-3xl font-serif font-medium text-foreground mb-5">{title}</h2>
    <div className="space-y-4 text-muted-foreground leading-relaxed">{children}</div>
  </section>
);

const PrivacyPolicy = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-card">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="text-primary text-sm font-medium tracking-widest uppercase">
              Legal
            </span>
            <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-foreground leading-tight">
              Privacy{' '}
              <span className="text-gradient-metal">Policy</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
              How Hyderabad Hardware collects, uses, and protects the information you share with us
              through this website.
            </p>
            <p className="mt-4 text-sm text-muted-foreground">Last updated: {LAST_UPDATED}</p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-12 lg:gap-16">
            {/* Table of contents */}
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <h2 className="text-xs font-semibold tracking-widest uppercase text-primary mb-4">
                Contents
              </h2>
              <nav>
                <ol className="space-y-2 border-l border-border">
                  {sections.map((s) => (
                    <li key={s.id}>
                      <Link
                        to={{ hash: `#${s.id}` }}
                        className="block -ml-px pl-4 border-l border-transparent text-sm text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                      >
                        {s.title}
                      </Link>
                    </li>
                  ))}
                </ol>
              </nav>
            </aside>

            {/* Policy body */}
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="max-w-3xl divide-y divide-border [&>section]:pb-12"
            >
              <Section id="who-we-are" title="Who We Are">
                <p>
                  This website, <span className="text-foreground">hyderabadhardware.com</span>, is
                  operated by Hyderabad Hardware, a premium interior-hardware showroom located at Sai
                  Avenue, 198 &amp; 199, Kamalapuri Colony, Srinagar Colony Main Road, Hyderabad –
                  500073, Telangana, India. In this policy, “we”, “us”, and “our” refer to
                  Hyderabad Hardware.
                </p>
                <p>
                  We are committed to handling your personal data responsibly and in line with
                  applicable Indian law, including the Information Technology Act, 2000 and the
                  Digital Personal Data Protection Act, 2023.
                </p>
              </Section>

              <Section id="information-we-collect" title="Information We Collect">
                <p>
                  This is an informational website. You can browse it without creating an account or
                  telling us who you are. We collect personal information only when you choose to
                  share it:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <span className="text-foreground">Contact form:</span> your name, email address,
                    phone number (optional), and the message you write.
                  </li>
                  <li>
                    <span className="text-foreground">Direct contact:</span> any details you include
                    when you call, email, or message us on WhatsApp or Instagram.
                  </li>
                  <li>
                    <span className="text-foreground">Technical data:</span> when you load the site,
                    our hosting and content providers may automatically receive standard request
                    information such as your IP address, browser type, device, and the pages
                    requested.
                  </li>
                </ul>
                <p>
                  We do not ask for, and ask that you do not send us, sensitive information such as
                  financial account details, passwords, or government ID numbers through this
                  website.
                </p>
              </Section>

              <Section id="how-we-use" title="How We Use Your Information">
                <p>We use the information you provide only to:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>respond to your enquiries and consultation requests;</li>
                  <li>share product information, quotations, or showroom appointment details you ask for;</li>
                  <li>follow up on projects, orders, or collaborations you have discussed with us; and</li>
                  <li>keep the website secure and working properly.</li>
                </ul>
                <p>
                  By submitting the contact form or reaching out to us, you consent to us using your
                  details for these purposes. <span className="text-foreground">We do not sell, rent,
                  or trade your personal information</span>, and we do not use it for unrelated
                  marketing without your permission.
                </p>
              </Section>

              <Section id="third-parties" title="Third-Party Services">
                <p>
                  We rely on a small number of trusted third-party services to run this website.
                  Each processes data under its own privacy policy:
                </p>
                <div className="mt-2 grid gap-3 sm:grid-cols-2">
                  {thirdParties.map((tp) => (
                    <a
                      key={tp.name}
                      href={tp.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block p-5 bg-card border border-border rounded-sm hover:border-primary/40 transition-colors"
                    >
                      <h3 className="font-serif text-lg text-foreground group-hover:text-primary transition-colors">
                        {tp.name}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">{tp.purpose}</p>
                    </a>
                  ))}
                </div>
                <p>
                  Links to WhatsApp, Instagram, Google Maps, and our partner brands (such as Blum and
                  Astronea) take you to sites we do not control. Please review their privacy
                  policies before sharing information with them.
                </p>
              </Section>

              <Section id="cookies" title="Cookies & Tracking">
                <p>
                  We do not use analytics, advertising, or tracking cookies of our own. However,
                  embedded third-party content — in particular the Google Maps embed on our Contact
                  page — may set its own cookies or collect usage data when it loads. You can block
                  or delete cookies at any time through your browser settings.
                </p>
              </Section>

              <Section id="retention" title="Data Retention">
                <p>
                  We keep enquiry details only for as long as needed to respond to you and to
                  maintain a reasonable record of our business communications, or as required by
                  law. You can ask us to delete your information at any time (see{' '}
                  <Link to={{ hash: '#your-rights' }} className="text-primary hover:underline">
                    Your Rights
                  </Link>
                  ).
                </p>
              </Section>

              <Section id="security" title="Security">
                <p>
                  This website is served over HTTPS, and form submissions are transmitted securely to
                  our form provider. We take reasonable measures to protect the information you share
                  with us, but no method of transmission or storage over the internet is completely
                  secure.
                </p>
              </Section>

              <Section id="your-rights" title="Your Rights">
                <p>Subject to applicable law, you may ask us to:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>tell you what personal information we hold about you;</li>
                  <li>correct or update inaccurate information;</li>
                  <li>delete your information; or</li>
                  <li>withdraw consent you previously gave for us to contact you.</li>
                </ul>
                <p>
                  To make a request, email us at{' '}
                  <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">
                    {CONTACT_EMAIL}
                  </a>
                  . We will respond within a reasonable time.
                </p>
              </Section>

              <Section id="children" title="Children's Privacy">
                <p>
                  This website is intended for adults planning residential or commercial interiors.
                  We do not knowingly collect personal information from anyone under 18. If you
                  believe a child has sent us their details, please contact us and we will delete
                  them.
                </p>
              </Section>

              <Section id="changes" title="Changes to This Policy">
                <p>
                  We may update this policy from time to time to reflect changes to our website or
                  legal requirements. The “Last updated” date at the top of this page shows when it
                  was last revised.
                </p>
              </Section>

              <Section id="contact" title="Contact & Grievances">
                <p>
                  If you have any questions or concerns about this policy or how we handle your data,
                  please contact us:
                </p>
                <div className="p-6 bg-card border border-border rounded-sm space-y-1">
                  <p className="font-serif text-lg text-foreground">Hyderabad Hardware</p>
                  <p>
                    Sai Avenue, 198 &amp; 199, Kamalapuri Colony, Srinagar Colony Main Road,
                    Hyderabad – 500073
                  </p>
                  <p>
                    Email:{' '}
                    <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">
                      {CONTACT_EMAIL}
                    </a>
                  </p>
                  <p>
                    Phone:{' '}
                    <a href="tel:9849244555" className="text-primary hover:underline">
                      9849244555
                    </a>
                  </p>
                </div>
              </Section>
            </motion.article>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PrivacyPolicy;
