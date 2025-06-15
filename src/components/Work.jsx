import PortfolioCard from "./PortfolioCard";

const works = [
    {
        imgSrc: '/images/ShopGrids.png',
        title: 'ShopGrids',
        tags: ['eCommerce', 'website'],
        projectLink: 'https://abderahmanethimbo.github.io/ShopGrids/'
    },
    {
        imgSrc: '/images/project-2.jpg',
        title: 'Travel',
        tags: ['website'],
        projectLink: 'https://abderahmanethimbo.github.io/travel/'
    },
    {
        imgSrc: '/images/codakt.jpg',
        title: 'Codakt',
        tags: ['web design'],
        projectLink: 'https://abderahmanethimbo.github.io/Codakt/'
    },
    {
        imgSrc: '/images/reservation.png',
        title: 'Reservation API',
        tags: ['RestAPI', 'Development'],
        projectLink: 'https://github.com/AbderahmaneThimbo/reservation-API'
    },
    {
        imgSrc: '/images/ocazion.webp',
        title: 'eCommerce website',
        tags: ['eCommerce', 'Development'],
        projectLink: 'https://ocazion.vercel.app/'
    },
 
];

const Work = () => {
    return (
        <section id="work" className="section">
            <div className="container">
                <h2 className="headline-2 mb-8">
                    My portfolio highlights
                </h2>
                <div className="grid gap-x-4 gap-y-5 grid-cols-[repeat(auto-fill,_minmax(270px,_1fr))]">
                    {
                        works.map(({ imgSrc, title, tags, projectLink }, key) => (
                            <PortfolioCard
                                key={key}
                                imgSrc={imgSrc}
                                title={title}
                                tags={tags}
                                projectLink={projectLink} />
                        ))
                    }

                </div>
            </div>
        </section>
    )
}

export default Work 