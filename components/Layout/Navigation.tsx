import Link from "next/link";

type Props = {
    activeItem: number;
};

const navItems = [
    {
        title: "Home",
        href: "/",
    },
    // {
    //     title: "About",
    //     href: "/about",
    // },
    {
        title: "MarketPlace",
        href: "/marketplace",
    },
    // {
    //     title: "Contact",
    //     href: "/contact",
    // },
    {
        title: "Policy",
        href: "/policy",
    },
];

const Navigation = ({ activeItem }: Props) => {
    return (
        <>
            {navItems.map((item, id) => (
                <Link key={id} href={item.href}>
                    <h5
                        className={`md:px-4 xl:px-8 md:py-0 py-5 md:text-lg lg:text-xl font-[500] font-Inter ${
                            activeItem === id && "text-[#6dff4b]"
                        }`}
                    >
                        {item.title}
                    </h5>
                </Link>
            ))}
        </>
    );
};
export default Navigation;
