import { ButtonPrimary } from "./Button";

const sitemap = [
    {
        label: 'Home',
        href: '#home'
    },
    {
        label: 'About',
        href: '#about'
    },
    {
        label: 'Work',
        href: '#work'
    },
    {
        label: 'Reviews',
        href: '#reviews'
    },
    {
        label: 'Contact me',
        href: '#contact'
    }
];

const socials = [
    {
        label: 'GitHub',
        href: 'https://github.com/AbderahmaneThimbo'
    },
    {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/abderahmane-thimbo-854b10309/'
    },
    {
        label: 'Twitter X',
        href: 'https://x.com/codewithsadee_'
    },
    {
        label: 'Instagram',
        href: 'https://www.instagram.com/abdu_erahmane/'
    }
];

const Footer = () => {
    return (
        <footer className="section">
            <div className="container">
                <div className="lg:grid lg:grid-cols-2">


                    <div className="mb-10">
                        <h2 className="headline-1 mb-8 lg:max-w-[12ch]">
                            Let&apos;s work together today!
                        </h2>

                        <ButtonPrimary
                            href="mailto:abderahmanethimbo@gmail.com"
                            label="Sart projet"
                            icon="chervron_right"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4 lg:pl-20">
                        <div className="">
                            <p className="mb-2">Sitemap</p>

                            <ul className="">
                                {
                                    sitemap.map(({ label, href }, key) => (
                                        <li key={key}>
                                            <a
                                                href={href}
                                                className="block text-sm text-zinc-400 py-1 transition-colors hover:text-zinc-200"
                                            >{label}</a>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>


                        <div className="">
                            <div className="">
                                <p className="">Socials</p>

                                <ul className="mb-2">
                                    {
                                        socials.map(({ label, href }, key) => (
                                            <li key={key}>
                                                <a
                                                    href={href}
                                                    target="_blank"
                                                    className="block text-sm text-zinc-400 py-1 transition-colors hover:text-zinc-200"
                                                >{label}</a>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between pt-10 mb-8">
                    <a
                        href=""
                        className=""
                    >
                        <img
                            src="/images/logo.svg"
                            width={40}
                            height={40}
                            alt="Logo" />
                    </a>

                    <p className="text-zinc-400 text-sm">
                        &copy; 2025 <span className="text-zinc-200">Abderahmane Thimbo.</span>  All rights reserved
                    </p>
                </div>
            </div>
        </footer>
    )
}
export default Footer