interface Footer {
  title: string;
  value: string;
}

export default function Footer() {
  const footerContact: Footer[] = [
    {
      title: import.meta.env.EMAIL,
      value: `mailto:${import.meta.env.EMAIL}`,
    },
  ];

  const footerLinks = [
    {
      title: "GitHub",
      value: import.meta.env.GITHUB,
    },
    {
      title: "LinkedIn",
      value: import.meta.env.LINKEDIN,
    },
  ];

  return (
    <footer className="flex h-32 flex-1 flex-col items-center justify-center bg-lightpurple px-4 py-32 align-middle">
      <div className="grid grid-cols-2 gap-32 text-center text-sm leading-6">
        <div className="text-whiter">
          <h4 className="pb-6 text-start text-2xl font-bold">Contact</h4>
          <div className="flex flex-col">
            {footerContact.map((contact: Footer, index: number) => (
              <a
                href={contact.value}
                className="text-md text-start font-semibold"
                key={index}
              >
                {contact.title}
              </a>
            ))}
            <span className="text-md text-start font-semibold">
              Bogotá, Colombia
            </span>
          </div>
        </div>
        <div className="text-whiter">
          <h4 className="pb-6 text-start text-2xl font-bold">Links</h4>
          <div className="flex flex-col">
            {footerLinks.map((contact: Footer, index: number) => (
              <a
                href={contact.value}
                className="text-md text-start font-semibold"
                key={index}
                target="_blank"
              >
                {contact.title}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
